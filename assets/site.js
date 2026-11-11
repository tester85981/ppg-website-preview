/* PPG site v4. No libraries. Every visible string lives in the page HTML;
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

  /* Stagger order: --i on hero lines, on .r blocks within a section, and on
     the rows of a .stagger list. CSS turns it into a delay. */
  var setIndex = function (els) {
    Array.prototype.forEach.call(els, function (el, i) { el.style.setProperty("--i", String(i)); });
  };
  setIndex(document.querySelectorAll("[data-hero] .hero__in"));
  document.querySelectorAll("[data-reveal]").forEach(function (section) {
    setIndex(section.querySelectorAll(".r"));
  });
  document.querySelectorAll(".stagger").forEach(function (list) { setIndex(list.children); });

  /* Reveal on entry (24px rise, hairline draw-in) and image settle -------- */
  var sections = document.querySelectorAll("[data-reveal], [data-settle]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    sections.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    sections.forEach(function (el) { io.observe(el); });
  }

  /* Video media (Home hero + band): decorative, muted, looping. Under
     reduced motion they never play or download: autoplay is dropped, the
     <source> is detached and the element reloaded, leaving the poster still.
     If the mp4 fails to load, the poster stays too. */
  var videos = document.querySelectorAll(".media video");
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var setVideoMotion = function (still) {
    videos.forEach(function (v) {
      v.muted = true;
      if (still) {
        v.autoplay = false;
        v.removeAttribute("autoplay");
        v.pause();
        v._sources = v._sources || Array.prototype.slice.call(v.querySelectorAll("source"));
        v._sources.forEach(function (s) { s.remove(); });
        v.load();
      } else if (v._sources && !v.querySelector("source")) {
        v._sources.forEach(function (s) { v.appendChild(s); });
        v.autoplay = true;
        v.load();
        v.play().catch(function () {});
      }
    });
  };
  if (videos.length) {
    if (reduce) setVideoMotion(true);
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener("change", function (e) { setVideoMotion(e.matches); });
    }
  }

  /* Discuss a Situation form --------------------------------------------- */
  var form = document.querySelector("[data-situation-form]");
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var summary = $("[data-form-summary]", form);
  var submit = $("[data-submit]", form);
  var failure = $("[data-failure]", form);
  var unknown = $("[data-unknown]", form);
  var verify = $("[data-verify]", form);
  var verifyExpired = $("[data-verify-expired]", form);
  var success = $("[data-success]");
  var survey = $("[data-survey]");
  var surveyThanks = $("[data-survey-thanks]");

  // Survey rotation from the copy: question 1 in weeks 1 to 4, question 2 in
  // weeks 5 to 8. The start date is not set yet, so question 1 ships.
  var SURVEY_QUESTION = 1;
  $$("[data-survey-q]").forEach(function (q) {
    q.hidden = q.getAttribute("data-survey-q") !== String(SURVEY_QUESTION);
  });

  // ?asset=capacity|customers|distribution pre-selects "What's underused?"
  var asset = params.get("asset");
  if (asset) {
    var match = $('input[name="asset"][value="' + asset.replace(/[^a-z-]/g, "") + '"]', form);
    if (match) match.checked = true;
  }

  var REQUIRED = ["name", "email", "organization", "situation"];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(name) {
    $$("[data-status]", form).forEach(function (s) {
      s.hidden = s.getAttribute("data-status") !== name;
    });
  }

  function hasInput() {
    return $$("input[type=text], input[type=email], textarea", form).some(function (el) {
      return el.value.trim() !== "";
    });
  }

  function fieldError(name) {
    var value = form.elements[name].value.trim();
    if (name === "email") {
      if (!value) return "missing";
      if (!EMAIL_RE.test(value)) return "format";
      return null;
    }
    return value ? null : "missing";
  }

  function showFieldError(name, kind) {
    var input = form.elements[name];
    var help = input.id + "-help";
    var shown = null;
    $$('[data-error-for="' + name + '"]', form).forEach(function (msg) {
      var k = msg.getAttribute("data-error-kind") || "missing";
      msg.hidden = !(kind && k === kind);
      if (!msg.hidden) shown = msg.id;
    });
    var describedBy = [help];
    if (name === "situation") describedBy.push("f-notice");
    if (shown) describedBy.push(shown);
    input.setAttribute("aria-describedby", describedBy.join(" "));
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

  function hideOutcomes() {
    failure.hidden = true;
    unknown.hidden = true;
  }

  function setSending(on) {
    submit.disabled = on;
    form.setAttribute("aria-busy", String(on));
    if (on) setStatus("sending");
    else setStatus(hasInput() ? "entering" : "empty");
  }

  function showSuccess() {
    setSending(false);
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  // Delivery is not wired yet (hosting decision pending). This stands in for
  // the network call: it resolves "sent" after a short delay. At deploy,
  // replace deliver() with the real request and map its result to
  // "sent" | "failed" | "unknown".
  function deliver() {
    return new Promise(function (resolve) {
      window.setTimeout(function () { resolve(params.get("demo-result") || "sent"); }, 900);
    });
  }

  function send() {
    hideOutcomes();
    setSending(true);
    deliver().then(function (result) {
      if (result === "sent") return showSuccess();
      setSending(false);
      if (result === "unknown") unknown.hidden = false;
      else failure.hidden = false;
    });
  }

  form.addEventListener("input", function (e) {
    if (submit.disabled) return;
    setStatus(hasInput() ? "entering" : "empty");
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
      summary.hidden = false;
      summary.focus();
      return;
    }
    summary.hidden = true;
    send();
  });

  $("[data-retry]", form).addEventListener("click", send);
  $("[data-check-receipt]", form).addEventListener("click", function () {
    hideOutcomes();
    setSending(true);
    window.setTimeout(showSuccess, 900);
  });
  $("[data-verify-continue]", form).addEventListener("click", function () {
    verify.hidden = true;
    send();
  });

  survey.addEventListener("submit", function (e) {
    e.preventDefault();
    survey.hidden = true;
    surveyThanks.hidden = false;
    surveyThanks.focus();
  });

  /* QA hook: ?demo=<state> renders a state for screenshots. Not linked. */
  var demo = params.get("demo");
  if (demo) {
    if (demo === "entering") { form.elements.timing.value = " "; setStatus("entering"); }
    if (demo === "invalid") { form.elements.email.value = "name"; validate(); summary.hidden = false; }
    if (demo === "sending") { setSending(true); }
    if (demo === "failure") { failure.hidden = false; }
    if (demo === "unknown") { unknown.hidden = false; }
    if (demo === "verify") { verify.hidden = false; }
    if (demo === "expired") { verify.hidden = false; verifyExpired.hidden = false; }
    if (demo === "success") { form.hidden = true; success.hidden = false; }
    if (demo === "thanks") { form.hidden = true; success.hidden = false; survey.hidden = true; surveyThanks.hidden = false; }
  }
})();
