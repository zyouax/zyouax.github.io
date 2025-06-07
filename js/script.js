// === Gestion du thème ===
const themeToggle = document.getElementById("theme-toggle");
const htmlEl = document.documentElement;

// Charger thème sauvegardé
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  htmlEl.setAttribute("data-theme", savedTheme);
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

// Toggle du thème
themeToggle.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  htmlEl.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

// === Sélecteur de langue (placeholder) ===
const langSelector = document.getElementById("language-selector");
langSelector.addEventListener("change", (e) => {
  const lang = e.target.value;
  console.log(`Langue sélectionnée : ${lang}`);
  // Tu peux ici charger un fichier de traduction ou changer dynamiquement le texte
});
