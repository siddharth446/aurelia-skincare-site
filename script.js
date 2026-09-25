/* Aurelia — concept build interactions (vanilla JS) */
(function () {
  "use strict";

  /* Seamless ingredient marquee: duplicate the track */
  var track = document.getElementById("marqueeTrack");
  if (track) {
    track.parentNode.appendChild(track.cloneNode(true));
  }

  /* Bag counter demo — honest, sample-only */
  var count = 0;
  var cartLink = document.querySelector(".bar__cart");
  var toast = document.getElementById("bagToast");
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-shown"); }, 2400);
  }

  document.querySelectorAll(".card__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      count += 1;
      if (cartLink) {
        cartLink.textContent = "Bag (" + count + ")";
        cartLink.classList.remove("is-bumped");
        void cartLink.offsetWidth; /* restart animation */
        cartLink.classList.add("is-bumped");
      }
      var name = btn.getAttribute("data-name") || "Item";
      showToast(name + " — sample item added. Nothing ships; this is a concept store.");
    });
  });

  /* Reveal fallback when scroll-driven CSS animations are unavailable */
  var supportsSDA = CSS.supports && CSS.supports("animation-timeline", "view()");
  if (!supportsSDA) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
      document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    }
  }
})();
