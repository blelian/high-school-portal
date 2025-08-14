import { renderDashboard } from "./components/dashboard.js";
import { renderGrades } from "./components/grades.js";
import { renderAssignments } from "./components/assignments.js";
import { renderAttendance } from "./components/attendance.js";
import { renderMessages } from "./components/messaging.js";
import { renderAuth, getCurrentUser, logout } from "./components/auth.js";

console.log("✅ High School Portal loaded");

let user = getCurrentUser();

async function renderView(viewFunction) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const container = document.createElement("div");
  container.id = "view-container";
  app.appendChild(container);

  let content;
  switch (viewFunction) {
    case renderGrades:
    case renderAssignments:
    case renderAttendance:
      content = await viewFunction(user.id);
      break;
    case renderMessages:
      content = await viewFunction(user.name);
      break;
    default:
      content = await viewFunction(user);
      break;
  }

  container.appendChild(content);
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
    case "attendance":
      await renderView(renderAttendance);
      break;
    case "logout":
      logout();
      window.location.hash = "";
      location.reload();
      break;
    default:
      window.location.hash = "dashboard";
      break;
  }
}

// Listen for hash changes (navigation)
window.addEventListener("hashchange", onRouteChange);

// Initial load
if (!user) {
  renderLoginScreen();
} else {
  onRouteChange();
}
