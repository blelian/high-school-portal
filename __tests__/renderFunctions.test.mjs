/**
 * @jest-environment jsdom
 */

import { renderAssignments } from '../components/assignments.js';
import { renderGrades } from '../components/grades.js';
import { renderAnnouncements } from '../components/announcements.js';
import { renderAttendance } from '../components/attendance.js';
import { renderCalendar } from '../components/calendar.js';
import { renderMessages } from '../components/messaging.js';
import { renderDashboard } from '../components/dashboard.js';
import { renderAuth, getCurrentUser, logout } from '../components/auth.js';

// Mock fetch to return test data for each JSON file
global.fetch = jest.fn((url) => {
  const dataMap = {
    '/data/assignments.json': [{ studentId: 'test@example.com', title: 'Test Assignment', dueDate: '2025-12-31', submitted: false }],
    '/data/grades.json': [{ studentId: 'test@example.com', classId: 'Math', grade: 90, term: 'Fall' }],
    '/data/announcements.json': [{ title: 'Test Announcement', date: '2025-01-01', content: 'Hello!' }],
    '/data/attendance.json': [{ studentId: 'test@example.com', date: '2025-08-01', status: 'Present' }],
    '/data/calendar-events.json': [{ event: 'Test Event', date: '2025-08-15', type: 'Exam' }],
    '/data/messages.json': [{ from: 'Alice', to: 'Bob', message: 'Hi', date: '2025-08-10' }],
    '/data/users.json': [{ email: 'test@example.com', name: 'Test User', role: 'Student' }],
  };

  const response = dataMap[url];
  if (response) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    });
  } else {
    return Promise.resolve({
      ok: false,
      status: 404,
    });
  }
});

describe('Component render functions', () => {
  test('renderAssignments returns element with assignment data', async () => {
    const element = await renderAssignments('test@example.com');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Test Assignment');
  });

  test('renderGrades returns element with grades data', async () => {
    const element = await renderGrades('test@example.com');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Math');
    expect(element.textContent).toContain('90');
  });

  test('renderAnnouncements returns element with announcements', async () => {
    const element = await renderAnnouncements();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Test Announcement');
  });

  test('renderAttendance returns element with attendance data', async () => {
    const element = await renderAttendance('test@example.com');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Present');
  });

  test('renderCalendar returns element with calendar events', async () => {
    const element = await renderCalendar();
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Test Event');
  });

  test('renderMessages returns element with user messages', async () => {
    const element = await renderMessages('Alice');
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Hi');
  });

  test('renderDashboard returns element with user greeting', () => {
    const user = { name: 'Test User', role: 'Student' };
    const element = renderDashboard(user);
    expect(element).toBeInstanceOf(HTMLElement);
    expect(element.textContent).toContain('Welcome, Test User');
  });

  test('renderAuth allows login with valid user', async () => {
    const mockOnLogin = jest.fn();
    const container = renderAuth(mockOnLogin);

    container.querySelector('#email').value = 'test@example.com';
    container.querySelector('#password').value = 'any';

    const form = container.querySelector('#loginForm');
    const submitEvent = new Event('submit');
    form.dispatchEvent(submitEvent);

    await new Promise(process.nextTick); // wait for async

    expect(mockOnLogin).toHaveBeenCalled();
  });

  test('getCurrentUser returns user from localStorage', () => {
    const user = { email: 'a@b.com', name: 'Stored User' };
    localStorage.setItem('user', JSON.stringify(user));
    expect(getCurrentUser()).toEqual(user);
    localStorage.removeItem('user');
  });

  test('logout removes user from localStorage', () => {
    localStorage.setItem('user', JSON.stringify({}));
    logout();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
