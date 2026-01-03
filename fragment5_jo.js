/* * gemini_fragment5_impl_v10.js - JAVÍTOTT (Clipping Fix + Export Fix) 
 */

let elements = [];
let selectedElementId = null;
let dragElement = null;
let startX, startY, startElX, startElY;

// DOM elemek
// let designerSVG, textLayer, mapLayer, transformGroup;
let canvasContainer, styleControls, textList;
// --- TERVEZŐ HÁTTÉR TÉMÁK (DESIGNER THEMES) ---
// const designerThemes = {
//     "midnight": { mapTheme: "midnight", name: "Midnight Blue", background: "linear-gradient(135deg, #0B1026 0%, #1a2542 100%)", textColor: "#ffffff" },
//     "minimal":  { mapTheme: "minimal", name: "Clean White", background: "#ffffff", textColor: "#000000" },
//     "vintage":  { mapTheme: "vintage", name: "Vintage Paper", background: "#f0e6d2",  textColor: "#4a3b2a" },
//     // "cosmic":   { mapTheme: "cosmic", name: "Cosmic Love", background: "linear-gradient(135deg, #2d0a1e 0%, #4a1230 100%)",  textColor: "#ffb7c5" },
//     "cosmic":   { mapTheme: "cosmic", name: "Cosmic Love", background: "linear-gradient(135deg, #2d0a1e 0%, #4a1230 100%)",  textColor: "#ffb7c5" },
//     "forest":   { mapTheme: "forest", name: "Forest Night", background: "#0a220a",  textColor: "#e8f5e9" },
//     "monochrome":   { mapTheme: "monochrome", name: "Mono Charcoal", background: "#222222",  textColor: "#ffffff" },
//     "golden":   { mapTheme: "golden", name: "Golden Hour", background: "#4a2511",  textColor: "#ffcc00" },
//     "ocean":    { mapTheme: "ocean", name: "Deep Ocean", background: "linear-gradient(to bottom, #001f3f 0%, #003366 100%)",  textColor: "#7FDBFF" },
//     "matrix":   { mapTheme: "matrix", name: "Cyber Matrix", background: "#000000",  textColor: "#00ff00" },
//     "aurora":   { mapTheme: "aurora", name: "Northern Lights", background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)",  textColor: "#6ee7b7" },
//     "royal":    { mapTheme: "royal", name: "Royal Amethyst", background: "linear-gradient(135deg, #240046 0%, #3c096c 100%)",  textColor: "#ff9e00" },
//     "sweetheart": { mapTheme: "sweetheart", name: "Sweetheart", background: "linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 100%)",  textColor: "#ff1493" },
//     "redvelvet":    { mapTheme: "redvelvet", name: "Red Velvet", background: "linear-gradient(135deg, #4a0404 0%, #6d0707 100%)",  textColor: "#ffd700" },
//     "rosegold":     { mapTheme: "rosegold", name: "Rose Gold", background: "#fff0f5",  textColor: "#b76e79" },
// };
// --- TERVEZŐ HÁTTÉR TÉMÁK (BŐVÍTETT) ---
// Ez köti össze a térkép stílust (mapTheme) a háttérrel (background)
// const designerThemes = {
//     "midnight": { mapTheme: "midnight", name: "Midnight Blue", background: "linear-gradient(135deg, #0B1026 0%, #1a2542 100%)", textColor: "#ffffff" },
//     "minimal":  { mapTheme: "minimal",  name: "Clean White",   background: "#ffffff", textColor: "#000000" },
//     "vintage":  { mapTheme: "vintage",  name: "Vintage Paper", background: "#f0e6d2", textColor: "#4a3b2a" },
//     "cosmic":   { mapTheme: "cosmic",   name: "Cosmic Love",   background: "linear-gradient(135deg, #2d0a1e 0%, #4a1230 100%)", textColor: "#ffb7c5" },
//     "ocean":    { mapTheme: "ocean",    name: "Deep Ocean",    background: "linear-gradient(to bottom, #001f3f 0%, #003366 100%)", textColor: "#7FDBFF" },
//     "matrix":   { mapTheme: "matrix",   name: "Cyber Matrix",  background: "#000000", textColor: "#00ff00" },
//     "aurora":   { mapTheme: "aurora",   name: "Northern Lights", background: "linear-gradient(135deg, #022c22 0%, #064e3b 100%)", textColor: "#6ee7b7" },
//     "royal":    { mapTheme: "royal",    name: "Royal Amethyst", background: "linear-gradient(135deg, #240046 0%, #3c096c 100%)", textColor: "#ff9e00" },
//     "sweetheart": { mapTheme: "sweetheart", name: "Sweetheart", background: "linear-gradient(135deg, #ffe4e1 0%, #ffc0cb 100%)", textColor: "#ff1493" },
//     "redvelvet":  { mapTheme: "redvelvet",  name: "Red Velvet", background: "linear-gradient(135deg, #4a0404 0%, #6d0707 100%)", textColor: "#ffd700" },
//     "rosegold":   { mapTheme: "rosegold",   name: "Rose Gold",  background: "#fff0f5", textColor: "#b76e79" },
//     "monochrome": { mapTheme: "monochrome", name: "Mono Charcoal", background: "#222222", textColor: "#ffffff" },
//     "forest":     { mapTheme: "forest",     name: "Forest Night",  background: "#0a220a", textColor: "#e8f5e9" },
//     "golden":     { mapTheme: "golden",     name: "Golden Hour",   background: "#4a2511", textColor: "#ffcc00" }
// };

// function getDOMElements() {
//         console.log("getDOMElements");
//     designerSVG = document.getElementById('designer-svg');
//     // designerSVG = document.getElementById('text-overlay-svg');
//     transformGroup = document.getElementById('map-transform-group'); // EZT MOZGATJUK
//     mapLayer = document.getElementById('celestial-map-layer');
//     textLayer = document.getElementById('text-layer');
//     textList = document.getElementById('text-list');
//     styleControls = document.getElementById('style-controls');
//         console.log("getDOMElements designerSVG", designerSVG);
//         console.log("getDOMElements transformGroup", transformGroup);
//         console.log("getDOMElements mapLayer", mapLayer);
//         console.log("getDOMElements textLayer", textLayer);
//         console.log("getDOMElements textList", textList);
//         console.log("getDOMElements styleControls", styleControls);
//         // A getDOMElements vagy init függvényben:
//     let bgRect = document.getElementById('designer-background-rect');
//     if (!bgRect && designerSVG) {
//         bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//         bgRect.setAttribute('id', 'designer-background-rect');
//         bgRect.setAttribute('width', '100%');
//         bgRect.setAttribute('height', '100%');
//         bgRect.setAttribute('fill', '#ffffff'); // Alapértelmezett fehér
//         // A legelső elem legyen, hogy minden más mögött legyen
//         designerSVG.insertBefore(bgRect, designerSVG.firstChild);
//     }
    
//     // Ha bármelyik hiányzik, false
//     return !!(designerSVG && transformGroup && mapLayer && textLayer);
// }
// // --- JAVÍTOTT DOM KEZELÉS ---
// function getDOMElements() {
//     designerSVG = document.getElementById('designer-svg');
//     transformGroup = document.getElementById('map-transform-group');
//     mapLayer = document.getElementById('celestial-map-layer');
//     textLayer = document.getElementById('text-layer');
//     textList = document.getElementById('text-list');
//     styleControls = document.getElementById('style-controls');

//     // Háttér téglalap ellenőrzése és létrehozása
//     // Ez felelős a háttérszínért exportáláskor és megjelenítéskor is
//     if (designerSVG) {
//         let bgRect = document.getElementById('designer-background-rect');
//         if (!bgRect) {
//             bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//             bgRect.setAttribute('id', 'designer-background-rect');
//             // Fontos: a viewBox méreteihez igazodjon, ne 100%-hoz, hogy exportnál is jó legyen
//             // De kezdetnek a 100% is jó, az exportCanvas majd korrigálja
//             bgRect.setAttribute('width', '100%');
//             bgRect.setAttribute('height', '100%');
//             bgRect.setAttribute('x', '0');
//             bgRect.setAttribute('y', '0');
//             bgRect.setAttribute('fill', '#0a0e27'); // Alapértelmezett szín
            
//             // Legelső elemnek szúrjuk be
//             if(designerSVG.firstChild) {
//                 designerSVG.insertBefore(bgRect, designerSVG.firstChild);
//             } else {
//                 designerSVG.appendChild(bgRect);
//             }
//         }
//     }
    
//     return !!(designerSVG && transformGroup && mapLayer && textLayer);
// }

// // Globális állapot a layouthoz
// let layoutState = {
//     mode: 'single', // 'single', 'split-left', 'split-right'
//     photoURL: null
// };

// // --- DOM ELEMEK LEKÉRÉSE (Bővítve a photo-layerrel) ---
// function getDOMElements() {
//     designerSVG = document.getElementById('designer-svg');
//     transformGroup = document.getElementById('map-transform-group');
//     mapLayer = document.getElementById('celestial-map-layer');
//     textLayer = document.getElementById('text-layer');
    
//     // Háttér rect ellenőrzése (exportáláshoz)
//     if (designerSVG) {
//         let bgRect = document.getElementById('designer-background-rect');
//         if (!bgRect) {
//             bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//             bgRect.setAttribute('id', 'designer-background-rect');
//             bgRect.setAttribute('width', '100%');
//             bgRect.setAttribute('height', '100%');
//             bgRect.setAttribute('x', '0');
//             bgRect.setAttribute('y', '0');
//             bgRect.setAttribute('fill', '#0a0e27');
//             if(designerSVG.firstChild) designerSVG.insertBefore(bgRect, designerSVG.firstChild);
//             else designerSVG.appendChild(bgRect);
//         }
//     }
//     return !!(designerSVG && transformGroup && mapLayer);
// }
// --- DOM ELEMEK ---
let designerSVG, transformGroup, mapLayer, textLayer;

function getDOMElements() {
    designerSVG = document.getElementById('designer-svg');
    transformGroup = document.getElementById('map-transform-group');
    mapLayer = document.getElementById('celestial-map-layer');
    textLayer = document.getElementById('text-layer');
    return !!(designerSVG && transformGroup && mapLayer);
}
// // --- IGAZÍTÁS JAVÍTÁSA (Transform alapú) ---
// window.alignCelestialMap = function(position) {
//     if (!getDOMElements()) return;
//         console.log("alignCelestialMap");
//         console.log("alignCelestialMap position", position);
//         myCelestialConf.alignCelestialMap = position;
//         console.log("alignCelestialMap myCelestialConf", myCelestialConf);
//     // 1. Keressük meg a beillesztett térképet
//     const mapSvg = mapLayer.querySelector('svg');
//         console.log("mapLayer", mapLayer);
//     if (!mapSvg) return;
//         console.log("mapSvg", mapSvg);

//     // 2. Méretek lekérése
//     // A Papír mérete (ViewBox alapján)
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW = paperVB[2];
//     const paperH = paperVB[3];

//     // A Térkép eredeti mérete
//     // Először attribútumból, ha nincs, viewBox-ból
//     let mapW = parseFloat(mapSvg.getAttribute('width'));
//     let mapH = parseFloat(mapSvg.getAttribute('height'));
//     if (!mapW || isNaN(mapW)) {
//          const mapVB = mapSvg.getAttribute('viewBox').split(' ').map(Number);
//          mapW = mapVB[2];
//          mapH = mapVB[3];
//     }

//     // 3. SKÁLÁZÁS kiszámítása
//     // Azt akarjuk, hogy a térkép kitöltse a papír szélességének 90%-át
//     // VAGY a magasságának 80%-át (hogy maradjon hely szövegnek)
//     const scaleX = (paperW * 0.95) / mapW;
//     const scaleY = (paperH * 0.70) / mapH;
    
//     // A kisebb skálát választjuk, hogy biztosan kiférjen
//     const scale = Math.min(scaleX, scaleY);

//     // A skálázott méretek
//     const finalW = mapW * scale;
//     const finalH = mapH * scale;

//     // 4. POZÍCIÓ számítása (Középre igazításhoz)
//     // Ez az eltolás a papír bal felső sarkától
//     let transX = (paperW - finalW) / 2;
//     let transY = 0;

//     const padding = paperH * 0.05; // 5% margó

//     if (position === 'center') {
//         transY = (paperH - finalH) / 2;
//     } else if (position === 'top') {
//         transY = padding;
//     } else if (position === 'bottom') {
//         transY = paperH - finalH - padding;
//     }

//     // 5. MÁGIKUS LÉPÉS: Transform string összeállítása
//     // Először eltoljuk a helyére, aztán skálázzuk
//     // Fontos a sorrend és hogy a skálázás a 0,0 ponthoz képest történik
//     const transformString = `translate(${transX}, ${transY}) scale(${scale})`;

//     // Alkalmazzuk a CSOPORTRA, nem az SVG-re!
//     transformGroup.setAttribute('transform', transformString);

//     console.log(`Térkép igazítva: ${position}, Scale: ${scale.toFixed(3)}, Pos: ${transX}, ${transY}`);
// }

// // --- IGAZÍTÁS JAVÍTÁSA (BBox alapú - Pontos illesztés a szív alakhoz) ---
// window.alignCelestialMap = function(position) {
//     if (!getDOMElements()) return;
//     // alert("EE")
//     // Elmentjük a beállítást, hogy átméretezéskor megmaradjon
//     if(typeof myCelestialConf !== 'undefined') {
//         myCelestialConf.alignCelestialMap = position;
//     }

//     // 1. Keressük meg a beillesztett térképet
//     const mapSvg = mapLayer.querySelector('svg');
//     if (!mapSvg) return;

//     // 2. Papír mérete (ViewBox alapján)
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW = paperVB[2];
//     const paperH = paperVB[3];

//     // 3. A TARTALOM VALÓS MÉRETENEK MÉRÉSE (getBBox)
//     // Ez a kulcs: nem az SVG szélességét nézzük, hanem azt, hogy hol van a rajz benne.
//     let bbox = { x: 0, y: 0, width: 0, height: 0 };
    
//     try {
//         // Megpróbáljuk a 'background' réteget mérni, mert az általában a teljes vetületet fedi (pl. a szív alakot)
//         const bgGroup = mapSvg.querySelector('g#background');
//         if (bgGroup) {
//             bbox = bgGroup.getBBox();
//         } else {
//             // Ha nincs background, megpróbáljuk az egész SVG tartalmát mérni egy trükkel:
//             // Végigmegyünk a fő csoportokon és egyesítjük a dobozaikat
//             let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
//             const groups = mapSvg.querySelectorAll('g');
//             let found = false;
            
//             groups.forEach(g => {
//                 try {
//                     const b = g.getBBox();
//                     if (b.width > 0 && b.height > 0) {
//                         minX = Math.min(minX, b.x);
//                         minY = Math.min(minY, b.y);
//                         maxX = Math.max(maxX, b.x + b.width);
//                         maxY = Math.max(maxY, b.y + b.height);
//                         found = true;
//                     }
//                 } catch(e) {}
//             });
            
//             if (found) {
//                 bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
//             } else {
//                 // Végső fallback: ha nem sikerül mérni (pl. üres), marad a régi módszer
//                 bbox = { 
//                     x: 0, y: 0, 
//                     width: parseFloat(mapSvg.getAttribute('width')) || 1000, 
//                     height: parseFloat(mapSvg.getAttribute('height')) || 1000 
//                 };
//             }
//         }
//     } catch (e) {
//         console.warn("Hiba a BBox mérésekor:", e);
//         return;
//     }

//     const contentW = bbox.width;
//     const contentH = bbox.height;
//     const contentX = bbox.x;
//     const contentY = bbox.y;

//     // 4. SKÁLÁZÁS kiszámítása
//     // A tartalom töltse ki a papír szélességének 95%-át vagy magasságának 70%-át
//     const scaleX = (paperW * 0.95) / contentW;
//     const scaleY = (paperH * 0.70) / contentH;
//     const scale = Math.min(scaleX, scaleY);

//     // 5. POZÍCIÓ számítása (Transform logic)
//     // A cél az, hogy a tartalom (bbox) közepe/teteje/alja kerüljön a megfelelő helyre.
    
//     const paperCenterX = paperW / 2;
//     const paperCenterY = paperH / 2;
//     const padding = paperH * 0.05; // 5% margó

//     let transX = 0;
//     let transY = 0;

//     // Vízszintesen mindig középre igazítjuk a tartalmat
//     // Képlet: (PapírKözép) - (TartalomKözép * Scale) - (TartalomKezdőX * Scale) helyett:
//     // Egyszerűbben: Eltoljuk, hogy a bbox bal széle a 0-n legyen (-contentX), 
//     // aztán skálázzuk, aztán eltoljuk a papír közepére, mínusz a skálázott szélesség fele.
//     // Végső képlet a transformhoz:
//     transX = paperCenterX - (contentX + contentW / 2) * scale;

//     if (position === 'center') {
//         // Függőlegesen középre
//         transY = paperCenterY - (contentY + contentH / 2) * scale;
//     } else if (position === 'top') {
//         // Fentre: A tartalom teteje (contentY) legyen a paddingnál
//         // transY + (contentY * scale) = padding
//         transY = padding - (contentY * scale);
//     } else if (position === 'bottom') {
//         // Lentre: A tartalom alja (contentY + contentH) legyen a (paperH - padding)-nál
//         transY = (paperH - padding) - (contentY + contentH) * scale;
//     }

//     // 6. Alkalmazás
//     const transformString = `translate(${transX}, ${transY}) scale(${scale})`;
//     transformGroup.setAttribute('transform', transformString);

//     console.log(`Igazítás (${position}): BBox[${contentX.toFixed(0)},${contentY.toFixed(0)},${contentW.toFixed(0)},${contentH.toFixed(0)}] -> Trans[${transX.toFixed(0)},${transY.toFixed(0)}] Scale[${scale.toFixed(3)}]`);
// }

// // Globális változó a felhasználói skálázás tárolására (alapértelmezett: 100%)
// let currentUserMapScale = 1.0;

// // --- ÚJ FÜGGVÉNY: A csúszka eseménykezelője ---
// window.updateMapScale = function(val) {
//     // 1. Érték frissítése és kiírása
//     currentUserMapScale = parseInt(val) / 100;
//     const displayEl = document.getElementById('map-scale-value');
//     if(displayEl) displayEl.textContent = val + '%';

//     // 2. Újraigazítás a jelenlegi pozíció megtartásával
//     // Ha még nincs mentett pozíció, alapértelmezett a 'center'
//     const currentPos = (typeof myCelestialConf !== 'undefined' && myCelestialConf.alignCelestialMap) 
//                        ? myCelestialConf.alignCelestialMap 
//                        : 'center';
    
//     window.alignCelestialMap(currentPos);
// }

// // --- IGAZÍTÁS ÉS MÉRETEZÉS (BBox + Vászon növelés) ---
// window.alignCelestialMap = function(position) {
//     if (!getDOMElements()) return;
    
//     // Elmentjük a beállítást
//     if(typeof myCelestialConf !== 'undefined') {
//         myCelestialConf.alignCelestialMap = position;
//     }

//     // 1. Térkép keresése
//     const mapSvg = mapLayer.querySelector('svg');
//     if (!mapSvg) return;

//     // 2. Papír (Vászon) jelenlegi méretei
//     let paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     let paperW = paperVB[2];
//     let paperH = paperVB[3];

//     // 3. Térkép tartalom mérése (BBox)
//     let bbox = { x: 0, y: 0, width: 0, height: 0 };
//     try {
//         const bgGroup = mapSvg.querySelector('g#background');
//         if (bgGroup) {
//             bbox = bgGroup.getBBox();
//         } else {
//             // Fallback mérés, ha nincs background réteg
//             let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
//             const groups = mapSvg.querySelectorAll('g');
//             let found = false;
//             groups.forEach(g => {
//                 try {
//                     const b = g.getBBox();
//                     if (b.width > 0 && b.height > 0) {
//                         minX = Math.min(minX, b.x);
//                         minY = Math.min(minY, b.y);
//                         maxX = Math.max(maxX, b.x + b.width);
//                         maxY = Math.max(maxY, b.y + b.height);
//                         found = true;
//                     }
//                 } catch(e) {}
//             });
//             if (found) {
//                 bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
//             } else {
//                 bbox = { 
//                     x: 0, y: 0, 
//                     width: parseFloat(mapSvg.getAttribute('width')) || 1000, 
//                     height: parseFloat(mapSvg.getAttribute('height')) || 1000 
//                 };
//             }
//         }
//     } catch (e) {
//         console.warn("Hiba a BBox mérésekor:", e);
//         return;
//     }

//     const contentW = bbox.width;
//     const contentH = bbox.height;
//     const contentX = bbox.x;
//     const contentY = bbox.y;

//     // 4. SKÁLA SZÁMÍTÁSA
//     // a) Kiszámoljuk az "alap" skálát, ami kényelmesen ráfér (95% szélesség VAGY 70% magasság)
//     //    Fontos: Itt az EREDETI (vagy aktuális) papírméretet vesszük alapul a "100%"-hoz.
//     const baseFitScaleX = (paperW * 0.95) / contentW;
//     const baseFitScaleY = (paperH * 0.70) / contentH;
//     const baseScale = Math.min(baseFitScaleX, baseFitScaleY);

//     // b) Alkalmazzuk a felhasználói szorzót (Slider)
//     const finalScale = baseScale * currentUserMapScale;

//     // 5. VÁSZON AUTOMATIKUS NÖVELÉSE (Ha a térkép kilógna)
//     // Kiszámoljuk a térkép új, transzformált méreteit
//     const newMapWidth = contentW * finalScale;
//     const newMapHeight = contentH * finalScale;

//     // Margó (pl. 2.5% oldalanként)
//     const margin = paperW * 0.05; 

//     // Ellenőrizzük, kell-e növelni a vásznat
//     let needResize = false;
//     let newPaperW = paperW;
//     let newPaperH = paperH;

//     // Ha a térkép szélesebb mint a papír (mínusz margó)
//     if (newMapWidth > (paperW - margin)) {
//         newPaperW = newMapWidth + margin; // Növeljük meg a papírt a térkép méretére + margó
//         needResize = true;
//     }
    
//     // Ha a térkép magasabb mint a papír (itt megengedőbbek vagyunk, pl. 5% margó)
//     if (newMapHeight > (paperH - margin)) {
//         // Csak akkor növeljük a magasságot, ha tényleg kilóg, 
//         // de mivel az arányt tartani kell, a szélesség dominál általában.
//         // Itt egyszerűen megnézzük, hogy melyik növekmény a drasztikusabb.
//         const requiredHeight = newMapHeight + margin;
//         if (requiredHeight > newPaperH) {
//              newPaperH = requiredHeight;
//              needResize = true;
//         }
//     }

//     if (needResize) {
//         // ARÁNY TARTÁSA:
//         // Ha növeltük az egyik dimenziót, a másikat is növelni kell, 
//         // hogy a vászon oldalaránya (aspect ratio) ne torzuljon.
//         const originalRatio = paperW / paperH;
//         const newRatio = newPaperW / newPaperH;

//         if (newRatio > originalRatio) {
//             // A szélesség nőtt jobban -> igazítsuk hozzá a magasságot
//             newPaperH = newPaperW / originalRatio;
//         } else {
//             // A magasság nőtt jobban -> igazítsuk hozzá a szélességet
//             newPaperW = newPaperH * originalRatio;
//         }

//         // Frissítjük a DOM változókat
//         paperW = newPaperW;
//         paperH = newPaperH;

//         // Frissítjük az SVG ViewBox-ot
//         designerSVG.setAttribute('viewBox', `0 0 ${paperW} ${paperH}`);

//         // Frissítjük az Input mezőket (CM) is, hogy a felhasználó lássa a változást
//         const widthInput = document.getElementById('canvas-width');
//         const heightInput = document.getElementById('canvas-height');
        
//         // Jelenlegi CM értékek
//         const currentCmW = parseFloat(widthInput.value) || 21;
//         // Kiszámoljuk az új CM értéket az arány alapján (új pixel / régi pixel * régi cm)
//         const scaleFactor = newPaperW / paperVB[2]; // Mennyivel nőtt a ViewBox
        
//         const newCmW = currentCmW * scaleFactor;
//         const newCmH = newCmW / originalRatio;

//         widthInput.value = Math.round(newCmW * 10) / 10;
//         heightInput.value = Math.round(newCmH * 10) / 10;
        
//         console.log(`Vászon növelve: ${paperVB[2]}x${paperVB[3]} -> ${paperW.toFixed(0)}x${paperH.toFixed(0)}`);
//     }

//     // 6. POZÍCIÓ SZÁMÍTÁSA (Most már az esetlegesen megnövelt papírmérethez igazítva)
//     const paperCenterX = paperW / 2;
//     const paperCenterY = paperH / 2;
//     const padding = paperH * 0.05;

//     let transX = paperCenterX - (contentX + contentW / 2) * finalScale;
//     let transY = 0;

//     if (position === 'center') {
//         transY = paperCenterY - (contentY + contentH / 2) * finalScale;
//     } else if (position === 'top') {
//         transY = padding - (contentY * finalScale);
//     } else if (position === 'bottom') {
//         transY = (paperH - padding) - (contentY + contentH) * finalScale;
//     }

//     // 7. ALKALMAZÁS
//     const transformString = `translate(${transX}, ${transY}) scale(${finalScale})`;
//     transformGroup.setAttribute('transform', transformString);
// }


// Tároljuk a felhasználó által beállított szélességet (CM-ben) és a pozíciót
let currentMapTargetWidthCM = null; 
let currentMapPos = 'center'; // alapértelmezett

// // --- SEGÉDFÜGGVÉNY: BBox mérése (már ismerős) ---
// function getMapContentBBox(mapSvg) {
//     let bbox = { x: 0, y: 0, width: 0, height: 0 };
//     try {
//         const bgGroup = mapSvg.querySelector('g#background');
//         if (bgGroup) {
//             bbox = bgGroup.getBBox();
//         } else {
//             let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
//             const groups = mapSvg.querySelectorAll('g');
//             let found = false;
//             groups.forEach(g => {
//                 try {
//                     const b = g.getBBox();
//                     if (b.width > 0 && b.height > 0) {
//                         minX = Math.min(minX, b.x);
//                         minY = Math.min(minY, b.y);
//                         maxX = Math.max(maxX, b.x + b.width);
//                         maxY = Math.max(maxY, b.y + b.height);
//                         found = true;
//                     }
//                 } catch(e) {}
//             });
//             if (found) {
//                 bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
//             } else {
//                 bbox = { x: 0, y: 0, width: 1000, height: 1000 };
//             }
//         }
//     } catch (e) {
//         return { x: 0, y: 0, width: 1000, height: 1000 };
//     }
//     return bbox;
// }

// function getMapContentBBox(mapSvg) {
//     let bbox = { x: 0, y: 0, width: 0, height: 0 };
//     try {
//         // 1. Próbálkozás: Háttér réteg (background)
//         let target = mapSvg.querySelector('g#background');
        
//         // 2. Próbálkozás: Ha nincs háttér, keressük a körvonalat (outline)
//         // A Werner vetületnél ez a .outline osztályú path lesz a döntő
//         if (!target || target.getBBox().width === 0) {
//             target = mapSvg.querySelector('.outline');
//         }
        
//         // 3. Próbálkozás: Graticule (Fokhálózat)
//         if (!target || target.getBBox().width === 0) {
//             target = mapSvg.querySelector('.graticule');
//         }

//         if (target) {
//             bbox = target.getBBox();
//         } else {
//             // Végső eset: mérjük meg az összes csoportot
//             let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
//             const groups = mapSvg.querySelectorAll('g, path');
//             let found = false;
            
//             groups.forEach(g => {
//                 try {
//                     // Csak ami látható és van mérete
//                     if(g.getAttribute('display') !== 'none') {
//                         const b = g.getBBox();
//                         if (b.width > 0 && b.height > 0) {
//                             minX = Math.min(minX, b.x);
//                             minY = Math.min(minY, b.y);
//                             maxX = Math.max(maxX, b.x + b.width);
//                             maxY = Math.max(maxY, b.y + b.height);
//                             found = true;
//                         }
//                     }
//                 } catch(e) {}
//             });
            
//             if (found) {
//                 bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
//             } else {
//                 // Ha tényleg semmi nincs, fallback értékek
//                 bbox = { x: -500, y: -500, width: 1000, height: 1000 };
//             }
//         }
//     } catch (e) {
//         console.warn("BBox hiba, fallback:", e);
//         bbox = { x: -500, y: -500, width: 1000, height: 1000 };
//     }
//     return bbox;
// }

// // --- JAVÍTOTT BBOX MÉRÉS (Képet is felismeri) ---
// function getMapContentBBox(mapSvg) {
//     let bbox = { x: 0, y: 0, width: 0, height: 0 };
//     try {
//         // 1. Kép keresése (az új copySVG által betett elem)
//         let target = mapSvg.querySelector('image');
        
//         // 2. Ha nincs kép, keressük a régi vektoros elemeket
//         if (!target) target = mapSvg.querySelector('g#background');
//         if (!target) target = mapSvg.querySelector('.outline');
//         if (!target) target = mapSvg.querySelector('.graticule');

//         if (target) {
//             bbox = target.getBBox();
//         } else {
//             // Fallback
//             bbox = { x: 0, y: 0, width: 1000, height: 1000 };
//         }
//     } catch (e) {
//         console.warn("BBox hiba:", e);
//         bbox = { x: 0, y: 0, width: 1000, height: 1000 };
//     }
//     return bbox;
// }
// BBox segédfüggvény ( változatlan )
// function getMapContentBBox(mapSvg) {
//     // ... (ez maradhat a régi, de az image-t is kezeljük fentebb) ...
//     try {
//         if (mapSvg.tagName === 'image') {
//              return {x:0, y:0, width: parseFloat(mapSvg.getAttribute('width')), height: parseFloat(mapSvg.getAttribute('height'))};
//         }
//         return mapSvg.getBBox();
//     } catch(e) { return {x:0,y:0,width:1000,height:1000}; }
// }
// // --- ÚJ: Szélesség beállítása CM-ben ---
// window.setMapWidth = function(cmValue) {
//     if (!cmValue) return;
//     currentMapTargetWidthCM = parseFloat(cmValue);
//     window.refreshMapTransform();
// }

// --- ÚJ: Max méretre igazítás gombhoz ---
window.fitMapToCanvas = function() {
    const canvasWidthInput = document.getElementById('canvas-width');
    const canvasHeightInput = document.getElementById('canvas-height');
    if(canvasWidthInput && canvasHeightInput) {
        // Levonunk egy pici margót (pl. 1 cm), hogy szép legyen
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1); //parseFloat(canvasWidthInput.value) || 21;
        // Beállítjuk az input mezőt is
        const mapInput = document.getElementById('map-width-cm-input');
        if(mapInput) mapInput.value = maxWidth;
        
        window.setMapWidth(maxWidth);
    }
}

// --- ÚJ: Pozíció gombok ehhez a függvényhez vezetnek ---
window.alignCelestialMap = function(position) {
    currentMapPos = position;
    if(typeof myCelestialConf !== 'undefined') {
        myCelestialConf.alignCelestialMap = position;
    }
    window.refreshMapTransform();
}

// // --- FŐ LOGIKA: Transzformáció frissítése ---
// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     const mapSvg = mapLayer.querySelector('svg');
//     if (!mapSvg) return;

//     // 1. Vászon adatok (Pixel és CM)
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW_Px = paperVB[2];
//     const paperH_Px = paperVB[3];
    
//     const canvasWidthInput = document.getElementById('canvas-width');
//     const paperW_Cm = parseFloat(canvasWidthInput.value) || 21; // pl. 21 cm

//     // 2. Pixel / CM arány kiszámítása
//     // Ez mondja meg, hogy a ViewBox-ban hány egység felel meg 1 cm-nek
//     const pxPerCm = paperW_Px / paperW_Cm;

//     // 3. Térkép tartalom mérése
//     const bbox = getMapContentBBox(mapSvg);
//     const contentW = bbox.width;
//     const contentH = bbox.height;
//     const contentX = bbox.x;
//     const contentY = bbox.y;

//     // 4. Célméret meghatározása
//     let targetWidthCm = currentMapTargetWidthCM;

//     // Ha még nincs beállítva (pl. betöltéskor), akkor legyen a vászon szélessége (max)
//     if (targetWidthCm === null) {
//         targetWidthCm = paperW_Cm; 
//         // Frissítsük az input mezőt is az alapértelmezett értékre
//         const mapInput = document.getElementById('map-width-cm-input');
//         if(mapInput) mapInput.value = Math.round(targetWidthCm * 10) / 10;
//     }

//     // 5. KORLÁTOZÁS (A kért funkció: ne legyen nagyobb a vászonnál)
//     // Max szélesség cm-ben
//     if (targetWidthCm > paperW_Cm) {
//         targetWidthCm = paperW_Cm;
//         // Visszaírjuk a korrigált értéket az inputba, hogy a felhasználó lássa
//         const mapInput = document.getElementById('map-width-cm-input');
//         if(mapInput) mapInput.value = Math.round(targetWidthCm * 10) / 10;
//     }

//     // Ellenőrizzük a magasságot is! Ha a szélesség miatt a magasság kilógna, akkor csökkenteni kell a szélességet.
//     // Kiszámoljuk a térkép képarányát
//     const mapRatio = contentW / contentH;
    
//     // Mekkora lenne a magasság cm-ben ezzel a szélességgel?
//     let targetHeightCm = targetWidthCm / mapRatio;
    
//     const canvasHeightInput = document.getElementById('canvas-height');
//     const paperH_Cm = parseFloat(canvasHeightInput.value) || 30;

//     // Ha a magasság túl nagy, akkor a magassághoz igazítjuk a szélességet
//     if (targetHeightCm > paperH_Cm) {
//         targetHeightCm = paperH_Cm;
//         targetWidthCm = targetHeightCm * mapRatio;
        
//         // Input frissítése a csökkentett szélességre
//         const mapInput = document.getElementById('map-width-cm-input');
//         if(mapInput) mapInput.value = Math.round(targetWidthCm * 10) / 10;
//     }

//     // 6. Skála kiszámítása
//     // Cél szélesség pixelben = Cél CM * (Pixel/CM arány)
//     const targetWidthPx = targetWidthCm * pxPerCm;
    
//     // Scale = Cél Pixel / Eredeti Tartalom Pixel
//     const scale = targetWidthPx / contentW;

//     // 7. Pozícionálás (Transzformáció)
//     const paperCenterX = paperW_Px / 2;
//     const paperCenterY = paperH_Px / 2;
//     // Margó pixelben (pl. a fenti/lenti igazításhoz)
//     const paddingPx = (paperH_Px * 0.05); 

