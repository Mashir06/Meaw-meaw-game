# Meaw Meaw — Diseños de gatos (v1)

## Estilo compartido (base de la familia)

Todos los gatos usan la **misma silueta base**; solo cambian colores y capas de accesorios.

- **Pose**: sentado, de frente, simétrico. Viewbox de referencia `0 0 256 256`.
- **Proporciones**: cabeza redonda ≈ 60 % de la altura total y más ancha que el cuerpo; cuerpo en forma de pera; patitas diminutas con 2 líneas de dedos.
- **Orejas**: puntiagudas, interior en color "oreja interior".
- **Cara**: ojos negros ovalados pequeños y muy separados (con brillo blanco de 1 círculo), hocico blanco/claro con boca "ω" (:3), naricita rosa.
- **Patrón**: 3 rayas atigradas en la frente (color "patrón"), opcionalmente 2 en mejillas.
- **Cola**: enroscada hacia la izquierda, detrás del cuerpo.
- **Collar** con cascabel dorado en todos (el color del collar = acento; cascabel `#F5C542`, sombra `#C9971C`), salvo que el gato lo sustituya.
- **Línea**: contorno grueso `#2B2233`, 4 px a 256 px, `stroke-linejoin: round`.
- **Sombreado**: cel plano, **una** sola sombra (color "sombra") en el lado derecho/inferior. Sin degradados salvo brillos de rareza.
- **Ojo** por defecto `#1E1A22`; si el gato tiene otro color de ojo se indica.

### Capas SVG (orden de pintado, de atrás hacia adelante)

| Capa | Contenido | Uso 3D |
|------|-----------|--------|
| `back` | alas, capa, cola, aletas, mochila | `translateZ(-20px)`, gira más que el cuerpo |
| `body` | cuerpo, patas, barriga, collar | `translateZ(0)` |
| `head` | cabeza, orejas, rayas, sombreros/cascos | `translateZ(10px)` |
| `face` | ojos, hocico, boca, parches/máscaras | `translateZ(16px)` |
| `front` | objetos sostenidos, partículas, efectos | `translateZ(28px)` |

**Movimiento pseudo-3D**: contenedor con `perspective: 600px` y `transform-style: preserve-3d`; cada capa es un `<g>`/`<div>` con su `translateZ`. Idle base para todos: respiración `scaleY 1→1.03` (2.4 s) + balanceo `rotateY ±8°` (4 s, ease-in-out). Con el puntero/giroscopio, el contenedor sigue `rotateX/rotateY` máx. ±15° → parallax natural entre capas.

### Rarezas (marco de la carta)

| Rareza | Marco | Efecto |
|--------|-------|--------|
| Común | `#B8C2CC` | ninguno |
| Raro | `#4FA3F7` | brillo suave en borde |
| Épico | `#A65BF2` | destello diagonal (shine) cada 4 s |
| Legendario | `#F5B83D` | shine + partículas en capa `front` |

---

## 1. Gato Sushi — `gato-sushi` · Común
*Dormilón y glotón; se enrolla en arroz para echarse la siesta.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F2A65A` | `#D9833A` | `#FFF6EC` | `#FFB3A7` | `#1E1A22` | `#C46A26` | `#2F4A3A` |

Capas:
- `back` — **cama de arroz**: elipse ancha `#FFFFFF` (sombra `#E6E2DA`) bajo el cuerpo, con 5–6 granos (óvalos) en el borde.
- `body` — **banda de nori**: rectángulo redondeado `#2F4A3A` cruzando la barriga (sustituye al collar; cascabel encima).
- `head` — **gotita de wasabi**: pequeña gota `#8BC34A` sobre la oreja izquierda.
- `front` — **palillos**: dos rectángulos finos `#C99A6B` cruzados en la pata derecha.

Idle: bamboleo lateral `rotateZ ±3°` como gelatina + la gota de wasabi rebota `translateY` con 0.2 s de retraso.

## 2. Gato Ninja — `gato-ninja` · Común
*Silencioso y tímido; desaparece cuando lo miras mucho.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#3A3846` | `#26242F` | `#E9E6F0` | `#F2A7B5` | `#1E1A22` | `#1B1A22` | `#D93A3A` |

Capas:
- `back` — **colas de la cinta**: dos tiras onduladas `#D93A3A` saliendo del lado derecho de la cabeza.
- `head` — **cinta (hachimaki)**: banda `#D93A3A` alrededor de la frente, tapa las rayas centrales.
- `face` — **máscara**: forma de media luna `#26242F` cubriendo el hocico hasta debajo de los ojos (la "ω" queda oculta; solo ojos visibles).
- `front` — **shuriken**: estrella de 4 puntas `#9AA3AD` con círculo central `#3A3846`, en la pata.

Idle: las tiras de la cinta ondean con `rotateY` alterno ±20°; cada 6 s el shuriken gira `rotateZ 360°` en 0.5 s.

## 3. Gato Gamer — `gato-gamer` · Común
*Competitivo y trasnochador; dice "una partida más" siempre.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#9AA0A8` | `#767C85` | `#FFFFFF` | `#FFB6A3` | `#1E1A22` | `#5E636B` | `#7B5CFF` |

Capas:
- `head` — **auriculares**: arco `#2B2233` sobre la cabeza + dos copas redondas `#7B5CFF` en los lados, con LED circular `#3DF5C8`.
- `face` — **reflejo de pantalla**: dos rectángulos semitransparentes `#3DF5C8` (opacidad 0.35) sobre los ojos.
- `front` — **mando**: forma de "hueso" redondeado `#2B2233` con cruceta `#FFFFFF` y 2 botones (`#FF5C8A`, `#3DF5C8`), sujetado con ambas patas.

