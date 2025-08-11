import { fetchLocalJSON } from './dataFetcher.js';

export async function renderAttendance(studentId) {
  const container = document.createElement('div');
  container.className = 'card';
  container.innerHTML = `<h2>Attendance</h2><p>Loading...</p>`;

  const attendance = await fetchLocalJSON('attendance.json');
  const records = attendance.filter(record => record.studentId === studentId);

  container.innerHTML = `
    <h2>Attendance</h2>
    <ul>
      ${records.length ? records.map(r => `<li>${r.date}: ${r.status}</li>`).join('') : '<li>No attendance records found.</li>'}
    </ul>
  `;
  return container;
}
