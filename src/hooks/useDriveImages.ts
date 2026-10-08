import { useQuery } from "@tanstack/react-query";

export interface DriveImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  driveId: string;
}

/**
 * Dev only: `?data=demo|worst|one|empty|error` swaps the Drive folder for a
 * fixture (src/dev/galleryFixtures.ts), since `vite dev` doesn't serve /api.
 * Dead code in production builds, fixtures included.
 */
const loadDevFixture = async (): Promise<DriveImage[] | null> => {
  if (!import.meta.env.DEV) return null;
  const name = new URLSearchParams(window.location.search).get('data');
  if (!name) return null;
  const { galleryFixtures, slowFixture } = await import('../dev/galleryFixtures');
  if (name === 'error') throw new Error('Fixture: Drive is down');
  if (name === 'slow') return slowFixture();
  return galleryFixtures[name] ?? null;
};

// The prerender renders once and exits: a 10-minute gc timer would hold the
// Node process open that long after the pages are written.
const isServer = typeof window === 'undefined';

export const useDriveImages = (folderId: string) => {
  return useQuery({
    queryKey: ['drive-images', folderId],
    queryFn: async (): Promise<DriveImage[]> => {
      if (!folderId) {
        return [];
      }

      const fixture = await loadDevFixture();
      if (fixture) return fixture;

      const response = await fetch('/api/fetch-drive-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error fetching drive images:', data?.error);
        throw new Error(data?.error || 'Failed to fetch drive images');
      }

      return data.images || [];
    },
    enabled: !!folderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: isServer ? Infinity : 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    // One retry rides out a blip; three left the skeleton up for ~7s before admitting failure
    retry: 1,
  });
};
