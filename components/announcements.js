import { fetchLocalJSON } from './dataFetcher.js';

export async function renderAnnouncements() {
  const container = document.createElement('div');
  container.className = 'card show';
  container.innerHTML = `<h2>Announcements</h2><p>Loading...</p>`;

  try {
    const announcements = await fetchLocalJSON('announcements.json');

    if (!announcements || announcements.length === 0) {
      container.innerHTML = `<h2>Announcements</h2><p>No announcements found.</p>`;
      return container;
    }

    container.innerHTML = `
      <h2>Announcements</h2>
      <ul>
        ${announcements.map(a => `
          <li>
            <strong>${a.title}</strong> (${a.date}): ${a.content}
          </li>
        `).join('')}
      </ul>
    `;
  } catch (err) {
    container.innerHTML = `<h2>Announcements</h2><p>Error loading announcements.</p>`;
    console.error(err);
  }

  return container;
}
