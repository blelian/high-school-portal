import announcements from '../data/announcements.json' assert { type: 'json' };

export function renderAnnouncements() {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Announcements</h2>
    <ul>
      ${announcements.map(a => `<li><strong>${a.title}</strong> (${a.date}): ${a.content}</li>`).join('')}
    </ul>`;
  return container;
}