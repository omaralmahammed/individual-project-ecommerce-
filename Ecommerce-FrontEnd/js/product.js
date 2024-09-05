/** @format */

var categoryId = localStorage.getItem("categoryId");

async function getProducts() {
  let url = `https://localhost:44398/api/Products/GetProductsByCategoryId/${categoryId}`;

  let request = await fetch(url);

  let data = await request.json();
  let cardContainer = document.getElementById("product-container");

  console.log(data);

  data.forEach((product) => {
    cardContainer.innerHTML += `
        <div class="col-12 col-md-4 col-lg-3 mb-5">
            <a class="product-item" href="productDetails.html" onclick = setLocalStorage1(${product.id})>
              <img
                src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${product.imageUrl}"
                class="img-fluid product-thumbnail"
              />
              <h3 class="product-title">${product.name}</h3>
              <strong class="product-price">${product.price}$</strong>

              <span class="icon-cross ">
                <img
                  src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/cross.svg"
                  class="img-fluid"
                />
              </span>
            </a>
        </div>
      `;
  });
}

async function setLocalStorage1(id) {
  debugger;
  localStorage.productId = id;
}

getProducts();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var productId = localStorage.getItem("productId");

async function getProductDetails() {
  let url = `https://localhost:44398/api/Products/GetProductById/${productId}`;

  request = await fetch(url, {});

  let data = await request.json();
  let cardContainer = document.getElementById("product-details");

  console.log(data);

  cardContainer.innerHTML += `
        <div class="col-lg-6 col-md-12">
          <h1 class="product-title">${data.name}</h1>
          <div class="product-reviews mb-3">
            <!-- Example stars and reviews -->
            <span class="text-warning"
              >&#9733;&#9733;&#9733;&#9733;&#9734;</span
            >
            <span>4.5 (120 Reviews)</span>
          </div>
          <h3 class="product-price">
            <strong>${data.price} $</strong>
          </h3>
          <h4 class="product-description mt-3">${data.description}</h4>
          <div class="product-purchase-options mt-4">
          <select  id="qtySelect" class="form-select w-auto" style="width: 150px;" onchange="changeToInput()">
            <option value="1" selected>1 :Qty</option>
            <option value="2">2 :Qty</option>
            <option value="3">3 :Qty</option>
            <option value="4">4 :Qty</option>
            <option value="5">5 :Qty</option>
            <option value="6">6 :Qty</option>
            <option value="7">7 :Qty</option>
            <option value="8">8 :Qty</option>
            <option value="9">9 :Qty</option>
            <option value="10+">10+</option>
          </select>
          </div>
          <div class="product-purchase-options mt-4">
            <button class = "btn btn-secondary me-2" onclick= "addToCart()">Add to Cart</button>
          </div>

          <!-- Additional Product Info -->
          <div class="additional-info mt-5">
            <h5>Product Details</h5>
            <ul>
              <li>Material: Ceramic</li>
              <li>Dimensions: 24" H x 12" W x 12" D</li>
              <li>Weight: 10 lbs</li>
              <li>Color: White</li>
              <!-- Add more details as needed -->
            </ul>
          </div>
        </div>

        <div class="col-lg-6 col-md-12">
          <img
            src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${data.imageUrl}"
            alt="${data.imageUrl}"
            class="img-fluid product-thumbnail w-100"
          />
        </div>
      `;
}

getProductDetails();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// replace the dropdown list with input field

async function changeToInput() {
  const selectElement = document.getElementById("qtySelect");
  const selectedValue = selectElement.value;

  if (selectedValue === "10+") {
    const inputField = document.createElement("input");
    inputField.type = "number";
    inputField.id = "qtySelect";
    inputField.className = "form-control"; // Use className instead of class to assign Bootstrap class
    inputField.placeholder = "Enter quantity";
    inputField.style.width = "150px";

    selectElement.parentNode.replaceChild(inputField, selectElement);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// add items to cart
var userId = localStorage.getItem("userId");

async function addToCart() {
  var quantity = document.getElementById("qtySelect");
  let token = localStorage.getItem("token");

  var url = `https://localhost:44398/api/Cart/addCartItem/${userId}`;

  if (token != null) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity.value,
      }),
    });

    alert("product was add to cart successfully");
  } else {
    Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: "You have to login before!",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "/Ecommerce-FrontEnd/login.html";
    });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
