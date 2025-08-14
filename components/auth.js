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
    <div id="debugLog" style="margin-top:10px;color:blue;font-size:0.9em;"></div>
  `;

  const debugLog = container.querySelector("#debugLog");

  container.querySelector("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = container.querySelector("#email").value.trim();
    const password = container.querySelector("#password").value.trim();

    debugLog.textContent = ""; // Clear previous debug logs

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      // Detect GitHub Pages or local
      const basePath = window.location.hostname.includes('github.io')
        ? '/high-school-portal'
        : '';

      debugLog.textContent += `Fetching users from: ${basePath}/data/users.json\n`;

      const users = await fetchLocalJSON(`${basePath}/data/users.json`);

      debugLog.textContent += `Users loaded: ${JSON.stringify(users)}\n`;
      debugLog.textContent += `Login attempt: email='${email}', password='${password}'\n`;

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        debugLog.textContent += "No matching user found.\n";
        alert("Invalid email or password.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));
      debugLog.textContent += `🔐 Logged in user: ${JSON.stringify(user)}\n`;
      console.log("🔐 Logged in user:", user);
      onLoginSuccess(user);

    } catch (err) {
      console.error("Error fetching users:", err);
      debugLog.textContent += `Error fetching users: ${err.message}\n`;
      alert("Login failed. Please try again later.");
    }
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
