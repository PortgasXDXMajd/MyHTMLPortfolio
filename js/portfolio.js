document.addEventListener("DOMContentLoaded", () => {
const grid = document.getElementById("project-grid");
const search = document.getElementById("search");


fetch("./data/projects.json")
.then(res => {
if (!res.ok) throw new Error(`HTTP ${res.status}`);
return res.json();
})
.then(projects => {
renderProjects(projects);
search?.addEventListener("input", e => {
const term = e.target.value.toLowerCase();
const filtered = projects.filter(p =>
p.title.toLowerCase().includes(term) ||
p.description.toLowerCase().includes(term) ||
(Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase().includes(term) : false)
);
renderProjects(filtered);
});
})
.catch(err => {
grid.innerHTML = `<p class="note">⚠️ Failed to load projects: ${err.message}</p>`;
console.error("Error loading projects:", err);
});


function renderProjects(projects) {
grid.innerHTML = "";
if (!projects || projects.length === 0) {
grid.innerHTML = "<p class=\"note\">No projects found.</p>";
return;
}


projects.forEach(p => {
const card = document.createElement("article");
card.className = "panel project";
card.innerHTML = `
<div class="card-content">
<h3 style="margin-bottom:.2rem;">${p.title}</h3>
<p class="section-sub" style="margin:.1rem 0 .6rem;">${p.organization ?? ""}${p.organization && p.date ? " | " : ""}${p.date ?? ""}</p>
<p>${p.description}</p>
<div class="badges" style="margin-top:.8rem;">${(p.tags || []).map(t => `<span class=\"tag\">${t}</span>`).join("")}</div>
<div class="actions" style="margin-top: .9rem;">${(p.links || []).map(l => `<a class=\"btn btn-ghost\" href=\"${l.url}\" target=\"_blank\" rel=\"noreferrer noopener\">${l.label}</a>`).join(" ")}</div>
</div>
`;
grid.appendChild(card);
});
}
});