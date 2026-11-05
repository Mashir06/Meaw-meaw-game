# Meaw Meaw — Gacha (máquina de cápsulas) v1

Tiradas en una máquina **gashapon** japonesa. Modos **x1** y **x10**. Por ahora **todas las tiradas son gratis** (sin moneda).
Fuente del catálogo: `docs/art/cat-designs.md` (tabla *Resumen*): **30 gatos** — Común 11, Raro 9, Épico 6, Legendario 4.

## Pilares de la experiencia

1. **Ritual físico**: girar la manivela, la máquina tiembla, cae la cápsula. Se siente como un gashapon real, no como un menú.
2. **Anticipación corta**: la emoción está en los 2–3 s antes del gato, nunca en esperar. x1 ≈ 3 s, x10 ≈ 6 s, siempre saltable.
3. **Cada gato es una celebración**: aunque sea Común o repetido, el gato aparece con un "pop" adorable. La rareza añade efecto, no quita alegría.
4. **Coleccionar se ve**: las siluetas vacías de la colección dicen "te falto yo".

## Probabilidades

| Rareza | Prob. rareza | Gatos | Prob. por gato |
|---|---|---|---|
| Común | 55 % | 11 | 5,00 % |
| Raro | 30 % | 9 | 3,33 % |
| Épico | 12 % | 6 | 2,00 % |
| Legendario | 3 % | 4 | 0,75 % |

- **Ajuste respecto a 60/28/10/2**: con 4 Legendarios, 2 % daba 0,5 % por gato (~420 tiradas de media para completar los 4). Como las tiradas son gratis, el objetivo es que completar sea alcanzable (~280 tiradas) y que la probabilidad *por gato* baje de forma escalonada y estricta (5 → 3,3 → 2 → 0,75 %). Cuando haya moneda se revisará.
- **Dentro de una rareza: uniforme** (se elige rareza y luego un gato al azar de esa rareza).
- `Math.random()` es suficiente (no hay economía real que proteger).

## Garantías

- **x10**: al menos **un Raro o mejor**. Si las 10 cápsulas salen Común, la **10.ª** se vuelve a tirar en la tabla Raro+ (Raro 30 : Épico 12 : Legendario 3, normalizado = 66,7 / 26,7 / 6,6 %).
- **Pity (lástima)**: contador de tiradas sin Legendario, compartido entre x1 y x10. Si llega a **80**, la tirada 80 es **Legendario seguro**. Se reinicia a 0 al obtener cualquier Legendario (por suerte o por pity). Con 3 % la media es ~33 tiradas; el pity solo protege la mala racha (~9 % de los jugadores lo verían).
- Orden en x10: se resuelven las 10 tiradas en secuencia aplicando el pity a cada una; la garantía Raro+ se aplica al final sobre la 10.ª.
- **Mostrar las probabilidades** en un botón "ⓘ" junto a la máquina (transparencia, sobre todo con público infantil).

## Duplicados (por ahora)

- Solo se **cuentan copias** (`copias[id]++`). Sin conversión, sin subir nivel.
- En el resultado, un repetido muestra "x2", "x3"…; uno nuevo muestra la insignia **NUEVO**.

## Cápsulas

- Color de la cápsula = color de marco de la rareza: Común `#B8C2CC`, Raro `#4FA3F7`, Épico `#A65BF2`, Legendario `#F5B83D`.
- Mitad superior transparente (se intuye una bolita de papel, nunca el gato), mitad inferior del color de rareza.
- **Sí insinúa la rareza antes de abrir**: el momento "¡ha caído una dorada!" es la mejor anticipación del x10 y es fácil de leer para niños. El *qué gato* sigue siendo sorpresa.
- Épico y Legendario brillan un poco al caer (destello en el rebote); Común y Raro no.

## Animación (beats y duraciones objetivo)

**x1** (total ≈ 3 s sin Legendario)

| Beat | Duración | Detalle |
|---|---|---|
| Girar manivela | 0,8 s | 1 vuelta (360°), 4 "clics" con micro-pausas |
| Máquina tiembla | 0,4 s | sacudida ±3°/±4 px, la cúpula de cápsulas se agita |
| Caída y rebote | 0,6 s | cae por la boca de salida, 2 rebotes (alto 40 % → 15 %) |
| Pausa | 0,2 s | la cápsula queda quieta, se puede tocar para abrir |
| Cápsula se abre | 0,4 s | tambaleo 0,15 s + las mitades se separan 0,25 s |
| Aparece el gato | 0,4 s | escala 0 → 1,1 → 1 (rebote), sobre el marco de rareza |
| Efecto de rareza | 0 / 0,3 / 0,6 / 1,2 s | Común: nada · Raro: brillo de borde · Épico: shine diagonal · Legendario: destello de pantalla + rayos + partículas doradas |

