import plantData from "../data/plantData.js";

let arrayProduct = [];
let currentPagination;
let typeOfFilter = "All";

// =============================================================== //
// Render Card Item
const productRow = document.querySelector(".product__row");

const renderCardItem = function (currentPagination, array) {
  // Reset HTML productRow first
  productRow.innerHTML = "";
  // Loop array and insert HTML
  array[currentPagination - 1].forEach((plant) => {
    productRow.insertAdjacentHTML(
      "beforeend",
      `
    <div class="col-xl-4 col-md-6 div__center">
      <div class="card">
        <div class="card__img">
            <img src="${plant.img}" loading="lazy" class="card-img-top" alt="${plant.name}" />
            <div class="card__hot">
                <p class="card__hot--text">HOT</p>
                <div class="card__hot--icon"></div>
            </div>
            <div class="card__menu">
                <button class="card__menu--btn">
                    <i class="fa-solid fa-cart-shopping card__menu--icon"></i>
                </button>
                <button class="card__menu--btn">
                    <i class="fa-solid fa-heart card__menu--icon"></i>
                </button>
                <button class="card__menu--btn">
                    <i class="fa-solid fa-magnifying-glass-plus card__menu--icon"></i>
                </button>
                <button class="card__menu--btn">
                    <i class="fa-solid fa-share-nodes card__menu--icon"></i>
                </button>
            </div>
            <button class="card__button--like">
              <i class="fa-regular fa-heart icon__like--outline" style="display: block;"></i>
              <i class="fa-solid fa-heart icon__like--solid" style="display: none;"></i>
            </button>
        </div>
        <div class="card-body">
          <div class="card__detail">
            <h5 class="card-name">${plant.name}</h5>
            <p class="card-price">${plant.price}</p>
          </div>
          <button class="card__button--add">
            <i class="fa-solid fa-plus icon__add"></i>
          </button>
        </div>
      </div>
    </div>    
    `
    );
  });
};

// =============================================================== //
// Card menu clicked (NEW ARRIVALS)

const handleCardMenuButtons = function () {
  const cardButtons = document.querySelectorAll(".card__menu--btn");

  cardButtons.forEach((cardButton) => {
    cardButton.addEventListener("click", function (e) {
      const buttonClicked = e.target.closest(".card__menu--btn");
      const allButtonsInRecentCard = e.target.closest(".card__menu").querySelectorAll(".card__menu--btn");

      allButtonsInRecentCard.forEach((item) => {
        // Active button and icon clicked
        if (item === buttonClicked) {
          buttonClicked.classList.toggle("active");
          buttonClicked.children[0].classList.toggle("active");
          buttonClicked.style.pointerEvents = "none";
        }
        // Remove another buttons active
        else {
          item.classList.remove("active");
          item.children[0].classList.remove("active");
          item.style.pointerEvents = "auto";
        }
      });
    });
  });
};

const handleButtonLikeAndAdd = function () {
  // Button liked and add (card product)
  const cardButtonLikes = document.querySelectorAll(".card__button--like");
  const cardButtonAdds = document.querySelectorAll(".card__button--add");

  cardButtonLikes.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      console.log("LOG");
      const iconLikeOutline = e.target.closest(".card__button--like").children[0];
      const iconLikeSolid = e.target.closest(".card__button--like").children[1];

      if (iconLikeOutline.style.display === "block") {
        iconLikeOutline.style.display = "none";
        iconLikeSolid.style.display = "block";
      } else if (iconLikeOutline.style.display === "none") {
        iconLikeOutline.style.display = "block";
        iconLikeSolid.style.display = "none";
      }
    });
  });

  cardButtonAdds.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.target.closest(".card__button--add").classList.toggle("active");
    });
  });
};

// =============================================================== //
// Pagination

const productPagination = document.querySelector(".product__pagination");

// Function
const handleArrayPagination = function (array, numberOfPage, typeOfFilter = "All") {
  let resultArray = []; // output this function
  let itemArray = []; // item in result array
  let arrayFilter = []; // array filter first and then handle pagination

  if (typeOfFilter !== "All") {
    arrayFilter = array.filter((item) => item.type === typeOfFilter);
  } else {
    arrayFilter = array;
  }

  arrayFilter.forEach((item, index) => {
    // Pagination page depend on numberOfPage
    if ((index + 1) % numberOfPage === 0) {
      itemArray.push(item);
      resultArray.push(itemArray);
      itemArray = [];
    } else {
      itemArray.push(item);
    }

    // The last item
    if (index + 1 === arrayFilter.length) {
      resultArray.push(itemArray);
    }
  });
  return resultArray;
};

const renderButtonItemPagination = function (arrayFilter) {
  let html = "";
  arrayFilter.forEach((item, index) => {
    html += `<button class="product__btn--pagination btn__pagination--normal">${index + 1}</button>`;
  });
  return html;
};

