// script.js — Scroll reveals, animated counters, smooth anchor scroll

(function () {
  "use strict";

  // ───── Reveal-on-scroll ─────
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // ───── Animated counters (fires on first reveal of each) ─────
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const ci = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animateCounter(e.target);
            ci.unobserve(e.target);
          }
        }
      },
      { threshold: 0.3 }
    );
    counters.forEach((el) => ci.observe(el));
  }

  function animateCounter(el) {
    const final = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const dur = 1400;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = (final * eased).toFixed(decimals);
      el.textContent = `${prefix}${v}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = `${prefix}${final.toFixed(decimals)}${suffix}`;
    }
    requestAnimationFrame(step);
  }

  // ───── Smooth scroll for anchor links ─────
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = 60;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ───── Lightbox: click any [data-zoom] figure to expand full-screen ─────
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <img alt="" />
  `;
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector("img");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(() => { lightboxImg.src = ""; }, 250);
  }
  lightbox.addEventListener("click", closeLightbox);
  lightboxClose.addEventListener("click", (e) => { e.stopPropagation(); closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("show")) closeLightbox();
  });

  document.querySelectorAll("[data-zoom]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-zoom");
      const img = el.querySelector("img");
      const alt = img ? img.alt : "";
      if (src) openLightbox(src, alt);
    });
  });
})();
