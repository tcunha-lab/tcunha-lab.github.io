---
---
// Email anti-scrape: team cards and the footer store the user/domain halves
// in data-u / data-d. We assemble the real address as late as possible —
// once per element — and then trigger the navigation ourselves.
//
// Why we assemble on pointerdown/focus in addition to click:
// When an <a href="#"> is clicked, the browser commits to navigating to #
// BEFORE synchronously-bound click listeners run, in some browsers. So if
// we only mutate the href in a click handler, the browser has already
// decided to scroll to top and we end up "reopening the page" (which is
// exactly what the user saw). Two belt-and-suspenders fixes:
//   1. Assemble on mouseenter / focusin / pointerdown so href is already
//      a real mailto: before the click fires.
//   2. On click, preventDefault and navigate explicitly to el.href, so
//      even without hover/focus (e.g. touch devices, keyboard via Enter)
//      the mail client opens.

(function () {
  function assemble(el) {
    if (el.dataset.done === "1") return;
    var u = el.dataset.u, d = el.dataset.d;
    if (!u || !d) return;
    var addr = u + "@" + d;
    el.href = "mailto:" + addr;
    if (el.dataset.fill === "text") el.textContent = addr;
    el.dataset.done = "1";
  }

  document.querySelectorAll(".js-mail").forEach(function (el) {
    ["mouseenter", "focusin", "pointerdown", "touchstart"].forEach(function (ev) {
      el.addEventListener(ev, function () { assemble(el); }, { passive: true });
    });
    el.addEventListener("click", function (e) {
      assemble(el);
      // Href is now mailto:... — navigate explicitly so we don't inherit
      // the browser's earlier decision to follow href="#".
      if (el.href && el.href.indexOf("mailto:") === 0) {
        e.preventDefault();
        window.location.href = el.href;
      }
    });
  });
})();
