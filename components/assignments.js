import { assignments } from './data.js';

export async function renderAssignments(studentId) {
  const container = document.createElement('div');
  container.className = 'card';

  const studentAssignments = assignments.filter(a => a.studentId === studentId);

  container.innerHTML = `<h2>Assignments</h2>` +
    (studentAssignments.length
      ? `<ul>${studentAssignments.map(a => `<li>${a.title} - Due: ${a.dueDate} - ${a.submitted ? 'Submitted' : 'Pending'}</li>`).join('')}</ul>`
      : `<p>No assignments found.</p>`
    );
setTimeout(() => container.classList.add('show'), 50);

  return container;
}
