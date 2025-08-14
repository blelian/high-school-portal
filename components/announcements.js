// components/announcements.js
import { messages } from './data.js';

export async function renderAnnouncements() {
  const container = document.createElement('div');
  container.className = 'card';

  // Example announcements from messages array (or a separate announcements array)
  const announcements = messages.map(msg => ({
    title: `Message from ${msg.from}`,
    date: msg.date,
    content: msg.message
  }));

  if (!announcements.length) {
    container.innerHTML = `<h2>Announcements</h2><p>No announcements found.</p>`;
    return container;
  }

  container.innerHTML = `<h2>Announcements</h2>
    <ul>
      ${announcements.map(a => `<li><strong>${a.title}</strong> (${a.date}): ${a.content}</li>`).join('')}
    </ul>`;

  // Animate
  setTimeout(() => container.classList.add('show'), 50);

  return container;
}
