import events from '../data/calendar-events.json' assert { type: 'json' };

export function renderCalendar() {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>School Calendar</h2>
    <ul>
      ${events.map(e => `<li>${e.event} - ${e.date} (${e.type})</li>`).join('')}
    </ul>`;
  return container;
}