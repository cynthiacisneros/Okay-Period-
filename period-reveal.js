/**
 * Soft scroll reveal for period guide cards (Intersection Observer).
 * Respects prefers-reduced-motion; no-op fallback if IO is missing.
 */
(function () {
  var nodes = document.querySelectorAll(".pg-reveal");
  if (!nodes.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  nodes.forEach(function (el, i) {
    el.style.setProperty("--reveal-index", String(i));
  });

  if (reduce) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -7% 0px", threshold: 0.1 }
  );

  nodes.forEach(function (el) {
    io.observe(el);
  });
})();