//     let transX = paperCenterX - (contentX + contentW / 2) * scale;
//     let transY = 0;

//     if (currentMapPos === 'center') {
//         transY = paperCenterY - (contentY + contentH / 2) * scale;
//     } else if (currentMapPos === 'top') {
//         transY = paddingPx - (contentY * scale);
//     } else if (currentMapPos === 'bottom') {
//         // Alulról padding
//         transY = (paperH_Px - paddingPx) - (contentY + contentH) * scale;
//     }

//     // 8. Alkalmazás
//     const transformString = `translate(${transX}, ${transY}) scale(${scale})`;
//     transformGroup.setAttribute('transform', transformString);
// }
// --- TÉRKÉP TRANSZFORMÁCIÓ (Layout támogatással) ---
// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     const mapSvg = mapLayer.querySelector('svg, image'); // Képet is keressük!
//     if (!mapSvg) return;

//     // 1. Vászon adatok
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW_Px = paperVB[2];
//     const paperH_Px = paperVB[3];
    
//     // 2. Térkép tartalom mérése
//     // A copyMapToDesigner egy <image>-t hoz létre, annak van width/height attribútuma
//     let contentW = 1000, contentH = 1000;
    
//     if (mapSvg.tagName === 'image') {
//         contentW = parseFloat(mapSvg.getAttribute('width')) || 1000;
//         contentH = parseFloat(mapSvg.getAttribute('height')) || 1000;
//     } else {
//         // Ha mégis SVG lenne
//         const bbox = getMapContentBBox(mapSvg);
//         contentW = bbox.width || 1000;
//         contentH = bbox.height || 1000;
//     }

//     // 3. Rendelkezésre álló terület meghatározása a Layout alapján
//     let availableW = paperW_Px;
//     let offsetX = 0; // Mennyivel toljuk el a terület kezdetét

//     const margin = paperW_Px * 0.05;

//     if (layoutState.mode === 'single') {
//         availableW = paperW_Px;
//         offsetX = 0;
//     } else if (layoutState.mode === 'split-left') {
//         // Térkép jobbra (a bal oldalon a kép van)
//         availableW = paperW_Px / 2;
//         offsetX = paperW_Px / 2;
//     } else if (layoutState.mode === 'split-right') {
//         // Térkép balra
//         availableW = paperW_Px / 2;
//         offsetX = 0;
//     }

//     // 4. Skála számítása (Hogy beférjen a rendelkezésre álló helyre)
//     // Levonjuk a margókat
//     const safeW = availableW - (margin * 2);
//     const safeH = paperH_Px - (margin * 2);

//     const scaleX = safeW / contentW;
//     const scaleY = safeH / contentH;
    
//     // Felhasználói nagyítás (slider)
//     let userScale = (typeof currentUserMapScale !== 'undefined') ? currentUserMapScale : 1.0;
//     const finalScale = Math.min(scaleX, scaleY) * userScale;

//     // 5. Pozícionálás (Középre a rendelkezésre álló területen)
//     const areaCenterX = offsetX + (availableW / 2);
//     const areaCenterY = paperH_Px / 2;

//     // A tartalom közepe legyen az areaCenterX-en
//     // contentW * finalScale a végső szélesség
//     let transX = areaCenterX - (contentW * finalScale) / 2;
//     let transY = 0;

//     // Függőleges igazítás (a globális currentMapPos alapján)
//     let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
    
//     if (pos === 'center') {
//         transY = areaCenterY - (contentH * finalScale) / 2;
//     } else if (pos === 'top') {
//         transY = margin;
//     } else if (pos === 'bottom') {
//         transY = paperH_Px - margin - (contentH * finalScale);
//     }

//     // 6. Alkalmazás
//     const transformString = `translate(${transX}, ${transY}) scale(${finalScale})`;
//     transformGroup.setAttribute('transform', transformString);
    
//     // Fotót is frissítsük, ha kell
//     if (layoutState.mode !== 'single') {
//         updatePhotoPosition();
//     }
// }
// Ha a vászon mérete változik (updateCanvasSize), újra kell számolni a térkép méretét is
// Mentsd el az eredeti updateCanvasSize-t, és hívd meg a végén a miénket
// const originalUpdateCanvasSize = window.updateCanvasSize;
// window.updateCanvasSize = function() {
//     if(originalUpdateCanvasSize) originalUpdateCanvasSize();
//     // Kis késleltetés, hogy a ViewBox frissüljön
//     setTimeout(() => {
//         window.refreshMapTransform();
//     }, 50);
// }
// // --- EXPORTÁLÁS JAVÍTÁSA ---
// async function exportCanvas(format) {
//     if (!getDOMElements()) {
//         alert("Hiba: A tervező elem nem található.");
//         return;
//     }

//     // 1. Kijelölés eltüntetése
//     const currentSel = selectedElementId;
//     selectElement(null);

//     try {
//         // 2. SVG adat kinyerése stringként
//         const svgData = new XMLSerializer().serializeToString(designerSVG);
        
//         // 3. Canvas létrehozása (Nagy felbontásban)
//         const canvas = document.createElement("canvas");
//         const vb = designerSVG.getAttribute('viewBox').split(' ');
//         const w = parseFloat(vb[2]);
//         const h = parseFloat(vb[3]);
        
//         const scaleFactor = 2; // Jobb minőség
//         canvas.width = w * scaleFactor;
//         canvas.height = h * scaleFactor;
        
//         const ctx = canvas.getContext("2d");
        
//         // 4. Háttérszín kitöltése (MERT AZ SVG HÁTTÉR NEM EXPORTÁLÓDIK AUTOMATIKUSAN)
//         // Lekérjük a CSS változót vagy fix színt használunk
//         const bgColor = getComputedStyle(document.body).getPropertyValue('--primary-bg').trim() || "#0a0e27";
//         ctx.fillStyle = bgColor;
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         // 5. Kép betöltése
//         const img = new Image();
//         // Base64 konverzió a biztonság kedvéért (utf-8 karakterek kezelése)
//         const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
//         const url = URL.createObjectURL(svgBlob);

//         img.onload = function() {
//             // Rajzolás a canvasra
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
//             // Letöltés indítása
//             const link = document.createElement('a');
//             const ext = format === 'jpeg' ? 'jpg' : format;
//             link.download = `csillagterkep_${Date.now()}.${ext}`;
//             link.href = canvas.toDataURL(`image/${format}`, 0.9); // 0.9 quality for jpeg
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
            
//             // Takarítás
//             URL.revokeObjectURL(url);
//             if(currentSel) selectElement(currentSel);
//         };
        
//         img.onerror = function(e) {
//             console.error("Hiba a kép betöltésekor exportnál:", e);
//             alert("Hiba történt az exportálás során. Ellenőrizd a konzolt.");
//             if(currentSel) selectElement(currentSel);
//         };

//         img.src = url;

//     } catch (e) {
//         console.error(e);
//         alert("Exportálási hiba: " + e.message);
//     }
// }

// // --- JAVÍTOTT EXPORTÁLÁS (SVG Háttérrel + Nagy felbontású Raster) ---
// async function exportCanvas(format) {
//     if (!getDOMElements()) {
//         alert("Hiba: A tervező elem nem található.");
//         return;
//     }

//     try {
//         // --- A: VEKTOROS EXPORT (SVG) ---
//         if (format === 'svg') {
//             // 1. Klónozzuk az SVG-t, hogy ne a láthatót rontsuk el
//             const svgClone = designerSVG.cloneNode(true);
            
//             // 2. Méretek fixálása (ViewBox alapján)
//             const viewBox = designerSVG.getAttribute('viewBox').split(' ');
//             const width = viewBox[2];
//             const height = viewBox[3];
            
//             svgClone.setAttribute("width", width);
//             svgClone.setAttribute("height", height);
            
//             // 3. HÁTTÉR HOZZÁADÁSA (Fontos!)
//             // Az SVG alapból átlátszó. Létrehozunk egy téglalapot a legalsó rétegre.
//             // Lekérjük a CSS-ből a háttérszínt, vagy alapértelmezett sötétkék
//             const bgColor = getComputedStyle(document.body).getPropertyValue('--primary-bg').trim() || "#0a0e27";
            
//             const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//             bgRect.setAttribute("x", "0");
//             bgRect.setAttribute("y", "0");
//             bgRect.setAttribute("width", "100%");
//             bgRect.setAttribute("height", "100%");
//             bgRect.setAttribute("fill", bgColor);
//             bgRect.setAttribute("id", "export-background");
            
//             // Beszúrjuk legelső elemnek
//             svgClone.insertBefore(bgRect, svgClone.firstChild);

//             // 4. Serializálás és Letöltés
//             const serializer = new XMLSerializer();
//             let source = serializer.serializeToString(svgClone);

//             // Névtér javítás (hogy biztosan megnyissa az Illustrator/böngésző)
//             if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
//                 source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
//             }
//             if(!source.match(/^<svg[^>]+xmlns:xlink/)){
//                 source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
//             }

//             const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            
//             const link = document.createElement("a");
//             link.download = `csillagterkep_vektoros_${Date.now()}.svg`;
//             link.href = url;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
            
//         } 
//         // --- B: RASTERES EXPORT (PNG / JPEG) ---
//         else {
//             // SVG adat kinyerése stringként
//             const svgData = new XMLSerializer().serializeToString(designerSVG);
            
//             // Canvas létrehozása (Nagy felbontásban, pl. 300 DPI-hez közelítve)
//             // A viewBox méretét szorozzuk fel
//             const vb = designerSVG.getAttribute('viewBox').split(' ');
//             const w = parseFloat(vb[2]);
//             const h = parseFloat(vb[3]);
            
//             // Skálázási faktor a jobb minőségért (pl. 2x vagy 3x akkorára, mint a képernyőn)
//             const scaleFactor = 3; 
            
//             const canvas = document.createElement("canvas");
//             canvas.width = w * scaleFactor;
//             canvas.height = h * scaleFactor;
            
//             const ctx = canvas.getContext("2d");
            
//             // Háttérszín kitöltése (MERT AZ SVG HÁTTÉR NEM EXPORTÁLÓDIK AUTOMATIKUSAN)
//             const bgColor = getComputedStyle(document.body).getPropertyValue('--primary-bg').trim() || "#0a0e27";
//             ctx.fillStyle = bgColor;
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             // Kép betöltése
//             const img = new Image();
//             // Base64 konverzió a biztonság kedvéért (utf-8 karakterek kezelése)
//             const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
//             const url = URL.createObjectURL(svgBlob);

//             img.onload = function() {
//                 // Rajzolás a canvasra skálázva
//                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
//                 // Letöltés indítása
//                 const link = document.createElement('a');
//                 const ext = format === 'jpeg' ? 'jpg' : format;
//                 link.download = `csillagterkep_${Date.now()}.${ext}`;
//                 // JPEG-nél 0.9 minőség, PNG-nél nem számít
//                 link.href = canvas.toDataURL(`image/${format}`, 0.95); 
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
                
//                 // Takarítás
//                 URL.revokeObjectURL(url);
//             };
            
//             img.onerror = function(e) {
//                 console.error("Hiba a kép betöltésekor exportnál:", e);
//                 alert("Hiba történt az exportálás során.");
//             };

//             img.src = url;
//         }

//     } catch (e) {
//         console.error(e);
//         alert("Exportálási hiba: " + e.message);
//     }
// }

// // --- ÚJ: Háttérszín frissítése ---
// window.updateCanvasBackground = function(color) {
//     if(designerSVG) {
//         designerSVG.style.backgroundColor = color;
//     }
// }
// --- JAVÍTOTT HÁTTÉRSZÍN FRISSÍTÉS ---
// window.updateCanvasBackground = function(color) {
//     if (!getDOMElements()) return;
    
//     // 1. SVG CSS stílus frissítése (Ez a képernyőn látható)
//     designerSVG.style.backgroundColor = color;
    
//     // 2. Háttér téglalap (rect) kitöltése (Ez exportálódik)
//     const bgRect = document.getElementById('designer-background-rect');
//     if (bgRect) {
//         bgRect.setAttribute('fill', color);
//     }
// }
// window.updateCanvasBackground = function(color) {
//     // 1. Tervező nézet (SVG) frissítése
//     if (getDOMElements()) {
//         // SVG CSS
//         designerSVG.style.backgroundColor = color;
//         // SVG Rect (exportáláshoz)
//         const bgRect = document.getElementById('designer-background-rect');
//         if (bgRect) {
//             bgRect.setAttribute('fill', color);
//         }
//     }
    
//     // 2. Szerkesztő nézet (#map-wrap) frissítése - EZ HIÁNYZOTT
//     const mapWrap = document.getElementById('map-wrap');
//     if (mapWrap) {
//         mapWrap.style.background = color;
//     }
// }
// --- JAVÍTOTT EXPORTÁLÁS (Fix méretű háttérrel + Választott színnel) ---
// async function exportCanvas(format) {
//     if (!getDOMElements()) {
//         alert("Hiba: A tervező elem nem található.");
//         return;
//     }

//     try {
//         // 1. Méretek és Szín lekérése (Biztonságosabban)
//         // A viewBox.baseVal pontosabb értékeket ad vissza, mint a string split
//         const vb = designerSVG.viewBox.baseVal;
//         const width = vb.width;
//         const height = vb.height;
//         const x = vb.x;
//         const y = vb.y;

//         // Háttérszín lekérése közvetlenül az SVG stílusából (amit a user beállított)
//         // Ha nincs beállítva, alapértelmezett sötétkék
//         const bgColor = designerSVG.style.backgroundColor || "#0a0e27";

//         // --- A: VEKTOROS EXPORT (SVG) ---
//         if (format === 'svg') {
//             const svgClone = designerSVG.cloneNode(true);
            
//             // Méretek fixálása: Pixelben adjuk meg, így a böngésző nem torzítja el
//             svgClone.setAttribute("width", width);
//             svgClone.setAttribute("height", height);
//             svgClone.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            
//             // HÁTTÉR TÉGLALAP (JAVÍTVA)
//             // Nem 100%-ot használunk, hanem a pontos viewBox méreteket!
//             const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
//             bgRect.setAttribute("x", x);
//             bgRect.setAttribute("y", y);
//             bgRect.setAttribute("width", width);   // Fix szélesség
//             bgRect.setAttribute("height", height); // Fix magasság
//             bgRect.setAttribute("fill", bgColor);  // Választott szín
//             bgRect.setAttribute("id", "export-background");
            
//             // Beszúrjuk legelső elemnek (hogy minden más alatt legyen)
//             svgClone.insertBefore(bgRect, svgClone.firstChild);

//             // Serializálás
//             const serializer = new XMLSerializer();
//             let source = serializer.serializeToString(svgClone);

//             // Névtér javítás
//             if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
//                 source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
//             }
//             if(!source.match(/^<svg[^>]+xmlns:xlink/)){
//                 source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
//             }

//             const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            
//             const link = document.createElement("a");
//             link.download = `csillagterkep_vektoros_${Date.now()}.svg`;
//             link.href = url;
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
            
//         } 
//         // --- B: RASTERES EXPORT (PNG / JPEG) ---
//         else {
//             const svgData = new XMLSerializer().serializeToString(designerSVG);
            
//             // Nagyobb felbontás (3x)
//             const scaleFactor = 3; 
//             const canvas = document.createElement("canvas");
//             canvas.width = width * scaleFactor;
//             canvas.height = height * scaleFactor;
            
//             const ctx = canvas.getContext("2d");
            
//             // Háttér kitöltése a választott színnel
//             ctx.fillStyle = bgColor;
//             ctx.fillRect(0, 0, canvas.width, canvas.height);

//             const img = new Image();
//             const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
//             const url = URL.createObjectURL(svgBlob);

//             img.onload = function() {
//                 ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
//                 const link = document.createElement('a');
//                 const ext = format === 'jpeg' ? 'jpg' : format;
//                 link.download = `csillagterkep_${Date.now()}.${ext}`;
//                 link.href = canvas.toDataURL(`image/${format}`, 0.95); 
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
                
//                 URL.revokeObjectURL(url);
//             };
            
//             img.src = url;
//         }

//     } catch (e) {
//         console.error(e);
//         alert("Exportálási hiba: " + e.message);
//     }
// }


// --- JAVÍTOTT EXPORTÁLÁS (SVG Gradiens Támogatással) ---
async function exportCanvas(format) {
    if (!getDOMElements()) {
        alert("Hiba: A tervező elem nem található.");
        return;
    }

    try {
        // 1. Méretek lekérése
        const vb = designerSVG.viewBox.baseVal;
        const width = vb.width;
        const height = vb.height;
        const x = vb.x;
        const y = vb.y;

        // Háttérstílus lekérése (ez lehet hex szín vagy linear-gradient string)
        const bgStyle = designerSVG.style.background || designerSVG.style.backgroundColor || "#0a0e27";

        // --- A: VEKTOROS EXPORT (SVG) ---
        if (format === 'svg') {
            const svgClone = designerSVG.cloneNode(true);
            
            svgClone.setAttribute("width", width);
            svgClone.setAttribute("height", height);
            svgClone.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
            
            // HÁTTÉR TÉGLALAP LÉTREHOZÁSA
            const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bgRect.setAttribute("x", x);
            bgRect.setAttribute("y", y);
            bgRect.setAttribute("width", width);
            bgRect.setAttribute("height", height);
            bgRect.setAttribute("id", "export-background");

            // --- GRADIENS KEZELÉS (A JAVÍTÁS LÉNYEGE) ---
            if (bgStyle.includes("gradient")) {
                // 1. Megkeressük vagy létrehozzuk a <defs> szekciót
                let defs = svgClone.querySelector('defs');
                if (!defs) {
                    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                    svgClone.insertBefore(defs, svgClone.firstChild);
                }

                // 2. Kinyerjük a színeket a stringből (pl. #0B1026 és #1a2542)
                const colors = bgStyle.match(/#[a-fA-F0-9]{6}|rgb\([^)]+\)/g);
                
                if (colors && colors.length >= 2) {
                    // 3. Létrehozunk egy SVG LinearGradient elemet
                    const gradId = "bg-gradient-" + Date.now(); // Egyedi ID
                    const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                    gradient.setAttribute("id", gradId);
                    
                    // Átlós irány (kb. 135deg-nek felel meg: bal-fent -> jobb-lent)
                    gradient.setAttribute("x1", "0%");
                    gradient.setAttribute("y1", "0%");
                    gradient.setAttribute("x2", "100%");
                    gradient.setAttribute("y2", "100%");

                    // Kezdő szín (Stop 1)
                    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                    stop1.setAttribute("offset", "0%");
                    stop1.setAttribute("stop-color", colors[0]);
                    
                    // Vég szín (Stop 2)
                    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                    stop2.setAttribute("offset", "100%");
                    stop2.setAttribute("stop-color", colors[colors.length - 1]); // Az utolsó szín

                    gradient.appendChild(stop1);
                    gradient.appendChild(stop2);
                    defs.appendChild(gradient);

                    // 4. Hivatkozunk rá a téglalapon
                    bgRect.setAttribute("fill", `url(#${gradId})`);
                } else {
                    // Fallback: Ha nem sikerült színt lopni, legyen fekete
                    bgRect.setAttribute("fill", "#000000");
                }
            } else {
                // Ha egyszínű (nem gradiens), mehet direktbe
                bgRect.setAttribute("fill", bgStyle);
            }
            
            // Beszúrjuk a hátteret legelsőnek
            svgClone.insertBefore(bgRect, svgClone.firstChild);

            // Serializálás és Letöltés
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(svgClone);

            // Névtér javítások
            if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
                source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
            }
            if(!source.match(/^<svg[^>]+xmlns:xlink/)){
                source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
            }

            const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            const link = document.createElement("a");
            link.download = `csillagterkep_vektoros_${Date.now()}.svg`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
        } 
        // --- B: RASTERES EXPORT (PNG / JPEG) ---
        else {
            const svgData = new XMLSerializer().serializeToString(designerSVG);
            const scaleFactor = 3; 
            const canvas = document.createElement("canvas");
            canvas.width = width * scaleFactor;
            canvas.height = height * scaleFactor;
            
            const ctx = canvas.getContext("2d");
            
            // Háttér festése Canvas-on (itt működik a gradiens logika, amit már megcsináltunk korábban)
            if (bgStyle.includes('gradient')) {
                const colors = bgStyle.match(/#[a-fA-F0-9]{6}|rgb\([^)]+\)/g);
                if (colors && colors.length >= 2) {
                    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                    gradient.addColorStop(0, colors[0]);
                    gradient.addColorStop(1, colors[colors.length - 1]);
                    ctx.fillStyle = gradient;
                } else {
                    ctx.fillStyle = "#0a0e27";
                }
            } else {
                ctx.fillStyle = bgStyle;
            }
            
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const img = new Image();
            const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
            const url = URL.createObjectURL(svgBlob);

            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                const link = document.createElement('a');
                const ext = format === 'jpeg' ? 'jpg' : format;
                link.download = `csillagterkep_${Date.now()}.${ext}`;
                link.href = canvas.toDataURL(`image/${format}`, 0.95); 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };
            img.src = url;
        }

    } catch (e) {
        console.error(e);
        alert("Exportálási hiba: " + e.message);
    }
}

// --- Szöveg kezelés és DOM események (Ezek többnyire változatlanok, csak a DOM elemek frissítve) ---

// function updateCanvasSize() {
//     if (!getDOMElements()) return;
//         console.log("updateCanvasSize");
//         console.log("updateCanvasSize parseFloat(document.getElementById('canvas-width').value)", parseFloat(document.getElementById('canvas-width').value));
//         console.log("updateCanvasSize parseFloat(document.getElementById('canvas-heightheight').value)", parseFloat(document.getElementById('canvas-height').value));
//         const widthCm = parseFloat(document.getElementById('canvas-width').value) || 21;
//         const heightCm = parseFloat(document.getElementById('canvas-height').value) || 30;
//         var nagyobb;
//         var aspectRatio;
//         var viewBoxWidth = 2700; 
//         var viewBoxHeight = viewBoxWidth * aspectRatio;
//         if (heightCm < widthCm) {
//             aspectRatio = widthCm / heightCm;
//             nagyobb = widthCm;
//             viewBoxHeight = 2700; 
//             viewBoxWidth = viewBoxHeight * aspectRatio;
//         }
//         else {
//             aspectRatio = heightCm / widthCm; 
//             nagyobb = heightCm;
//             viewBoxWidth = 2700; 
//             viewBoxHeight = viewBoxWidth * aspectRatio;
//         }
//         console.log("updateCanvasSize widthCm", widthCm);
//         console.log("updateCanvasSize heightCm", heightCm);
//         console.log("updateCanvasSize aspectRatio", aspectRatio);
//         console.log("updateCanvasSize nagyobb", nagyobb);
//         // myCelestialConf.
//         // console.log("updateCanvasSize canvasContainer", canvasContainer);
//     // HTML konténer arány
//     // canvasContainer.style.paddingBottom = `${aspectRatio * 100}%`;

//     // SVG viewBox frissítés
//     // const viewBoxWidth = 2700; 
//     // const viewBoxHeight = viewBoxWidth * aspectRatio;
//     designerSVG.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    
//     // Újraigazítás, hogy ne csússzon el
//     // alignCelestialMap('center');
//     alignCelestialMap(myCelestialConf.alignCelestialMap); 
// }

// function addTextElement(initialText) {
//     if (!getDOMElements()) return;
//     const newId = `text-${Date.now()}`;
//     const viewBox = designerSVG.getAttribute('viewBox').split(' ');
    
//     const element = {
//         id: newId,
//         content: initialText,
//         x: parseFloat(viewBox[2]) / 2, 
//         y: parseFloat(viewBox[3]) / 2, 
//         'font-family': 'Space Grotesk, sans-serif', 
//         'font-size': '48px',
//         'font-weight': 'bold',
//         'font-style': 'normal',
//         'fill': '#e8edf5', 
//         'text-anchor': 'middle' 
//     };
//     elements.push(element);
//     renderTextLayer();
//     renderTextList();
//     selectElement(newId);
// }

// function renderTextLayer(fontFamily) {
//     console.log("fontFamily", fontFamily);
//     if (fontFamily) {
//         $("#font_").css("font-family", fontFamily);
//     }
//     if (!textLayer) return;
//     textLayer.innerHTML = ''; 
//     elements.forEach(element => {
//         const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
//         // Attribútumok beállítása...
//         textEl.setAttribute('id', element.id);
//         textEl.setAttribute('x', element.x);
//         textEl.setAttribute('y', element.y);
//         // textEl.setAttribute('font-family', element['font-family']);
//         // textEl.setAttribute('font-family', fontFamily);
//         textEl.setAttribute('font-family', $("#font_").css("font-family"));
//         textEl.setAttribute('font-size', element['font-size']);
//         textEl.setAttribute('font-weight', element['font-weight']);
//         textEl.setAttribute('font-style', element['font-style']);
//         textEl.setAttribute('fill', element.fill);
//         textEl.setAttribute('text-anchor', element['text-anchor']);
//         textEl.textContent = element.content;
        
//         // Események
//         textEl.addEventListener('mousedown', startDrag);
//         textEl.addEventListener('touchstart', startDrag);
//         textEl.addEventListener('click', (e) => { e.stopPropagation(); selectElement(element.id); });
        
//         textLayer.appendChild(textEl);
//         if (element.id === selectedElementId) textEl.classList.add('selected-text');
//     });
// }

// function selectElement(id) {
//     if (!getDOMElements()) return;
//     if (selectedElementId) {
//         const prev = document.getElementById(selectedElementId);
//         if(prev) prev.classList.remove('selected-text');
//     }
//     selectedElementId = id;
//     if (id) {
//         const el = elements.find(e => e.id === id);
//         if (el) {
//             document.getElementById('text-content').value = el.content;
//             document.getElementById('font-size').value = parseInt(el['font-size']);
//             document.getElementById('font-weight').value = el['font-weight'];
//             document.getElementById('font-style').value = el['font-style'];
//             document.getElementById('fill-color').value = el.fill;
//             document.getElementById('text-anchor').value = el['text-anchor'];
//             // ... többi UI elem update
//             styleControls.style.display = 'block';
//             const curr = document.getElementById(id);
//             if(curr) curr.classList.add('selected-text');
//         }
//     } else {
//         styleControls.style.display = 'none';
//     }
//     renderTextList();
// }

// function renderTextList() {
//     if(!textList) return;
//     textList.innerHTML = '';
//     if(elements.length === 0) textList.innerHTML = '<p style="color:#888;font-size:12px">Nincs szöveg.</p>';
//     elements.forEach(el => {
//         const div = document.createElement('div');
//         div.className = 'list-item';
//         if(el.id === selectedElementId) div.classList.add('active-list-item');
//         div.textContent = el.content;
//         div.onclick = () => selectElement(el.id);
//         textList.appendChild(div);
//     });
// }

// // Drag & Drop logika (egyszerűsítve)
// function startDrag(e) {
//     e.preventDefault(); e.stopPropagation();
//     if (!e.target || e.target.tagName !== 'text') return;
//     selectElement(e.target.id);
//     dragElement = elements.find(el => el.id === selectedElementId);
    
//     const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
//     const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
//     startX = clientX; startY = clientY;
//     startElX = dragElement.x; startElY = dragElement.y;
    
//     document.addEventListener('mousemove', drag);
//     document.addEventListener('mouseup', endDrag);
// }

// function drag(e) {
//     if (!dragElement) return;
//     const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
//     const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    
//     // Scale számítás az egér mozgáshoz
//     const rect = designerSVG.getBoundingClientRect();
//     const vb = designerSVG.getAttribute('viewBox').split(' ');
//     const scaleX = parseFloat(vb[2]) / rect.width;
//     const scaleY = parseFloat(vb[3]) / rect.height;

//     dragElement.x = startElX + (clientX - startX) * scaleX;
//     dragElement.y = startElY + (clientY - startY) * scaleY;
    
//     const el = document.getElementById(dragElement.id);
//     if(el) { el.setAttribute('x', dragElement.x); el.setAttribute('y', dragElement.y); }
// }

// function endDrag() {
//     dragElement = null;
//     document.removeEventListener('mousemove', drag);
//     document.removeEventListener('mouseup', endDrag);
// }
// --- ÚJ SZÖVEGKEZELŐ RENDSZER (FIX FELSŐ ÉS ALSÓ) ---

// Konfiguráció tárolása a két szövegmezőhöz
let fixedTextConfig = {
    top: {
        content: "",
        font: "Space Grotesk",
        size: 48,
        alignH: "middle", // start, middle, end
        alignV: "center", // top, center, bottom (a zónán belül)
        weight: "bold",
        style: "normal",
        color: "#e8edf5"
    },
    bottom: {
        content: "",
        font: "Space Grotesk",
        size: 32,
        alignH: "middle",
        alignV: "center",
        weight: "normal",
        style: "normal",
        color: "#e8edf5"
    }
};

// Frissítés az Input mezőkből
window.updateFixedText = function(position) { // position: 'top' vagy 'bottom'
    if (!getDOMElements()) return;

    // Adatok kiolvasása a DOM-ból
    fixedTextConfig[position].content = document.getElementById(`${position}-text-content`).value;
    fixedTextConfig[position].font = document.getElementById(`${position}-text-font`).value;
    fixedTextConfig[position].size = parseInt(document.getElementById(`${position}-text-size`).value);
    fixedTextConfig[position].alignH = document.getElementById(`${position}-text-align-h`).value;
    fixedTextConfig[position].alignV = document.getElementById(`${position}-text-align-v`).value;
    fixedTextConfig[position].weight = document.getElementById(`${position}-text-weight`).value;
    fixedTextConfig[position].style = document.getElementById(`${position}-text-style`).value;
    fixedTextConfig[position].color = document.getElementById(`${position}-text-color`).value;

    // Újrarajzolás
    window.renderFixedTexts();
}

// // A FŐ Renderelő függvény - Ezt kell hívni minden változáskor (Térkép mozgáskor is!)
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
    
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = ''; // Törlés

//     // 1. Vászon és Térkép Zónák meghatározása
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW = paperVB[2];
//     const paperH = paperVB[3];
//     const margin = paperW * 0.01; // 5% margó a széleken

//     // Térkép befoglaló méretei (Transform után!)
//     // Meg kell tudnunk, hol kezdődik és hol végződik a térkép a vásznon
//     // A 'transformGroup' a térképet tartalmazza.
//     // A legegyszerűbb, ha a transform attribútumból nyerjük ki az eltolást és skálázást
//     let mapTopY = 0;
//     let mapBottomY = paperH; // Alapértelmezett, ha nincs térkép

//     const transformStr = transformGroup.getAttribute('transform');
//     if (transformStr) {
//         // Regex: translate(x, y) scale(s)
//         const translateMatch = transformStr.match(/translate\(([^,]+),\s*([^)]+)\)/);
//         const scaleMatch = transformStr.match(/scale\(([^)]+)\)/);
        
//         if (translateMatch && scaleMatch) {
//             const transY = parseFloat(translateMatch[2]);
//             const scale = parseFloat(scaleMatch[1]);
            
//             // Meg kell mérni a térkép EREDETI magasságát (BBox)
//             const mapSvg = mapLayer.querySelector('svg');
//             const bbox = getMapContentBBox(mapSvg); // Ezt a függvényt az előző lépésben írtuk
            
//             // A térkép tényleges helye a vásznon:
//             // Y = transY + (bbox.y * scale)
//             // Height = bbox.height * scale
//             const mapRealY = transY + (bbox.y * scale);
//             const mapRealHeight = bbox.height * scale;

//             mapTopY = mapRealY;
//             mapBottomY = mapRealY + mapRealHeight;
//         }
//     }

//     // 2. Renderelés (Felső és Alsó)
//     renderSingleTextField('top', 0, mapTopY, paperW, margin);
//     renderSingleTextField('bottom', mapBottomY, paperH, paperW, margin);
// }

// function renderSingleTextField(pos, zoneStartY, zoneEndY, paperW, margin) {
//     const config = fixedTextConfig[pos];
//     if (!config.content || config.content.trim() === "") return;

//     // Sorok feldolgozása (Enter lekezelése)
//     const lines = config.content.split('\n');
//     const lineHeight = config.size * 1.2; // 1.2-es sorköz
//     const totalTextHeight = lines.length * lineHeight;

//     // --- Vízszintes (X) Pozíció ---
//     let x = 0;
//     if (config.alignH === 'start') x = margin;
//     else if (config.alignH === 'middle') x = paperW / 2;
//     else if (config.alignH === 'end') x = paperW - margin;

//     // --- Függőleges (Y) Pozíció ---
//     // A zoneStartY és zoneEndY közötti területen kell elhelyezni
//     const zoneHeight = zoneEndY - zoneStartY;
//     let startY = 0;

//     // A szövegdoboz tetejének Y koordinátája
//     if (config.alignV === 'top') {
//         startY = zoneStartY + margin; // Kis padding fentről
//     } else if (config.alignV === 'center') {
//         startY = zoneStartY + (zoneHeight - totalTextHeight) / 2;
//         // Korrekció, hogy a szöveg közepe legyen a zóna közepén, ne a teteje
//         startY += (lineHeight / 2); // Finomhangolás a baseline miatt
//     } else if (config.alignV === 'bottom') {
//         startY = zoneEndY - totalTextHeight - margin; // Kis padding alulról
//         startY += lineHeight; // Mert az SVG text y a baseline-nál van
//     }

//     // SVG Text Elem Létrehozása
//     const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
//     textEl.setAttribute('x', x);
//     textEl.setAttribute('y', startY); // Ez az első sor bázisvonala (tspan-oknál felülírjuk dy-nal)
//     textEl.setAttribute('font-family', config.font);
//     textEl.setAttribute('font-size', config.size);
//     textEl.setAttribute('font-weight', config.weight);
//     textEl.setAttribute('font-style', config.style);
//     textEl.setAttribute('fill', config.color);
//     textEl.setAttribute('text-anchor', config.alignH);
    
//     // TSPAN-ok generálása soronként
//     lines.forEach((line, index) => {
//         const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
//         tspan.textContent = line;
//         tspan.setAttribute('x', x); // Minden sor ugyanott kezdődik X-ben
        
//         // Sorköz kezelése: az első sor 0, a többi lejjebb kerül
//         // Ha nem az első sor, akkor '1.2em' (relatív eltolás)
//         if (index === 0) {
//              tspan.setAttribute('dy', 0); 
//              // Ha 'bottom' align van, és több soros, korrigálni kell a startY-t a ciklus előtt,
//              // vagy itt trükközni. A fenti startY számítás már nagyjából jó.
//         } else {
//              tspan.setAttribute('dy', '1.2em');
//         }
        
