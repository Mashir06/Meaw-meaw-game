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

**Nomenclatura de assets**: `char_<id>_<variante>_<tamaño>.svg`, p. ej. `char_gato-dragon_idle_256.svg`.
