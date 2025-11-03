// ImgBB Image Upload Hook
const IMGBB_API_KEY = 'ad1f02c6e4fde9e08d51c2e656cc770d';
const IMGBB_API_URL = 'https://api.imgbb.com/1/upload';

/**
 * Upload image to ImgBB and return the URL
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadImageToImgBB = async (file) => {
  try {
    // Validate file exists
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please select an image file.');
    }

    // Validate file size (max 32MB for ImgBB)
    if (file.size > 32 * 1024 * 1024) {
      throw new Error('Image size should be less than 32MB');
    }

    // Validate file size (min 1KB)
    if (file.size < 1024) {
      throw new Error('Image file is too small');
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', IMGBB_API_KEY);

    // Upload to ImgBB
    const response = await fetch(IMGBB_API_URL, {
      method: 'POST',
      body: formData
    });

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate response structure
    if (!data) {
      throw new Error('Invalid response from ImgBB API');
    }

    if (!data.success) {
      const errorMessage = data.error?.message || data.status_txt || 'Upload failed';
      throw new Error(errorMessage);
    }

    // Validate data structure
    if (!data.data || !data.data.url) {
      console.error('ImgBB response:', data);
      throw new Error('Invalid response format from ImgBB API');
    }

    // Return the image URL (use the direct URL which is shorter)
    const imageUrl = data.data.url;
    
    // Validate URL length
    if (imageUrl.length > 2048) {
      console.warn('ImgBB URL is longer than Firebase limit:', imageUrl.length);
      // Still return it, but log warning - Firebase Auth will handle it
    }

    return imageUrl;
  } catch (error) {
    console.error('ImgBB upload error:', error);
    // Provide more helpful error messages
    if (error.message) {
      throw error;
    } else {
      throw new Error('Failed to upload image. Please try again.');
    }
  }
};

export default uploadImageToImgBB;

