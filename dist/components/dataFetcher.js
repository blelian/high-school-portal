// components/dataFetcher.js
export async function fetchLocalJSON(fileName) {
  try {
    // Fetch JSON from /data/ folder in dist
    const response = await fetch(`/data/${fileName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    // Return empty array so consuming modules can handle gracefully
    return [];
  }
}
