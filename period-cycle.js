/**
 * Cycle timeline: scroll-in reveal + single-select aria-pressed for tap/keyboard.
 */
(function () {
  var timeline = document.querySelector("[data-cycle-timeline]");
  if (!timeline) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal() {
    timeline.classList.add("is-visible");
  }

  if (reduce) {
    reveal();
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          reveal();
          obs.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    io.observe(timeline);
  } else {
    reveal();
  }

  var items = timeline.querySelectorAll("[data-cycle-step]");
  if (!items.length) return;

  function setActive(targetLi) {
    items.forEach(function (li) {
      var btn = li.querySelector(".pg-cycle__step");
      var on = li === targetLi;
      li.classList.toggle("is-active", on);
      if (btn) btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  items.forEach(function (li) {
    var btn = li.querySelector(".pg-cycle__step");
    if (!btn) return;
    btn.addEventListener("click", function () {
      setActive(li);
    });
    btn.addEventListener("focusin", function () {
      setActive(li);
    });
  });
})();
