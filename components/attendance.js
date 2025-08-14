import { attendance } from './data.js';

export async function renderAttendance(studentId) {
  const container = document.createElement('div');
  container.className = 'card';

  const records = attendance.filter(r => r.studentId === studentId);

  container.innerHTML = `<h2>Attendance</h2>` +
    (records.length
      ? `<ul>${records.map(r => `<li>${r.date}: ${r.status}</li>`).join('')}</ul>`
      : `<p>No attendance records found.</p>`
    );

  return container;
}
