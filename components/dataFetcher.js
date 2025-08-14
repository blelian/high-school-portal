// components/dataFetcher.js
// This version works with JSON files inside src/data/
// No need to move files to public

// Import the JSON directly
import users from '../data/users.json'; // adjust path if needed

// Generic fetch function for your project
export async function fetchLocalJSON(fileName) {
  // Currently only supports users.json
  if (fileName === 'users.json') {
    console.log(`${fileName} loaded:`, users);
    return users;
  }

  console.warn(`fetchLocalJSON: No data available for "${fileName}"`);
  return [];
}
