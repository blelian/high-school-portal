import grades from '../data/grades.json' assert { type: 'json' };

export function renderGrades(studentId) {
  const container = document.createElement('div');
  container.className = 'card';
  const studentGrades = grades.filter(g => g.studentId === studentId);
  container.innerHTML = `<h2>Grades</h2>
    <ul>
      ${studentGrades.map(g => `<li>Class ${g.classId}: ${g.grade} (${g.term})</li>`).join('')}
    </ul>`;
  return container;
}