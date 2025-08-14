export const users = [
  { id: 1, role: "parent", name: "Jane Doe", email: "jane@example.com", password: "1234", children: [2] },
  { id: 2, role: "student", name: "John Doe", email: "john@example.com", password: "abcd", parentId: 1 },
  { id: 3, role: "teacher", name: "Ms. Smith", email: "smith@example.com", password: "teach1", classes: [1] },
  { id: 4, role: "teacher", name: "Mr. Brown", email: "brown@example.com", password: "teach2", classes: [2] }
];

export const assignments = [
  { studentId: 2, title: "Math HW 1", dueDate: "2025-08-20", submitted: false }
];

export const attendance = [
  { studentId: 2, date: "2025-08-12", status: "Present" }
];

export const grades = [
  { studentId: 2, classId: 1, grade: "A", term: "Term 1" }
];

export const messages = [
  { from: "Jane Doe", to: "John Doe", message: "Hi John!", date: "2025-08-12" }
];
