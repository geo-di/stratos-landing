// Google Drive Gallery Configuration
// To update images: 
// 1. Upload photos to Google Drive
// 2. Make sure the folder is shared with "Anyone with the link can view"
// 3. Update the DRIVE_FOLDER_ID below with your Google Drive folder ID
// 4. The images will be automatically fetched and displayed in the gallery

// Your Google Drive folder ID extracted from the shared link
export const DRIVE_FOLDER_ID = "1lmHh4m9o-rYbnZWNnosyftlNz0l3yLgM";

// Fallback images (used when Drive API is not available or as examples)
export const fallbackImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=600&fit=crop",
    alt: "Fresh Mediterranean oranges and citrus fruits at Stratos Market in Anaxos, Lesvos",
    title: "Fresh Mediterranean Citrus"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
    alt: "Beautiful Anaxos landscape with mountains and Mediterranean scenery",
    title: "Anaxos Island Beauty"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop",
    alt: "Traditional Greek countryside near Anaxos, Lesvos",
    title: "Anaxos Countryside"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=800&h=600&fit=crop",
    alt: "Mediterranean wildlife and nature around Anaxos, Lesvos",
    title: "Anaxos Nature"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=600&fit=crop",
    alt: "Fresh local produce and vegetables at Stratos Market in Anaxos",
    title: "Local Market Produce"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632?w=800&h=600&fit=crop",
    alt: "Traditional Greek artisan crafts and souvenirs from Anaxos, Lesvos",
    title: "Greek Island Crafts"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=800&h=600&fit=crop",
    alt: "Traditional Greek delicacies and Mediterranean specialties from Anaxos",
    title: "Greek Specialties"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?w=800&h=600&fit=crop",
    alt: "Natural honey and preserves from Anaxos local producers",
    title: "Anaxos Honey"
  }
];

// Instructions for setting up Google Drive integration:
// 1. Create a folder in Google Drive with your gallery images
// 2. Right-click the folder and select "Get link"
// 3. Set sharing to "Anyone with the link can view"
// 4. Copy the folder ID from the URL (the long string after /folders/)
// 5. Replace DRIVE_FOLDER_ID above with your actual folder ID
// 6. The gallery will automatically fetch and display your images
