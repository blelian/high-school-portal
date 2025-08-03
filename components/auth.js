// components/auth.js

export function renderAuth(onLoginSuccess) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  `;

  container.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = container.querySelector('#email').value.trim();
    const password = container.querySelector('#password').value.trim();

    // Simulated login logic (replace with real auth if needed)
    if (email && password) {
      const user = {
        name: email.split('@')[0],
        email: email,
        role: 'Student'
      };

      localStorage.setItem('user', JSON.stringify(user));

      // Callback to notify main.js
      onLoginSuccess(user);
    } else {
      alert('Please enter valid email and password.');
    }
  });

  return container;
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}

export function logout() {
  localStorage.removeItem('user');
}
