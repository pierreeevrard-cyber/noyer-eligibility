document.getElementById("sendBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const btn = e.target;
  btn.disabled = true;
  btn.textContent = "Redirection vers Stripe...";

  try {
    const response = await fetch("https://noyer-eligibility.onrender.com/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url; // 🚀 redirige vers Stripe Checkout
    } else {
      throw new Error("Erreur : aucune URL de session reçue");
    }
  } catch (err) {
    document.getElementById("status").textContent = "❌ " + err.message;
    btn.disabled = false;
    btn.textContent = "🚀 S’abonner à Noyer";
  }
});
