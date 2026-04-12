/**
 * Accessible accordion for the period guide page.
 * Single-open behavior, smooth expand/collapse, inert + aria when collapsed.
 * Respects prefers-reduced-motion for panel transitions.
 */
(function () {
  var stack = document.querySelector(".pg-acc-stack");
  if (!stack) return;

  var items = stack.querySelectorAll(".pg-acc__item");
  if (!items.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function syncItem(item, open) {
    var trigger = item.querySelector(".pg-acc__trigger");
    var panel = item.querySelector(".pg-acc__panel");
    if (!trigger || !panel) return;

    trigger.setAttribute("aria-expanded", open ? "true" : "false");
    item.classList.toggle("is-open", open);

    if (open) {
      panel.removeAttribute("inert");
    } else {
      panel.setAttribute("inert", "");
    }
  }

  function closeOthers(except) {
    items.forEach(function (item) {
      if (item !== except) syncItem(item, false);
    });
  }

  items.forEach(function (item) {
    var trigger = item.querySelector(".pg-acc__trigger");
    if (!trigger) return;

    var initiallyOpen = item.classList.contains("is-open");
    syncItem(item, initiallyOpen);

    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      if (isOpen) {
        syncItem(item, false);
      } else {
        closeOthers(item);
        syncItem(item, true);
      }
    });
  });

  if (reduceMotion) {
    stack.classList.add("pg-acc-stack--reduce-motion");
  }
})();
