import { renderQuote } from './quotes.js';
import { renderAssignments } from './assignments.js';
import { renderAttendance } from './attendance.js';
import { renderGrades } from './grades.js';
import { renderMessages } from './messaging.js';

export async function renderDashboard(user) {
  const container = document.createElement('div');
  container.className = 'card';

  container.innerHTML = `
    <h1>Welcome, ${user.name}</h1>
    <p>Role: ${user.role}</p>
    <p>Select a module to view grades, assignments, attendance, messages, and more.</p>
  `;

  // Add a wrapper for dynamic modules
  const modulesWrapper = document.createElement('div');
  modulesWrapper.id = 'modulesWrapper';
  modulesWrapper.style.marginTop = '20px';
  container.appendChild(modulesWrapper);

  // Fetch and append the quote component
  const quoteComponent = await renderQuote();
  container.appendChild(quoteComponent);

  // Fetch and render modules based on user type
  if (user.role === 'student') {
    const assignmentsComponent = await renderAssignments(user.id);
    const attendanceComponent = await renderAttendance(user.id);
    const gradesComponent = await renderGrades(user.id);

    modulesWrapper.appendChild(assignmentsComponent);
    modulesWrapper.appendChild(attendanceComponent);
    modulesWrapper.appendChild(gradesComponent);
  }

  if (user.role === 'student' || user.role === 'parent' || user.role === 'teacher') {
    const messagesComponent = await renderMessages(user.name);
    modulesWrapper.appendChild(messagesComponent);
  }

  return container;
}
