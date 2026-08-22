const floatingButtons = document.querySelectorAll(
  ".floating-menu .nav-list button"
);

floatingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target);

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// TOP 버튼
const topButton = document.querySelector(".top-btn");

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
