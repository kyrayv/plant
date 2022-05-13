// Variable
const allSections = document.querySelectorAll(".section");
const buttonToggleMenu = document.querySelector(".header__button--toggle");
const headerToggleMenu = document.querySelector(".header__toggle--menu");
const cardButtonLikes = document.querySelectorAll(".card__button--like");
const cardButtonAdds = document.querySelectorAll(".card__button--add");
const overlay = document.querySelector(".overlay");

// Function
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");

  observer.unobserve(entry.target);
};

// Animation with section
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});

// Toggle menu responsive (Header)
buttonToggleMenu.addEventListener("click", function () {
  headerToggleMenu.classList.remove("hidden");
  headerToggleMenu.classList.add("active");
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", function () {
  headerToggleMenu.classList.remove("active");
  headerToggleMenu.classList.add("hidden");
  overlay.classList.add("hidden");
});

// Active button (Card product)
cardButtonLikes.forEach((btn) => {
  btn.addEventListener("click", function (e) {
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
