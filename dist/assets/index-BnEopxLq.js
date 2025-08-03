(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();function l(n){const e=document.createElement("div");return e.className="card",e.innerHTML=`
    <h1>Welcome, ${n.name}</h1>
    <p>Role: ${n.role}</p>
    <p>Select a module to view grades, assignments, announcements, and more.</p>
  `,e}const u=[{studentId:2,classId:1,grade:"A",term:"Fall 2025"},{studentId:2,classId:2,grade:"B+",term:"Fall 2025"}];function m(n){const e=document.createElement("div");e.className="card";const s=u.filter(t=>t.studentId===n);return e.innerHTML=`<h2>Grades</h2>
    <ul>
      ${s.map(t=>`<li>Class ${t.classId}: ${t.grade} (${t.term})</li>`).join("")}
    </ul>`,e}const f=[{id:1,classId:1,title:"Math Homework 1",description:"Complete exercises 1-10 on page 23.",dueDate:"2025-08-10",submitted:!1,studentId:2}];function p(n){const e=document.createElement("div");e.className="card";const s=f.filter(t=>t.studentId===n);return e.innerHTML=`<h2>Assignments</h2>
    <ul>
      ${s.map(t=>`<li>${t.title} - Due: ${t.dueDate} - ${t.submitted?"Submitted":"Pending"}</li>`).join("")}
    </ul>`,e}const g=[{id:1,title:"Parent-Teacher Meeting",date:"2025-08-15",content:"Join us for a parent-teacher meeting at 6pm in the school auditorium."},{id:2,title:"Sports Day",date:"2025-09-10",content:"Annual Sports Day will be held on September 10th. All are invited!"}];function h(){const n=document.createElement("div");return n.className="card",n.innerHTML=`<h2>Announcements</h2>
    <ul>
      ${g.map(e=>`<li><strong>${e.title}</strong> (${e.date}): ${e.content}</li>`).join("")}
    </ul>`,n}const y=[{id:1,event:"Midterm Exams",date:"2025-09-01",type:"Exam"},{id:2,event:"Parent-Teacher Meeting",date:"2025-08-15",type:"Meeting"}];function v(){const n=document.createElement("div");return n.className="card",n.innerHTML=`<h2>School Calendar</h2>
    <ul>
      ${y.map(e=>`<li>${e.event} - ${e.date} (${e.type})</li>`).join("")}
    </ul>`,n}const b=[{from:"Jane Ndhlovu",to:"Ms. Xaba",message:"Can we discuss John's progress?",date:"2025-08-02"},{from:"Ms. Xaba",to:"Ntandoyenkosi Dale",message:"Sure, let's schedule a meeting.",date:"2025-08-01"}];function L(n){const e=document.createElement("div");e.className="card";const s=b.filter(t=>t.from===n||t.to===n);return e.innerHTML=`<h2>Messages</h2>
    <ul>
      ${s.map(t=>`<li><strong>${t.from}</strong> to <strong>${t.to}</strong>: ${t.message} (${t.date})</li>`).join("")}
    </ul>`,e}function $(n){const e=document.createElement("div");return e.className="card",e.innerHTML=`
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
  `,e.querySelector("#loginForm").addEventListener("submit",s=>{s.preventDefault();const t=e.querySelector("#email").value.trim(),r=e.querySelector("#password").value.trim();if(t&&r){const o={name:t.split("@")[0],email:t,role:"Student"};localStorage.setItem("user",JSON.stringify(o)),n(o)}else alert("Please enter valid email and password.")}),e}function M(){const n=localStorage.getItem("user");return n?JSON.parse(n):null}function S(){localStorage.removeItem("user")}console.log("✅ High School Portal loaded");let c=M();function a(n){const e=document.getElementById("app");e.innerHTML="";const s=n(c);e.appendChild(s)}function E(){const n=document.getElementById("app");n.innerHTML="";const e=$(s=>{c=s,d(),a(l)});n.appendChild(e)}function d(){document.querySelectorAll("nav a").forEach(n=>{n.addEventListener("click",e=>{switch(e.preventDefault(),n.textContent.trim().toLowerCase()){case"dashboard":a(l);break;case"assignments":a(p);break;case"grades":a(m);break;case"messages":a(L);break;case"calendar":a(v);break;case"announcements":a(h);break;case"logout":S(),location.reload();break;default:document.getElementById("app").innerHTML="<p>Page not found.</p>"}})})}c?(d(),a(l)):E();