Idle: el mando se inclina `rotateY ±12°` rápido (pulsando botones); LEDs parpadean opacidad 1→0.4 cada 1 s; cabeza `rotateY` sigue al mando con retraso.

## 4. Gato Zombi — `gato-zombi` · Raro
*Lento pero cariñoso; solo quiere cerebritos… de pescado.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#9CC59A` | `#76A275` | `#DDEBD5` | `#C98FA0` | `#E8F55A` (un ojo) / `#1E1A22` | `#5E7F5D` | `#7A4FA0` |

Capas:
- `head` — **oreja mordida**: la oreja derecha con muesca triangular recortada + **puntos de sutura**: línea `#2B2233` en zigzag en la frente.
- `face` — **ojo en X**: ojo izquierdo sustituido por una "X" `#2B2233`; ojo derecho círculo `#E8F55A` con pupila negra. Boca "ω" con un colmillo triangular blanco.
- `body` — **vendas**: 2 tiras `#F2EBD9` cruzadas en diagonal sobre la barriga; collar `#7A4FA0` deshilachado (borde en zigzag).
- `front` — **pescadito-hueso**: espina de pescado `#F2EBD9` en la pata.

Idle: inclinación de cabeza `rotateZ 0→10°` con pausa (torpe) y `rotateY` asimétrico (−5° / +12°); la oreja mordida tiembla `rotateZ ±4°`.

## 5. Gato Pirata — `gato-pirata` · Raro
*Fanfarrón y aventurero; cree que todo tesoro es suyo.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#E8E2D6` | `#C9C0AF` | `#FFFFFF` | `#FFB3A7` | `#1E1A22` | `#2E2A2A` | `#C0392B` |

Capas (manchas tipo vaquita en lugar de rayas: 2 manchas `#2E2A2A` en cabeza y lomo):
- `head` — **tricornio**: triángulo curvo `#2E2A2A` con ribete `#F5C542` y calavera blanca simple (círculo + 2 puntos).
- `face` — **parche**: círculo `#2E2A2A` sobre el ojo derecho con cinta diagonal fina.
- `body` — **pañuelo**: triángulo `#C0392B` con lunares blancos en el cuello (sustituye al collar; cascabel visible delante).
- `back` — **loro mini**: (opcional, si cabe) pájaro redondo `#3DBE5A` sobre el hombro izquierdo.

Idle: balanceo de barco `rotateZ ±5°` + `rotateY ±10°` desfasados; el sombrero va un 30 % más tarde que la cabeza.

## 6. Gato Astronauta — `gato-astronauta` · Raro
*Curioso y soñador; mira las estrellas buscando el planeta atún.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F4F1EA` | `#D6D1C6` | `#FFFFFF` | `#FFB3C6` | `#1E1A22` | `#F2A65A` | `#3B6FE0` |

Capas:
- `back` — **mochila**: rectángulo redondeado `#C9D2DC` detrás del cuerpo con 2 tubos `#3B6FE0`.
- `body` — **traje**: cuerpo cubierto `#FFFFFF` con sombra `#C9D2DC`, panel de pecho `#3B6FE0` con 3 botones (`#FF5C5C`, `#F5C542`, `#3DF5C8`); collar sustituido por anillo de cuello `#9AA3AD`.
- `head` — **casco**: círculo grande translúcido (`#BFE6FF`, opacidad 0.3, contorno 4 px) que envuelve la cabeza y orejas + reflejo curvo blanco.
- `front` — **estrellitas**: 3 estrellas de 4 puntas `#F5C542` flotando.

Idle: flotación ingrávida `translateY ±6px` (3 s) + `rotateY` lento ±15°; el reflejo del casco se desliza opuesto al giro (parallax entre `head` y `front`).

## 7. Gato Caballero — `gato-caballero` · Épico
*Noble y valiente; protege a los gatitos pequeños de las aspiradoras.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#C98B5A` | `#A56B3E` | `#FFF3E3` | `#FFB3A7` | `#1E1A22` | `#8A5530` | `#2D5BD1` |

Capas:
- `back` — **capa**: forma de campana `#2D5BD1` (sombra `#1F44A3`) detrás del cuerpo.
- `head` — **yelmo**: media cúpula `#B9C3CF` (sombra `#8E99A8`) con visera levantada (franja horizontal con 2 ranuras), orejas asomando por agujeros; **penacho** `#E04B4B` en forma de llama arriba.
- `body` — **peto**: escudo-babero `#B9C3CF` sobre el pecho; collar con cascabel por encima.
- `front` — **escudo**: escudo heráldico `#2D5BD1` con borde `#F5C542` y huella de gato `#F5C542`, en pata izquierda; **espada** corta `#DDE3EA` con empuñadura `#F5C542` en la derecha.

Idle: guardia: escudo `rotateY 0→-20°` (se gira hacia el espectador) y vuelve; penacho y capa ondean con `rotateY ±10°` desfasados; shine épico recorre el yelmo.

## 8. Gato Mago — `gato-mago` · Épico
*Despistado y sabio; sus hechizos siempre acaban en burbujas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#6F6A8F` | `#524D70` | `#EDEAF7` | `#F4A8C8` | `#1E1A22` | `#3F3A5C` | `#8E4FD9` |

Capas:
- `back` — **túnica**: forma trapezoidal `#8E4FD9` con estrellas `#F5C542` asomando a los lados del cuerpo.
- `head` — **sombrero**: cono doblado `#8E4FD9` (sombra `#6B37A8`) con ala elíptica, banda `#F5C542` y luna creciente `#F5C542`; orejas tapadas.
- `face` — **gafas redondas**: dos círculos `#F5C542` sin relleno sobre los ojos + **barba**: forma de nube `#FFFFFF` bajo el hocico.
- `front` — **varita**: palo `#7A4E2D` con estrella `#F5C542`; **orbe**: 3 burbujas `#9FE8FF` (opacidad 0.6) que suben.

