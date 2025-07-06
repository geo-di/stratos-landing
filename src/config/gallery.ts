
// Google Drive Gallery Configuration
// To update images: 
// 1. Upload photos to Google Drive
// 2. Make sure the folder is shared with "Anyone with the link can view"
// 3. Update the DRIVE_FOLDER_ID below with your Google Drive folder ID
// 4. The images will be automatically fetched and displayed in the gallery

// Your Google Drive folder ID extracted from the shared link
export const DRIVE_FOLDER_ID = "1lmHh4m9o-rYbnZWNnosyftlNz0l3yLgM";

// Placeholder image shown when no images are loaded yet
export const placeholderMessage = {
  id: 1,
  src: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
  alt: "Photos will be added soon",
  title: "Photos Coming Soon"
};

// Instructions for setting up Google Drive integration:
// 1. Create a folder in Google Drive with your gallery images
// 2. Right-click the folder and select "Get link"
// 3. Set sharing to "Anyone with the link can view"
// 4. Copy the folder ID from the URL (the long string after /folders/)
// 5. Replace DRIVE_FOLDER_ID above with your actual folder ID
// 6. The gallery will automatically fetch and display your images
