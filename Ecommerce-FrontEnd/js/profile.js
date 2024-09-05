/** @format */

userId = localStorage.getItem("userId");

async function getUserInfo() {
  var container = document.getElementById("infoContainer");

  let url = `https://localhost:44398/api/Users/GetUserInfo/${userId}`;

  let request = await fetch(url);

  let data = await request.json();
  container.innerHTML = `
    
     <form  id="updateUserInfoForm"
            enctype="multipart/form-data">
                    <p class="text-left">Personal Information</p>
                    <hr />
                    <div class="row">
                      <div class="col-md-6">
                        <label class="text-black" required>First Name</label>
                        <input
                          type="text"
                          value = "${data.firstName}"
                          class="form-control"
                          id="firstName"
                          name="firstName"
                          required
                        />
                      </div>

                      <div class="col-md-6">
                        <label class="text-black" required>Last Name</label>
                        <input
                          type="text"
                          value = "${data.lastName}"
                          class="form-control"
                          id="lastName"
                          name="lastName"
                          required
                        />
                      </div>
                    </div>

                    <!-- Contact Information Section -->
                    <p class="text-right mt-4">Contact Information</p>
                    <hr />
                    <div class="row">
                      <div class="col-md-4">
                        <label class="text-black" required>Email</label>
                        <input
                          type="email"
                          value = "${data.email}"
                          class="form-control"
                          id="email"
                          name="email"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label class="text-black" required>Phone Number</label>
                        <input
                          type="number"
                          value = "${data.phoneNumber}"
                          class="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          required
                        />
                      </div>

                      <div class="col-md-4">
                        <label class="text-black" required
                          >Alternative Phone Number</label
                        >
                        <input
                          type="number"
                          value = "${data.alternativePhoneNumber}"
                          class="form-control"
                          id="alternativePhoneNumber"
                          name="alternativePhoneNumber"
                        />
                      </div>
                    </div>

                    <!-- Location Information Section -->
                    <p class="text-right mt-4">Address Information</p>
                    <hr />
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label class="text-black" required>Country</label>
                        <input
                          type="text"
                          value = "${data.country}"
                          class="form-control"
                          id="country"
                          name="country"
                          required
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label class="text-black" required>City</label>
                        <input
                          type="text"
                          value = "${data.city}"
                          class="form-control"
                          id="city"
                          name="city"
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <label class="text-black" required>Address</label>
                        <input
                          type="text"
                          value = "${data.address}"
                          class="form-control"
                          id="address"
                          name="address"
                        />
                      </div>

                      <div class="form-group col-md-6">
                        <label class="text-black" required>Post Code</label>
                        <input
                          type="text"
                          value = "${data.postcode}"
                          class="form-control"
                          id="postcode"
                          name="postcode"
                        />
                      </div>
                    </div>

                    <!-- Email Section -->
                    <p class="text-right mt-4">Password</p>
                    <hr />
                    <div class="row">
                      <div class="col-md-4">
                        <label class="text-black" required
                          >Current Password</label
                        >
                        <input
                           
                          type="password"
                          name="Password"
                          class="form-control"
                        />
                        <p id="errorPassword" class = "text-danger"></p>
                      </div>
                      <div class="col-md-4">
                        <label class="text-black" required>New Password</label>
                        <input
                          id="newPassword"
                          type="password"
                          name="newPassword"
                          class="form-control"
                        />
                      </div>

                      <div class="col-md-4">
                        <label class="text-black" required
                          >Confirm New Password</label
                        >
                        <input
                          id = "confirmNewPassword"
                          type="password"
                          name="confirmNewPassword"
                          class="form-control"
                        />
                        <p id="errorConfirmNewPassword" class = "text-danger"></p>
                      </div>
                    </div>

                    <br />

                    <!-- Save Button -->
                    <div class="text-center">
                      <button type="submit" class="btn btn-primary" onclick ="updateData()">
                        Save
                      </button>
                    </div>
                  </form>`;
}

getUserInfo();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function updateData() {
  event.preventDefault();
  const formRef = document.getElementById("updateUserInfoForm");
  const formData = new FormData(formRef);

  let url = `https://localhost:44398/api/Users/GetUserInfo/${userId}`;
  let request = await fetch(url);
  let data = await request.json();

  var currentPassword = formData.get("Password");
  var newPassword = formData.get("newPassword");
  var confirmNewPassword = formData.get("confirmNewPassword");

  if (currentPassword != "") {
    if (currentPassword == data.password) {
      errorPassword = document.getElementById("errorPassword");
      errorPassword.innerHTML = "";

      if (newPassword == confirmNewPassword) {
        errorConfirmNewPassword = document.getElementById(
          "errorConfirmNewPassword"
        );

        errorConfirmNewPassword, (innerHTML = "");

        formData.set("Password", newPassword);

        fetch(`https://localhost:44398/api/Users/UpdateUserInfo/${userId}`, {
          method: "POST",
          body: formData,
        });

        alert("Data was updated!");
        window.location.reload();
      } else {
        errorConfirmNewPassword, (innerHTML = "Password not match");
      }
    } else {
      errorPassword.innerHTML = "Incorrect Password";
    }
  } else {
    fetch(`https://localhost:44398/api/Users/UpdateUserInfo/${userId}`, {
      method: "POST",
      body: formData,
    });

    alert("Data was updated!");
    window.location.reload();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

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
