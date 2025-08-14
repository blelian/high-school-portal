import { fetchJSONBin } from './dataFetcher.js';

export async function renderAssignments(studentId) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Assignments</h2><p>Loading...</p>`;

  const assignments = await fetchJSONBin('assignments');
  const studentAssignments = assignments.filter(a => a.studentId === studentId);

  if (!studentAssignments.length) {
    container.innerHTML = `<h2>Assignments</h2><p>No assignments found.</p>`;
    return container;
  }

  container.innerHTML = `<h2>Assignments</h2>
    <ul>
      ${studentAssignments.map(a => `<li>${a.title} - Due: ${a.dueDate} - ${a.submitted ? 'Submitted' : 'Pending'}</li>`).join('')}
    </ul>`;
  return container;
}
