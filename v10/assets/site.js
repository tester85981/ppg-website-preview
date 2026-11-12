/* PPG site v10 (v7 design, copy v6). No libraries. Every visible string lives in the page HTML;
   this file only shows and hides it. */
(function () {
  "use strict";

  /* Mobile menu ---------------------------------------------------------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      menu.hidden = !open;
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* Motion budget (DESIGN.md): exactly three moving things.
     1. The Home hero film. It ships with no source; one is attached only when
        the visitor allows motion (narrow file under 48em), so reduced motion
        never downloads video and keeps the still poster. Slow playback, plays
        only while on screen, Pause control (WCAG 2.2.2).
     2. Section reveal: [data-reveal] sections fade up their .r blocks once.
     3. One quiet detail: the hairline in [data-detail] draws once on entry. */
  var motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  var wrap = document.querySelector("[data-film-wrap]");
  if (wrap && motionOK && "IntersectionObserver" in window) {
    var video = wrap.querySelector("video");
    var btn = wrap.querySelector("[data-film-toggle]");
    var userPaused = false;
    var attach = function () {
      if (video.querySelector("source")) return;
      var narrow = window.matchMedia("(max-width: 48em)").matches;
      var source = document.createElement("source");
      source.src = video.getAttribute(narrow ? "data-src-narrow" : "data-src-wide");
      source.type = "video/mp4";
      video.appendChild(source);
      video.load();
    };
    var play = function () {
      attach();
      video.playbackRate = 0.8;
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    };
    video.addEventListener("loadedmetadata", function () { video.playbackRate = 0.8; });
    video.addEventListener("playing", function () { video.classList.add("is-playing"); });
    wrap.classList.add("has-video");
    btn.addEventListener("click", function () {
      userPaused = !video.paused;
      if (userPaused) { video.pause(); btn.textContent = "Play"; }
      else { play(); btn.textContent = "Pause"; }
      btn.setAttribute("aria-pressed", String(userPaused));
    });
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !userPaused) play();
        else if (!entry.isIntersecting && !video.paused) video.pause();
      });
    }, { threshold: 0.15 }).observe(wrap);
  }

  document.querySelectorAll("[data-reveal]").forEach(function (s) {
    Array.prototype.forEach.call(s.querySelectorAll(".r"), function (el, i) { el.style.setProperty("--i", String(Math.min(i, 4))); });
  });
  var moving = document.querySelectorAll("[data-reveal], [data-detail]");
  if (!motionOK || !("IntersectionObserver" in window)) {
    moving.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    moving.forEach(function (el) { io.observe(el); });
  }

  /* Inquiry form (Request an Opportunity Review) -------------------------- */
  var form = document.querySelector("[data-situation-form]");
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var submit = $("[data-submit]", form);
  var failure = $("[data-failure]", form);
  var success = $("[data-success]");

  var REQUIRED = ["name", "email", "organization", "situation"];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(name) {
    $$("[data-status]", form).forEach(function (s) {
      s.hidden = s.getAttribute("data-status") !== name;
    });
  }

  function fieldError(name) {
    var value = form.elements[name].value.trim();
    if (!value) return "missing";
    if (name === "email" && !EMAIL_RE.test(value)) return "format";
    return null;
  }

  function showFieldError(name, kind) {
    var input = form.elements[name];
    var describedBy = name === "situation" ? ["f-situation-help", "f-notice"] : [];
    $$('[data-error-for="' + name + '"]', form).forEach(function (msg) {
      msg.hidden = !(kind && msg.getAttribute("data-error-kind") === kind);
      if (!msg.hidden) describedBy.push(msg.id);
    });
    if (describedBy.length) input.setAttribute("aria-describedby", describedBy.join(" "));
    else input.removeAttribute("aria-describedby");
    if (kind) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }

  function validate() {
    var firstBad = null;
    REQUIRED.forEach(function (name) {
      var kind = fieldError(name);
      showFieldError(name, kind);
      if (kind && !firstBad) firstBad = name;
    });
    return firstBad;
  }

  function setSending(on) {
    submit.disabled = on;
    form.setAttribute("aria-busy", String(on));
    setStatus(on ? "sending" : "");
  }

  // Shown only when deliver() reports that the receiving system accepted the
  // request. Never call this on a click alone (copy: states follow real outcomes).
  function showReceipt() {
    setSending(false);
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  function showFailure() {
    setSending(false);
    failure.hidden = false;
    failure.focus();
  }

  // No endpoint yet (hosting decision pending). Nothing is transmitted or
  // stored, so the honest outcome is always "failed". At deploy, replace this
  // with the real request and resolve "accepted" only when the server confirms
  // receipt; then update /privacy to describe the real processing first.
  function deliver() {
    return Promise.resolve("failed");
  }

  function send() {
    failure.hidden = true;
    setSending(true);
    deliver().then(function (result) {
      if (result === "accepted") showReceipt();
      else showFailure();
    }, showFailure);
  }

  form.addEventListener("input", function (e) {
    var name = e.target.name;
    if (REQUIRED.indexOf(name) !== -1 && e.target.getAttribute("aria-invalid") === "true") {
      showFieldError(name, fieldError(name));
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submit.disabled) return;
    var firstBad = validate();
    if (firstBad) {
      failure.hidden = true;
      form.elements[firstBad].focus();
      return;
    }
    send();
  });

  // The button ships disabled so the form cannot submit without this script.
  submit.disabled = false;

  /* QA hook: ?demo=<state> renders a state for screenshots. Not linked.
     There is deliberately no demo for confirmed receipt. */
  var demo = params.get("demo");
  if (demo === "invalid") { form.elements.email.value = "name"; validate(); }
  if (demo === "sending") { setSending(true); }
  if (demo === "failure") { failure.hidden = false; }
})();
