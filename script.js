document.addEventListener("DOMContentLoaded", () => {

  const products = [
    {
      name: "MAX / 03 TEE",
      price: "₹999",
      image: "product-1.jpg",
      category: "tees"
    },
    {
      name: "LEWIS / 44 TEE",
      price: "₹999",
      image: "product-2.jpg",
      category: "tees"
    },
    {
      name: "CHARLES / 16 TEE",
      price: "₹999",
      image: "product-3.jpg",
      category: "tees"
    },
    {
      name: "LANDO / 01 TEE",
      price: "₹999",
      image: "product-4.jpg",
      category: "tees"
    },
    {
      name: "OSCAR / 81 TEE",
      price: "₹999",
      image: "product-5.jpg",
      category: "tees"
    }
  ];

  let cart = JSON.parse(localStorage.getItem("mainstreamCart")) || [];

  const productsContainer = document.getElementById("products");

  function saveCart() {
    localStorage.setItem("mainstreamCart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
      cartCount.textContent = count;
    }
  }

  function renderProducts(filter = "all") {

    if (!productsContainer) return;

    const filtered = filter === "all"
      ? products
      : products.filter(product => product.category === filter);

    productsContainer.innerHTML = filtered.map((product, index) => `
      <article class="product">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <strong>${product.price}</strong>
        </div>
        <button class="add" onclick="addToCart(${products.indexOf(product)})">
          ADD TO CART
        </button>
      </article>
    `).join("");
  }

  window.addToCart = function(index) {

    const product = products[index];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    saveCart();

    alert(product.name + " added to your bag!");
  };

  window.openCart = function() {
    document.getElementById("cart")?.classList.add("open");
    document.getElementById("overlay")?.classList.add("show");
    renderCart();
  };

  window.closeCart = function() {
    document.getElementById("cart")?.classList.remove("open");
    document.getElementById("overlay")?.classList.remove("show");
  };

  function renderCart() {

    const cartItems = document.getElementById("cartItems");
    const subtotal = document.getElementById("subtotal");

    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>Your bag is empty.</p>";

      if (subtotal) {
        subtotal.textContent = "₹0";
      }

      return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} × ${item.quantity}</p>

          <button onclick="removeFromCart(${index})">
            REMOVE
          </button>
        </div>
      </div>
    `).join("");

    const total = cart.reduce((sum, item) => {
      return sum + (parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity);
    }, 0);

    if (subtotal) {
      subtotal.textContent = "₹" + total;
    }
  }

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
  };

  window.checkout = function() {

    if (cart.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    alert("Checkout will be connected next.");
  };

  document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      renderProducts(button.dataset.filter);
    });

  });

  renderProducts();
  updateCartCount();
  renderCart();

});      const priceText =
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
