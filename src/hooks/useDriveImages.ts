
import { useQuery } from "@tanstack/react-query";

export interface DriveImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  driveId: string;
}

export const useDriveImages = (folderId: string) => {
  return useQuery({
    queryKey: ['drive-images', folderId],
    queryFn: async (): Promise<DriveImage[]> => {
      if (!folderId) {
        return [];
      }

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
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  });
};
