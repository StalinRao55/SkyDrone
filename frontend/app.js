// =====================
// GLOBAL CART STATE
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =====================
// PRODUCT DATA
// =====================
const products = [
  { id: 1, name: "Basmati Rice", category: "Groceries", price: 1200, img: "/images/rice.jpg" },
  { id: 2, name: "Fresh Apples", category: "Groceries", price: 180, img: "/images/apples.jpg" },
  { id: 3, name: "Bluetooth Headphones", category: "Electronics", price: 2499, img: "/images/headphones.jpg" },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 3999, img: "/images/smartwatch.jpg" },
  { id: 5, name: "Men T-Shirt", category: "Fashion", price: 699, img: "/images/tshirt.jpg" },
  { id: 6, name: "Running Shoes", category: "Sports", price: 2999, img: "/images/shoes.jpg" }
];

// =====================
// RENDER PRODUCTS (HOME)
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("products");
  if (!productGrid) return;

  renderProducts(products);
});

function renderProducts(list) {
  const grid = document.getElementById("products");
  grid.innerHTML = "";

  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="category">${p.category}</div>
        <div class="price">₹${p.price}</div>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

// =====================
// ADD TO CART (FIXED)
// =====================
function addToCart(productId) {
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Item added to cart");
}

// =====================
// CART PAGE LOGIC
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartItems");
  if (!cartContainer) return;

  renderCart();
});

function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    total += product.price;

    cartContainer.innerHTML += `
      <div class="card">
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <div class="price">₹${product.price}</div>
        <button onclick="removeFromCart(${id})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    cart.length ? `Total: ₹${total}` : "Your cart is empty";
}

function removeFromCart(id) {
  cart = cart.filter(item => item !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
// =====================
// PLACE ORDER (FIXED)
// =====================
function placeOrder() {
  if (cart.length === 0) {
    alert("❌ Your cart is empty");
    return;
  }

  const order = {
    id: Date.now(),
    items: cart,
    status: "ORDER_PLACED"
  };

  // Save order locally (mock backend)
  localStorage.setItem("lastOrder", JSON.stringify(order));

  // Clear cart
  localStorage.removeItem("cart");
  cart = [];

  alert("✅ Order placed successfully!");

  // Redirect to tracking page
  window.location.href = "tracking.html";
}