//         textEl.appendChild(tspan);
//     });

//     document.getElementById('text-layer').appendChild(textEl);
// }


// --- ÚJ BLOKK ALAPÚ SZÖVEGKEZELÉS ---

// Adatstruktúra
let zoneData = {
    top: {
        alignV: 'center',
        blocks: [] // { id, isNewLine, content, font, size, weight, style, color, alignH (csak ha isNewLine) }
    },
    bottom: {
        alignV: 'center',
        blocks: []
    }
};

// // Alapértelmezett blokk generátor
// function createDefaultBlock(isNewLine) {
//     return {
//         id: Date.now() + Math.random(),
//         isNewLine: isNewLine,
//         content: isNewLine ? "Új sor szövege" : " folyatás...",
//         font: "Space Grotesk",
//         size: isNewLine ? 48 : 32,
//         weight: "normal",
//         style: "normal",
//         color: "#e8edf5",
//         alignH: "middle" // Csak új sornál számít
//     };
// }
// Helper
function createDefaultBlock(isNewLine) {
    return {
        id: Date.now() + Math.random(),
        isNewLine: isNewLine,
        content: isNewLine ? "Új szöveg" : " folytatás...",
        font: "Space Grotesk",
        size: 32,
        weight: "normal",
        style: "normal",
        color: "#e8edf5",
        alignH: "middle"
    };
}
// --- UI KEZELÉS ---

// // Új blokk hozzáadása az adatokhoz és a UI frissítése
// window.addNewBlock = function(zone, isNewLine) {
//     const block = createDefaultBlock(isNewLine);
//     // Ha inline, és nincs még semmi, legyen inkább új sor
//     if (!isNewLine && zoneData[zone].blocks.length === 0) {
//         block.isNewLine = true;
//     }
    
//     // Ha inline, örökölje az előző stílusát (opcionális kényelmi funkció)
//     if (!isNewLine && zoneData[zone].blocks.length > 0) {
//         const last = zoneData[zone].blocks[zoneData[zone].blocks.length-1];
//         block.font = last.font;
//         block.size = last.size;
//         block.color = last.color;
//     }

//     zoneData[zone].blocks.push(block);
//     renderZoneUI(zone);
//     window.renderFixedTexts(); // Térkép frissítése
// }

// // Blokk törlése
// window.removeBlock = function(zone, id) {
//     zoneData[zone].blocks = zoneData[zone].blocks.filter(b => b.id !== id);
//     // Ha az első elem inline lett (mert kitöröltük a szülőjét), legyen új sor
//     if (zoneData[zone].blocks.length > 0 && !zoneData[zone].blocks[0].isNewLine) {
//         zoneData[zone].blocks[0].isNewLine = true;
//     }
//     renderZoneUI(zone);
//     window.renderFixedTexts();
// }

// // Adat frissítése input alapján
// window.updateBlockData = function(zone, id, key, value) {
//     const block = zoneData[zone].blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;
//         window.renderFixedTexts();
//     }
// }
// Elérhető betűtípusok listája
const availableFonts = [
    "Space Grotesk", 
    "Montserrat", 
    "Roboto",
    "Open Sans",
    "Merriweather", 
    "Playfair Display", 
    "Raleway",
    "Great Vibes", 
    "Dancing Script",
    "Cinzel",
    "Allura",
    "Sacramento",
    "MedievalSharp",
    "Uncial Antiqua",
    "Tangerine",
    "Special Elite",
    "Quicksand",
    "Parisienne"
];
// // Adat frissítése input alapján
// window.updateBlockData = function(zone, id, key, value) {
//     const block = zoneData[zone].blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;
        
//         // Mindig frissítjük a térképet (SVG)
//         window.renderFixedTexts();

//         // DE: A UI-t (textarea, select) csak akkor rajzoljuk újra, 
//         // ha NEM a szöveges tartalom változott.
//         // Így gépelés közben nem ugrik el a kurzor.
//         if (key !== 'content') {
//             renderZoneUI(zone);
//         } else {
//             // Ha a tartalom változott, frissítsük a betűtípus választót "kézzel" a háttérben?
//             // Nem szükséges azonnal, mert gépelés közben nem nyitogatja a menüt.
//             // Amint máshova kattint vagy stílust vált, frissülni fog.
//         }
//     }
// }
// Adat frissítése input alapján
// window.updateBlockData = function(zone, id, key, value) {
//     const block = zoneData[zone].blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;
        
//         // 1. A térkép (SVG) mindig frissüljön azonnal
//         window.renderFixedTexts();

//         // 2. A UI kezelése
//         if (key !== 'content') {
//             // Ha NEM szöveget írunk (pl. méret, szín váltás), rajzoljuk újra a panelt
//             renderZoneUI(zone);
//         } else {
//             // 3. CÉLZOTT FRISSÍTÉS: Ha szöveget írunk, csak a font-listát frissítjük a DOM-ban
//             // Így megmarad a fókusz a textareában!
//             const fontSelect = document.getElementById(`font-select-${id}`);
//             if (fontSelect) {
//                 const previewTextRaw = value.trim();
//                 const previewText = previewTextRaw.length > 0 
//                                     ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                                     : "Minta szöveg";
                
//                 // Végigmegyünk az opciókon és frissítjük a szövegüket
//                 Array.from(fontSelect.options).forEach(option => {
//                     const fontName = option.value;
//                     option.text = `${previewText} (${fontName})`;
//                 });
//             }
//         }
//     }
// }

// // Adat frissítése input alapján
// window.updateBlockData = function(zone, id, key, value) {
//     const block = zoneData[zone].blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;

//         // --- 1. UI FRISSÍTÉS (Intelligensen) ---
        
//         if (key === 'content') {
//             // Szövegírásnál csak a font-listát frissítjük (hogy a fókusz megmaradjon)
//             const fontSelect = document.getElementById(`font-select-${id}`);
//             if (fontSelect) {
//                 const previewTextRaw = value.trim();
//                 const previewText = previewTextRaw.length > 0 
//                                     ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                                     : "Minta szöveg";
                
//                 Array.from(fontSelect.options).forEach(option => {
//                     option.text = `${previewText} (${option.value})`;
//                 });
//             }
//         } 
//         else if (key === 'font') {
//             // Font váltásnál újra kell rajzolni a mezőket, hogy látszódjon az új font stílusa
//             renderZoneUI(zone);
//         }
//         else if (key === 'size' || key === 'color' || key === 'weight' || key === 'style' || key === 'alignH') {
//             // OPTIMALIZÁCIÓ: Méret, Szín, Stílus váltásnál NE rajzoljuk újra a UI-t!
//             // 1. A mezőben már ott az új érték (hiszen a felhasználó most állította be).
//             // 2. Ha újrarajzolnánk, elveszne a fókusz a számmezőről.
//             // 3. Így a magasság kijelző div ("height-display") is érintetlen marad, 
//             //    amibe a következő lépés majd beleírja az új értéket.
//         }
//         else {
//             // Minden más esetben (biztonsági tartalék)
//             renderZoneUI(zone);
//         }

//         // --- 2. TÉRKÉP ÉS MAGASSÁG FRISSÍTÉS (MINDIG A VÉGÉN!) ---
//         // Ez végzi a mérést és írja ki az értéket a div-be.
//         // Mivel a fenti "size" ágban nem töröltük le a UI-t, a div megvan,
//         // és belekerül az új, pontos cm érték.
//         window.renderFixedTexts();
//     }
// }


// window.updateZoneAlign = function(zone) {
//     zoneData[zone].alignV = document.getElementById(`${zone}-zone-align-v`).value;
//     window.renderFixedTexts();
// }
// --- SZÖVEG RENDEZÉS (JAVÍTOTT: Helyes store használat) ---
// window.updateZoneAlign = function(zone) {
//     // 1. Az aktuális kontextushoz tartozó adatokat módosítjuk!
//     const data = getCurrentZoneData(zone);
//     if (data) {
//         data.alignV = document.getElementById(`${zone}-zone-align-v`).value;
//         window.renderFixedTexts();
//     }
// }
window.updateZoneAlign = function(zone) {
    const data = getCurrentZoneData(zone);
    if(data) {
        data.alignV = document.getElementById(`${zone}-zone-align-v`).value;
        window.renderFixedTexts();
    }
}
// // A UI (HTML) Generálása a blokkokhoz
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // HTML Template a blokkhoz
//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})">×</button>
//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:12px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px;" title="Méret">
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px;">
//                     <option value="Space Grotesk" ${block.font==='Space Grotesk'?'selected':''}>Space Grotesk</option>
//                     <option value="Montserrat" ${block.font==='Montserrat'?'selected':''}>Montserrat</option>
//                     <option value="Merriweather" ${block.font==='Merriweather'?'selected':''}>Merriweather</option>
//                     <option value="Great Vibes" ${block.font==='Great Vibes'?'selected':''}>Great Vibes</option>
//                     <option value="Playfair Display" ${block.font==='Playfair Display'?'selected':''}>Playfair</option>
//                 </select>
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
        
//         // Fókusz kezelés (hogy gépelés közben ne vesszen el) - Egyszerűsítve most nem implementáljuk a fókusztartást renderelésnél, de élesben hasznos lehet.
//         container.appendChild(div);
//     });
// }

// // A UI (HTML) Generálása a blokkokhoz
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // --- 1. Betűtípus választó opciók generálása ---
//         // Azt a szöveget mutatjuk, amit a felhasználó beírt.
//         // Ha üres, akkor a betűtípus nevét.
//         // Ha túl hosszú, levágjuk az elejét (pl. 25 karakter).
//         const previewTextRaw = block.content.trim(); 
//         const previewText = previewTextRaw.length > 0 
//                             ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                             : "Minta szöveg";

//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             // Itt a trükk: inline style-t adunk az option-nek
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>
//                         ${previewText} (${fontName})
//                     </option>`;
//         }).join('');

//         // --- 2. HTML Template összeállítása ---
//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})">×</button>
//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:16px; font-family: '${block.font}'; min-height: 40px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <div>
//                     <input type="number" value="${block.size}" onchange="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px; width: 100%;" title="Méret (px)">
//                     <div id="height-display-${block.id}" style="font-size:10px; color:var(--text-secondary); margin-top:2px; text-align:right;">...</div>
//                 </div>
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//                     ${fontOptionsHTML}
//                 </select>
                
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
//             // <div class="grid-2-cols" style="gap:5px;">
//             //     <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//             //         ${fontOptionsHTML}
//             //     </select>
//             //     <input type="number" value="${block.size}" onchange="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px;" title="Méret">
//             //     <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             // </div>
//                 // <input type="number" value="${block.size}" onchange="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px;" title="Méret">
        
//         container.appendChild(div);
        
//         // Fókusz visszaállítása (Opcionális, de jobb felhasználói élményt ad)
//         // Ha éppen gépel a felhasználó, ne vesszen el a fókusz újrarajzoláskor
//         const textarea = div.querySelector('textarea');
//         if (textarea && document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
//              // Itt lehetne finomhangolni a fókusztartást, de 
//              // mivel a 'change' eseményre renderelünk újra, gépelés közben nem villog.
//              // Az 'oninput' viszont minden karakternél renderel.
//              // Megoldás: A textarea oninput-ja NE hívjon renderZoneUI-t, csak updateBlockData-t render nélkül?
//              // Ez bonyolultabb, most hagyjuk így, a textareában a font azonnal látszik.
//         }
//     });
// }

// // A UI (HTML) Generálása a blokkokhoz
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // Betűtípus opciók generálása (marad a régi)
//         const previewTextRaw = block.content.trim(); 
//         const previewText = previewTextRaw.length > 0 
//                             ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                             : "Minta szöveg";

//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>
//                         ${previewText} (${fontName})
//                     </option>`;
//         }).join('');

//         // Igazítás választó (csak új sornál)
//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
//                 <button class="symbol-btn" onclick="addSymbolToBlock('${zone}', ${block.id})" title="Szimbólum beszúrása" style="background:none; border:none; color:var(--accent-purple); cursor:pointer; font-size:16px;">♥</button>
//                 <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})" title="Törlés" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px;">×</button>
//             </div>

//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px; padding-right: 50px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" id="textarea-${block.id}" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:16px; font-family: '${block.font}'; min-height: 40px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <div>
//                     <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px; width: 100%;" title="Méret (px)">
//                     <div id="height-display-${block.id}" style="font-size:10px; color:var(--text-secondary); margin-top:2px; text-align:right;">...</div>
//                 </div>
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//                     ${fontOptionsHTML}
//                 </select>
                
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
        
//         container.appendChild(div);
//     });
// }

// // A UI (HTML) Generálása a blokkokhoz
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // Betűtípus opciók generálása
//         const previewTextRaw = block.content.trim(); 
//         const previewText = previewTextRaw.length > 0 
//                             ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                             : "Minta szöveg";

//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>
//                         ${previewText} (${fontName})
//                     </option>`;
//         }).join('');

//         // Igazítás választó (csak új sornál)
//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})" title="Törlés" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px;">×</button>

//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px; padding-right: 20px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" id="textarea-${block.id}" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:16px; font-family: '${block.font}'; min-height: 40px;">${block.content}</textarea>
            
            
//             <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
//                 <button class="symbol-btn" onclick="addSymbolToBlock(event, '${zone}', '${block.id}')" title="Szimbólum beszúrása" style="background:none; border:none; color:var(--accent-purple); cursor:pointer; font-size:16px;">♥</button>
//                 <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})" title="Törlés" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px;">×</button>
//             </div>

//             <div class="grid-2-cols" style="gap:5px;">
//                 <div>
//                     <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px; width: 100%;" title="Méret (px)">
//                     <div id="height-display-${block.id}" style="font-size:10px; color:var(--text-secondary); margin-top:2px; text-align:right;">...</div>
//                 </div>
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//                     ${fontOptionsHTML}
//                 </select>
                
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
        
//         container.appendChild(div);
//     });
// }           
            // <div style="margin-bottom: 8px;">
            //     <button onclick="addSymbolToBlock('${zone}', '${block.id}')" class="add-btn accent" style="width: auto; padding: 4px 10px; font-size: 12px;">
            //         ♥ Szimbólum beszúrása
            //     </button>
            // </div>

// // A UI (HTML) Generálása a blokkokhoz
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // Betűtípus opciók generálása
//         const previewTextRaw = block.content.trim(); 
//         const previewText = previewTextRaw.length > 0 
//                             ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                             : "Minta szöveg";

//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>
//                         ${previewText} (${fontName})
//                     </option>`;
//         }).join('');

//         // Igazítás választó (csak új sornál)
//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})" title="Törlés" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px; position: absolute; top: 5px; right: 5px;">×</button>

//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px; padding-right: 20px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" id="textarea-${block.id}" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:16px; font-family: '${block.font}'; min-height: 40px;">${block.content}</textarea>
            
//             <div style="margin-bottom: 8px;">
//                 <button onclick="addSymbolToBlock(event, '${zone}', '${block.id}')" class="add-btn accent" style="width: auto; padding: 4px 10px; font-size: 12px;">
//                     ♥ Szimbólum beszúrása
//                 </button>
//             </div>

//             <div class="grid-2-cols" style="gap:5px;">
//                 <div>
//                     <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px; width: 100%;" title="Méret (px)">
//                     <div id="height-display-${block.id}" style="font-size:10px; color:var(--text-secondary); margin-top:2px; text-align:right;">...</div>
//                 </div>
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//                     ${fontOptionsHTML}
//                 </select>
                
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
        
//         container.appendChild(div);
//     });
// }

// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';

//     zoneData[zone].blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         const previewTextRaw = block.content.trim(); 
//         const previewText = previewTextRaw.length > 0 
//                             ? (previewTextRaw.length > 25 ? previewTextRaw.substring(0, 25) + "..." : previewTextRaw) 
//                             : "Minta szöveg";

//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>
//                         ${previewText} (${fontName})
//                     </option>`;
//         }).join('');

//         let alignSelector = '';
//         if (block.isNewLine) {
//             alignSelector = `
//                 <div class="setting-group" style="margin-bottom:5px;">
//                     <label style="font-size:11px;">Igazítás:</label>
//                     <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)" style="padding:2px;">
//                         <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                         <option value="middle" ${block.alignH==='middle'?'selected':''}>Középre</option>
//                         <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                     </select>
//                 </div>
//             `;
//         }

//         div.innerHTML = `
//             <button class="remove-block" onclick="removeBlock('${zone}', ${block.id})" title="Törlés" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px; position: absolute; top: 5px; right: 5px;">×</button>

//             <div style="font-size:11px; color:var(--accent-cyan); margin-bottom:5px; padding-right: 20px;">
//                 ${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE BLOKK'}
//             </div>
            
//             <textarea rows="1" id="textarea-${block.id}" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; margin-bottom:5px; padding:5px; font-size:16px; font-family: '${block.font}'; min-height: 40px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <div>
//                     <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" style="padding:4px; width: 100%;" title="Méret (px)">
//                     <div id="height-display-${block.id}" style="font-size:10px; color:var(--text-secondary); margin-top:2px; text-align:right;">...</div>
//                 </div>
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px; padding:0;">
//             </div>
            
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="padding:2px; font-family: '${block.font}';">
//                     ${fontOptionsHTML}
//                 </select>
                
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'weight', this.value)" style="padding:2px;">
//                     <option value="normal" ${block.weight==='normal'?'selected':''}>Normal</option>
//                     <option value="bold" ${block.weight==='bold'?'selected':''}>Bold</option>
//                     <option value="300" ${block.weight==='300'?'selected':''}>Thin</option>
//                 </select>
//             </div>
//             ${alignSelector}
//         `;
//         container.appendChild(div);
//     });
// }


// // --- RENDERELÉS (SVG) ---
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = '';

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const paperW = paperVB[2];
//     const paperH = paperVB[3];
//     const margin = paperW * 0.05;

//     // Térkép pozíció mérése (ugyanaz, mint előzőleg)
//     let mapTopY = 0;
//     let mapBottomY = paperH; 
//     const transformStr = transformGroup.getAttribute('transform');
//     if (transformStr) {
//         const translateMatch = transformStr.match(/translate\(([^,]+),\s*([^)]+)\)/);
//         const scaleMatch = transformStr.match(/scale\(([^)]+)\)/);
//         if (translateMatch && scaleMatch) {
//             const transY = parseFloat(translateMatch[2]);
//             const scale = parseFloat(scaleMatch[1]);
//             const mapSvg = mapLayer.querySelector('svg');
//             const bbox = getMapContentBBox(mapSvg);
//             mapTopY = transY + (bbox.y * scale);
//             mapBottomY = transY + (bbox.y * scale) + (bbox.height * scale);
//         }
//     }

//     // Renderelés zónánként
//     renderComplexZone('top', 0, mapTopY, paperW, margin);
//     renderComplexZone('bottom', mapBottomY, paperH, paperW, margin);
// }

// function renderComplexZone(zone, startY, endY, paperW, margin) {
//     const blocks = zoneData[zone].blocks;
//     if (blocks.length === 0) return;

//     // 1. DOM elemek létrehozása (láthatatlanul, méréshez)
//     // Csoportosítjuk őket sorokba (Text Elementek)
//     let textGroups = [];
//     let currentTextEl = null;

//     blocks.forEach(block => {
//         if (block.isNewLine) {
//             // Új <text> elem
//             currentTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
//             // Beállítások az Új sorhoz
//             let x = 0;
//             if (block.alignH === 'start') x = margin;
//             else if (block.alignH === 'middle') x = paperW / 2;
//             else if (block.alignH === 'end') x = paperW - margin;
            
//             currentTextEl.setAttribute('x', x);
//             currentTextEl.setAttribute('text-anchor', block.alignH);
            
//             // Hozzáadjuk a listához
//             textGroups.push(currentTextEl);
//             document.getElementById('text-layer').appendChild(currentTextEl);
//         }

//         // TSPAN hozzáadása
//         if (currentTextEl) {
//             const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
//             tspan.textContent = block.content;
//             tspan.setAttribute('font-family', block.font);
//             tspan.setAttribute('font-size', block.size);
//             tspan.setAttribute('font-weight', block.weight);
//             tspan.setAttribute('font-style', block.style);
//             tspan.setAttribute('fill', block.color);
            
//             // Fontos: Inline elemeknél nem állítunk x-et, így folytonos marad!
//             // Csak az első tspan kaphatna x-et, de a parent text már kezeli.
            
//             currentTextEl.appendChild(tspan);
//         }
//     });

//     // 2. Magasság mérése és pozicionálás
//     // Végigmegyünk a létrehozott <text> elemeken, megmérjük őket, és beállítjuk az Y-t.
    
//     let totalHeight = 0;
//     let lineHeights = [];
    
//     textGroups.forEach(textEl => {
//         const bbox = textEl.getBBox();
//         // A bbox.height a teljes magasság (ascender + descender)
//         // Kicsit lazább sorközért szorzunk 1.1-gyel
//         lineHeights.push(bbox.height);
//         totalHeight += bbox.height;
//     });

//     // Zóna magassága
//     const zoneH = endY - startY;
//     let currentY = 0;

//     // Kezdő Y kiszámítása a zóna igazítása alapján
//     if (zoneData[zone].alignV === 'top') {
//         currentY = startY + margin;
//     } else if (zoneData[zone].alignV === 'center') {
//         currentY = startY + (zoneH - totalHeight) / 2;
//     } else if (zoneData[zone].alignV === 'bottom') {
//         currentY = endY - totalHeight - margin;
//     }

//     // Alkalmazzuk az Y koordinátákat
//     // Fontos: Az SVG text y a baseline. A bbox.y általában negatív.
//     // Korrigálni kell, hogy a bbox teteje legyen a currentY-nál.
    
//     textGroups.forEach((textEl, index) => {
//         const bbox = textEl.getBBox();
//         // Mennyit kell tolni lefelé, hogy a teteje a currentY-nál legyen?
//         // bbox.y (pl -30) -> eltolás = -bbox.y (+30)
        
//         const correction = -bbox.y; 
//         textEl.setAttribute('y', currentY + correction);
        
//         // Növeljük az Y-t a következő sorhoz (plusz kis sorköz)
//         currentY += bbox.height + (bbox.height * 0.1); 
//     });
// }


// function renderComplexZone(zone, startY, endY, paperW, margin) {
//     const blocks = zoneData[zone].blocks;
//     if (blocks.length === 0) return;

//     let textGroups = [];
//     let currentTextEl = null;

//     // 1. DOM elemek létrehozása
//     blocks.forEach(block => {
//         if (block.isNewLine) {
//             currentTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            
//             let x = 0;
//             if (block.alignH === 'start') x = margin;
//             else if (block.alignH === 'middle') x = paperW / 2;
//             else if (block.alignH === 'end') x = paperW - margin;
            
//             currentTextEl.setAttribute('x', x);
//             currentTextEl.setAttribute('text-anchor', block.alignH);
            
//             textGroups.push(currentTextEl);
//             document.getElementById('text-layer').appendChild(currentTextEl);
//         }

//         if (currentTextEl) {
//             const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
//             // FONTOS: Adunk neki egy ID-t, hogy később meg tudjuk mérni
//             tspan.setAttribute('id', `svg-block-render-${block.id}`);
            
//             tspan.textContent = block.content;
//             tspan.setAttribute('font-family', block.font);
//             tspan.setAttribute('font-size', block.size);
//             tspan.setAttribute('font-weight', block.weight);
//             tspan.setAttribute('font-style', block.style);
//             tspan.setAttribute('fill', block.color);
            
//             currentTextEl.appendChild(tspan);
//         }
//     });

//     // 2. Magasság mérése és Pozicionálás
//     let totalHeight = 0;
    
//     textGroups.forEach(textEl => {
//         const bbox = textEl.getBBox();
//         // Ascender/Descender korrekció (opcionális, de szebb így)
//         const lineHeight = bbox.height; 
        
//         // Eltároljuk az elemen a magasságát a későbbi pozicionáláshoz
//         textEl.dataset.height = lineHeight;
//         textEl.dataset.bboxY = bbox.y; // A relatív eltolás a baseline-hoz képest
        
//         totalHeight += lineHeight;
//     });

//     // Zóna magassága és Start Y
//     const zoneH = endY - startY;
//     let currentY = 0;

//     if (zoneData[zone].alignV === 'top') {
//         currentY = startY + margin;
//     } else if (zoneData[zone].alignV === 'center') {
//         // Középre igazításnál figyelembe vesszük a sorközöket is (itt most egyszerűsítve 0)
//         currentY = startY + (zoneH - totalHeight) / 2;
//     } else if (zoneData[zone].alignV === 'bottom') {
//         currentY = endY - totalHeight - margin;
//     }

//     // 3. Végleges pozíciók és UI FRISSÍTÉS (Mérés)
//     textGroups.forEach((textEl) => {
//         const h = parseFloat(textEl.dataset.height);
//         const bboxY = parseFloat(textEl.dataset.bboxY);
        
//         // Korrekció: a bbox tetejét toljuk a currentY-hoz
//         const correction = -bboxY;
//         textEl.setAttribute('y', currentY + correction);
        
//         currentY += h; // Következő sor lejjebb
//     });

// //     // --- ÚJ RÉSZ: Visszajelzés a UI-nak a pontos méretekről ---
// //     blocks.forEach(block => {
// //         // Megkeressük az SVG-ben a blokkhoz tartozó elemet
// //         const svgEl = document.getElementById(`svg-block-render-${block.id}`);
// //         const uiEl = document.getElementById(`height-display-${block.id}`);
        
// //         if (svgEl && uiEl) {
// //             try {
// //                 // Megmérjük a pontos méretét
// //                 const bbox = svgEl.getBBox();
// //                 // Kiírjuk a UI-ra (pixelben, 1 tizedesjegyre)
// //                 uiEl.textContent = `Magasság: ${bbox.height.toFixed(1)} px`;
// //             } catch (e) {
// //                 uiEl.textContent = "";
// //             }
// //         }
// //     });
// // }
//     // --- ÚJ RÉSZ: Visszajelzés a UI-nak (CM-ben) ---
    
//     // 1. Váltószám kiszámítása (Hány pixel 1 cm?)
//     // A 'paperW' a viewBox szélessége pixelben (ezt a függvény már megkapta paraméterként)
//     const canvasWidthInput = document.getElementById('canvas-width');
//     const paperWidthCm = parseFloat(canvasWidthInput.value) || 21; // Ha nincs érték, alapértelmezett 21
    
//     const pxPerCm = paperW / paperWidthCm;

//     blocks.forEach(block => {
//         // Megkeressük az SVG-ben a blokkhoz tartozó elemet
//         const svgEl = document.getElementById(`svg-block-render-${block.id}`);
//         const uiEl = document.getElementById(`height-display-${block.id}`);
        
//         if (svgEl && uiEl) {
//             try {
//                 // Megmérjük a pontos méretét pixelben
//                 const bbox = svgEl.getBBox();
                
//                 // Átváltjuk cm-re
//                 const heightCm = bbox.height / pxPerCm;
                
//                 // Kiírjuk 2 tizedesjegy pontossággal
//                 uiEl.textContent = `Magasság: ${heightCm.toFixed(2)} cm`;
//             } catch (e) {
//                 uiEl.textContent = "";
//             }
//         }
//     });
// }


// // --- SZIMBÓLUM KEZELŐ ---
// let activeSymbolZone = null;

// window.addSymbol = function(zone) {
//     activeSymbolZone = zone;
//     $('#symbol-picker').fadeIn();
// }

// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone) {
//         // Hozzáadunk egy új INLINE blokkot a szimbólummal
//         const block = createDefaultBlock(false); // false = inline
//         block.content = " " + symbol + " "; // Kis térköz
        
//         // Ha van előző blokk, másoljuk a stílust
//         const blocks = zoneData[activeSymbolZone].blocks;
//         if (blocks.length > 0) {
//             const last = blocks[blocks.length-1];
//             block.font = last.font;
//             block.size = last.size;
//             block.color = last.color;
//         } else {
//             // Ha ez az első, muszáj új sornak lennie
//             block.isNewLine = true;
//         }

//         zoneData[activeSymbolZone].blocks.push(block);
//         renderZoneUI(activeSymbolZone);
//         window.renderFixedTexts();
        
//         $('#symbol-picker').fadeOut();
//     }
// }

// // --- SZIMBÓLUM KEZELŐ (JAVÍTOTT) ---
// let activeSymbolZone = null;
// let activeSymbolBlockId = null;

// // Gombnyomásra hívódik meg a blokk fejlécéből
// window.addSymbolToBlock = function(zone, blockId) {
//     activeSymbolZone = zone;
//     activeSymbolBlockId = blockId;
//     $('#symbol-picker').fadeIn();
// }

// // A szimbólum kiválasztásakor hívódik meg
// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone && activeSymbolBlockId) {
//         // Megkeressük a blokkot
//         const block = zoneData[activeSymbolZone].blocks.find(b => b.id === activeSymbolBlockId);
        
//         if (block) {
//             // Hozzáfűzzük a szimbólumot a meglévő tartalomhoz
//             // Egy szóközt teszünk elé, ha nincs ott
//             block.content += symbol;
            
//             // 1. Frissítjük az adatokat és a térképet
//             // "Kézzel" hívjuk az update logikát, mintha gépeltünk volna
//             window.updateBlockData(activeSymbolZone, activeSymbolBlockId, 'content', block.content);
            
//             // 2. Frissítjük a textarea-t is a felületen (hogy látszódjon a jel)
//             const textarea = document.getElementById(`textarea-${block.id}`);
//             if (textarea) {
//                 textarea.value = block.content;
//             }
//         }
        
//         $('#symbol-picker').fadeOut();
        
//         // Reset
//         activeSymbolZone = null;
//         activeSymbolBlockId = null;
//     }
// }

// // --- SZIMBÓLUM KEZELŐ (JAVÍTOTT V2) ---
// let activeSymbolZone = null;
// let activeSymbolBlockId = null;

// // Gombnyomásra hívódik meg a blokk alól
// // Fontos: a blockId stringként érkezik az onclick-ből
// window.addSymbolToBlock = function(zone, blockId) {
//     console.log("Szimbólum kérés:", zone, blockId); // Debug
//     activeSymbolZone = zone;
//     activeSymbolBlockId = blockId; // Most már string vagy szám, mindegy
//     $('#symbol-picker').fadeIn();
// }

// // A szimbólum kiválasztásakor hívódik meg
// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone && activeSymbolBlockId) {
//         // Megkeressük a blokkot
//         // JAVÍTÁS: '==' jelet használunk (kettőt), nem hármat, 
//         // hogy a string "123" és a szám 123 egyezzen!
//         const block = zoneData[activeSymbolZone].blocks.find(b => b.id == activeSymbolBlockId);
        
//         if (block) {
//             // Hozzáfűzzük a szimbólumot
//             block.content += symbol;
            
//             // Frissítjük a térképet és a UI-t
//             window.updateBlockData(activeSymbolZone, block.id, 'content', block.content);
            
//             // Frissítjük a textarea értékét is azonnal, hogy látszódjon
//             const textarea = document.getElementById(`textarea-${block.id}`);
//             if (textarea) {
//                 textarea.value = block.content;
//                 // Opcionális: Fókusz visszaadása
//                 textarea.focus();
//             }
//         } else {
//             console.error("Hiba: Nem található a blokk ezzel az ID-val:", activeSymbolBlockId);
//         }
        
//         $('#symbol-picker').fadeOut();
        
//         // Reset
//         activeSymbolZone = null;
//         activeSymbolBlockId = null;
//     }
// }

// --- SZIMBÓLUM KEZELŐ (POZICIONÁLT + CLICK-OUTSIDE) ---
// let activeSymbolZone = null;
// let activeSymbolBlockId = null;

// Gombnyomásra hívódik meg
window.addSymbolToBlock = function(event, zone, blockId) {
    // Megállítjuk az eseményt, hogy ne fusson tovább (így nem záródik be azonnal)
    event.stopPropagation();
    
    activeSymbolZone = zone;
    activeSymbolBlockId = blockId;
    
    const picker = $('#symbol-picker');
    
    // 1. POZICIONÁLÁS AZ EGÉRHEZ
    // Lekérjük a kattintás koordinátáit
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Beállítjuk a picker pozícióját
    // Egy kicsit balra és lejjebb toljuk, hogy ne takarja ki a gombot
    picker.css({
        'top': (mouseY + 20) + 'px',
        'left': (mouseX - 100) + 'px', // Középre igazítás az egérhez képest
        'transform': 'none' // Kikapcsoljuk a régi translate(-50%, -50%) centerezést
    });
    
    picker.fadeIn(200);
}

// // A szimbólum kiválasztásakor hívódik meg
// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone && activeSymbolBlockId) {
//         // == jel kell a biztonság kedvéért (string vs number id)
//         const block = zoneData[activeSymbolZone].blocks.find(b => b.id == activeSymbolBlockId);
        
//         if (block) {
//             block.content += symbol;
            
//             // Frissítés
//             window.updateBlockData(activeSymbolZone, block.id, 'content', block.content);
            
//             const textarea = document.getElementById(`textarea-${block.id}`);
//             if (textarea) {
//                 textarea.value = block.content;
//                 textarea.focus();
//             }
//         }
        
//         $('#symbol-picker').fadeOut(200);
//         activeSymbolZone = null;
//         activeSymbolBlockId = null;
//     }
// }

// Gombnyomásra hívódik meg
// window.openSymbolPicker = function(event, zone) {
//     // Megállítjuk az eseményt
//     event.stopPropagation();
//     event.preventDefault();
    
//     activeSymbolZone = zone;
//     const picker = $('#symbol-picker');
    
//     // 1. POZICIONÁLÁS A GOMBHOZ (Fix, biztos módszer)
//     const button = event.currentTarget; // A megnyomott gomb
//     const rect = button.getBoundingClientRect(); // A gomb pontos helye a képernyőn
    
//     // Kiszámoljuk, hova kerüljön (a gomb fölé, középre igazítva)
//     // A picker szélessége kb 300px, magassága változó
    
//     // Alaphelyzetbe állítjuk a stílust, hogy a JS számítás érvényesüljön
//     picker.css({
//         'display': 'block',
//         'visibility': 'hidden' // Először láthatatlanul megjelenítjük, hogy legyen mérete
//     });
    
//     const pickerHeight = picker.outerHeight();
//     const pickerWidth = picker.outerWidth();
    
//     // Gomb közepe
//     const btnCenter = rect.left + (rect.width / 2);
    
//     // Pozíciók (Gomb fölé 10 pixellel)
//     let top = rect.top - pickerHeight - 10;
//     let left = btnCenter - (pickerWidth / 2);
    
