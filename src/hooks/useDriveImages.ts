
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

      const { data, error } = await supabase.functions.invoke('fetch-drive-images', {
        body: { folderId }
      });

      if (error) {
        console.error('Error fetching drive images:', error);
        throw error;
      }

      return data.images || [];
    },
    enabled: !!folderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
