(function () {
  const $ = (s) => document.querySelector(s);

  // ====== SETTINGS ======
  const WHATSAPP_NUMBER = "2348135542890";
  const CURRENCY = "₦";

  const fmt = (n) => CURRENCY + Number(n).toLocaleString();

  // ---- Read the products straight from the cards in index.html ----
  const PRODUCTS = Array.from(document.querySelectorAll(".card")).map((c) => ({
    id: Number(c.dataset.id),
    name: c.dataset.name,
    price: Number(c.dataset.price),
    image: c.dataset.img || ""
  }));

  const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));

  // ---- Cart state (saved in the browser) ----
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem("lm_cart") || "{}"); } catch (e) { cart = {}; }
  const save = () => { try { localStorage.setItem("lm_cart", JSON.stringify(cart)); } catch (e) {} };

  // Remove anything in the saved cart that no longer exists
  Object.keys(cart).forEach((id) => { if (!byId(id)) delete cart[id]; });

  $("#year").textContent = new Date().getFullYear();

  // ---- Render cart ----
  function renderCart() {
    const ids = Object.keys(cart);
    let count = 0, total = 0;

    if (!ids.length) {
      $("#cartItems").innerHTML = `<div class="empty">Your cart is empty bestie 🖤<br/>Go add something.</div>`;
    } else {
      $("#cartItems").innerHTML = ids.map((id) => {
        const p = byId(id);
        if (!p) return "";
        const q = cart[id];
        count += q;
        total += p.price * q;
        return `
          <div class="item">
            <div class="item-img">
              ${p.image ? `<img src="${p.image}" alt="${p.name}" />` : p.name.charAt(0)}
            </div>
            <div>
              <h4>${p.name}</h4>
              <small>${fmt(p.price)}</small>
              <div class="qty">
                <button data-dec="${id}" aria-label="Decrease">−</button>
                <span>${q}</span>
                <button data-inc="${id}" aria-label="Increase">+</button>
              </div>
            </div>
            <div class="item-total">${fmt(p.price * q)}</div>
          </div>`;
      }).join("");
    }

    $("#cartCount").textContent = count;
    $("#cartTotal").textContent = fmt(total);
    $("#checkoutBtn").disabled = !count;
    $("#checkoutBtn").style.opacity = count ? 1 : 0.4;
  }

  // ---- Cart actions ----
  function add(id) {
    cart[id] = (cart[id] || 0) + 1;
    save(); renderCart(); toast("Added to cart ✦");
  }
  function inc(id) { cart[id]++; save(); renderCart(); }
  function dec(id) {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    save(); renderCart();
  }

  // ---- Drawer ----
  const openCart = () => { $("#drawer").classList.add("open"); $("#overlay").classList.add("open"); };
  const closeCart = () => { $("#drawer").classList.remove("open"); $("#overlay").classList.remove("open"); };

  // ---- Toast ----
  let t;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(t);
    t = setTimeout(() => el.classList.remove("show"), 1500);
  }

  // ---- WhatsApp checkout ----
  function checkout() {
    const ids = Object.keys(cart);
    if (!ids.length) return;

    let total = 0;
    const lines = ids.map((id) => {
      const p = byId(id);
      const q = cart[id];
      total += p.price * q;
      return `• ${q}x ${p.name} — ${fmt(p.price * q)}`;
    });

    const msg =
      `Hey Ledde Manga! 🖤 I wanna order:\n\n` +
      lines.join("\n") +
      `\n\nTotal: ${fmt(total)}\n\n` +
      `Name:\nDelivery address:\n\nThank you!`;

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg),
      "_blank"
    );
  }

  // ---- Events ----
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-add]");
    const i = e.target.closest("[data-inc]");
    const d = e.target.closest("[data-dec]");
    if (a) add(a.dataset.add);
    if (i) inc(i.dataset.inc);
    if (d) dec(d.dataset.dec);
  });
  $("#openCart").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#overlay").addEventListener("click", closeCart);
  $("#checkoutBtn").addEventListener("click", checkout);
  $("#clearCart").addEventListener("click", () => { cart = {}; save(); renderCart(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  // ---- Init ----
  renderCart();
})();
