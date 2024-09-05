/** @format */

async function getFourCategory() {
  let url = "https://localhost:44398/api/Categories/GetFourCategories";

  let request = await fetch(url);

  let data = await request.json();
  let cardContainer = document.getElementById("container");

  console.log(data);

  data.forEach((category) => {
    cardContainer.innerHTML += `
    <div class="col-md-6 mb-4">
            <a class="product-item" href="shop.html" onClick="setLocalStorage(${category.id})">
              <img
                src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${category.img}"
                class="img-fluid product-thumbnail"
              />
              <h3 class="product-title">${category.name}</h3>
            </a>
    </div>
    `;
  });
}

function setLocalStorage(id) {
  localStorage.categoryId = id;
}

getFourCategory();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
