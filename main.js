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

// Render a view function into #app
async function renderView(viewFunction) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const container = document.createElement("div");
  container.id = "view-container";
  app.appendChild(container);

  let content;
  if ([renderGrades, renderAssignments, renderAttendance].includes(viewFunction)) {
    content = await viewFunction(user.email);
  } else if (viewFunction === renderMessages) {
    content = await viewFunction(user.name);
  } else {
    content = await viewFunction(user);
  }

  container.appendChild(content);
}

// Display login screen
function renderLoginScreen() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const loginView = renderAuth((loggedInUser) => {
    user = loggedInUser;
    window.location.hash = "dashboard";
  });
  app.appendChild(loginView);
}

// Handle routing based on hash
async function onRouteChange() {
  const hash = window.location.hash.slice(1);

  if (!user) {
    renderLoginScreen();
    return;
  }

  switch (hash) {
    case "dashboard":      await renderView(renderDashboard); break;
    case "assignments":    await renderView(renderAssignments); break;
    case "grades":         await renderView(renderGrades); break;
    case "messages":       await renderView(renderMessages); break;
    case "calendar":       await renderView(renderCalendar); break;
    case "announcements":  await renderView(renderAnnouncements); break;
    case "attendance":     await renderView(renderAttendance); break;
    case "quotes":         await renderView(renderQuote); break;
    case "logout":
      logout();
      window.location.hash = "";
      location.reload();
      break;
    default:
      window.location.hash = "dashboard";
  }
}

// Listen for hash changes
window.addEventListener("hashchange", onRouteChange);

// Initial load
if (!user) {
  renderLoginScreen();
} else {
  onRouteChange();
}
