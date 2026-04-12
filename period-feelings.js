/**
 * Scroll-triggered reveal for the "What Might I Feel?" section (runs once).
 * Respects prefers-reduced-motion; falls back if IntersectionObserver is missing.
 */
(function () {
  var root = document.getElementById("feelings-section");
  if (!root) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show() {
    root.classList.add("is-visible");
  }

  if (reduce) {
    show();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    show();
    return;
  }

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        show();
        obs.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.14 }
  );

  io.observe(root);
})();
