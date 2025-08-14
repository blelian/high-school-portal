// dataFetcher.js
export async function fetchLocalJSON(fileName) {
  try {
    // Detect GitHub Pages or local/Netlify
    const basePath = window.location.hostname.includes('github.io')
      ? '/high-school-portal'   // your GitHub repo name
      : '';

    const url = `${basePath}/data/${fileName}`;
    console.log('Fetching JSON from:', url);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('JSON loaded:', data);
    return data;

  } catch (err) {
    console.error('Error fetching JSON:', err);
    return [];
  }
}
