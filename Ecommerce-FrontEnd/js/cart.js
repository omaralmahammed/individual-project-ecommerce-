/** @format */
var userId = localStorage.getItem("userId");

async function showItemsCart() {
  let url = `https://localhost:44398/api/Cart/getUserCartItems/${userId}`;

  let request = await fetch(url);

  let data = await request.json();
  let cardContainer = document.getElementById("product-cart");

  var totalCartPrice = 0;

  data.forEach((item) => {
    totalCartPrice += item.product.price * item.quantity;

    cardContainer.innerHTML += `
                 <tr>
                    <td class="product-thumbnail">
                      <img
                        src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${
                          item.product.imageUrl
                        }"
                        alt="Image"
                        class="img-fluid"
                      />
                    </td>
                    <td class="product-name">
                      <h2 class="h5 text-black">${item.product.name}</h2>
                    </td>
                    <td>$${item.product.price}</td>
                    <td>
                      <div
                        class="input-group mb-3 d-flex align-items-center quantity-container"
                        style="max-width: 120px; margin: auto"
                      >
                        <div class="input-group-prepend">
                          <button
                            onclick = "decreasreQuantity(${item.cartItemId})"
                            class="btn btn-outline-black decrease"
                            type="button"
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          id="quantity-${item.cartItemId}"
                          onchange="changeQuantity(${item.cartItemId})"
                          type="text"
                          class="form-control text-center quantity-amount"
                          value="${item.quantity}"
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                        />
                        <div class="input-group-append">
                          <button
                            onclick = "increasreQuantity(${item.cartItemId})"
                            class="btn btn-outline-black increase"
                            type="button"
                          >
                            &plus;
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>$${item.quantity * item.product.price}</td>
                    <td><button type="button" class="btn btn-black btn-sm" onclick="deletItem(${
                      item.cartItemId
                    })">X</button></td>
                  </tr>
      `;
  });

  let cartTotalElements = document.getElementsByClassName("cartTotal");

  cartTotalElements[0].innerHTML = totalCartPrice;
  cartTotalElements[1].innerHTML = totalCartPrice;
}

showItemsCart();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function increasreQuantity(CartItemId) {
  currentQuantity = document.getElementById(`quantity-${CartItemId}`);
  newQuantity = parseInt(currentQuantity.value) + 1;
  debugger;
  var url = `https://localhost:44398/api/Cart/changeQuantity`;
  debugger;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemId: CartItemId,
      quantity: newQuantity,
    }),
  });

  window.location.reload();
}

function decreasreQuantity(CartItemId) {
  currentQuantity = document.getElementById(`quantity-${CartItemId}`);
  newQuantity = parseInt(currentQuantity.value) - 1;
  debugger;
  var url = `https://localhost:44398/api/Cart/changeQuantity`;
  debugger;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemId: CartItemId,
      quantity: newQuantity,
    }),
  });

  window.location.reload();
}

function changeQuantity(CartItemId) {
  currentQuantity = document.getElementById(`quantity-${CartItemId}`);
  newQuantity = parseInt(currentQuantity.value);
  debugger;
  var url = `https://localhost:44398/api/Cart/changeQuantity`;
  debugger;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemId: CartItemId,
      quantity: newQuantity,
    }),
  });

  window.location.reload();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function deletItem(id) {
  let url = `https://localhost:44398/api/Cart/deleteItemById/${id}`;

  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      alert("item was deleted!");
      location.reload();
    }
  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var userId = localStorage.getItem("userId");

function replaceNavbar() {
  const selectElement = document.getElementById("navbar");

  if (userId != "null") {
    const tempContainer = document.createElement("div");

    tempContainer.innerHTML = `

      <ul class="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5" id="navbar">
        <li>
          <a class="nav-link" href="profile.html">
            <img src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/user.svg" />
          </a>
        </li>
        <li>
          <a class="nav-link" href="cart.html" style="margin-right: 10px;">
            <img src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/cart.svg" />
          </a>
        </li>
        <li><a class="btn tn btn-white-outline" href="#" onclick = "Logout()">Log out</a></li>

      </ul>`;

    const newNavbar = tempContainer.firstElementChild;

    selectElement.parentNode.replaceChild(newNavbar, selectElement);
  }
}

replaceNavbar();

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function Logout() {
  localStorage.userId = "null";
  localStorage.removeItem("token");
  window.location.reload();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
