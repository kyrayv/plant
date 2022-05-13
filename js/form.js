// Variable
const inputs = document.querySelectorAll(".form__input");
const iconPassword = document.querySelector(".icon__password");
const iconPasswordShow = document.querySelector(".icon__password--show");
const iconPasswordHiden = document.querySelector(".icon__password--hiden");
const imgSliders = document.querySelectorAll(".form__card--img__item");
const dotsContainer = document.querySelector(".form__card--dots");
const formCard = document.querySelector(".form__card");

// Function
const handleShowIcon = function (element, status) {
  element.style.display = status;
};

// Event Listener
// Handle Input (Animation)
inputs.forEach(function (input) {
  input.addEventListener("click", function (e) {
    // Get label
    const label = e.target.nextElementSibling;

    // Handle input, lable
    input.classList.add("active");
    label.classList.remove("entered");
    label.classList.add("active");

    // Handle icon password
    if (input.getAttribute("id") === "form__password") {
      // Check input value
      if (input.value === "") {
        iconPassword.style.display = "none";
      } else {
        iconPassword.style.display = "block";
      }
      // Check when user type
      input.addEventListener("input", function (e) {
        if (e.target.value === "") {
          // No letter in input password
          iconPassword.style.display = "none";
        } else {
          // Has letter in input password
          iconPassword.style.display = "block";
        }
      });
    }

    document.addEventListener("click", function handleClickedOutside(e) {
      if (!input.contains(e.target) && !iconPasswordShow.contains(e.target) && !iconPasswordHiden.contains(e.target)) {
        // Click outside the input (no letter typed)
        if (input.value === "") {
          input.classList.remove("active");
          label.classList.remove("active");
          document.removeEventListener("click", handleClickedOutside);
          iconPassword.style.display = "none";
        }
        //  Click outside the input (has letter typed)
        else {
          input.classList.remove("active");
          label.classList.remove("active");
          label.classList.add("entered");
          document.removeEventListener("click", handleClickedOutside);
          iconPassword.style.display = "none";
        }
      }
    });
  });
});

// Show and Hide icon password
iconPasswordShow.addEventListener("click", (e) => {
  e.preventDefault();
  handleShowIcon(iconPasswordShow, "none");
  handleShowIcon(iconPasswordHiden, "block");
  document.querySelector("#form__password").setAttribute("type", "password");
});

iconPasswordHiden.addEventListener("click", (e) => {
  e.preventDefault();
  handleShowIcon(iconPasswordShow, "block");
  handleShowIcon(iconPasswordHiden, "none");
  document.querySelector("#form__password").setAttribute("type", "text");
});

// Slider
const slider = function () {
  let curSlide = 0;

  const createDots = function () {
    imgSliders.forEach(function (img, index) {
      dotsContainer.insertAdjacentHTML("beforeend", `<button class="form__card--dot" data-slide="${index}"></button>`);
    });
  };

  const activeDot = function (activeDot) {
    document.querySelectorAll(".form__card--dot").forEach((dot, item) => dot.classList.remove("active"));
    document.querySelector(`.form__card--dot[data-slide="${activeDot}"]`).classList.add("active");
  };

  const goToSlide = function (activeSlide) {
    imgSliders.forEach(function (imgSlider, index) {
      imgSlider.style.transform = `translateX(${-100 * activeSlide}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === imgSliders.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const preSlide = function () {
    if (curSlide === 0) {
      curSlide = imgSliders.length - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };

  init();

  // Event handler
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("form__card--dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // Auto move the next slide
  setInterval(nextSlide, 5000);
};

slider();
