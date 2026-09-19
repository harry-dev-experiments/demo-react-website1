const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim();
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim();

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const MAX_IMAGE_DIMENSION = 8000;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const IMAGE_SIGNATURES = {
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46], [0x57, 0x45, 0x42, 0x50]],
};

const hasSignature = (bytes, signature, offset = 0) => (
  signature.every((byte, index) => bytes[offset + index] === byte)
);

const hasValidSignature = (bytes, type) => {
  if (type === 'image/webp') {
    return hasSignature(bytes, IMAGE_SIGNATURES[type][0])
      && hasSignature(bytes, IMAGE_SIGNATURES[type][1], 8);
  }
  return IMAGE_SIGNATURES[type].some((signature) => hasSignature(bytes, signature));
};

const validateImageDimensions = (file) => new Promise((resolve, reject) => {
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(objectUrl);
    if (!image.naturalWidth || !image.naturalHeight) {
      reject(new Error('The image dimensions could not be read.'));
      return;
    }
    if (image.naturalWidth > MAX_IMAGE_DIMENSION || image.naturalHeight > MAX_IMAGE_DIMENSION) {
      reject(new Error(`Images must be ${MAX_IMAGE_DIMENSION}px or smaller on each side.`));
      return;
    }
    resolve();
  };
  image.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    reject(new Error('The selected file is not a valid image.'));
  };
  image.src = objectUrl;
});

export const validateImageFile = async (file) => {
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Select a non-empty image file before publishing the event.');
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Each image must be 5 MB or smaller.');
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed. SVG and other file formats are blocked.');
  }

  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (!hasValidSignature(header, file.type)) {
    throw new Error('The file content does not match its image type.');
  }
  await validateImageDimensions(file);
};

export const uploadImageToCloudinary = async (file) => {
  await validateImageFile(file);

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
