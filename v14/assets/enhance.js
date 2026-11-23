/* PPG v14 enhancement layer: a gentle scroll reveal and a slow hero parallax. No libraries and no
   strings: this file only adds classes and a CSS `translate`. It fails open. Content is hidden only
   after html.ex-rv is set, which happens after every target already on screen has been marked
   visible; an in-page jump or printing shows everything at once. Off under prefers-reduced-motion, in headless
   capture (unless <html data-motion="live">), and when IntersectionObserver is missing. */
/* Pass 2 (2026-11-23): the hero video and the photo-band parallax. These run in headless capture
   too (so the browser test can see the video play); both are off under prefers-reduced-motion. */
(function () {
  "use strict";
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  /* ------------------------------------------------ hero video: mounted only when the hero names a
     file (<section class="x-cover" data-ex-video="...">). The still stays underneath as the poster and
     the fallback: no video on phones, Save-Data or 2G, and a failed load just leaves the still. */
  var cover = document.querySelector(".home .x-cover[data-ex-video]");
  var conn = navigator.connection || {};
  var slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
  if (cover && !slow && matchMedia("(min-width: 640px)").matches) {
    var plate = cover.querySelector(".x-cover__plate");
    var still = cover.querySelector(".x-cover__img");
    var v = document.createElement("video");
    v.className = "x-cover__video";
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true; v.autoplay = true; v.preload = "auto";
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true"); v.tabIndex = -1;
    if (still) v.poster = still.currentSrc || still.src;
    var src = document.createElement("source");
    src.src = cover.getAttribute("data-ex-video"); src.type = "video/mp4";
    v.appendChild(src);
    v.addEventListener("playing", function () { v.classList.add("is-playing"); cover.classList.add("has-video"); }, { once: true });
    /* <source> errors do not bubble: catch them on the way down */
    v.addEventListener("error", function () { cover.classList.remove("has-video"); v.remove(); }, true);
    plate.appendChild(v);
    var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    play();
    /* off screen, the video rests */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) play(); else v.pause(); }); }).observe(cover);
    }
  }

  /* ------------------------------------------------ photo bands: a slow parallax (tablet and up) */
  var bands = Array.prototype.slice.call(document.querySelectorAll(".ex-band__img"));
  if (!bands.length || !matchMedia("(min-width: 640px)").matches) return;
  var ticking = false;
  var update = function () {
    ticking = false;
    var vh = window.innerHeight || 800;
    bands.forEach(function (img) {
      var r = img.closest(".ex-band").getBoundingClientRect();
      if (r.bottom < -40 || r.top > vh + 40) return;
      /* -1 when the band enters at the foot, +1 when it leaves at the top; the picture is 24% taller
         than the band, so +-8% of it never shows an edge */
      var t = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)));
      img.style.translate = "0 " + (t * 8).toFixed(2) + "%";
    });
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
})();

(function () {
  "use strict";
  var html = document.documentElement;
  var reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var headless = (navigator.webdriver || /HeadlessChrome/.test(navigator.userAgent)) && html.dataset.motion !== "live";
  if (reduced || headless || html.dataset.motion === "off") return;

  /* ------------------------------------------------ scroll reveal */
  var SEL = [
    /* homepage and the sections it shares into inner pages */
    ".home .y-head", ".home .y-split > .y-prose", ".home .y-split > figure",".home .y-pull", ".home .y-cards > *", ".home .y-case__media",
    ".home .y-case__copy", ".home .y-phase", ".home .y-note", ".home .y-duo__card", ".home .y-idea",
    ".home .y-founder__photo", ".home .y-founder__copy", ".home .x-faq__head", ".home .x-faq__list",
    ".home .y-pattern__art", ".home .y-pattern__copy", ".home .x-head", ".home .x-audit > *", ".home .x-std > li",
    /* inner pages (the intake form never moves) */
    ".sub .band .h2", ".sub .band .h1", ".sub .band .prose", ".sub .band .stack", ".sub .ledger > article",
    ".sub .split--2 > div", ".sub .specimen", ".sub .qa > div"
  ].join(",");

  if ("IntersectionObserver" in window) {
    var vh = window.innerHeight || 800;
    var later = [];
    /* document order puts ancestors first, so a target inside another target is skipped */
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function (el) {
      if (el.closest(".hero, .x-cover, .intake, form, [hidden]") || el.parentElement.closest(".ex-r")) return;
      el.classList.add("ex-r");
      if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add("ex-in");
      else later.push(el);
    });
    /* siblings entering together step in one after another (at most three steps) */
    later.forEach(function (el) {
      var i = 0, p = el.previousElementSibling;
      while (p && i < 3) { if (p.classList.contains("ex-r")) i++; p = p.previousElementSibling; }
      if (i) el.style.setProperty("--ex-d", String(i));
    });
    if (later.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add("ex-in");
          io.unobserve(e.target);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
      later.forEach(function (el) { io.observe(el); });
      html.classList.add("ex-rv");
      /* an in-page jump or print must never land on blank space */
      var showAll = function () { later.forEach(function (el) { el.classList.add("ex-in"); }); io.disconnect(); };
      window.addEventListener("hashchange", showAll);
      window.addEventListener("beforeprint", showAll);
    }
  }

  /* ------------------------------------------------ hero parallax (desktop and tablet only) */
  if (!matchMedia("(min-width: 640px)").matches) return;
  var plate = document.querySelector(".sub .hero--page.has-photo > .sub-hero__bg img, .home .x-cover__plate");
  if (!plate) return;
  var hero = plate.closest("section");
  var ticking = false;
  var run = function () {
    ticking = false;
    var r = hero.getBoundingClientRect();
    if (r.bottom < 0) return;
    var y = Math.min(72, Math.max(0, -r.top * 0.12));
    plate.style.translate = "0 " + y.toFixed(1) + "px";
  };
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
  run();
})();
