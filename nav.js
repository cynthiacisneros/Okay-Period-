(function () {
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".site-nav__toggle");
  var menu = document.getElementById("site-nav-menu");
  var toggleLabel = toggle ? toggle.querySelector(".site-nav__toggle-text") : null;
  if (!nav || !toggle || !menu) return;

  function setOpen(open) {
    nav.classList.toggle("site-nav--open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (toggleLabel) {
      toggleLabel.textContent = open ? "Close" : "Menu";
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("site-nav--open"));
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("site-nav--open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 768px)").matches) {
      setOpen(false);
    }
  });
})();
