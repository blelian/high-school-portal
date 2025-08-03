export function renderDashboard(user) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `
    <h1>Welcome, ${user.name}</h1>
    <p>Role: ${user.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;
  return container;
}