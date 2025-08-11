import { fetchLocalJSON } from './dataFetcher.js';

export function renderAuth(onLoginSuccess) {
  const container = document.createElement("div");
  container.className = "card";
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

  container.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = container.querySelector("#email").value.trim();
    const password = container.querySelector("#password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const users = await fetchLocalJSON('users.json'); // path stays the same
    const user = users.find(u => u.email === email);
    if (!user) {
      alert("User not found.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    console.log("🔐 Logged in user:", user);
    onLoginSuccess(user);
  });

  return container;
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

export function logout() {
  localStorage.removeItem("user");
}
