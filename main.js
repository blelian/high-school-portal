import { renderDashboard } from "./components/dashboard.js";
import { renderGrades } from "./components/grades.js";
import { renderAssignments } from "./components/assignments.js";
import { renderAnnouncements } from "./components/announcements.js";
import { renderCalendar } from "./components/calendar.js";
import { renderMessages } from "./components/messaging.js";
import { renderAttendance } from "./components/attendance.js";
import { renderAuth, getCurrentUser, logout } from "./components/auth.js";
import { renderQuote } from "./components/quotes.js";

console.log("✅ High School Portal loaded");

let user = getCurrentUser();

async function renderView(viewFunction) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const container = document.createElement("div");
  container.id = "view-container";
  app.appendChild(container);

  switch (viewFunction) {
    case renderGrades:
    case renderAssignments:
    case renderAttendance:
      {
        const content = await viewFunction(user.email);
        container.appendChild(content);
      }
      break;
    case renderMessages:
      {
        const content = await viewFunction(user.name);
        container.appendChild(content);
      }
      break;
    case renderDashboard:
      {
        // Dashboard is async now because of quote fetch or other data
        const content = await viewFunction(user);
        container.appendChild(content);
      }
      break;
    default:
      {
        const content = await viewFunction(user);
        container.appendChild(content);
      }
      break;
  }
}

function renderLoginScreen() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const loginView = renderAuth((loggedInUser) => {
    user = loggedInUser;
    window.location.hash = "dashboard";
  });
  app.appendChild(loginView);
}

async function onRouteChange() {
  const hash = window.location.hash.slice(1);

  if (!user) {
    renderLoginScreen();
    return;
  }

  switch (hash) {
    case "dashboard":
      await renderView(renderDashboard);
      break;
    case "assignments":
      await renderView(renderAssignments);
      break;
    case "grades":
      await renderView(renderGrades);
      break;
    case "messages":
      await renderView(renderMessages);
      break;
    case "calendar":
      await renderView(renderCalendar);
      break;
    case "announcements":
      await renderView(renderAnnouncements);
      break;
    case "attendance":
      await renderView(renderAttendance);
      break;
    case "quotes":
      await renderView(renderQuote);
      break;
    case "logout":
      logout();
      window.location.hash = "";
      location.reload();
      break;
    default:
      window.location.hash = "dashboard";
  }
}

window.addEventListener("hashchange", onRouteChange);

if (!user) {
  renderLoginScreen();
} else {
  onRouteChange();
}
