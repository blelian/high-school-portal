// dataFetcher.js
export async function fetchLocalJSON(filePath) {
  try {
    // Detect GitHub Pages and prepend repo path if needed
    const basePath = window.location.hostname.includes('github.io')
      ? '/high-school-portal'   // Replace with your repo name
      : '';                      // Local dev or Netlify

    const res = await fetch(`${basePath}/data/${filePath}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${filePath}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.error('Error fetching JSON:', err);
    return [];
  }
}
