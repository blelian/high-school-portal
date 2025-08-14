// components/dataFetcher.js
const BIN_IDS = {
  users: "689d5bdc43b1c97be91de91b",
  assignments: "689d5c85ae596e708fc99f19",
  attendance: "689d5cd543b1c97be91de982",
  grades: "689d5d1ad0ea881f4058d14e",
  messages: "689d5d80ae596e708fc99f70",
  announcements: "689d5f12ae596e708fc99ff1" // ✅ added if you also have announcements
};

const MASTER_KEY = "$2a$10$5.mnlL9UuMbrX6BvH6FUmOU5EPySbRonmr8.gDv/QFg.BaWuOcvL2";

/**
 * Fetches JSON from JsonBin using the given dataset name.
 * @param {string} name - The key in BIN_IDS to fetch.
 * @returns {Promise<any>} - Parsed JSON data or empty array if error.
 */
export async function fetchJSON(name) {
  try {
    const binId = BIN_IDS[name];
    if (!binId) throw new Error(`Bin not found for "${name}"`);
    
    const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
      headers: {
        "X-Master-Key": MASTER_KEY,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) throw new Error(`Failed to fetch "${name}": ${res.status} ${res.statusText}`);

    const json = await res.json();
    return json.record;
  } catch (err) {
    console.error(`❌ Error fetching "${name}":`, err);
    return [];
  }
}
