import { grades } from './data.js';

export async function renderGrades(studentId) {
  const container = document.createElement('div');
  container.className = 'card';

  const studentGrades = grades.filter(g => g.studentId === studentId);

  container.innerHTML = `<h2>Grades</h2>` +
    (studentGrades.length
      ? `<ul>${studentGrades.map(g => `<li>Class ${g.classId}: ${g.grade} (${g.term})</li>`).join('')}</ul>`
      : `<p>No grades found.</p>`
    );
setTimeout(() => container.classList.add('show'), 50);

  return container;
}