//     // Ha kilógna felül, tegyük a gomb alá
//     if (top < 0) {
//         top = rect.bottom + 10;
//     }
    
//     // Alkalmazzuk
//     picker.css({
//         'top': top + 'px',
//         'left': left + 'px',
//         'transform': 'none', // Kikapcsoljuk a CSS közepre igazítást
//         'visibility': 'visible',
//         'display': 'none' // Visszaállítjuk, hogy a fadeIn működjön
//     });
    
//     picker.fadeIn(200);
// }

// // A szimbólum kiválasztásakor hívódik meg
// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone) {
//         const blocks = zoneData[activeSymbolZone].blocks;
        
//         if (blocks.length > 0) {
//             // HA VAN BLOKK: Az utolsóhoz fűzzük hozzá
//             const lastBlock = blocks[blocks.length - 1];
            
//             lastBlock.content += symbol;
            
//             // Frissítés
//             window.updateBlockData(activeSymbolZone, lastBlock.id, 'content', lastBlock.content);
            
//             // Textarea frissítése
//             const textarea = document.getElementById(`textarea-${lastBlock.id}`);
//             if (textarea) {
//                 textarea.value = lastBlock.content;
//                 // Fókusz visszaadása az utolsó mezőre
//                 textarea.focus();
//             }
//         } else {
//             // HA NINCS BLOKK: Létrehozunk egy újat a szimbólummal
//             const block = createDefaultBlock(true); // Új sor
//             block.content = symbol;
//             zoneData[activeSymbolZone].blocks.push(block);
//             renderZoneUI(activeSymbolZone);
//             window.renderFixedTexts();
//         }
        
//         $('#symbol-picker').fadeOut(200);
//         activeSymbolZone = null;
//     }
// }

// // Inicializáláskor hozzunk létre 1-1 alap sort, hogy ne legyen üres
// $(document).ready(function() {
//     if(zoneData.top.blocks.length === 0) addNewBlock('top', true);
//     if(zoneData.bottom.blocks.length === 0) addNewBlock('bottom', true);
    
//     // Frissítés
//     setTimeout(window.renderFixedTexts, 500);
// });

// --- SZIMBÓLUM KEZELŐ (JAVÍTOTT POZÍCIÓ ÉS LÁTHATÓSÁG) ---
let activeSymbolZone = null;
let activeSymbolBlockId = null;

// // Gombnyomásra hívódik meg
// window.openSymbolPicker = function(event, zone) {
//     // Megállítjuk az eseményt
//     event.stopPropagation();
//     event.preventDefault();
    
//     activeSymbolZone = zone;
//     const picker = $('#symbol-picker');
    
//     // 1. BIZTOSÍTÁS: Mozgassuk a BODY végére, ha még nincs ott
//     // Ez megoldja a "nem látszik gépen" problémát, mert kikerül a takaró rétegek alól
//     if (picker.parent().prop("tagName") !== "BODY") {
//         picker.appendTo("body");
//     }
    
//     // 2. POZICIONÁLÁS A GOMBHOZ
//     const button = event.currentTarget; // A megnyomott gomb
//     const rect = button.getBoundingClientRect(); // A gomb helye a képernyőn (viewportban)
    
//     // Alaphelyzetbe állítjuk a stílust a méréshez
//     picker.css({
//         'display': 'block',
//         'visibility': 'hidden',
//         'position': 'fixed',
//         'z-index': '9999999' // Maximális prioritás
//     });
    
//     const pickerHeight = picker.outerHeight();
//     const pickerWidth = picker.outerWidth();
//     const windowW = $(window).width();
//     const windowH = $(window).height();
    
//     // Gomb közepe
//     const btnCenter = rect.left + (rect.width / 2);
    
//     // Vízszintes pozíció (Balra igazítva, de a képernyőn belül tartva)
//     let left = btnCenter - (pickerWidth / 2);
    
//     // Ha kilógna balra
//     if (left < 10) left = 10;
//     // Ha kilógna jobbra
//     if (left + pickerWidth > windowW) left = windowW - pickerWidth - 10;
    
//     // Függőleges pozíció (Gomb fölé)
//     let top = rect.top - pickerHeight - 10;
    
//     // Ha kilógna felül (nincs elég hely), tegyük a gomb alá
//     if (top < 10) {
//         top = rect.bottom + 10;
//     }
    
//     // Alkalmazzuk
//     picker.css({
//         'top': top + 'px',
//         'left': left + 'px',
//         'transform': 'none', // Kikapcsoljuk a CSS közepre igazítást
//         'visibility': 'visible',
//         'display': 'none' // Vissza a fadeIn-hez
//     });
    
//     picker.fadeIn(200);
// }
window.openSymbolPicker = function(event, zone, blockId) {
    event.stopPropagation();
    event.preventDefault();
    
    activeSymbolZone = zone;
    activeSymbolBlockId = blockId;
    console.log("window.openSymbolPicker activeSymbolBlockId", activeSymbolBlockId);
    const picker = $('#symbol-picker');
    if (picker.parent().prop("tagName") !== "BODY") picker.appendTo("body");
    
    const rect = event.currentTarget.getBoundingClientRect();
    const pickerWidth = picker.outerWidth();
    
    picker.css({
        'display': 'block',
        'visibility': 'hidden',
        'position': 'fixed',
        'z-index': '9999999'
    });
    
    let left = rect.left + (rect.width/2) - (pickerWidth/2);
    let top = rect.top - picker.outerHeight() - 10;
    // Ha kilógna felül, tegyük alá
    if (top < 0) top = rect.bottom + 10;
    picker.css({ 'top': top + 'px', 'left': left + 'px', 'visibility': 'visible', 'display': 'none' });
    picker.fadeIn(200);
}
// A szimbólum kiválasztásakor hívódik meg
// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone) {
//         const blocks = zoneData[activeSymbolZone].blocks;
        
//         if (blocks.length > 0) {
//             // HA VAN BLOKK: Az utolsóhoz fűzzük hozzá
//             const lastBlock = blocks[blocks.length - 1];
            
//             // Hozzáadjuk (szóközzel elválasztva, ha kell)
//             lastBlock.content += symbol;
            
//             // Frissítés
//             window.updateBlockData(activeSymbolZone, lastBlock.id, 'content', lastBlock.content);
            
//             // UI Frissítése (ha éppen látszik a textarea)
//             // Megpróbáljuk megkeresni a textarea-t
//             // Mivel a renderZoneUI dinamikus, lehet, hogy újra kell rajzolni a zónát, 
//             // hogy a textarea frissüljön, de az updateBlockData ezt megteszi, ha nem 'content'-et frissítünk.
//             // Itt viszont 'content'-et frissítettünk, ami "letiltotta" a renderelést.
//             // Ezért kézzel frissítjük a textarea értékét:
            
//             // Megkeressük a zóna konténerét
//             const container = document.getElementById(`${activeSymbolZone}-blocks-container`);
//             // Megkeressük benne az utolsó textarea-t
//             const textareas = container.getElementsByTagName('textarea');
//             if (textareas.length > 0) {
//                 textareas[textareas.length - 1].value = lastBlock.content;
//                 textareas[textareas.length - 1].focus(); // Fókusz visszaadása
//             }
            
//         } else {
//             // HA NINCS BLOKK: Létrehozunk egy újat a szimbólummal
//             // Ilyenkor muszáj új sort létrehozni
//             window.addNewBlock(activeSymbolZone, true);
//             // És beleírjuk a szimbólumot
//             const newBlock = zoneData[activeSymbolZone].blocks[0];
//             newBlock.content = symbol;
//             window.updateBlockData(activeSymbolZone, newBlock.id, 'content', symbol);
            
//             // UI frissítése (hogy látszódjon a textarea-ban)
//             renderZoneUI(activeSymbolZone);
//         }
        
//         $('#symbol-picker').fadeOut(200);
//         activeSymbolZone = null;
//     }
// }


// window.insertSymbol = function(symbol) {
//     if (activeSymbolZone && activeSymbolBlockId) {
//         const block = zoneDataStore[currentTextContext][activeSymbolZone].blocks.find(b => b.id === activeSymbolBlockId);
//         if (block) {
//             block.content += symbol;
//             renderZoneUI(activeSymbolZone);
//             window.renderFixedTexts();
//         }
//     }
//     $('#symbol-picker').fadeOut(200);
// }
window.insertSymbol = function(symbol) {
    console.log("window.insertSymbol symbol", symbol);
    console.log("window.insertSymbol activeSymbolZone", activeSymbolZone);
    console.log("window.insertSymbol activeSymbolBlockId", activeSymbolBlockId);
    if (activeSymbolZone && activeSymbolBlockId) {
        // JAVÍTÁS: == operátor, mert az id szám, de lehet stringként jön vissza
        const block = zoneDataStore[currentTextContext][activeSymbolZone].blocks.find(b => b.id == activeSymbolBlockId);
        
    console.log("window.insertSymbol block", block);
        if (block) {
            block.content += symbol;
            
            // 1. Térkép frissítése
            window.renderFixedTexts();
            
            // 2. Textarea frissítése közvetlenül (jobb felhasználói élmény)
            const textarea = document.getElementById(`textarea-${block.id}`);
            if (textarea) {
                textarea.value = block.content;
                textarea.focus();
            } else {
                // Ha valamiért nem találja a textarea-t, rendereljük újra a UI-t
                renderZoneUI(activeSymbolZone);
            }
        }
    }
    $('#symbol-picker').fadeOut(200);
}
function renderSingleTextField(pos, zoneStartY, zoneEndY, paperW, margin) {
    const config = fixedTextConfig[pos];
    if (!config.content || config.content.trim() === "") return;

    // Sorok feldolgozása
    const lines = config.content.split('\n');
    
    // --- 1. Vízszintes (X) Pozíció Margóval ---
    let x = 0;
    if (config.alignH === 'start') {
        x = margin; // Balra igazításnál margó
    } else if (config.alignH === 'middle') {
        x = paperW / 2; // Középre
    } else if (config.alignH === 'end') {
        x = paperW - margin; // Jobbra igazításnál margó
    }

    // --- 2. Ideiglenes Létrehozás (Méréshez) ---
    // Először létrehozzuk a szöveget 0 pozícióban, hogy meg tudjuk mérni
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute('x', x);
    textEl.setAttribute('y', 0); // Ideiglenes Y
    textEl.setAttribute('font-family', config.font);
    textEl.setAttribute('font-size', config.size);
    textEl.setAttribute('font-weight', config.weight);
    textEl.setAttribute('font-style', config.style);
    textEl.setAttribute('fill', config.color);
    textEl.setAttribute('text-anchor', config.alignH);
    
    // TSPAN-ok hozzáadása
    lines.forEach((line, index) => {
        const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.textContent = line;
        tspan.setAttribute('x', x);
        // Az első sornál nincs eltolás, a többinél 1.2em sorköz
        tspan.setAttribute('dy', index === 0 ? 0 : '1.2em');
        textEl.appendChild(tspan);
    });

    // Hozzáadjuk a DOM-hoz, hogy a böngésző kiszámolja a méreteket
    const textLayer = document.getElementById('text-layer');
    textLayer.appendChild(textEl);

    // --- 3. Mérés és Pozícionálás (A lényeg!) ---
    // Lekérjük a szöveg valós dobozát (bounding box)
    const bbox = textEl.getBBox();
    
    // Kiszámoljuk, mennyit kell tolni az Y tengelyen
    let finalY = 0;
    
    const zoneHeight = zoneEndY - zoneStartY;
    
    // A bbox.y általában negatív (mert az alapvonal felett van a betű java),
    // vagy pozitív, ha dy-t használtunk.
    // A cél az, hogy a bbox.y (teteje) vagy bbox.y+bbox.height (alja) kerüljön a megfelelő helyre.

    if (config.alignV === 'top') {
        // CÉL: A doboz teteje (bbox.y) legyen a (ZónaTeteje + Margó) pozícióban.
        // Jelenlegi tető: 0 + bbox.y
        // Kívánt tető: zoneStartY + margin
        // Eltolás = Kívánt - Jelenlegi
        const targetTop = zoneStartY + margin;
        finalY = targetTop - bbox.y;
        
    } else if (config.alignV === 'center') {
        // CÉL: A doboz közepe legyen a Zóna közepén.
        // Jelenlegi közép: 0 + bbox.y + (bbox.height / 2)
        // Kívánt közép: zoneStartY + (zoneHeight / 2)
        const targetCenter = zoneStartY + (zoneHeight / 2);
        const currentCenterOffset = bbox.y + (bbox.height / 2);
        finalY = targetCenter - currentCenterOffset;
        
    } else if (config.alignV === 'bottom') {
        // CÉL: A doboz alja legyen a (ZónaAlja - Margó) pozícióban.
        // Jelenlegi alj: 0 + bbox.y + bbox.height
        // Kívánt alj: zoneEndY - margin
        const targetBottom = zoneEndY - margin;
        const currentBottomOffset = bbox.y + bbox.height;
        finalY = targetBottom - currentBottomOffset;
    }

    // --- 4. Véglegesítés ---
    // Beállítjuk a korrigált Y koordinátát
    textEl.setAttribute('y', finalY);
}



// --- FONTOS: ÖSSZEKÖTÉS A TÉRKÉP MOZGATÁSSAL ---
// Módosítanunk kell a korábbi 'alignCelestialMap' vagy 'refreshMapTransform' függvényt,
// hogy a végén hívja meg a 'window.renderFixedTexts()'-t.

// Az előző lépésben létrehozott 'refreshMapTransform' függvény végére írd oda:
const originalRefreshMapTransform = window.refreshMapTransform;
// window.refreshMapTransform = function() {
//     if (originalRefreshMapTransform) originalRefreshMapTransform();
//     // Térkép frissítése után a szövegeket is újra kell pozicionálni
//     setTimeout(window.renderFixedTexts, 10);
// }

// // Inicializáláskor is fusson le egyszer
// $(document).ready(function() {
//     setTimeout(window.renderFixedTexts, 500); // Késleltetés a biztonság kedvéért
// });
// Egyéb
function updateTextContent(val) { const e = elements.find(x=>x.id===selectedElementId); if(e){e.content=val; renderTextLayer(); renderTextList();} }
function updateStyle(k,v) {
    console.log("updateStyle");
    console.log("updateStyle k",k);
    console.log("updateStyle v",v);
    const e = elements.find(x=>x.id===selectedElementId);
    if(e && k==='font-size'){
        e[k]=(k==='font-size'?v+'px':v);
        renderTextLayer();
    }
    if(e && k==='font-family'){
        e[k]=(k==='font-family'?v:v);
        renderTextLayer(v.replace(/_.*/, ""));

        // textEl.setAttribute('font-family', element['font-family']);
        // textEl.setAttribute('font-size', element['font-size']);
        // textEl.setAttribute('font-weight', element['font-weight']);
        // textEl.setAttribute('font-style', element['font-style']);
    }
}
function deleteSelectedElement() { elements=elements.filter(x=>x.id!==selectedElementId); selectElement(null); renderTextLayer(); renderTextList(); }
function switchToMainEditor() { $("#tabs").tabs("option", "active", 0); }

    // Ezt másold a fájl végére, vagy a document.ready blokkba:

    // function initDesignerTemplates() {
    //     const container = document.getElementById('designer-templates-grid'); // Ezt majd a HTML-ben hozzuk létre
    //     if (!container) return;
        
    //     container.innerHTML = ''; // Törlés, ha volt benne valami

    //     for (const [key, theme] of Object.entries(designerThemes)) {
    //         // Kártya létrehozása
    //         const card = document.createElement('div');
    //         card.className = 'theme-item'; // Ugyanazt a stílust használjuk, mint a főoldalon
            
    //         // Gomb
    //         const btn = document.createElement('button');
    //         btn.className = 'theme-btn';
    //         btn.innerText = theme.name;
            
    //         // Kis előnézet (színátmenet) a gomb hátterének
    //         btn.style.background = theme.background;
    //         btn.style.color = theme.textColor;
    //         btn.style.border = "1px solid rgba(0,0,0,0.2)";
    //         btn.style.textShadow = "0 1px 2px rgba(0,0,0,0.8)"; // Hogy olvasható legyen

    //         // Kép helyett most színmintát mutatunk, vagy ha vannak thumbnailjeid, azt is beteheted!
    //         const preview = document.createElement('div');
    //         preview.className = 'theme-preview-img';
    //         preview.style.background = theme.background; // A CSS gradientet kapja meg
    //         preview.style.height = "80px";

    //         // KATTINTÁS ESEMÉNY
    //         card.onclick = function() {
    //             applyDesignerTheme(key);
    //         };

    //         card.appendChild(preview); // Először a színminta
    //         card.appendChild(btn);     // Alá a név
    //         container.appendChild(card);
    //     }
    // }

    // // Ez a függvény alkalmazza a témát a Tervezőre ÉS a Térképre is
    // function applyDesignerTheme(key) {
    //     const theme = designerThemes[key];
    //     if (!theme) return;

    //     // 1. Térkép téma betöltése (a főoldali függvényt hívjuk)
    //     if (window.loadTheme) {
    //         window.loadTheme(theme.mapTheme);
            
    //         // Ha van "Szív" vetület beállítva, frissítsük a térképet
    //         // (Mert a loadTheme alapból nem mindig hívja a redraw-t a tervezőben)
    //         if (typeof Celestial !== 'undefined') {
    //              Celestial.redraw();
    //         }
    //     }

    //     // 2. Tervező háttér beállítása (SVG rect fill)
    //     const svgBg = document.getElementById('designer-background-rect');
    //     if (svgBg) {
    //         // Ha gradient string (pl. "linear-gradient..."), akkor azt SVG-ben definícióként kéne kezelni.
    //         // EGYSZERŰSÍTÉS: Most kivesszük a színt a CSS-ből, vagy sima színt használunk.
    //         // Mivel az SVG fill nem eszik meg CSS gradientet közvetlenül, trükközni kell.
            
    //         // Megoldás: Ha "#" szín, mehet direktbe.
    //         if (theme.background.startsWith('#') || theme.background.startsWith('rgb')) {
    //              svgBg.setAttribute('fill', theme.background);
    //         } else {
    //              // Ha gradient, akkor egy átlag színt, vagy a sötét végét használjuk fallbacknek
    //              // VAGY: Definiálhatunk SVG gradienteket. 
    //              // LUSTA MEGOLDÁS: Most beállítunk egy egyszínű hátteret az SVG-nek, 
    //              // ami a téma első színe.
    //              const colorMatch = theme.background.match(/#[0-9a-fA-F]{6}/);
    //              if (colorMatch) {
    //                  svgBg.setAttribute('fill', colorMatch[0]); 
    //              } else {
    //                  svgBg.setAttribute('fill', '#222'); // Fallback
    //              }
    //         }
    //     }
        
    //     // 3. Szövegek színének frissítése (hogy olvasható legyen)
    //     // Megkeressük az összes szöveget a tervezőben és átszínezzük
    //     const texts = document.querySelectorAll('#designer-svg text');
    //     texts.forEach(t => {
    //         t.setAttribute('fill', theme.textColor);
    //     });
        
    //     // Frissítjük a szerkesztő inputjait is
    //     $('#text-color-picker').val(theme.textColor);
    // }


// // --- A NAGY KÖZPONTI VEZÉRLŐ (MASTER SWITCH) ---
// window.applyGlobalTheme = function(key) {
//     const theme = designerThemes[key];
//     if (!theme) return;

//     console.log("Global Theme Apply:", key);

//     // 1. HÁTTÉR BEÁLLÍTÁSA (Tervező nézet)
//     const svgBg = document.getElementById('designer-background-rect');
//     if (svgBg) {
//         // Ha színátmenet (linear-gradient), akkor trükközni kell SVG-ben, 
//         // de egyszerűsítve most vegyük az első színt, vagy engedélyezzük a CSS fill-t ha működik.
//         // A legbiztosabb megoldás most: stílus attribútumként adjuk hozzá a rect-hez (ha a böngésző támogatja)
//         // vagy fallback színt használunk.
//         if (theme.background.includes('gradient')) {
//              // Kiveszünk egy domináns színt a gradientből a biztonság kedvéért
//              const colorMatch = theme.background.match(/#[0-9a-fA-F]{6}/);
//              svgBg.setAttribute('fill', colorMatch ? colorMatch[0] : '#222');
//              // Modern böngészőkben megpróbálhatjuk ezt (SVG CSS):
//              svgBg.style.fill = "none"; // Reset
//              // A gradientet bonyolultabb SVG defs-be tenni dinamikusan, 
//              // így most maradjunk a domináns színnél a vektoros export miatt, 
//              // de a képernyőn megpróbálhatjuk a CSS-t a szülőre tenni.
//         } else {
//              svgBg.setAttribute('fill', theme.background);
//              svgBg.style.fill = theme.background;
//         }
//     }

//     // 2. SZÖVEGEK SZÍNÉNEK FRISSÍTÉSE
//     const texts = document.querySelectorAll('#designer-svg text');
//     texts.forEach(t => t.setAttribute('fill', theme.textColor));
//     if($('#text-color-picker').length) $('#text-color-picker').val(theme.textColor);

//     // 3. TÉRKÉP TÉMA BETÖLTÉSE & FRISSÍTÉSE
//     if (window.loadTheme) {
//         // Ez betölti a celestial configot
//         window.loadTheme(theme.mapTheme); 
        
//         // KÉNYSZERÍTETT FRISSÍTÉS! Ez oldja meg a problémádat.
//         if (typeof Celestial !== 'undefined') {
//             // Egy pici késleltetés kell, hogy a config átmenjen
//             setTimeout(() => {
//                 Celestial.redraw(); 
//             }, 10);
//         }
//     }
    
//     // Vizuális visszajelzés a gombokon (Aktív keret)
//     $('.theme-preview-img').css('border', 'none');
//     $(`.theme-btn[data-key="${key}"]`).prev('.theme-preview-img').css('border', '2px solid #4a9eff');
// }


// // --- GOMBOK GENERÁLÁSA A TERVEZŐBE (#fragment_r-3) ---
// function initDesignerTemplates() {
//     // Figyelem: Ide a TE általad megadott új hely ID-ja kell!
//     const container = document.getElementById('designer-templates-grid'); 
    
//     if (!container) {
//         console.warn("Nem található a #designer-templates-grid konténer!");
//         return;
//     }
    
//     container.innerHTML = ''; 

//     // for (const [key, theme] of Object.entries(designerThemes)) {
//     for (const [key, theme] of Object.entries(mapThemes)) {
//         const card = document.createElement('div');
//         card.className = 'theme-item';
//         card.style.cursor = "pointer";

//         // A GOMB: Ez lesz a "Thumbnail"!
//         // Nem képfájlt töltünk, hanem a CSS-sel megrajzoljuk a hátteret.
//         const preview = document.createElement('div');
//         preview.className = 'theme-preview-img';
//         preview.style.background = theme.background; // Itt a varázslat! 🎨
//         preview.style.height = "60px";
//         preview.style.width = "100%";
//         preview.style.borderRadius = "4px";
//         preview.style.marginBottom = "5px";
//         preview.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

//         const label = document.createElement('div');
//         label.innerText = theme.name;
//         label.style.textAlign = "center";
//         label.style.fontSize = "12px";
//         label.style.fontWeight = "bold";
        
//         // Ezt a gombot rejtett adattal látjuk el
//         label.className = "theme-btn"; 
//         label.dataset.key = key;

//         card.onclick = function() {
//             applyGlobalTheme(key);
//         };

//         card.appendChild(preview);
//         card.appendChild(label);
//         container.appendChild(card);
//     }
// }
// // --- KÜLÖN FÜGGVÉNY A TERVEZŐ SABLONJAIHOZ ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Meghívjuk az általános betöltőt (ez beállítja a configot, inputokat, map-wrap-et)
//     // Alapértelmezetten 'normal' verziót töltünk be a gomboknál
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 2. SPECIFIKUS TERVEZŐ HÁTTÉR KEZELÉS
//     // Mivel a loadTheme már beállította a configot, itt csak a vizuális finomhangolás kell a tervezőnek.
    
//     // Lekérjük a témát a fő ablak változójából (ha elérhető) vagy a designerThemes-ből
//     // A cél, hogy a gradiens biztosan megjelenjen.
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     } else if (typeof designerThemes !== 'undefined' && designerThemes[key]) {
//         themeBg = designerThemes[key].background;
//     }

//     // Beállítjuk az SVG hátterét CSS-sel (ez kezeli a lineáris gradienst!)
//     const designerSVG = document.getElementById('designer-svg');
//     if (designerSVG) {
//         designerSVG.style.background = themeBg;
//     }

//     // 3. KÉNYSZERÍTETT TÉRKÉP ÚJRAGENERÁLÁS
//     // Biztosítjuk, hogy a térkép megjelenjen a tervezőben az új színekkel
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             Celestial.redraw();
            
//             // Ha van transzformáció (méretezés/igazítás), azt is frissítjük
//             if (typeof window.refreshMapTransform === 'function') {
//                 window.refreshMapTransform();
//             }
//         }, 50); // Pici késleltetés a biztonság kedvéért
//     }
// }
// // --- ÚJ FÜGGVÉNY: Csillagtérkép átmásolása a Tervezőbe (SVG Image-ként) ---
// window.copySVG = function() {
//     // 1. Forrás keresése (A Celestial által rajzolt Canvas)
//     const sourceContainer = document.getElementById('celestial-map');
//     const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
//     if (!sourceCanvas) {
//         console.warn("copySVG: Nem található a forrás canvas!");
//         return;
//     }

//     // 2. Cél réteg keresése a Tervezőben
//     const targetLayer = document.getElementById('celestial-map-layer');
//     if (!targetLayer) {
//         console.warn("copySVG: Nem található a cél réteg (#celestial-map-layer)!");
//         return;
//     }

//     // 3. Konvertálás képpé (DataURL)
//     // Ez "lefagyasztja" a canvas pillanatnyi állapotát egy képfájlba
//     const dataURL = sourceCanvas.toDataURL('image/png');

//     // 4. Beillesztés SVG <image>-ként
//     // Először töröljük a régit
//     targetLayer.innerHTML = ''; 

//     const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
//     svgImage.setAttribute('href', dataURL);
//     svgImage.setAttribute('width', sourceCanvas.width);
//     svgImage.setAttribute('height', sourceCanvas.height);
//     svgImage.setAttribute('x', 0);
//     svgImage.setAttribute('y', 0);
    
//     // Fontos osztály a későbbi méréshez (BBox)
//     svgImage.classList.add('celestial-map-image');

//     targetLayer.appendChild(svgImage);
    
//     console.log("Csillagtérkép átmásolva a tervezőbe (copySVG).");
// }

// // --- JAVÍTOTT TERVEZŐ TÉMA ALKALMAZÁS ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Meghívjuk az általános betöltőt (ez beállítja a configot, inputokat, map-wrap-et)
//     // Alapértelmezetten 'normal' verziót töltünk be a gomboknál
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 2. SPECIFIKUS TERVEZŐ HÁTTÉR KEZELÉS (Gradiens támogatás!)
//     let themeBg = "#000000";
//     // Elérjük a mapThemes-t a global scope-ból
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }

//     // Beállítjuk az SVG hátterét CSS-sel (ez kezeli a lineáris gradienst!)
//     const designerSVG = document.getElementById('designer-svg');
//     if (designerSVG) {
//         designerSVG.style.background = themeBg;
//     }

//     // 3. ÚJRAGENERÁLÁS ÉS MÁSOLÁS (copySVG)
//     // Ez a kritikus rész: várni kell kicsit, hogy a Celestial újrarajzolja a térképet,
//     // majd azt a képet át kell másolni a tervezőbe.
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             // A) Kényszerített újrarajzolás a fő canvas-on
//             Celestial.redraw();
            
//             // B) Várakozás a kirajzolásra, majd MÁSOLÁS
//             setTimeout(() => {
//                 // Átmásoljuk a képet
//                 if(typeof window.copySVG === 'function') {
//                     window.copySVG(); 
//                 }
                
//                 // Helyreigazítjuk a méretet és pozíciót
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform(); 
//                 }
                
//                 // Szövegeket is újraigazítjuk
//                 if (typeof window.renderFixedTexts === 'function') {
//                     window.renderFixedTexts();
//                 }
//             }, 100); // 100ms várakozás elég a rendereléshez
//         }, 50);
//     }
// }
// // --- JAVÍTOTT: Csillagtérkép átmásolása a Tervezőbe (Képként) ---
// window.copySVG = function() {
//     console.log("copySVG futtatása...");
    
//     // 1. Forrás keresése
//     const sourceContainer = document.getElementById('celestial-map');
//     const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
//     if (!sourceCanvas) {
//         console.warn("copySVG: Nem található a forrás canvas!");
//         return;
//     }
    
//     // Ellenőrizzük, hogy van-e mérete a canvasnak
//     if (sourceCanvas.width === 0 || sourceCanvas.height === 0) {
//         console.warn("copySVG: A forrás canvas mérete 0! Megpróbáljuk újraméretezni...");
//         if(typeof Celestial !== 'undefined' && typeof getOptimalMapSize === 'function') {
//              Celestial.resize({width: getOptimalMapSize()});
//         }
//     }

//     // 2. Cél réteg keresése a Tervezőben
//     const targetLayer = document.getElementById('celestial-map-layer');
//     if (!targetLayer) {
//         console.warn("copySVG: Nem található a cél réteg (#celestial-map-layer)!");
//         return;
//     }

//     // 3. Konvertálás képpé (DataURL)
//     // Ez "lefagyasztja" a canvas pillanatnyi állapotát egy képfájlba
//     const dataURL = sourceCanvas.toDataURL('image/png');

//     // 4. Beillesztés SVG <image>-ként
//     targetLayer.innerHTML = ''; // Előző törlése

//     const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    
//     // Kétféle href beállítása a kompatibilitás miatt
//     svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
//     svgImage.setAttribute('href', dataURL);
    
//     svgImage.setAttribute('width', sourceCanvas.width);
//     svgImage.setAttribute('height', sourceCanvas.height);
//     svgImage.setAttribute('x', 0);
//     svgImage.setAttribute('y', 0);
    
//     // Fontos osztály a méréshez
//     svgImage.classList.add('celestial-map-image');

//     targetLayer.appendChild(svgImage);
    
//     console.log(`Csillagtérkép sikeresen átmásolva (${sourceCanvas.width}x${sourceCanvas.height})`);
// }

// // --- JAVÍTOTT TERVEZŐ TÉMA ALKALMAZÁS ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Kényszerített méretezés (Mielőtt bármit csinálunk!)
//     // Mivel a tervezőben vagyunk, a térkép rejtett lehet, ezért be kell állítani a méretét.
//     if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//         const safeSize = getOptimalMapSize();
//         Celestial.resize({width: safeSize});
//     }

//     // 2. Téma betöltése (Színek, Config)
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 3. Háttérszín beállítása a Tervező SVG-nek
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
//     const designerSVG = document.getElementById('designer-svg');
//     if (designerSVG) {
//         designerSVG.style.background = themeBg;
//     }

//     // 4. ÚJRAGENERÁLÁS ÉS MÁSOLÁS (Időzítve)
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             // A) Újrarajzolás a (már méretezett) canvas-ra
//             Celestial.redraw();
            
//             // B) Átmásolás a Tervezőbe
//             setTimeout(() => {
//                 if(typeof window.copySVG === 'function') {
//                     window.copySVG(); 
//                 }
//                 // Igazítás
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform(); 
//                 }
//             }, 150); // Pici várakozás a rajzolás után
//         }, 50);
//     }
// }
// // --- GOMBOK GENERÁLÁSA A TERVEZŐBE (#fragment_r-3) ---
// function initDesignerTemplates() {
//     const container = document.getElementById('designer-templates-grid'); 
    
//     if (!container) return;
//     container.innerHTML = ''; 

//     // A mapThemes objektumot használjuk (ami a celestial_jo.html-ben van definiálva)
//     // Ha nem elérhető közvetlenül, akkor definiálj egy lokálisat vagy tedd globálissá a másikat.
//     // Feltételezzük, hogy a celestial_jo.html scriptjei már lefutottak.
//     const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;

//     for (const [key, theme] of Object.entries(themesSource)) {
//         const card = document.createElement('div');
//         card.className = 'theme-item';
//         card.style.cursor = "pointer";

//         const preview = document.createElement('div');
//         preview.className = 'theme-preview-img';
//         preview.style.background = theme.background; 
//         preview.style.height = "60px";
//         preview.style.width = "100%";
//         preview.style.borderRadius = "4px";
//         preview.style.marginBottom = "5px";
//         preview.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

//         const label = document.createElement('div');
//         label.innerText = theme.name;
//         label.style.textAlign = "center";
//         label.style.fontSize = "12px";
//         label.style.fontWeight = "bold";
        
//         label.className = "theme-btn"; 
//         label.dataset.key = key;

//         card.onclick = function() {
//             // FONTOS: Itt hívjuk meg az új specifikus függvényt!
//             applyDesignerTheme(key);
//         };

//         card.appendChild(preview);
//         card.appendChild(label);
//         container.appendChild(card);
//     }
// }
// // --- GOMBOK GENERÁLÁSA A TERVEZŐBE (#fragment_r-3) ---
// function initDesignerTemplates() {
//     const container = document.getElementById('designer-templates-grid'); 
    
//     if (!container) return;
//     container.innerHTML = ''; 

//     // A mapThemes objektumot használjuk
//     const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;

//     for (const [key, theme] of Object.entries(themesSource)) {
//         const card = document.createElement('div');
//         card.className = 'theme-item';
//         card.style.cursor = "pointer";

//         const preview = document.createElement('div');
//         preview.className = 'theme-preview-img';
        
//         // Háttér kép kezelése (ha van image, azt használjuk, ha nincs, marad a background szín)
//         if (theme.image) {
//              preview.style.background = `url('${theme.image}') center/cover no-repeat`;
//         } else {
//              preview.style.background = theme.background; 
//         }
        
//         preview.style.height = "60px";
//         preview.style.width = "100%";
//         preview.style.borderRadius = "4px";
//         preview.style.marginBottom = "5px";
//         preview.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

//         const label = document.createElement('div');
//         label.innerText = theme.name;
//         label.style.textAlign = "center";
//         label.style.fontSize = "12px";
//         label.style.fontWeight = "bold";
        
//         label.className = "theme-btn"; 
//         label.dataset.key = key;

//         card.onclick = function() {
//             // JAVÍTÁS: Itt a 'applyDesignerTheme'-t kell hívni, NEM az 'applyGlobalTheme'-t!
//             if (typeof window.applyDesignerTheme === 'function') {
//                 window.applyDesignerTheme(key);
//             } else {
//                 console.error("applyDesignerTheme függvény nem található!");
//             }
//         };