Idle: la punta del sombrero cae y rebota `rotateZ ±8°`; burbujas suben `translateY -40px` + `translateZ` creciente y se desvanecen; varita traza `rotateY` en arco.

## 9. Gato Dragón — `gato-dragon` · Legendario
*Orgulloso y juguetón; estornuda fuego cuando se emociona.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#4FB477` | `#348C58` | `#FCE7A8` | `#FF9E7A` | `#E0A21B` (pupila rasgada `#1E1A22`) | `#2E7048` | `#E8553A` |

Capas (rayas de la frente reemplazadas por escamas: 3 semicírculos `#2E7048`):
- `back` — **alas**: dos alas de murciélago (3 puntas) `#E8553A` con membrana `#F7A35C`, ancladas a los hombros. **Cola**: punta en forma de flecha/corazón `#E8553A`.
- `head` — **cuernos**: dos cuernos curvos hacia atrás `#FCE7A8` (sombra `#D9BE72`) entre las orejas.
- `body` — **cresta**: 3 triángulos pequeños `#E8553A` en el lomo visible; barriga con bandas horizontales `#F2D27F`.
- `front` — **bocanada**: 3 círculos de humo/fuego `#F7A35C`→`#E8553A` saliendo del hocico (aparecen en idle).
- Collar `#E8553A` con cascabel dorado.

Idle: aleteo `rotateY 0→35°` (ala izq.) / `0→-35°` (ala der.) con `transform-origin` en el hombro, 0.8 s; cada 5 s mini estornudo: cabeza `translateZ +8px` y bocanada escala 0→1; partículas legendarias (chispas `#F5B83D`).

## 10. Gato Ángel — `gato-angel` · Legendario
*Dulce y sereno; ronronea y florecen nubecitas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#FFFFFF` | `#DCE3F0` | `#FFFFFF` | `#FFC2D6` | `#4A6FD9` (brillo blanco) | `#F2D9A6` | `#F5C542` |

Capas (rayas muy suaves `#F2D9A6`; contorno igual `#2B2233` para no perder la familia):
- `back` — **alas**: dos alas de plumas (3 lóbulos redondeados) `#FFFFFF` con sombra `#DCE3F0`. **Nube**: 3 círculos solapados `#EAF2FF` bajo el cuerpo.
- `head` — **aureola**: elipse sin relleno `#F5C542` (stroke 6 px) flotando sobre la cabeza, separada.
- `face` — **rubor**: dos óvalos `#FFB3C6` (opacidad 0.6) en mejillas.
- `body` — collar `#F5C542` con cascabel; **toga**: pañuelo triangular `#EAF2FF` opcional.
- `front` — **destellos**: 4 estrellitas `#F5C542` y corazones `#FFB3C6` pequeños.

Idle: levitación `translateY ±8px` (3.5 s) sobre la nube fija; aureola flota con `translateZ 20px` y gira `rotateX` 70° fijo + `rotateZ` lento (parece aro 3D); alas `rotateY ±25°` suaves 1.6 s.

---

## Base v2 — fiel a la referencia

Sustituye la silueta de `buildCat` (v1). Medido sobre la imagen de referencia (462×507) y llevado a viewBox `0 0 256 256` con `x' = 128 + (x−252)·0.56`, `y' = (y−25)·0.56`.

**Qué cambia respecto a v1 (lo que hoy se ve en `coleccion.png`)**
- Cabeza **más ancha y plana** (≈174×110, proporción 1.6:1; v1 era 176×128 y redonda) y más alta en el lienzo: termina en y≈142 (v1: 164).
- Orejas **grandes y separadas**, nacen en los bordes de la cabeza; interior melocotón grande.
- **Sin nariz.** El blanco del hocico es una sola forma que sube hasta una punta suave entre los ojos (128,74) y baja hasta la barbilla; la "ω" va justo debajo de esa punta.
- Ojos **óvalos verticales pequeños**, separados y a la altura del inicio del blanco (y≈92, v1: 106).
- Mejillas: óvalo gris oscuro en cada borde + manchita clara bajo cada ojo. Frente: 3 rayas + 2 manchitas claras.
- Cuerpo casi todo **blanco (babero)** con laterales grises; sombra rosada-grisácea bajo la cabeza y en la base.
- Patas delanteras = **4 líneas finas oscuras** (2 por pata) y patitas redondas diminutas; 2 patitas traseras a los lados.
- Collar = banda fina curva + **cascabel grande** (r17). Sombra elíptica oscura bajo el gato. Contorno casi negro más grueso.

**Paleta de la referencia (gato gris "base")**

| Pelaje | Sombra / mejilla | Raya | Manchas claras | Blanco | Oreja int. | Sombra rosada | Collar | Cascabel / sombra | Ojo / contorno |
|---|---|---|---|---|---|---|---|---|---|
| `#B4B0C2` | `#9A96AA` | `#8F8BA0` | `#DAD6E3` | `#FFFFFF` | `#F7BC9C` | `#D2BEBC` | `#2F6E8C` | `#F5B82E` / `#C9861C` | `#1A161F` |

Por gato: `fur`, `shade` (mejillas y lado del cuerpo), `pattern` (rayas), `belly` (blanco de hocico/babero), `innerEar`, `accent` (collar). Manchas claras = `fur` mezclado 50 % con blanco; sombra rosada = `shade` op 0.35 sobre el blanco.

