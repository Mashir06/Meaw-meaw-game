// Meaw Meaw — the 10 cats (spec: docs/art/cat-designs.md).
// Every cat = shared base silhouette + per-layer accessory SVG. Layers get stacked in 3D by index.html.
const O = '#2B2233', GOLD = '#F5C542', GOLD_SH = '#C9971C';
const st = (fill, w = 4) => `fill="${fill}" stroke="${O}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const mirror = s => `<g transform="translate(256 0) scale(-1 1)">${s}</g>`;
const both = s => s + mirror(s);
const bell = (x, y) => `<circle cx="${x}" cy="${y}" r="10" ${st(GOLD, 3)}/><path d="M${x - 9} ${y + 1}h18" stroke="${GOLD_SH}" stroke-width="2"/><circle cx="${x}" cy="${y + 4}" r="2.5" fill="${O}"/><circle cx="${x - 3}" cy="${y - 4}" r="2.5" fill="#fff"/>`;
const star4 = (x, y, r, fill, cls = '') => `<path class="${cls}" d="M${x} ${y - r}Q${x + r * .2} ${y - r * .2} ${x + r} ${y}Q${x + r * .2} ${y + r * .2} ${x} ${y + r}Q${x - r * .2} ${y + r * .2} ${x - r} ${y}Q${x - r * .2} ${y - r * .2} ${x} ${y - r}Z" ${st(fill, 2.5)}/>`;
const stick = (d, color, w = 6) => `<path d="${d}" stroke="${O}" stroke-width="${w + 6}" stroke-linecap="round" fill="none"/><path d="${d}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;

const EAR_L = 'M56 82 L70 18 L114 54 Z', EAR_L_IN = 'M68 70 L74 36 L100 56 Z';
const HEAD = 'cx="128" cy="100" rx="88" ry="64"';
const BODY = 'M80 150 Q64 238 128 238 Q192 238 176 150 Z';

