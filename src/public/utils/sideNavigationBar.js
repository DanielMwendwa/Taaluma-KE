const toggleButton = document.querySelector(".toggle-button"),
    mobileNav = document.querySelector(".mobile-nav"),
    backdrop = document.querySelector(".backdrop");

toggleButton.addEventListener("click", () => {
    mobileNav.classList.add("open");
    backdrop.classList.add("open");
});

backdrop.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
});