//         card.appendChild(preview);
//         card.appendChild(label);
//         container.appendChild(card);
//     }
// }
// --- JAVÍTOTT: Csillagtérkép átmásolása a Tervezőbe (Képként) ---
// ÁTNEVEZVE: updateDesignerPreview-ra, hogy ne akadjon össze a celestial.js copySVG-jével!
window.updateDesignerPreview = function() {
    console.log("updateDesignerPreview futtatása...");
    
    // 1. Forrás keresése (A Celestial által rajzolt Canvas)
    const sourceContainer = document.getElementById('celestial-map');
    const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
    if (!sourceCanvas) {
        console.warn("Hiba: Nem található a forrás canvas!");
        return;
    }
    
    // Ellenőrizzük, hogy van-e mérete a canvasnak
    if (sourceCanvas.width === 0 || sourceCanvas.height === 0) {
        console.warn("Hiba: A forrás canvas mérete 0! Megpróbáljuk újraméretezni...");
        // Ha van global getOptimalMapSize, használjuk
        if(typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
             Celestial.resize({width: getOptimalMapSize()});
        }
    }

    // 2. Cél réteg keresése a Tervezőben
    const targetLayer = document.getElementById('celestial-map-layer');
    if (!targetLayer) {
        console.warn("Hiba: Nem található a cél réteg (#celestial-map-layer)!");
        return;
    }

    // 3. Konvertálás képpé (DataURL) - Ez a leggyorsabb előnézethez
    const dataURL = sourceCanvas.toDataURL('image/png');

    // 4. Beillesztés SVG <image>-ként a Tervezőbe
    targetLayer.innerHTML = ''; // Előző törlése

    const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    
    // Kétféle href beállítása a biztonság kedvéért
    svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
    svgImage.setAttribute('href', dataURL);
    
    svgImage.setAttribute('width', sourceCanvas.width);
    svgImage.setAttribute('height', sourceCanvas.height);
    svgImage.setAttribute('x', 0);
    svgImage.setAttribute('y', 0);
    
    // Fontos osztály a méréshez (BBox)
    svgImage.classList.add('celestial-map-image');

    targetLayer.appendChild(svgImage);
    
    console.log(`Siker! Csillagtérkép átmásolva (${sourceCanvas.width}x${sourceCanvas.height})`);
}

// // --- JAVÍTOTT TERVEZŐ TÉMA ALKALMAZÁS ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Kényszerített méretezés (Mielőtt bármit csinálunk!)
//     // Mivel a tervezőben vagyunk, a térkép rejtett lehet, ezért be kell állítani a méretét.
//     if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//         const safeSize = getOptimalMapSize();
//         // Csak akkor méretezzük át, ha a jelenlegi méret gyanúsan kicsi (pl 0)
//         // Vagy mindig, a biztonság kedvéért:
//         Celestial.resize({width: safeSize});
//     }

//     // 2. Téma betöltése (Színek, Config)
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 3. Háttérszín beállítása a Tervező SVG-nek
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
//     const designerSVG = document.getElementById('designer-svg');
//     if (designerSVG) {
//         designerSVG.style.background = themeBg;
//     }

//     // 4. ÚJRAGENERÁLÁS ÉS MÁSOLÁS (Időzítve)
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             // A) Újrarajzolás a canvas-ra
//             Celestial.redraw();
            
//             // B) Átmásolás a Tervezőbe (most már az új nevű függvényt hívjuk!)
//             setTimeout(() => {
//                 if(typeof window.updateDesignerPreview === 'function') {
//                     window.updateDesignerPreview(); 
//                 } else {
//                     console.error("Nem található az updateDesignerPreview függvény!");
//                 }
                
//                 // Igazítás
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform(); 
//                 }
//             }, 150); // Pici várakozás a rajzolás után
//         }, 50);
//     }
// }

// // --- GOMBOK GENERÁLÁSA A TERVEZŐBE ---
// function initDesignerTemplates() {
//     const container = document.getElementById('designer-templates-grid'); 
    
//     if (!container) return;
//     container.innerHTML = ''; 

//     const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;

//     for (const [key, theme] of Object.entries(themesSource)) {
//         const card = document.createElement('div');
//         card.className = 'theme-item';
//         card.style.cursor = "pointer";

//         const preview = document.createElement('div');
//         preview.className = 'theme-preview-img';
        
//         if (theme.image) {
//              preview.style.background = `url('${theme.image}') center/cover no-repeat`;
//         } else {
//              preview.style.background = theme.background; 
//         }
        
//         preview.style.height = "60px";
//         preview.style.width = "100%";
//         preview.style.borderRadius = "4px";
//         preview.style.marginBottom = "5px";
//         preview.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

//         const label = document.createElement('div');
//         label.innerText = theme.name;
//         label.style.textAlign = "center";
//         label.style.fontSize = "12px";
//         label.style.fontWeight = "bold";
        
//         label.className = "theme-btn"; 
//         label.dataset.key = key;

//         // KATTINTÁS ESEMÉNY
//         card.onclick = function() {
//             if (typeof window.applyDesignerTheme === 'function') {
//                 window.applyDesignerTheme(key);
//             }
//         };

//         card.appendChild(preview);
//         card.appendChild(label);
//         container.appendChild(card);
//     }
// }
// --- JAVÍTOTT MÁSOLÁS: ÁTNEVEZVE, HOGY NE ÜTKÖZZÖN! ---
// // A celestial.js-ben már van copySVG, ezért ezt átneveztük copyMapToDesigner-re.
// window.copyMapToDesigner = function() {
//     console.log("copyMapToDesigner futtatása...");
    
//     // 1. Forrás keresése
//     const sourceContainer = document.getElementById('celestial-map');
//     const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
//     if (!sourceCanvas) {
//         console.warn("Hiba: Nem található a forrás canvas!");
//         return;
//     }
    
//     // Méret ellenőrzés és mentőöv
//     if (sourceCanvas.width === 0 || sourceCanvas.height === 0) {
//         console.warn("A canvas mérete 0! Kényszerített újraméretezés...");
//         if(typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//              Celestial.resize({width: getOptimalMapSize()});
//         }
//     }

//     // 2. Cél réteg
//     const targetLayer = document.getElementById('celestial-map-layer');
//     if (!targetLayer) return;

//     // 3. Konvertálás képbe
//     const dataURL = sourceCanvas.toDataURL('image/png');

//     // 4. Beillesztés
//     targetLayer.innerHTML = ''; 

//     const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
//     svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
//     svgImage.setAttribute('href', dataURL);
    
//     svgImage.setAttribute('width', sourceCanvas.width);
//     svgImage.setAttribute('height', sourceCanvas.height);
//     svgImage.setAttribute('x', 0);
//     svgImage.setAttribute('y', 0);
    
//     svgImage.classList.add('celestial-map-image');
//     targetLayer.appendChild(svgImage);
    
//     console.log(`Siker! Térkép átmásolva (${sourceCanvas.width}x${sourceCanvas.height})`);
// }

// // --- JAVÍTOTT TÉMA ALKALMAZÁS ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Méretezés biztosítása (ha rejtett a map-wrap)
//     if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//         const safeSize = getOptimalMapSize();
//         Celestial.resize({width: safeSize});
//     }

//     // 2. Téma betöltése
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 3. Háttérszín beállítása a Tervezőben is
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
//     // Ez a függvény most már kezeli a map-wrapet is!
//     window.updateCanvasBackground(themeBg);

//     // 4. Újrarajzolás és Másolás (Időzítve)
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             Celestial.redraw(); // Újrarajzoljuk a canvas-ra
            
//             setTimeout(() => {
//                 // ITT HÍVJUK AZ ÚJ NEVŰ FÜGGVÉNYT!
//                 if(typeof window.copyMapToDesigner === 'function') {
//                     window.copyMapToDesigner(); 
//                 }
                
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform(); 
//                 }
//             }, 150); 
//         }, 50);
//     }
// }

// // --- GOMBOK GENERÁLÁSA ---
// function initDesignerTemplates() {
//     const container = document.getElementById('designer-templates-grid'); 
//     if (!container) return;
//     container.innerHTML = ''; 

//     const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;

//     for (const [key, theme] of Object.entries(themesSource)) {
//         const card = document.createElement('div');
//         card.className = 'theme-item';
//         card.style.cursor = "pointer";

//         const preview = document.createElement('div');
//         preview.className = 'theme-preview-img';
        
//         if (theme.image) {
//              preview.style.background = `url('${theme.image}') center/cover no-repeat`;
//         } else {
//              preview.style.background = theme.background; 
//         }
        
//         preview.style.height = "60px";
//         preview.style.width = "100%";
//         preview.style.borderRadius = "4px";
//         preview.style.marginBottom = "5px";

//         const label = document.createElement('div');
//         label.innerText = theme.name;
//         label.style.textAlign = "center";
//         label.style.fontSize = "12px";
//         label.style.fontWeight = "bold";
//         label.className = "theme-btn"; 
        
//         card.onclick = function() {
//             if (typeof window.applyDesignerTheme === 'function') {
//                 window.applyDesignerTheme(key);
//             }
//         };

//         card.appendChild(preview);
//         card.appendChild(label);
//         container.appendChild(card);
//     }
// }

// --- SEGÉDFÜGGVÉNY: Szín kinyerése (Hex) ---
// Ez azért kell, mert az <input type="color"> nem érti a gradienst, csak a hex kódot.
function getHexFromBackground(bg) {
    if (!bg) return "#000000";
    if (bg.startsWith("#")) return bg;
    // Ha gradiens (pl. linear-gradient(... #123456 ...)), kivesszük az első színt
    const match = bg.match(/#[a-fA-F0-9]{6}/);
    if (match) return match[0];
    return "#000000"; // Fallback
}

// // --- JAVÍTOTT HÁTTÉRSZÍN FRISSÍTÉS (Robusztusabb) ---
// window.updateCanvasBackground = function(color) {
//     // 1. Szerkesztő nézet (#map-wrap) - Ezt MINDIG frissítjük!
//     // Nem függ a getDOMElements()-től!
//     const mapWrap = document.getElementById('map-wrap');
//     if (mapWrap) {
//         mapWrap.style.background = color;
//     }

//     // 2. Tervező nézet (SVG)
//     const dSvg = document.getElementById('designer-svg');
//     if (dSvg) {
//         dSvg.style.backgroundColor = color;
//         // SVG Rect (exportáláshoz)
//         const bgRect = document.getElementById('designer-background-rect');
//         if (bgRect) {
//             // Ha gradiens a bemenet, a rect fill attribútuma nem kezeli jól,
//             // de az updateCanvasBackground-ot általában a color picker hívja (ami hex).
//             // Ha mégis gradiens jönne, a getHex segít.
//             bgRect.setAttribute('fill', color.startsWith('#') ? color : getHexFromBackground(color));
//         }
//     }
// }
// Háttérszín frissítés (Javítva)
window.updateCanvasBackground = function(color) {
    const mapWrap = document.getElementById('map-wrap');
    if (mapWrap) mapWrap.style.background = color;

    const dSvg = document.getElementById('designer-svg');
    if (dSvg) {
        dSvg.style.backgroundColor = color;
        const bgRect = document.getElementById('designer-background-rect');
        if (bgRect) {
            // Ha hex, mehet. Ha nem, fekete.
            bgRect.setAttribute('fill', color.startsWith('#') ? color : "#000000");
        }
    }
}

// // --- JAVÍTOTT TÉMA ALKALMAZÁS (Input szinkronizációval) ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Méretezés biztosítása
//     if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//         const safeSize = getOptimalMapSize();
//         Celestial.resize({width: safeSize});
//     }

//     // 2. Téma betöltése (Celestial config)
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 3. Háttérszín beállítása
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
    
//     // A) Beállítjuk a háttereket (SVG és MapWrap)
//     window.updateCanvasBackground(themeBg);
    
//     // B) FRISSÍTJÜK A COLOR PICKER INPUTOT IS! (Ez hiányzott)
//     const colorInput = document.getElementById('canvas-bg-color');
//     if (colorInput) {
//         // Mivel a picker csak Hex-et fogad el, kivesszük a színt
//         colorInput.value = getHexFromBackground(themeBg);
//     }

//     // 4. Újrarajzolás és Másolás (Időzítve)
//     if (typeof Celestial !== 'undefined') {
//         setTimeout(() => {
//             Celestial.redraw(); 
            
//             setTimeout(() => {
//                 if(typeof window.copyMapToDesigner === 'function') {
//                     window.copyMapToDesigner(); 
//                 }
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform(); 
//                 }
//             }, 150); 
//         }, 50);
//     }
// }

// // --- JAVÍTOTT MÁSOLÁS (copySVG -> copyMapToDesigner) ---
// window.copyMapToDesigner = function() {
//     console.log("copyMapToDesigner futtatása...");
    
//     const sourceContainer = document.getElementById('celestial-map');
//     const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
//     if (!sourceCanvas) return;
    
//     // Méret ellenőrzés
//     if (sourceCanvas.width === 0 || sourceCanvas.height === 0) {
//         if(typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
//              Celestial.resize({width: getOptimalMapSize()});
//         }
//     }

//     const targetLayer = document.getElementById('celestial-map-layer');
//     if (!targetLayer) return;

//     const dataURL = sourceCanvas.toDataURL('image/png');

//     targetLayer.innerHTML = ''; 

//     const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
//     svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
//     svgImage.setAttribute('href', dataURL);
    
//     svgImage.setAttribute('width', sourceCanvas.width);
//     svgImage.setAttribute('height', sourceCanvas.height);
//     svgImage.setAttribute('x', 0);
//     svgImage.setAttribute('y', 0);
//     svgImage.classList.add('celestial-map-image');

//     targetLayer.appendChild(svgImage);
// }
// // --- JAVÍTOTT TÉMA ALKALMAZÁS (Copy Fix) ---
// window.applyDesignerTheme = function(key) {
//     console.log("Designer Theme Apply:", key);
    
//     // 1. Téma betöltése (Config + Színek)
//     if (typeof window.loadTheme === 'function') {
//         window.loadTheme(key, 'normal');
//     }

//     // 2. Háttérszín beállítása (Azonnal)
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
//     window.updateCanvasBackground(themeBg);
    
//     // Input szinkronizáció
//     const colorInput = document.getElementById('canvas-bg-color');
//     if (colorInput) {
//         let hex = themeBg.startsWith('#') ? themeBg : "#000000";
//         if(themeBg.includes("gradient")) {
//              const match = themeBg.match(/#[a-fA-F0-9]{6}/);
//              if(match) hex = match[0];
//         }
//         colorInput.value = hex;
//     }

//     // // 3. KRITIKUS: Újrarajzolás és Másolás
//     // if (typeof Celestial !== 'undefined') {
//     //     // A) Kényszerített átméretezés (hogy a rejtett canvasnak legyen mérete)
//     //     if(typeof getOptimalMapSize === 'function') {
//     //         Celestial.resize({width: getOptimalMapSize()});
//     //     }

//     //     setTimeout(() => {
//     //         // B) Újrarajzolás
//     //         Celestial.redraw();
            
//     //         // C) Másolás (Kicsit hosszabb várakozással a biztonság kedvéért)
//     //         setTimeout(() => {
//     //             if(typeof window.copyMapToDesigner === 'function') {
//     //                 window.copyMapToDesigner(); 
//     //             }
//     //             // Helyreigazítás az új layout szerint
//     //             window.refreshMapTransform();
//     //         }, 250); 
//     //     }, 50);
//     // }
//     // 3. KRITIKUS: Újrarajzolás és Másolás
//     if (typeof Celestial !== 'undefined') {
//         // A) Kényszerített átméretezés
//         if(typeof getOptimalMapSize === 'function') {
//             Celestial.resize({width: getOptimalMapSize()});
//         }

//         setTimeout(() => {
//             // B) Újrarajzolás indítása
//             Celestial.redraw();
            
//             // C) VÁRAKOZÁS és Másolás
//             // Megnöveltük az időt 250ms-ről 800ms-re, hogy biztosan végezzen a rajzolással
//             // mielőtt átmásoljuk a képet. Így nem lesz levágva a teteje.
//             setTimeout(() => {
//                 if(typeof window.copyMapToDesigner === 'function') {
//                     window.copyMapToDesigner(); 
//                 }
//                 // Helyreigazítás az új layout szerint
//                 window.refreshMapTransform();
//             }, 800); 
//         }, 50);
//     }
// }

// // --- JAVÍTOTT ÉS DEBUGGOLT TÉMA ALKALMAZÁS ---
// window.applyDesignerTheme = function(key) {
//     console.log("🚀 [DEBUG] applyDesignerTheme INDÍTÁSA:", key);
    
//     // 1. Téma betöltése
//     if (typeof window.loadTheme === 'function') {
//         try {
//             window.loadTheme(key, 'normal');
//             console.log("✅ [DEBUG] loadTheme lefutott.");
//         } catch (e) {
//             console.error("❌ [DEBUG] Hiba a loadTheme-ben:", e);
//         }
//     }

//     // 2. Háttérszín beállítása
//     let themeBg = "#000000";
//     if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
//         themeBg = mapThemes[key].background;
//     }
//     if (window.updateCanvasBackground) {
//         window.updateCanvasBackground(themeBg);
//     }
    
//     // Input szinkronizáció
//     const colorInput = document.getElementById('canvas-bg-color');
//     if (colorInput) {
//         let hex = themeBg.startsWith('#') ? themeBg : "#000000";
//         if(themeBg.includes("gradient")) {
//              const match = themeBg.match(/#[a-fA-F0-9]{6}/);
//              if(match) hex = match[0];
//         }
//         colorInput.value = hex;
//     }

//     // 3. KRITIKUS RÉSZ
//     if (typeof Celestial === 'undefined') {
//         console.error("❌ [DEBUG] KRITIKUS HIBA: A 'Celestial' objektum nem létezik!");
//         return;
//     }

//     console.log("⏳ [DEBUG] 1. Időzítő indítása (50ms)...");

//     setTimeout(() => {
//         console.log("🔄 [DEBUG] Celestial.redraw() kísérlet...");
        
//         try {
//             // A) Kényszerített átméretezés (hogy biztosan legyen mérete a canvasnak)
//             if(typeof getOptimalMapSize === 'function') {
//                 Celestial.resize({width: getOptimalMapSize()});
//             }

//             // B) Újrarajzolás
//             Celestial.redraw();
//             console.log("✅ [DEBUG] Celestial.redraw() SIKERES!");

//         } catch (error) {
//             console.error("❌ [DEBUG] HIBA a Celestial.redraw() közben:", error);
//             // Ha itt hiba van, akkor is tovább engedjük a kód futását a másoláshoz!
//         }
        
//         console.log("⏳ [DEBUG] 2. Időzítő indítása (3000ms) a másoláshoz...");

//         // C) Másolás (Késleltetve)
//         setTimeout(() => {
//             console.log("📸 [DEBUG] Másolás időzítője lejárt. Másolás indítása...");
            
//             try {
//                 if(typeof window.copyMapToDesigner === 'function') {
//                     window.copyMapToDesigner(); 
//                     console.log("✅ [DEBUG] window.copyMapToDesigner() lefutott.");
//                     // alert("Siker! A kép átmásolva."); // Ezt visszakapcsolhatod tesztnek
//                 } else {
//                     console.error("❌ [DEBUG] HIBA: A 'window.copyMapToDesigner' függvény nem található!");
//                 }

//                 // Helyreigazítás
//                 if (typeof window.refreshMapTransform === 'function') {
//                     window.refreshMapTransform();
//                     console.log("✅ [DEBUG] Helyreigazítás kész.");
//                 }
//             } catch (innerError) {
//                 console.error("❌ [DEBUG] HIBA a másolás/igazítás közben:", innerError);
//             }

//         }, 3000); // 3 másodperc (teszteléshez jó, élesben 800-1000 elég)

//     }, 50);
// }


// --- JAVÍTOTT TÉMA ALKALMAZÁS (Hibamentesítés + Késleltetett másolás) ---
// window.applyDesignerTheme = function(key) {
window.applyDesignerTheme = function(key, variant = 'normal') { // <--- ÚJ PARAMÉTER
    console.log("Designer Theme Apply:", key);
    
    // 1. Kényszerített méretezés (Mielőtt bármit csinálunk!)
    if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') {
        // Megpróbáljuk beállítani a méretet, hogy ne legyen 0
        const safeSize = getOptimalMapSize() || 500; 
        Celestial.resize({width: safeSize});
    }

    // 2. Téma betöltése (Ez állítja be a színeket a configban)
    if (typeof window.loadTheme === 'function') {
        // Alapból 'normal'-t tölt, ha szívet akarsz, itt írd át 'heart'-ra!
        window.loadTheme(key, 'normal'); 
    }

    // 3. Háttérszín beállítása a Tervezőben (Azonnal)
    let themeBg = "#000000";
    if (typeof mapThemes !== 'undefined' && mapThemes[key]) {
        themeBg = mapThemes[key].background;
    }
    window.updateCanvasBackground(themeBg);
    if (window.updateCanvasBackground) {
        window.updateCanvasBackground(themeBg);
    }
    
    // Input szinkronizáció
    const colorInput = document.getElementById('canvas-bg-color');
    if (colorInput) {
        let hex = themeBg.startsWith('#') ? themeBg : "#000000";
        if(themeBg.includes("gradient")) {
             const match = themeBg.match(/#[a-fA-F0-9]{6}/);
             if(match) hex = match[0];
        }
        colorInput.value = hex;
    }

                console.log("VEKTOROS Generálás következik a tervezőbe... typeof Celestial", typeof Celestial);
    // 4. KRITIKUS RÉSZ: Újrarajzolás és Másolás
    if (typeof Celestial !== 'undefined') {
        setTimeout(() => {
            // A) Újrarajzolás (Hibakezeléssel!)
            try {
                Celestial.redraw(); 
            } catch (e) {
                console.warn("Celestial.redraw hiba (nem kritikus, folytatjuk):", e);
            }
            
            // B) MÁSOLÁS (Hosszabb várakozás a pozicionálás miatt!)
            // 800ms már elég kell legyen, hogy a 'customHeart' helyreigazító logikája lefusson
            // setTimeout(() => {
            //     console.log("Másolás indítása...");
                
            //     // Kép másolása
            //     if(typeof window.copyMapToDesigner === 'function') {
            //         window.copyMapToDesigner(); 
            //     }
            // B) MÁSOLÁS KÉSLELTETÉSE (A lényeg)
            setTimeout(() => {
                console.log("VEKTOROS Generálás a tervezőbe...");
                
                // 1. A celestial_jo.js-ből kivezetett vektoros generátor hívása!
                // Ez újraépíti az SVG-t az aktuális színekkel és a javított pozícióval.
                if(typeof window.generateVectorMap === 'function') {
                    window.generateVectorMap(); 
                }
                
                // Tervező nézet helyreigazítása (méret, pozíció)
                if (typeof window.refreshMapTransform === 'function') {
                    window.refreshMapTransform(); 
                }
                
                // Szövegek igazítása
                if (typeof window.renderFixedTexts === 'function') {
                    window.renderFixedTexts();
                }
                
            }, 1400); // 800ms késleltetés a biztos sikerért
        }, 50);
    }
}


// --- MÁSOLÁS (Canvas -> SVG Image) ---
window.copyMapToDesigner = function() {
    console.log("copyMapToDesigner futtatása...");
    const sourceContainer = document.getElementById('celestial-map');
    const sourceCanvas = sourceContainer ? sourceContainer.querySelector('canvas') : null;
    
    if (!sourceCanvas || sourceCanvas.width === 0) {
        console.warn("Forrás canvas üres vagy nem található!"); 
        return;
    }

    const targetLayer = document.getElementById('celestial-map-layer');
    if (!targetLayer) return;

    // Nagyobb felbontású kép kinyerése (ha lehetséges)
    const dataURL = sourceCanvas.toDataURL('image/png');

    targetLayer.innerHTML = ''; 
    const svgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
    svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataURL);
    svgImage.setAttribute('href', dataURL); // Kompatibilitás
    svgImage.setAttribute('width', sourceCanvas.width);
    svgImage.setAttribute('height', sourceCanvas.height);
    svgImage.classList.add('celestial-map-image');

    targetLayer.appendChild(svgImage);
    console.log("Térkép sikeresen átmásolva.");
}

// --- ÚJ: LAYOUT KEZELÉS (Split View) ---
window.changeLayout = function(mode) {
    console.log("Layout váltás:", mode);
    layoutState.mode = mode;
    
    const photoLayer = document.getElementById('photo-layer');
    if (!photoLayer) return;

    // Fotó réteg kezelése
    if (mode === 'single') {
        photoLayer.style.display = 'none';
    } else {
        photoLayer.style.display = 'block';
        updatePhotoPosition(); // Fotó helyreigazítása
    }

    // Térkép helyreigazítása az új layouthoz
    window.refreshMapTransform();
}

// // --- FOTÓ POZICIONÁLÁSA ---
// function updatePhotoPosition() {
//     const photoLayer = document.getElementById('photo-layer');
//     const img = photoLayer.querySelector('image');
//     if (!img) return;

//     const paperVB = document.getElementById('designer-svg').getAttribute('viewBox').split(' ').map(Number);
//     const paperW = paperVB[2];
//     const paperH = paperVB[3];
//     const margin = paperW * 0.05; // 5% margó

//     // Kép méretei
//     // Azt akarjuk, hogy a kép kitöltse a rendelkezésre álló helyet (fél oldal)
//     // De meg kell tartani az arányait (aspect ratio), ezért vágni (clip) kellhet, 
//     // vagy 'preserveAspectRatio="xMidYMid slice"'-t használunk.
    
//     let targetX, targetY, targetW, targetH;
    
//     targetH = paperH - (margin * 2); // Függőlegesen margótól margóig
//     targetY = margin;
    
//     // Szélesség: a papír fele mínusz margók
//     targetW = (paperW / 2) - (margin * 1.5); 

//     if (layoutState.mode === 'split-left') {
//         // Kép Balra
//         targetX = margin;
//     } else if (layoutState.mode === 'split-right') {
//         // Kép Jobbra
//         targetX = (paperW / 2) + (margin * 0.5);
//     }

//     img.setAttribute('x', targetX);
//     img.setAttribute('y', targetY);
//     img.setAttribute('width', targetW);
//     img.setAttribute('height', targetH);
//     // Ez a kulcs: a slice miatt kitölti a dobozt (levágja a kilógót), mint a CSS cover
//     img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    
//     // Beállítjuk a vágómaszkot is a biztonság kedvéért (opcionális, ha a slice jól működik)
// }
// --- FOTÓ POZICIONÁLÁSA (JAVÍTOTT) ---
function updatePhotoPosition() {
    const photoLayer = document.getElementById('photo-layer');
    if (!photoLayer) return; // Biztonsági ellenőrzés
    
    const img = photoLayer.querySelector('image');
    if (!img) return;

    // ViewBox adatok lekérése
    const svg = document.getElementById('designer-svg');
    if (!svg) return;
    
    const paperVB = svg.getAttribute('viewBox').split(' ').map(Number);
    const paperW = paperVB[2];
    const paperH = paperVB[3];
    const margin = paperW * 0.05; // 5% margó

    // 1. Alapértelmezett értékek (hogy soha ne legyen undefined!)
    let targetX = 0;
    let targetY = margin;
    let targetW = paperW;
    let targetH = paperH - (margin * 2);

    // 2. Számítás a Layout mód alapján
    if (layoutState.mode === 'split-left') {
        // Kép Balra
        targetX = margin;
        targetW = (paperW / 2) - (margin * 1.5); 
    } 
    else if (layoutState.mode === 'split-right') {
        // Kép Jobbra
        targetX = (paperW / 2) + (margin * 0.5);
        targetW = (paperW / 2) - (margin * 1.5); 
    } 
    else {
        // Single mód (vagy fallback)
        // Ilyenkor elvileg rejtett a fotó, de ha mégis látszik, legyen teljes képernyős vagy 0
        targetX = 0;
        targetY = 0;
        targetW = paperW;
        targetH = paperH;
    }

    // 3. Értékek beírása (Most már biztosan számok)
    img.setAttribute('x', targetX);
    img.setAttribute('y', targetY);
    img.setAttribute('width', targetW);
    img.setAttribute('height', targetH);
    
    // Kitöltés módja (levágja a kilógó széleket, hogy kitöltse a dobozt)
    img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
}

// --- FOTÓ FELTÖLTÉS ---
window.handlePhotoUpload = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            layoutState.photoURL = e.target.result;
            renderPhoto();
            
            // Ha eddig single módban voltunk, váltsunk automatikusan split-re
            if (layoutState.mode === 'single') {
                window.changeLayout('split-left');
            } else {
                updatePhotoPosition();
            }
            
            document.getElementById('photo-controls').style.display = 'block';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function renderPhoto() {
    const photoLayer = document.getElementById('photo-layer');
    if (!photoLayer) return;
    
    photoLayer.innerHTML = ''; // Törlés
    
    if (layoutState.photoURL) {
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', layoutState.photoURL);
        img.setAttribute('href', layoutState.photoURL);
        // Kezdeti értékek, az updatePhotoPosition majd felülírja
        img.setAttribute('width', '100'); 
        img.setAttribute('height', '100');
        
        photoLayer.appendChild(img);
        updatePhotoPosition();
    }
}

window.removePhoto = function() {
    layoutState.photoURL = null;
    const photoLayer = document.getElementById('photo-layer');
    if (photoLayer) photoLayer.innerHTML = '';
    document.getElementById('photo-controls').style.display = 'none';
    window.changeLayout('single'); // Vissza teljes nézetre
}
// --- GOMBOK GENERÁLÁSA ---
function initDesignerTemplates() {
    const container = document.getElementById('designer-templates-grid'); 
    if (!container) return;
    container.innerHTML = ''; 

    const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;
// 1. VISSZAÁLLÍTÁS GOMB (Teljes szélesség)
    const resetCard = document.createElement('div');
    resetCard.className = 'theme-item full-width'; // CSS kezeli a szélességet
    resetCard.style.background = "#f0f0f0";
    resetCard.onclick = function() {
        if(typeof restoreUserState === 'function') {
            restoreUserState();
            // Ha kell, itt hívhatsz applyDesignerTheme-t is, de a restoreUserState elvileg kezeli
        }
    };
    resetCard.innerHTML = `
        <div style="font-size: 24px; margin-right: 15px; color:#333;">↺</div>
        <div>
            <div style="font-weight:bold; color:#333;">Visszaállítás</div>
            <div style="font-size:11px; color:#666;">Saját szerkesztés</div>
        </div>
    `;
    container.appendChild(resetCard);

    // for (const [key, theme] of Object.entries(themesSource)) {
    //     const card = document.createElement('div');
    //     card.className = 'theme-item';
    //     card.style.cursor = "pointer";

    //     const preview = document.createElement('div');
    //     preview.className = 'theme-preview-img';
        
    //     if (theme.image) {
    //          preview.style.background = `url('${theme.image}') center/cover no-repeat`;
    //     } else {
    //          preview.style.background = theme.background; 
    //     }
        
    //     preview.style.height = "60px";
    //     preview.style.width = "100%";
    //     preview.style.borderRadius = "4px";
    //     preview.style.marginBottom = "5px";

    //     const label = document.createElement('div');
    //     label.innerText = theme.name;
    //     label.style.textAlign = "center";
    //     label.style.fontSize = "12px";
    //     label.style.fontWeight = "bold";
    //     label.className = "theme-btn"; 
        
    //     card.onclick = function() {
    //         if (typeof window.applyDesignerTheme === 'function') {
    //             window.applyDesignerTheme(key);
    //         }
    //     };

    //     card.appendChild(preview);
    //     card.appendChild(label);
    //     container.appendChild(card);
    // }
    // 2. SABLONOK GENERÁLÁSA (PÁROK)
    for (const [key, theme] of Object.entries(themesSource)) {
        
        // Segédfüggvény a kártya gyártáshoz
        const createDesignerCard = (variant) => {
            const isHeart = (variant === 'heart');
            const card = document.createElement('div');
            card.className = 'theme-item';
            
            const preview = document.createElement('div');
            preview.className = 'theme-preview-img';
            
            // Kép URL logikája (Ugyanaz, mint a HTML-ben)
            let imgUrl = theme.image;
            if (isHeart && imgUrl) {
                imgUrl = imgUrl.replace('.png', '_heart.png');
            }

            if (imgUrl) {
                // contain: teljes kép látszik
                preview.style.background = `url('${imgUrl}') center/contain no-repeat, ${theme.background}`;
            } else {
                preview.style.background = theme.background; 
            }
            
            // Címke
            const label = document.createElement('div');
            label.className = "theme-btn";
            label.innerText = isHeart ? `♥ ${theme.name}` : theme.name;
            
            // Külön stílus a szívnek
            if(isHeart) {
                label.style.color = "#d81b60";
                label.style.background = "#fff0f5";
            }

            // Kattintás
            card.onclick = function() {
                if (typeof window.applyDesignerTheme === 'function') {
                    // Itt átadjuk a variánst is, ha a függvény támogatja, 
                    // de a te applyDesignerTheme-d jelenleg csak 'normal'-t tölt.
                    // Ha azt akarod, hogy a szív gomb szivet töltsön be a tervezőbe is:
                    
                    // Frissítjük a loadTheme hívást az applyDesignerTheme-ben (lásd lejjebb!)
                    window.applyDesignerTheme(key, variant); 
                }
            };

            card.appendChild(label); // Név felül
            card.appendChild(preview); // Kép alul
            return card;
        };

        // Hozzáadás sorrendben: Normál, majd Szív
        container.appendChild(createDesignerCard('normal'));
        container.appendChild(createDesignerCard('heart'));
    }
}
// --- GLOBÁLIS ÁLLAPOTOK ---
// let layoutState = {
//     mode: 'single', // 'single', 'double-left', 'double-right'
//     photoPos: 'center', // 'top', 'center', 'bottom' (a fotó függőleges igazítása)
//     photoScale: 1.0,    // (ha később kellene)
//     photoCroppedData: null // DataURL a kivágott képről
// };

// // SZÖVEG ADATSTRUKTÚRA (Bővítve)
// // Most már van map, photo és common kontextus
// let zoneDataStore = {
//     map: { 
//         top: { alignV: 'center', blocks: [] }, 
//         bottom: { alignV: 'center', blocks: [] } 
//     },
//     photo: { 
//         top: { alignV: 'center', blocks: [] }, 
//         bottom: { alignV: 'center', blocks: [] } 
//     },
//     common: { 
//         top: { alignV: 'center', blocks: [] }, 
//         bottom: { alignV: 'center', blocks: [] } 
//     }
// };

