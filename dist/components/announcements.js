import { fetchLocalJSON } from './dataFetcher.js';

export async function renderAnnouncements() {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Announcements</h2><p>Loading...</p>`;

  const announcements = await fetchLocalJSON('announcements.json');
  if (!announcements.length) {
    container.innerHTML = `<h2>Announcements</h2><p>No announcements found.</p>`;
    return container;
  }

  container.innerHTML = `<h2>Announcements</h2>
    <ul>
      ${announcements.map(a => `<li><strong>${a.title}</strong> (${a.date}): ${a.content}</li>`).join('')}
    </ul>`;
  return container;
}
