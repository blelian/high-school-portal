(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();function l(t){const e=document.createElement("div");return e.className="card",e.innerHTML=`
    <h1>Welcome, ${t.name}</h1>
    <p>Role: ${t.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `,e}const u=[{studentId:2,classId:1,grade:"A",term:"Fall 2025"},{studentId:2,classId:2,grade:"B+",term:"Fall 2025"}];function m(t){const e=document.createElement("div");e.className="card";const s=u.filter(n=>n.studentId===t);return e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${s.map(n=>`<li>Class ${n.classId}: ${n.grade} (${n.term})</li>`).join("")}
    </ul>`,e}const p=[{id:1,classId:1,title:"Math Homework 1",description:"Complete exercises 1-10 on page 23.",dueDate:"2025-08-10",submitted:!1,studentId:2}];function g(t){const e=document.createElement("div");e.className="card";const s=p.filter(n=>n.studentId===t);return e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${s.map(n=>`<li>${n.title} - Due: ${n.dueDate} - ${n.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e}const f=[{id:1,title:"Parent-Teacher Meeting",date:"2025-08-15",content:"Join us for a parent-teacher meeting at 6pm in the school auditorium."},{id:2,title:"Sports Day",date:"2025-09-10",content:"Annual Sports Day will be held on September 10th. All are invited!"}];function h(){const t=document.createElement("div");return t.className="card",t.innerHTML=`<h2>Announcements</h2>
    <ul>
      ${f.map(e=>`<li><strong>${e.title}</strong> (${e.date}): ${e.content}</li>`).join("")}
    </ul>`,t}const v=[{id:1,event:"Midterm Exams",date:"2025-09-01",type:"Exam"},{id:2,event:"Parent-Teacher Meeting",date:"2025-08-15",type:"Meeting"}];function b(){const t=document.createElement("div");return t.className="card",t.innerHTML=`<h2>School Calendar</h2>
    <ul>
      ${v.map(e=>`<li>${e.event} - ${e.date} (${e.type})</li>`).join("")}
    </ul>`,t}const y=[{from:"Jane Ndhlovu",to:"Ms. Xaba",message:"Can we discuss John's progress?",date:"2025-08-02"},{from:"Ms. Xaba",to:"Ntandoyenkosi Dale",message:"Sure, let's schedule a meeting.",date:"2025-08-01"}];function $(t){const e=document.createElement("div");e.className="card";const s=y.filter(n=>n.from===t||n.to===t);return e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${s.map(n=>`<li><strong>${n.from}</strong> to <strong>${n.to}</strong>: ${n.message} (${n.date})</li>`).join("")}
    </ul>`,e}function L(t){const e=document.createElement("div");return e.className="card",e.innerHTML=`
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
  `,e.querySelector("#loginForm").addEventListener("submit",s=>{s.preventDefault();const n=e.querySelector("#email").value.trim(),r=e.querySelector("#password").value.trim();if(n&&r){const o={name:n.split("@")[0],email:n,role:"Student"};localStorage.setItem("user",JSON.stringify(o)),t(o)}else alert("Please enter valid email and password.")}),e}function M(){const t=localStorage.getItem("user");return t?JSON.parse(t):null}function S(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let c=M();function a(t){const e=document.getElementById("app");e.innerHTML="";const s=t(c);e.appendChild(s)}function w(){const t=document.getElementById("app");t.innerHTML="";const e=L(s=>{c=s,d(),a(l)});t.appendChild(e)}function d(){document.querySelectorAll("nav a").forEach(e=>{e.addEventListener("click",s=>{switch(s.preventDefault(),e.textContent.trim().toLowerCase()){case"dashboard":a(l);break;case"assignments":a(g);break;case"grades":a(m);break;case"messages":a($);break;case"calendar":a(b);break;case"announcements":a(h);break;case"logout":S(),location.reload();break;default:document.getElementById("app").innerHTML="<p>Page not found.</p>"}})})}c?(d(),a(l)):w();
