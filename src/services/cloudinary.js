const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export const uploadImageToCloudinary = async (file) => {
  if (!isCloudinaryConfigured) {
    throw new Error(
      'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env.'
    );
  }

  if (/['"]/.test(uploadPreset)) {
    throw new Error(
      'Cloudinary upload preset contains quote characters. Set VITE_CLOUDINARY_UPLOAD_PRESET to the exact preset name without quotes.'
    );
  }

  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Select a non-empty image file before publishing the event.');
  }

  const body = new FormData();
  body.append('file', file, file.name);
  body.append('upload_preset', uploadPreset);
  body.append('folder', 'debipur-events');

  let response;
  try {
    const endpoint = new URL(
      `https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudName)}/image/upload`
    );
    endpoint.searchParams.set('upload_preset', uploadPreset);
    response = await fetch(
      endpoint,
      { method: 'POST', body }
    );
  } catch {
    throw new Error(
      'Cloudinary could not be reached. Check your internet connection, browser extensions, ad blocker, or Cloudinary cloud name.'
    );
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('Cloudinary returned an invalid response.');
  }

  if (!response.ok || !result.secure_url) {
    if (result.error?.message?.toLowerCase().includes('upload preset')) {
      throw new Error(
        `Cloudinary rejected upload preset "${uploadPreset}". Confirm that this exact preset exists and is set to Unsigned in Cloudinary Settings > Upload.`
      );
    }
    throw new Error(result.error?.message || 'Cloudinary image upload failed.');
  }

  return result.secure_url;
};