**Contorno**: `#1A161F`, stroke **5** (`stroke-linejoin/linecap: round`) en cabeza, orejas, cuerpo, cola, cascabel y patitas; 4 en boca y patas; sin contorno en mejillas, rayas, manchas y sombras.

**Formas (orden de pintado, de atrás hacia delante)**

| Parte | Capa | Forma (viewBox 256) |
|---|---|---|
| Sombra suelo | `ground` | `<ellipse cx="128" cy="243" rx="84" ry="9" fill="#1A161F" opacity=".3"/>` |
| Cola | `back` | `M52,228 C30,232 10,220 8,200 C6,184 18,176 28,180 C38,184 36,198 48,206 Z` fill `fur`; manchas claras r3 (16,188), r2.5 (24,183), r2 (13,197) |
| Cuerpo | `body` | `M70,132 C50,160 38,196 42,224 C44,238 56,242 72,242 L184,242 C200,242 212,238 214,224 C218,196 206,160 186,132 Z` fill `fur` (= clip `bc`) |
| Babero | `body` (clip `bc`) | `M76,140 C66,172 64,210 70,244 L198,244 C204,210 200,172 186,140 Z` fill `belly` → deja ~25 px de gris a la izq. y ~15 a la dcha. |
| Lado sombreado | `body` (clip `bc`) | `<ellipse cx="50" cy="196" rx="14" ry="36" fill="shade"/>` |
| Sombra bajo cabeza | `body` (clip `bc`) | `<ellipse cx="128" cy="140" rx="76" ry="17" fill="#D2BEBC"/>` (asoma y142–157) |
| Sombra base | `body` (clip `bc`) | `<ellipse cx="128" cy="252" rx="94" ry="27" fill="#D2BEBC"/>` (franja y225–242) |
| Patas (líneas) | `body` | 4 trazos stroke 4: `M104,208 Q100,224 104,236` · `M124,216 L124,238` · `M132,216 L132,238` · `M152,208 Q156,224 152,236` |
| Patitas delanteras | `body` | elipses (114,239) y (142,239) rx9 ry5, fill `#F6DCD3`, contorno 3 |
| Patitas traseras | `body` | elipses (90,234) y (172,234) rx11 ry6, fill `#F7E3DC`, contorno 4, 2 rayitas de dedos cada una |
| Collar | `body` | `M68,140 Q128,166 188,140`: primero stroke 15 `#1A161F`, encima stroke 9 `accent` (punto más bajo y≈153) |
| Cascabel | `body` | anilla `<circle cx="128" cy="158" r="6"/>` stroke 3; bola `<circle cx="128" cy="176" r="17"/>` `#F5B82E`; media luna `#C9861C` abajo-dcha (clip a la bola); brillo `<ellipse cx="121" cy="168" rx="5" ry="3" fill="#FFF3C2"/>`; ranura `M114,182 L142,182` stroke 3 + `<circle cx="128" cy="188" r="3"/>` |
| Oreja izq. | `head` | `M46,66 C44,40 52,14 70,6 Q76,3 82,8 C96,20 106,30 110,40 Z` fill `fur`; interior `M60,52 C60,36 66,20 74,14 C84,22 92,30 96,38 Z` fill `innerEar` |
| Oreja dcha. | `head` | espejo `x→256−x`: `M210,66 C212,40 204,14 186,6 Q180,3 174,8 C160,20 150,30 146,40 Z`; interior `M196,52 C196,36 190,20 182,14 C172,22 164,30 160,38 Z` (`earR` sustituye este par) |
| Cabeza | `head` | `M42,94 C40,52 78,32 128,32 C178,32 216,52 214,94 C213,126 178,142 128,142 C78,142 43,126 42,94 Z` fill `fur` (= clip `hc`); contorno al final de la capa |
| Mejillas oscuras | `head` (clip `hc`) | elipses (58,94) y (198,94) rx16 ry9, fill `shade` |
| Rayas frente | `head` | elipses rx5: (111,52) ry9 rot −12°, (128,48) ry10, (145,52) ry9 rot 12°, fill `pattern` |
| Manchas frente | `head` | elipses (100,68) y (156,68) rx7 ry5, fill claro |
| Hocico blanco | `head` (clip `hc`) | `M40,124 C60,120 84,112 100,98 C112,88 120,80 128,74 C136,80 144,88 156,98 C172,112 196,120 216,124 L216,148 L40,148 Z` fill `belly` (punta en (128,74), sin nariz) |
| Manchas mejilla | `head` | elipses (78,104) y (178,104) rx10 ry5, fill claro (quedan sobre el gris, junto al borde del blanco) |
| Ojos | `face` | `<ellipse cx="85" cy="92" rx="6" ry="9.5"/>` y `cx="171"`, fill `eye`; brillo blanco r2.4 en (87,87) y (173,87) |
| Boca "ω" | `face` | `M107,99 C107,110 125,111 128,101 C131,111 149,110 149,99`, stroke 4, sin relleno |
| Barbilla | `face` | `M118,113 Q128,121 138,113 Q128,116 118,113 Z` fill `#DAD6E3` (sombrita bajo la boca, opcional) |

**Anclas v2 para accesorios** (ojos (85,92)/(171,92); punta del hocico (128,74); boca y99–111; frente y38–60; puntas de oreja (73,4)/(183,4); borde inferior de la cabeza y142; cuello/collar y140–158; cascabel (128,176) r17; cuerpo y132–242, x42–214; patas x100–156 y208–242; cola x6–52 y176–230).
**Migrar accesorios v1 → v2**: elementos de cara `y −14`; collar/cuello `y −24`; cascos y gorros `y −2` y ensanchar ±4 px; orejas (70,18)/(186,18) → (73,4)/(183,4). Las clases de animación y los tipos de ojo (`big` = rx8 ry12, `slit` = óvalo rx6 ry9.5 con pupila `M85,84 L85,100` stroke 3, `x` = dos trazos de 12 px) se anclan a los centros de ojo v2.

