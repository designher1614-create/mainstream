document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // CART
  // =========================

  let cart = JSON.parse(localStorage.getItem("mainstreamCart")) || [];

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll(".cart-count, #cartCount").forEach(el => {
      el.textContent = count;
    });
  }

  function saveCart() {
    localStorage.setItem("mainstreamCart", JSON.stringify(cart));
    updateCartCount();
  }

  // =========================
  // ADD TO CART
  // =========================

  document.querySelectorAll(".add").forEach(button => {

    button.addEventListener("click", () => {

      const product = button.closest(".product");

      if (!product) return;

      const name =
        product.querySelector("h3")?.textContent.trim() || "MAINSTREAM Product";

      const priceText =
        product.querySelector("strong")?.textContent.trim() || "₹999";

      const image =
        product.querySelector("img")?.getAttribute("src") || "";

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name: name,
          price: priceText,
          image: image,
          quantity: 1
        });
      }

      saveCart();

      button.textContent = "✓ ADDED";

      setTimeout(() => {
        button.textContent = "ADD TO CART";
      }, 1200);
    });

  });

  // =========================
  // TOP CART ICON
  // =========================

  document.querySelectorAll(".header-icons button").forEach(button => {

    if (button.textContent.includes("🛒")) {

      button.addEventListener("click", () => {
        window.location.href = "shop.html#cart";
      });

    }

  });

  updateCartCount();

});
