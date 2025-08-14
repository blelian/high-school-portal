(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const h=[{content:"Keep going, you’re doing great!",author:"Unknown"},{content:"Every day is a second chance.",author:"Unknown"},{content:"Believe you can and you’re halfway there.",author:"Theodore Roosevelt"}];async function L(){const n=document.createElement("div");n.className="card quote-card",n.innerHTML="<h3>Daily Motivation</h3><p>Loading...</p>";try{const e=await fetch("https://api.quotable.io/random");if(!e.ok)throw new Error("Failed to fetch quote");const o=await e.json();n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}catch{const o=h[Math.floor(Math.random()*h.length)];n.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}return n}async function b(n){const e=document.createElement("div");e.className="card",e.innerHTML=`
    <h1>Welcome, ${n.name}</h1>
    <p>Role: ${n.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;const o=await L();return e.appendChild(o),e}async function d(n){try{const o=`${window.location.hostname.includes("github.io")?"/high-school-portal":""}/data/${n}`;console.log("Fetching JSON from:",o);const r=await fetch(o);if(!r.ok)throw new Error(`Failed to fetch ${n}: ${r.status}`);const t=await r.json();return console.log(`${n} loaded:`,t),t}catch(e){return console.error("Error fetching JSON:",e),[]}}async function g(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Grades</h2><p>Loading...</p>";const r=(await d("grades.json")).filter(t=>t.studentId===n);return r.length?(e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${r.map(t=>`<li>Class ${t.classId}: ${t.grade} (${t.term})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Grades</h2><p>No grades found.</p>",e)}async function m(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Assignments</h2><p>Loading...</p>";const r=(await d("assignments.json")).filter(t=>t.studentId===n);return r.length?(e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${r.map(t=>`<li>${t.title} - Due: ${t.dueDate} - ${t.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Assignments</h2><p>No assignments found.</p>",e)}async function p(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Attendance</h2><p>Loading...</p>";const r=(await d("attendance.json")).filter(t=>t.studentId===n);return e.innerHTML=`
    <h2>Attendance</h2>
    <ul>
      ${r.length?r.map(t=>`<li>${t.date}: ${t.status}</li>`).join(""):"<li>No attendance records found.</li>"}
    </ul>
  `,e}async function f(n){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Messages</h2><p>Loading...</p>";const r=(await d("messages.json")).filter(t=>t.from===n||t.to===n);return r.length?(e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${r.map(t=>`<li><strong>${t.from}</strong> to <strong>${t.to}</strong>: ${t.message} (${t.date})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Messages</h2><p>No messages found.</p>",e)}function $(n){const e=document.createElement("div");e.className="card",e.innerHTML=`
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
  `;const o=e.querySelector("#debugLog");return e.querySelector("#loginForm").addEventListener("submit",async r=>{r.preventDefault();const t=e.querySelector("#email").value.trim(),a=e.querySelector("#password").value.trim();if(o.textContent="",!t||!a){alert("Please enter email and password.");return}try{const s=await d("users.json");o.textContent+=`Login attempt: ${t}
Users loaded: ${JSON.stringify(s)}
`;const l=s.find(u=>u.email===t&&u.password===a);if(!l){o.textContent+=`No matching user found.
`,alert("Invalid email or password.");return}localStorage.setItem("user",JSON.stringify(l)),o.textContent+=`🔐 Logged in user: ${JSON.stringify(l)}
`,n(l)}catch(s){console.error("Error fetching users:",s),o.textContent+=`Error fetching users: ${s.message}
`,alert("Login failed. Please try again later.")}}),e}function M(){const n=localStorage.getItem("user");return n?JSON.parse(n):null}function v(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let i=M();async function c(n){const e=document.getElementById("app");e.innerHTML="";const o=document.createElement("div");o.id="view-container",e.appendChild(o);let r;switch(n){case g:case m:case p:r=await n(i.id);break;case f:r=await n(i.name);break;default:r=await n(i);break}o.appendChild(r)}function w(){const n=document.getElementById("app");n.innerHTML="";const e=$(o=>{i=o,window.location.hash="dashboard"});n.appendChild(e)}async function y(){const n=window.location.hash.slice(1);if(!i){w();return}switch(n){case"dashboard":await c(b);break;case"assignments":await c(m);break;case"grades":await c(g);break;case"messages":await c(f);break;case"attendance":await c(p);break;case"logout":v(),window.location.hash="",location.reload();break;default:window.location.hash="dashboard";break}}window.addEventListener("hashchange",y);i?y():w();
