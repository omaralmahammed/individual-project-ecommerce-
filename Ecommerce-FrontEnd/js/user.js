/** @format */

// Login form functionality

function Login() {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", (event) => event.preventDefault());

  const userInfo = new FormData(loginForm);
  const email = userInfo.get("email");
  const password = userInfo.get("password");

  debugger;
  fetch(`https://localhost:44398/api/Users/Login/${email}/${password}`, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      errorMessage.textContent = "";
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      window.location.href = "/Ecommerce-FrontEnd/index.html";
    })
    .catch((error) => {
      console.error(error);
      errorMessage.textContent =
        "Login failed. Please check your credentials and try again.";
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Registration form functionality

function Registration() {
  const registrationForm = document.getElementById("RegistrationForm");
  const confirmPassword = document.getElementById("confirmPassword");
  const errorMessage2 = document.getElementById("errorMessage2");

  registrationForm.addEventListener("submit", (event) =>
    event.preventDefault()
  );

  const registerInfo = new FormData(registrationForm);
  const registerEmail = registerInfo.get("email");
  const registerPassword = registerInfo.get("password");

  debugger;
  if (registerPassword === confirmPassword.value) {
    fetch(`https://localhost:44398/api/Users/Register`, {
      method: "POST",
      body: registerInfo,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        errorMessage2.textContent = "";
        window.location.href = "/Ecommerce-FrontEnd/login.html";
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        errorMessage2.textContent = `${registerEmail}, Email already exists`;
      });
  } else {
    errorMessage2.textContent = "Passwords do not match!";
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
