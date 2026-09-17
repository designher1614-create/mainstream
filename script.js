document.addEventListener("DOMContentLoaded", () => {

  // Mobile menu
  const nav = document.querySelector(".nav");
  const menuButton = document.querySelector(".menu");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("menu-open");
    });
  }

  // Close menu after clicking a navigation link
  document.querySelectorAll(".links a").forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("menu-open");
    });
  });

  // Add-to-cart buttons
  document.querySelectorAll(".add").forEach(button => {
    button.addEventListener("click", () => {
      button.textContent = "✓ Added to cart";
      setTimeout(() => {
        button.textContent = "Add to cart";
      }, 1500);
    });
  });

});
