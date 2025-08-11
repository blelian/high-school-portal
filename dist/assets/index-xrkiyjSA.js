(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const u=[{content:"Keep going, you’re doing great!",author:"Unknown"},{content:"Every day is a second chance.",author:"Unknown"},{content:"Believe you can and you’re halfway there.",author:"Theodore Roosevelt"}];async function m(){const n=document.createElement("div");n.className="card quote-card",n.innerHTML="<h3>Daily Motivation</h3><p>Loading...</p>";try{const e=await fetch("https://api.quotable.io/random");if(!e.ok)throw new Error("Failed to fetch quote");const o=await e.json();n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}catch{const o=u[Math.floor(Math.random()*u.length)];n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}return n}async function h(n){const e=document.createElement("div");e.className="card",e.innerHTML=`
    <h1>Welcome, ${n.name}</h1>
    <p>Role: ${n.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;const o=await m();return e.appendChild(o),e}async function d(n){try{const e=await fetch(`/data/${n}`);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){return console.error(`Error fetching ${n}:`,e),[]}}async function p(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Grades</h2><p>Loading...</p>";const a=(await d("grades.json")).filter(t=>t.studentId===n);return a.length?(e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${a.map(t=>`<li>Class ${t.classId}: ${t.grade} (${t.term})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Grades</h2><p>No grades found.</p>",e)}async function g(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Assignments</h2><p>Loading...</p>";const a=(await d("assignments.json")).filter(t=>t.studentId===n);return a.length?(e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${a.map(t=>`<li>${t.title} - Due: ${t.dueDate} - ${t.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Assignments</h2><p>No assignments found.</p>",e)}async function $(){const n=document.createElement("div");n.className="card",n.innerHTML="<h2>Announcements</h2><p>Loading...</p>";const e=await d("announcements.json");return e.length?(n.innerHTML=`<h2>Announcements</h2>
    <ul>
      ${e.map(o=>`<li><strong>${o.title}</strong> (${o.date}): ${o.content}</li>`).join("")}
    </ul>`,n):(n.innerHTML="<h2>Announcements</h2><p>No announcements found.</p>",n)}const T="bullsurus@gmail.com",v="AIzaSyD_Tmx1pAWwT18ekse8QpxdFbmv0ViANzc";async function H(){const n=document.createElement("div");n.className="card",n.innerHTML="<h2>School Calendar</h2><p>Loading events...</p>";try{const e=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(T)}/events?key=${v}`,o=await fetch(e);if(!o.ok)throw new Error(`Google Calendar API error: ${o.statusText}`);const a=await o.json();if(!a.items||a.items.length===0)return n.innerHTML="<h2>School Calendar</h2><p>No upcoming events found.</p>",n;const t=a.items.map(r=>{const s=r.start.dateTime||r.start.date,l=new Date(s),b={year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"},M=l.toLocaleString(void 0,b);return`<li><strong>${r.summary}</strong> - ${M}</li>`}).join("");n.innerHTML=`
      <h2>School Calendar</h2>
      <ul>${t}</ul>
    `}catch(e){n.innerHTML=`<h2>School Calendar</h2><p>Error loading events: ${e.message}</p>`,console.error(e)}return n}async function f(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Messages</h2><p>Loading...</p>";const a=(await d("messages.json")).filter(t=>t.from===n||t.to===n);return a.length?(e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${a.map(t=>`<li><strong>${t.from}</strong> to <strong>${t.to}</strong>: ${t.message} (${t.date})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Messages</h2><p>No messages found.</p>",e)}async function w(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Attendance</h2><p>Loading...</p>";const a=(await d("attendance.json")).filter(t=>t.studentId===n);return e.innerHTML=`
    <h2>Attendance</h2>
    <ul>
      ${a.length?a.map(t=>`<li>${t.date}: ${t.status}</li>`).join(""):"<li>No attendance records found.</li>"}
    </ul>
  `,e}function E(n){const e=document.createElement("div");return e.className="card",e.innerHTML=`
    <h2>Login</h2>
    <form id="loginForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  `,e.querySelector("#loginForm").addEventListener("submit",async o=>{o.preventDefault();const a=e.querySelector("#email").value.trim(),t=e.querySelector("#password").value.trim();if(!a||!t){alert("Please enter email and password.");return}const s=(await d("users.json")).find(l=>l.email===a);if(!s){alert("User not found.");return}localStorage.setItem("user",JSON.stringify(s)),console.log("🔐 Logged in user:",s),n(s)}),e}function S(){const n=localStorage.getItem("user");return n?JSON.parse(n):null}function N(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let c=S();async function i(n){const e=document.getElementById("app");e.innerHTML="";const o=document.createElement("div");switch(o.id="view-container",e.appendChild(o),n){case p:case g:case w:{const a=await n(c.email);o.appendChild(a)}break;case f:{const a=await n(c.name);o.appendChild(a)}break;case h:{const a=await n(c);o.appendChild(a)}break;default:{const a=await n(c);o.appendChild(a)}break}}function y(){const n=document.getElementById("app");n.innerHTML="";const e=E(o=>{c=o,window.location.hash="dashboard"});n.appendChild(e)}async function L(){const n=window.location.hash.slice(1);if(!c){y();return}switch(n){case"dashboard":await i(h);break;case"assignments":await i(g);break;case"grades":await i(p);break;case"messages":await i(f);break;case"calendar":await i(H);break;case"announcements":await i($);break;case"attendance":await i(w);break;case"quotes":await i(m);break;case"logout":N(),window.location.hash="",location.reload();break;default:window.location.hash="dashboard"}}window.addEventListener("hashchange",L);c?L():y();
