/** @format */

(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Sidebar Toggler
  $(".sidebar-toggler").click(function () {
    $(".sidebar, .content").toggleClass("open");
    return false;
  });

  // Progress Bar
  $(".pg-bar").waypoint(
    function () {
      $(".progress .progress-bar").each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
      });
    },
    { offset: "80%" }
  );

  // Calender
  $("#calender").datetimepicker({
    inline: true,
    format: "L",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    dots: true,
    loop: true,
    nav: false,
  });
})(jQuery);

///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

async function getAllCategory() {
  let url = "https://localhost:44398/api/Categories/GetAllCategories";

  let request = await fetch(url);

  let data = await request.json();
  let cardContainer = document.getElementById("categoriesContainer");

  console.log(data);

  var num = 0;
  data.forEach((category) => {
    num++;
    cardContainer.innerHTML += `
     <tr>
          <td>${num}</td>
          <td>${category.name}</td>
          <td>
            <img
              src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${category.img}"
              width="80"
              height="80"
              alt="Alternate Text"
            />
          </td>
          <td>
            <a class="btn btn-primary" onclick = "showProducts(${category.id})">Products</a>
          </td>
          <td><button type="click" onclick = "editCategory(${category.id})" class= "btn btn-warning"> Edit </button></td>
          <td ><button type="click" onclick = "deleteCategory(${category.id})" class= "btn btn-danger"> X </button></td>
      </tr>
        `;
  });
}

getAllCategory();

////////////////////////////////////////////////////////////////////////
async function editCategory(id) {
  localStorage.categoryId = id;
  window.location.replace("/admin/categoryDetails.html");
}

/////////////////////////////////////////////////////////////////////////////////
async function showProducts(id) {
  localStorage.categoryId = id;
  window.location.replace("/admin/products.html");
}

/////////////////////////////////////////////////////////////////////////////////
var categoryId = localStorage.getItem("categoryId");

async function getCategoryById() {
  let url = `https://localhost:44398/api/Categories/GetCategoriesById/${categoryId}`;

  let request = await fetch(url);

  let data = await request.json();
  let categoryDetailsContainer = document.getElementById(
    "categoryDetailsContainer"
  );

  categoryDetailsContainer.innerHTML = `
          <div>
            <img src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${data.img}" alt="" class="img-fluid mb-3" style="max-height: 300px;">
            <h6>Category Name: ${data.name}</h6>
          </div>
        `;
}
getCategoryById();

/////////////////////////////////////////////////////////////////////////////////
async function changeCategoryDetails() {
  event.preventDefault();

  var categoryDetailsForm = document.getElementById("categoryDetailsForm");
  const formData = new FormData(categoryDetailsForm);

  fetch(`https://localhost:44398/api/Categories/EditCategory/${categoryId}`, {
    method: "PUT",
    body: formData,
  }).then((response) => {
    alert("Category details were updated");
    window.location.reload();
  });
}

/////////////////////////////////////////////////////////////////////////
async function deleteCategory(categoryId) {
  let url = `https://localhost:44398/api/Categories/DeleteCategory/${categoryId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  })
    .then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    })
    .then(() => {
      window.location.reload();
    });
}
/////////////////////////////////////////////////////////////////////////////////

async function addCategory() {
  var addCategoryForm = document.getElementById("addCategoryForm");
  const formData = new FormData(addCategoryForm);

  debugger;

  fetch(`https://localhost:44398/api/Categories/AddCategories`, {
    method: "POST",
    body: formData,
  }).then((response) => {
    alert("Category was add!");
    window.location.href = "/admin/categories.html";
  });
}

/////////////////////////////////////////////////////////////////////////////////

