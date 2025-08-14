(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const m=[{content:"Keep going, you’re doing great!",author:"Unknown"},{content:"Every day is a second chance.",author:"Unknown"},{content:"Believe you can and you’re halfway there.",author:"Theodore Roosevelt"}];async function b(){const t=document.createElement("div");t.className="card quote-card",t.innerHTML="<h3>Daily Motivation</h3><p>Loading...</p>";try{const e=await fetch("https://api.quotable.io/random");if(!e.ok)throw new Error("Failed to fetch quote");const o=await e.json();t.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}catch{const o=m[Math.floor(Math.random()*m.length)];t.innerHTML=`
      <h3>Daily Motivation</h3>
      <blockquote>"${o.content}"</blockquote>
      <p>— ${o.author}</p>
    `}return t}async function M(t){const e=document.createElement("div");e.className="card",e.innerHTML=`
    <h1>Welcome, ${t.name}</h1>
    <p>Role: ${t.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `;const o=await b();return e.appendChild(o),e}const h=[{id:1,role:"parent",name:"Jane Doe",email:"jane@example.com",password:"1234",children:[2]},{id:2,role:"student",name:"John Doe",email:"john@example.com",password:"abcd",parentId:1},{id:3,role:"teacher",name:"Ms. Smith",email:"smith@example.com",password:"teach1",classes:[1]},{id:4,role:"teacher",name:"Mr. Brown",email:"brown@example.com",password:"teach2",classes:[2]}];async function d(t){return t==="users.json"?(console.log(`${t} loaded:`,h),h):(console.warn(`fetchLocalJSON: No data available for "${t}"`),[])}async function g(t){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Grades</h2><p>Loading...</p>";const a=(await d("grades.json")).filter(n=>n.studentId===t);return a.length?(e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${a.map(n=>`<li>Class ${n.classId}: ${n.grade} (${n.term})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Grades</h2><p>No grades found.</p>",e)}async function p(t){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Assignments</h2><p>Loading...</p>";const a=(await d("assignments.json")).filter(n=>n.studentId===t);return a.length?(e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${a.map(n=>`<li>${n.title} - Due: ${n.dueDate} - ${n.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Assignments</h2><p>No assignments found.</p>",e)}async function f(t){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Attendance</h2><p>Loading...</p>";const a=(await d("attendance.json")).filter(n=>n.studentId===t);return e.innerHTML=`
    <h2>Attendance</h2>
    <ul>
      ${a.length?a.map(n=>`<li>${n.date}: ${n.status}</li>`).join(""):"<li>No attendance records found.</li>"}
    </ul>
  `,e}async function w(t){const e=document.createElement("div");e.className="card",e.innerHTML="<h2>Messages</h2><p>Loading...</p>";const a=(await d("messages.json")).filter(n=>n.from===t||n.to===t);return a.length?(e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${a.map(n=>`<li><strong>${n.from}</strong> to <strong>${n.to}</strong>: ${n.message} (${n.date})</li>`).join("")}
    </ul>`,e):(e.innerHTML="<h2>Messages</h2><p>No messages found.</p>",e)}function v(t){const e=document.createElement("div");e.className="card",e.innerHTML=`
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
  `;const o=e.querySelector("#debugLog");return e.querySelector("#loginForm").addEventListener("submit",async a=>{a.preventDefault();const n=e.querySelector("#email").value.trim(),r=e.querySelector("#password").value.trim();if(o.textContent="",!n||!r){alert("Please enter email and password.");return}try{const s=await d("users.json");o.textContent+=`Login attempt: ${n}
Users loaded: ${JSON.stringify(s)}
`;const l=s.find(u=>u.email===n&&u.password===r);if(!l){o.textContent+=`No matching user found.
`,alert("Invalid email or password.");return}localStorage.setItem("user",JSON.stringify(l)),o.textContent+=`🔐 Logged in user: ${JSON.stringify(l)}
`,t(l)}catch(s){console.error("Error fetching users:",s),o.textContent+=`Error fetching users: ${s.message}
`,alert("Login failed. Please try again later.")}}),e}function $(){const t=localStorage.getItem("user");return t?JSON.parse(t):null}function H(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let i=$();async function c(t){const e=document.getElementById("app");e.innerHTML="";const o=document.createElement("div");o.id="view-container",e.appendChild(o);let a;switch(t){case g:case p:case f:a=await t(i.id);break;case w:a=await t(i.name);break;default:a=await t(i);break}o.appendChild(a)}function y(){const t=document.getElementById("app");t.innerHTML="";const e=v(o=>{i=o,window.location.hash="dashboard"});t.appendChild(e)}async function L(){const t=window.location.hash.slice(1);if(!i){y();return}switch(t){case"dashboard":await c(M);break;case"assignments":await c(p);break;case"grades":await c(g);break;case"messages":await c(w);break;case"attendance":await c(f);break;case"logout":H(),window.location.hash="",location.reload();break;default:window.location.hash="dashboard";break}}window.addEventListener("hashchange",L);i?L():y();