---

## Expansión: 20 gatos nuevos

Misma silueta y reglas que arriba; **coordenadas ya en Base v2**. Notación compacta pensada para `cats.js`:
- **base** = opciones del generador: `pattern` (stripes|scales|patches|none), ojos izq/der (normal|big|slit|x), `collar`, `bodyFill/bodyShade`, `earR` (oreja derecha propia), `earsOver`.
- **Capas**: `ground` (fija), `back`, `body`, `bodyTop`, `head`, `headTop`, `face` (bajo ojos), `faceTop` (sobre ojos), `front`. Coordenadas aproximadas en viewBox 256.
- **Idle** = anim de escena (sway|jelly|boat|zombie|float) + clases de accesorio (wing-l, flutter, spin, bob, blink, mash, hat, shield, halo, twinkle, bubble, puff, glint).

## 11. Gato Chef — `gato-chef` · Común
*Perfeccionista y goloso; lo prueba todo "por control de calidad".*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#D9C2A0` | `#B89C76` | `#FFF8EE` | `#FFB3A7` | `#1E1A22` | `#9C7B52` | `#E04B4B` |
- base: stripes · ojos normal/normal · collar off.
- `headTop` — **gorro toque**: rect `#FFFFFF` x92–164 y14–44 + 3 círculos nube (cx 100/128/156, cy 14, r 18); banda inferior y36–44 `#EDEAE4`.
- `body` — **pañuelo**: triángulo `#E04B4B` (100,148)-(156,148)-(128,172).
- `front` — **cucharón**: palo `#C99A6B` x196–204 y150–226 + cuenco elipse `#9AA3AD` (200,148) rx14 ry10; 2 volutas de vapor `#FFFFFF` op 0.7.
Idle: `jelly`; gorro `hat`; vapor `bubble`.

## 12. Gato Bombero — `gato-bombero` · Común
*Valiente y despistado; rescata gatitos… de árboles muy bajitos.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#6B4A3A` | `#4E3428` | `#F3E3D3` | `#E8A1A1` | `#1E1A22` | `#3E2A20` | `#D93A3A` |
- base: stripes · collar off · `bodyFill #E8B23A` / `bodyShade #C48F1E` (traje) · `earsOver`.
- `head` — **casco**: cúpula `M38,72 Q128,-8 218,72 Z` `#D93A3A` + ala elipse (128,72) rx104 ry9 (justo sobre los ojos) + placa círculo `#F5C542` (128,44) r13.
- `bodyTop` — **bandas reflectantes**: rects `#E9F0F5` x96–160, y196–204 y y216–224.
- `front` — **manguera**: curva stroke 10 `#2B2233` de (60,236) a (196,176), boquilla rect `#9AA3AD`; 3 gotas `#6FC7FF`.
Idle: `sway`; gotas `bubble`; placa `glint`.

## 13. Gato Fresa — `gato-fresa` · Común
*Dulce y vergonzoso; se pone aún más rojo si lo halagas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F25C6E` | `#D13E52` | `#FFF1E6` | `#FFC2CC` | `#1E1A22` | — | `#3FA34D` |
- base: none · ojos big/big · collar on (`#3FA34D`).
- `head` — **semillas**: 5 óvalos `#FFE27A` rx3 ry5 en la frente (108,50),(128,44),(148,50),(102,64),(154,64).
- `headTop` — **hojas**: 5 triángulos `#3FA34D` en estrella centrada en (128,36) + tallito rect `#3FA34D` x126–130 y14–36.
- `face` — **rubor**: óvalos `#FF8FA3` op 0.7 en (72,106) y (184,106) rx12 ry7 (sobre las manchas de mejilla).
Idle: `jelly`; hojas `hat`; rubor `blink`.

## 14. Gato Detective — `gato-detective` · Común
*Observador y dramático; siempre sospecha del perro.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#B5A48A` | `#918166` | `#F4EEE2` | `#F2B0A5` | `#1E1A22` | `#6E6250` | `#7A5A3A` |
- base: stripes · collar off · `bodyFill #C9A46A` / `bodyShade #A6834A` (gabardina).
- `headTop` — **gorro deerstalker**: cúpula `M56,58 Q128,6 200,58 Z` `#8A6A44` con 3 líneas de cuadros `#5E4630` + 2 viseras triangulares hacia (36,70) y (220,70).
- `bodyTop` — **solapas**: triángulos `#A6834A` (104,152)-(128,196) y (152,152)-(128,196).
- `front` — **lupa**: círculo (190,170) r22 stroke 6 `#7A5A3A`, relleno `#BFE6FF` op 0.4 + mango diagonal hasta (214,214).
Idle: `sway`; gorro `hat`; lupa `glint`.

## 15. Gato Pintor — `gato-pintor` · Común
*Soñador y desordenado; firma sus cuadros con la huella.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F4EDE1` | `#D8CDB8` | `#FFFFFF` | `#FFB3C6` | `#1E1A22` | `#3A3846` | `#2D9CDB` |
- base: patches · collar off.
- `headTop` — **boina**: elipse `#C0392B` (150,40) rx52 ry18 rotada −12° + rabito círculo (176,22) r4.
- `body` — **lazo**: 2 triángulos `#2D9CDB` (108,148)-(128,156)-(108,164) y espejo + nudo r6. `face` — 2 gotas de pintura `#F5C542` (194,110) r6 y `#3DBE5A` (184,120) r4.
- `front` — **paleta**: elipse `#E3C08D` (66,206) rx30 ry22 con 4 puntos (`#E04B4B`,`#F5C542`,`#3DBE5A`,`#2D9CDB`) + pincel `#7A4E2D` x196–204 y150–220, punta `#E04B4B`.
Idle: `sway`; boina `hat`; pincel `bob`.

