import { renderDashboard } from "./components/dashboard.js";
import { renderGrades } from "./components/grades.js";
import { renderAssignments } from "./components/assignments.js";
import { renderAnnouncements } from "./components/announcements.js";
import { renderCalendar } from "./components/calendar.js";
import { renderMessages } from "./components/messaging.js";
import { renderAuth, getCurrentUser, logout } from "./components/auth.js";

console.log("✅ High School Portal loaded");

let user = getCurrentUser();

function renderView(viewFunction) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const view = viewFunction(user);
  app.appendChild(view);
}

function renderLoginScreen() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const loginView = renderAuth((loggedInUser) => {
    user = loggedInUser;
    setupNavigation();
    renderView(renderDashboard);
  });
  app.appendChild(loginView);
}

function setupNavigation() {
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.textContent.trim().toLowerCase();

      switch (page) {
        case "dashboard":
          renderView(renderDashboard);
          break;
        case "assignments":
          renderView(renderAssignments);
          break;
        case "grades":
          renderView(renderGrades);
          break;
        case "messages":
          renderView(renderMessages);
          break;
        case "calendar":
          renderView(renderCalendar);
          break;
        case "announcements":
          renderView(renderAnnouncements);
          break;
        case "logout":
          logout();
          location.reload();
          break;
        default:
          document.getElementById("app").innerHTML = `<p>Page not found.</p>`;
      }
    });
  });
}

// Initialize app
if (!user) {
  renderLoginScreen();
} else {
  setupNavigation();
  renderView(renderDashboard);
}
