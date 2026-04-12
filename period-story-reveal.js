/**
 * Reveals answer copy under each story question when the block enters the viewport.
 * Stagger is handled in CSS (paragraph nth-child delays). Respects reduced motion.
 */
(function () {
  var answers = document.querySelectorAll(".pg-story__answer");
  if (!answers.length) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    answers.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  if (reduce) {
    revealAll();
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  var io = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  answers.forEach(function (el) {
    io.observe(el);
  });
})();