function buildCat(c) {
  const id = c.id, p = c.colors;
  const ears = (earR) => `<path d="${EAR_L}" ${st(p.fur)}/><path d="${EAR_L_IN}" fill="${p.ear}"/>` +
    (earR ? `<path d="${earR}" ${st(p.fur)}/>` : mirror(`<path d="${EAR_L}" ${st(p.fur)}/>`)) + mirror(`<path d="${EAR_L_IN}" fill="${p.ear}"/>`);
  const pattern = {
    stripes: `<g fill="${p.pattern}"><rect x="110" y="42" width="9" height="20" rx="4.5"/><rect x="123.5" y="38" width="9" height="24" rx="4.5"/><rect x="137" y="42" width="9" height="20" rx="4.5"/><rect x="40" y="96" width="18" height="8" rx="4"/><rect x="198" y="96" width="18" height="8" rx="4"/></g>`,
    scales: `<g fill="${p.pattern}"><path d="M104 56a10 10 0 0 1 20 0z"/><path d="M118 44a10 10 0 0 1 20 0z"/><path d="M132 56a10 10 0 0 1 20 0z"/></g>`,
    patches: `<ellipse cx="164" cy="66" rx="26" ry="18" fill="${p.pattern}"/>`,
  }[c.pattern || 'stripes'];
  const eye = (x, kind) => kind === 'x'
    ? `<path d="M${x - 8} ${c.eyeY - 8}l16 16M${x + 8} ${c.eyeY - 8}l-16 16" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`
    : kind === 'slit' ? `<ellipse cx="${x}" cy="${c.eyeY}" rx="9" ry="11" ${st(p.eye, 3)}/><ellipse cx="${x}" cy="${c.eyeY}" rx="2.5" ry="9" fill="${O}"/><circle cx="${x + 3}" cy="${c.eyeY - 5}" r="2" fill="#fff"/>`
    : kind === 'big' ? `<circle cx="${x}" cy="${c.eyeY}" r="9" ${st(p.eye, 3)}/><circle cx="${x}" cy="${c.eyeY}" r="4" fill="${O}"/><circle cx="${x + 3}" cy="${c.eyeY - 4}" r="2.5" fill="#fff"/>`
    : `<ellipse cx="${x}" cy="${c.eyeY}" rx="7.5" ry="10" fill="${p.eye}"/><circle cx="${x + 2.5}" cy="${c.eyeY - 4}" r="2.8" fill="#fff"/>`;
  c.eyeY = 106;
  const a = c.acc || {};
  const bodyFill = c.bodyFill || p.fur, bodyShade = c.bodyShade || p.shade;
  const layers = {
    ground: a.ground || '',
    back: `<path d="M90 214 Q36 226 32 190 Q30 164 52 160" stroke="${O}" stroke-width="24" fill="none" stroke-linecap="round"/><path d="M90 214 Q36 226 32 190 Q30 164 52 160" stroke="${p.fur}" stroke-width="15" fill="none" stroke-linecap="round"/>` + (a.back || ''),
    body: `<defs><clipPath id="${id}-bc"><path d="${BODY}"/></clipPath></defs>
      <path d="${BODY}" fill="${bodyFill}"/><path d="${BODY}" transform="translate(16 2)" fill="${bodyShade}" clip-path="url(#${id}-bc)"/>
      ${c.bodyFill ? '' : `<ellipse cx="124" cy="206" rx="34" ry="30" fill="${p.belly}" clip-path="url(#${id}-bc)"/>`}
      <path d="${BODY}" fill="none" stroke="${O}" stroke-width="4"/>
      <g ${st(p.belly)}><ellipse cx="106" cy="238" rx="16" ry="9"/><ellipse cx="150" cy="238" rx="16" ry="9"/></g>
      <path d="M102 234v7M110 234v7M146 234v7M154 234v7" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>` +
      (a.body || '') +
      (c.collar === false ? '' : `<path d="M82 168 Q128 188 174 168" stroke="${O}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M82 168 Q128 188 174 168" stroke="${p.accent}" stroke-width="8" fill="none" stroke-linecap="round"/>${bell(128, 184)}`) +
      (a.bodyTop || ''),
    head: `<defs><clipPath id="${id}-hc"><ellipse ${HEAD}/></clipPath></defs>${ears(c.earR)}
      <ellipse ${HEAD} fill="${p.fur}"/><ellipse ${HEAD} transform="translate(20 16)" fill="${p.shade}" clip-path="url(#${id}-hc)"/>
      <ellipse cx="128" cy="140" rx="70" ry="30" fill="${p.belly}" clip-path="url(#${id}-hc)"/>
      ${pattern}<ellipse ${HEAD} fill="none" stroke="${O}" stroke-width="4"/>` + (a.head || '') + (c.earsOver ? ears(c.earR) : '') + (a.headTop || ''),
    face: `<ellipse cx="128" cy="126" rx="28" ry="18" fill="${p.belly}"/>
      <path d="M121 117h14l-7 7z" ${st('#FF9AA8', 2)}/>
      <path d="M112 126q8 10 16 0q8 10 16 0" stroke="${O}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
      (a.face || '') + eye(86, c.eyeL) + eye(170, c.eyeR) + (a.faceTop || ''),
    front: (a.front || '') + (c.rarity === 'Legendario' ? `<g class="sparkles">${star4(30, 40, 7, GOLD)}${star4(228, 70, 6, GOLD)}${star4(218, 200, 5, GOLD)}${star4(24, 150, 5, GOLD)}</g>` : ''),
  };
  return layers;
}

const CATS = [
  { id: 'gato-sushi', name: 'Gato Sushi', rarity: 'Común', anim: 'jelly', bio: 'Dormilón y glotón; se enrolla en arroz para la siesta.',
    colors: { fur: '#F2A65A', shade: '#D9833A', belly: '#FFF6EC', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#C46A26', accent: '#2F4A3A' },
    collar: false,
    acc: {
      ground: `<ellipse cx="128" cy="236" rx="110" ry="18" ${st('#fff')}/><g ${st('#fff', 2)}><ellipse cx="34" cy="226" rx="8" ry="4"/><ellipse cx="62" cy="244" rx="8" ry="4"/><ellipse cx="200" cy="246" rx="8" ry="4"/><ellipse cx="226" cy="228" rx="8" ry="4"/></g>`,
      body: `<rect x="80" y="188" width="96" height="24" rx="8" ${st('#2F4A3A')}/>${bell(128, 200)}`,
      headTop: `<path class="bob" d="M64 6 Q54 22 64 28 Q74 22 64 6Z" ${st('#8BC34A', 3)}/>`,
      front: stick('M150 248 L206 184', '#C99A6B', 5) + stick('M166 248 L198 180', '#C99A6B', 5),
    } },
  { id: 'gato-ninja', name: 'Gato Ninja', rarity: 'Común', anim: 'sway', bio: 'Silencioso y tímido; desaparece si lo miras mucho.',
    colors: { fur: '#4A4858', shade: '#33313F', belly: '#E9E6F0', ear: '#F2A7B5', eye: '#1E1A22', pattern: '#1B1A22', accent: '#D93A3A' },
    acc: {
      back: `<g class="flutter">${stick('M206 70 Q228 60 246 78', '#D93A3A', 8)}${stick('M206 78 Q226 92 240 110', '#D93A3A', 8)}</g>`,
      head: `<path d="M50 68 Q128 40 206 68 L212 88 Q128 60 44 88 Z" ${st('#D93A3A')}/><circle cx="208" cy="78" r="8" ${st('#D93A3A', 3)}/>`,
      face: `<path d="M58 116 Q128 98 198 116 Q194 162 128 164 Q62 162 58 116Z" ${st('#33313F')}/>`,
      front: `<g class="spin"><path d="M150 196 L156 212 L172 218 L156 224 L150 240 L144 224 L128 218 L144 212Z" ${st('#9AA3AD', 3)}/><circle cx="150" cy="218" r="4" fill="#4A4858"/></g>`,
    } },
  { id: 'gato-gamer', name: 'Gato Gamer', rarity: 'Común', anim: 'sway', bio: 'Competitivo y trasnochador; "una partida más".',
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
    colors: { fur: '#9CC59A', shade: '#76A275', belly: '#DDEBD5', ear: '#C98FA0', eye: '#E8F55A', pattern: '#5E7F5D', accent: '#7A4FA0' },
    eyeL: 'x', eyeR: 'big',
    earR: 'M200 82 L195 60 L182 48 L191 36 L186 18 L142 54 Z',
    acc: {
      head: `<path d="M152 72 L188 58" stroke="${O}" stroke-width="3" stroke-linecap="round"/><path d="M158 64l4 10M168 60l4 10M178 56l4 10" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`,
      face: `<path d="M131 128 L135 137 L139 128Z" ${st('#fff', 2)}/>`,
      body: `<rect x="88" y="196" width="80" height="13" rx="3" transform="rotate(-22 128 202)" ${st('#F2EBD9', 3)}/><rect x="88" y="210" width="80" height="13" rx="3" transform="rotate(18 128 216)" ${st('#F2EBD9', 3)}/>`,
      front: `<g class="mash">${stick('M150 226 H200', '#F2EBD9', 4)}${stick('M162 216 V236 M174 216 V236 M186 216 V236', '#F2EBD9', 3)}<path d="M198 226 L214 214 L214 238Z" ${st('#F2EBD9', 3)}/><circle cx="148" cy="226" r="6" ${st('#F2EBD9', 3)}/></g>`,
    } },
  { id: 'gato-pirata', name: 'Gato Pirata', rarity: 'Raro', anim: 'boat', bio: 'Fanfarrón y aventurero; todo tesoro es suyo.',
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
    colors: { fur: '#F4F1EA', shade: '#D6D1C6', belly: '#FFFFFF', ear: '#FFB3C6', eye: '#1E1A22', pattern: '#F2A65A', accent: '#3B6FE0' },
    collar: false, bodyFill: '#FFFFFF', bodyShade: '#C9D2DC',
    acc: {
      back: `<rect x="56" y="140" width="144" height="84" rx="18" ${st('#C9D2DC')}/>`,
      body: `<rect x="106" y="190" width="44" height="28" rx="6" ${st('#3B6FE0')}/><circle cx="117" cy="204" r="4" fill="#FF5C5C"/><circle cx="128" cy="204" r="4" fill="${GOLD}"/><circle cx="139" cy="204" r="4" fill="#3DF5C8"/>
        <path d="M84 168 Q128 186 172 168" stroke="${O}" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M84 168 Q128 186 172 168" stroke="#9AA3AD" stroke-width="8" fill="none" stroke-linecap="round"/>`,
      front: `<ellipse cx="128" cy="102" rx="108" ry="92" fill="#BFE6FF" fill-opacity=".28" stroke="${O}" stroke-width="4"/>
        <path class="glint" d="M44 84 Q50 34 100 20" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>
        <g class="twinkle">${star4(232, 28, 8, GOLD)}${star4(22, 210, 7, GOLD)}${star4(236, 190, 6, GOLD)}</g>`,
    } },
  { id: 'gato-caballero', name: 'Gato Caballero', rarity: 'Épico', anim: 'sway', bio: 'Noble y valiente; protege a los gatitos de las aspiradoras.',
    colors: { fur: '#C98B5A', shade: '#A56B3E', belly: '#FFF3E3', ear: '#FFB3A7', eye: '#1E1A22', pattern: '#8A5530', accent: '#2D5BD1' },
    earsOver: true,
    acc: {
      back: `<path class="flutter" d="M72 150 Q44 236 26 248 L230 248 Q212 236 184 150Z" ${st('#2D5BD1')}/>`,
      body: `<path d="M96 178 L160 178 L156 212 Q128 230 100 212Z" ${st('#B9C3CF')}/>`,
      head: `<path d="M40 96 Q40 28 128 28 Q216 28 216 96 Z" ${st('#B9C3CF')}/><path d="M150 32 Q206 40 214 94 L196 94 Q192 52 150 32Z" fill="#8E99A8"/>
        <rect x="44" y="78" width="168" height="18" rx="7" ${st('#8E99A8')}/><path d="M70 87h40M146 87h40" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`,
      headTop: `<path class="flutter" d="M118 30 Q104 12 122 2 Q122 16 134 8 Q146 18 138 30Z" ${st('#E04B4B', 3)}/>`,
      front: `<g class="shield"><path d="M58 182 L112 182 L112 210 Q112 234 85 246 Q58 234 58 210Z" ${st('#2D5BD1')}/><path d="M66 190 L104 190 L104 210 Q104 228 85 237 Q66 228 66 210Z" fill="none" stroke="${GOLD}" stroke-width="3"/>
          <g fill="${GOLD}"><circle cx="85" cy="216" r="7"/><circle cx="76" cy="204" r="3.5"/><circle cx="85" cy="200" r="3.5"/><circle cx="94" cy="204" r="3.5"/></g></g>
        <rect x="164" y="160" width="12" height="62" rx="3" ${st('#DDE3EA', 3)}/><rect x="152" y="220" width="36" height="9" rx="3" ${st(GOLD, 3)}/><rect x="165" y="228" width="10" height="18" rx="3" ${st(GOLD, 3)}/>`,
    } },
  { id: 'gato-mago', name: 'Gato Mago', rarity: 'Épico', anim: 'sway', bio: 'Despistado y sabio; sus hechizos acaban en burbujas.',
    colors: { fur: '#6F6A8F', shade: '#524D70', belly: '#EDEAF7', ear: '#F4A8C8', eye: '#1E1A22', pattern: '#3F3A5C', accent: '#8E4FD9' },
    acc: {
      back: `<path d="M68 150 L40 248 L216 248 L188 150Z" ${st('#8E4FD9')}/>${star4(56, 222, 8, GOLD)}${star4(202, 214, 7, GOLD)}`,
      headTop: `<g class="hat"><path d="M82 52 L122 4 Q154 -2 178 22 Q156 16 146 24 L176 52Z" ${st('#8E4FD9')}/>
        <path d="M98 34 L152 34 L158 44 L92 44Z" fill="${GOLD}"/><circle cx="130" cy="20" r="7" fill="${GOLD}"/><circle cx="134" cy="17" r="6" fill="#8E4FD9"/>
        <ellipse cx="128" cy="54" rx="94" ry="14" ${st('#8E4FD9')}/><ellipse cx="150" cy="58" rx="60" ry="7" fill="#6B37A8"/></g>`,
      face: `<path d="M98 134 Q92 160 110 158 Q116 172 128 164 Q140 172 146 158 Q164 160 158 134 Q128 146 98 134Z" ${st('#fff', 3)}/>`,
      faceTop: `<g fill="none" stroke="${GOLD}" stroke-width="4"><circle cx="86" cy="106" r="15"/><circle cx="170" cy="106" r="15"/><path d="M101 104 Q128 94 155 104"/></g>`,
      front: stick('M172 244 L198 184', '#7A4E2D', 6) + star4(200, 178, 14, GOLD, 'spin') +
        `<g fill="#9FE8FF" fill-opacity=".6" stroke="${O}" stroke-width="2"><circle class="bubble b1" cx="214" cy="150" r="8"/><circle class="bubble b2" cx="228" cy="128" r="6"/><circle class="bubble b3" cx="210" cy="110" r="5"/></g>`,
    } },
  { id: 'gato-dragon', name: 'Gato Dragón', rarity: 'Legendario', anim: 'sway', bio: 'Orgulloso y juguetón; estornuda fuego si se emociona.',
    colors: { fur: '#4FB477', shade: '#348C58', belly: '#FCE7A8', ear: '#FF9E7A', eye: '#E0A21B', pattern: '#2E7048', accent: '#E8553A' },
    pattern: 'scales', eyeL: 'slit', eyeR: 'slit',
    acc: {
      back: `<path d="M38 162 L28 140 L50 150Z" ${st('#E8553A', 3)}/>` +
        `<g class="wing-l"><path d="M90 168 L22 92 L34 130 L4 132 L28 158 L8 178 Z" ${st('#E8553A')}/><path d="M84 166 L30 112 L36 136 L20 140 L38 160Z" fill="#F7A35C"/></g>` +
        mirror(`<g class="wing-l"><path d="M90 168 L22 92 L34 130 L4 132 L28 158 L8 178 Z" ${st('#E8553A')}/><path d="M84 166 L30 112 L36 136 L20 140 L38 160Z" fill="#F7A35C"/></g>`),
      body: `<path d="M100 196 Q124 202 148 196M98 212 Q124 218 150 212M102 228 Q124 234 146 228" stroke="#E0B850" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      head: both(`<path d="M94 44 Q78 14 100 4 Q94 24 110 38Z" ${st('#FCE7A8', 3)}/>`),
      front: `<g class="puff"><circle cx="152" cy="132" r="7" ${st('#F7A35C', 2.5)}/><circle cx="168" cy="122" r="9" ${st('#E8553A', 2.5)}/><circle cx="186" cy="110" r="11" ${st('#F7A35C', 2.5)}/></g>`,
    } },
  { id: 'gato-angel', name: 'Gato Ángel', rarity: 'Legendario', anim: 'float', bio: 'Dulce y sereno; al ronronear florecen nubecitas.',
    colors: { fur: '#FFFFFF', shade: '#DCE3F0', belly: '#FFFFFF', ear: '#FFC2D6', eye: '#4A6FD9', pattern: '#F2D9A6', accent: '#F5C542' },
    eyeL: 'big', eyeR: 'big',
    acc: {
      ground: `<g ${st('#EAF2FF')}><circle cx="72" cy="236" r="24"/><circle cx="184" cy="236" r="24"/><circle cx="128" cy="238" r="32"/></g>`,
      back: both(`<g class="wing-l"><path d="M88 158 Q30 92 16 128 Q2 140 22 154 Q6 170 32 178 Q28 196 74 186 Z" ${st('#FFFFFF')}/><path d="M80 166 Q40 160 30 140" stroke="#DCE3F0" stroke-width="4" fill="none"/></g>`),
      headTop: `<ellipse class="halo" cx="128" cy="14" rx="42" ry="9" fill="none" stroke="${O}" stroke-width="11"/><ellipse class="halo" cx="128" cy="14" rx="42" ry="9" fill="none" stroke="${GOLD}" stroke-width="6"/>`,
      face: `<g fill="#FFB3C6" opacity=".7"><ellipse cx="66" cy="128" rx="13" ry="7"/><ellipse cx="190" cy="128" rx="13" ry="7"/></g>`,
    } },
];

if (typeof module !== 'undefined') module.exports = { CATS, buildCat };
