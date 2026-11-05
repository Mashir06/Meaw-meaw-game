// Meaw Meaw — cats (spec: docs/art/cat-designs.md, "Base v2 — fiel a la referencia").
// Every cat = shared base silhouette + per-layer accessory SVG. Layers get stacked in 3D by index.html.
const O = '#3B2F40', GOLD = '#F5B82E', GOLD_SH = '#C9861C';
const st = (fill, w = 4) => `fill="${fill}" stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const mirror = s => `<g transform="translate(256 0) scale(-1 1)">${s}</g>`;
const both = s => s + mirror(s);
const mix = (a, b, t) => '#' + [1, 3, 5].map(i => Math.round(parseInt(a.substr(i, 2), 16) * (1 - t) + parseInt(b.substr(i, 2), 16) * t).toString(16).padStart(2, '0')).join('');
const bell = (x, y, r = 10) => `<circle cx="${x}" cy="${y}" r="${r}" ${st(GOLD, 3)}/><path d="M${x - r * .8} ${y + r * .25}h${r * 1.6}" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/><circle cx="${x}" cy="${y + r * .6}" r="${r * .18}" fill="${O}"/><ellipse cx="${x - r * .4}" cy="${y - r * .45}" rx="${r * .3}" ry="${r * .18}" fill="#FFF3C2"/>`;
const star4 = (x, y, r, fill, cls = '') => `<path class="${cls}" d="M${x} ${y - r}Q${x + r * .2} ${y - r * .2} ${x + r} ${y}Q${x + r * .2} ${y + r * .2} ${x} ${y + r}Q${x - r * .2} ${y + r * .2} ${x - r} ${y}Q${x - r * .2} ${y - r * .2} ${x} ${y - r}Z" ${st(fill, 2.5)}/>`;
const stick = (d, color, w = 6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 6}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
const sh = (y, s) => y && s ? `<g transform="translate(0 ${y})">${s}</g>` : ''; // shortcut: v1 accessories moved onto v2 anchors by offset

const EAR_L = 'M46 66 C44 40 52 14 70 6 Q76 3 82 8 C96 20 106 30 110 40 Z', EAR_L_IN = 'M60 52 C60 36 66 20 74 14 C84 22 92 30 96 38 Z';
const HEAD = 'M42 94 C40 52 78 32 128 32 C178 32 216 52 214 94 C213 126 178 142 128 142 C78 142 43 126 42 94 Z';
const MUZZLE = 'M40 124 C60 120 84 112 100 98 C112 88 120 80 128 74 C136 80 144 88 156 98 C172 112 196 120 216 124 L216 148 L40 148 Z';
const BODY = 'M70 132 C44 150 33 194 39 223 C42 237 57 244 80 242 C104 240 116 245 130 244 C150 243 164 239 182 242 C200 243 213 235 216 220 C221 192 213 156 186 131 C150 138 104 138 70 132 Z';
const TAIL = 'M54 230 C34 236 12 226 7 206 C3 190 12 178 24 178 C34 179 38 188 34 196 C31 203 38 210 50 212 C56 216 58 224 54 230 Z';
const EYES = [85, 171], EY = 92;

function buildCat(c, uid = "") { // uid: unique suffix so the same cat can appear twice in one page (clipPath ids)
  const id = c.id + uid, p = c.colors, a = c.acc || {}, light = mix(p.fur, '#FFFFFF', .5);
  const bodyFill = c.bodyFill || p.fur, bodyShade = c.bodyShade || p.shade;
  const ears = earR => `<path d="${EAR_L}" ${st(p.fur, 4.5)}/><path d="${EAR_L_IN}" fill="${p.ear}"/>` +
    (earR ? `<path d="${earR}" ${st(p.fur, 4.5)}/>` : mirror(`<path d="${EAR_L}" ${st(p.fur, 4.5)}/><path d="${EAR_L_IN}" fill="${p.ear}"/>`));
  const pattern = {
    stripes: `<g fill="${p.pattern}"><ellipse cx="111" cy="52" rx="5" ry="9" transform="rotate(-12 111 52)"/><ellipse cx="128" cy="48" rx="5" ry="10"/><ellipse cx="145" cy="52" rx="5" ry="9" transform="rotate(12 145 52)"/></g>
      <g fill="${light}"><ellipse cx="100" cy="68" rx="7" ry="5"/><ellipse cx="156" cy="68" rx="7" ry="5"/></g>`,
    scales: `<g fill="${p.pattern}"><path d="M106 58a9 9 0 0 1 18 0z"/><path d="M119 46a9 9 0 0 1 18 0z"/><path d="M132 58a9 9 0 0 1 18 0z"/></g>`,
    patches: `<ellipse cx="166" cy="54" rx="28" ry="18" fill="${p.pattern}" clip-path="url(#${id}-hc)"/>`,
  }[c.pattern || 'stripes'] || '';
  const eye = (x, kind) => ({
    x: `<path d="M${x - 6} ${EY - 6}l12 12M${x + 6} ${EY - 6}l-12 12" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`,
    slit: `<ellipse cx="${x}" cy="${EY}" rx="6.5" ry="10" ${st(p.eye, 2.5)}/><path d="M${x} ${EY - 7}V${EY + 7}" stroke="${O}" stroke-width="3" stroke-linecap="round"/><circle cx="${x + 2.5}" cy="${EY - 5}" r="1.8" fill="#fff"/>`,
    big: `<ellipse cx="${x}" cy="${EY}" rx="8" ry="12" ${st(p.eye, 2.5)}/><ellipse cx="${x}" cy="${EY + 1}" rx="4.5" ry="7" fill="${O}"/><circle cx="${x + 2.5}" cy="${EY - 5}" r="3" fill="#fff"/>`,
  })[kind] || `<ellipse cx="${x}" cy="${EY}" rx="6" ry="9.5" fill="${p.eye}"/><circle cx="${x + 2}" cy="${EY - 5}" r="2.4" fill="#fff"/>`;
  const A = k => sh((c.shift || {})[k], a[k]) || a[k] || '';
  return {
    ground: `<path d="M48 240 C70 234 186 233 210 239 C214 246 180 250 128 250 C78 250 44 247 48 240 Z" fill="${O}" opacity=".3"/>` + A('ground'),
    back: `<g class="s-tail"><path d="${TAIL}" ${st(p.fur, 4.5)}/><g fill="${light}"><circle cx="17" cy="188" r="3"/><circle cx="25" cy="184" r="2.5"/><circle cx="13" cy="197" r="2"/></g></g>` + A('back'),
    body: `<defs><clipPath id="${id}-bc"><path d="${BODY}"/></clipPath></defs>
      <path d="${BODY}" fill="${bodyFill}"/>
      <g clip-path="url(#${id}-bc)">
        ${c.bodyFill ? '' : `<path d="M76 140 C66 172 64 210 70 244 L198 244 C204 210 200 172 186 140 Z" fill="${p.belly}"/>`}
        <path d="M44 170 C56 184 60 214 50 234 C40 222 38 190 44 170 Z" fill="${bodyShade}"/>
        <path d="M196 160 C210 180 212 206 204 226" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linecap="round" opacity=".25"/>
        <g fill="${bodyShade}" opacity=".4"><path d="M54 136 C90 152 170 154 204 134 C196 160 70 162 54 136 Z"/><path d="M40 226 C90 218 170 216 218 224 L218 246 L40 246 Z"/></g>
      </g>
      <path d="${BODY}" fill="none" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
      <g ${st('#F7E3DC')}><path d="M77 236 C77 229 86 227 94 229 C100 231 101 238 96 240 C89 242 79 242 77 236 Z"/><path d="M179 236 C179 229 170 227 162 229 C156 231 155 238 160 240 C167 242 177 242 179 236 Z"/></g>
      <path d="M84 232 q1 3 0 5 M91 231 q1 3 0 5 M165 231 q-1 3 0 5 M172 232 q-1 3 0 5" stroke="${O}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M103 206 Q99 222 105 236 M124 214 Q126 226 123 238 M132 214 Q130 226 133 238 M153 206 Q157 222 151 236" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <g ${st('#F6DCD3', 3)}><path d="M105 239 C105 234 112 232 118 233 C123 234 124 240 120 242 C115 244 106 243 105 239 Z"/><path d="M151 239 C151 234 144 232 138 233 C133 234 132 240 136 242 C141 244 150 243 151 239 Z"/></g>` +
      A('body') +
      (c.collar === false ? '' : `<path d="M68 140 Q128 166 188 140" stroke="${O}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M68 140 Q128 166 188 140" stroke="${p.accent}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="128" cy="157" r="6" fill="none" stroke="${O}" stroke-width="3"/>${bell(128, 176, 17)}`) +
      A('bodyTop'),
    head: `<defs><clipPath id="${id}-hc"><path d="${HEAD}"/></clipPath></defs>${ears(c.earR)}
      <path d="${HEAD}" fill="${p.fur}"/>
      <g clip-path="url(#${id}-hc)"><ellipse cx="54" cy="94" rx="16" ry="9" fill="${p.shade}"/><ellipse cx="202" cy="94" rx="16" ry="9" fill="${p.shade}"/>
        <path d="${MUZZLE}" fill="${p.belly}"/></g>
      <path d="M60 70 C70 44 104 36 132 38 C100 46 76 60 66 84 Z" fill="#FFFFFF" opacity=".22"/><g fill="#FF9FB4" opacity=".28"><ellipse cx="66" cy="112" rx="13" ry="7"/><ellipse cx="190" cy="112" rx="13" ry="7"/></g>
      ${pattern}<g fill="${light}"><ellipse cx="76" cy="106" rx="10" ry="5"/><ellipse cx="180" cy="106" rx="10" ry="5"/></g>
      <path d="${HEAD}" fill="none" stroke="${O}" stroke-width="4.5"/>` + A('head') + (c.earsOver ? ears(c.earR) : '') + A('headTop'),
    face: `<path d="M107 99 C107 110 125 111 128 101 C131 111 149 110 149 99" stroke="${O}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` +
      A('face') + `<g class="eyes" style="animation-delay:-${(Math.random() * 5).toFixed(2)}s">${eye(EYES[0], c.eyeL) + eye(EYES[1], c.eyeR)}</g>` + A('faceTop'),
    front: A('front') + (c.rarity === 'Legendario' ? `<g class="sparkles">${star4(30, 40, 7, GOLD)}${star4(228, 70, 6, GOLD)}${star4(226, 200, 5, GOLD)}${star4(24, 140, 5, GOLD)}</g>` : ''),
  };
}

