/** @format */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const contactInfo = new FormData(contactForm);

  fetch(`https://localhost:44398/api/Users/Contact`, {
    method: "POST",
    body: contactInfo,
  });

  alert("Your Feedback was sent successfully!");
  window.location.reload();
});

//////////////////////////////////////////////////////////////////////////////////////////

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
