// Declare variable here
const cardMenuBtns = document.querySelectorAll(".card__menu--btn");
const cardMenuIcon = document.querySelectorAll(".card__menu--icon");
const headerSitemap = document.querySelectorAll(".header__sitemap");

// Card (NEW ARRIVALS)
cardMenuBtns.forEach((cardButton) => {
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

// // Navigation
// headerSitemap.forEach((sitemap) => {
//   sitemap.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Slider
const slider = function () {
  // Variables
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");
  let curSlide = 0;

  // Function
  const createDots = function () {
    slides.forEach(function (slide, index) {
      dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
    });
  };

  const activeDot = function (activeDot) {
    document.querySelectorAll(".dots__dot").forEach((dot) => dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${activeDot}"]`).classList.add("dots__dot--active");
  };

  const goToSlide = function (activeSlide) {
    slides.forEach(function (slide, index) {
      slide.style.transform = `translateX(${100 * (index - activeSlide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === slides.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDot(curSlide);
  };

  const preSlide = function () {
    if (curSlide === 0) {
      curSlide = slides.length - 1;
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

  // Event hanlder
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", preSlide);

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && preSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // Auto move next slide (5s for 1 slide)
  setInterval(nextSlide, 5000);
};

slider();
