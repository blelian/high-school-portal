// dataFetcher.js
const MASTER_KEY = '$2a$10$5.mnlL9UuMbrX6BvH6FUmOU5EPySbRonmr8.gDv/QFg.BaWuOcvL2';

const BIN_URLS = {
  users: 'https://api.jsonbin.io/v3/b/689d5bdc43b1c97be91de91b/latest',
  assignments: 'https://api.jsonbin.io/v3/b/689d5c85ae596e708fc99f19/latest',
  attendance: 'https://api.jsonbin.io/v3/b/689d5cd543b1c97be91de982/latest',
  grades: 'https://api.jsonbin.io/v3/b/689d5d1ad0ea881f4058d14e/latest',
  messages: 'https://api.jsonbin.io/v3/b/689d5d80ae596e708fc99f70/latest'
};

/**
 * Fetch JSON data from JSONBin.io
 * @param {string} key - 'users', 'assignments', 'attendance', 'grades', 'messages'
 */
export async function fetchJSONBin(key) {
  try {
    const url = BIN_URLS[key];
    if (!url) throw new Error(`No JSONBin URL found for key: ${key}`);

    const res = await fetch(url, {
      headers: {
        'X-Master-Key': MASTER_KEY
      }
    });

    if (!res.ok) throw new Error(`Failed to fetch ${key}: ${res.status}`);

    const data = await res.json();
    return data.record; // JSONBin v3 stores actual data in .record
  } catch (err) {
    console.error(`Error fetching ${key}:`, err);
    return [];
  }
}