// Insert Button HTML
const renderButtonPagination = function (arrayFilter) {
  productPagination.textContent = "";
  productPagination.insertAdjacentHTML(
    "beforeend",
    `
      <button class="product__btn--pre btn__pagination--block div__center">
        <i class="fa-solid fa-angle-left"></i>
      </button>
      ${renderButtonItemPagination(arrayFilter)}
      <button class="product__btn--next btn__pagination--normal btn__pagination--block div__center">
        <i class="fa-solid fa-angle-right"></i>
      </button>
  `
  );
};

const activeButton = function (currentPagination) {
  const buttonPaginations = document.querySelectorAll(".product__btn--pagination");
  [...buttonPaginations].forEach((item, index) => {
    if (currentPagination === index + 1) {
      item.classList.add("btn__pagination--active");
    } else {
      item.classList.remove("btn__pagination--active");
    }
  });
};

const handleArrayProductSortByAlphabet = function (type, array) {
  // Type: Asc and desc
  switch (type) {
    case "asc":
      const arrayFlattenAsc = array.flat().sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      });
      array = handleArrayPagination(arrayFlattenAsc, 6, typeOfFilter);
      renderCardItem(currentPagination, array);
      break;
    case "desc":
      const arrayFlattenDesc = array.flat().sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
      });
      array = handleArrayPagination(arrayFlattenDesc, 6, typeOfFilter);
      renderCardItem(currentPagination, array);
      break;
    default:
      break;
  }
};

// Add event listener
let buttonPrev;
let buttonNext;
let buttonPaginations;

// Button SortBy (A->Z, Z->A)
const buttonSortByAlphabet = document.querySelector(".product__categories--btn__sort");
const iconSortByAZ = document.querySelector(".icon__sort-a-z");
const iconSortByZA = document.querySelector(".icon__sort-z-a");
buttonSortByAlphabet.addEventListener("click", function (e) {
  const inputSearchProduct = document.querySelector(".product__categories--input");
  inputSearchProduct.value = "";
  if (iconSortByAZ.style.display === "block") {
    iconSortByAZ.style.display = "none";
    iconSortByZA.style.display = "block";
    handleArrayProductSortByAlphabet("desc", arrayProduct);
  } else if (iconSortByAZ.style.display === "none") {
    iconSortByAZ.style.display = "block";
    iconSortByZA.style.display = "none";
    handleArrayProductSortByAlphabet("asc", arrayProduct);
  }
  handleCardMenuButtons();
  handleButtonLikeAndAdd();
});

// Handle filter product (filter type product)
const productCategoriesLink = document.querySelectorAll(".product__categories--link");

productCategoriesLink.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // Active link
    productCategoriesLink.forEach((item) => {
      if (item === e.target) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
    // Get type filter
    typeOfFilter = e.target.textContent;

    // Change array product by typeOfFilter
    arrayProduct = handleArrayPagination(plantData, 6, typeOfFilter);

    // Set currentPagination = 1
    currentPagination = 1;

    // Render card and sort by "asc"
    handleArrayProductSortByAlphabet("asc", arrayProduct);

    // Change icon sort by
    iconSortByAZ.style.display = "block";
    iconSortByZA.style.display = "none";

    // Render button pagination
    renderButtonPagination(arrayProduct);

    // Active button
    activeButton(currentPagination);

    // Handle buttons
    handleButtonPagePagination();
    handleButtonPre();
    handleButtonNext();
    handleCardMenuButtons();
  });
});

const handleButtonPreAndNext = function () {
  // When click 1st first button then disable, remove class button-pre and undisable, add class button-next
  if (currentPagination === 1) {
    buttonPrev.disabled = true;
    buttonPrev.classList.remove("btn__pagination--normal");
    buttonNext.disabled = false;
    buttonNext.classList.add("btn__pagination--normal");
  }
  // When click the last first button then disable, remove button-next and undisable, add class button-pre
  else if (currentPagination === arrayProduct.length) {
    buttonNext.disabled = true;
    buttonNext.classList.remove("btn__pagination--normal");
    buttonPrev.disabled = false;
    buttonPrev.classList.add("btn__pagination--normal");
  }
  // Another button undisable button and add class
  else {
    buttonPrev.disabled = false;
    buttonPrev.classList.add("btn__pagination--normal");
    buttonNext.disabled = false;
    buttonNext.classList.add("btn__pagination--normal");
  }
};

// Button 1,2,3,4,5,...
const handleButtonPagePagination = function () {
  buttonPaginations = document.querySelectorAll(".product__btn--pagination");

  buttonPaginations.forEach((button) => {
    button.addEventListener("click", function (e) {
      currentPagination = Number(e.target.closest(".product__btn--pagination").textContent);
      activeButton(currentPagination);
      renderCardItem(currentPagination, arrayProduct);
      handleCardMenuButtons();
      handleButtonLikeAndAdd();
      handleButtonPreAndNext();
    });
  });
};