Tras el gato: tarjeta con nombre, rareza, "NUEVO" o "xN", botones **Otra vez** y **Colección**.

**x10** (total ≈ 6 s sin Legendario)

1. Manivela 0,8 s (una sola vuelta, más rápida y con más clics) + temblor 0,5 s (más fuerte).
2. **Caídas escalonadas**: 10 cápsulas, una cada **0,15 s**, cada una con caída y rebote de 0,6 s (≈ 2 s en total). Se amontonan en la bandeja.
3. Las 10 cápsulas se colocan en cuadrícula 5×2 (0,4 s).
4. **Revelado de todas**: se abren en orden de **rareza ascendente** (lo mejor al final), una cada **0,25 s**. Si sale Épico/Legendario, pausa extra de 0,6 s / 1,2 s para su efecto.
5. Pantalla resumen con las 10 tarjetas (NUEVO / xN).

**Saltar**: botón visible desde el inicio de la tirada (x1 y x10). Lleva directo al resultado/resumen. Las tiradas ya están resueltas antes de animar, así que saltar no cambia nada.
**Accesibilidad**: con `prefers-reduced-motion`, sin temblor ni partículas ni destellos; las cápsulas aparecen y se abren con fundido de 0,2 s.

## Pantalla de colección

- Cuadrícula de los 30 gatos en orden de `#` del catálogo; contador arriba: **"12 / 30"**.
- **Obtenido**: gato a color con su marco de rareza (y efecto de rareza del arte) + contador de copias "x3" en la esquina.
- **No obtenido**: silueta del gato rellena de `#2B2233` al 25 % de opacidad, marco de rareza visible (se sabe qué rareza falta), nombre "???".
- **NUEVO**: insignia en gatos obtenidos por primera vez y aún no vistos en la colección; desaparece al tocar el gato (abrir su ficha).
- Filtro opcional por rareza: fuera de alcance v1.

## Persistencia mínima

`localStorage` con `{ copias: {id: n}, pity: n, vistos: [id] }`. Si falla o está vacío, se empieza de cero.

## Fuera de alcance (por ahora)

Moneda/coste de tiradas · banners o gatos destacados (rate-up) · conversión de duplicados / niveles · pity de Épico · historial de tiradas · animación de "subida" de color de cápsula · sonido (pendiente de doc de audio) · cuentas/servidor.

## Valores para implementación

| Constante | Valor |
|---|---|
| `RATE_COMUN` | 0.55 |
| `RATE_RARO` | 0.30 |
| `RATE_EPICO` | 0.12 |
| `RATE_LEGENDARIO` | 0.03 |
| `PULL_COST` | 0 (gratis) |
| `MULTI_PULL_COUNT` | 10 |
| `MULTI_GUARANTEE_MIN_RARITY` | Raro (aplicado a la cápsula 10) |
| `PITY_LEGENDARIO` | 80 (la tirada 80 sin Legendario es Legendario) |
| `CAPSULE_COLOR` | Común `#B8C2CC` · Raro `#4FA3F7` · Épico `#A65BF2` · Legendario `#F5B83D` |
| `T_CRANK` | 800 ms |
| `T_SHAKE` / `T_SHAKE_X10` | 400 ms / 500 ms |
| `T_DROP` | 600 ms (2 rebotes: 40 %, 15 %) |
| `T_DROP_STAGGER_X10` | 150 ms |
| `T_IDLE_BEFORE_OPEN` | 200 ms |
| `T_OPEN` | 400 ms |
| `T_CAT_POP` | 400 ms (escala 0 → 1.1 → 1) |
| `T_RARITY_FX` | Común 0 · Raro 300 · Épico 600 · Legendario 1200 ms |
| `T_GRID_LAYOUT_X10` | 400 ms |
| `T_REVEAL_STAGGER_X10` | 250 ms (orden de rareza ascendente) |
| `T_REDUCED_MOTION_FADE` | 200 ms |
| `SILHOUETTE` | `#2B2233` al 25 % |
| `STORAGE_KEY` | `meawmeaw.gacha.v1` |
