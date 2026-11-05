// Meaw Meaw — patio backdrop (original Japanese house yard), drawn into <svg id="scene" viewBox="0 0 1000 600">.
// Item positions must match SPOTS in index.html: cushion (220,378), bowl (750,506), yarn (450,545), box (848,350).
function drawScene() {
  const O = '#3B2F40';
  let seed = 11; const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const R = (a, b) => a + r() * (b - a);
  const f = n => n.toFixed(1);
  // organic closed shape around an ellipse (smoothed through midpoints)
  const blob = (cx, cy, rx, ry, n = 9, j = .12) => {
    const pts = Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2, k = 1 + R(-j, j); return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]; });
    const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    let d = `M${mid(pts[n - 1], pts[0]).map(f).join(' ')}`;
    pts.forEach((p, i) => { const m = mid(p, pts[(i + 1) % n]); d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`; });
    return d + 'Z';
  };
  const tuft = (x, y, s = 1, c = '#7DBF5E') => `<path d="M${x - 8 * s} ${y} Q${x - 10 * s} ${y - 10 * s} ${x - 14 * s} ${y - 15 * s} Q${x - 5 * s} ${y - 9 * s} ${x - 2 * s} ${y - 2 * s} Q${x - 1 * s} ${y - 14 * s} ${x + 1 * s} ${y - 22 * s} Q${x + 4 * s} ${y - 12 * s} ${x + 3 * s} ${y - 2 * s} Q${x + 8 * s} ${y - 10 * s} ${x + 15 * s} ${y - 14 * s} Q${x + 10 * s} ${y - 8 * s} ${x + 8 * s} ${y}Z" fill="${c}" stroke="${O}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const shadow = (cx, cy, rx, ry, o = .16) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#3A2A1A" opacity="${o}"/>`;
  const leaf = (x, y, s, rot, c) => `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 0 C-6 -8 -6 -20 0 -30 C6 -20 6 -8 0 0Z" fill="${c}" stroke="${O}" stroke-width="${2.5 / s}"/><path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 -2 V-24" stroke="${O}" stroke-width="${1.2 / s}" opacity=".5"/>`;
  const maple = (x, y, s, rot, c) => `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 10 L-2 2 L-12 4 L-8 -2 L-14 -10 L-5 -8 L-4 -16 L0 -10 L4 -16 L5 -8 L14 -10 L8 -2 L12 4 L2 2Z" fill="${c}" stroke="${O}" stroke-width="${2 / s}" stroke-linejoin="round"/>`;
  const out = [];
  const add = s => out.push(s);

  add(`<defs>
    <linearGradient id="gWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9DDC6"/><stop offset=".25" stop-color="#F5EDDF"/><stop offset="1" stop-color="#F1E6D2"/></linearGradient>
    <linearGradient id="gPaper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFCF3"/><stop offset="1" stop-color="#F3E8D2"/></linearGradient>
    <linearGradient id="gRoom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9C6A6"/><stop offset="1" stop-color="#E8D8BC"/></linearGradient>
    <linearGradient id="gPost" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8E6242"/><stop offset=".6" stop-color="#7A5238"/><stop offset="1" stop-color="#5E3D27"/></linearGradient>
    <linearGradient id="gRoof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A4458"/><stop offset="1" stop-color="#5E576E"/></linearGradient>
    <linearGradient id="gDirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9BF8C"/><stop offset="1" stop-color="#EBD7AB"/></linearGradient>
    <linearGradient id="gBamboo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B9CC72"/><stop offset=".45" stop-color="#DCE79E"/><stop offset="1" stop-color="#9DB257"/></linearGradient>
    <radialGradient id="gSun" cx=".15" cy=".1" r=".9"><stop offset="0" stop-color="#FFF6D8" stop-opacity=".35"/><stop offset=".6" stop-color="#FFF6D8" stop-opacity="0"/></radialGradient>
    <radialGradient id="gYarn" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#F7A3BA"/><stop offset="1" stop-color="#D9577C"/></radialGradient>
    <radialGradient id="gMikan" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#FFB14A"/><stop offset="1" stop-color="#E9771C"/></radialGradient>
    <clipPath id="cShoji"><rect x="40" y="40" width="380" height="165"/></clipPath>
  </defs>`);

  // ---- yard ground ----
  add(`<rect x="-5" y="250" width="1010" height="360" fill="url(#gDirt)"/>`);
  for (const [cx, cy, rx, ry] of [[150, 470, 130, 42], [610, 400, 170, 34], [910, 560, 140, 42], [380, 592, 160, 30], [960, 440, 70, 24]])
    add(`<path d="${blob(cx, cy, rx, ry, 12, .1)}" fill="#A9D27E"/><path d="${blob(cx - rx * .1, cy - ry * .15, rx * .7, ry * .55, 10, .12)}" fill="#BCDD8F"/>`);
  for (let i = 0; i < 46; i++) { const x = R(20, 980), y = R(300, 595), s = R(2, 5); add(`<path d="${blob(x, y, s * 1.4, s, 6, .2)}" fill="${['#C9AE7E', '#BBA273', '#D8C49A', '#AFA79A'][i % 4]}" stroke="${O}" stroke-width="${s > 4 ? 1.5 : 0}"/>`); }
  for (const [x, y] of [[300, 335], [560, 525], [770, 330], [70, 598], [520, 330], [690, 590], [260, 560], [980, 520]]) add(`<path d="M${x} ${y} q5 -9 10 0 M${x + 14} ${y + 3} q4 -7 8 0" fill="none" stroke="#B68F58" stroke-width="2.5" stroke-linecap="round"/>`);

  // ---- roof + wall ----
  add(`<rect x="-5" y="-5" width="1010" height="215" fill="url(#gWall)"/>`);
  for (let i = 0; i < 70; i++) add(`<circle cx="${f(R(0, 1000))}" cy="${f(R(30, 205))}" r="${f(R(.6, 1.4))}" fill="#C9B48F" opacity=".45"/>`);
  add(`<path d="M-5 -5 H1005 V24 H-5Z" fill="url(#gRoof)"/>`);
  for (let x = -6; x < 1010; x += 24) add(`<path d="M${x} 24 a12 12 0 0 0 24 0" fill="#6E6880" stroke="${O}" stroke-width="3"/><circle cx="${x + 12}" cy="27" r="4.5" fill="#857F96" stroke="${O}" stroke-width="1.5"/>`);
  for (let x = 6; x < 1000; x += 48) add(`<path d="M${x} -2 V22" stroke="#3B3647" stroke-width="2"/>`);
  add(`<rect x="-5" y="36" width="1010" height="16" fill="#3A2A1A" opacity=".10"/>`);

  // ---- shoji (left, closed) with a cat shadow behind the paper ----
  const shoji = (x, y, w, h) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#gPaper)"/>`;
    s += `<rect x="${x}" y="${y + h - 26}" width="${w}" height="26" fill="#B98A5E"/><path d="M${x} ${y + h - 26} H${x + w}" stroke="${O}" stroke-width="3"/><path d="M${x + 8} ${y + h - 15} H${x + w - 8}" stroke="#97693F" stroke-width="2"/>`;
    return s;
  };
  const lattice = (x, y, w, h, cols, rows) => {
    let d = '';
    for (let i = 1; i < cols; i++) d += `M${f(x + w * i / cols)} ${y}V${y + h - 26}`;
    for (let j = 1; j < rows; j++) d += `M${x} ${f(y + (h - 26) * j / rows)}H${x + w}`;
    return `<path d="${d}" stroke="#C49A6C" stroke-width="4"/><path d="${d}" stroke="#9C7148" stroke-width="1" opacity=".6"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${O}" stroke-width="5"/>`;
  };
  add(shoji(40, 40, 190, 165) + shoji(230, 40, 190, 165));
  add(`<g clip-path="url(#cShoji)" fill="#D9C9AA" opacity=".9"><path class="shadowcat" d="M300 179 C292 150 300 128 314 120 L310 98 L324 110 C330 108 338 108 344 110 L358 98 L354 120 C368 130 372 150 364 179Z"/><path class="shadowtail" d="M362 172 C384 168 392 150 384 132" stroke="#D9C9AA" stroke-width="9" fill="none" stroke-linecap="round"/></g>`);
  add(lattice(40, 40, 190, 165, 4, 4) + lattice(230, 40, 190, 165, 4, 4));
  add(`<path d="M206 118 a4 4 0 1 1 0 .1" fill="#C49A6C" stroke="${O}" stroke-width="2"/><path d="M254 118 a4 4 0 1 1 0 .1" fill="#C49A6C" stroke="${O}" stroke-width="2"/>`);

  // ---- open room: tatami, kotatsu with mikan, zabuton, scroll, andon lamp ----
  add(`<rect x="440" y="40" width="380" height="120" fill="url(#gRoom)"/>`);
  add(`<rect x="440" y="150" width="380" height="55" fill="#CBDDA0"/>`);
  let weave = ''; for (let y = 154; y < 205; y += 4) weave += `M440 ${y}H820`;
  add(`<path d="${weave}" stroke="#B3C988" stroke-width="1.2"/><path d="M440 150H820M630 150V205" stroke="#3F5E3A" stroke-width="6"/><path d="M440 150H820" stroke="${O}" stroke-width="2"/>`);
  add(`<rect x="604" y="46" width="56" height="62" rx="3" fill="#FFF8EC" stroke="${O}" stroke-width="3"/><rect x="611" y="52" width="42" height="50" fill="#F3E7CF"/><path d="M600 46H664M600 108H664" stroke="#5E3D27" stroke-width="6" stroke-linecap="round"/><path d="M632 46 L622 36 H642Z" fill="none" stroke="${O}" stroke-width="2"/>
    <g fill="#E8708F"><path d="${blob(632, 84, 9, 8, 8, .08)}"/><circle cx="621" cy="70" r="4"/><circle cx="632" cy="66" r="4"/><circle cx="643" cy="70" r="4"/></g>`);
  add(`<g stroke="${O}" stroke-width="3"><rect x="760" y="86" width="34" height="64" rx="4" fill="#FFE9B8"/><path d="M768 86V150M786 86V150M760 108H794M760 128H794" stroke="#C98B5A" stroke-width="2"/><rect x="756" y="80" width="42" height="8" rx="3" fill="#7A5238"/><rect x="756" y="148" width="42" height="7" rx="3" fill="#7A5238"/></g><ellipse cx="777" cy="118" rx="36" ry="30" fill="#FFE9A8" opacity=".25"/>`);
  add(`<path d="M470 196 Q478 182 500 184 L530 186 Q548 196 530 204 L480 206Z" fill="#E7A06A" stroke="${O}" stroke-width="3"/>`);
  add(shadow(615, 202, 130, 7, .2));
  add(`<path d="M502 160 Q500 132 528 130 H702 Q730 132 728 160 L738 190 Q726 186 712 194 Q698 186 684 194 Q670 186 656 194 Q642 186 628 194 Q614 186 600 194 Q586 186 572 194 Q558 186 544 194 Q530 186 516 194 Q504 188 492 190Z" fill="#5E8FCF" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M540 140 Q545 165 538 188M690 140 Q684 165 692 188" stroke="#3F6FAE" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  for (const [x, y] of [[530, 170], [575, 150], [612, 176], [650, 152], [700, 172], [560, 182], [668, 182]]) add(`<g fill="#FFF6EC" transform="translate(${x} ${y})"><circle r="2.6"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cy="-5" rx="2.6" ry="3.6" transform="rotate(${a})"/>`).join('')}</g>`);
  add(`<path d="M506 118 H724 Q732 118 732 124 V130 Q732 134 724 134 H506 Q498 134 498 130 V124 Q498 118 506 118Z" fill="#C98B5A" stroke="${O}" stroke-width="4"/><path d="M510 124 Q600 121 720 125" stroke="#E0AE7E" stroke-width="2" fill="none"/>`);
  add(`<ellipse cx="610" cy="117" rx="34" ry="8" fill="#F4EFE6" stroke="${O}" stroke-width="3"/>`);
  for (const [x, y] of [[596, 106], [622, 106], [609, 98]]) add(`<circle cx="${x}" cy="${y}" r="10" fill="url(#gMikan)" stroke="${O}" stroke-width="3"/><path d="M${x} ${y - 9} q4 -5 9 -3 q-4 4 -9 3Z" fill="#5DB86A" stroke="${O}" stroke-width="1.5"/>`);
  add(`<rect x="440" y="40" width="380" height="165" fill="#3A2A1A" opacity=".07"/>`);

  // ---- right shoji slid open ----
  add(shoji(820, 40, 160, 165) + lattice(820, 40, 160, 165, 3, 4));

  // ---- posts + under-eave shade ----
  for (const [x, w] of [[22, 18], [420, 20], [980, 26]]) add(`<rect x="${x}" y="25" width="${w}" height="185" fill="url(#gPost)" stroke="${O}" stroke-width="4"/><path d="M${x + w * .35} 40 Q${x + w * .5} 110 ${x + w * .3} 200" stroke="#5E3D27" stroke-width="1.5" fill="none" opacity=".6"/>`);
  add(`<path d="M-5 25 H1005" stroke="${O}" stroke-width="5"/>`);

  // ---- furin (wind chime) hanging from the eave ----
  add(`<g class="furin"><path d="M470 30 V58" stroke="${O}" stroke-width="2"/><path d="M456 74 Q456 56 470 56 Q484 56 484 74Z" fill="#CDEFFF" fill-opacity=".85" stroke="${O}" stroke-width="3"/><path d="M462 66 q4 -4 8 0 q-4 4 -8 0Z" fill="#E84A5F"/><path d="M470 74 V86" stroke="${O}" stroke-width="1.5"/><rect x="464" y="86" width="12" height="26" rx="2" fill="#FFF6EC" stroke="${O}" stroke-width="2"/><path d="M467 94h6M467 100h6" stroke="#E84A5F" stroke-width="1.5"/></g>`);

  // ---- engawa veranda: boards with grain, fascia, shade and foundation stones ----
  add(`<rect x="-5" y="205" width="1010" height="48" fill="#C48A55"/>`);
  for (const [y0, h] of [[205, 16], [221, 16], [237, 16]]) {
    let x = -5 - R(0, 120);
    while (x < 1005) {
      const w = R(150, 260), tone = ['#C9905C', '#BF8550', '#CC9663', '#C38B57'][Math.floor(R(0, 4))];
      add(`<rect x="${f(x)}" y="${y0}" width="${f(w)}" height="${h}" fill="${tone}"/><path d="M${f(x + 20)} ${y0 + h * .55} Q${f(x + w * .4)} ${y0 + h * .2} ${f(x + w * .7)} ${y0 + h * .5} T${f(x + w - 14)} ${y0 + h * .45}" stroke="#A06E3E" stroke-width="1.4" fill="none"/><path d="M${f(x)} ${y0}V${y0 + h}" stroke="#7A5233" stroke-width="2.5"/>`);
      if (r() < .3) add(`<ellipse cx="${f(x + w * .5)}" cy="${y0 + h / 2}" rx="3.5" ry="2.2" fill="#8A5A33"/>`);
      x += w;
    }
    add(`<path d="M-5 ${y0 + h}H1005" stroke="#7A5233" stroke-width="2"/>`);
  }
  add(`<path d="M-5 205 H1005" stroke="${O}" stroke-width="4"/><rect x="-5" y="205" width="1010" height="4" fill="#E2B07E"/>`);
  add(`<rect x="-5" y="253" width="1010" height="16" fill="#8A5A33" stroke="${O}" stroke-width="4"/><path d="M-5 257 H1005" stroke="#B07A4A" stroke-width="2"/>`);
  add(`<rect x="-5" y="269" width="1010" height="20" fill="#3A2A1A" opacity=".35"/>`);
  for (const x of [68, 488, 928]) add(`<path d="${blob(x + 8, 292, 22, 9, 8, .12)}" fill="#A9A49B" stroke="${O}" stroke-width="3"/><rect x="${x}" y="269" width="16" height="22" fill="#6B4228" stroke="${O}" stroke-width="3"/>`);
  add(`<path d="${blob(300, 300, 66, 16, 11, .08)}" fill="#BDB8B0" stroke="${O}" stroke-width="4"/><path d="M262 296 Q292 288 330 292" stroke="#E2DED6" stroke-width="4" fill="none" stroke-linecap="round"/>`);
  add(`<path d="${blob(372, 330, 34, 10, 9, .1)}" fill="#C6C1B8" stroke="${O}" stroke-width="3"/>`);

  // ---- bamboo fence (right) ----
  for (const [x, y] of [[905, 268], [930, 260], [955, 268], [980, 260]]) {
    add(`<rect x="${x}" y="${y}" width="22" height="${388 - y}" rx="9" fill="url(#gBamboo)" stroke="${O}" stroke-width="3.5"/>`);
    for (const ny of [y + 34, y + 82]) add(`<path d="M${x + 2} ${ny} H${x + 20}" stroke="#7A8F3A" stroke-width="3"/><path d="M${x + 3} ${ny + 3} H${x + 19}" stroke="#EEF4C8" stroke-width="1.5"/>`);
  }
  add(`<path d="M898 304 H1005 M898 352 H1005" stroke="#6B4A2A" stroke-width="7" stroke-linecap="round"/><path d="M898 304 H1005 M898 352 H1005" stroke="#A97A4A" stroke-width="3" stroke-dasharray="4 5"/>`);

  // ---- hydrangea bush (left) ----
  add(shadow(60, 372, 80, 12, .2));
  add(`<path d="${blob(48, 318, 74, 56, 12, .12)}" fill="#4F9A57" stroke="${O}" stroke-width="4"/>`);
  for (const [x, y, rr] of [[10, 300, 30], [62, 286, 32], [92, 330, 28], [30, 344, 30], [64, 352, 24]]) add(`<path d="${blob(x, y, rr, rr * .85, 9, .14)}" fill="#6DB06B" stroke="${O}" stroke-width="3"/><path d="M${x - rr * .5} ${y - rr * .2} q${rr * .3} ${-rr * .35} ${rr * .7} ${-rr * .2}" stroke="#93CC85" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  for (const [x, y, c] of [[30, 290, '#9FB8F2'], [74, 312, '#C3A2F0'], [46, 340, '#9FB8F2'], [98, 300, '#C3A2F0'], [8, 330, '#B3C9F7']]) {
    add(`<path d="${blob(x, y, 15, 13, 8, .1)}" fill="${c}" stroke="${O}" stroke-width="2.5"/>`);
    for (let k = 0; k < 6; k++) add(`<circle cx="${f(x + R(-9, 9))}" cy="${f(y + R(-7, 7))}" r="2" fill="#FFFFFF" opacity=".7"/>`);
  }

  // ---- maple branch over the roof (top right) ----
  add(`<path d="M1010 -6 Q930 18 860 8 Q820 4 790 20" stroke="#5E3D27" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M900 12 Q890 30 872 40" stroke="#5E3D27" stroke-width="4" fill="none" stroke-linecap="round"/>`);
  for (const [x, y, s, rot, c] of [[796, 24, 1.2, 20, '#E8553A'], [822, 14, 1, -10, '#F28C28'], [850, 22, 1.3, 30, '#E8553A'], [876, 42, 1.1, 10, '#F2A23A'], [904, 18, 1.2, -25, '#D93A3A'], [940, 14, 1, 15, '#F28C28'], [972, 6, 1.2, -5, '#E8553A']]) add(maple(x, y, s, rot, c));
  add(`<g class="fallleaf">${maple(700, 120, .9, 0, '#F28C28')}</g>`);

  // ---- items cats use ----
  // zabuton cushion
  add(shadow(222, 392, 70, 12, .2));
  add(`<path d="M160 370 Q156 356 176 354 L268 354 Q288 356 284 370 L282 384 Q286 398 266 398 L178 398 Q158 398 162 384Z" fill="#F2A0B8" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M172 368 Q222 360 272 368" stroke="#F8C3D2" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M222 377 l-12 -6 M222 377 l12 -6 M222 377 l-12 6 M222 377 l12 6" stroke="#E07A9A" stroke-width="2.5" stroke-linecap="round"/><circle cx="222" cy="377" r="5" fill="#E8708F" stroke="${O}" stroke-width="2"/>
    ${[[162, 356], [282, 356], [164, 396], [280, 396]].map(([x, y]) => `<path d="M${x} ${y} l${x < 220 ? -8 : 8} ${y < 380 ? -5 : 6}" stroke="#E8708F" stroke-width="4" stroke-linecap="round"/><circle cx="${x + (x < 220 ? -9 : 9)}" cy="${y + (y < 380 ? -6 : 7)}" r="3" fill="#E8708F" stroke="${O}" stroke-width="1.5"/>`).join('')}`);
  // food bowl on a fish placemat
  add(`<path d="M708 496 L812 496 L800 536 L696 536 Z" fill="#FFF6EC" stroke="${O}" stroke-width="3.5" stroke-linejoin="round"/><path d="M712 528 q6 -6 12 0 q-6 6 -12 0z M716 528 l-6 -4 v8z M782 504 q6 -6 12 0 q-6 6 -12 0z" fill="#9FC9F2" stroke="${O}" stroke-width="1.5"/>`);
  add(shadow(752, 530, 46, 6, .2));
  add(`<path d="M706 506 Q710 530 736 530 H766 Q792 530 796 506 Z" fill="#6FA8DC" stroke="${O}" stroke-width="4"/><path d="M716 514 Q722 524 736 525" stroke="#A8CDF0" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="751" cy="506" rx="45" ry="9" fill="#8FC0EA" stroke="${O}" stroke-width="4"/><ellipse cx="751" cy="506" rx="36" ry="5.5" fill="#B57B48"/>
    ${[[734, 504], [748, 502], [762, 505], [742, 508], [770, 503]].map(([x, y]) => `<path d="M${x} ${y} q4 -3 8 0 q-4 3 -8 0z M${x} ${y} l-3 -2 v4z" fill="#D9A06A" stroke="#7A4E2D" stroke-width="1"/>`).join('')}
    <g fill="#FFF6EC"><circle cx="758" cy="520" r="3"/><circle cx="752" cy="515" r="1.6"/><circle cx="758" cy="513" r="1.6"/><circle cx="764" cy="515" r="1.6"/></g>`);
  // yarn ball
  add(shadow(452, 564, 26, 5, .22));
  add(`<path d="M470 552 Q500 584 540 566 Q566 556 586 572" fill="none" stroke="#E8708F" stroke-width="3" stroke-linecap="round"/>
    <circle cx="450" cy="545" r="20" fill="url(#gYarn)" stroke="${O}" stroke-width="4"/>
    <path d="M434 536 Q452 546 446 564 M442 528 Q466 538 464 560 M432 552 Q446 548 466 530 M436 560 Q456 556 469 541" fill="none" stroke="#B84A6A" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M440 534 q4 -4 9 -4" stroke="#FFD6E2" stroke-width="3" fill="none" stroke-linecap="round"/>`);
  // cardboard box
  add(shadow(850, 394, 56, 8, .22));
  add(`<g stroke="${O}" stroke-width="4" stroke-linejoin="round">
    <path d="M816 316 L896 316 L880 330 L800 330Z" fill="#5A3E24"/>
    <path d="M800 330 L776 304 L810 314 L816 316Z" fill="#E3B877"/><path d="M896 316 L910 292 L912 312 L880 330Z" fill="#D6A866"/>
    <path d="M800 330 L880 330 L880 392 L800 392 Z" fill="#D9A866"/><path d="M880 330 L896 316 L896 378 L880 392 Z" fill="#B57D40"/>
    <path d="M832 330 L848 330 L848 392 L832 392Z" fill="#E9CFA0" stroke-width="2"/></g>
    <text x="840" y="370" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#A06E35" transform="rotate(-6 840 368)">MEAW</text>
    <path d="M806 384 L824 384 M860 340 L874 340" stroke="#A06E35" stroke-width="2" stroke-linecap="round"/>`);
  // potted plant
  add(shadow(150, 568, 40, 7, .22));
  for (const [x, y, s, rot] of [[148, 514, 1.6, -40], [150, 512, 1.9, -8], [152, 514, 1.7, 26], [146, 516, 1.3, -70], [154, 516, 1.3, 62]]) add(leaf(x, y, s, rot, '#5DB86A'));
  add(`<path d="M120 520 L178 520 L170 566 Q149 572 128 566 Z" fill="#D4774F" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><rect x="114" y="510" width="70" height="14" rx="5" fill="#C0653F" stroke="${O}" stroke-width="4"/><path d="M130 532 Q134 550 136 560" stroke="#E89A72" stroke-width="3" fill="none" stroke-linecap="round"/>`);

  // ---- grass tufts along edges + warm light ----
  for (const [x, y, s] of [[110, 300, 1], [430, 312, .9], [600, 300, 1.1], [700, 330, .8], [40, 420, 1.1], [330, 470, .9], [560, 440, 1], [980, 470, 1], [620, 600, 1.2], [880, 600, 1], [240, 600, 1.1], [520, 600, .9], [780, 440, .9], [400, 400, .8]]) add(tuft(x, y, s, ['#7DBF5E', '#6DB06B', '#8CCB66'][Math.floor(R(0, 3))]));
  add(`<rect x="-5" y="-5" width="1010" height="610" fill="url(#gSun)"/>`);
  for (const [x, y, rx] of [[520, 360, 40], [680, 470, 30], [260, 450, 34]]) add(`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .35}" fill="#FFF6D8" opacity=".25"/>`);
  return out.join('');
}
if (typeof document !== 'undefined') document.getElementById('scene').innerHTML = drawScene();
