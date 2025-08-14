import { users } from './data.js';

export function renderAuth(onLoginSuccess) {
  const container = document.createElement("div");
  container.className = "card show"; // Ensure login is visible immediately

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

  container.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = container.querySelector("#email").value.trim();
    const password = container.querySelector("#password").value.trim();
    debugLog.textContent = "";

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      debugLog.textContent += "No matching user found.\n";
      alert("Invalid email or password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    debugLog.textContent += `🔐 Logged in user: ${JSON.stringify(user)}\n`;
    onLoginSuccess(user);
  });

  return container;
}

// Get currently logged in user from localStorage
export function getCurrentUser() {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
}

// Logout user
export function logout() {
  localStorage.removeItem("user");
}