// Button prev
const handleButtonPre = function () {
  buttonPrev = document.querySelector(".product__btn--pre");

  buttonPrev.addEventListener("click", function (e) {
    currentPagination--;
    activeButton(currentPagination);
    renderCardItem(currentPagination, arrayProduct);
    handleCardMenuButtons();
    handleButtonLikeAndAdd();
    handleButtonPreAndNext();
  });
};

// Button next
const handleButtonNext = function () {
  buttonNext = document.querySelector(".product__btn--next");

  buttonNext.addEventListener("click", function (e) {
    currentPagination++;
    activeButton(currentPagination);
    renderCardItem(currentPagination, arrayProduct);
    handleCardMenuButtons();
    handleButtonLikeAndAdd();
    handleButtonPreAndNext();
  });
};

// Button filter
const btnFilter = document.querySelector(".product__categories--btn__filter");
const listFilter = document.querySelector(".list__filter");
const listFilterLinks = document.querySelectorAll(".list__filter--link");

btnFilter.addEventListener("click", function (e) {
  listFilter.classList.toggle("active");
  const inputSearchProduct = document.querySelector(".product__categories--input");
  inputSearchProduct.value = "";
});

listFilterLinks.forEach((filterLink) => {
  filterLink.addEventListener("click", function (e) {
    e.preventDefault();
    // Active link
    listFilterLinks.forEach((item) => {
      if (item === e.target) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    listFilter.classList.remove("active");

    // Get type filter
    typeOfFilter = e.target.textContent;

    // Change array product by typeOfFilter
    arrayProduct = handleArrayPagination(plantData, 6, typeOfFilter);

    // Set currentPagination = 1
    currentPagination = 1;

    // Render card and sort by "asc"
    handleArrayProductSortByAlphabet("asc", arrayProduct);

    // Change icon sort by
    iconSortByAZ.style.display = "block";
    iconSortByZA.style.display = "none";

    // Render button pagination
    renderButtonPagination(arrayProduct);

    // Active button
    activeButton(currentPagination);

    // Handle buttons
    handleButtonPagePagination();
    handleButtonPre();
    handleButtonNext();
    handleButtonLikeAndAdd();
  });
});

// Input (Search product)
const inputSearchProduct = document.querySelector(".product__categories--input");
inputSearchProduct.addEventListener("input", function (e) {
  console.log(e.target.value);

  // Find product
  let resultProduct = arrayProduct.flat().filter((product) => product.name.toLowerCase().includes(e.target.value.toLowerCase()));

  // Has a product
  if (resultProduct.length !== 0) {
    // Change array product by typeOfFilter
    resultProduct = handleArrayPagination(resultProduct, 6, typeOfFilter);

    // Set currentPagination = 1
    currentPagination = 1;

    // Render card item
    renderCardItem(currentPagination, resultProduct);

    // Render card and sort by "asc"
    handleArrayProductSortByAlphabet("asc", resultProduct);

    // Change icon sort by
    iconSortByAZ.style.display = "block";
    iconSortByZA.style.display = "none";

    // Render button pagination
    renderButtonPagination(resultProduct);

    // Active button
    activeButton(currentPagination);

    // Handle buttons
    handleButtonPagePagination();
    handleButtonPre();
    handleButtonNext();
    handleButtonLikeAndAdd();

    console.log(resultProduct);
    console.log(arrayProduct);
  }
  // Not a product
  else {
    const productRow = document.querySelector(".product__row");
    const productPagination = document.querySelector(".product__pagination");

    productPagination.innerHTML = "";
    productRow.innerHTML = "";
    productRow.innerHTML = `<p style="text-align:center;">Âyyyy chết tiệc. Không tìm thấy sản phẩm: ${e.target.value} nào trong danh mục ${typeOfFilter}.</p>`;
  }
});

const init = function () {
  // Initial arrayProduct
  arrayProduct = handleArrayPagination(plantData, 6, typeOfFilter);

  // Set 1st current page
  currentPagination = 1;

  // Handle sort by A-Z ,render card and handle card menu

  handleArrayProductSortByAlphabet("asc", arrayProduct);
  handleCardMenuButtons();
  handleButtonLikeAndAdd();

  // Render button pagination and active it
  renderButtonPagination(arrayProduct);
  activeButton(currentPagination);

  // Handle buttons
  handleButtonPagePagination();
  handleButtonPre();
  handleButtonNext();
};

init();

// =============================================================== //
// Button move to the contact page
const introButton = document.querySelector(".intro__bottom--btn");
introButton.addEventListener("click", function (e) {
  window.location.href = "./contact.html";
});