## 16. Gato Calabaza — `gato-calabaza` · Común
*Bromista y travieso; dice "¡bu!" y se asusta él solo.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#3D3548` | `#2A2433` | `#E9E2F2` | `#F2A7B5` | `#F2C230` | — | `#F28C28` |
- base: none · ojos big/big · collar off · `bodyFill #F28C28` / `bodyShade #D06A14` (cuerpo-calabaza).
- `bodyTop` — **gajos**: 2 curvas stroke 4 `#D06A14` verticales (104 y 152, y158–234) + **cara de calabaza**: 2 triángulos y boca en zigzag `#2B2233` en y196–222.
- `headTop` — **tallo**: rect `#5E7F3A` x122–134 y20–40 + hoja curva `#3DBE5A` hacia (156,22).
- `front` — 3 estrellitas `#F2C230`.
Idle: `jelly`; hoja `hat`; cara `blink`; estrellas `twinkle`.

## 17. Gato Rockero — `gato-rockero` · Común
*Ruidoso y leal; toca el mismo acorde con muchísima pasión.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F2C094` | `#D69B68` | `#FFF4E8` | `#FFA8A0` | `#1E1A22` | `#C47A44` | `#2B2233` |
- base: stripes · collar on (`#2B2233`) + `bodyTop` 5 pinchos triangulares `#DDE3EA` sobre la curva del collar (y≈146–152).
- `headTop` — **cresta mohicana**: 5 triángulos `#E8364E` de base y40 (x100–156), puntas y4–14.
- `faceTop` — **gafas de sol**: rects redondeados `#2B2233` (68,82)-(102,102) y (154,82)-(188,102) + puente.
- `front` — **guitarra**: círculos `#E8364E` (80,206) r22 y (96,186) r16 + mástil `#7A4E2D` en diagonal hasta (200,140).
Idle: `sway`; guitarra `mash`; cresta `bob`; gafas `glint`.

## 18. Gato Panda — `gato-panda` · Común
*Tranquilo y comilón; jura que es un gato, no un oso.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#FFFFFF` | `#DCDCE0` | `#FFFFFF` | `#3A3846` | `#1E1A22` | `#2B2233` | `#6FBF4A` |
- base: patches · ojos big/big · collar on (`#6FBF4A`).
- `face` — **antifaz panda**: óvalos `#2B2233` (85,94) rx20 ry17 rot −20° y (171,94) rot 20° (bajo los ojos; solo se ve el brillo).
- `front` — **bambú**: rect `#7CC24A` x190–204 y130–232 con 3 nudos `#4E8F2C` + 2 hojas lágrima `#6FBF4A` en la punta.
Idle: `jelly`; bambú `bob`.

## 19. Gato Vampiro — `gato-vampiro` · Raro
*Elegante y noctámbulo; solo bebe zumo de tomate.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#4A4058` | `#322A3D` | `#E6E0EE` | `#C46A86` | `#D93A3A` | `#2B2233` | `#8E1B2E` |
- base: stripes · ojos slit/slit · collar off.
- `back` — **capa de cuello alto**: forma `#2B2233` (forro `#8E1B2E`) de hombros (60,150)/(196,150) a picos (24,110)/(232,110) asomando junto a la cabeza.
- `body` — **lazo** `#8E1B2E` en (128,152) + broche círculo `#F5C542` r6. `face` — 2 colmillos triangulares `#FFFFFF` bajo la boca (x118–138, y104–113).
- `front` — 2 murciélagos mini `#322A3D` en (44,60) y (214,72).
Idle: `sway`; murciélagos `flutter`; broche `glint`.

## 20. Gato Robot — `gato-robot` · Raro
*Lógico y cariñoso; dice "MIAU.EXE" al despertar.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#B9C3CF` | `#8E99A8` | `#E6ECF2` | `#3DF5C8` | `#3DF5C8` | — | `#3B6FE0` |
- base: none · ojos big/big · collar off · `bodyFill #9AA3AD` / `bodyShade #76808C` · `earR` cuadrada `M148,38 L168,4 L204,10 L212,64 Z` (pieza de repuesto).
- `head` — 4 tornillos `#76808C` r4 en (56,70),(200,70),(60,120),(196,120). `headTop` — **antena**: rect x126–130 y8–36 + bola `#FF5C5C` (128,8) r7.
- `bodyTop` — **panel**: rect redondeado `#3B6FE0` (104,186)-(152,222) con 3 LEDs (`#3DF5C8`,`#F5C542`,`#FF5C5C`).
- `front` — **engranaje** `#F5C542` (212,200) r14 con 8 dientes.
Idle: `sway`; antena y LEDs `blink`; engranaje `spin`.

## 21. Gato Sirena — `gato-sirena` · Raro
*Cantarina y presumida; colecciona conchas brillantes.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#7FCFD8` | `#55AEBB` | `#EFFBFC` | `#FFB3C6` | `#1E1A22` | `#3E9AA8` | `#F28FB5` |
- base: scales · collar off · `bodyFill #3FB8A8` / `bodyShade #2A9285` (cola de pez).
- `back` — **aleta caudal**: abanico de 2 lóbulos `#F28FB5` (borde `#D96A95`) en la punta de la cola, (40,214).
- `head` — **concha**: abanico de 5 radios `#FFD6E5` en (168,44) + perla `#FFFFFF` (168,60) r5. `body` — **collar de perlas**: 7 círculos `#FFFFFF` r5 sobre la curva del collar v2 (y140–153).
- `front` — 3 burbujas `#BFEFFF` op 0.6.
Idle: `boat`; concha `hat`; burbujas `bubble`.

