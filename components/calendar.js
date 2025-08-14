// components/calendar.js
const calendarId = 'bullsurus@gmail.com'; // Make sure this calendar is public
const apiKey = 'AIzaSyD_Tmx1pAWwT18ekse8QpxdFbmv0ViANzc';

export async function renderCalendar() {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>School Calendar</h2><p>Loading events...</p>`;

  try {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&maxResults=5`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Google Calendar API error: ${response.statusText}`);

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      container.innerHTML = `<h2>School Calendar</h2><p>No upcoming events found.</p>`;
      return container;
    }

    const eventList = data.items.map(event => {
      const start = event.start.dateTime || event.start.date;
      const date = new Date(start);
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return `<li><strong>${event.summary}</strong> - ${date.toLocaleString(undefined, options)}</li>`;
    }).join('');

    container.innerHTML = `
      <h2>School Calendar</h2>
      <ul>${eventList}</ul>
    `;
  } catch (error) {
    container.innerHTML = `<h2>School Calendar</h2><p>Error loading events: ${error.message}</p>`;
    console.error(error);
  }

  setTimeout(() => container.classList.add('show'), 50);
  container.style.textAlign = 'center'; // Center align
  return container;
}
