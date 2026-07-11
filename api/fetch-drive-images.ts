import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    const params = new URLSearchParams({
      q: `'${folderId}' in parents`,
      key: apiKey,
      fields: 'files(id,name,mimeType,webViewLink)',
    });

    const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`);

    if (!response.ok) {
      console.error('Google Drive API error:', response.status, await response.text());
      return res.status(502).json({ error: 'Failed to fetch from Google Drive' });
    }

    const data = await response.json();

    const images = data.files
      .filter((file: { mimeType: string }) => file.mimeType.startsWith('image/'))
      .map((file: { id: string; name: string }, index: number) => ({
        id: index + 1,
        src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
        alt: `${file.name} from Stratos Market Anaxos, Lesvos`,
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