## 22. Gato Navideño — `gato-navideno` · Raro
*Generoso y glotón; reparte regalos y se come las galletas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#E9CDA6` | `#C9A77D` | `#FFFFFF` | `#FFB3A7` | `#1E1A22` | `#A47B4F` | `#2F8A4A` |
- base: stripes · collar on (`#2F8A4A`, cascabel dorado).
- `headTop` — **gorro de Papá Noel**: cono `#D93A3A` base (52..200, y60) con punta caída a (222,92); ribete rect redondeado `#FFFFFF` (44,52)-(212,72); pompón `#FFFFFF` (222,96) r12.
- `ground` — **regalo**: caja `#D93A3A` (60,196)-(104,236) con cruz y lazo `#F5C542`.
- `front` — 4 copos `#FFFFFF`.
Idle: `sway`; pompón `hat`; copos `twinkle`.

## 23. Gato Conejo de Pascua — `gato-conejo` · Raro
*Saltarín e impaciente; esconde huevos y olvida dónde.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#E8D9F2` | `#C9B4DA` | `#FFFFFF` | `#FFC2D6` | `#1E1A22` | — | `#FFD36E` |
- base: none · ojos big/big · collar on (`#FFD36E`).
- `headTop` — **orejas de conejo**: diadema arco `#FFFFFF` + 2 óvalos `#FFFFFF` (interior `#FFC2D6`) cx104/152 cy28 rx12 ry26, rot −10°/+10°.
- `back` — **pompón** blanco r16 en la punta de la cola (40,214).
- `ground` — **cesta**: elipse `#C99A6B` (190,232) rx34 ry14 con 3 huevos asomando (`#9FE8FF`,`#FFB3C6`,`#FFE27A`).
Idle: `jelly`; orejas de conejo `bob`.

## 24. Gato Escarcha — `gato-escarcha` · Raro
*Frío por fuera, tierno por dentro; odia las mantas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#DDF1FA` | `#A9D4E8` | `#FFFFFF` | `#9FC9F2` | `#2F6FB8` | `#8BC1DC` | `#6FB7E8` |
- base: stripes · collar on (`#6FB7E8`).
- `headTop` — **corona de carámbanos**: 5 rombos `#BFE9FF` borde `#6FB7E8` en x88–168 (y30–50), el central hasta y4.
- `ground` — **charco helado**: elipse `#E6F7FF` (128,240) rx90 ry12 + 2 brillos blancos.
- `front` — 3 copos de 6 brazos (líneas `#FFFFFF` stroke 3) en (40,60),(220,90),(210,190).
Idle: `sway`; copos `spin`; corona `glint`.

## 25. Gato Hada — `gato-hada` · Épico
*Juguetona y curiosa; deja polvo brillante en todo lo que toca.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F7D9E8` | `#E6B3CC` | `#FFFFFF` | `#FF9EC4` | `#7B4FC9` | `#E89BBE` | `#9C6BFF` |
- base: stripes · ojos big/big · collar on (`#9C6BFF`).
- `back` — **alas de mariposa**: lóbulo grande (60,120) r34 + pequeño (70,180) r22 `#CDE8FF` op 0.75, contorno `#9C6BFF`; espejo a la derecha.
- `headTop` — **corona de flores**: 5 flores (centro `#FFE27A`, 5 pétalos `#FFFFFF`) en arco y40–50 entre orejas.
- `front` — **varita** `#F5C542` x196–206 y150–226 con estrella `#FFE27A` (204,140) + 5 chispitas `#FFFFFF`.
Idle: `float`; alas `flutter`; estrella `glint`; chispas `twinkle`.

## 26. Gato Unicornio — `gato-unicornio` · Épico
*Presumido y luminoso; cree que el arcoíris es su sombra.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F3EEFF` | `#D6CCF0` | `#FFFFFF` | `#FFB3D9` | `#5A3FA0` | — | `#FF7FB6` |
- base: none · ojos big/big · collar on (`#FF7FB6`).
- `headTop` — **cuerno**: triángulo `#F5D76E` (116,40)-(140,40)-(128,2) con 3 líneas diagonales `#D9B23A`.
- `head` — **crin arcoíris**: 4 mechones lágrima en el lado izquierdo (x52–96, y40–80): `#FF7FB6`,`#FFD36E`,`#7FE3B0`,`#7FB8FF`.
- `back` — **cola arcoíris**: 3 arcos stroke 10 (`#FF7FB6`,`#FFD36E`,`#7FB8FF`) sobre la cola. `front` — 4 estrellitas `#FFD36E`.
Idle: `sway`; crin `hat`; cuerno `glint`; estrellas `twinkle`.

## 27. Gato Rayo — `gato-rayo` · Épico
*Hiperactivo y chispeante; nunca se está quieto.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#FFE14D` | `#D9AE1C` | `#FFF8D6` | `#FF9E7A` | `#1E1A22` | `#3B4CCA` | `#3B4CCA` |
- base: stripes · collar off · `earR` en zigzag `M148,38 L168,20 L160,20 L184,2 L192,30 L200,30 L212,64 Z`.
- `headTop` — **nube de tormenta**: círculos `#6E7690` (128,20) r16, (108,26) r12, (148,26) r12.
- `bodyTop` — **rayo**: polígono `#3B4CCA` borde `#FFFFFF` (116,172)-(140,172)-(128,196)-(144,196)-(116,230)-(124,204)-(110,204).
- `front` — 3 chispas zigzag `#FFFFFF`/`#9FE8FF` en (36,120),(220,140),(214,60).
Idle: `jelly`; nube `bob`; chispas `twinkle`; rayo `glint`.

