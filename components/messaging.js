import { fetchJSON } from './dataFetcher.js';

export async function renderMessages(userName) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Messages</h2><p>Loading...</p>`;

  const messages = await fetchJSON('messages');
  const userMessages = messages.filter(m => m.from === userName || m.to === userName);

  if (!userMessages.length) {
    container.innerHTML = `<h2>Messages</h2><p>No messages found.</p>`;
    return container;
  }

  container.innerHTML = `<h2>Messages</h2>
    <ul>
      ${userMessages.map(m => `<li><strong>${m.from}</strong> to <strong>${m.to}</strong>: ${m.message} (${m.date})</li>`).join('')}
    </ul>`;
  return container;
}
