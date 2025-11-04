document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // la logique d’appel à n8n sera ajoutée à l’étape suivante
  const form = document.getElementById("eligibility-form");
  const statusEl = document.getElementById("eligibility-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusEl.style.color = "#ccc";
    statusEl.textContent = "Interface prête. On branchera le webhook à l'étape suivante.";
  });
});
