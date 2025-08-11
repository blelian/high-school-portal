export function renderHeader() {
  const header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = `<h1>High School Portal</h1>`;
  return header;
}

export function renderFooter() {
  const footer = document.createElement('div');
  footer.className = 'footer';
  footer.innerHTML = `<p>&copy; 2025 High School Portal</p>`;
  return footer;
}
