/* PPG homepage: reveal on scroll, the headline entrance, count-ups, the resilience toggle, the Parthenon
   yield model, the readiness check, replaying a deal diagram when its tab opens, and a gentle photo parallax. */
(() => {
  const root = document.documentElement;
  window.__ppgHome = true;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ the headline, word by word */
  const h1 = document.querySelector('.x-display[data-words]');
  if (h1 && !reduced) {
    const text = h1.textContent.trim();
    h1.setAttribute('aria-label', text);
    h1.innerHTML = text.split(/\s+/).map((w, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${w}</span></span>`).join(' ');
  }
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('words-in')));

  /* ------------------------------------------------ reveal on scroll */
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (reduced || !('IntersectionObserver' in window)) {
    root.classList.remove('rv');
    items.forEach(el => el.classList.add('is-in'));
  } else {
    root.classList.add('rv');
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
      e.target.querySelectorAll('[data-count]').forEach(countUp);
    }), { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    items.forEach(el => io.observe(el));
  }
  if (reduced) document.querySelectorAll('svg.art').forEach(s => s.pauseAnimations?.());

  function countUp(el) {
    const end = +el.dataset.count, dur = 1400, t0 = performance.now();
    const step = t => { const p = Math.min(1, (t - t0) / dur); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(step); };
    el.textContent = '0'; requestAnimationFrame(step);
  }
  const replay = fig => { if (reduced || !fig) return; fig.classList.remove('is-in'); void fig.offsetWidth; requestAnimationFrame(() => fig.classList.add('is-in')); };

  /* ------------------------------------------------ a deal diagram replays when its tab opens */
  document.querySelectorAll('.x-deal').forEach(panel => {
    const fig = panel.querySelector('.x-deal__art');
    fig?.classList.add('is-in');
    new MutationObserver(() => { if (!panel.hidden) replay(fig); }).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
  });

  /* ------------------------------------------------ diving board or parthenon */
  const res = document.querySelector('[data-res]');
  if (res) {
    const show = key => {
      res.querySelectorAll('[data-res-btn]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.resBtn === key)));
      res.querySelectorAll('[data-res-desc]').forEach(p => { p.hidden = p.dataset.resDesc !== key; });
      res.querySelectorAll('[data-res-fig]').forEach(f => { const on = f.dataset.resFig === key; f.hidden = !on; if (on) replay(f); });
    };
    res.querySelectorAll('[data-res-btn]').forEach(b => b.addEventListener('click', () => show(b.dataset.resBtn)));
  }

  /* ------------------------------------------------ the Parthenon yield model */
  const model = document.querySelector('[data-model]');
  if (model) {
    const q = s => model.querySelector(s);
    const rev = q('[data-rev]'), range = q('[data-rev-range]'), yld = q('[data-yield]');
    const fmt = m => {
      if (m >= 1000) return `$${(m / 1000).toFixed(2).replace(/\.?0+$/, '')}B`;
      if (m >= 10) return `$${m.toFixed(1)}M`;
      if (m >= 1) return `$${m.toFixed(2).replace(/0$/, '')}M`;
      return `$${Math.round(m * 1000)}K`;
    };
    const set = (sel, text) => {
      const el = q(sel); if (el.textContent === text) return;
      el.textContent = text;
      if (el.classList.contains('x-out__num') && !reduced) { el.classList.remove('is-tick'); void el.offsetWidth; el.classList.add('is-tick'); }
    };
    const fill = el => el.style.setProperty('--fill', `${((+el.value - +el.min) / (+el.max - +el.min)) * 100}%`);
    const COLORS = ['#a8865a', '#2f5d50', '#a8865a', '#2f5d50'];
    function update(from) {
      let r = parseFloat(rev.value);
      if (from === 'range') { r = +range.value; rev.value = r; }
      if (!(r > 0)) r = 0;
      if (from !== 'range') range.value = Math.min(100, Math.max(1, r));
      fill(range); fill(yld);
      model.querySelectorAll('[data-scn]').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.scn === r)));
      const n = +(model.querySelector('[data-pillars]:checked')?.value || 3);
      const y = +yld.value / 100;
      q('[data-yield-label]').textContent = Math.round(y * 100);
      const inc = r * y;
      set('[data-out-inc]', `+${fmt(inc)}`);
      set('[data-out-band]', `+${Math.round(y * 100)}% Expansion Band`);
      set('[data-out-total]', fmt(r + inc));
      set('[data-out-pillars]', `Core + ${n} Alliance Pillars`);
      const rows = [{ l: 'Core Business', v: r, c: '#14243e', plus: '' }];
      for (let i = 0; i < n; i++) rows.push({ l: `Alliance Pillar ${i + 1}`, v: inc / n, c: COLORS[i], plus: '+' });
      const bars = q('[data-bars]');
      if (bars.children.length !== rows.length) {
        bars.innerHTML = rows.map(() => '<div class="x-bar"><span class="x-bar__label"></span><span class="x-bar__track"><span class="x-bar__fill"></span></span><span class="x-bar__val"></span></div>').join('');
      }
      [...bars.children].forEach((row, i) => {
        const d = rows[i];
        row.querySelector('.x-bar__label').textContent = d.l;
        row.querySelector('.x-bar__val').textContent = d.plus + fmt(d.v);
        const f = row.querySelector('.x-bar__fill');
        f.style.setProperty('--c', d.c);
        f.style.setProperty('--w', `${r ? Math.min(100, (d.v / r) * 100) : 0}%`);
      });
    }
    rev.addEventListener('input', () => update('num'));
    range.addEventListener('input', () => update('range'));
    yld.addEventListener('input', () => update());
    model.querySelectorAll('[data-pillars]').forEach(x => x.addEventListener('change', () => update()));
    model.querySelectorAll('[data-scn]').forEach(b => b.addEventListener('click', () => { rev.value = b.dataset.scn; update('num'); }));
    update();
  }

  /* ------------------------------------------------ the readiness check */
  const crits = [...document.querySelectorAll('[data-crit]')];
  if (crits.length) {
    const score = document.querySelector('[data-score]'), msg = document.querySelector('[data-score-msg]');
    const meter = document.querySelector('[data-meter]'), field = document.querySelector('[data-readiness-field]');
    const MSG = [
      'Select the statements that match your current position to preview your alliance fit.',
      'Early fit. An assessment will show which assets can support a first alliance pillar.',
      'Early fit. An assessment will show which assets can support a first alliance pillar.',
      'Strong fit. Your assets can likely support a multi-pillar alliance program.',
      'Strong fit. Your assets can likely support a multi-pillar alliance program.',
      'Ideal fit. Your business is ready for a full Parthenon alliance program.'];
    const sync = () => {
      const on = crits.filter(c => c.checked);
      score.textContent = on.length; msg.textContent = MSG[on.length];
      meter.style.setProperty('--m', `${(on.length / crits.length) * 100}%`);
      if (field) field.value = `${on.length} of 5 criteria confirmed${on.length ? ': ' + on.map(c => c.value).join('; ') : ''}`;
    };
    crits.forEach(c => c.addEventListener('change', sync)); sync();
  }


  /* ------------------------------------------------ the toolkit filter */
  const kit = document.querySelector('[data-kit]');
  if (kit) {
    const btns = [...kit.querySelectorAll('[data-kit-f]')], tools = [...kit.querySelectorAll('.x-tool')];
    btns.forEach(b => b.addEventListener('click', () => {
      const f = b.dataset.kitF;
      btns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      let k = 0;
      tools.forEach(t => {
        const on = f === 'all' || t.dataset.kitC === f;
        t.classList.toggle('is-off', !on);
        t.classList.remove('is-new');
        if (on && !reduced) { void t.offsetWidth; t.style.setProperty('--k', k++); t.classList.add('is-new'); }
      });
    }));
  }

  /* ------------------------------------------------ a gentle parallax on the Chicago band */
  const par = [...document.querySelectorAll('[data-parallax]')];
  if (par.length && !reduced) {
    let ticking = false;
    const run = () => {
      par.forEach(el => {
        const r = el.parentElement.getBoundingClientRect(), vh = innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        const p = (r.top + r.height / 2 - vh / 2) / (vh + r.height);
        el.style.transform = `translate3d(0, ${(p * -12).toFixed(2)}%, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }
})();