// // Flags: Közös-e a zóna?
// let zoneFlags = {
//     topCommon: false,
//     bottomCommon: false
// };
// --- SEGÉDFÜGGVÉNYEK ADATKEZELÉSHEZ ---
// Mivel most már nem egy globális zoneData van, hanem zoneDataStore, 
// a régi függvényeket át kell irányítani.

// Ez a függvény adja vissza az éppen releváns adatot a rendereléshez
// function getCurrentZoneData(zone) {
//     // Ha közös mód aktív az adott zónára (pl. top), akkor a 'common' adatot adjuk vissza,
//     // DE csak akkor, ha a UI-t rendereljük. A térkép renderelésnél mindent le kell kérdezni.
//     return zoneDataStore[currentTextContext][zone];
// }
// Helper: Helyes adatlekérés
function getCurrentZoneData(zone) {
    if (!zoneDataStore[currentTextContext]) return null;
    return zoneDataStore[currentTextContext][zone];
}
// --- CROPPER ÉS KÉP HOZZÁADÁS ---
let cropper;
// let tempImageSide = null; // Csak az első képnél számít az elrendezés miatt
let tempInsertSide = 'right'; // Hova szúrjuk be?

window.triggerPhotoUpload = function(side) {
    // tempImageSide = side;
    tempInsertSide = side;
    document.getElementById('photo-upload').click();
}

window.initCropperFromFile = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = document.getElementById('image-to-crop');
            image.src = e.target.result;
            document.getElementById('cropper-modal').style.display = 'flex';
            
            if (cropper) cropper.destroy();
            cropper = new Cropper(image, {
                aspectRatio: 1, // KÖR ALAKHOZ NÉGYZET
                viewMode: 1,
                autoCropArea: 1,
                ready: function() {
                    // CSS trükk a kör alakú megjelenítéshez (már a celestial_jo.html-ben is benne van)
                    document.querySelector('.cropper-view-box').style.borderRadius = '50%';
                    document.querySelector('.cropper-face').style.borderRadius = '50%';
                }
            });
        };
        reader.readAsDataURL(input.files[0]);
    }
    input.value = ''; 
}

window.closeCropper = function() {
    document.getElementById('cropper-modal').style.display = 'none';
    if (cropper) cropper.destroy();
}

window.performCrop = function() {
    if (!cropper) return;
    
    const canvas = cropper.getCroppedCanvas({ width: 1500, height: 1500 });
    const dataURL = canvas.toDataURL('image/png');
    
    // // Új kép hozzáadása a listához
    // const newPhoto = {
    //     id: Date.now(),
    //     dataURL: dataURL,
    //     align: 'center' // Alapértelmezett igazítás
    // };
    // Új fotó objektum
    const newId = Date.now();
    // --- 1. ÚJ RÉSZ: Adatok átvétele a Csillagtérkép konfigurációjából ---
    let defaultBorderColor = '#ffffff';
    let defaultBorderWidth = 2;
    let defaultBorderEnabled = true; // Legyen bekapcsolva alapból, ha a térképnek van
    
    // Megnézzük, van-e globális konfig és be van-e állítva a háttér/keret
    if (typeof window.myCelestialConf !== 'undefined' && window.myCelestialConf.background) {
        defaultBorderColor = window.myCelestialConf.background.stroke || '#ffffff';
        defaultBorderWidth = window.myCelestialConf.background.width || 2;
    }
    
    // --- 2. ÚJ RÉSZ: Pozíció átvétele ---
    const defaultAlign = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
    const newPhoto = {
        id: newId,
        type: 'photo',
        dataURL: dataURL,
        align: defaultAlign, // Ugyanoda kerül, mint a térkép
        scale: 1.0,
        borderWidth: defaultBorderWidth,   // Térkép vastagsága
        borderEnabled: defaultBorderEnabled, 
        borderColor: defaultBorderColor    // Térkép színe
    };
    // const newPhoto = {
    //     id: newId,
    //     type: 'photo',
    //     dataURL: dataURL,
    //     align: 'center',
    //     scale: 1.0, // 100%
    //     borderWidth: 10, // Alapértelmezett keret
    //     borderEnabled: false, // De kikapcsolva
    //     borderColor: '#ffffff'
    // };
    
    // layoutState.photos.push(newPhoto);
    // activePhotoId = newPhoto.id; // Ez legyen az aktív

    // // Layout beállítása (csak ha még single módban voltunk)
    // if (layoutState.mode === 'single') {
    //     if (tempImageSide === 'left') layoutState.mode = 'double-left';
    //     else layoutState.mode = 'double-right';
    //     // Vászon duplázása az első képnél
    //     window.updateCanvasSize(); 
    // }
    
    // closeCropper();
    // applyPhotoLayout(); // Render
    // switchTextContext('photo');
    // Beszúrás a listába
    if (tempInsertSide === 'left') {
        layoutState.elements.unshift(newPhoto);
    } else {
        layoutState.elements.push(newPhoto);
    }
    
    // Szöveg tárhely létrehozása ehhez a fotóhoz
    zoneDataStore[`photo_${newId}`] = { 
        top: { alignV: 'center', blocks: [] }, 
        bottom: { alignV: 'center', blocks: [] } 
    };
// Alap blokkok neki is
    addNewBlockToStore(`photo_${newId}`, 'top', true);
    addNewBlockToStore(`photo_${newId}`, 'bottom', true);
    closeCropper();
    
    // Frissítések
    window.updateCanvasSize(); // Ez hívja majd a refreshMapTransform-ot is
    updatePhotoListUI();
    highlightPhoto(newId); // Kijelöljük az újat
}

// window.removePhotoLayout = function() {
//     layoutState.mode = 'single';
//     layoutState.photos = [];
//     activePhotoId = null;
//     applyPhotoLayout();
//     window.updateCanvasSize(); // Vissza kicsire
//     switchTextContext('map');
// }
window.removePhotoLayout = function() {
    // Visszaállunk csak a térképre
    layoutState.elements = [{ id: 'main-map', type: 'map' }];
    layoutState.activePhotoId = null;
    
    window.updateCanvasSize();
    updatePhotoListUI();
    switchTextContext('map');
}

// --- FOTÓ KEZELÉS UI ---
window.highlightPhoto = function(id) {
    layoutState.activePhotoId = id;
    
    // UI Frissítés
    updatePhotoListUI();
    
    // Inputok beállítása az aktív képhez
    const photo = layoutState.elements.find(el => el.id === id);
    if (photo) {
        document.getElementById('single-photo-settings').style.display = 'block';
        
        document.getElementById('photo-scale-input').value = photo.scale * 100;
        document.getElementById('photo-scale-disp').innerText = Math.round(photo.scale * 100) + '%';
        
        document.getElementById('photo-border-input').value = photo.borderWidth;
        document.getElementById('photo-border-disp').innerText = photo.borderWidth + 'px';
        
        document.getElementById('photo-border-check').checked = photo.borderEnabled;
        document.getElementById('photo-border-color').value = photo.borderColor;
        
        // Váltás a fotó szövegszerkesztőjére
        switchTextContext(`photo_${id}`);
    } else {
        document.getElementById('single-photo-settings').style.display = 'none';
    }
}

window.updateActivePhotoProp = function(prop, value) {
    if (!layoutState.activePhotoId) return;
    const photo = layoutState.elements.find(el => el.id === layoutState.activePhotoId);
    if (!photo) return;
    
    if (prop === 'scale') {
        photo.scale = parseInt(value) / 100;
        document.getElementById('photo-scale-disp').innerText = value + '%';
    } else if (prop === 'border') {
        photo.borderWidth = parseInt(value);
        document.getElementById('photo-border-disp').innerText = value + 'px';
    } else if (prop === 'borderEnabled') {
        photo.borderEnabled = value; // Checkbox boolean
        // Ha bekapcsoljuk és 0 a méret, állítsuk be alapra
        if (value && photo.borderWidth === 0) {
             photo.borderWidth = 10;
             document.getElementById('photo-border-input').value = 10;
             document.getElementById('photo-border-disp').innerText = '10px';
        }
    } else if (prop === 'borderColor') {
        photo.borderColor = value;
    } else if (prop === 'align') {
        photo.align = value;
    }
    
    window.refreshMapTransform(); // Újrarajzolás
}

// function updatePhotoListUI() {
//     const container = document.getElementById('photo-list-container');
//     container.innerHTML = '';
    
//     // Csak a fotókat listázzuk
//     const photos = layoutState.elements.filter(el => el.type === 'photo');
    
//     // if (photos.length === 0) {
//     //     container.innerHTML = '<div style="padding:10px; color:#888; font-size:12px;">Nincs feltöltött kép.</div>';
//     //     document.getElementById('single-photo-settings').style.display = 'none';
//     //     // Ha nincs fotó, rejtsük el a fotó fület
//     //     document.getElementById('tab-context-photo').style.display = 'none';
//     //     return;
//     // }
    
//     // // Megjelenítjük a fotó fület
//     // const photoTab = document.getElementById('tab-context-photo');
//     // photoTab.style.display = 'block';
//     // // Ha van aktív fotó, írjuk át a fül nevét
//     // if (layoutState.activePhotoId) {
//     if (photos.length === 0) {
//         container.innerHTML = '<div style="padding:10px; color:#888; font-size:12px;">Nincs feltöltött kép.</div>';
//         document.getElementById('single-photo-settings').style.display = 'none';
        
//         // --- MÓDOSÍTÁS: Fülek elrejtése, ha nincs kép ---
//         document.getElementById('tab-context-photo').style.display = 'none';
//         document.getElementById('tab-context-common').style.display = 'none';
//         return;
//     }
    
//     // --- MÓDOSÍTÁS: Fülek megjelenítése, ha van kép ---
//     document.getElementById('tab-context-photo').style.display = 'block';
//     document.getElementById('tab-context-common').style.display = 'block'; // ITT JELENÍTJÜK MEG!

//     const photoTab = document.getElementById('tab-context-photo');
//     if (layoutState.activePhotoId) {
//         photoTab.innerText = "Kép Szövege";
//         photoTab.onclick = function() { switchTextContext(`photo_${layoutState.activePhotoId}`); };
//     } else {
//         photoTab.innerText = "Válassz Képet";
//     }

//     photos.forEach((photo, idx) => {
//         const div = document.createElement('div');
//         div.className = `photo-list-item ${photo.id === layoutState.activePhotoId ? 'active' : ''}`;
//         div.onclick = () => highlightPhoto(photo.id);
        
//         div.innerHTML = `
//             <span>📷 Kép ${idx + 1}</span>
//             <button onclick="deletePhotoElement(event, ${photo.id})" style="background:none; border:none; color:#ff4444; cursor:pointer;">×</button>
//         `;
//         container.appendChild(div);
//     });
    
//     // Controls megjelenítése
//     document.getElementById('active-photo-controls').style.display = 'block';
// }

function updatePhotoListUI() {
    const container = document.getElementById('photo-list-container');
    container.innerHTML = '';
    
    const photos = layoutState.elements.filter(el => el.type === 'photo');
    
    // --- ÚJ RÉSZ: Referenciák a kapcsolók dobozaira ---
    const topToggle = document.getElementById('top-common-toggle-container');
    const bottomToggle = document.getElementById('bottom-common-toggle-container');

    if (photos.length === 0) {
        container.innerHTML = '<div style="padding:10px; color:#888; font-size:12px;">Nincs feltöltött kép.</div>';
        document.getElementById('single-photo-settings').style.display = 'none';
        
        // Fülek elrejtése
        document.getElementById('tab-context-photo').style.display = 'none';
        document.getElementById('tab-context-common').style.display = 'none';
        
        // --- ÚJ: Kapcsolók elrejtése, ha nincs kép ---
        if(topToggle) topToggle.style.display = 'none';
        if(bottomToggle) bottomToggle.style.display = 'none';
        
        return;
    }
    
    // Fülek megjelenítése
    document.getElementById('tab-context-photo').style.display = 'block';
    document.getElementById('tab-context-common').style.display = 'block';
    
    // --- ÚJ: Kapcsolók MEGJELENÍTÉSE, ha van kép ---
    if(topToggle) topToggle.style.display = 'block';
    if(bottomToggle) bottomToggle.style.display = 'block';

    const photoTab = document.getElementById('tab-context-photo');
    if (layoutState.activePhotoId) {
        photoTab.innerText = "Kép Szövege";
        photoTab.onclick = function() { switchTextContext(`photo_${layoutState.activePhotoId}`); };
    } else {
        photoTab.innerText = "Válassz Képet";
    }

    photos.forEach((photo, idx) => {
        const div = document.createElement('div');
        div.className = `photo-list-item ${photo.id === layoutState.activePhotoId ? 'active' : ''}`;
        div.onclick = () => highlightPhoto(photo.id);
        
        div.innerHTML = `
            <span>📷 Kép ${idx + 1}</span>
            <button onclick="deletePhotoElement(event, ${photo.id})" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:16px;">×</button>
        `;
        container.appendChild(div);
    });
    
    document.getElementById('active-photo-controls').style.display = 'block';
}


window.deletePhotoElement = function(e, id) {
    e.stopPropagation();
    layoutState.elements = layoutState.elements.filter(el => el.id !== id);
    // if (layoutState.activePhotoId === id) layoutState.activePhotoId = null;
    if (layoutState.activePhotoId === id) {
        layoutState.activePhotoId = null;
        switchTextContext('map'); 
    }
    window.updateCanvasSize();
    updatePhotoListUI();
    // switchTextContext('map');
}

// Kép igazítása (Az éppen aktívat, vagy az utolsót)
window.alignActivePhoto = function(pos) {
    if (layoutState.photos.length === 0) return;
    
    // Ha nincs kijelölt, vegyük az utolsót
    let targetId = activePhotoId || layoutState.photos[layoutState.photos.length-1].id;
    let photo = layoutState.photos.find(p => p.id === targetId);
    
    if (photo) {
        photo.align = pos;
        window.refreshMapTransform(); // Újrapozicionálás
    }
}

// --- LAYOUT ALKALMAZÁSA (RENDER) ---
function applyPhotoLayout() {
    const photoGroup = document.getElementById('photo-transform-group');
    const controls = document.getElementById('active-photo-controls');
    const listContainer = document.getElementById('photo-list-container');
    
    // Tabok
    const photoTab = document.getElementById('tab-context-photo');
    const commonTab = document.getElementById('tab-context-common');
    const mapTab = document.getElementById('tab-context-map');

    if (layoutState.mode === 'single') {
        photoGroup.style.display = 'none';
        controls.style.display = 'none';
        photoTab.style.display = 'none';
        commonTab.style.display = 'none';
        mapTab.innerHTML = "Csillagtérkép Beállításai";
    } else {
        photoGroup.style.display = 'block';
        controls.style.display = 'block';
        
        // Képek renderelése az SVG-be
        photoGroup.innerHTML = ''; // Törlés
        listContainer.innerHTML = ''; // Lista törlés

        layoutState.photos.forEach((photo, index) => {
            // SVG elem
            const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', photo.dataURL);
            img.setAttribute('id', `photo-${photo.id}`);
            // A méretet és pozíciót a refreshMapTransform fogja beállítani
            img.setAttribute('width', '1000'); 
            img.setAttribute('height', '1000');
            img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
            // Kör alakú vágás (definiált clipPath használata)
            img.setAttribute('clip-path', 'url(#photo-circle-clip)');
            
            photoGroup.appendChild(img);

            // UI Lista elem
            const item = document.createElement('div');
            item.innerHTML = `<span onclick="activePhotoId=${photo.id}; highlightPhoto(${photo.id})" style="cursor:pointer;">📷 Kép ${index+1}</span> <button onclick="deletePhoto(${photo.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>`;
            listContainer.appendChild(item);
        });

        photoTab.style.display = 'block';
        commonTab.style.display = 'block';
        mapTab.innerHTML = "Térkép Oldal";
    }
    
    // Pozíciók frissítése
    window.refreshMapTransform();
}

// window.deletePhoto = function(id) {
//     layoutState.photos = layoutState.photos.filter(p => p.id !== id);
//     if (layoutState.photos.length === 0) {
//         removePhotoLayout();
//     } else {
//         applyPhotoLayout();
//     }
// }

// --- MÉRETEZÉS ÉS IGAZÍTÁS (CM & PIXEL) ---

// 1. Térkép méretezése CM-ben (INPUT)
window.setMapWidth = function(cmValue) {
    if (!cmValue) return;
    let val = parseFloat(cmValue);
    
    // Validálás a vászon méretéhez
    const canvasWInput = document.getElementById('canvas-width');
    const canvasHInput = document.getElementById('canvas-height');
    // const maxW = parseFloat(canvasWInput.value) || 21;
    // let maxW = Math.min(parseFloat(canvasWInput.value) - 1, parseFloat(canvasHInput.value) - 1);
    let maxW = Math.min(parseFloat(canvasWInput.value), parseFloat(canvasHInput.value) );

    
    // const canvasHeightInput = document.getElementById('canvas-height');
    // let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1); //parseFloat(canvasWidthInput.value) || 21;

    if (val > maxW -2) {
        val = maxW;
        document.getElementById('map-width-cm-input').value = val; // Input visszaírás
    }
    
    currentMapTargetWidthCM = val;
    window.refreshMapTransform();
}

// 2. Vászon méretezése (INPUT)
const originalUpdateCanvasSize = window.updateCanvasSize;
window.updateCanvasSize = function() {
    const widthInput = document.getElementById('canvas-width');
    const heightInput = document.getElementById('canvas-height');
    let widthCm = parseFloat(widthInput.value) || 21;
    let heightCm = parseFloat(heightInput.value) || 30;

    // // SZABÁLY: Ha a vásznat kisebbre vesszük, mint a térkép, a térkép is menjen össze
    // if (currentMapTargetWidthCM && currentMapTargetWidthCM > widthCm) {
    //     currentMapTargetWidthCM = widthCm;
    //     document.getElementById('map-width-cm-input').value = widthCm;
    // }

    // // Logikai szélesség duplázása ha osztott nézet
    // let logicalWidthCm = (layoutState.mode !== 'single') ? widthCm * 2 : widthCm;

    // // ViewBox számítás (Fix magassághoz igazítva, pl. 1272px)
    // const baseHeight = 1272;
    // const aspectRatio = logicalWidthCm / heightCm;
    // const newWidth = baseHeight * aspectRatio;

    // const designerSVG = document.getElementById('designer-svg');
    // designerSVG.setAttribute('viewBox', `0 0 ${newWidth} ${baseHeight}`);
    
    // const bgRect = document.getElementById('designer-background-rect');
    // if(bgRect) {
    //     bgRect.setAttribute('width', newWidth);
    //     bgRect.setAttribute('height', baseHeight);
    // }

    // setTimeout(window.refreshMapTransform, 50);
    // 2. Összes szélesség (lapok száma alapján)
    const pageCount = layoutState.elements.length;
    const totalWidthCm = widthCm * pageCount;

    // 3. ViewBox számítása
    // Fix magasság (1272px) alapján számoljuk a szélességet
    const baseHeight = 1272;
//             viewBoxWidth = 2700; 
    const aspectRatio = totalWidthCm / heightCm;
    const newWidth = baseHeight * aspectRatio;

    // 4. Alkalmazás
    const designerSVG = document.getElementById('designer-svg');
    designerSVG.setAttribute('viewBox', `0 0 ${newWidth} ${baseHeight}`);
    
    // Háttér rect
    const bgRect = document.getElementById('designer-background-rect');
    if(bgRect) {
        bgRect.setAttribute('width', newWidth);
        bgRect.setAttribute('height', baseHeight);
    }
    // FONTOS: A külső wrapper aspect-ratio-jának beállítása!
    // Így mindig kitölti a rendelkezésre álló helyet (max 95%)
    const wrapper = document.getElementById('canvas-wrapper');
    if(wrapper) {
        wrapper.style.aspectRatio = `${newWidth} / ${baseHeight}`;
    }
    // const mapWidthCmInput = document.getElementById('map-width-cm-input');
    // if (widthCm <= parseFloat(mapWidthCmInput.value) || heightCm <= parseFloat(mapWidthCmInput.value)) {
    //     fitMapToCanvas()
    // }
    const mapWidthCmInput = document.getElementById('map-width-cm-input');
    // if (mapWidthCmInput && widthCm <= parseFloat(mapWidthCmInput.value)) {
    if (heightCm <= parseFloat(mapWidthCmInput.value) || widthCm <= parseFloat(mapWidthCmInput.value)) {
        if(window.fitMapToCanvas) window.fitMapToCanvas();
    }
    // 5. Tartalom frissítése
    setTimeout(window.refreshMapTransform, 50);
}

// // 3. FŐ TRANSZFORMÁCIÓS FÜGGVÉNY (POZÍCIONÁLÁS)
// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     // --- SETUP ---
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
    
//     // Pixel/CM arány
//     const canvasWidthInput = document.getElementById('canvas-width');
//     const singlePageCm = parseFloat(canvasWidthInput.value) || 21;
//     // Ha dupla mód van, a totalW két oldalnyi, de a singlePageCm csak egy.
//     // Pixel per CM = (totalW / (layoutState.mode !== 'single' ? 2 : 1)) / singlePageCm
//     const pxPerCm = totalH / (parseFloat(document.getElementById('canvas-height').value) || 30); // Magasság alapú pontosabb

//     const singleW = (layoutState.mode === 'single') ? totalW : totalW / 2;
//     const margin = singleW * 0.05;

//     // --- A. CSILLAGTÉRKÉP ---
//     let mapStartX = (layoutState.mode === 'double-left') ? singleW : 0;
    
//     const mapGroup = document.getElementById('map-transform-group');
//     const mapSvg = mapGroup.querySelector('svg, image');
    
//     if (mapSvg) {
//         const bbox = getMapContentBBox(mapSvg);
//         const contentW = bbox.width || 1000;
//         const contentH = bbox.height || 1000;

//         // Cél méret kiszámítása (CM -> Pixel)
//         let targetW_Px;
//         if (currentMapTargetWidthCM) {
//             targetW_Px = currentMapTargetWidthCM * pxPerCm;
//         } else {
//             // Alapértelmezett: 90%
//             targetW_Px = (singleW - margin*2); 
//         }
        
//         // Skála
//         const scale = targetW_Px / contentW;
        
//         // Pozíció
//         const areaCenterX = mapStartX + (singleW / 2);
//         const areaCenterY = totalH / 2;
        
//         let transX = areaCenterX - (contentW * scale) / 2; // Vízszintesen mindig közép
//         let transY = 0;
        
//         // Magassági igazítás
//         let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
        
//         // VALÓS MAGASSÁG alapú igazítás
//         const realH = contentH * scale;
        
//         if (pos === 'center') transY = areaCenterY - realH / 2;
//         else if (pos === 'top') transY = margin;
//         else if (pos === 'bottom') transY = totalH - margin - realH;

//         mapGroup.setAttribute('transform', `translate(${transX}, ${transY}) scale(${scale})`);
        
//         // Bounds mentése a szövegnek (SVG koordinátákban)
//         // Mivel translate+scale van, a végső Y: transY. Magasság: realH.
//         layoutState.mapBounds = {
//             top: transY,
//             bottom: transY + realH,
//             height: realH
//         };
//     }

//     // --- B. KÉPEK (Több kép kezelése) ---
//     if (layoutState.mode !== 'single') {
//         let photoStartX = (layoutState.mode === 'double-right') ? singleW : 0;
        
//         // Minden képet ugyanúgy méretezünk és igazítunk a saját térfelén
//         layoutState.photos.forEach(photo => {
//             const imgEl = document.getElementById(`photo-${photo.id}`);
//             if (!imgEl) return;
            
//             const pSize = 1000; // Alap méret
//             const safeW = singleW - (margin * 2);
//             const pScale = safeW / pSize; // Kitölti a szélességet
            
//             const pCenterX = photoStartX + (singleW / 2);
//             const pCenterY = totalH / 2;
            
//             let pTransX = pCenterX - (pSize * pScale) / 2;
//             let pTransY = 0;
            
//             // Egyedi igazítás képenként
//             const realH = pSize * pScale;
//             if (photo.align === 'center') pTransY = pCenterY - realH / 2;
//             else if (photo.align === 'top') pTransY = margin;
//             else if (photo.align === 'bottom') pTransY = totalH - margin - realH;
            
//             // Alkalmazzuk az attribútumokon (image-en nincs transform group, közvetlenül állítjuk)
//             // VAGY csinálhatunk group-ot, de egyszerűbb attribútumokkal ha nincs forgatás.
//             // Mivel a scale bonyolult attribútumban, inkább a parent photo-transform-group-ot kéne használni, 
//             // DE ott több kép van. 
//             // MEGOLDÁS: Minden képnek pozíciót számolunk és attribútumba írjuk.
            
//             imgEl.setAttribute('x', pTransX);
//             imgEl.setAttribute('y', pTransY);
//             imgEl.setAttribute('width', pSize * pScale);
//             imgEl.setAttribute('height', pSize * pScale);
//             // Clip path-nak is követnie kellene? 
//             // A clipPath fix koordinátás. Ez probléma.
//             // Inkább használjunk minden képhez külön <g>-t transformmal.
            
//             // JAVÍTÁS: applyPhotoLayout-ban <g> -be csomagoljuk a képeket!
//             // (Ez a kódrészlet feltételezi, hogy a HTML struktúrát módosítottuk, lásd lejjebb)
//         });
        
//         // Mivel a fenti "x, y" állítás clip-path-nál nem működik jól (a maszk nem mozdul),
//         // ezért a struktúrát a layout alkalmazásnál javítani kell:
//         renderPhotosWithTransforms(photoStartX, singleW, totalH, margin);
//     }

//     // Szövegek frissítése
//     window.renderFixedTexts();
// }

// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     // 1. Vászon adatok
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
    
//     const pageCount = layoutState.elements.length;
//     const slotW = totalW / pageCount; // Egy elem szélessége
//     const margin = slotW * 0.05; // 5% margó az adott slotban

//     // 2. Photo konténer ürítése (újrarajzoljuk a képeket)
//     const photoGroup = document.getElementById('photo-transform-group');
//     if (!photoGroup) return;
//     photoGroup.innerHTML = ''; 
//     photoGroup.style.display = 'block';

//     // 3. Végigmegyünk az elemeken és pozicionáljuk őket
//     layoutState.elements.forEach((el, index) => {
//         const slotStartX = index * slotW;
//         const slotCenterX = slotStartX + (slotW / 2);
//         const slotCenterY = totalH / 2;
        
//         // --- HA TÉRKÉP ---
//         if (el.type === 'map') {
//             const mapGroup = document.getElementById('map-transform-group');
//             const mapSvg = mapGroup.querySelector('svg, image');
            
//             if (mapSvg) {
//                 // Tartalom mérése
//                 const bbox = getMapContentBBox(mapSvg);
//                 const contentW = bbox.width || 1000;
//                 const contentH = bbox.height || 1000;
                
//                 // Skála (hogy beférjen a slotba)
//                 const safeW = slotW - (margin * 2);
//                 const safeH = totalH - (margin * 2);
                
//                 // Felhasználói beállítások
//                 // (Itt bevezethetnénk, hogy a térkép mérete is állítható legyen cm-ben, mint kérted)
//                 // A setMapWidth függvény már írja a currentMapTargetWidthCM-et.
                
//                 let targetW_Px = safeW; // Default max
                
//                 // Ha van beállított CM méret, átváltjuk pixelre
//                 const canvasWInput = document.getElementById('canvas-width');
//                 const basePageCm = parseFloat(canvasWInput.value) || 21;
//                 // pxPerCm = slotW / basePageCm
                
//                 if (typeof currentMapTargetWidthCM !== 'undefined' && currentMapTargetWidthCM) {
//                     const pxPerCm = slotW / basePageCm;
//                     targetW_Px = currentMapTargetWidthCM * pxPerCm;
//                     // Limit: ne lógjon ki a slotból
//                     if (targetW_Px > slotW) targetW_Px = slotW; 
//                 }

//                 const scale = targetW_Px / contentW; // Csak szélességre skálázunk, arányosan
                
//                 // Valós méret skálázva
//                 const realH = contentH * scale;
//                 const realW = contentW * scale;

//                 // Pozíció (Centering Logic Javítva)
//                 // A transX úgy kell beállítani, hogy:
//                 // (bbox.x * scale) + transX = (slotCenterX - realW/2)
//                 // Tehát: transX = (slotCenterX - realW/2) - (bbox.x * scale)
                
//                 // Eltolás a slot közepére
//                 let transX = (slotCenterX - realW / 2) - (bbox.x * scale);
//                 let transY = 0;
                
//                 let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
                
//                 if (pos === 'center') {
//                     // (slotCenterY - realH/2) - (bbox.y * scale)
//                     transY = (slotCenterY - realH / 2) - (bbox.y * scale);
//                 } else if (pos === 'top') {
//                     transY = margin - (bbox.y * scale);
//                 } else if (pos === 'bottom') {
//                     transY = (totalH - margin - realH) - (bbox.y * scale);
//                 }

//                 mapGroup.setAttribute('transform', `translate(${transX}, ${transY}) scale(${scale})`);
                
//                 // Mentjük a határokat a szövegigazításhoz (SVG koordinátákban a vászonhoz képest)
//                 // Mivel a transformGroup el van tolva, a térkép "teteje" vizuálisan:
//                 // Top = transY + (bbox.y * scale)
//                 // Bottom = Top + realH
//                 layoutState.mapBounds = {
//                     top: transY + (bbox.y * scale),
//                     bottom: transY + (bbox.y * scale) + realH
//                 };
//             }
//         } 
        
//         // --- HA FOTÓ ---
//         else if (el.type === 'photo') {
//             // Group létrehozása
//             const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
//             g.setAttribute('id', `photo-group-${el.id}`);
            
//             // Kép alapméret (a cropperből 1000x1000 jött)
//             const pSize = 1000; 
            
//             // Skála számítása (Slot mérethez + User Scale)
//             const safeW = slotW - (margin * 2);
//             // Alap skála, hogy kitöltse a slotot
//             const baseScale = safeW / pSize; 
//             const finalScale = baseScale * (el.scale || 1.0);
            
//             const realSize = pSize * finalScale;
            
//             // Pozíció
//             let transX = slotCenterX - (realSize / 2);
//             let transY = 0;
            
//             if (el.align === 'center') transY = slotCenterY - (realSize / 2);
//             else if (el.align === 'top') transY = margin;
//             else if (el.align === 'bottom') transY = totalH - margin - realSize;
            
//             g.setAttribute('transform', `translate(${transX}, ${transY}) scale(${finalScale})`);
            
//             // --- KÉP ELEM ---
//             const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
//             img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', el.dataURL);
//             img.setAttribute('width', pSize);
//             img.setAttribute('height', pSize);
//             // Fontos: a clip-path definíciója a HTML-ben van (#photo-circle-clip)
//             // A clipPath cx=500 cy=500 r=500, ami pont illik az 1000x1000 képhez
//             img.setAttribute('clip-path', 'url(#photo-circle-clip)');
//             g.appendChild(img);
            
//             // --- KÖRVONAL (KÜLÖN KÖR) ---
//             if (el.borderWidth > 0) {
//                 const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//                 border.setAttribute('cx', 500); // 1000x1000 közepe
//                 border.setAttribute('cy', 500);
//                 border.setAttribute('r', 500 - (el.borderWidth / 2 / finalScale)); // Beljebb húzzuk, hogy látszódjon
//                 border.setAttribute('fill', 'none');
//                 border.setAttribute('stroke', el.borderColor);
//                 // A stroke-width-et vissza kell skálázni, hogy "pixelben" értelmezhető legyen a usernek
//                 // Ha a user 10px-et akar, de a skála 0.5, akkor 20px-et kell rajzolni
//                 border.setAttribute('stroke-width', el.borderWidth / finalScale);
//                 g.appendChild(border);
//             }
            
//             photoGroup.appendChild(g);
//         }
//     });

//     // Szövegek frissítése
//     window.renderFixedTexts();
// }


// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
    
//     const pageCount = layoutState.elements.length;
//     const slotW = totalW / pageCount;
//     const margin = slotW * 0.05;

//     const photoGroup = document.getElementById('photo-transform-group');
//     if (!photoGroup) return;
//     photoGroup.innerHTML = ''; 
//     photoGroup.style.display = 'block';

//     layoutState.elements.forEach((el, index) => {
//         const slotStartX = index * slotW;
//         const slotCenterX = slotStartX + (slotW / 2);
//         const slotCenterY = totalH / 2;
        
//         // --- TÉRKÉP ---
//         if (el.type === 'map') {
//             const mapGroup = document.getElementById('map-transform-group');
//             const mapSvg = mapGroup.querySelector('svg, image');
            
//             if (mapSvg) {
//                 const bbox = getMapContentBBox(mapSvg);
//                 const contentW = bbox.width || 1000;
//                 const contentH = bbox.height || 1000;
                
//                 // CM alapú méretezés vagy 90%
//                 let targetW_Px = slotW - (margin * 2);
//                 const canvasWInput = document.getElementById('canvas-width');
//                 const basePageCm = parseFloat(canvasWInput.value) || 21;
                
//                 if (typeof currentMapTargetWidthCM !== 'undefined' && currentMapTargetWidthCM) {
//                     const pxPerCm = slotW / basePageCm;
//                     targetW_Px = currentMapTargetWidthCM * pxPerCm;
//                     if (targetW_Px > slotW) targetW_Px = slotW; 
//                 }

//                 const scale = targetW_Px / contentW; 
//                 const realH = contentH * scale;
//                 const realW = contentW * scale;

//                 let transX = (slotCenterX - realW / 2) - (bbox.x * scale);
//                 let transY = 0;
                
//                 let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
//                 if (pos === 'center') transY = (slotCenterY - realH / 2) - (bbox.y * scale);
//                 else if (pos === 'top') transY = margin - (bbox.y * scale);
//                 else if (pos === 'bottom') transY = (totalH - margin - realH) - (bbox.y * scale);

//                 mapGroup.setAttribute('transform', `translate(${transX}, ${transY}) scale(${scale})`);
                
//                 layoutState.mapBounds = {
//                     top: transY + (bbox.y * scale),
//                     bottom: transY + (bbox.y * scale) + realH
//                 };
//             }
//         } 
        
//         // --- FOTÓ ---
//         else if (el.type === 'photo') {
//             const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
//             g.setAttribute('id', `photo-group-${el.id}`);
            
