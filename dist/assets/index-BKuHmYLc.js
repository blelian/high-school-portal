(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const m=[{content:"Keep going, you’re doing great!",author:"Unknown"},{content:"Every day is a second chance.",author:"Unknown"},{content:"Believe you can and you’re halfway there.",author:"Theodore Roosevelt"}];async function h(){const n=document.createElement("div");n.className="card quote-card",n.innerHTML="<h3>Daily Motivation</h3><p>Loading...</p>";try{const e=await fetch("https://api.quotable.io/random");if(!e.ok)throw new Error("Failed to fetch quote");const o=await e.json();n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}catch{const o=m[Math.floor(Math.random()*m.length)];n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}return n}async function g(n){const e=document.createElement("div");e.className="card",e.innerHTML=`
    <h1>Welcome, ${n.name}</h1>
    <p>Role: ${n.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;const o=await h();return e.appendChild(o),e}async function l(n){try{const o=`${window.location.hostname.includes("github.io")?"/high-school-portal":""}/data/${n}`;console.log("Fetching JSON from:",o);const a=await fetch(o);if(!a.ok)throw new Error(`Failed to fetch ${n}: ${a.status} ${a.statusText}`);const t=await a.json();return console.log("JSON loaded:",t),t}catch(e){return console.error("Error fetching JSON:",e),[]}}async function p(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Grades</h2><p>Loading...</p>";const a=(await l("grades.json")).filter(t=>t.studentId===n);return a.length?(e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${a.map(t=>`<li>Class ${t.classId}: ${t.grade} (${t.term})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Grades</h2><p>No grades found.</p>",e)}async function f(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Assignments</h2><p>Loading...</p>";const a=(await l("assignments.json")).filter(t=>t.studentId===n);return a.length?(e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${a.map(t=>`<li>${t.title} - Due: ${t.dueDate} - ${t.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Assignments</h2><p>No assignments found.</p>",e)}async function M(){const n=document.createElement("div");n.className="card",n.innerHTML="<h2>Announcements</h2><p>Loading...</p>";const e=await l("announcements.json");return e.length?(n.innerHTML=`<h2>Announcements</h2>
    <ul>
      ${e.map(o=>`<li><strong>${o.title}</strong> (${o.date}): ${o.content}</li>`).join("")}
    </ul>`,n):(n.innerHTML="<h2>Announcements</h2><p>No announcements found.</p>",n)}const v="bullsurus@gmail.com",T="AIzaSyD_Tmx1pAWwT18ekse8QpxdFbmv0ViANzc";async function H(){const n=document.createElement("div");n.className="card",n.innerHTML="<h2>School Calendar</h2><p>Loading events...</p>";try{const e=`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(v)}/events?key=${T}`,o=await fetch(e);if(!o.ok)throw new Error(`Google Calendar API error: ${o.statusText}`);const a=await o.json();if(!a.items||a.items.length===0)return n.innerHTML="<h2>School Calendar</h2><p>No upcoming events found.</p>",n;const t=a.items.map(r=>{const s=r.start.dateTime||r.start.date,c=new Date(s),u={year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"},$=c.toLocaleString(void 0,u);return`<li><strong>${r.summary}</strong> - ${$}</li>`}).join("");n.innerHTML=`
      <h2>School Calendar</h2>
      <ul>${t}</ul>
    `}catch(e){n.innerHTML=`<h2>School Calendar</h2><p>Error loading events: ${e.message}</p>`,console.error(e)}return n}async function w(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Messages</h2><p>Loading...</p>";const a=(await l("messages.json")).filter(t=>t.from===n||t.to===n);return a.length?(e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${a.map(t=>`<li><strong>${t.from}</strong> to <strong>${t.to}</strong>: ${t.message} (${t.date})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Messages</h2><p>No messages found.</p>",e)}async function y(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Attendance</h2><p>Loading...</p>";const a=(await l("attendance.json")).filter(t=>t.studentId===n);return e.innerHTML=`
    <h2>Attendance</h2>
    <ul>
      ${a.length?a.map(t=>`<li>${t.date}: ${t.status}</li>`).join(""):"<li>No attendance records found.</li>"}
    </ul>
  `,e}function N(n){const e=document.createElement("div");e.className="card",e.innerHTML=`
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
    <div id="debugLog" style="margin-top:10px;color:blue;font-size:0.9em;"></div>
  `;const o=e.querySelector("#debugLog");return e.querySelector("#loginForm").addEventListener("submit",async a=>{a.preventDefault();const t=e.querySelector("#email").value.trim(),r=e.querySelector("#password").value.trim();if(o.textContent="",!t||!r){alert("Please enter email and password.");return}try{const s=await l("users.json");o.textContent+=`Login attempt: email='${t}', password='${r}'
`,o.textContent+=`Users loaded: ${JSON.stringify(s)}
`;const c=s.find(u=>u.email===t&&u.password===r);if(!c){o.textContent+=`No matching user found.
`,alert("Invalid email or password.");return}localStorage.setItem("user",JSON.stringify(c)),o.textContent+=`🔐 Logged in user: ${JSON.stringify(c)}
`,console.log("🔐 Logged in user:",c),n(c)}catch(s){console.error("Error fetching users:",s),o.textContent+=`Error fetching users: ${s.message}
`,alert("Login failed. Please try again later.")}}),e}function S(){const n=localStorage.getItem("user");return n?JSON.parse(n):null}function E(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let d=S();async function i(n){const e=document.getElementById("app");e.innerHTML="";const o=document.createElement("div");o.id="view-container",e.appendChild(o);let a;switch(n){case p:case f:case y:a=await n(d.email);break;case w:a=await n(d.name);break;case g:a=await n(d);break;default:a=await n(d);break}o.appendChild(a)}function L(){const n=document.getElementById("app");n.innerHTML="";const e=N(o=>{d=o,window.location.hash="dashboard"});n.appendChild(e)}async function b(){const n=window.location.hash.slice(1);if(!d){L();return}switch(n){case"dashboard":await i(g);break;case"assignments":await i(f);break;case"grades":await i(p);break;case"messages":await i(w);break;case"calendar":await i(H);break;case"announcements":await i(M);break;case"attendance":await i(y);break;case"quotes":await i(h);break;case"logout":E(),window.location.hash="",location.reload();break;default:window.location.hash="dashboard";break}}window.addEventListener("hashchange",b);d?b():L();