## 28. Gato Brasa — `gato-brasa` · Épico
*Temperamental y cálido; cuando se enfada se le encienden las orejas.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#3A2F2F` | `#241C1C` | `#FFD9A6` | `#FF7A2E` | `#FFB52E` | `#FF6A1F` | `#FF6A1F` |
- base: stripes (grietas de lava) · ojos slit/slit · collar off.
- `headTop` — **llama**: 3 lenguas de fuego `#FF6A1F` (interior `#FFD23F`) centradas en (128,36) hasta y0 + 2 llamitas en las puntas de oreja (73,6) y (183,6).
- `front` — 4 ascuas `#FFB52E` r3–5 + nube de humo `#6E6470` op 0.5 sobre la llama.
Idle: `sway`; llama central `bob`; llamitas de oreja `blink`; ascuas `bubble`; humo `puff`.

## 29. Gato Fénix — `gato-fenix` · Legendario
*Majestuoso y optimista; renace de cada siesta más brillante.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F2763A` | `#D2541E` | `#FFE3A3` | `#FFC15E` | `#E0A21B` | `#C23E1A` | `#F5C542` |
- base: stripes · ojos big/big · collar off.
- `back` — **alas de plumas de fuego**: 4 plumas lágrima `#F2763A` con puntas `#FFD23F` desde el hombro (64,160) hasta (8,70); espejo a la derecha. **Cola**: 3 plumas largas `#FFD23F` con "ojo" `#C23E1A` saliendo abajo-izquierda.
- `headTop` — **cresta**: 3 plumas `#FFD23F` en abanico desde (128,36) hasta y2. `body` — **torque**: arco `#F5C542` por la curva del collar v2 con gema `#E8364E` r9 en (128,160) (sustituye collar y cascabel).
- `front` — chispas legendarias `#F5B83D`.
Idle: `float`; alas `wing-l` (y espejo); cresta `hat`; gema `glint`; chispas `twinkle` + `bubble`.

## 30. Gato Kitsune — `gato-kitsune` · Legendario
*Astuta y misteriosa; hace malabares con fuegos fatuos.*

| Pelaje | Sombra | Barriga/hocico | Oreja int. | Ojo | Patrón | Acento |
|---|---|---|---|---|---|---|
| `#F5F0E8` | `#DCD3C4` | `#FFFFFF` | `#F2A7B5` | `#C9971C` | `#D93A3A` | `#D93A3A` |
- base: stripes (marcas rojas) · ojos slit/slit · collar off.
- `back` — **3 colas de zorro**: lágrimas grandes `#F5F0E8` con punta `#D93A3A`, puntas en (24,150), (232,150) y (30,226).
- `head` — **marcas**: 2 trazos curvos `#D93A3A` bajo los ojos (x66–82 y x174–190, y108) + punto frontal (128,62) r4. `body` — **shimenawa**: cuerda trenzada `#F2EBD9` por la curva del collar v2 (y140–158) con 2 tiras zigzag `#FFFFFF` (sustituye collar).
- `front` — 3 fuegos fatuos: lágrimas `#7FD8FF` op 0.8 con núcleo `#FFFFFF` en (40,80), (216,70), (200,200).
Idle: `float`; colas laterales `wing-l` (y espejo); fuegos `bob` + `twinkle`; marca frontal `glint`.

---

## Resumen

| # | id | Nombre | Rareza |
|---|----|--------|--------|
| 1 | `gato-sushi` | Gato Sushi | Común |
| 2 | `gato-ninja` | Gato Ninja | Común |
| 3 | `gato-gamer` | Gato Gamer | Común |
| 4 | `gato-zombi` | Gato Zombi | Raro |
| 5 | `gato-pirata` | Gato Pirata | Raro |
| 6 | `gato-astronauta` | Gato Astronauta | Raro |
| 7 | `gato-caballero` | Gato Caballero | Épico |
| 8 | `gato-mago` | Gato Mago | Épico |
| 9 | `gato-dragon` | Gato Dragón | Legendario |
| 10 | `gato-angel` | Gato Ángel | Legendario |
| 11 | `gato-chef` | Gato Chef | Común |
| 12 | `gato-bombero` | Gato Bombero | Común |
| 13 | `gato-fresa` | Gato Fresa | Común |
| 14 | `gato-detective` | Gato Detective | Común |
| 15 | `gato-pintor` | Gato Pintor | Común |
| 16 | `gato-calabaza` | Gato Calabaza | Común |
| 17 | `gato-rockero` | Gato Rockero | Común |
| 18 | `gato-panda` | Gato Panda | Común |
| 19 | `gato-vampiro` | Gato Vampiro | Raro |
| 20 | `gato-robot` | Gato Robot | Raro |
| 21 | `gato-sirena` | Gato Sirena | Raro |
| 22 | `gato-navideno` | Gato Navideño | Raro |
| 23 | `gato-conejo` | Gato Conejo de Pascua | Raro |
| 24 | `gato-escarcha` | Gato Escarcha | Raro |
| 25 | `gato-hada` | Gato Hada | Épico |
| 26 | `gato-unicornio` | Gato Unicornio | Épico |
| 27 | `gato-rayo` | Gato Rayo | Épico |
| 28 | `gato-brasa` | Gato Brasa | Épico |
| 29 | `gato-fenix` | Gato Fénix | Legendario |
| 30 | `gato-kitsune` | Gato Kitsune | Legendario |

**Nomenclatura de assets**: `char_<id>_<variante>_<tamaño>.svg`, p. ej. `char_gato-dragon_idle_256.svg`.
