import { renderQuote } from './quotes.js';

export async function renderDashboard(user) {
  const container = document.createElement('div');
  container.className = 'card';

  container.innerHTML = `
    <h1>Welcome, ${user.name}</h1>
    <p>Role: ${user.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;

  const quoteComponent = await renderQuote();
  container.appendChild(quoteComponent);
setTimeout(() => container.classList.add('show'), 50);

  return container;
}
