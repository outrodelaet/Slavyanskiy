(function () {
  "use strict";
  function getCaption(img) {
    if (img.title && img.title.trim()) {
      return img.title.trim();
    }
    return "";
  }

  function buildLightbox() {
    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Закрыть">&times;</button>' +
      '<div class="lightbox__content">' +
      '<img class="lightbox__image" src="" alt="">' +
      '<div class="lightbox__caption"></div>' +
      "</div>";

    document.body.appendChild(overlay);
    return overlay;
  }

  function init() {
    var images = document.querySelectorAll(".container img");
    if (!images.length) {
      return;
    }

    var overlay = buildLightbox();
    var bigImage = overlay.querySelector(".lightbox__image");
    var caption = overlay.querySelector(".lightbox__caption");
    var closeBtn = overlay.querySelector(".lightbox__close");

    function open(img) {
      bigImage.src = img.currentSrc || img.src;
      bigImage.alt = img.alt || "";
      var text = getCaption(img);
      caption.textContent = text;
      caption.style.display = text ? "" : "none";
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    images.forEach(function (img) {
      img.addEventListener("click", function () {
        open(img);
      });
    });

    closeBtn.addEventListener("click", close);

    overlay.addEventListener("click", function (event) {
      if (event.target === overlay || event.target.classList.contains("lightbox__content")) {
        close();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && overlay.classList.contains("is-open")) {
        close();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
