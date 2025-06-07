// Récupération des dépôts + affichage enrichi
const container = document.getElementById("repo-list");
const filtersContainer = document.createElement("div");
filtersContainer.className = "repo-filters";

let allRepos = [];

fetch("https://api.github.com/users/zyouax/repos")
  .then(res => res.json())
  .then(data => {
    allRepos = data;
    displayRepos(data);
    buildFilters(data);
  })
  .catch(err => {
    container.innerHTML = "<p>Erreur de chargement des dépôts.</p>";
    console.error(err);
  });

function displayRepos(repos) {
  container.innerHTML = "";
  repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  container.appendChild(filtersContainer);
  repos.forEach(repo => {
    const updatedDaysAgo = Math.floor((Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24));
    const div = document.createElement("div");
    div.className = "repo-card";
    div.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>${repo.description || "Aucune description disponible."}</p>
      <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🛠️ ${repo.language || "Inconnu"}</p>
      <p><span class="badge">🕒 Mis à jour il y a ${updatedDaysAgo} jour${updatedDaysAgo > 1 ? 's' : ''}</span></p>
      <button class="use-button" onclick="window.open('https://zyouax.github.io/${repo.name}', '_blank')">Utiliser ce projet 🚀</button>
    `;
    container.appendChild(div);
  });
}

function buildFilters(repos) {
  const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];
  const select = document.createElement("select");
  select.innerHTML = `<option value="">🌐 Tous les langages</option>` +
    languages.map(lang => `<option value="${lang}">${lang}</option>`).join("");

  select.addEventListener("change", e => {
    const lang = e.target.value;
    const filtered = lang ? allRepos.filter(r => r.language === lang) : allRepos;
    displayRepos(filtered);
  });

  filtersContainer.innerHTML = "";
  filtersContainer.appendChild(select);
}