//             const pSize = 1000; 
//             const safeW = slotW - (margin * 2);
//             const baseScale = safeW / pSize; 
//             const finalScale = baseScale * (el.scale || 1.0);
//             const realSize = pSize * finalScale;
            
//             let transX = slotCenterX - (realSize / 2);
//             let transY = 0;
            
//             if (el.align === 'center') transY = slotCenterY - (realSize / 2);
//             else if (el.align === 'top') transY = margin;
//             else if (el.align === 'bottom') transY = totalH - margin - realSize;
            
//             g.setAttribute('transform', `translate(${transX}, ${transY}) scale(${finalScale})`);
            
//             const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
//             img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', el.dataURL);
//             img.setAttribute('width', pSize);
//             img.setAttribute('height', pSize);
//             img.setAttribute('clip-path', 'url(#photo-circle-clip)');
//             g.appendChild(img);
            
//             // Körvonal
//             if (el.borderEnabled && el.borderWidth > 0) {
//                 const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//                 border.setAttribute('cx', 500);
//                 border.setAttribute('cy', 500);
//                 // A sugárból kivonjuk a vastagság felét, hogy befelé nőjön
//                 border.setAttribute('r', 500 - (el.borderWidth / 2 / finalScale));
//                 border.setAttribute('fill', 'none');
//                 border.setAttribute('stroke', el.borderColor);
//                 border.setAttribute('stroke-width', el.borderWidth / finalScale);
//                 g.appendChild(border);
//             }
            
//             photoGroup.appendChild(g);
//         }
//     });

//     window.renderFixedTexts();
// }
// --- FŐ TRANSZFORMÁCIÓ (ELEMENT POZÍCIONÁLÁS) ---
window.refreshMapTransform = function() {
    if (!getDOMElements()) return;

    const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const totalW = paperVB[2];
    const totalH = paperVB[3];
    
    const slotW = totalW / layoutState.elements.length;
    const margin = slotW * 0.05;

    const photoGroup = document.getElementById('photo-transform-group');
    if (!photoGroup) return;
    photoGroup.innerHTML = ''; 
    photoGroup.style.display = 'block';
    // --- ÚJ RÉSZ: KÖZÖS MÉRET KISZÁMÍTÁSA ---
    // Ez biztosítja, hogy a térkép és a kép pontosan ugyanakkora legyen
    let sharedTargetWidthPx = slotW - (margin * 2); 
    
    const canvasWInput = document.getElementById('canvas-width');
    const canvasHInput = document.getElementById('canvas-height');
    
    // Ha van beállított CM méret, azt használjuk mindkettőhöz
    if (canvasWInput && canvasHInput && typeof currentMapTargetWidthCM !== 'undefined' && currentMapTargetWidthCM) {
        const pxPerCm = totalH / (parseFloat(canvasHInput.value) || 30);
        sharedTargetWidthPx = currentMapTargetWidthCM * pxPerCm;
        
        // Ne lógjon ki
        if (sharedTargetWidthPx > (slotW - 10)) sharedTargetWidthPx = slotW - 10;
    }

    layoutState.elements.forEach((el, index) => {
        const slotStartX = index * slotW;
        const slotCenterX = slotStartX + (slotW / 2);
        const slotCenterY = totalH / 2;
        
        // --- HA TÉRKÉP ---
        if (el.type === 'map') {
            const mapGroup = document.getElementById('map-transform-group');
            const mapSvg = mapGroup.querySelector('svg, image');
            
            if (mapSvg) {
                const bbox = getMapContentBBox(mapSvg);
                const contentW = bbox.width || 1000;
                const contentH = bbox.height || 1000;
                
                // let targetW_Px = slotW - (margin * 2);
                // const canvasWInput = document.getElementById('canvas-width');
                // const basePageCm = parseFloat(canvasWInput.value) || 21;
                
                // if (typeof currentMapTargetWidthCM !== 'undefined' && currentMapTargetWidthCM) {
                //     const pxPerCm = slotW / basePageCm;
                //     targetW_Px = currentMapTargetWidthCM * pxPerCm;
                //     if (targetW_Px > slotW) targetW_Px = slotW; 
                // }

                // const scale = targetW_Px / contentW; 
                // SKÁLA: A közös sharedTargetWidthPx alapján
                const scale = sharedTargetWidthPx / contentW;
                const realH = contentH * scale;
                const realW = contentW * scale;

                let transX = (slotCenterX - realW / 2) - (bbox.x * scale);
                let transY = 0;
                
                let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
                
                if (pos === 'center') transY = (slotCenterY - realH / 2) - (bbox.y * scale);
                else if (pos === 'top') transY = margin - (bbox.y * scale);
                else if (pos === 'bottom') transY = (totalH - margin - realH) - (bbox.y * scale);

                mapGroup.setAttribute('transform', `translate(${transX}, ${transY}) scale(${scale})`);
                
                // Határok mentése
                layoutState.mapBounds = {
                    top: transY + (bbox.y * scale),
                    bottom: transY + (bbox.y * scale) + realH
                };
                el.bounds = layoutState.mapBounds; // Map saját határa
            }
        } 
        
        // --- HA FOTÓ ---
        else if (el.type === 'photo') {
            const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            g.setAttribute('id', `photo-group-${el.id}`);
            
            const pSize = 1000; 
            const safeW = slotW - (margin * 2);
            // const baseScale = safeW / pSize; 
            // const finalScale = baseScale * (el.scale || 1.0);
            // SKÁLA: A közös sharedTargetWidthPx alapján
            const baseScale = sharedTargetWidthPx / pSize; 
            const finalScale = baseScale * (el.scale || 1.0);
            const realSize = pSize * finalScale;
            
            let transX = slotCenterX - (realSize / 2);
            let transY = 0;
            
            // Itt számítjuk ki a pozíciót az 'align' alapján
            if (el.align === 'center') transY = slotCenterY - (realSize / 2);
            else if (el.align === 'top') transY = margin;
            else if (el.align === 'bottom') transY = totalH - margin - realSize;
            
            g.setAttribute('transform', `translate(${transX}, ${transY}) scale(${finalScale})`);
            
            // FONTOS: Elmentjük a fotó határait a szövegigazításhoz!
            el.bounds = {
                top: transY,
                bottom: transY + realSize
            };

            const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', el.dataURL);
            img.setAttribute('width', pSize);
            img.setAttribute('height', pSize);
            img.setAttribute('clip-path', 'url(#photo-circle-clip)');
            g.appendChild(img);
            
            if (el.borderEnabled && el.borderWidth > 0) {
                const border = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                border.setAttribute('cx', 500);
                border.setAttribute('cy', 500);
                border.setAttribute('r', 500 - (el.borderWidth / 2 / finalScale));
                border.setAttribute('fill', 'none');
                border.setAttribute('stroke', el.borderColor);
                // border.setAttribute('stroke-width', el.borderWidth / finalScale);
                border.setAttribute('stroke-width', el.borderWidth);
                g.appendChild(border);
            }
            
            photoGroup.appendChild(g);
        }
    });

    window.renderFixedTexts();
}
// Segéd a képek rendereléséhez transzformációval
function renderPhotosWithTransforms(startX, width, totalH, margin) {
    const photoGroup = document.getElementById('photo-transform-group');
    photoGroup.innerHTML = ''; // Újraépítjük
    
    layoutState.photos.forEach(photo => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        // Méretezés
        const pSize = 1000;
        const pScale = (width - margin*2) / pSize;
        const realH = pSize * pScale;
        
        // Pozíció
        const centerX = startX + (width / 2);
        const transX = centerX - (pSize * pScale) / 2;
        let transY = (totalH - realH) / 2;
        
        if (photo.align === 'top') transY = margin;
        if (photo.align === 'bottom') transY = totalH - margin - realH;
        
        group.setAttribute('transform', `translate(${transX}, ${transY}) scale(${pScale})`);
        
        // Kép
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', photo.dataURL);
        img.setAttribute('width', pSize);
        img.setAttribute('height', pSize);
        img.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        img.setAttribute('clip-path', 'url(#photo-circle-clip)');
        
        group.appendChild(img);
        photoGroup.appendChild(group);
    });
}


// // --- 4. SZÖVEG IGAZÍTÁS JAVÍTÁSA (VALÓS TÉRKÖZÖK) ---
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = '';

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
//     const singleW = (layoutState.mode === 'single') ? totalW : totalW / 2;
//     const margin = singleW * 0.05;

//     // HATÁROK MEGHATÁROZÁSA (A legfontosabb javítás!)
//     // A térkép pontos tetejét és alját használjuk.
//     let mapTop = layoutState.mapBounds.top || 0;
//     let mapBottom = layoutState.mapBounds.bottom || totalH;
    
//     // Biztonsági rés: ha nincs térkép (pl. betöltés alatt), alapértelmezett értékek
//     if (mapTop === 0 && mapBottom === 0) { mapTop = totalH * 0.3; mapBottom = totalH * 0.7; }

//     // --- RENDERELÉS ---
//     let mapXStart = (layoutState.mode === 'double-left') ? singleW : 0;
//     let mapXEnd = mapXStart + singleW;

//     // TÉRKÉP OLDAL
//     // Felső zóna: 0-tól mapTop-ig
//     if (!zoneFlags.topCommon) renderComplexZone(zoneDataStore.map.top, 'top', 0, mapTop, mapXStart, mapXEnd, margin);
//     // Alsó zóna: mapBottom-tól totalH-ig
//     if (!zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.map.bottom, 'bottom', mapBottom, totalH, mapXStart, mapXEnd, margin);

//     // FOTÓ OLDAL (Ha van)
//     if (layoutState.mode !== 'single') {
//         let photoXStart = (layoutState.mode === 'double-left') ? 0 : singleW;
//         let photoXEnd = photoXStart + singleW;
        
//         // A képek magasságát is figyelembe vehetnénk, de most használjuk a térkép vonalait szimmetria miatt,
//         // VAGY fixen a középvonalat. A felhasználó kérése: "szabad rész közepére/aljára/tetejére".
//         // Használjuk a térkép vonalait referenciaként a harmónia miatt.
//         if (!zoneFlags.topCommon) renderComplexZone(zoneDataStore.photo.top, 'top', 0, mapTop, photoXStart, photoXEnd, margin);
//         if (!zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.photo.bottom, 'bottom', mapBottom, totalH, photoXStart, photoXEnd, margin);
//     }

//     // KÖZÖS ZÓNA
//     if (zoneFlags.topCommon) renderComplexZone(zoneDataStore.common.top, 'top', 0, mapTop, 0, totalW, margin);
//     if (zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.common.bottom, 'bottom', mapBottom, totalH, 0, totalW, margin);
// }

// // --- SZÖVEG RENDERELÉS (JAVÍTOTT: Textarea és Igazítás) ---
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = '';

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
    
//     // Egy slot szélessége
//     const pageCount = layoutState.elements.length;
//     const slotW = totalW / pageCount;
//     const margin = slotW * 0.05;

//     // Térkép helyének megkeresése (hogy a közös szöveg ehhez igazodjon-e, vagy az egészhez?)
//     // A kérés: "Közös szöveg doboz" -> Ez az egész vászonra vonatkozik.
//     // "Külön alul/felül" -> Ez a térképhez vagy a fotóhoz.

//     // 1. Végigmegyünk az összes elemen és rendereljük a hozzá tartozó szövegeket
//     layoutState.elements.forEach((el, index) => {
//         const slotStartX = index * slotW;
//         const slotEndX = slotStartX + slotW;
        
//         let contextKey = '';
//         let bounds = { top: 0, bottom: totalH }; // Default határok

//         if (el.type === 'map') {
//             contextKey = 'map';
//             // Használjuk a kiszámolt mapBounds-ot a szorosabb igazításhoz
//             if (layoutState.mapBounds.bottom > 0) {
//                 bounds = layoutState.mapBounds;
//             } else {
//                 // Fallback: középső 60%
//                 bounds = { top: totalH * 0.2, bottom: totalH * 0.8 };
//             }
//         } else {
//             contextKey = `photo_${el.id}`;
//             // A fotóknál is mérhetnénk, de most egyszerűsítsünk: a térkép vonalaihoz igazodjon
//             // Vagy a teljes slothoz. Legyen a térkép vonala a referencia.
//             if (layoutState.mapBounds.bottom > 0) {
//                 bounds = layoutState.mapBounds;
//             } else {
//                 bounds = { top: totalH * 0.2, bottom: totalH * 0.8 };
//             }
//         }

//         // Ha a common be van kapcsolva erre az elemre?
//         // Nem, a common egy külön réteg, ami mindenen átível.
        
//         // Rendereljük a specifikus szövegeket
//         // Ellenőrizzük, létezik-e az adat (ha új fotó, létre kell hozni)
//         if (!zoneDataStore[contextKey]) {
//             zoneDataStore[contextKey] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
//         }
        
//         // Csak akkor renderelünk, ha NEM közös mód van bekapcsolva az adott zónára
//         // Vagy a közös mód felülírja a helyieket?
//         // Logikusabb: Ha Common Top aktív, akkor a helyi Top-ok nem látszanak.
        
//         if (!zoneFlags.topCommon) {
//             renderComplexZone(zoneDataStore[contextKey].top, 'top', 0, bounds.top, slotStartX, slotEndX, margin);
//         }
//         if (!zoneFlags.bottomCommon) {
//             renderComplexZone(zoneDataStore[contextKey].bottom, 'bottom', bounds.bottom, totalH, slotStartX, slotEndX, margin);
//         }
//     });

//     // 2. Közös szövegek (Teljes szélesség)
//     // Határok: A térkép határait használjuk referenciának
//     let commonBounds = layoutState.mapBounds.bottom > 0 ? layoutState.mapBounds : { top: totalH*0.2, bottom: totalH*0.8 };
    
//     if (zoneFlags.topCommon) {
//         renderComplexZone(zoneDataStore.common.top, 'top', 0, commonBounds.top, 0, totalW, margin);
//     }
//     if (zoneFlags.bottomCommon) {
//         renderComplexZone(zoneDataStore.common.bottom, 'bottom', commonBounds.bottom, totalH, 0, totalW, margin);
//     }
// }
// --- SZÖVEG RENDERELÉS (ZÓNA ALAPÚ) ---
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = '';

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
//     const slotW = totalW / layoutState.elements.length;
//     const margin = slotW * 0.05;

//     layoutState.elements.forEach((el, index) => {
//         const slotStartX = index * slotW;
//         const slotEndX = slotStartX + slotW;
        
//         let contextKey = (el.type === 'map') ? 'map' : `photo_${el.id}`;
//         let bounds = { top: totalH * 0.2, bottom: totalH * 0.8 };
        
//         // Térképnél használjuk a valós határokat
//         if (el.type === 'map' && layoutState.mapBounds.bottom > 0) {
//             bounds = layoutState.mapBounds;
//         }

//         if (!zoneDataStore[contextKey]) return;
        
//         if (!zoneFlags.topCommon) {
//             renderComplexZone(zoneDataStore[contextKey].top, 'top', 0, bounds.top, slotStartX, slotEndX, margin);
//         }
//         if (!zoneFlags.bottomCommon) {
//             renderComplexZone(zoneDataStore[contextKey].bottom, 'bottom', bounds.bottom, totalH, slotStartX, slotEndX, margin);
//         }
//     });

//     let commonBounds = layoutState.mapBounds.bottom > 0 ? layoutState.mapBounds : { top: totalH*0.2, bottom: totalH*0.8 };
//     if (zoneFlags.topCommon) renderComplexZone(zoneDataStore.common.top, 'top', 0, commonBounds.top, 0, totalW, margin);
//     if (zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.common.bottom, 'bottom', commonBounds.bottom, totalH, 0, totalW, margin);
// }
// --- SZÖVEG RENDERELÉS ---
window.renderFixedTexts = function() {
    if (!getDOMElements()) return;
    const textLayer = document.getElementById('text-layer');
    textLayer.innerHTML = '';

    console.log("window.renderFixedTexts textLayer", textLayer); 
    const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const totalW = paperVB[2];
    const totalH = paperVB[3];
    const slotW = totalW / layoutState.elements.length;
    const margin = slotW * 0.05;

    layoutState.elements.forEach((el, index) => {
        const slotStartX = index * slotW;
        const slotEndX = slotStartX + slotW;
        
        let contextKey = (el.type === 'map') ? 'map' : `photo_${el.id}`;
        
        // Alapértelmezett határok
        let bounds = { top: totalH * 0.2, bottom: totalH * 0.8 };
        
        // FONTOS: Ha az elemnek vannak mentett határai (mert pozicionáltuk), azt használjuk!
        if (el.bounds) {
            bounds = el.bounds;
        } else if (layoutState.mapBounds.bottom > 0) {
            // Fallback a térkép határaira
            bounds = layoutState.mapBounds;
        }

        if (!zoneDataStore[contextKey]) return;
        
        if (!zoneFlags.topCommon) {
            renderComplexZone(zoneDataStore[contextKey].top, 'top', 0, bounds.top, slotStartX, slotEndX, margin);
        }
        if (!zoneFlags.bottomCommon) {
            renderComplexZone(zoneDataStore[contextKey].bottom, 'bottom', bounds.bottom, totalH, slotStartX, slotEndX, margin);
        }
    });

    let commonBounds = (layoutState.mapBounds.bottom > 0) ? layoutState.mapBounds : { top: totalH*0.2, bottom: totalH*0.8 };
    if (zoneFlags.topCommon) renderComplexZone(zoneDataStore.common.top, 'top', 0, commonBounds.top, 0, totalW, margin);
    if (zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.common.bottom, 'bottom', commonBounds.bottom, totalH, 0, totalW, margin);
}
// BBox segéd (változatlan)
function getMapContentBBox(mapSvg) {
    try {
        if (mapSvg.tagName === 'image') {
             return {x:0, y:0, width: parseFloat(mapSvg.getAttribute('width')), height: parseFloat(mapSvg.getAttribute('height'))};
        }
        return mapSvg.getBBox();
    } catch(e) { return {x:0,y:0,width:1000,height:1000}; }
}

// // Helper a store inicializálásához (ha hiányozna)
// function addNewBlockToStore(context, zone, isNewLine) {
//     if(!zoneDataStore[context]) zoneDataStore[context] = { top: {blocks:[]}, bottom: {blocks:[]} };
//     zoneDataStore[context][zone].blocks.push({
//         id: Date.now(), isNewLine: isNewLine, content: "Szöveg...", font: "Space Grotesk", size: 32, color: "#fff", alignH: "middle"
//     });
// }

// function addNewBlockToStore(context, zone, isNewLine) {
//     if(!zoneDataStore[context]) zoneDataStore[context] = { top: {blocks:[]}, bottom: {blocks:[]} };
//     zoneDataStore[context][zone].blocks.push(createDefaultBlock(isNewLine));
// }
// --- EGYÉB FÜGGVÉNYEK (Store init, BBox, stb) ---
// function addNewBlockToStore(context, zone, isNewLine) {
//     if(!zoneDataStore[context]) zoneDataStore[context] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
//     zoneDataStore[context][zone].blocks.push({
//         id: Date.now() + Math.random(),
//         isNewLine: isNewLine,
//         content: isNewLine ? "Szöveg..." : " folyatás...",
//         font: "Space Grotesk",
//         size: 32, weight: "normal", style: "normal", color: "#e8edf5", alignH: "middle"
//     });
// }
// Helper
function addNewBlockToStore(context, zone, isNewLine) {
    if(!zoneDataStore[context]) zoneDataStore[context] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
    if(!zoneDataStore[context][zone]) zoneDataStore[context][zone] = { alignV:'center', blocks:[] };
    zoneDataStore[context][zone].blocks.push(createDefaultBlock(isNewLine));
}
// // --- CROPPER KEZELÉS ---
// let cropper;
// let tempImageSide = null;

// window.triggerPhotoUpload = function(side) {
//     tempImageSide = side; // Megjegyezzük, hova akarja tenni (left/right)
//     document.getElementById('photo-upload').click();
// }

// window.initCropperFromFile = function(input) {
//     if (input.files && input.files[0]) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             const image = document.getElementById('image-to-crop');
//             image.src = e.target.result;
            
//             // Modal megjelenítése
//             document.getElementById('cropper-modal').style.display = 'flex';
            
//             // Cropper indítása
//             if (cropper) cropper.destroy();
//             cropper = new Cropper(image, {
//                 aspectRatio: 1, // KÖR ALAKHOZ NÉGYZET KELL
//                 viewMode: 1,
//                 autoCropArea: 1,
//             });
//         };
//         reader.readAsDataURL(input.files[0]);
//     }
//     input.value = ''; // Reset, hogy ugyanazt a fájlt újra ki lehessen választani
// }

// window.closeCropper = function() {
//     document.getElementById('cropper-modal').style.display = 'none';
//     if (cropper) cropper.destroy();
// }

// window.performCrop = function() {
//     if (!cropper) return;
    
//     // Canvas generálása (Nagy felbontás)
//     const canvas = cropper.getCroppedCanvas({
//         width: 2000, height: 2000 // Jó minőséghez
//     });
    
//     // DataURL mentése
//     layoutState.photoCroppedData = canvas.toDataURL('image/png');
    
//     // Layout beállítása
//     if (tempImageSide === 'left') layoutState.mode = 'double-left';
//     else layoutState.mode = 'double-right';
    
//     // UI Frissítése
//     closeCropper();
//     applyPhotoLayout();
    
//     // Váltás a Photo fülre, hogy lássa a user
//     switchTextContext('photo');
// }

// window.removePhotoLayout = function() {
//     layoutState.mode = 'single';
//     layoutState.photoCroppedData = null;
//     applyPhotoLayout();
//     switchTextContext('map'); // Vissza a térkép szerkesztéshez
// }

// window.alignPhoto = function(pos) {
//     layoutState.photoPos = pos;
//     window.refreshMapTransform(); // Ez frissít mindent
// }

// // --- LAYOUT ALKALMAZÁSA (DUPLÁZÁS) ---
// function applyPhotoLayout() {
//     // 1. Megjelenítés/Elrejtés
//     const photoGroup = document.getElementById('photo-transform-group');
//     const photoImg = document.getElementById('user-photo-img');
//     const activeControls = document.getElementById('active-photo-controls');
    
//     // Tabok kezelése
//     const photoTab = document.getElementById('tab-context-photo');
//     const commonTab = document.getElementById('tab-context-common');
//     const mapTab = document.getElementById('tab-context-map');

//     if (layoutState.mode === 'single') {
//         photoGroup.style.display = 'none';
//         activeControls.style.display = 'none';
        
//         photoTab.style.display = 'none';
//         commonTab.style.display = 'none';
//         mapTab.innerHTML = "Csillagtérkép Beállításai";
        
//         document.getElementById('top-common-toggle-container').style.display = 'none';
//         document.getElementById('bottom-common-toggle-container').style.display = 'none';
//     } else {
//         // Kép betöltése
//         photoImg.setAttribute('href', layoutState.photoCroppedData);
//         photoGroup.style.display = 'block';
//         activeControls.style.display = 'block';
        
//         photoTab.style.display = 'block';
//         commonTab.style.display = 'block';
//         mapTab.innerHTML = "Térkép Oldal";
        
//         document.getElementById('top-common-toggle-container').style.display = 'block';
//         document.getElementById('bottom-common-toggle-container').style.display = 'block';
//     }

//     // 2. Frissítés
//     window.updateCanvasSize(); // Ez kezeli a viewBox-ot
// }


// // --- CANVAS MÉRETEZÉS ÉS VIEWBOX (A LÉNYEG!) ---
// const originalUpdateCanvasSize = window.updateCanvasSize;
// window.updateCanvasSize = function() {
//     const widthInput = document.getElementById('canvas-width');
//     const heightInput = document.getElementById('canvas-height');
//     let widthCm = parseFloat(widthInput.value) || 21;
//     let heightCm = parseFloat(heightInput.value) || 30;

//     // Ha dupla mód van, a logika szerint a szélesség DUPLÁZÓDIK
//     // De a felhasználó inputja marad az "egy lap" mérete (pl. 21cm)
//     // Az SVG ViewBox fog nőni.
    
//     let logicalWidthCm = widthCm;
//     if (layoutState.mode !== 'single') {
//         logicalWidthCm = widthCm * 2; // Dupla szélesség
//     }

//     // Képarány számítása
//     // Fix pixel magasságot használunk bázisnak (pl. 2700px az A4 magassághoz)
//     // Ha 21x30, akkor 30cm -> 2700px => 1cm = 90px.
//     // 21cm = 1890px.
//     // Dupla (42cm) = 3780px.
    
//     // Egyszerűsítve:
//     // A ViewBox magassága legyen fix 1272 (mint az eredetiben), ehhez arányosítunk
//     // Eredeti: 1026 x 1272 (kb 21x26 arány, nem pont A4, de maradjunk a viewBox logikánál)
    
//     // Használjuk a meglévő kódot alapnak, de szorozzuk fel a szélességet
//     const baseHeight = 1272;
//     const aspectRatio = logicalWidthCm / heightCm;
//     const newWidth = baseHeight * aspectRatio;

//     const designerSVG = document.getElementById('designer-svg');
//     designerSVG.setAttribute('viewBox', `0 0 ${newWidth} ${baseHeight}`);
    
//     // Háttér téglalap igazítása
//     const bgRect = document.getElementById('designer-background-rect');
//     if(bgRect) {
//         bgRect.setAttribute('width', newWidth);
//         bgRect.setAttribute('height', baseHeight);
//     }

//     // Transzformációk frissítése
//     setTimeout(window.refreshMapTransform, 50);
// }


// // --- POZICIONÁLÁS (TÉRKÉP ÉS FOTÓ) ---
// window.refreshMapTransform = function() {
//     if (!getDOMElements()) return;

//     // 1. Vászon adatok
//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
//     const singleW = (layoutState.mode === 'single') ? totalW : totalW / 2;
//     const margin = singleW * 0.05;

//     // --- A. CSILLAGTÉRKÉP HELYE ---
//     // Ha single: 0 -> totalW
//     // Ha double-left (kép balra): singleW -> totalW
//     // Ha double-right (kép jobbra): 0 -> singleW
    
//     let mapStartX = 0;
//     if (layoutState.mode === 'double-left') mapStartX = singleW;
    
//     // Térkép transzformáció (mint régen, de a mapStartX-el eltolva)
//     const mapGroup = document.getElementById('map-transform-group');
//     const mapSvg = mapGroup.querySelector('svg, image');
    
//     if (mapSvg) {
//         // ... (BBox mérés ugyanaz) ...
//         const bbox = getMapContentBBox(mapSvg);
//         const contentW = bbox.width || 1000;
//         const contentH = bbox.height || 1000;
        
//         // Skálázás a "fél" oldalhoz
//         const safeW = singleW - (margin * 2);
//         const safeH = totalH - (margin * 2);
//         const scaleX = safeW / contentW;
//         const scaleY = safeH / contentH;
//         let userScale = (typeof currentUserMapScale !== 'undefined') ? currentUserMapScale : 1.0;
//         const finalScale = Math.min(scaleX, scaleY) * userScale;

//         // Középpont a saját térfelén
//         const areaCenterX = mapStartX + (singleW / 2);
//         const areaCenterY = totalH / 2;

//         let transX = areaCenterX - (contentW * finalScale) / 2;
//         let transY = 0;
        
//         // Függőleges igazítás
//         let pos = (typeof currentMapPos !== 'undefined') ? currentMapPos : 'center';
//         if (pos === 'center') transY = areaCenterY - (contentH * finalScale) / 2;
//         else if (pos === 'top') transY = margin;
//         else if (pos === 'bottom') transY = totalH - margin - (contentH * finalScale);

//         mapGroup.setAttribute('transform', `translate(${transX}, ${transY}) scale(${finalScale})`);
//     }

//     // --- B. FOTÓ HELYE ---
//     if (layoutState.mode !== 'single') {
//         let photoStartX = 0;
//         if (layoutState.mode === 'double-right') photoStartX = singleW; // Ha a kép jobbra van

//         const photoGroup = document.getElementById('photo-transform-group');
//         const photoImg = document.getElementById('user-photo-img');
        
//         // A kép alapból 1000x1000 (mert így vágtuk/állítottuk be)
//         const photoSize = 1000; 
        
//         // Skálázás ugyanúgy a fél oldalhoz
//         const safeW = singleW - (margin * 2);
//         const safeH = totalH - (margin * 2);
//         const pScale = Math.min(safeW/photoSize, safeH/photoSize); // Nincs userScale a fotóhoz (egyelőre)
        
//         const pCenterX = photoStartX + (singleW / 2);
//         const pCenterY = totalH / 2;
        
//         let pTransX = pCenterX - (photoSize * pScale) / 2;
//         let pTransY = 0;
        
//         if (layoutState.photoPos === 'center') pTransY = pCenterY - (photoSize * pScale) / 2;
//         else if (layoutState.photoPos === 'top') pTransY = margin;
//         else if (layoutState.photoPos === 'bottom') pTransY = totalH - margin - (photoSize * pScale);
        
//         // Mivel a photo-img-en clip-path van, a transform group-ot mozgatjuk
//         // Fontos: A clipPath koordinátarendszere is transzformálódik, ha a groupot mozgatjuk? Igen!
//         // A clipPath kör cx=500 cy=500 r=500. A kép 1000x1000. Ez tökéletes.
        
//         photoGroup.setAttribute('transform', `translate(${pTransX}, ${pTransY}) scale(${pScale})`);
//     }

//     // Szövegek frissítése
//     window.renderFixedTexts();
// }


// // --- SZÖVEG RENDERELÉS (ZÓNA ALAPÚ) ---
// window.renderFixedTexts = function() {
//     if (!getDOMElements()) return;
//     const textLayer = document.getElementById('text-layer');
//     textLayer.innerHTML = '';

//     const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
//     const totalW = paperVB[2];
//     const totalH = paperVB[3];
//     const singleW = (layoutState.mode === 'single') ? totalW : totalW / 2;
//     const margin = singleW * 0.05;

//     // Zónák határainak kiszámítása (Függőlegesen)
//     // Térkép mérése a térközhöz
//     let mapTopY = 0, mapBottomY = totalH;
//     const mapGroup = document.getElementById('map-transform-group');
//     const transformStr = mapGroup.getAttribute('transform');
//     // ... (itt érdemes lenne a pontos BBox-ot mérni a transform után, de egyszerűsítésként vegyük a skálázott méretet)
//     // A 'refreshMapTransform'-ban kiszámoltuk a pozíciót, de nem tároltuk el globálisan. 
//     // Érdemes lenne a transzformáció után lekérdezni a mapGroup BBox-át.
//     try {
//         const bbox = mapGroup.getBBox(); // Ez a transformált méretet adja meg a szülő koordinátarendszerében? Nem, SVG-ben ez trükkös.
//         // Inkább használjuk a transform attribútumokat újra, vagy mérjünk GetBoundingClientRect-et és konvertáljuk.
//         // Mivel a renderFixedTexts-t a refresh után hívjuk, a DOM friss.
//     } catch(e) {}
    
//     // Egyszerűsített zóna magasságok (Feltételezzük, hogy a tartalom középen van, és van hely felette/alatta)
//     // A pontos "Align to Map" funkcióhoz kellene a map pontos Y koordinátája.
//     // Most használjunk fix zónákat a demóhoz: Felső 20%, Alsó 20%. 
//     // VAGY: Használjuk a korábbi logikát, de mindkét oldalra.

//     // --- RENDERELÉS ---
    
//     // 1. TÉRKÉP OLDAL SZÖVEGEI (Mindig vannak)
//     // X tartomány: 
//     let mapZoneXStart = (layoutState.mode === 'double-left') ? singleW : 0;
//     let mapZoneXEnd = mapZoneXStart + singleW;
    
//     if (!zoneFlags.topCommon) renderComplexZone(zoneDataStore.map.top, 'top', 0, totalH*0.4, mapZoneXStart, mapZoneXEnd, margin);
//     if (!zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.map.bottom, 'bottom', totalH*0.6, totalH, mapZoneXStart, mapZoneXEnd, margin);

//     // 2. FOTÓ OLDAL SZÖVEGEI (Csak ha van fotó)
//     if (layoutState.mode !== 'single') {
//         let photoZoneXStart = (layoutState.mode === 'double-left') ? 0 : singleW;
//         let photoZoneXEnd = photoZoneXStart + singleW;
        
//         if (!zoneFlags.topCommon) renderComplexZone(zoneDataStore.photo.top, 'top', 0, totalH*0.4, photoZoneXStart, photoZoneXEnd, margin);
//         if (!zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.photo.bottom, 'bottom', totalH*0.6, totalH, photoZoneXStart, photoZoneXEnd, margin);
//     }

//     // 3. KÖZÖS SZÖVEGEK (Teljes szélesség)
//     if (zoneFlags.topCommon) renderComplexZone(zoneDataStore.common.top, 'top', 0, totalH*0.4, 0, totalW, margin);
//     if (zoneFlags.bottomCommon) renderComplexZone(zoneDataStore.common.bottom, 'bottom', totalH*0.6, totalH, 0, totalW, margin);
// }

// // Renderelő segédfüggvény (Paraméterezett X tartománnyal)
// function renderComplexZone(zoneDataObj, alignType, startY, endY, startX, endX, margin) {
//     const blocks = zoneDataObj.blocks;
//     if (blocks.length === 0) return;

//     const zoneWidth = endX - startX;
    
//     let textGroups = [];
//     let currentTextEl = null;

//     blocks.forEach(block => {
//         if (block.isNewLine) {
//             currentTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            
//             let x = 0;
//             // X pozíció kiszámítása a ZÓNÁN BELÜL
//             if (block.alignH === 'start') x = startX + margin;
//             else if (block.alignH === 'middle') x = startX + (zoneWidth / 2);
//             else if (block.alignH === 'end') x = endX - margin;
            
//             currentTextEl.setAttribute('x', x);
//             currentTextEl.setAttribute('text-anchor', block.alignH);
            
//             textGroups.push(currentTextEl);
//             document.getElementById('text-layer').appendChild(currentTextEl);
//         }

//         if (currentTextEl) {
//             const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
//             tspan.textContent = block.content;
//             tspan.setAttribute('font-family', block.font);
//             tspan.setAttribute('font-size', block.size);
//             tspan.setAttribute('font-weight', block.weight);
//             tspan.setAttribute('font-style', block.style);
//             tspan.setAttribute('fill', block.color);
//             currentTextEl.appendChild(tspan);
//         }
//     });

//     // Magasság és Y pozícionálás (ugyanaz mint rég, csak a paraméterekkel)
//     let totalHeight = 0;
//     textGroups.forEach(textEl => totalHeight += textEl.getBBox().height);
    
//     const zoneH = endY - startY;
//     let currentY = 0;

