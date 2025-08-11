// components/quotes.js

const localQuotes = [
  { content: "Keep going, you’re doing great!", author: "Unknown" },
  { content: "Every day is a second chance.", author: "Unknown" },
  { content: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
];

export async function renderQuote() {
  const container = document.createElement('div');
  container.className = 'card quote-card';
  container.innerHTML = `<h3>Daily Motivation</h3><p>Loading...</p>`;

  try {
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) throw new Error('Failed to fetch quote');

    const data = await response.json();
    container.innerHTML = `
      <h3>Daily Motivation</h3>
      <blockquote>"${data.content}"</blockquote>
      <p>— ${data.author}</p>
    `;
  } catch (error) {
    // Use a random local quote as fallback
    const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    container.innerHTML = `
      <h3>Daily Motivation</h3>
      <blockquote>"${randomQuote.content}"</blockquote>
      <p>— ${randomQuote.author}</p>
    `;
  }

  return container;
}
