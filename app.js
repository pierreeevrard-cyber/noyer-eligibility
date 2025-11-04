// === CONFIG ===
const N8N_WEBHOOK_URL = "https://pierre07.app.n8n.cloud/webhook/d086fafa-765a-43f0-8b40-8ed6e6b38142"; // à remplacer si besoin

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("eligibility-form");
  const input = document.getElementById("eligibility-url");
  const statusEl = document.getElementById("eligibility-status");
  const submitBtn = document.getElementById("eligibility-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    statusEl.style.color = "#ccc";
    statusEl.textContent = "⏳ Vérification en cours...";
    submitBtn.disabled = true;

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: input.value.trim() })
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = {}; }

      if (!res.ok) throw new Error(data?.reason || `Erreur HTTP ${res.status}`);

      if (data.eligible) {
        statusEl.style.color = "#7bd88f";
        statusEl.textContent = "✅ Éligible ! Votre site est compatible avec Noyer.";
      } else {
        statusEl.style.color = "#ff6b6b";
        statusEl.textContent = "❌ Non éligible. " + (data.reason || "");
      }
    } catch (err) {
      statusEl.style.color = "#ff6b6b";
      statusEl.textContent = "⚠️ Erreur pendant la vérification. Vérifie ton webhook.";
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
