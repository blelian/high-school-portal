import assignments from '../data/assignments.json' assert { type: 'json' };

export function renderAssignments(studentId) {
  const container = document.createElement('div');
  container.className = 'card';
  const studentAssignments = assignments.filter(a => a.studentId === studentId);
  container.innerHTML = `<h2>Assignments</h2>
    <ul>
      ${studentAssignments.map(a => `<li>${a.title} - Due: ${a.dueDate} - ${a.submitted ? 'Submitted' : 'Pending'}</li>`).join('')}
    </ul>`;
  return container;
}