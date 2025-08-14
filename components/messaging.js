import { messages } from './data.js';

export async function renderMessages(userName) {
  const container = document.createElement('div');
  container.className = 'card';

  const userMessages = messages.filter(m => m.from === userName || m.to === userName);

  container.innerHTML = `<h2>Messages</h2>` +
    (userMessages.length
      ? `<ul>${userMessages.map(m => `<li><strong>${m.from}</strong> to <strong>${m.to}</strong>: ${m.message} (${m.date})</li>`).join('')}</ul>`
      : `<p>No messages found.</p>`
    );

  return container;
}
