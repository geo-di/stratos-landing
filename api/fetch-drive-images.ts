import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Drive returns at most this many files per page; we follow nextPageToken past it. */
const PAGE_SIZE = 1000;
/** Safety stop, so a misconfigured folder can't loop forever. */
const MAX_PAGES = 5;

/** Words a phone or chat app puts in a file name, which say nothing about the photo. */
const CAMERA_WORDS = new Set([
  'img', 'dsc', 'dscn', 'dscf', 'pxl', 'mvimg', 'dcim', 'photo', 'image', 'picture',
  'screenshot', 'whatsapp', 'signal', 'telegram', 'edited', 'copy', 'final',
]);

/**
 * Alt text from a Drive file name. "Mountain_herbs.webp" reads as "Mountain
 * herbs"; a camera-roll name like "IMG_20250714_183244.jpg" carries no
 * description, so it gets a plain one instead of a string of digits.
 */
const altFromName = (name: string) => {
  const label = name
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = label.match(/\p{L}{3,}/gu) ?? [];
  const meaningful = words.some((word) => !CAMERA_WORDS.has(word.toLowerCase()));

  return meaningful
    ? `${label}, at Stratos Market in Anaxos, Lesvos`
    : 'A photo from Stratos Market in Anaxos, Lesvos';
};

interface DriveFile {
  id: string;
  name: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { folderId } = req.body ?? {};
  if (!folderId) {
    return res.status(400).json({ error: 'Folder ID is required' });
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Google Drive API key not configured' });
  }

  try {
    const files: DriveFile[] = [];
    let pageToken: string | undefined;

    for (let page = 0; page < MAX_PAGES; page++) {
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        key: apiKey,
        // Newest first, so this summer's photos lead the rack
        orderBy: 'createdTime desc',
        pageSize: String(PAGE_SIZE),
        fields: 'nextPageToken,files(id,name)',
      });
      if (pageToken) params.set('pageToken', pageToken);

      const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);

      if (!response.ok) {
        console.error('Google Drive API error:', response.status, await response.text());
        return res.status(502).json({ error: 'Failed to fetch from Google Drive' });
      }

      const data = await response.json();
      files.push(...(data.files ?? []));
      pageToken = data.nextPageToken;
      if (!pageToken) break;
    }

    const images = files.map((file, index) => ({
      id: index + 1,
      src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      alt: altFromName(file.name),
      title: file.name.replace(/\.[^/.]+$/, ''),
      driveId: file.id,
    }));

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({ images });
  } catch (error) {
    console.error('Error in fetch-drive-images function:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