//     if (zoneDataObj.alignV === 'top') currentY = startY + margin;
//     else if (zoneDataObj.alignV === 'center') currentY = startY + (zoneH - totalHeight) / 2;
//     else if (zoneDataObj.alignV === 'bottom') currentY = endY - totalHeight - margin;

//     textGroups.forEach(textEl => {
//         const bbox = textEl.getBBox();
//         textEl.setAttribute('y', currentY - bbox.y); // Baseline korrekció
//         currentY += bbox.height;
//     });
// }

// // Renderelő (ugyanaz, mint rég, csak paraméterezve)
// function renderComplexZone(zoneDataObj, alignType, startY, endY, startX, endX, margin) {
//     if (!zoneDataObj || !zoneDataObj.blocks) return;
//     const blocks = zoneDataObj.blocks;
//     if (blocks.length === 0) return;

//     let textGroups = [];
//     let currentTextEl = null;

//     blocks.forEach(block => {
//         if (block.isNewLine) {
//             currentTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            
//             let x = 0;
//             const zoneW = endX - startX;
//             // X pozíció a Slot-on belül
//             if (block.alignH === 'start') x = startX + margin;
//             else if (block.alignH === 'middle') x = startX + (zoneW / 2);
//             else if (block.alignH === 'end') x = endX - margin;
            
//             currentTextEl.setAttribute('x', x);
//             currentTextEl.setAttribute('text-anchor', block.alignH);
            
//             textGroups.push(currentTextEl);
//             document.getElementById('text-layer').appendChild(currentTextEl);
//         }

//         if (currentTextEl) {
//             const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
//             tspan.textContent = block.content;
//             tspan.setAttribute('font-family', block.font);
//             tspan.setAttribute('font-size', block.size);
//             tspan.setAttribute('font-weight', block.weight);
//             tspan.setAttribute('font-style', block.style);
//             tspan.setAttribute('fill', block.color);
//             currentTextEl.appendChild(tspan);
//         }
//     });

//     // Magasság mérése és Y igazítás
//     let totalHeight = 0;
//     textGroups.forEach(textEl => {
//         const bbox = textEl.getBBox();
//         textEl.dataset.height = bbox.height;
//         textEl.dataset.bboxY = bbox.y; // Eltolás a baseline-tól
//         totalHeight += bbox.height;
//     });

//     const zoneH = endY - startY;
//     let currentY = 0;

//     if (zoneDataObj.alignV === 'top') currentY = startY + margin;
//     else if (zoneDataObj.alignV === 'center') currentY = startY + (zoneH - totalHeight) / 2;
//     else if (zoneDataObj.alignV === 'bottom') currentY = endY - totalHeight - margin;

//     textGroups.forEach(textEl => {
//         const h = parseFloat(textEl.dataset.height);
//         const bboxY = parseFloat(textEl.dataset.bboxY);
//         // Korrekció: bbox teteje legyen currentY-nál
//         textEl.setAttribute('y', currentY - bboxY);
//         currentY += h;
//     });
// }
// Renderelő segédfüggvény
function renderComplexZone(zoneDataObj, alignType, startY, endY, startX, endX, margin) {
    console.log("window.renderComplexZone zoneDataObj", zoneDataObj); 
    console.log("window.renderComplexZone alignType", alignType); 
    if (!zoneDataObj || !zoneDataObj.blocks) return;
    const blocks = zoneDataObj.blocks;
    if (blocks.length === 0) return;

    let textGroups = [];
    let currentTextEl = null;

    blocks.forEach(block => {
        if (block.isNewLine) {
            currentTextEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            let x = 0;
            const zoneW = endX - startX;
            if (block.alignH === 'start') x = startX + margin;
            else if (block.alignH === 'middle') x = startX + (zoneW / 2);
            else if (block.alignH === 'end') x = endX - margin;
            
            currentTextEl.setAttribute('x', x);
            currentTextEl.setAttribute('text-anchor', block.alignH);
            textGroups.push(currentTextEl);
            document.getElementById('text-layer').appendChild(currentTextEl);
        }

        if (currentTextEl) {
            const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            tspan.textContent = block.content;
            tspan.setAttribute('font-family', block.font);
            tspan.setAttribute('font-size', block.size);
            tspan.setAttribute('font-weight', block.weight);
            tspan.setAttribute('font-style', block.style);
            tspan.setAttribute('fill', block.color);
            currentTextEl.appendChild(tspan);
        }
        console.log("window.renderComplexZone block.content", block.content); 
    });

    // Magasság és Y
    let totalHeight = 0;
    textGroups.forEach(textEl => {
        const bbox = textEl.getBBox();
        textEl.dataset.height = bbox.height;
        textEl.dataset.bboxY = bbox.y;
        totalHeight += bbox.height;
    });

    const zoneH = endY - startY;
    let currentY = 0;

    if (zoneDataObj.alignV === 'top') currentY = startY + margin;
    else if (zoneDataObj.alignV === 'center') currentY = startY + (zoneH - totalHeight) / 2;
    else if (zoneDataObj.alignV === 'bottom') currentY = endY - totalHeight - margin;

    textGroups.forEach(textEl => {
        const h = parseFloat(textEl.dataset.height);
        const bboxY = parseFloat(textEl.dataset.bboxY);
        textEl.setAttribute('y', currentY - bboxY);
        currentY += h;
    });
        console.log("window.renderComplexZone textGroups", textGroups); 
}
// // --- UI LOGIKA (FÜLEK ÉS KONTEXTUS VÁLTÁS) ---
// window.switchTextContext = function(context) {
//     // Ha single módban vagyunk, ne engedjük a photo/common tabot
//     if (layoutState.mode === 'single' && context !== 'map') return;

//     currentTextContext = context;
    
//     // Tabok stílusa
//     document.querySelectorAll('.text-mode-tab').forEach(btn => btn.classList.remove('active'));
//     document.getElementById(`tab-context-${context}`).classList.add('active');
    
//     // Fejlécek frissítése
//     const labelMap = { map: "Térkép", photo: "Fotó", common: "Közös" };
//     document.getElementById('top-zone-title').innerText = `📝 FELSŐ ZÓNA (${labelMap[context]})`;
//     document.getElementById('bottom-zone-title').innerText = `📝 ALSÓ ZÓNA (${labelMap[context]})`;
    
//     // Checkboxok láthatósága (Csak Common kontextusban ne, de máshol igen, hogy lássuk aktív-e)
//     // Vagy: Checkbox csak a Map/Photo nézetben van, és ha bepipálod, átvált Common-ra?
//     // Egyszerűbb: A checkbox mindig a "Dupla" nézetben látszik a zóna tetején.
//     // Frissítsük a checkbox állapotát a globális flag alapján
//     document.getElementById('chk-common-top').checked = zoneFlags.topCommon;
//     document.getElementById('chk-common-bottom').checked = zoneFlags.bottomCommon;
    
//     // Blokkok újrarajzolása az új kontextusból
//     renderZoneUI('top');
//     renderZoneUI('bottom');
// }
// --- ÚJ: KÉPVÁLASZTÓ LISTA (A Szöveg fülhöz) ---
function renderPhotoContextSelector(currentContext) {
    let container = document.getElementById('photo-text-selector-container');
    
    // Létrehozzuk a tárolót, ha még nincs (a tabok után)
    if (!container) {
        const tabs = document.querySelector('#fragment_r-2 .text-mode-tabs');
        if (tabs) {
            container = document.createElement('div');
            container.id = 'photo-text-selector-container';
            container.style.marginBottom = '15px';
            container.style.padding = '10px';
            container.style.background = 'rgba(0,0,0,0.2)';
            container.style.borderRadius = '8px';
            // Beszúrjuk a tabok után
            tabs.parentNode.insertBefore(container, tabs.nextSibling);
        } else {
            return;
        }
    }

    // Csak akkor mutatjuk, ha "Kép" módban vagyunk
    if (!currentContext.startsWith('photo_')) {
        container.style.display = 'none';
        return;
    }

    const photos = layoutState.elements.filter(el => el.type === 'photo');
    if (photos.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';
    
    // Legördülő lista opcióinak generálása
    let options = photos.map((p, idx) => {
        const pContext = `photo_${p.id}`;
        const isSelected = pContext === currentContext ? 'selected' : '';
        return `<option value="${p.id}" ${isSelected}>📷 Kép ${idx + 1}</option>`;
    }).join('');

    container.innerHTML = `
        <div class="setting-group" style="margin-bottom:0;">
            <label style="font-size:12px; color:#aaa; margin-bottom:5px; display:block;">Szerkesztett Kép Kiválasztása:</label>
            <select onchange="highlightPhoto(parseInt(this.value))" style="width:100%; padding:8px; background:rgba(0,0,0,0.3); color:white; border:1px solid #444; border-radius:4px; cursor:pointer;">
                ${options}
            </select>
        </div>
    `;
}
// // --- UI: CONTEXT VÁLTÁS ÉS RENDER ---
// window.switchTextContext = function(context) {
//     currentTextContext = context;
    
//     // Tabok stílusa
//     document.querySelectorAll('.text-mode-tab').forEach(btn => btn.classList.remove('active'));
    
//     // Trükkös: Ha photo_ID a kontextus, akkor a "Fotó" gombot kell aktívvá tenni
//     if (context.startsWith('photo_')) {
//         document.getElementById('tab-context-photo').classList.add('active');
//     } else {
//         const tab = document.getElementById(`tab-context-${context}`);
//         if(tab) tab.classList.add('active');
//     }
    
//     // Fejlécek
//     let label = "Térkép";
//     if (context === 'common') label = "KÖZÖS";
//     else if (context.startsWith('photo_')) label = "Kép";
    
//     document.getElementById('top-zone-title').innerText = `📝 FELSŐ ZÓNA (${label})`;
//     document.getElementById('bottom-zone-title').innerText = `📝 ALSÓ ZÓNA (${label})`;
    
//     // Checkboxok
//     document.getElementById('chk-common-top').checked = zoneFlags.topCommon;
//     document.getElementById('chk-common-bottom').checked = zoneFlags.bottomCommon;
    
//     // Render UI
//     renderZoneUI('top');
//     renderZoneUI('bottom');
// }
// --- UI: CONTEXT VÁLTÁS ÉS SZERKESZTŐ ---
// window.switchTextContext = function(context) {
//     // Ha a "Fotó Oldal" gombra kattintunk (paraméter: 'photo'), 
//     // keressük meg az aktív vagy az első képet
//     if (context === 'photo') {
//         let targetId = layoutState.activePhotoId;
//         if (!targetId) {
//             const photos = layoutState.elements.filter(el => el.type === 'photo');
//             if (photos.length > 0) targetId = photos[0].id;
//         }
//         if (targetId) {
//             context = `photo_${targetId}`; // Átirányítás a konkrét képre
//         } else {
//             // Ha nincs kép, maradjunk a térképen vagy ne csináljunk semmit
//             return;
//         }
//     }

//     currentTextContext = context;
    
//     // Tabok stílusa
//     document.querySelectorAll('.text-mode-tab').forEach(btn => btn.classList.remove('active'));
    
//     if (context.startsWith('photo_')) {
//         document.getElementById('tab-context-photo').classList.add('active');
//     } else {
//         const tab = document.getElementById(`tab-context-${context}`);
//         if(tab) tab.classList.add('active');
//     }
    
//     // Fejlécek
//     let label = "Térkép";
//     if (context === 'common') label = "KÖZÖS";
//     else if (context.startsWith('photo_')) label = "Kép";
    
//     document.getElementById('top-zone-title').innerText = `📝 FELSŐ ZÓNA (${label})`;
//     document.getElementById('bottom-zone-title').innerText = `📝 ALSÓ ZÓNA (${label})`;
    
//     document.getElementById('chk-common-top').checked = zoneFlags.topCommon;
//     document.getElementById('chk-common-bottom').checked = zoneFlags.bottomCommon;
    
//     // --- ÚJ: Hívjuk meg a választó renderelését ---
//     renderPhotoContextSelector(context);
    
//     renderZoneUI('top');
//     renderZoneUI('bottom');
// }

// --- UI: CONTEXT VÁLTÁS ÉS SZERKESZTŐ ---
window.switchTextContext = function(context) {
    // 1. Fotó gomb átirányítás (ha szükséges)
    if (context === 'photo') {
        let targetId = layoutState.activePhotoId;
        if (!targetId) {
            const photos = layoutState.elements.filter(el => el.type === 'photo');
            if (photos.length > 0) targetId = photos[0].id;
        }
        if (targetId) {
            context = `photo_${targetId}`;
        } else {
            return;
        }
    }

    currentTextContext = context;
    
    // --- 2. ÚJ: KÖZÖS MÓD AUTOMATIZMUS ---
    if (context === 'common') {
        // A) Automatikus bepipálás
        zoneFlags.topCommon = true;
        zoneFlags.bottomCommon = true;
        
        // B) Alapértelmezett szöveg létrehozása, ha üres
        // Felső zóna
        if (zoneDataStore.common.top.blocks.length === 0) {
            addNewBlockToStore('common', 'top', true);
            // Egyedi kezdőszöveg beállítása
            zoneDataStore.common.top.blocks[0].content = "Közös Felső Szöveg";
        }
        // Alsó zóna
        if (zoneDataStore.common.bottom.blocks.length === 0) {
            addNewBlockToStore('common', 'bottom', true);
            zoneDataStore.common.bottom.blocks[0].content = "Közös Alsó Szöveg";
        }
        
        // Frissítjük a térképet, hogy a közös szövegek megjelenjenek
        window.renderFixedTexts();
    }

    // 3. Tabok stílusa
    document.querySelectorAll('.text-mode-tab').forEach(btn => btn.classList.remove('active'));
    
    if (context.startsWith('photo_')) {
        document.getElementById('tab-context-photo').classList.add('active');
    } else {
        const tab = document.getElementById(`tab-context-${context}`);
        if(tab) tab.classList.add('active');
    }
    
    // 4. Fejlécek
    let label = "Térkép";
    if (context === 'common') label = "KÖZÖS";
    else if (context.startsWith('photo_')) label = "Kép";
    
    document.getElementById('top-zone-title').innerText = `📝 FELSŐ ZÓNA (${label})`;
    document.getElementById('bottom-zone-title').innerText = `📝 ALSÓ ZÓNA (${label})`;
    
    // 5. Checkboxok frissítése a DOM-ban
    const chkTop = document.getElementById('chk-common-top');
    const chkBottom = document.getElementById('chk-common-bottom');
    if(chkTop) chkTop.checked = zoneFlags.topCommon;
    if(chkBottom) chkBottom.checked = zoneFlags.bottomCommon;
    
    // 6. UI Render
    renderPhotoContextSelector(context);
    renderZoneUI('top');
    renderZoneUI('bottom');
}

window.toggleCommonZone = function(zone, isChecked) {
    if (zone === 'top') zoneFlags.topCommon = isChecked;
    if (zone === 'bottom') zoneFlags.bottomCommon = isChecked;
    
    // Ha bekapcsoltuk, váltsunk oda, hogy szerkeszthessük
    if (isChecked) switchTextContext('common');
    else switchTextContext('map'); // Vagy ahol voltunk
    
    window.renderFixedTexts();
}

// A `addNewBlock`, `removeBlock`, `updateBlockData` függvényeket frissíteni kell, 
// hogy a `zoneDataStore[currentTextContext][zone]`-t használják a sima `zoneData[zone]` helyett.

// window.addNewBlock = function(zone, isNewLine) {
//     const data = zoneDataStore[currentTextContext][zone]; // ITT A VÁLTOZÁS
//     const block = createDefaultBlock(isNewLine);
//     if (!isNewLine && data.blocks.length === 0) block.isNewLine = true;
//     data.blocks.push(block);
//     renderZoneUI(zone);
//     window.renderFixedTexts();
// }

// window.removeBlock = function(zone, id) {
//     const data = zoneDataStore[currentTextContext][zone];
//     data.blocks = data.blocks.filter(b => b.id !== id);
//     if (data.blocks.length > 0 && !data.blocks[0].isNewLine) data.blocks[0].isNewLine = true;
//     renderZoneUI(zone);
//     window.renderFixedTexts();
// }

// window.updateBlockData = function(zone, id, key, value) {
//     const data = zoneDataStore[currentTextContext][zone];
//     const block = data.blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;
//         // ... (UI optimalizáció maradhat) ...
//         window.renderFixedTexts();
//     }
// }


// // Adat frissítő függvények (megfelelő store-t használva)
// window.addNewBlock = function(zone, isNewLine) {
//     const data = zoneDataStore[currentTextContext][zone];
//     const block = createDefaultBlock(isNewLine);
//     if (!isNewLine && data.blocks.length === 0) block.isNewLine = true;
//     data.blocks.push(block);
//     renderZoneUI(zone);
//     window.renderFixedTexts();
// }

// window.removeBlock = function(zone, id) {
//     const data = zoneDataStore[currentTextContext][zone];
//     data.blocks = data.blocks.filter(b => b.id !== id);
//     renderZoneUI(zone);
//     window.renderFixedTexts();
// }

// window.updateBlockData = function(zone, id, key, value) {
//     const data = zoneDataStore[currentTextContext][zone];
//     const block = data.blocks.find(b => b.id === id);
//     if (block) {
//         block[key] = (key === 'size') ? parseInt(value) : value;
//         window.renderFixedTexts();
//         // Ha nem tartalom változik, frissítsük a UI-t is (pl font váltás miatt)
//         if (key !== 'content') renderZoneUI(zone);
//     }
// }

// ADAT FRISSÍTŐK
window.addNewBlock = function(zone, isNewLine) {
    addNewBlockToStore(currentTextContext, zone, isNewLine);
    renderZoneUI(zone);
    window.renderFixedTexts();
}
window.removeBlock = function(zone, id) {
    const data = zoneDataStore[currentTextContext][zone];
    data.blocks = data.blocks.filter(b => b.id !== id);
    renderZoneUI(zone);
    window.renderFixedTexts();
}
window.updateBlockData = function(zone, id, key, value) {
    const data = zoneDataStore[currentTextContext][zone];
    const block = data.blocks.find(b => b.id === id);
    if (block) {
        block[key] = (key === 'size') ? parseInt(value) : value;
        window.renderFixedTexts();
        if (key !== 'content') renderZoneUI(zone); 
    }
}

// // UI Renderelő is a store-ból dolgozzon
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';
    
//     // Ha közös van bekapcsolva, de nem a common fülön vagyunk, jelezzük
//     if (zone === 'top' && zoneFlags.topCommon && currentTextContext !== 'common') {
//         container.innerHTML = '<div style="padding:10px; color:#aaa; text-align:center;">Jelenleg a KÖZÖS szövegdoboz aktív. Válts a "Közös" fülre a szerkesztéshez!</div>';
//         return;
//     }
//     // ... Ugyanez bottom-ra ...

//     const blocks = zoneDataStore[currentTextContext][zone].blocks;
    
//     // ... (A korábbi ciklus és HTML generálás jön ide, változatlanul) ...
//     // Csak arra figyelj, hogy a gombok onclick eseményei (addNewBlock, stb) már jók,
//     // mert a currentTextContext globális változót használják.
    
//     blocks.forEach((block, index) => {
//         // ... (Kártya generálás) ...
//         // (Másold be a korábbi renderZoneUI tartalmát)
//     });
// }


// // UI Renderelő (Textarea generálása)
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';
    
//     // Ellenőrzés: Létezik-e az adat?
//     if (!zoneDataStore[currentTextContext]) {
//         zoneDataStore[currentTextContext] = { top: {blocks:[]}, bottom: {blocks:[]} };
//     }
//     const blocks = zoneDataStore[currentTextContext][zone].blocks;

//     blocks.forEach((block, index) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // Font opciók
//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>${fontName}</option>`;
//         }).join('');

//         // HTML String
//         div.innerHTML = `
//             <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
//                 <button onclick="addSymbolToBlock(event, '${zone}', ${block.id})" style="border:none;background:none;cursor:pointer;">♥</button>
//                 <button onclick="removeBlock('${zone}', ${block.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>
//             </div>
//             <div style="font-size:11px; margin-bottom:5px;">${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'}</div>
            
//             <textarea rows="1" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; font-family:'${block.font}'; margin-bottom:5px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" title="Méret">
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px;">
//             </div>
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)">${fontOptionsHTML}</select>
//                 ${block.isNewLine ? `
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
//                     <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                     <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
//                     <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                 </select>` : ''}
//             </div>
//         `;
//         container.appendChild(div);
//     });
// }


// // Fontos: UI Renderelés UI-frissítéshez (marad a régi logika)
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';
//     const data = getCurrentZoneData(zone);
//     if (!data) return;
    
//     // Dropdown szinkronizáció
//     const alignSelect = document.getElementById(`${zone}-zone-align-v`);
//     if(alignSelect) alignSelect.value = data.alignV;

//     data.blocks.forEach((block) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         // Font opciók
//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>${fontName}</option>`;
//         }).join('');

//         // HTML String
//         div.innerHTML = `
//             <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
//                 <button onclick="addSymbolToBlock(event, '${zone}', ${block.id})" style="border:none;background:none;cursor:pointer;">♥</button>
//                 <button onclick="removeBlock('${zone}', ${block.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>
//             </div>
//             <div style="font-size:11px; margin-bottom:5px;">${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'}</div>
            
//             <textarea rows="1" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; font-family:'${block.font}'; margin-bottom:5px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" title="Méret">
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px;">
//             </div>
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)">${fontOptionsHTML}</select>
//                 ${block.isNewLine ? `
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
//                     <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                     <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
//                     <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                 </select>` : ''}
//             </div>
//         `;
//         container.appendChild(div);
//     });
// }
// function renderZoneUI(zone) {
//     const container = document.getElementById(`${zone}-blocks-container`);
//     container.innerHTML = '';
    
//     if (!zoneDataStore[currentTextContext]) zoneDataStore[currentTextContext] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
//     const data = zoneDataStore[currentTextContext][zone];
    
//     const alignSelect = document.getElementById(`${zone}-zone-align-v`);
//     if(alignSelect) alignSelect.value = data.alignV;

//     // const fonts = ["Space Grotesk", "Playfair Display", "Montserrat", "Great Vibes", "Cinzel"];

//     data.blocks.forEach((block) => {
//         const div = document.createElement('div');
//         div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
//         let fontOptionsHTML = availableFonts.map(fontName => {
//             const isSelected = block.font === fontName ? 'selected' : '';
//             return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>${fontName}</option>`;
//         }).join('');

//         div.innerHTML = `
//             <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
//                 <button onclick="openSymbolPicker(event, '${zone}', ${block.id})" class="symbol-opener" style="border:none;background:none;cursor:pointer;color:#4a9eff;font-size:16px;">♥</button>
//                 <button onclick="removeBlock('${zone}', ${block.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>
//             </div>
//             <div style="font-size:11px; margin-bottom:5px; color:#aaa;">${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'}</div>
            
//             <textarea rows="2" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
//                 style="width:100%; font-family:'${block.font}'; margin-bottom:5px; background:rgba(0,0,0,0.3); color:white; border:1px solid #555; padding:5px;">${block.content}</textarea>
            
//             <div class="grid-2-cols" style="gap:5px;">
//                 <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" title="Méret">
//                 <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px;">
//             </div>
//             <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)">${fontOptionsHTML}</select>
//                 ${block.isNewLine ? `
//                 <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
//                     <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
//                     <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
//                     <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
//                 </select>` : ''}
//             </div>
//         `;
//         container.appendChild(div);
//     });
// }

function renderZoneUI(zone) {
    const container = document.getElementById(`${zone}-blocks-container`);
    container.innerHTML = '';
    
    if (!zoneDataStore[currentTextContext]) zoneDataStore[currentTextContext] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
    const data = zoneDataStore[currentTextContext][zone];
    
    const alignSelect = document.getElementById(`${zone}-zone-align-v`);
    if(alignSelect) alignSelect.value = data.alignV;

    const fonts = ["Space Grotesk", "Playfair Display", "Montserrat", "Great Vibes", "Cinzel"];

    data.blocks.forEach((block) => {
        const div = document.createElement('div');
        div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        
        let fontOptionsHTML = fonts.map(fontName => {
            const isSelected = block.font === fontName ? 'selected' : '';
            return `<option value="${fontName}" style="font-family: '${fontName}'; font-size: 16px;" ${isSelected}>${fontName}</option>`;
        }).join('');

        // div.innerHTML = `
        //     <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
        //          <button onclick="openSymbolPicker(event, '${zone}', ${block.id})" class="symbol-opener" style="border:none;background:none;cursor:pointer;color:#4a9eff;font-size:16px;">♥</button>
        //         <button onclick="removeBlock('${zone}', ${block.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>
        //     </div>
        //     <div style="font-size:11px; margin-bottom:5px; color:#aaa;">${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'}</div>
            
        //     <textarea id="textarea-${block.id}" rows="2" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
        //         style="width:100%; font-family:'${block.font}'; margin-bottom:5px; background:rgba(0,0,0,0.3); color:white; border:1px solid #555; padding:5px;">${block.content}</textarea>
            
        //     <div class="grid-2-cols" style="gap:5px;">
        //         <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" title="Méret">
        //         <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px;">
        //     </div>
        //     <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
        //         <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)">${fontOptionsHTML}</select>
        //         ${block.isNewLine ? `
        //         <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
        //             <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
        //             <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
        //             <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
        //         </select>` : ''}
        //     </div>
        // `;
        div.innerHTML = `
            <div style="position: absolute; top: 5px; right: 5px; display: flex; gap: 5px;">
                <button onclick="removeBlock('${zone}', ${block.id})" style="color:red;border:none;background:none;cursor:pointer;">×</button>
            </div>
            <div style="font-size:11px; margin-bottom:5px; color:#aaa;">${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'}</div>
            
            <textarea id="textarea-${block.id}" rows="2" oninput="updateBlockData('${zone}', ${block.id}, 'content', this.value)" 
                style="width:100%; font-family:'${block.font}'; margin-bottom:5px; background:rgba(0,0,0,0.3); color:white; border:1px solid #555; padding:5px;">${block.content}</textarea>
            
            <div class="grid-2-cols" style="gap:5px;">
                <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)" title="Méret">
                <input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:30px;">
            </div>
            <div class="grid-2-cols" style="gap:5px; margin-top:5px;">
                <select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)">${fontOptionsHTML}</select>
                ${block.isNewLine ? `
                <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
                    <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
                    <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
                    <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
                </select>` : ''}
            </div>
            <div class="grid-2-cols" style="gap:0px; margin-top:0px;">

                 <button onclick="window.openSymbolPicker(event, '${zone}', ${block.id})" class="add-btn accent" style="padding:0px;">♥ Jel</button>
                 <button onclick="removeBlock('${zone}', ${block.id})" class="delete-btn" style="padding:0px;color:red;border:none;background:none;cursor:pointer;">× Törlés</button>
            </div>
        `;

                                        
        container.appendChild(div);
    });
}


/* * fragment5_jo.js - JAVÍTOTT (Több kép, Kör Cropper, Méretezés, Igazítás) */

// // --- GLOBÁLIS ÁLLAPOTOK ---
// let layoutState = {
//     mode: 'single', // 'single', 'double-left', 'double-right'
//     photos: [],     // Tömb a képeknek: { id, dataURL, x, y, width, height, align }
//     mapBounds: { top: 0, bottom: 0, height: 0 } // A térkép méretei a szövegigazításhoz
// };

// // SZÖVEG ADATSTRUKTÚRA
// let zoneDataStore = {
//     map: { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } },
//     photo: { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } },
//     common: { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } }
// };

// let zoneFlags = { topCommon: false, bottomCommon: false };
// // Aktuálisan szerkesztett kontextus ('map', 'photo', vagy 'common')
// let currentTextContext = 'map';
// --- GLOBÁLIS ÁLLAPOTOK ---
let layoutState = {
    // Az elemek listája sorrendben. 
    // type: 'map' (Csillagtérkép) vagy 'photo' (Kép)
    elements: [
        { id: 'main-map', type: 'map' } 
    ],
    activePhotoId: null, // Melyik fotót szerkesztjük épp
    mapBounds: { top: 0, bottom: 0 } // Szövegigazításhoz
};

// SZÖVEG ADATSTRUKTÚRA
let zoneDataStore = {
    map: { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } },
    // A fotóknál dinamikusan bővülhetne, de most egyszerűsítsünk:
    // Van egy "photo" kontextus az éppen aktív fotóhoz? Vagy minden fotónak külön?
    // A kérés: "közös szöveg doboz, külön alülra és külön felülre". 
    // Maradunk a context alapú váltásnál.
    common: { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } }
};
// Minden fotóhoz generálunk egy tárolót dinamikusan
// zoneDataStore['photo_ID'] = { ... }

let zoneFlags = { topCommon: false, bottomCommon: false };
let currentTextContext = 'map';
let activePhotoId = null; // Melyik képet szerkesztjük épp (pozícionálás)
// INIT
$(document).ready(function() {
    // if(zoneData.top.blocks.length === 0) addNewBlock('top', true);
    // if(zoneData.bottom.blocks.length === 0) addNewBlock('bottom', true);// Alapértelmezett blokkok a Map-hez
    if(zoneDataStore.map.top.blocks.length === 0) addNewBlockToStore('map', 'top', true);
    if(zoneDataStore.map.bottom.blocks.length === 0) addNewBlockToStore('map', 'bottom', true);
    
    // Győződjünk meg róla, hogy a picker a body-ban van (betöltéskor is)
    const picker = $('#symbol-picker');
    if (picker.length && picker.parent().prop("tagName") !== "BODY") {
        picker.appendTo("body");
    }
    renderZoneUI('top');
    renderZoneUI('bottom');
    setTimeout(window.renderFixedTexts, 500);
    // Frissítés
    // setTimeout(window.renderFixedTexts, 500); // Késleltetés a biztonság kedvéért
    // setTimeout(window.renderFixedTexts, 500);
    $("#tabs").on("tabsactivate", function(event, ui) {
        console.log("tabs tabsactivate");
        console.log("tabs tabsactivate myCelestialConf", myCelestialConf);
        if (ui.newPanel[0].id === 'fragment-6') {
            document.getElementById('full-screen-designer').style.display = 'block';
            document.getElementById('main-layout').style.display = 'none';
            $("#copy-svg").trigger("click");
            $("#tabs_r").tabs("option", "active", 0);
            // setTimeout(updateCanvasSize, 50);
        } else {
            document.getElementById('full-screen-designer').style.display = 'none';
            document.getElementById('main-layout').style.display = 'flex';
        }
    });
    $("#tabs_r").on("tabsactivate", function(event, ui) {
        console.log("tabs_r tabsactivate");
        console.log("tabs_r tabsactivate myCelestialConf", myCelestialConf);
        if (ui.newPanel[0].id === 'fragment_r-5') {
            switchToMainEditor();

            Celestial.resize({width: getOptimalMapSize()});
            // 3. UTÓLAGOS KORREKCIÓ (Ez fogja helyretenni!)
            setTimeout(function(){
                // Először méretezzük át a konténerhez
                Celestial.resize({width: getOptimalMapSize()});
                
                // HA A SZÍV ALAK VAN KIVÁLASZTVA:
                if (myCelestialConf.projection === 'customHeart') {
                    console.log(">>> Szív alak igazítása...");
                    
                    var mapProj = Celestial.mapProjection; // Hozzáférés a D3 vetülethez
                    var t = mapProj.translate(); // Lekérjük a jelenlegi [x, y] pozíciót
                    
                    // --- ITT ÁLLÍTSD AZ ELTOLÁST! ---
                    // t[1] az Y tengely (függőleges).
                    // Ha a térkép FENT van, növeld ezt a számot (pl. +150), hogy LEFELÉ menjen.
                    // Ha túl lent van, csökkentsd vagy használj mínuszt.
                    
                    t[1] += 100; // 150 pixel lefelé tolás. Próbáld ki: 100, 150, 200...
                    
                    mapProj.translate(t); // Visszaírjuk az új pozíciót
                    Celestial.redraw();   // Újrarajzoljuk a térképet az új helyen
                }
                
            }, 150); // Pici késleltetés kell, hogy a Celestial végezzen az alapbeállítással
        }
    });
    
    // Kattintás a háttérre törli a kijelölést
    if(getDOMElements()) {
        designerSVG.addEventListener('click', (e) => { if(e.target.id==='designer-svg') selectElement(null); });
        // designerSVG.addEventListener('click', (e) => { if(e.target.id==='text-overlay-svg') selectElement(null); });
    }
    // Ezt tedd a $(document).ready blokkba vagy a végére:
    document.fonts.ready.then(function () {
        console.log('Betűtípusok betöltve, szövegek újrarendezése...');
        window.renderFixedTexts();
    });
    // $(document).on('mousedown', function(e) {
    //     const picker = $('#symbol-picker');
    //     // Ha a picker látható
    //     if (picker.is(':visible')) {
    //         // Ellenőrizzük, hogy a kattintás a pickeren BELÜL történt-e
    //         // VAGY egy szimbólum gombon történt-e (mert az nyitja meg)
    //         if (!$(e.target).closest('#symbol-picker').length && !$(e.target).closest('.symbol-btn').length) {
    //             // Ha kívül kattintott, elrejtjük
    //             picker.fadeOut(200);
    //             activeSymbolZone = null;
    //             activeSymbolBlockId = null;
    //         }
    //     }
    // });
    // $(document).on('mousedown', function(e) {
    //     const picker = $('#symbol-picker');
    //     if (picker.is(':visible')) {
    //         // Ha nem a picker-re és nem is a gombra kattintottunk
    //         if (!$(e.target).closest('#symbol-picker').length && !$(e.target).closest('.add-btn.accent').length) {
    //             picker.fadeOut(200);
    //             activeSymbolZone = null;
    //         }
    //     }
    // });
    $(document).on('mousedown', function(e) {
        // if (picker.is(':visible')) {
        //     // Ha nem a picker-re és nem is a "Szimbólum" gombra kattintottunk
        //     if (!$(e.target).closest('#symbol-picker').length && !$(e.target).closest('.add-btn.accent').length) {
        //         picker.fadeOut(200);
        //         activeSymbolZone = null;
        //     }
        // }
        if ($('#symbol-picker').is(':visible') && !$(e.target).closest('#symbol-picker').length && !$(e.target).hasClass('symbol-opener')) {
            $('#symbol-picker').fadeOut(200);
        }
    });
    // Hívd meg ezt is!
    initDesignerTemplates();
    
    // A tab váltáskor frissítsük, ha kell
    $("#designer-tabs").on("tabsactivate", function(event, ui) {
       // Ha kell valami speciális
    });
});