const puffy = (shapes, fill) => `<g fill="${fill}" stroke="${O}" stroke-width="8">${shapes}</g><g fill="${fill}">${shapes}</g>`; // outline only around the union
const flower = (x, y) => [0, 72, 144, 216, 288].map(r => `<circle cx="${x}" cy="${y - 6}" r="5" transform="rotate(${r} ${x} ${y})" ${st('#FFFFFF', 2)}/>`).join('') + `<circle cx="${x}" cy="${y}" r="4" ${st('#FFE27A', 2)}/>`;
const flame = (x, y, h) => `<path d="M${x - 10} ${y} Q${x - 14} ${y - h * .6} ${x} ${y - h} Q${x + 14} ${y - h * .6} ${x + 10} ${y}Z" ${st('#FF6A1F', 3)}/><path d="M${x - 5} ${y - 2} Q${x - 6} ${y - h * .4} ${x} ${y - h * .6} Q${x + 6} ${y - h * .4} ${x + 5} ${y - 2}Z" fill="#FFD23F"/>`;
const flake = (x, y, r) => [0, 60, 120].map(a => `<path d="M${x} ${y - r}V${y + r}" transform="rotate(${a} ${x} ${y})"/>`).join('').replace(/^/, `<g stroke="${O}" stroke-width="7" stroke-linecap="round">`).replace(/$/, '</g>') +
  `<g stroke="#FFFFFF" stroke-width="3" stroke-linecap="round">${[0, 60, 120].map(a => `<path d="M${x} ${y - r}V${y + r}" transform="rotate(${a} ${x} ${y})"/>`).join('')}</g>`;
