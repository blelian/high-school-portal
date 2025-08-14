export async function renderQuote() {
  const container = document.createElement('div');
  container.className = 'card';

  try {
    const res = await fetch('https://type.fit/api/quotes');
    const data = await res.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    container.innerHTML = `<em>"${randomQuote.text}"</em> - ${randomQuote.author || 'Unknown'}`;
  } catch {
    container.innerHTML = `<em>"Education is the most powerful weapon which you can use to change the world."</em> - Nelson Mandela`;
  }

  setTimeout(() => container.classList.add('show'), 50);
  return container;
}
