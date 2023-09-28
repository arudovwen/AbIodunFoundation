export function base64ToImage(base64, mimeType) {
  // Convert base64 to a Blob
  if (!base64 || !mimeType) return null; // Return null if base64 or mimeType is missing

  return `data:${mimeType};base64,${base64}`;
}