async function getProductsByCategoryId() {
  let url = `https://localhost:44398/api/Products/GetProductsByCategoryId/${categoryId}`;

  let request = await fetch(url);

  let data = await request.json();
  let productsCardContainer = document.getElementById("productsContainer");

  var num = 0;
  data.forEach((product) => {
    num++;
    productsCardContainer.innerHTML += `
     <tr>
          <td>${num}</td>
          <td>${product.name}</td>
         
          <td>$${product.price}</td>
           <td>
            <img
              src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${product.imageUrl}"
              width="80"
              height="80"
              alt="Alternate Text"
            />
          </td>
          <td><button type="click" onclick = "editProduct(${product.id})" class= "btn btn-warning"> Edit </button></td>
          <td ><button type="click" onclick="deleteProduct(${product.id})" class= "btn btn-danger"> X </button></td>
      </tr>
        `;
  });
}

getProductsByCategoryId();

/////////////////////////////////////////////////////////////////////////////////

async function getCategoriesName() {
  let url = `https://localhost:44398/api/Categories/GetAllCategories`;

  let request = await fetch(url);

  let data = await request.json();
  let categoriesNames = document.getElementById("categoriesNames");

  data.forEach((category) => {
    categoriesNames.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}
getCategoriesName();

/////////////////////////////////////////////////////////////////////////////////

async function editProduct(id) {
  localStorage.productId = id;
  window.location.replace("/admin/productDetails.html");
}

/////////////////////////////////////////////////////////////////////////////////
var productId = localStorage.getItem("productId");

async function productDetails() {
  let url = `https://localhost:44398/api/Products/GetProductById/${productId}`;

  let request = await fetch(url);

  let data = await request.json();
  let productDetailsContainer = document.getElementById(
    "productDetailsContainer"
  );

  productDetailsContainer.innerHTML = `
          <div>
            <img src="/Ecommerce-BackEnd/Ecommerce-BackEnd/images/${data.imageUrl}" alt="" class="img-fluid mb-3" style="max-height: 300px;">
            <div><span>Product Name:</span><h6> ${data.name}</h6></div>
            <div><span>Product Price:</span><h6> ${data.price}</h6></div>
            <div><span>Product Description:</span><h6>${data.description}</h6></div>
          </div>
        `;
}
productDetails();

/////////////////////////////////////////////////////////////////////////////////

async function changeProductDetails() {
  event.preventDefault();

  var productDetailsForm = document.getElementById("productDetailsForm");
  const formData = new FormData(productDetailsForm);

  fetch(`https://localhost:44398/api/Products/EditProduct/${productId}`, {
    method: "PUT",
    body: formData,
  }).then((response) => {
    alert("Product details were updated");
    window.location.reload();
  });
}
/////////////////////////////////////////////////////////////////////////

async function deleteProduct(productId) {
  let url = `https://localhost:44398/api/Products/DeleteProduct/${productId}`;

  let request = await fetch(url, {
    method: "DELETE",
  });

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  }).then(() => {
    window.location.reload();
  });
}

/////////////////////////////////////////////////////////////////////////////////
async function getCategoriesNameForProduct() {
  let url = `https://localhost:44398/api/Categories/GetAllCategories`;

  let request = await fetch(url);

  let data = await request.json();
  let categoriesNames = document.getElementById("getCategoriesNameForProduct");

  data.forEach((category) => {
    categoriesNames.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
}
getCategoriesNameForProduct();

/////////////////////////////////////////////////////////////////////////////////

async function addProduct() {
  var addProductForm = document.getElementById("addProductForm");
  const formData = new FormData(addProductForm);

  fetch(`https://localhost:44398/api/Products/AddProduct`, {
    method: "POST",
    body: formData,
  }).then((response) => {
    alert("product was add!");
    window.location.href = "/admin/products.html";
  });
}
/////////////////////////////////////////////////////////////////////////////////

async function changeCategoryId(id) {
  localStorage.setItem("categoryId", id);
  window.location.reload();
}

document
  .getElementById("categoriesNames")
  .addEventListener("change", function (event) {
    let selectedId = event.target.value;
    changeCategoryId(selectedId);
  });
