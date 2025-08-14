import { fetchJSONBin } from './dataFetcher.js';

export async function renderGrades(studentId) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Grades</h2><p>Loading...</p>`;

  const grades = await fetchJSONBin('grades');
  const studentGrades = grades.filter(g => g.studentId === studentId);

  if (!studentGrades.length) {
    container.innerHTML = `<h2>Grades</h2><p>No grades found.</p>`;
    return container;
  }

  container.innerHTML = `<h2>Grades</h2>
    <ul>
      ${studentGrades.map(g => `<li>Class ${g.classId}: ${g.grade} (${g.term})</li>`).join('')}
    </ul>`;
  return container;
}