const gear = (x, y, R, r, n) => Array.from({ length: n * 4 }, (_, i) => { const a = i * Math.PI / (n * 2), q = [R, R, r, r][i % 4]; return `${i ? 'L' : 'M'}${(x + q * Math.cos(a)).toFixed(1)} ${(y + q * Math.sin(a)).toFixed(1)}`; }).join('') + 'Z';
const F = { face: -14, faceTop: -14, head: -6, headTop: -6 }; // v1 anchors -> v2
const CATS = [
  { id: 'gato-sushi', name: 'Gato Sushi', rarity: 'Común', anim: 'jelly', bio: 'Dormilón y glotón; se enrolla en arroz para la siesta.',
    shift: { ...F, body: -36 },
    colors: { fur: '#F2A65A', shade: '#D9833A', belly: '#FFF6EC', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#C46A26', accent: '#2F4A3A' },
    collar: false,
    acc: {
      ground: `<ellipse cx="128" cy="236" rx="110" ry="18" ${st('#fff')}/><g ${st('#fff', 2)}><ellipse cx="34" cy="226" rx="8" ry="4"/><ellipse cx="62" cy="244" rx="8" ry="4"/><ellipse cx="200" cy="246" rx="8" ry="4"/><ellipse cx="226" cy="228" rx="8" ry="4"/></g>`,
      body: `<rect x="80" y="188" width="96" height="24" rx="8" ${st('#2F4A3A')}/>${bell(128, 200)}`,
      headTop: `<path class="bob" d="M64 6 Q54 22 64 28 Q74 22 64 6Z" ${st('#8BC34A', 3)}/>`,
      front: stick('M150 248 L206 184', '#C99A6B', 5) + stick('M166 248 L198 180', '#C99A6B', 5),
    } },
  { id: 'gato-ninja', name: 'Gato Ninja', rarity: 'Común', anim: 'sway', bio: 'Silencioso y tímido; desaparece si lo miras mucho.',
    shift: { ...F },
    colors: { fur: '#4A4858', shade: '#33313F', belly: '#E9E6F0', ear: '#F2A7B5', eye: '#1E1A22', pattern: '#1B1A22', accent: '#D93A3A' },
    acc: {
      back: `<g class="flutter">${stick('M206 70 Q228 60 246 78', '#D93A3A', 8)}${stick('M206 78 Q226 92 240 110', '#D93A3A', 8)}</g>`,
      head: `<path d="M50 68 Q128 40 206 68 L212 88 Q128 60 44 88 Z" ${st('#D93A3A')}/><circle cx="208" cy="78" r="8" ${st('#D93A3A', 3)}/>`,
      face: `<path d="M58 116 Q128 98 198 116 Q194 162 128 164 Q62 162 58 116Z" ${st('#33313F')}/>`,
      front: `<g class="spin"><path d="M150 196 L156 212 L172 218 L156 224 L150 240 L144 224 L128 218 L144 212Z" ${st('#9AA3AD', 3)}/><circle cx="150" cy="218" r="4" fill="#4A4858"/></g>`,
    } },
  { id: 'gato-gamer', name: 'Gato Gamer', rarity: 'Común', anim: 'sway', bio: 'Competitivo y trasnochador; "una partida más".',
    shift: { ...F },
    colors: { fur: '#9AA0A8', shade: '#767C85', belly: '#FFFFFF', ear: '#FFB6A3', eye: '#1E1A22', pattern: '#5E636B', accent: '#7B5CFF' },
    acc: {
      headTop: `<path d="M44 100 Q40 24 128 24 Q216 24 212 100" stroke="${O}" stroke-width="10" fill="none" stroke-linecap="round"/>
        ${both(`<rect x="30" y="80" width="26" height="44" rx="12" ${st('#7B5CFF')}/><circle class="blink" cx="43" cy="102" r="5" fill="#3DF5C8"/>`)}`,
      faceTop: `<g fill="#3DF5C8" opacity=".35"><rect x="74" y="96" width="24" height="18" rx="4"/><rect x="158" y="96" width="24" height="18" rx="4"/></g>`,
      front: `<g class="mash"><rect x="82" y="194" width="92" height="36" rx="18" ${st('#2B2233')}/>
        <path d="M98 212h18M107 203v18" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
        <circle cx="150" cy="206" r="5.5" fill="#FF5C8A"/><circle cx="162" cy="217" r="5.5" fill="#3DF5C8"/></g>`,
    } },
  { id: 'gato-zombi', name: 'Gato Zombi', rarity: 'Raro', anim: 'zombie', bio: 'Lento pero cariñoso; quiere cerebritos… de pescado.',
    shift: { ...F },
    colors: { fur: '#9CC59A', shade: '#76A275', belly: '#DDEBD5', ear: '#C98FA0', eye: '#E8F55A', pattern: '#5E7F5D', accent: '#7A4FA0' },
    eyeL: 'x', eyeR: 'big',
    earR: 'M210 66 C212 46 208 36 205 30 L190 31 L198 18 C194 10 190 7 186 6 Q180 3 174 8 C160 20 150 30 146 40 Z',
    acc: {
      head: `<path d="M152 72 L188 58" stroke="${O}" stroke-width="3" stroke-linecap="round"/><path d="M158 64l4 10M168 60l4 10M178 56l4 10" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`,
      face: `<path d="M131 128 L135 137 L139 128Z" ${st('#fff', 2)}/>`,
      body: `<rect x="88" y="196" width="80" height="13" rx="3" transform="rotate(-22 128 202)" ${st('#F2EBD9', 3)}/><rect x="88" y="210" width="80" height="13" rx="3" transform="rotate(18 128 216)" ${st('#F2EBD9', 3)}/>`,
      front: `<g class="mash">${stick('M150 226 H200', '#F2EBD9', 4)}${stick('M162 216 V236 M174 216 V236 M186 216 V236', '#F2EBD9', 3)}<path d="M198 226 L214 214 L214 238Z" ${st('#F2EBD9', 3)}/><circle cx="148" cy="226" r="6" ${st('#F2EBD9', 3)}/></g>`,
    } },
  { id: 'gato-pirata', name: 'Gato Pirata', rarity: 'Raro', anim: 'boat', bio: 'Fanfarrón y aventurero; todo tesoro es suyo.',
    shift: { ...F, body: -24 },
    colors: { fur: '#E8E2D6', shade: '#C9C0AF', belly: '#FFFFFF', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#2E2A2A', accent: '#C0392B' },
    pattern: 'patches', collar: false,
    acc: {
      body: `<ellipse cx="96" cy="196" rx="12" ry="14" fill="#2E2A2A"/><path d="M80 164 L176 164 L128 206Z" ${st('#C0392B')}/>
        <g fill="#fff"><circle cx="106" cy="174" r="3"/><circle cx="128" cy="180" r="3"/><circle cx="150" cy="174" r="3"/><circle cx="128" cy="194" r="3"/></g>${bell(128, 170)}`,
      headTop: `<g class="hat"><path d="M36 64 Q128 -12 220 64 Q128 40 36 64Z" ${st('#2E2A2A')}/><path d="M46 58 Q128 36 210 58" stroke="${GOLD}" stroke-width="4" fill="none"/>
        <circle cx="128" cy="34" r="9" fill="#fff"/><circle cx="125" cy="33" r="2" fill="#2E2A2A"/><circle cx="131" cy="33" r="2" fill="#2E2A2A"/></g>`,
      faceTop: `<path d="M158 94 L118 52" stroke="${O}" stroke-width="3"/><circle cx="170" cy="106" r="14" ${st('#2E2A2A')}/>`,
    } },
  { id: 'gato-astronauta', name: 'Gato Astronauta', rarity: 'Raro', anim: 'float', bio: 'Curioso y soñador; busca el planeta atún.',
    shift: { ...F, head: 0 },
    colors: { fur: '#F4F1EA', shade: '#D6D1C6', belly: '#FFFFFF', ear: '#FFB3C6', eye: '#1E1A22', pattern: '#F2A65A', accent: '#3B6FE0' },
    collar: false, bodyFill: '#FFFFFF', bodyShade: '#C9D2DC',
    acc: {
      back: `<rect x="22" y="120" width="212" height="100" rx="22" ${st('#C9D2DC')}/>`,
      body: `<rect x="106" y="190" width="44" height="28" rx="6" ${st('#3B6FE0')}/><circle cx="117" cy="204" r="4" fill="#FF5C5C"/><circle cx="128" cy="204" r="4" fill="${GOLD}"/><circle cx="139" cy="204" r="4" fill="#3DF5C8"/>
        <path d="M68 140 Q128 166 188 140" stroke="${O}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M68 140 Q128 166 188 140" stroke="#9AA3AD" stroke-width="8" fill="none" stroke-linecap="round"/>`,
      front: `<ellipse cx="128" cy="80" rx="114" ry="88" fill="#BFE6FF" fill-opacity=".28" stroke="${O}" stroke-width="4"/>
        <path class="glint" d="M36 70 Q44 18 98 4" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>
        <g class="twinkle">${star4(232, 28, 8, GOLD)}${star4(22, 210, 7, GOLD)}${star4(236, 190, 6, GOLD)}</g>`,
    } },
  { id: 'gato-caballero', name: 'Gato Caballero', rarity: 'Épico', anim: 'sway', bio: 'Noble y valiente; protege a los gatitos de las aspiradoras.',
    shift: { ...F, head: 0, headTop: -8 },
    colors: { fur: '#C98B5A', shade: '#A56B3E', belly: '#FFF3E3', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#8A5530', accent: '#2D5BD1' },
    earsOver: true,
    acc: {
      back: `<path class="flutter" d="M70 140 Q30 236 10 248 L246 248 Q226 236 186 140Z" ${st('#2D5BD1')}/>`,
      body: `<path d="M96 178 L160 178 L156 212 Q128 230 100 212Z" ${st('#B9C3CF')}/>`,
      head: `<path d="M38 80 Q36 20 128 20 Q220 20 218 80 Z" ${st('#B9C3CF')}/><path d="M150 24 Q210 32 214 78 L196 78 Q192 42 150 24Z" fill="#8E99A8"/>
        <rect x="40" y="62" width="176" height="16" rx="7" ${st('#8E99A8')}/><path d="M70 70h40M146 70h40" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`,
      headTop: `<path class="flutter" d="M118 30 Q104 12 122 2 Q122 16 134 8 Q146 18 138 30Z" ${st('#E04B4B', 3)}/>`,
      front: `<g class="shield"><path d="M58 182 L112 182 L112 210 Q112 234 85 246 Q58 234 58 210Z" ${st('#2D5BD1')}/><path d="M66 190 L104 190 L104 210 Q104 228 85 237 Q66 228 66 210Z" fill="none" stroke="${GOLD}" stroke-width="3"/>
          <g fill="${GOLD}"><circle cx="85" cy="216" r="7"/><circle cx="76" cy="204" r="3.5"/><circle cx="85" cy="200" r="3.5"/><circle cx="94" cy="204" r="3.5"/></g></g>
        <rect x="164" y="160" width="12" height="62" rx="3" ${st('#DDE3EA', 3)}/><rect x="152" y="220" width="36" height="9" rx="3" ${st(GOLD, 3)}/><rect x="165" y="228" width="10" height="18" rx="3" ${st(GOLD, 3)}/>`,
    } },
  { id: 'gato-mago', name: 'Gato Mago', rarity: 'Épico', anim: 'sway', bio: 'Despistado y sabio; sus hechizos acaban en burbujas.',
    shift: { ...F },
    colors: { fur: '#6F6A8F', shade: '#524D70', belly: '#EDEAF7', ear: '#F4A8C8', eye: '#1E1A22', pattern: '#3F3A5C', accent: '#8E4FD9' },
    acc: {
      back: `<path d="M64 140 L18 248 L238 248 L192 140Z" ${st('#8E4FD9')}/>${star4(30, 228, 8, GOLD)}${star4(226, 222, 7, GOLD)}`,
      headTop: `<g class="hat"><path d="M82 52 L122 4 Q154 -2 178 22 Q156 16 146 24 L176 52Z" ${st('#8E4FD9')}/>
        <path d="M98 34 L152 34 L158 44 L92 44Z" fill="${GOLD}"/><circle cx="130" cy="20" r="7" fill="${GOLD}"/><circle cx="134" cy="17" r="6" fill="#8E4FD9"/>
        <ellipse cx="128" cy="54" rx="94" ry="14" ${st('#8E4FD9')}/><ellipse cx="150" cy="58" rx="60" ry="7" fill="#6B37A8"/></g>`,
      face: `<path d="M98 134 Q92 160 110 158 Q116 172 128 164 Q140 172 146 158 Q164 160 158 134 Q128 146 98 134Z" ${st('#fff', 3)}/>`,
      faceTop: `<g fill="none" stroke="${GOLD}" stroke-width="4"><circle cx="86" cy="106" r="15"/><circle cx="170" cy="106" r="15"/><path d="M101 104 Q128 94 155 104"/></g>`,
      front: stick('M172 244 L198 184', '#7A4E2D', 6) + star4(200, 178, 14, GOLD, 'spin') +
        `<g fill="#9FE8FF" fill-opacity=".6" stroke="${O}" stroke-width="2"><circle class="bubble b1" cx="214" cy="150" r="8"/><circle class="bubble b2" cx="228" cy="128" r="6"/><circle class="bubble b3" cx="210" cy="110" r="5"/></g>`,
    } },
  { id: 'gato-dragon', name: 'Gato Dragón', rarity: 'Legendario', anim: 'sway', bio: 'Orgulloso y juguetón; estornuda fuego si se emociona.',
    shift: { ...F, head: 0 },
    colors: { fur: '#4FB477', shade: '#348C58', belly: '#FCE7A8', ear: '#FF9E7A', eye: '#E0A21B', pattern: '#2E7048', accent: '#E8553A' },
    pattern: 'scales', eyeL: 'slit', eyeR: 'slit',
    acc: {
      back: `<path d="M22 182 L10 160 L34 168Z" ${st('#E8553A', 3)}/>` +
        `<g class="wing-l"><path d="M90 168 L22 92 L34 130 L4 132 L28 158 L8 178 Z" ${st('#E8553A')}/><path d="M84 166 L30 112 L36 136 L20 140 L38 160Z" fill="#F7A35C"/></g>` +
        mirror(`<g class="wing-l"><path d="M90 168 L22 92 L34 130 L4 132 L28 158 L8 178 Z" ${st('#E8553A')}/><path d="M84 166 L30 112 L36 136 L20 140 L38 160Z" fill="#F7A35C"/></g>`),
      body: `<path d="M100 196 Q124 202 148 196M98 212 Q124 218 150 212M102 228 Q124 234 146 228" stroke="#E0B850" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      head: both(`<path d="M104 40 Q92 14 112 2 Q106 22 120 34Z" ${st('#FCE7A8', 3)}/>`),
      front: `<g class="puff"><circle cx="152" cy="132" r="7" ${st('#F7A35C', 2.5)}/><circle cx="168" cy="122" r="9" ${st('#E8553A', 2.5)}/><circle cx="186" cy="110" r="11" ${st('#F7A35C', 2.5)}/></g>`,
    } },
  { id: 'gato-angel', name: 'Gato Ángel', rarity: 'Legendario', anim: 'float', bio: 'Dulce y sereno; al ronronear florecen nubecitas.',
    shift: { ...F },
    colors: { fur: '#FFFFFF', shade: '#DCE3F0', belly: '#FFFFFF', ear: '#FFC2D6', eye: '#4A6FD9', pattern: '#F2D9A6', accent: '#F5C542' },
    eyeL: 'big', eyeR: 'big',
    acc: {
      ground: `<g ${st('#EAF2FF')}><circle cx="72" cy="236" r="24"/><circle cx="184" cy="236" r="24"/><circle cx="128" cy="238" r="32"/></g>`,
      back: both(`<g class="wing-l"><path d="M88 158 Q30 92 16 128 Q2 140 22 154 Q6 170 32 178 Q28 196 74 186 Z" ${st('#FFFFFF')}/><path d="M80 166 Q40 160 30 140" stroke="#DCE3F0" stroke-width="4" fill="none"/></g>`),
      headTop: `<ellipse class="halo" cx="128" cy="14" rx="42" ry="9" fill="none" stroke="${O}" stroke-width="11"/><ellipse class="halo" cx="128" cy="14" rx="42" ry="9" fill="none" stroke="${GOLD}" stroke-width="6"/>`,
      face: `<g fill="#FFB3C6" opacity=".7"><ellipse cx="66" cy="128" rx="13" ry="7"/><ellipse cx="190" cy="128" rx="13" ry="7"/></g>`,
    } },
  // ---- Expansión: 20 gatos (coordenadas Base v2) ----
  { id: 'gato-chef', name: 'Gato Chef', rarity: 'Común', anim: 'jelly', bio: 'Perfeccionista y goloso; lo prueba todo "por control de calidad".',
    colors: { fur: '#D9C2A0', shade: '#B89C76', belly: '#FFF8EE', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#9C7B52', accent: '#E04B4B' },
    collar: false,
    acc: {
      headTop: `<g class="hat">${puffy('<rect x="90" y="12" width="76" height="34" rx="6"/><circle cx="102" cy="14" r="16"/><circle cx="128" cy="8" r="18"/><circle cx="154" cy="14" r="16"/>', '#FFFFFF')}<rect x="92" y="34" width="72" height="12" rx="3" fill="#EDEAE4"/></g>`,
      body: `<path d="M90 142 L166 142 L128 180Z" ${st('#E04B4B')}/>`,
      front: stick('M204 228 L204 162', '#C99A6B', 5) + `<ellipse cx="204" cy="154" rx="16" ry="10" ${st('#9AA3AD')}/><g fill="#fff" opacity=".7"><circle class="bubble b1" cx="200" cy="134" r="6"/><circle class="bubble b2" cx="210" cy="124" r="5"/></g>`,
    } },
  { id: 'gato-bombero', name: 'Gato Bombero', rarity: 'Común', anim: 'sway', bio: 'Valiente y despistado; rescata gatitos… de árboles muy bajitos.',
    colors: { fur: '#6B4A3A', shade: '#4E3428', belly: '#F3E3D3', ear: '#E8A1A1', eye: '#1E1A22', pattern: '#3E2A20', accent: '#D93A3A' },
    collar: false, bodyFill: '#E8B23A', bodyShade: '#C48F1E',
    acc: {
      head: `<path d="M40 72 Q128 -8 216 72 Z" ${st('#D93A3A')}/><ellipse cx="128" cy="72" rx="104" ry="8" ${st('#D93A3A')}/><circle class="glint" cx="128" cy="46" r="13" ${st(GOLD, 3)}/>`,
      bodyTop: `<g ${st('#E9F0F5', 2)}><rect x="72" y="194" width="112" height="9" rx="3"/><rect x="66" y="216" width="124" height="9" rx="3"/></g>`,
      front: stick('M40 238 Q110 252 150 214 T200 178', '#3A3846', 8) + `<rect x="194" y="166" width="20" height="14" rx="3" transform="rotate(-35 204 173)" ${st('#9AA3AD', 3)}/>
        <g fill="#6FC7FF" stroke="${O}" stroke-width="2"><circle class="bubble b1" cx="218" cy="160" r="5"/><circle class="bubble b2" cx="228" cy="150" r="4"/><circle class="bubble b3" cx="222" cy="140" r="3.5"/></g>`,
    } },
  { id: 'gato-fresa', name: 'Gato Fresa', rarity: 'Común', anim: 'jelly', bio: 'Dulce y vergonzoso; se pone aún más rojo si lo halagas.',
    colors: { fur: '#F25C6E', shade: '#D13E52', belly: '#FFF1E6', ear: '#FFC2CC', eye: '#1E1A22', pattern: '#D13E52', accent: '#3FA34D' },
    pattern: 'none', eyeL: 'big', eyeR: 'big',
    acc: {
      head: `<g fill="#FFE27A">${[[108, 50], [128, 44], [148, 50], [102, 64], [154, 64]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="5"/>`).join('')}</g>`,
      headTop: `<g class="hat">${[-64, -32, 0, 32, 64].map(r => `<ellipse cx="128" cy="22" rx="7" ry="15" transform="rotate(${r} 128 36)" ${st('#3FA34D', 3)}/>`).join('')}<rect x="125" y="6" width="6" height="22" rx="3" ${st('#3FA34D', 3)}/></g>`,
      face: `<g class="blink" fill="#FF8FA3" opacity=".7"><ellipse cx="70" cy="106" rx="12" ry="7"/><ellipse cx="186" cy="106" rx="12" ry="7"/></g>`,
    } },
  { id: 'gato-detective', name: 'Gato Detective', rarity: 'Común', anim: 'sway', bio: 'Observador y dramático; siempre sospecha del perro.',
    colors: { fur: '#B5A48A', shade: '#918166', belly: '#F4EEE2', ear: '#F2B0A5', eye: '#1E1A22', pattern: '#6E6250', accent: '#7A5A3A' },
    collar: false, bodyFill: '#C9A46A', bodyShade: '#A6834A',
    acc: {
      headTop: `<g class="hat">${both(`<path d="M62 52 L30 72 L78 62Z" ${st('#8A6A44', 3)}/>`)}<path d="M52 60 Q128 2 204 60 Z" ${st('#8A6A44')}/><path d="M92 30 L98 58M128 18V58M164 30 L158 58M70 48 H186" stroke="#5E4630" stroke-width="3" fill="none"/></g>`,
      bodyTop: both(`<path d="M88 144 L128 204 L116 144Z" ${st('#A6834A', 3)}/>`),
      front: stick('M206 188 L226 222', '#7A5A3A', 7) + `<g class="glint"><circle cx="192" cy="170" r="22" fill="#BFE6FF" fill-opacity=".4" stroke="${O}" stroke-width="9"/><circle cx="192" cy="170" r="22" fill="none" stroke="#7A5A3A" stroke-width="4"/></g>`,
    } },
  { id: 'gato-pintor', name: 'Gato Pintor', rarity: 'Común', anim: 'sway', bio: 'Soñador y desordenado; firma sus cuadros con la huella.',
    colors: { fur: '#F4EDE1', shade: '#D8CDB8', belly: '#FFFFFF', ear: '#FFB3C6', eye: '#1E1A22', pattern: '#3A3846', accent: '#2D9CDB' },
    pattern: 'patches', collar: false,
    acc: {
      headTop: `<g class="hat"><ellipse cx="148" cy="36" rx="54" ry="17" transform="rotate(-12 148 36)" ${st('#C0392B')}/><circle cx="176" cy="18" r="5" ${st('#C0392B', 3)}/></g>`,
      body: both(`<path d="M128 150 L102 136 L102 164Z" ${st('#2D9CDB', 3)}/>`) + `<circle cx="128" cy="150" r="7" ${st('#2D9CDB', 3)}/>`,
      face: `<circle cx="196" cy="112" r="6" ${st('#F5C542', 2)}/><circle cx="186" cy="124" r="4" ${st('#3DBE5A', 2)}/>`,
      front: `<ellipse cx="58" cy="208" rx="32" ry="22" ${st('#E3C08D')}/><circle cx="44" cy="202" r="5" fill="#E04B4B"/><circle cx="58" cy="196" r="5" fill="#F5C542"/><circle cx="72" cy="202" r="5" fill="#3DBE5A"/><circle cx="62" cy="216" r="5" fill="#2D9CDB"/>
        <g class="bob">${stick('M204 224 L204 162', '#7A4E2D', 5)}<ellipse cx="204" cy="154" rx="6" ry="11" ${st('#E04B4B', 3)}/></g>`,
    } },
  { id: 'gato-calabaza', name: 'Gato Calabaza', rarity: 'Común', anim: 'jelly', bio: 'Bromista y travieso; dice "¡bu!" y se asusta él solo.',
    colors: { fur: '#3D3548', shade: '#2A2433', belly: '#E9E2F2', ear: '#F2A7B5', eye: '#F2C230', pattern: '#2A2433', accent: '#F28C28' },
    pattern: 'none', eyeL: 'big', eyeR: 'big', collar: false, bodyFill: '#F28C28', bodyShade: '#D06A14',
    acc: {
      bodyTop: `<path d="M100 150 Q86 196 100 238M156 150 Q170 196 156 238" stroke="#D06A14" stroke-width="5" fill="none"/>
        <g class="blink" fill="${O}"><path d="M108 194 L117 180 L126 194Z"/><path d="M130 194 L139 180 L148 194Z"/></g><path class="blink" d="M106 206 L114 214 L122 206 L130 214 L138 206 L146 214" stroke="${O}" stroke-width="4" fill="none" stroke-linejoin="round"/>`,
      headTop: `<rect x="122" y="14" width="12" height="24" rx="3" ${st('#5E7F3A', 3)}/><path class="hat" d="M134 24 Q150 6 164 16 Q152 30 134 24Z" ${st('#3DBE5A', 3)}/>`,
      front: `<g class="twinkle">${star4(30, 60, 7, '#F2C230')}${star4(228, 56, 6, '#F2C230')}${star4(230, 170, 5, '#F2C230')}</g>`,
    } },
  { id: 'gato-rockero', name: 'Gato Rockero', rarity: 'Común', anim: 'sway', bio: 'Ruidoso y leal; toca el mismo acorde con muchísima pasión.',
    colors: { fur: '#F2C094', shade: '#D69B68', belly: '#FFF4E8', ear: '#FFA8A0', eye: '#1E1A22', pattern: '#C47A44', accent: '#3A3846' },
    acc: {
      bodyTop: [84, 106, 150, 172].map(x => { const t = (x - 68) / 120, y = 140 + 52 * t * (1 - t); return `<path d="M${x - 5} ${y} L${x + 5} ${y} L${x} ${y + 11}Z" ${st('#DDE3EA', 2)}/>`; }).join(''),
      headTop: `<g class="bob">${[[100, 14], [112, 8], [124, 2], [136, 8], [148, 14]].map(([x, y]) => `<path d="M${x} 42 L${x + 12} 42 L${x + 6} ${y}Z" ${st('#E8364E', 3)}/>`).join('')}</g>`,
      faceTop: `<g fill="${O}"><rect x="64" y="80" width="42" height="24" rx="9"/><rect x="150" y="80" width="42" height="24" rx="9"/></g><path d="M104 88 H152" stroke="${O}" stroke-width="4"/>
        <path class="glint" d="M72 86 L84 86M158 86 L170 86" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
      front: `<g class="mash">${stick('M96 200 L206 134', '#7A4E2D', 6)}<rect x="198" y="122" width="16" height="22" rx="3" transform="rotate(-30 206 133)" ${st(O, 2)}/>
        <circle cx="96" cy="194" r="18" ${st('#E8364E')}/><circle cx="80" cy="214" r="25" ${st('#E8364E')}/><circle cx="92" cy="200" r="8" fill="${O}"/></g>`,
    } },
  { id: 'gato-panda', name: 'Gato Panda', rarity: 'Común', anim: 'jelly', bio: 'Tranquilo y comilón; jura que es un gato, no un oso.',
    colors: { fur: '#FFFFFF', shade: '#DCDCE0', belly: '#FFFFFF', ear: '#3A3846', eye: '#FFFFFF', pattern: '#2B2233', accent: '#6FBF4A' },
    pattern: 'none', eyeL: 'big', eyeR: 'big',
    acc: {
      face: `<g fill="#2B2233"><ellipse cx="85" cy="94" rx="18" ry="15" transform="rotate(-20 85 94)"/><ellipse cx="171" cy="94" rx="18" ry="15" transform="rotate(20 171 94)"/></g>`,
      front: `<g class="bob"><rect x="196" y="128" width="14" height="104" rx="4" ${st('#7CC24A', 3)}/><path d="M196 160h14M196 190h14M196 214h14" stroke="#4E8F2C" stroke-width="3"/>
        <ellipse cx="190" cy="124" rx="6" ry="14" transform="rotate(-40 190 124)" ${st('#6FBF4A', 2.5)}/><ellipse cx="216" cy="122" rx="6" ry="14" transform="rotate(40 216 122)" ${st('#6FBF4A', 2.5)}/></g>`,
    } },
  { id: 'gato-vampiro', name: 'Gato Vampiro', rarity: 'Raro', anim: 'sway', bio: 'Elegante y noctámbulo; solo bebe zumo de tomate.',
    colors: { fur: '#4A4058', shade: '#322A3D', belly: '#E6E0EE', ear: '#C46A86', eye: '#D93A3A', pattern: '#2B2233', accent: '#8E1B2E' },
    eyeL: 'slit', eyeR: 'slit', collar: false,
    acc: {
      back: both(`<path d="M128 160 L58 150 L20 98 L80 126Z" ${st('#2B2233')}/><path d="M66 144 L34 106 L76 128Z" fill="#8E1B2E"/>`),
      body: both(`<path d="M128 150 L102 136 L102 164Z" ${st('#8E1B2E', 3)}/>`) + `<circle class="glint" cx="128" cy="150" r="7" ${st(GOLD, 3)}/>`,
      face: `<g ${st('#FFFFFF', 2)}><path d="M112 104 L116 115 L121 106Z"/><path d="M135 106 L140 115 L144 104Z"/></g>`,
      front: [[40, 50], [216, 40]].map(([x, y]) => `<path class="flutter" d="M${x} ${y} q-8 -10 -20 -4 q6 2 4 9 q7 -4 16 1 q9 -5 16 -1 q-2 -7 4 -9 q-12 -6 -20 4Z" ${st('#322A3D', 2)}/>`).join(''),
    } },
  { id: 'gato-robot', name: 'Gato Robot', rarity: 'Raro', anim: 'sway', bio: 'Lógico y cariñoso; dice "MIAU.EXE" al despertar.',
    colors: { fur: '#B9C3CF', shade: '#8E99A8', belly: '#E6ECF2', ear: '#3DF5C8', eye: '#3DF5C8', pattern: '#8E99A8', accent: '#3B6FE0' },
    pattern: 'none', eyeL: 'big', eyeR: 'big', collar: false, bodyFill: '#9AA3AD', bodyShade: '#76808C',
    earR: 'M148 38 L168 4 L204 10 L212 64 Z',
    acc: {
      head: `<g ${st('#76808C', 2)}><circle cx="58" cy="72" r="4"/><circle cx="198" cy="72" r="4"/><circle cx="62" cy="120" r="4"/><circle cx="194" cy="120" r="4"/></g>`,
      headTop: `<rect x="125" y="12" width="6" height="24" ${st('#9AA3AD', 3)}/><circle class="blink" cx="128" cy="10" r="7" ${st('#FF5C5C', 3)}/>`,
      bodyTop: `<rect x="100" y="190" width="56" height="32" rx="6" ${st('#3B6FE0', 3)}/><g class="blink"><circle cx="114" cy="206" r="5" fill="#3DF5C8"/><circle cx="128" cy="206" r="5" fill="${GOLD}"/><circle cx="142" cy="206" r="5" fill="#FF5C5C"/></g>`,
      front: `<g class="spin"><path d="${gear(214, 204, 18, 13, 8)}" ${st(GOLD, 3)}/><circle cx="214" cy="204" r="5" fill="${O}"/></g>`,
    } },
  { id: 'gato-sirena', name: 'Gato Sirena', rarity: 'Raro', anim: 'boat', bio: 'Cantarina y presumida; colecciona conchas brillantes.',
    colors: { fur: '#7FCFD8', shade: '#55AEBB', belly: '#EFFBFC', ear: '#FFB3C6', eye: '#1E1A22', pattern: '#3E9AA8', accent: '#F28FB5' },
    pattern: 'scales', collar: false, bodyFill: '#3FB8A8', bodyShade: '#2A9285',
    acc: {
      back: `<path d="M20 186 Q-6 172 0 150 Q14 162 20 176 Q26 156 44 156 Q38 174 26 188Z" ${st('#F28FB5', 3)}/>`,
      head: `<g class="hat"><path d="M150 56 Q148 30 168 24 Q188 30 186 56 Z" ${st('#FFD6E5', 3)}/><path d="M168 54 L156 32M168 54 V26M168 54 L180 32" stroke="#D96A95" stroke-width="2"/><circle cx="168" cy="58" r="5" ${st('#FFFFFF', 2)}/></g>`,
      body: [.12, .24, .37, .5, .63, .76, .88].map(t => `<circle cx="${68 + 120 * t}" cy="${140 + 52 * t * (1 - t)}" r="5.5" ${st('#FFFFFF', 2)}/>`).join(''),
      front: `<g fill="#BFEFFF" fill-opacity=".6" stroke="${O}" stroke-width="2"><circle class="bubble b1" cx="212" cy="150" r="8"/><circle class="bubble b2" cx="226" cy="128" r="6"/><circle class="bubble b3" cx="36" cy="120" r="5"/></g>`,
    } },
  { id: 'gato-navideno', name: 'Gato Navideño', rarity: 'Raro', anim: 'sway', bio: 'Generoso y glotón; reparte regalos y se come las galletas.',
    colors: { fur: '#E9CDA6', shade: '#C9A77D', belly: '#FFFFFF', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#A47B4F', accent: '#2F8A4A' },
    acc: {
      headTop: `<path d="M54 60 Q78 6 138 8 Q196 12 222 84 Q192 48 204 60Z" ${st('#D93A3A')}/><rect x="44" y="50" width="168" height="22" rx="11" ${st('#FFFFFF')}/><circle class="hat" cx="222" cy="92" r="12" ${st('#FFFFFF')}/>`,
      ground: `<rect x="178" y="202" width="44" height="40" rx="3" ${st('#D93A3A', 3)}/><path d="M200 202v40M178 220h44" stroke="${GOLD}" stroke-width="6"/><g ${st(GOLD, 2.5)}><ellipse cx="192" cy="198" rx="9" ry="6"/><ellipse cx="208" cy="198" rx="9" ry="6"/></g>`,
      front: `<g class="twinkle">${star4(30, 50, 8, '#FFFFFF')}${star4(232, 130, 6, '#FFFFFF')}${star4(24, 150, 6, '#FFFFFF')}${star4(236, 24, 7, '#FFFFFF')}</g>`,
    } },
  { id: 'gato-conejo', name: 'Gato Conejo de Pascua', rarity: 'Raro', anim: 'jelly', bio: 'Saltarín e impaciente; esconde huevos y olvida dónde.',
    colors: { fur: '#E8D9F2', shade: '#C9B4DA', belly: '#FFFFFF', ear: '#FFC2D6', eye: '#1E1A22', pattern: '#C9B4DA', accent: '#FFD36E' },
    pattern: 'none', eyeL: 'big', eyeR: 'big',
    acc: {
      headTop: `<g class="bob">${stick('M74 44 Q128 22 182 44', '#FFFFFF', 5)}${both(`<ellipse cx="104" cy="16" rx="12" ry="26" transform="rotate(-10 104 16)" ${st('#FFFFFF')}/><ellipse cx="104" cy="18" rx="5" ry="17" transform="rotate(-10 104 18)" fill="#FFC2D6"/>`)}</g>`,
      back: `<circle cx="18" cy="186" r="15" ${st('#FFFFFF')}/>`,
      ground: `<g stroke="${O}" stroke-width="3"><ellipse cx="182" cy="218" rx="8" ry="11" fill="#9FE8FF"/><ellipse cx="198" cy="214" rx="8" ry="11" fill="#FFB3C6"/><ellipse cx="214" cy="220" rx="8" ry="11" fill="#FFE27A"/></g><ellipse cx="198" cy="232" rx="34" ry="13" ${st('#C99A6B')}/>`,
    } },
  { id: 'gato-escarcha', name: 'Gato Escarcha', rarity: 'Raro', anim: 'sway', bio: 'Frío por fuera, tierno por dentro; odia las mantas.',
    colors: { fur: '#DDF1FA', shade: '#A9D4E8', belly: '#FFFFFF', ear: '#9FC9F2', eye: '#2F6FB8', pattern: '#8BC1DC', accent: '#6FB7E8' },
    acc: {
      headTop: `<g class="glint">${[[88, 28], [108, 18], [128, 2], [148, 18], [168, 28]].map(([x, t]) => `<path d="M${x} ${t} L${x + 8} ${(t + 48) / 2} L${x} 48 L${x - 8} ${(t + 48) / 2}Z" ${st('#BFE9FF', 3)}/>`).join('')}</g>`,
      ground: `<ellipse cx="128" cy="240" rx="98" ry="12" ${st('#E6F7FF', 3)}/><path d="M60 238h18M176 242h22" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`,
      front: [[34, 56, 11], [226, 96, 9], [220, 196, 8]].map(([x, y, r]) => `<g class="spin">${flake(x, y, r)}</g>`).join(''),
    } },
  { id: 'gato-hada', name: 'Gato Hada', rarity: 'Épico', anim: 'float', bio: 'Juguetona y curiosa; deja polvo brillante en todo lo que toca.',
    colors: { fur: '#F7D9E8', shade: '#E6B3CC', belly: '#FFFFFF', ear: '#FF9EC4', eye: '#7B4FC9', pattern: '#E89BBE', accent: '#9C6BFF' },
    eyeL: 'big', eyeR: 'big',
    acc: {
      back: both(`<g class="wing-l" fill="#CDE8FF" fill-opacity=".8" stroke="#9C6BFF" stroke-width="3"><circle cx="40" cy="112" r="32"/><circle cx="50" cy="176" r="22"/></g>`),
      headTop: [[82, 50], [104, 40], [128, 36], [152, 40], [174, 50]].map(([x, y]) => flower(x, y)).join(''),
      front: stick('M204 228 L204 158', GOLD, 5) + star4(204, 146, 14, '#FFE27A', 'glint') + `<g class="twinkle">${star4(26, 60, 6, '#FFFFFF')}${star4(232, 110, 5, '#FFFFFF')}${star4(228, 196, 5, '#FFFFFF')}${star4(30, 140, 5, '#FFFFFF')}</g>`,
    } },
  { id: 'gato-unicornio', name: 'Gato Unicornio', rarity: 'Épico', anim: 'sway', bio: 'Presumido y luminoso; cree que el arcoíris es su sombra.',
    colors: { fur: '#F3EEFF', shade: '#D6CCF0', belly: '#FFFFFF', ear: '#FFB3D9', eye: '#5A3FA0', pattern: '#D6CCF0', accent: '#FF7FB6' },
    pattern: 'none', eyeL: 'big', eyeR: 'big',
    acc: {
      head: `<g class="hat">${[['#7FB8FF', 58, 66, 40], ['#7FE3B0', 70, 52, 30], ['#FFD36E', 86, 42, 20], ['#FF7FB6', 102, 36, 10]].map(([f, x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="10" ry="20" transform="rotate(${r} ${x} ${y})" ${st(f, 3)}/>`).join('')}</g>`,
      headTop: `<g class="glint"><path d="M116 40 L140 40 L128 0Z" ${st('#F5D76E', 3)}/><path d="M120 32 L135 28M123 20 L132 17" stroke="#D9B23A" stroke-width="2.5"/></g>`,
      back: `<path d="M46 222 C26 224 12 212 12 198" stroke="#FF7FB6" stroke-width="5" fill="none"/><path d="M40 212 C26 212 18 204 18 192" stroke="#FFD36E" stroke-width="5" fill="none"/><path d="M38 202 C30 200 26 194 26 188" stroke="#7FB8FF" stroke-width="5" fill="none"/>`,
      front: `<g class="twinkle">${star4(28, 60, 7, '#FFD36E')}${star4(232, 70, 6, '#FFD36E')}${star4(230, 190, 6, '#FFD36E')}${star4(26, 150, 5, '#FFD36E')}</g>`,
    } },
  { id: 'gato-rayo', name: 'Gato Rayo', rarity: 'Épico', anim: 'jelly', bio: 'Hiperactivo y chispeante; nunca se está quieto.',
    colors: { fur: '#FFE14D', shade: '#D9AE1C', belly: '#FFF8D6', ear: '#FF9E7A', eye: '#1E1A22', pattern: '#3B4CCA', accent: '#3B4CCA' },
    collar: false, earR: 'M148 38 L168 20 L160 20 L184 2 L192 30 L200 30 L212 64 Z',
    acc: {
      headTop: `<g class="bob">${puffy('<circle cx="128" cy="16" r="16"/><circle cx="106" cy="24" r="12"/><circle cx="150" cy="24" r="12"/>', '#6E7690')}</g>`,
      bodyTop: `<path class="glint" d="M116 168 L142 168 L128 194 L146 194 L114 234 L124 206 L108 206Z" fill="#3B4CCA" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>`,
      front: `<g class="twinkle">${[[30, 120, '#FFFFFF'], [222, 140, '#9FE8FF'], [214, 56, '#FFFFFF']].map(([x, y, c]) => `<path d="M${x} ${y} l8 -10 l-6 0 l8 -12" stroke="${c}" stroke-width="3.5" fill="none" stroke-linejoin="round"/>`).join('')}</g>`,
    } },
  { id: 'gato-brasa', name: 'Gato Brasa', rarity: 'Épico', anim: 'sway', bio: 'Temperamental y cálido; cuando se enfada se le encienden las orejas.',
    colors: { fur: '#3A2F2F', shade: '#241C1C', belly: '#FFD9A6', ear: '#FF7A2E', eye: '#FFB52E', pattern: '#FF6A1F', accent: '#FF6A1F' },
    eyeL: 'slit', eyeR: 'slit', collar: false,
    acc: {
      headTop: `<g class="bob">${flame(112, 40, 26)}${flame(144, 40, 26)}${flame(128, 40, 38)}</g><g class="blink">${flame(73, 12, 14)}${flame(183, 12, 14)}</g>`,
      front: `<circle class="puff" cx="150" cy="0" r="14" fill="#6E6470" opacity=".5"/><g fill="#FFB52E"><circle class="bubble b1" cx="40" cy="120" r="4"/><circle class="bubble b2" cx="220" cy="110" r="5"/><circle class="bubble b3" cx="210" cy="190" r="3"/><circle class="bubble b1" cx="30" cy="190" r="3"/></g>`,
    } },
  { id: 'gato-fenix', name: 'Gato Fénix', rarity: 'Legendario', anim: 'float', bio: 'Majestuoso y optimista; renace de cada siesta más brillante.',
    colors: { fur: '#F2763A', shade: '#D2541E', belly: '#FFE3A3', ear: '#FFC15E', eye: '#E0A21B', pattern: '#C23E1A', accent: GOLD },
    eyeL: 'big', eyeR: 'big', collar: false,
    acc: {
      back: [[44, 214, 70], [32, 222, 85], [24, 232, 100]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="26" transform="rotate(${r} ${x} ${y})" ${st('#FFD23F', 3)}/>`).join('') +
        both(`<g class="wing-l">${[[52, 104, -40], [36, 122, -55], [30, 146, -70], [36, 170, -85]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="34" transform="rotate(${r} 70 160)" ${st('#F2763A', 3)}/>`).join('')}</g>`),
      headTop: `<g class="hat">${[-28, 0, 28].map(r => `<ellipse cx="128" cy="16" rx="6" ry="18" transform="rotate(${r} 128 36)" ${st('#FFD23F', 3)}/>`).join('')}</g>`,
      body: `<path d="M68 140 Q128 166 188 140" stroke="${O}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M68 140 Q128 166 188 140" stroke="${GOLD}" stroke-width="6" fill="none" stroke-linecap="round"/><circle class="glint" cx="128" cy="160" r="9" ${st('#E8364E', 3)}/>`,
    } },
  { id: 'gato-kitsune', name: 'Gato Kitsune', rarity: 'Legendario', anim: 'float', bio: 'Astuta y misteriosa; hace malabares con fuegos fatuos.',
    colors: { fur: '#F5F0E8', shade: '#DCD3C4', belly: '#FFFFFF', ear: '#F2A7B5', eye: '#C9971C', pattern: '#D93A3A', accent: '#D93A3A' },
    eyeL: 'slit', eyeR: 'slit', collar: false,
    acc: {
      back: both(`<g class="wing-l"><path d="M84 196 Q20 200 18 140 Q50 150 84 172Z" ${st('#F5F0E8')}/><path d="M18 140 Q22 160 36 168 Q26 150 32 144Z" ${st('#D93A3A', 3)}/></g>`),
      head: `<path d="M64 112 Q74 118 84 112M172 112 Q182 118 192 112" stroke="#D93A3A" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle class="glint" cx="128" cy="64" r="4" fill="#D93A3A"/>`,
      body: `<path d="M68 140 Q128 166 188 140" stroke="${O}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M68 140 Q128 166 188 140" stroke="#F2EBD9" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="7 3"/>
        ${[104, 152].map(x => `<path d="M${x} 152 l8 6 l-8 6 l8 6 l-8 6" stroke="${O}" stroke-width="7" fill="none" stroke-linejoin="round"/><path d="M${x} 152 l8 6 l-8 6 l8 6 l-8 6" stroke="#fff" stroke-width="3.5" fill="none" stroke-linejoin="round"/>`).join('')}`,
      front: [[40, 80], [216, 66], [214, 196]].map(([x, y]) => `<g class="bob"><path d="M${x} ${y - 16} Q${x + 12} ${y} ${x} ${y + 8} Q${x - 12} ${y} ${x} ${y - 16}Z" fill="#7FD8FF" fill-opacity=".85" stroke="${O}" stroke-width="2"/><circle cx="${x}" cy="${y + 1}" r="3.5" fill="#fff"/></g>`).join(''),
    } },
];

const LEG_F = 'M-10 -4 C-12 10 -10 24 -9 33 C-15 36 -17 44 -11 46 C-4 48 7 48 10 45 C12 41 10 36 8 33 C10 22 12 8 10 -4';
const LEG_B = 'M-14 -6 C-16 10 -10 22 -8 32 C-14 36 -16 44 -10 46 C-3 48 8 48 10 45 C12 41 10 36 8 32 C12 22 18 8 14 -6';
const TORSO = 'M112 158 C126 146 150 142 172 144 C196 146 214 152 222 168 C230 184 224 204 210 212 C196 218 178 214 162 216 C146 218 130 220 118 214 C104 206 100 176 112 158 Z';
const WTAIL = 'M218 164 C238 140 240 108 222 92 C210 82 192 86 188 98 C185 107 196 112 200 104 C206 96 216 100 220 110 C226 126 218 146 204 162 Z';
const TORSO_ITEMS = new Set(['gato-sushi', 'gato-zombi', 'gato-astronauta', 'gato-dragon', 'gato-bombero', 'gato-detective', 'gato-calabaza', 'gato-robot', 'gato-rayo', 'gato-caballero']);
// Walking pose (side view, facing left): v2 head on top of an animated 4-legged body. Held items and ground props are hidden.
function buildWalk(c, uid = '') {
  const L = buildCat(c, uid), id = c.id + uid, p = c.colors, a = c.acc || {}, light = mix(p.fur, '#FFFFFF', .5);
  const A = k => sh((c.shift || {})[k], a[k]) || a[k] || '';
  const near = c.bodyFill || p.fur, far = c.bodyShade || p.shade;
  const leg = (cls, x, y, d, fill, front) => `<g transform="translate(${x} ${y})"><g class="w-leg ${cls}"><path d="${d}Z" fill="${fill}"/><path d="${d}" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
    (front ? `<path d="M-7 41 l1 4 M-2 41 l1 5" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/><path d="M-9 46 c3 -2 9 -2 12 0" stroke="#F6DCD3" stroke-width="2" fill="none"/>` : '') + '</g></g>';
  const torsoItems = TORSO_ITEMS.has(c.id);
  return `<defs><clipPath id="${id}-tc"><path d="${TORSO}"/></clipPath></defs>
    <g transform="translate(128 240)"><g class="w-shadow"><path transform="translate(-128 -240)" d="M40 240 C70 232 190 230 228 238 C233 245 196 249 128 249 C70 249 35 247 40 240 Z" fill="${O}" opacity=".25"/></g></g>
    ${leg('w-fb', 208, 189, LEG_B, far)}${leg('w-ff', 134, 189, LEG_F, far)}
    <g class="w-body">
      <g transform="translate(92 84) scale(.62)">${A('back')}</g>
      <g transform="translate(210 162)"><g class="w-tail"><g transform="translate(-210 -162)"><path d="${WTAIL}" ${st(p.fur, 4.5)}/>
        <g fill="${light}"><path d="M193 95 c3 -2 6 0 5 3 c-1 3 -6 2 -5 -3z"/><path d="M201 89 c2 -2 5 -1 4 2 c-1 2 -4 2 -4 -2z"/></g></g></g></g>
      <path d="${TORSO}" fill="${near}"/>
      <g clip-path="url(#${id}-tc)">
        ${c.bodyFill ? '' : `<path d="M100 194 C126 204 168 206 232 196 L232 232 L100 232 Z" fill="${p.belly}"/>`}
        <path d="M196 148 C222 156 234 184 216 212 C228 186 220 162 196 148 Z" fill="${far}"/>
        <path d="M108 186 C124 196 146 200 164 194 C162 206 132 212 110 204 Z" fill="${far}" opacity=".4"/>
        ${torsoItems ? `<g transform="translate(92 84) scale(.62)">${A('body')}${A('bodyTop')}</g>` : ''}
      </g>
      <path d="${TORSO}" fill="none" stroke="${O}" stroke-width="4.5" stroke-linejoin="round"/>
    </g>
    ${leg('w-nb', 192, 191, LEG_B, near)}${leg('w-nf', 118, 191, LEG_F, near, true)}
    <g class="w-body">
      ${c.collar === false ? '' : `<path d="M76 198 Q100 214 126 200" stroke="${O}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M76 198 Q100 214 126 200" stroke="${p.accent}" stroke-width="6" fill="none" stroke-linecap="round"/>`}
      ${torsoItems ? '' : `<g transform="translate(4 98) scale(.74)">${A('body')}${A('bodyTop')}</g>`}
      <g transform="translate(98 200)"><g class="w-head"><g transform="translate(-94 -102) scale(.74)">${L.head}${L.face}</g></g></g>
      ${c.collar === false ? '' : bell(98, 214, 11)}
    </g>`;
}

if (typeof module !== 'undefined') module.exports = { CATS, buildCat, buildWalk };
