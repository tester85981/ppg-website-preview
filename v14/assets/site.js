/* PPG site v11 (eight-section homepage, v10 subpages). No libraries. Every visible string lives in
   the page HTML; this file shows and hides it, computes the modeler and posts the two forms. The only
   exceptions are the modeler's track labels and the Clear Form confirm label (see the build report). */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Mobile menu ---------------------------------------------------------- */
  var toggle = $("[data-menu-toggle]");
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
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);  // anchor links stay on the page; close the menu behind them
    });
  }

  /* Web3Forms delivery: the site's only network call, shared by both forms.
     POSTs the fields as JSON with the public form key; Web3Forms emails them to the PPG inbox. Resolves
     "accepted" only when the response is ok and its body says success: true; anything else is "failed".
     A network error rejects, and each caller routes that to its failure state. /privacy describes this. */
  function deliver(fields) {
    var payload = {
      access_key: "8bcdeb12-0dff-419f-9a39-e17ce2f3c59d",
      subject: "New inquiry from the PPG website",
      from_name: "PPG website inquiry form",
      replyto: fields.email,
      botcheck: ""
    };
    Object.keys(fields).forEach(function (k) { payload[k] = fields[k]; });
    return fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().then(function (body) {
        return res.ok && body && body.success === true ? "accepted" : "failed";
      }, function () { return "failed"; });
    });
  }

  /* 05 Diagnostic explorer: vertical tablist, arrow keys + Home/End, all regions swap in one pass ---- */
  var explorer = $("[data-explorer]");
  if (explorer) {
    var tabs = $$('[role="tab"]', explorer);
    var selectTab = function (index, focus) {
      tabs.forEach(function (tab, j) {
        var on = j === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tabs[index].focus();
    };
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { selectTab(i, false); });
      tab.addEventListener("keydown", function (e) {
        var n = tabs.length, to = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") to = (i + 1) % n;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") to = (i - 1 + n) % n;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = n - 1;
        if (to !== null) { e.preventDefault(); selectTab(to, true); }
      });
    });
  }

  /* 03 Dormant-asset checklist -> live readout + the Section 07 assets field --------------------------
     The field's first line is the synced "Flagged Assets: a; b" line; anything the visitor typed is kept
     below it. Unchecking everything removes the synced line (an untouched field becomes empty). */
  var assets = $$("[data-asset]");
  var assetsField = document.getElementById("a-assets");
  var SYNC = "Flagged Assets: ";
  var syncAssets = function () {
    var picked = assets.filter(function (c) { return c.checked; }).map(function (c) { return c.value; });
    var n = picked.length;
    var readout = $("[data-readout]");
    if (readout) {
      $("[data-readout-count]", readout).textContent = String(n);
      $("[data-readout-n]", readout).textContent = String(n);
      var state = n === 0 ? "none" : (n <= 2 ? "low" : "high");
      $$("[data-readout-state]", readout).forEach(function (p) { p.hidden = p.getAttribute("data-readout-state") !== state; });
    }
    if (assetsField) {
      var lines = assetsField.value.split("\n");
      var own = lines;
      if (lines[0].indexOf(SYNC) === 0) {
        own = lines.slice(1);
        if (own.length && own[0] === "") own = own.slice(1);
      }
      var mine = own.join("\n");
      var head = n ? SYNC + picked.join("; ") : "";
      assetsField.value = head && mine ? head + "\n\n" + mine : (head || mine);
    }
  };
  assets.forEach(function (c) { c.addEventListener("change", syncAssets); });
  if (assets.length) syncAssets();

  /* 06 Economics modeler (spec "Modeler math"): new revenue = revenue x lift; incremental profit = new
     revenue x margin. Profit track: client 75% of profit. Revenue track: PPG takes 15% of new revenue off
     the top, client = profit - 15% of new revenue (shown 85/15). Equity hybrid: client 70% of profit. */
  var modeler = $("[data-modeler]");
  if (modeler) {
    var TRACKS = {
      profit: { client: 75, label: "Net New Profit Kept (75% Share)", gain: function (rev, profit) { return profit * 0.75; } },
      revenue: { client: 85, label: "Net New Profit Kept (85% Share)", gain: function (rev, profit) { return profit - rev * 0.15; } },
      equity: { client: 70, label: "70% Operating Profit + JV Asset Equity", gain: function (rev, profit) { return profit * 0.70; } }
    };
    var mform = $("[data-modeler-form]", modeler);
    var out = function (key) { return $('[data-out="' + key + '"]', modeler); };
    var number = function (el, max) {
      var v = parseFloat(el.value);
      if (!isFinite(v) || v < 0) v = 0;
      return max !== undefined && v > max ? max : v;
    };
    var cents = function (x) { return Math.round(x * 100 + (x < 0 ? -1e-6 : 1e-6)) / 100; };
    var money = function (x, signed) {
      var c = cents(x);
      var sign = signed ? (c < 0 ? "-" : "+") : "";
      return sign + "$" + Math.abs(c).toFixed(2) + "M";
    };
    var model = function () {
      var revenue = number(mform.elements.revenue);
      var margin = number(mform.elements.margin, 100) / 100;
      var lift = parseFloat(mform.elements.uplift.value);
      var track = TRACKS[mform.elements.track.value] || TRACKS.profit;
      var newRev = revenue * lift;
      var profit = newRev * margin;
      out("baseline").textContent = money(revenue, false);
      out("revenue").textContent = money(newRev, true);
      out("gain").textContent = money(track.gain(newRev, profit), true);
      out("gain-label").textContent = track.label;
      out("client").textContent = track.client + "%";
      out("ppg").textContent = (100 - track.client) + "%";
    };
    mform.addEventListener("input", model);
    mform.addEventListener("change", model);
    mform.addEventListener("submit", function (e) { e.preventDefault(); });
    model();
  }

  /* 07 Application form: native validation (required, email), Web3Forms delivery, .txt brief, two-click
     Clear Form (also clears the checklist). The submit button ships disabled; this script enables it. */
  var apply = $("[data-apply-form]");
  if (apply) {
    var aSubmit = $("[data-apply-submit]", apply);
    var aFailure = $("[data-apply-failure]", apply);
    var aSuccess = $("[data-apply-success]");
    var applyFields = function () {
      var el = apply.elements;
      var val = function (name) { return el[name].value.trim(); };
      return { name: val("name_title"), company: val("company"), email: val("email"),
               revenue_band: el.revenue_band.value, assets: val("assets") };
    };
    var applyDone = function (accepted) {
      aSubmit.disabled = false;
      apply.setAttribute("aria-busy", "false");
      if (accepted) {
        apply.hidden = true;
        aSuccess.hidden = false;
        aSuccess.focus();
      } else {
        aFailure.hidden = false;
        aFailure.focus();
      }
    };
    apply.addEventListener("submit", function (e) {
      e.preventDefault();
      if (aSubmit.disabled) return;
      aFailure.hidden = true;
      aSubmit.disabled = true;
      apply.setAttribute("aria-busy", "true");
      deliver(applyFields()).then(function (r) { applyDone(r === "accepted"); }, function () { applyDone(false); });
    });

    $("[data-download]", apply).addEventListener("click", function () {
      var f = applyFields();
      var text = [
        "PREEMINENT PARTNERS GROUP",
        "Strategic Audit Brief",
        "",
        "FULL NAME & TITLE: " + f.name,
        "COMPANY NAME: " + f.company,
        "WORK EMAIL: " + f.email,
        "ANNUAL REVENUE BAND: " + f.revenue_band,
        "",
        "PRIMARY ASSETS / GROWTH BOTTLENECK:",
        f.assets,
        ""
      ].join("\r\n");
      var url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
      var a = document.createElement("a");
      a.href = url;
      a.download = "ppg-audit-brief.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });

    var clearBtn = $("[data-clear]", apply);
    var armed = null;
    var disarm = function () {
      clearTimeout(armed);
      armed = null;
      clearBtn.textContent = "Clear Form";
      clearBtn.removeAttribute("data-armed");
    };
    clearBtn.addEventListener("click", function () {
      if (!armed) {  // first click arms; a second click within 4 s clears
        clearBtn.textContent = "Clear Form?";
        clearBtn.setAttribute("data-armed", "");
        armed = setTimeout(disarm, 4000);
        return;
      }
      disarm();
      apply.reset();
      assets.forEach(function (c) { c.checked = false; });
      syncAssets();
      aFailure.hidden = true;
    });

    aSubmit.disabled = false;
  }

  /* 08 FAQ: single-open accordion, Q1 open at load (in the HTML) ---------------------------------- */
  var faq = $("[data-faq]");
  if (faq) {
    var qs = $$("button[aria-controls]", faq);
    qs.forEach(function (b) {
      b.addEventListener("click", function () {
        var wasOpen = b.getAttribute("aria-expanded") === "true";
        qs.forEach(function (o) {
          var on = o === b && !wasOpen;
          o.setAttribute("aria-expanded", String(on));
          document.getElementById(o.getAttribute("aria-controls")).hidden = !on;
        });
      });
    });
  }

  /* Inquiry form (/discuss-a-situation, carried from v10) -------------------------------------------- */
  var form = $("[data-situation-form]");
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
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

  function situationFields() {
    var el = form.elements;
    var val = function (name) { return el[name].value.trim(); };
    var role = el.role.selectedIndex > 0 ? el.role.options[el.role.selectedIndex].text.trim() : "";
    return { name: val("name"), email: val("email"), organization: val("organization"), role: role,
             situation: val("situation"), timing: val("timing") };
  }

  function send() {
    failure.hidden = true;
    setSending(true);
    deliver(situationFields()).then(function (result) {
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
