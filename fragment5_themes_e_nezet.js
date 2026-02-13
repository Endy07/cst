// --- 1. KONSTANSOK ÉS GLOBÁLIS VÁLTOZÓK ---
const MOON_IMG_SRC = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAyADIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9k='; // Base64 placeholder for offline reliability

const TEXT_TEMPLATES = {
    "Szerelem": ["A nap, amikor csillagaink találkoztak", "Szeretlek a Holdig és vissza", "A kezdet, ami örökké tart", "Egymásnak teremtve", "A mi csillagos égboltunk", "Te vagy a mindenem", "A szerelmünk születése", "Örökkön örökké", "Csillagokban megírva", "A legszebb éjszakánk", "Együtt, mindörökké", "A szívem választottja", "Végtelen szerelem"],
    "Esküvő": ["A Nagy Nap", "Mr. & Mrs.", "Két szív, egy lélek", "Igen, mindörökké", "Életünk legszebb napja", "Egy új közös út kezdete", "Szerelmünk ünnepe", "Holtodiglan, holtomiglan", "Kezdődik az örökké", "Szövetségünk az ég alatt", "A fogadalom napja", "Együtt az úton", "Tökéletes pillanat"],
    "Születésnap": ["A nap, amikor a világra jöttél", "Boldog születésnapot!", "Egy csillag született", "A Te napod", "Isten éltessen sokáig!", "Ragyogj, mint a csillagok!", "A legszebb ajándék", "Ünnepeljük a létedet", "Csodás évek állnak előtted", "Kívánj valamit!", "A Te csillagod", "Boldogság és szeretet", "Az élet szép veled"],
    "Gyermek születése": ["Isten hozott a világon!", "A legkisebb csillagunk", "Szeretetünk gyümölcse", "A csoda megérkezett", "Édes kisbabánk", "Az első lélegzetvétel", "Áldás az égből", "A családunk kincse", "Vártunk rád", "A legboldogabb napunk", "Kicsi kéz, nagy csoda", "A jövő elkezdődött", "Angyal szállt a földre"],
    "Idézetek": ["Nézz fel az égre...", "A csillagok nem hazudnak", "Minden történet itt kezdődik", "Ragyogj!", "Az univerzum bennünk él", "Végtelen lehetőségek", "Álmodj nagyot!", "A pillanat varázsa", "Csillagporból lettünk", "Az égbolt mesél", "Hallgass a szívedre", "A végtelen érintése", "Fény az éjszakában"]
};

const HEART_PATHS = {
    'classic': "M 500 880 C 280 680 50 450 50 250 C 50 100 200 50 350 50 C 450 50 500 150 500 150 C 500 150 550 50 650 50 C 800 50 950 100 950 250 C 950 450 720 680 500 880 Z",
    'elegant': "M 500 950 C 300 700 100 450 100 280 C 100 120 220 50 340 50 C 420 50 480 100 500 150 C 520 100 580 50 660 50 C 780 50 900 120 900 280 C 900 450 700 700 500 950 Z",
    'round': "M 500 850 C 200 600 20 400 20 250 C 20 100 180 20 350 20 C 450 20 500 80 500 80 C 500 80 550 20 650 20 C 820 20 980 100 980 250 C 980 400 800 600 500 850 Z",
    'modern': "M 500 900 L 150 550 C 50 450 50 300 150 200 C 250 100 400 100 500 200 C 600 100 750 100 850 200 C 950 300 950 450 850 550 L 500 900 Z"
};
// --- FONT LISTA (A letöltéshez szükséges, ha még nincs definiálva a fájlban) ---
const availableFonts = [
    "Space Grotesk", "Montserrat", "Roboto", "Open Sans",
    "Merriweather", "Playfair Display", "Raleway", "Great Vibes",
    "Dancing Script", "Cinzel", "Allura", "Sacramento",
    "MedievalSharp", "Uncial Antiqua", "Tangerine", "Special Elite",
    "Quicksand", "Parisienne"
];
// --- HÁTTÉR PRESETEK (Konstansok) ---
const GRADIENT_PRESETS = [
    { name: "Alap Kék (Éjszaka)", value: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)" },
    { name: "Mély Űr (Fekete)", value: "#000000" },
    { name: "Tiszta Fehér", value: "#ffffff" },
    // { name: "Monokróm (Fekete-Fehér)", value: "linear-gradient(315deg, #ffffff 0%, #000000 100%)" }, // <--- ÚJ
    { name: "Monokróm (Fekete-Fehér)", value: "linear-gradient(135deg, #000000 0%, #ffffff 100%)" },
    { name: "Monokróm (Fehér-Fekete)", value: "linear-gradient(135deg, #ffffff 0%, #000000 100%)" },
    { name: "Monokróm (Fekete-Fehér vízszintes)", value: "linear-gradient(0deg, #ffffff 50%, #000000 50%)" },

    { name: "Monokróm (Fekete-Fehérr)", value: "linear-gradient(135deg, #000000 50%, #ffffff 50%)" },
    { name: "Monokróm (Fehér-Fekete)", value: "linear-gradient(0deg, #ffffff 50%, #000000 50%)" },
    { name: "Hármas Monokróm (Fehér-Fekete-Fehér)", value: "linear-gradient(0deg, #ffffff 0%, #000000 50%, #ffffff 100%, #000000 100%)" },
    // { name: "Monokróm (Fehér-Feketee)", value: "linear-gradient(100deg, #000000 50%, #ffffff 50%)" },
    { name: "Éjfél (Sötétkék)", value: "linear-gradient(135deg, #020024 0%, #090979 35%, #00d4ff 100%)" },
    { name: "Naplemente (Lila)", value: "linear-gradient(135deg, #240b36 0%, #c31432 100%)" },
    { name: "Aurora (Zöldes)", value: "linear-gradient(135deg, #000000 0%, #0f9b0f 100%)" },
    { name: "Királyi (Arany-Kék)", value: "linear-gradient(135deg, #141E30 0%, #243B55 100%)" },
    { name: "Ködös (Szürke)", value: "linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)" },
    { name: "Vintage (Papír)", value: "#f0e6d2" },
    { name: "Szerelmes (Rózsaszín)", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" }
];

//let cropper;
// Encapsulated state object to prevent global pollution
window.CelestialState = {
    tempInsertSide: 'end',
    tempUploadedFileName: '',
    cropper: null,
    activeSymbolZone: null,
    activeSymbolBlockId: null,
    activeSymbolBlockId: null,
    moonShadowColor: "black",
    // New state variables
    tempSPType: null,
    editingSPId: null,
    moonSource: 'nasa',
    moonPadding: 0
};

// --- UTILS: TOAST & LOADING ---
window.showCustomAlert = function (msg, type = 'info') {
    let alertBox = document.getElementById('custom-alert-box');
    if (!alertBox) {
        alertBox = document.createElement('div');
        alertBox.id = 'custom-alert-box';
        alertBox.style.cssText = "position: fixed; top: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 12px 20px; border-radius: 4px; z-index: 9999; display: none; border-left: 4px solid var(--accent-blue); box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-family: sans-serif; font-size: 14px;";
        document.body.appendChild(alertBox);
    }
    alertBox.innerText = msg;
    alertBox.style.borderColor = (type === 'error') ? '#ff4a4a' : 'var(--accent-blue)';
    alertBox.style.display = 'block';
    setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
};

window.showLoading = function () {
    let loader = document.getElementById('global-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; display: none; align-items: center; justify-content: center;";
        loader.innerHTML = '<div class="spinner" style="border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div><style>@keyframes spin {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}</style>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
};

window.hideLoading = function () {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'none';
};

// --- 2. ADATBÁZIS ÉS INITIALIZÁLÁS ---
function initUserData() {
    // console.log("function initUserData() {");
    if (typeof myCelestialConf === 'undefined' || !myCelestialConf) {
        // console.log("function initUserData() { if (typeof myCelestialConf === 'undefined' || !myCelestialConf) {");
        window.myCelestialConf = {};
    }

    if (!myCelestialConf.userData) {
        // console.log("function initUserData() { if (!myCelestialConf.userData) {");
        // debug log removed for production cleanliness
        // console.warn("[DEBUG] initUserData: userData was missing! Resetting to default.");
        if (window.debugMode) console.log("Adatbázis inicializálása...");
        myCelestialConf.userData = {
            canvas: {
                // width: 21, height: 30, background: "#ffffff", wallColor: "#BABABA", resizeLock: true,
                width: 21, height: 30, background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)", wallColor: "#BABABA", resizeLock: true,
                ratio: 21 / 30, lastW: 21, lastH: 30, resizeRatio: 21 / 30,
                layoutDirection: 'row',
                // --- KIFUTÓ (BLEED) BEÁLLÍTÁSOK ---
                bleed: {
                    mode: 'theme',          // 'theme' = alapértelmezett téma szerinti, 'custom' = egyéni szín
                    customColor: '#000000', // egyéni szín vagy gradiens string
                    previewEnabled: false   // élőnézet be/ki
                }
            },
            elements: [
                {
                    id: 'main-map', type: 'map', widthCM: 20, align: 'center',
                    marginTop: 0, marginBottom: 0, mask: 'none', maskScale: 1.0, scale: 1.0,
                    borderWidth: 0, borderEnabled: false, borderColor: '#ffffff', borderBlur: 0, borderDistance: 0, edgeBlur: 0,
                    contentBounds: { top: 0, bottom: 0 },
                    calculated: { x: 0, y: 0, scale: 1, widthPx: 0, heightPx: 0 }
                }
            ],
            zones: {
                'map': { top: { align: 'center', margin: 0, blocks: [] }, bottom: { align: 'center', margin: 0, blocks: [] } },
                'common': { top: { align: 'center', blocks: [] }, bottom: { align: 'center', blocks: [] } }
            },
            uiState: {
                activePhotoId: null,
                // selectedElementId: null,
                // --- JAVÍTÁS ITT: ---
                selectedElementId: 'main-map', // null helyett 'main-map' legyen az alap!
                // --------------------
                currentTextContext: 'map',
                zoneFlags: { topCommon: false, bottomCommon: false },
                layoutMode: 'multi',
                activeAddMode: 'photo',
                photoURL: null
            }
        };
        initDefaultTexts();
        initDefaultTexts();
        initEventHandlers();
    }
}

// --- ESEMÉNY FIGYELŐK INICIALIZÁLÁSA (ÚJ) ---
function initEventHandlers() {
    // Layout Gombok (Sor/Oszlop)
    const btnRow = document.getElementById('btn-layout-row');
    const btnCol = document.getElementById('btn-layout-column');
    const btnRow_ = document.getElementById('btn-layout-row_'); // Esetleges duplikációk kezelésére
    const btnCol_ = document.getElementById('btn-layout-column_');

    if (btnRow) btnRow.addEventListener('click', () => window.setLayoutDirection('row'));
    if (btnCol) btnCol.addEventListener('click', () => window.setLayoutDirection('column'));
    // Ha a duplikált ID-kat átneveztük unique ID-kra, itt kezeljük őket:
    // A HTML átírás után ezek pl. btn-layout-row-panel lehetnek.

    // Térkép letöltések
    const btnPng = document.getElementById('download-png');
    if (btnPng) btnPng.addEventListener('click', () => window.downloadMap('png'));

    const btnSvg = document.getElementById('download-svg');
    if (btnSvg) btnSvg.addEventListener('click', () => window.downloadMap('svg'));

    // Pozíció Igazítás
    const btnAlignTop = document.getElementById('btn-align-top');
    const btnAlignCenter = document.getElementById('btn-align-center');
    const btnAlignBottom = document.getElementById('btn-align-bottom');
    if (btnAlignTop) btnAlignTop.addEventListener('click', () => { window.setElementAlign('top'); if (window.triggerAutoSave) window.triggerAutoSave(); });
    if (btnAlignCenter) btnAlignCenter.addEventListener('click', () => { window.setElementAlign('center'); if (window.triggerAutoSave) window.triggerAutoSave(); });
    if (btnAlignBottom) btnAlignBottom.addEventListener('click', () => { window.setElementAlign('bottom'); if (window.triggerAutoSave) window.triggerAutoSave(); });

    // Maszk Gombok
    const maskTypes = ['none', 'classic', 'elegant', 'round', 'modern'];
    maskTypes.forEach(type => {
        const btn = document.getElementById(`c-mask-btn-${type}`);
        if (btn) btn.addEventListener('click', () => { window.setCommonMask(type); if (window.triggerAutoSave) window.triggerAutoSave(); });
    });

    // Smartpoint Mentés/Mégse (ID-kat hozzá kell adni a HTML-hez!)
    const btnSpSave = document.getElementById('btn-sp-save');
    const btnSpCancel = document.getElementById('btn-sp-cancel');
    if (btnSpSave) btnSpSave.addEventListener('click', window.saveSmartpoint);
    if (btnSpCancel) btnSpCancel.addEventListener('click', window.cancelSmartpoint);
}

function getDOMElements() {
    designerSVG = document.getElementById('designer-svg');
    mapLayer = document.getElementById('celestial-map-layer');
    textLayer = document.getElementById('text-layer');
    return !!(designerSVG && mapLayer && textLayer);
}

function getMainMapElement() {
    if (!myCelestialConf || !myCelestialConf.userData) initUserData();
    return myCelestialConf.userData.elements.find(el => el.type === 'map');
}

// --- 3. LAYOUT ÉS VÁSZON KEZELÉS ---
window.setLayoutDirection = function (dir) {
    if (!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.canvas.layoutDirection = dir;
    updateLayoutButtons(dir);
    updateCanvasSize();
    refreshMapTransform();
    updateElementSelectorUI();
    // console.log("window.setLayoutDirection = function (dir) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}

function updateLayoutButtons(dir) {
    const btnRow = document.getElementById('btn-layout-row');
    const btnCol = document.getElementById('btn-layout-column');
    const btnRow_ = document.getElementById('btn-layout-row_');
    const btnCol_ = document.getElementById('btn-layout-column_');
    if (!btnRow || !btnCol || !btnRow_ || !btnCol_) return;

    if (dir === 'row') {
        btnRow.className = 'add-btn primary';
        btnCol.className = 'add-btn secondary';
        btnRow_.className = 'add-btn primary';
        btnCol_.className = 'add-btn secondary';
        const l1 = document.getElementById('lbl-element-margin-top'); if (l1) l1.innerText = "Bal Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if (l2) l2.innerText = "Jobb Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "SOR (↔)";
        document.getElementById('btn-add-start').innerHTML = "⬅ BALRA (Elejére)";
        document.getElementById('btn-add-end').innerHTML = "➡ JOBBRA (Végére)";
    } else {
        btnRow.className = 'add-btn secondary';
        btnCol.className = 'add-btn primary';
        btnRow_.className = 'add-btn secondary';
        btnCol_.className = 'add-btn primary';
        const l1 = document.getElementById('lbl-element-margin-top'); if (l1) l1.innerText = "Felső Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if (l2) l2.innerText = "Alsó Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "OSZLOP (↕)";
        document.getElementById('btn-add-start').innerHTML = "⬆ FENTRE (Tetejére)";
        document.getElementById('btn-add-end').innerHTML = "⬇ LENTRE (Végére)";
    }
}


// --- JAVÍTOTT ÉS PROFESSZIONÁLIS: Vászon méretezése ---
window.updateCanvasSize = function () {
    // console.log("window.updateCanvasSize = function () { initelott");
    // console.log("window.updateCanvasSize = function () { initelott myCelestialConf.userData", myCelestialConf.userData);
    //console.log("window.updateCanvasSize = function () { initelott myCelestialConf.userData.elements[0].widthCM", myCelestialConf.userData.elements[0].widthCM);
    if (!myCelestialConf.userData) initUserData();
    // console.log("window.updateCanvasSize = function () {");
    // console.log("window.updateCanvasSize = function () { myCelestialConf", myCelestialConf);
    //console.log("window.updateCanvasSize = function () { myCelestialConf.userData.elements[0].widthCM", myCelestialConf.userData.elements[0].widthCM);

    // 1. Alap inputok
    const widthInput = document.getElementById('canvas-width');
    const heightInput = document.getElementById('canvas-height');
    let singlePageWidthCm = parseFloat(widthInput.value) || 21;
    let pageHeightCm = parseFloat(heightInput.value) || 30;

    // 2. Elemszám és Elrendezés
    const elements = myCelestialConf.userData.elements;
    const count = elements.length > 0 ? elements.length : 1;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';

    // 3. Teljes méret számítása
    let totalWidthCm, totalHeightCm;

    if (layoutDir === 'column') {
        totalWidthCm = singlePageWidthCm;
        totalHeightCm = pageHeightCm * count;
    } else {
        totalWidthCm = singlePageWidthCm * count;
        totalHeightCm = pageHeightCm;
    }

    // console.log(`Vászon újraszámolása: ${count} elem -> ${totalWidthCm}x${totalHeightCm} cm`);

    // --- ÚJ RÉSZ: PROFESSZIONÁLIS ELHELYEZÉS ---
    let totalSizeDisp = document.getElementById('total-canvas-size-display');

    // Ha még nincs létrehozva az információs doboz
    if (!totalSizeDisp && heightInput) {
        // Megkeressük a grid-et, amiben az inputok vannak.
        // Ez a legbiztosabb pont: a "grid-2-cols" osztályú szülő.
        const gridContainer = heightInput.closest('.grid-2-cols');

        if (gridContainer && gridContainer.parentNode) {
            totalSizeDisp = document.createElement('div');
            totalSizeDisp.id = 'total-canvas-size-display';

            // Stílus: Teljes szélesség, elkülönülő doboz
            // totalSizeDisp.style.cssText = "width: 100%; margin-top: 12px; font-size: 11px; color: var(--accent-blue); font-weight: bold; text-align: center; background: rgba(74, 158, 255, 0.1); padding: 8px; border-radius: 4px; border: 1px dashed var(--accent-blue); box-sizing: border-box;";

            // Stílus: Teljes szélesség, elkülönülő doboz
            totalSizeDisp.style.cssText = "width: 100%; margin-bottom: 6px; font-size: 14px; color: var(--accent-blue); font-weight: bold; text-align: center; background: rgba(74, 158, 255, 0.1); padding: 8px; border-radius: 4px; border: 1px dashed var(--accent-blue); box-sizing: border-box;";

            // margin-bottom: 0px;
            // BESZÚRÁS: Közvetlenül a gridContainer UTÁN szúrjuk be.
            // A parentNode.insertBefore(..., nextSibling) a standard JS módja az "insertAfter"-nek.
            gridContainer.parentNode.insertBefore(totalSizeDisp, gridContainer.nextSibling);
        }
    }

    // Tartalom és Láthatóság frissítése
    if (totalSizeDisp) {
        if (count > 1) {
            totalSizeDisp.style.display = 'block';
            totalSizeDisp.innerHTML = `🏁 Teljes méret: ${totalWidthCm.toFixed(1)} cm x ${totalHeightCm.toFixed(1)} cm`;
        } else {
            // Ha csak 1 elem van, nem szükséges az összesített méret, mert megegyezik a fenti inputokkal
            totalSizeDisp.style.display = 'none';
        }
    }
    // -----------------------------------------------------

    // 4. Képarány és ViewBox számítása
    const aspectRatio = totalWidthCm / totalHeightCm;
    const EXPORT_BASE_SIZE = 5000;

    let viewBoxWidth, viewBoxHeight;

    if (aspectRatio >= 1) {
        viewBoxWidth = EXPORT_BASE_SIZE;
        viewBoxHeight = EXPORT_BASE_SIZE / aspectRatio;
    } else {
        viewBoxHeight = EXPORT_BASE_SIZE;
        viewBoxWidth = EXPORT_BASE_SIZE * aspectRatio;
    }

    // 5. SVG ViewBox frissítése
    const designerSVG = document.getElementById('designer-svg');
    if (designerSVG) {
        designerSVG.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    }

    // Háttér téglalap
    const bgRect = document.getElementById('designer-background-rect');
    if (bgRect) {
        bgRect.setAttribute('width', viewBoxWidth);
        bgRect.setAttribute('height', viewBoxHeight);
    }

    // 6. Megjelenítés a képernyőn (CSS)
    const container = document.getElementById('designer-canvas-area');
    const wrapper = document.getElementById('canvas-wrapper');

    if (container && wrapper) {
        const style = window.getComputedStyle(container);
        const availableW = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const availableH = container.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        const containerRatio = availableW / availableH;

        if (aspectRatio > containerRatio) {
            wrapper.style.width = `${availableW}px`;
            wrapper.style.height = `${availableW / aspectRatio}px`;
        } else {
            wrapper.style.height = `${availableH}px`;
            wrapper.style.width = `${availableH * aspectRatio}px`;
        }
    }

    // 7. Transzformáció frissítése
    setTimeout(function () {
        if (window.refreshMapTransform) window.refreshMapTransform();
    }, 50);

    // UI frissítése (Bleed selector is itt frissül)
    if (window.updateElementSelectorUI) window.updateElementSelectorUI();
}

window.toggleResizeLock = function (checkbox) {
    if (!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.canvas.resizeLock = checkbox.checked;
    if (myCelestialConf.userData.canvas.resizeLock) {
        const w = parseFloat(document.getElementById('canvas-width').value) || 21;
        const h = parseFloat(document.getElementById('canvas-height').value) || 30;
        myCelestialConf.userData.canvas.lastW = w;
        myCelestialConf.userData.canvas.lastH = h;
        myCelestialConf.userData.canvas.resizeRatio = w / h;
    }
    // console.log("window.toggleResizeLock = function (checkbox) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}

window.handleCanvasParamChange = function (type, val) {
    if (!myCelestialConf.userData) initUserData();
    const canvasData = myCelestialConf.userData.canvas;

    if (canvasData.resizeLock && typeof canvasData.resizeRatio === 'undefined') {
        const curW = parseFloat(document.getElementById('canvas-width').value) || 21;
        const curH = parseFloat(document.getElementById('canvas-height').value) || 30;
        canvasData.resizeRatio = curW / curH;
        canvasData.lastW = curW;
        canvasData.lastH = curH;
    }

    const numVal = parseFloat(val);
    if (!numVal || numVal <= 0) return;

    const wInput = document.getElementById('canvas-width');
    const hInput = document.getElementById('canvas-height');

    if (canvasData.resizeLock) {
        if (type === 'width') {
            const newH = numVal / canvasData.resizeRatio;
            hInput.value = newH.toFixed(1);
            canvasData.lastW = numVal;
            canvasData.lastH = newH;
        } else if (type === 'height') {
            const newW = numVal * canvasData.resizeRatio;
            wInput.value = newW.toFixed(1);
            canvasData.lastW = newW;
            canvasData.lastH = numVal;
        }
    } else {
        if (type === 'width') canvasData.lastW = numVal;
        if (type === 'height') canvasData.lastH = numVal;
    }
    window.updateCanvasSize();
}

window.updateWallColor = function (color) {
    if (!myCelestialConf.userData) initUserData();
    const area = document.getElementById('designer-canvas-area');
    if (area) area.style.backgroundColor = color;
    myCelestialConf.userData.canvas.wallColor = color;
    // console.log("window.updateWallColor = function (color) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


// BBox segéd
function getMapContentBBox(mapSvg) {
    try {
        if (mapSvg.tagName === 'image') {
            return { x: 0, y: 0, width: parseFloat(mapSvg.getAttribute('width')), height: parseFloat(mapSvg.getAttribute('height')) };
        }
        if (typeof mapSvg.getBBox === 'function') {
            return mapSvg.getBBox();
        }
        return { x: 0, y: 0, width: 1000, height: 1000 };
    } catch (e) {
        return { x: 0, y: 0, width: 1000, height: 1000 };
    }
}



// --- JAVÍTOTT: refreshMapTransform (ViewBox alapú Pixel-Pontos Igazítás) ---
window.refreshMapTransform = function () {
    if (window.showLoading) window.showLoading();
    setTimeout(() => {
        try {
            window._refreshMapTransformImpl();
        } catch (e) {
            console.error("Map refresh error:", e);
            if (window.showCustomAlert) window.showCustomAlert("Hiba a térkép frissítésekor!", 'error');
        } finally {
            if (window.hideLoading) window.hideLoading();
        }
    }, 20);
}

window._refreshMapTransformImpl = function () {
    if (!getDOMElements()) return;
    if (!myCelestialConf.userData) initUserData();
    // --- ÚJ: Itt frissítjük a gombok láthatóságát ---
    if (window.updateLayoutVisibility) window.updateLayoutVisibility();
    // -----------------------------------------------

    // 1. Alapváltozók
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const paperW = paperVB[2];
    const paperH = paperVB[3];
    const elements = myCelestialConf.userData.elements;

    // 3. Pixel/CM arány
    const canvasWInput = document.getElementById('canvas-width');
    const pageWidthCm = parseFloat(canvasWInput ? canvasWInput.value : 21);
    let effectivePageWidthCm = (layoutDir === 'row' && elements.length > 1) ? pageWidthCm * elements.length : pageWidthCm;
    const pxPerCm = paperW / effectivePageWidthCm;

    // 2. Slot méretek
    const count = elements.length;
    let slotW, slotH;
    if (layoutDir === 'column') {
        slotW = paperW; slotH = paperH / count;
    } else {
        slotW = paperW / count; slotH = paperH;
    }

    // 4. Takarítás
    const renderLayer = document.getElementById('celestial-map-layer');
    if (!renderLayer) return;
    renderLayer.innerHTML = '';

    // Defs & Blur
    let defs = designerSVG.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        designerSVG.insertBefore(defs, designerSVG.firstChild);
    }
    const ensureBlurFilter = (idSuffix, blurAmount) => {
        if (blurAmount < 0) blurAmount = 0;
        const filterId = `blur-filter-${idSuffix}`;
        let filter = defs.querySelector(`#${filterId}`);
        if (!filter) {
            filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
            filter.setAttribute("id", filterId);
            filter.setAttribute("x", "-50%"); filter.setAttribute("y", "-50%");
            filter.setAttribute("width", "200%"); filter.setAttribute("height", "200%");
            const blur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
            blur.setAttribute("in", "SourceGraphic");
            filter.appendChild(blur);
            defs.appendChild(filter);
        }
        const blurNode = filter.querySelector("feGaussianBlur");
        if (blurNode) blurNode.setAttribute("stdDeviation", blurAmount);
        return (blurAmount > 0) ? `url(#${filterId})` : null;
    };

    // console.log("elements", elements);
    // --- 5. ELEMEK RENDERELÉSE ---
    elements.forEach((el, index) => {
        // Pozíció számítás
        let slotStartX, slotStartY, slotCenterX, slotCenterY;
        if (layoutDir === 'column') {
            slotStartX = 0; slotStartY = index * slotH;
            slotCenterX = paperW / 2; slotCenterY = slotStartY + (slotH / 2);
        } else {
            slotStartX = index * slotW; slotStartY = 0;
            slotCenterX = slotStartX + (slotW / 2); slotCenterY = paperH / 2;
        }

        // --- LOKÁLIS HÁTTÉR (JAVÍTVA: GRADIENS TÁMOGATÁSSAL + SMART BLEED) ---
        if (el.localBackground) {
            const bgG = document.createElementNS("http://www.w3.org/2000/svg", "g");
            bgG.setAttribute('transform', `translate(${slotStartX}, ${slotStartY})`);

            // --- SMART BLEED GEOMETRIA SZÁMÍTÁS ---
            // Cél: Belső éleknél ne legyen kifutó (transzparens), Külső/Felső/Alsó éleknél legyen.

            // 1. Tartalom méretének kiszámítása ( újra, mert sorrendben előrébb vagyunk)
            const contentBaseSize = 1000;
            let desiredWidthCm = el.widthCM || 20;
            let targetSizePxBefore = desiredWidthCm * pxPerCm;

            // Margók (amik a tartalmat beljebb tolják a slothoz képest)
            // A transzformáció (L655) kezeli a pozíciót, de nekünk itt a háttér téglalapot kell igazítani.
            // A Slot Közép: slotW / 2.
            // A Tartalom (Map) Közép: slotW / 2 (ha align=center).
            // Feltételezzük a horizontális középre igazítást (alapértelmezett).

            // Relatív X pozíció a sloton belül (ahol a tartalom kezdődik)
            let contentRelX = (slotW - targetSizePxBefore) / 2;

            // Alapértelmezett: Teljes Slot kitöltése
            let bgX = 0;
            let bgY = 0;
            let bgW = slotW;
            let bgH = slotH;

            // Csak akkor variálunk, ha több elem van és sorban vannak (könyv nézet)
            if (elements.length > 1 && layoutDir === 'row') {
                if (index === 0) {
                    // BAL OLDALI (Első):
                    // Bal: Kifutó (Marad 0)
                    // Jobb: Belső él -> Nincs kifutó (A tartalom jobb széléig tart)
                    // Szélesség = Tartalom Bal X + Tartalom Szélesség = Tartalom Jobb Széle
                    bgW = contentRelX + targetSizePxBefore;
                } else if (index === elements.length - 1) {
                    // JOBB OLDALI (Utolsó):
                    // Bal: Belső él -> Nincs kifutó (A tartalom bal szélétől indul)
                    // Jobb: Kifutó (Marad a slot végéig)
                    bgX = contentRelX;
                    bgW = slotW - contentRelX;
                } else {
                    // KÖZÉPSŐ:
                    // Bal: Nincs kifutó
                    // Jobb: Nincs kifutó
                    // Csak a tartalom szélességében
                    bgX = contentRelX;
                    bgW = targetSizePxBefore;
                }
                // Felső/Alsó mindig teljes (bgY=0, bgH=slotH) a kérés szerint.
            }

            // Ha véletlenül negatív lenne (túl nagy zoom), korrigáljuk
            if (bgW < 0) bgW = 0;

            const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bgRect.setAttribute('width', bgW);
            bgRect.setAttribute('height', bgH);
            bgRect.setAttribute('x', bgX);
            bgRect.setAttribute('y', bgY);

            // --- GRADIENS KEZELÉS ---
            if (el.localBackground.includes('gradient')) {
                // 1. Egyedi ID generálása a gradiensnek
                const gradientId = `grad-local-${el.id}`;

                // 2. Régi definíció törlése (ha volt)
                const oldGrad = defs.querySelector(`#${gradientId}`);
                if (oldGrad) oldGrad.remove();

                // 3. Új LinearGradient elem létrehozása
                const gradEl = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                gradEl.setAttribute("id", gradientId);
                // Fontos: userSpaceOnUse, hogy a vágott téglalapon belül is a teljes textúrát/témát kövesse?
                // Vagy objectBoundingBox? Ha objectBoundingBox, akkor a gradiens összenyomódik a vágott téglalapba.
                // A "Téma" általában globális. Ha a szélső kifutót levágom, a gradiensnek folytatódnia kellene?
                // A felhasználó "Egyéni színről" beszélt (Solid). Gradiensnél ez bonyolultabb.
                // Solid színnél (ami a kérés tárgya) mindegy.
                // Maradunk az alapértelmezetnél.

                // Szög kinyerése és konvertálása irányokká
                let angle = 180; // Alapértelmezett: Fentről lefelé
                const angleMatch = el.localBackground.match(/(\d+)deg/);
                if (angleMatch) angle = parseInt(angleMatch[1]);

                // Egyszerűsített irány logika a leggyakoribb szögekre
                let x1 = "0%", y1 = "0%", x2 = "0%", y2 = "100%"; // 180deg

                if (angle === 90) { x1 = "0%"; y1 = "0%"; x2 = "100%"; y2 = "0%"; }       // Bal->Jobb
                else if (angle === 135) { x1 = "0%"; y1 = "0%"; x2 = "100%"; y2 = "100%"; } // BalFent->JobbLent
                else if (angle === 45) { x1 = "0%"; y1 = "100%"; x2 = "100%"; y2 = "0%"; }  // BalLent->JobbFent
                else if (angle === 0 || angle === 360) { x1 = "0%"; y1 = "100%"; x2 = "0%"; y2 = "0%"; } // Lentről fel

                gradEl.setAttribute("x1", x1); gradEl.setAttribute("y1", y1);
                gradEl.setAttribute("x2", x2); gradEl.setAttribute("y2", y2);

                // 4. Színek (Stops) kinyerése a stringből
                const regex = /(#[a-fA-F0-9]{6})\s*(\d+%)?/g;
                let match;
                let stopIndex = 0;
                let foundStops = false;

                while ((match = regex.exec(el.localBackground)) !== null) {
                    foundStops = true;
                    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");

                    let offset = match[2];
                    if (!offset) {
                        offset = (stopIndex === 0) ? "0%" : "100%";
                    }

                    stop.setAttribute("offset", offset);
                    stop.setAttribute("stop-color", match[1]);
                    gradEl.appendChild(stop);
                    stopIndex++;
                }

                if (foundStops) {
                    defs.appendChild(gradEl);
                    bgRect.setAttribute('fill', `url(#${gradientId})`);
                } else {
                    bgRect.setAttribute('fill', '#000000');
                }

            } else {
                // Sima szín esetén marad a hex kód
                bgRect.setAttribute('fill', el.localBackground);
            }

            bgG.appendChild(bgRect);
            renderLayer.appendChild(bgG);
        }

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('id', `element-group-${el.id}`);
        g.setAttribute('class', `designer-element type-${el.type}`);

        // Méretezés (KERET MÉRETE = 20cm alap)
        const contentBaseSize = 1000;
        let desiredWidthCm = el.widthCM || 20;
        console.log("el", el);
        console.log("el.widthCM", el.widthCM);
        console.log("desiredWidthCm", desiredWidthCm);
        let targetSizePx = desiredWidthCm * pxPerCm;
        let finalScale = targetSizePx / contentBaseSize;

        // Igazítás
        const mt = (el.marginTop || 0) * pxPerCm;
        const mb = (el.marginBottom || 0) * pxPerCm;
        let transX = slotCenterX - (targetSizePx / 2);
        let transY = 0;

        if (el.align === 'center') transY = slotCenterY - (targetSizePx / 2) + mt - mb;
        else if (el.align === 'top') transY = slotStartY + mt;
        else if (el.align === 'bottom') transY = (slotStartY + slotH) - mb - targetSizePx;

        const rot = el.rotation || 0;
        const rotCenter = targetSizePx / 2;

        // FŐ TRANSZFORMÁCIÓ (Csoport)
        g.setAttribute('transform', `translate(${transX}, ${transY}) rotate(${rot}, ${rotCenter}, ${rotCenter}) scale(${finalScale})`);

        // --- TARTALOM LÉTREHOZÁSA ---
        let contentNode = null;

        if (el.type === 'map' && el.vectorData) {
            // SECURE SVG PARSING: Use DOMParser instead of innerHTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(el.vectorData, "image/svg+xml");
            const svgNode = doc.documentElement;

            // Validate that we actually got an SVG
            if (svgNode && svgNode.tagName.toLowerCase() === 'svg') {
                // Import the node into the current document to avoid context issues
                const importedNode = document.importNode(svgNode, true);
                // Fix méret és pozíció, hogy a csoporton belül ne ugráljon
                importedNode.setAttribute('width', contentBaseSize);
                importedNode.setAttribute('height', contentBaseSize);
                importedNode.setAttribute('x', 0);
                importedNode.setAttribute('y', 0);
                importedNode.setAttribute('id', `embedded-map-${el.id}`);
                importedNode.style.pointerEvents = "none";
                importedNode.style.overflow = "visible";
                contentNode = importedNode;
            } else {
                console.error("Invalid SVG data for map element");
            }
        }

        if (!contentNode && el.dataURL) {
            contentNode = document.createElementNS("http://www.w3.org/2000/svg", "image");
            contentNode.setAttributeNS('http://www.w3.org/1999/xlink', 'href', el.dataURL);
            contentNode.setAttribute('width', contentBaseSize);
            contentNode.setAttribute('height', contentBaseSize);
            // Fontos: preserveAspectRatio, hogy kitöltse a teret (mint a cover)
            contentNode.setAttribute('preserveAspectRatio', 'xMidYMid slice');
            contentNode.setAttribute('x', 0);
            contentNode.setAttribute('y', 0);
        }

        if (!contentNode) {
            contentNode = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            contentNode.setAttribute('width', contentBaseSize);
            contentNode.setAttribute('height', contentBaseSize);
            contentNode.setAttribute('fill', 'rgba(255,255,255,0.1)');
        }

        // --- MASZKOLÁS ---
        const maskType = el.mask || 'none';
        const maskScale = el.maskScale || 1.0;
        const edgeBlur = el.edgeBlur || 0;
        const clipId = `clip-${el.id}`;
        const maskId = `mask-${el.id}`;

        const oldClip = defs.querySelector(`#${clipId}`); if (oldClip) oldClip.remove();
        const oldMask = defs.querySelector(`#${maskId}`); if (oldMask) oldMask.remove();

        // const needsMasking = true; 
        // --- EZT A SORT JAVÍTSD KI: ---
        // HIBÁS VOLT: const needsMasking = true; 
        // const needsMasking = (maskType !== 'none'); 
        // ------------------------------
        let needsMasking = (maskType !== 'none');
        if (el.type === 'photo' && maskType === 'none') {
            needsMasking = true; // Kényszerített kör vágás képeknél
        }

        if (needsMasking) {
            const createShape = () => {
                if (typeof HEART_PATHS !== 'undefined' && HEART_PATHS[maskType]) {
                    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    p.setAttribute('d', HEART_PATHS[maskType]);
                    p.setAttribute('transform', `translate(500, 500) scale(${maskScale}) translate(-500, -500)`);
                    return p;
                } else {
                    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    c.setAttribute('cx', 500); c.setAttribute('cy', 500);
                    c.setAttribute('r', 500 * maskScale);
                    return c;
                }
            };

            if (edgeBlur > 0) {
                const maskEl = document.createElementNS("http://www.w3.org/2000/svg", "mask");
                maskEl.setAttribute('id', maskId);
                const shape = createShape();
                shape.setAttribute('fill', 'white');
                const filterUrl = ensureBlurFilter(`mask-blur-${el.id}`, edgeBlur);
                if (filterUrl) shape.setAttribute('filter', filterUrl);
                maskEl.appendChild(shape);
                defs.appendChild(maskEl);

                if (contentNode.tagName === 'svg') {
                    const wrapperG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    wrapperG.setAttribute('mask', `url(#${maskId})`);
                    wrapperG.appendChild(contentNode);
                    contentNode = wrapperG;
                } else {
                    contentNode.setAttribute('mask', `url(#${maskId})`);
                }
            } else {
                const clipEl = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                clipEl.setAttribute('id', clipId);
                const shape = createShape();
                clipEl.appendChild(shape);
                defs.appendChild(clipEl);

                if (contentNode.tagName === 'svg') {
                    const wrapperG = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    wrapperG.setAttribute('clip-path', `url(#${clipId})`);
                    wrapperG.appendChild(contentNode);
                    contentNode = wrapperG;
                } else {
                    contentNode.setAttribute('clip-path', `url(#${clipId})`);
                }
            }
        }

        g.appendChild(contentNode);

        // --- KERET (BORDER) - KIFELÉ NÖVEKEDŐ (És Pontos) ---
        if (el.borderEnabled && el.borderWidth > 0) {
            let borderShape;
            const distOffset = (el.borderDistance || 0);
            const strokeWidthRaw = (el.borderWidth || 2) / finalScale;

            // TRÜKK: Fél vastagságnyi offset kifelé
            const halfStroke = strokeWidthRaw / 2;
            const borderScale = maskScale + ((distOffset + halfStroke) / 500);

            if (typeof HEART_PATHS !== 'undefined' && HEART_PATHS[maskType]) {
                borderShape = document.createElementNS("http://www.w3.org/2000/svg", "path");
                borderShape.setAttribute('d', HEART_PATHS[maskType]);
                borderShape.setAttribute('transform', `translate(500, 500) scale(${borderScale}) translate(-500, -500)`);
            } else {
                borderShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                borderShape.setAttribute('cx', 500); borderShape.setAttribute('cy', 500);
                borderShape.setAttribute('r', 500 * borderScale);
            }

            if (borderShape) {
                borderShape.setAttribute('fill', 'none');
                borderShape.setAttribute('stroke', el.borderColor || '#ffffff');
                borderShape.setAttribute('stroke-width', strokeWidthRaw);
                const filterUrl = ensureBlurFilter(`border-${el.id}`, el.borderBlur || 0);
                if (filterUrl) borderShape.setAttribute('filter', filterUrl);
                g.appendChild(borderShape);
            }
        }

        el.calculated = { x: transX, y: transY, scale: finalScale, widthPx: targetSizePx, heightPx: targetSizePx };
        el.contentBounds = { top: transY, bottom: transY + targetSizePx };

        // Kattintás
        g.style.cursor = "pointer";
        g.onclick = function (e) {
            const uiState = myCelestialConf.userData.uiState;
            if (uiState.placingSmartpoint || uiState.movingSmartpointId) {
                window.handleCanvasClick(e); e.stopPropagation(); return;
            }
            e.stopPropagation();
            if (el.type === 'map') {
                window.loadMapToEditor(el.id);
                if (window.handleElementSelection) window.handleElementSelection(el.id);
            } else {
                window.highlightPhoto(el.id, this);
                if (window.handleElementSelection) window.handleElementSelection(el.id);
            }
        };

        renderLayer.appendChild(g);

        // --- 6. CSILLAGTÉRKÉP "VIEWBOX" IGAZÍTÁS (EZ A KULCS A SZIMMETRIÁHOZ) ---
        if (el.type === 'map') {
            try {
                // Az elem, amit manipulálunk (maga az SVG tartalom)
                const realSvg = document.getElementById(`embedded-map-${el.id}`);
                const bg = g.querySelector('.background');

                if (bg && realSvg) {
                    // 1. Mérés
                    let bbox = { width: 0, height: 0, x: 0, y: 0 };
                    try { bbox = bg.getBBox(); } catch (e) { }

                    // 2. Ha a mérés 0 (betöltés), Fallback a meglévő viewBox-ra
                    if (bbox.width <= 1) {
                        if (realSvg.viewBox && realSvg.viewBox.baseVal && realSvg.viewBox.baseVal.width > 0) {
                            const vb = realSvg.viewBox.baseVal;
                            bbox = { x: vb.x, y: vb.y, width: vb.width, height: vb.height };
                        } else {
                            bbox = { x: 0, y: 0, width: 1000, height: 1000 };
                        }
                    }

                    // 3. VIEWBOX BEÁLLÍTÁSA (TRANSFORM HELYETT!)
                    if (bbox.width > 1) {
                        // Hagyunk egy pici rést (1%), hogy a keret ne takarja el
                        // const gapFactor = 0.99;
                        const gapFactor = 0.999;

                        // Kiszámoljuk az "új" viewBox-ot, ami nagyobb a tartalomnál, így az "távolabb" lesz
                        // Ha a tartalom 990px széles, de mi 1000-es viewBoxot adunk meg, akkor kisebb lesz.
                        // Itt fordítva: A tartalom méretét (bbox) osztjuk a gapFactorral, így a "kamera" távolodik.

                        // Kényszerítjük, hogy NÉGYZET legyen a viewBox, így nem torzul
                        const maxDim = Math.max(bbox.width, bbox.height);
                        const viewSize = maxDim / gapFactor; // pl. 1000 / 0.99 = 1010

                        // Középre igazítás
                        const centerX = bbox.x + bbox.width / 2;
                        const centerY = bbox.y + bbox.height / 2;

                        const newX = centerX - (viewSize / 2);
                        const newY = centerY - (viewSize / 2);

                        // Beállítjuk a viewBox-ot
                        // Ez azt mondja az SVG-nek: "Mutasd ezt a területet". 
                        // Mivel az SVG width/height attribútuma 1000x1000 fix, a tartalom bele fog simulni.
                        realSvg.setAttribute('viewBox', `${newX} ${newY} ${viewSize} ${viewSize}`);

                        // A biztonság kedvéért töröljük a régi transformot, ha volt
                        realSvg.removeAttribute('transform');
                    }
                }
            } catch (e) {
                console.warn("Auto-fit hiba:", e);
            }
        }
    });

    // 6. Okospontok (VÁLTOZATLAN)
    if (myCelestialConf.userData.uiState.showSmartpoints && myCelestialConf.userData.smartpoints) {
        const PATH_YOUTUBE = "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z";
        const PATH_SPOTIFY = "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.779-.66 13.5 1.62.42.181.6.719.3 1.141zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z";

        myCelestialConf.userData.smartpoints.forEach(sp => {
            if (sp.x === null) return;
            const gSP = document.createElementNS("http://www.w3.org/2000/svg", "g");
            gSP.setAttribute("class", "smartpoint-element");

            const posX = sp.x * pxPerCm;
            const posY = sp.y * pxPerCm;
            const radiusPx = 1.0 * pxPerCm;

            let circleColor = "rgba(40, 114, 186, 0.8)";
            if (sp.type === 'youtube') circleColor = "#FF0000";
            else if (sp.type === 'spotify') circleColor = "#1DB954";

            if (myCelestialConf.userData.uiState.movingSmartpointId === sp.id) {
                circleColor = "rgba(255, 215, 0, 0.9)";
            }

            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", posX); circle.setAttribute("cy", posY); circle.setAttribute("r", radiusPx);
            circle.setAttribute("fill", circleColor); circle.setAttribute("stroke", "white"); circle.setAttribute("stroke-width", radiusPx * 0.1);
            gSP.appendChild(circle);

            if (sp.type === 'youtube' || sp.type === 'spotify') {
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const pathData = (sp.type === 'youtube') ? PATH_YOUTUBE : PATH_SPOTIFY;
                const iconScale = (radiusPx * 1.2) / 24;
                const offset = 12 * iconScale;
                path.setAttribute("d", pathData); path.setAttribute("fill", "white");
                path.setAttribute("transform", `translate(${posX - offset}, ${posY - offset}) scale(${iconScale})`);
                gSP.appendChild(path);
            } else {
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", posX); text.setAttribute("y", posY);
                text.setAttribute("text-anchor", "middle"); text.setAttribute("dominant-baseline", "central");
                text.setAttribute("fill", "white"); text.setAttribute("font-size", radiusPx);
                const icons = { 'audio': '🎵', 'video': '🎥', 'image': '🖼️', 'url': '🔗' };
                text.textContent = icons[sp.type] || "•";
                gSP.appendChild(text);
            }

            gSP.style.cursor = "pointer";
            gSP.onclick = (e) => {
                e.stopPropagation();
                if (myCelestialConf.userData.uiState.isMovingSmartpoints) window.startMoveSpecificSmartpoint(sp.id);
                else window.editSmartpoint(sp.id);
            };
            renderLayer.appendChild(gSP);
        });
    }

    window.renderFixedTexts();
};
// --- ÚJ: Kezeli a "Sor/Oszlop" gombok láthatóságát ---
window.updateLayoutVisibility = function () {
    const elements = myCelestialConf.userData.elements || [];

    // 1. Megkeressük a rádió gombokat
    // const radios = document.getElementsByName('layoutDirection');
    const radios_r = document.getElementById('btn-layout-row');
    const radios_c = document.getElementById('btn-layout-column');
    if (radios_r.length === 0) return;

    // 2. Megkeressük a befoglaló dobozukat (szülő elemet)
    // Ha adtál ID-t a HTML-ben a div-nek (pl. id="layout-container"), akkor használd azt:
    // let container = document.getElementById('layout-container');

    // Ha nincs ID, akkor a program megpróbálja kitalálni a szülőt (általában a .control-group)
    // let container = radios[0].closest('.control-group');
    // let container = radios_r.parentNode.parentNode;
    let container = radios_r.parentNode.parentNode;

    if (!container) container = radios_r.parentElement.parentElement; // Biztonsági keresés

    if (container) {
        // HA több mint 1 elem van -> MUTASD, különben REJTSD EL
        if (elements.length > 1) {
            container.style.display = ''; // Eredeti (látható)
        } else {
            container.style.display = 'none'; // Elrejtés
        }
    }
};

// --- OKOSPONT KEZELŐ FÜGGVÉNYEK (ÚJ) ---
// Note: State variables moved to window.CelestialState


window.startAddSmartpoint = function () {
    // console.log("[DEBUG] startAddSmartpoint called");
    window.CelestialState.editingSPId = null; // JAVÍTVA: Globális reset

    document.getElementById('sp-type-selector').style.display = 'block';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'none';

    // Gombok alaphelyzetbe állítása
    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));

    // Ha esetleg maradt volna kijelölés a listában, azt is töröljük
    renderSmartpointsList();
}

window.selectSPType = function (type, btn) {
    window.CelestialState.tempSPType = type;

    // Gomb aktív állapot
    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Tartalom mező megjelenítése
    document.getElementById('sp-content-input').style.display = 'block';

    const urlGroup = document.getElementById('sp-input-url-group');
    const fileGroup = document.getElementById('sp-input-file-group');

    if (['audio', 'video', 'image'].includes(type)) {
        urlGroup.style.display = 'none';
        fileGroup.style.display = 'block';

        const accept = type === 'audio' ? 'audio/*' : type === 'video' ? 'video/*' : 'image/*';
        document.getElementById('sp-input-file').accept = accept;
    } else {
        urlGroup.style.display = 'block';
        fileGroup.style.display = 'none';

        const placeholders = {
            'youtube': 'https://youtube.com/watch?v=...',
            'spotify': 'https://open.spotify.com/track/...',
            'url': 'https://...'
        };
        document.getElementById('sp-input-url').placeholder = placeholders[type] || 'https://...';
    }
}

window.saveSmartpoint = function () {
    if (!window.CelestialState.tempSPType) return;

    var dessvg = document.getElementById('designer-svg');
    dessvg.style.cursor = "pointer";
    let content = '';

    // Tartalom kinyerése
    if (['audio', 'video', 'image'].includes(window.CelestialState.tempSPType)) {
        const fileInp = document.getElementById('sp-input-file');
        if (fileInp.files.length > 0) content = fileInp.files[0].name;
        else {
            // Ha szerkesztünk és nem választott új fájlt, tartsuk meg a régit
            if (window.CelestialState.editingSPId) {
                const existing = myCelestialConf.userData.smartpoints.find(sp => sp.id === window.CelestialState.editingSPId);
                if (existing) content = existing.content;
            } else {
                showCustomAlert("Válassz fájlt!"); return;
            }
        }
    } else {
        content = document.getElementById('sp-input-url').value;
        if (!content) { showCustomAlert("Adj meg URL-t!"); return; }
    }

    if (window.CelestialState.editingSPId) {
        // --- SZERKESZTÉS MENTÉSE (UPDATE) ---
        const sp = myCelestialConf.userData.smartpoints.find(s => s.id === window.CelestialState.editingSPId);
        if (sp) {
            sp.type = window.CelestialState.tempSPType;
            sp.content = content;
            showCustomAlert("Okospont sikeresen frissítve!", true);
        }
        window.CelestialState.editingSPId = null; // Reset

        cancelSmartpoint(); // Bezárjuk a szerkesztőt
        renderSmartpointsList(); // Lista frissítése
        window.refreshMapTransform(); // Ikon frissítése a vásznon
    } else {
        // --- ÚJ LÉTREHOZÁSA (LERAKÁSRA VÁR) ---
        if (!myCelestialConf.userData.uiState) initUserData();

        if (!myCelestialConf.userData.uiState.showSmartpoints) {
            toggleSmartpointsVisibility();
        }

        myCelestialConf.userData.uiState.placingSmartpoint = {
            id: Date.now(),
            type: window.CelestialState.tempSPType,
            content: content,
            x: null, y: null
        };

        cancelSmartpoint();
        showCustomAlert("Kattints a vásznon oda, ahová az Okospontot szeretnéd tenni!");
    }
}


// --- JAVÍTOTT: Okospont szerkesztése (Áthelyezés gomb beszúrásával) ---
window.editSmartpoint = function (id) {
    const sp = myCelestialConf.userData.smartpoints.find(s => s.id === id);
    if (!sp) return;

    // editingSPId = id;
    // Beállítjuk a globális szerkesztési ID-t
    window.CelestialState.editingSPId = id;

    // !!! ITT A KULCS: Frissítjük a listát, hogy a CSS active class rákerüljön a megfelelő elemre
    renderSmartpointsList();

    // UI előkészítése
    document.getElementById('btnAddSmartpoint').style.display = 'none';
    const selector = document.getElementById('sp-type-selector');
    selector.style.display = 'block';

    // Típus kiválasztása
    const typeBtn = document.querySelector(`.sp-type-btn[onclick*="'${sp.type}'"]`);
    if (typeBtn) selectSPType(sp.type, typeBtn);

    // Tartalom betöltése
    if (['audio', 'video', 'image'].includes(sp.type)) {
        // Fájl inputot nem tudunk programból tölteni biztonsági okokból
    } else {
        document.getElementById('sp-input-url').value = sp.content;
    }

    // --- ÚJ: ÁTHELYEZÉS GOMB BESZÚRÁSA A SZERKESZTŐBE ---
    // Megkeressük a mentés gomb környékét, vagy beszúrjuk a tartalom alá
    let moveBtnContainer = document.getElementById('sp-edit-move-container');
    if (!moveBtnContainer) {
        moveBtnContainer = document.createElement('div');
        moveBtnContainer.id = 'sp-edit-move-container';
        moveBtnContainer.style.marginTop = "10px";
        // A tartalom input mező után szúrjuk be
        const contentInput = document.getElementById('sp-content-input');
        contentInput.parentNode.insertBefore(moveBtnContainer, contentInput.nextSibling);
    }

    moveBtnContainer.innerHTML = `
        <button onclick="window.startMoveSpecificSmartpoint(${id})" class="btn-glass btn-glass-secondary" style="width:100%; border-color: #ffeb3b; color: #ffeb3b; font-weight: bold; margin-bottom: 10px;">
            ✥ Okospont Áthelyezése
        </button>
        <div style="text-align:center; font-size:10px; color:#aaa; margin-bottom:5px;">
            Jelenlegi pozíció: X: ${sp.x.toFixed(1)} cm, Y: ${sp.y.toFixed(1)} cm
        </div>
    `;
    moveBtnContainer.style.display = 'block';

    // Görgetés
    selector.scrollIntoView({ behavior: 'smooth' });
}

window.cancelSmartpoint = function () {
    document.getElementById('sp-type-selector').style.display = 'none';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'block';

    document.getElementById('sp-input-url').value = '';
    document.getElementById('sp-input-file').value = '';

    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));

    // Eltüntetjük az extra mozgatás gombot, ha van
    const moveBtnContainer = document.getElementById('sp-edit-move-container');
    if (moveBtnContainer) moveBtnContainer.style.display = 'none';

    window.CelestialState.tempSPType = null;
    window.CelestialState.editingSPId = null; // Töröljük az aktív szerkesztési ID-t

    renderSmartpointsList(); // Újrarajzoljuk a listát (eltűnik a kék keret)
}


// --- 3. JAVÍTOTT: Véglegesítés és Takarítás ---
window.finalizeSmartpointPlacement = function (x, y) {
    // console.log(`[DEBUG] finalizeSmartpointPlacement called. x=${x}, y=${y}`);
    try {
        if (!myCelestialConf.userData.smartpoints) myCelestialConf.userData.smartpoints = [];

        // 1. ÚJ LERAKÁSA
        if (myCelestialConf.userData.uiState.placingSmartpoint) {
            const newSP = myCelestialConf.userData.uiState.placingSmartpoint;
            newSP.x = x;
            newSP.y = y;
            myCelestialConf.userData.smartpoints.push(newSP);

            // Logolás
            // console.log(`[DEBUG] SmartPoint placed:`, newSP);

            if (window.renderSmartpointsList) window.renderSmartpointsList();
            showCustomAlert("Okospont sikeresen elhelyezve!", true);
        }
        // 2. ÁTHELYEZÉS
        else if (myCelestialConf.userData.uiState.movingSmartpointId) {
            const id = myCelestialConf.userData.uiState.movingSmartpointId;
            const sp = myCelestialConf.userData.smartpoints.find(s => s.id === id);

            if (sp) {
                sp.x = x;
                sp.y = y;
                showCustomAlert("Okospont áthelyezve!", true);
            }
            // console.log(`[DEBUG] SmartPoint Moved. ID: ${id}`);
        }

        // Frissítés
        window.refreshMapTransform();

        // --- FIX: UI State Re-synchronization ---
        if (myCelestialConf.userData.uiState.activePhotoId) {
            // console.log(`[DEBUG] Restoring activePhotoId: ${myCelestialConf.userData.uiState.activePhotoId}`);
            window.highlightPhoto(myCelestialConf.userData.uiState.activePhotoId);
        } else if (myCelestialConf.userData.uiState.selectedElementId) {
            // console.log(`[DEBUG] Restoring selectedElementId: ${myCelestialConf.userData.uiState.selectedElementId}`);
            if (window.handleElementSelection) window.handleElementSelection(myCelestialConf.userData.uiState.selectedElementId);
        }

        // --- EXTRA SAFETY: Force layout update (simulating tab switch effect) ---
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            if (window.updateCanvasSize) window.updateCanvasSize();
        }, 100);

    } catch (err) {
        console.error("ERROR in finalizeSmartpointPlacement:", err);
    } finally {
        // MINDENKÉPPEN RESETELJÜK AZ ÁLLAPOTOT
        if (myCelestialConf && myCelestialConf.userData && myCelestialConf.userData.uiState) {
            myCelestialConf.userData.uiState.placingSmartpoint = null;
            myCelestialConf.userData.uiState.movingSmartpointId = null;
            myCelestialConf.userData.uiState.isMovingSmartpoints = false;
        }
        const dessvg = document.getElementById('designer-svg');
        if (dessvg) dessvg.style.cursor = "default";
    }
}

// Ezt ellenőrizd vagy írd be a fájl végére:
const svgEl = document.getElementById('designer-svg');
if (svgEl) {
    svgEl.onclick = window.handleCanvasClick;
}
window.deleteSmartpoint = function (id) {
    if (confirm("Biztosan törlöd ezt az Okospontot?")) {
        myCelestialConf.userData.smartpoints = myCelestialConf.userData.smartpoints.filter(sp => sp.id !== id);
        renderSmartpointsList();
        window.refreshMapTransform();
    }
}

// --- MEGJELENÍTÉS ÉS ÁTHELYEZÉS VEZÉRLÉS ---

window.toggleSmartpointsVisibility = function () {
    const currentState = myCelestialConf.userData.uiState.showSmartpoints;
    myCelestialConf.userData.uiState.showSmartpoints = !currentState;

    const btn = document.getElementById('btnToggleSmartpoints');
    if (myCelestialConf.userData.uiState.showSmartpoints) {
        btn.innerText = "👁️ Elrejtés";
        btn.style.opacity = "1";
    } else {
        btn.innerText = "👁️ Megjelenítés";
        btn.style.opacity = "0.6";
    }
    window.refreshMapTransform();
}

window.toggleSmartpointsMoveMode = function () {
    const isMoving = myCelestialConf.userData.uiState.isMovingSmartpoints;
    myCelestialConf.userData.uiState.isMovingSmartpoints = !isMoving;

    // const btn = document.getElementById('btnMoveSmartpoints');

    if (myCelestialConf.userData.uiState.isMovingSmartpoints) {
        // Bekapcsolás
        // btn.style.background = "#ffeb3b";
        // btn.style.color = "#000";
        // btn.innerText = "Válassz pontot...";

        // Ha nincsenek látható pontok, kapcsoljuk be őket
        if (!myCelestialConf.userData.uiState.showSmartpoints) {
            toggleSmartpointsVisibility();
        }

        showCustomAlert("Kattints egy Okospontra a vásznon, amit át szeretnél helyezni!");
    } else {
        // Kikapcsolás
        // btn.style.background = "";
        // btn.style.color = "";
        // btn.innerText = "✥ Áthelyezés";
        myCelestialConf.userData.uiState.movingSmartpointId = null;
        window.refreshMapTransform(); // Színek visszaállítása
    }
}


// ============================================================
// --- 3. JAVÍTOTT: Mozgatás Indítása / Toggle (Kikapcsolás) ---
// ============================================================
window.startMoveSpecificSmartpoint = function (id) {
    if (!myCelestialConf.userData) initUserData();
    var dessvg = document.getElementById('designer-svg');
    dessvg.style.cursor = "pointer";
    // 1. TOGGLE LOGIKA: Ha már ezt mozgatjuk, akkor kapcsoljuk KI.
    if (myCelestialConf.userData.uiState.movingSmartpointId === id) {
        // console.log("🛑 Mozgatás megszakítása (Toggle OFF)");

        // Resetelünk mindent
        myCelestialConf.userData.uiState.movingSmartpointId = null;
        myCelestialConf.userData.uiState.isMovingSmartpoints = false;

        // // Gomb stílus visszaállítása (ha van ilyen gomb)
        // const globalBtn = document.getElementById('btnMoveSmartpoints');
        // if (globalBtn) {
        //     globalBtn.style.background = "";
        //     globalBtn.style.color = "";
        //     globalBtn.innerText = "✥ Áthelyezés";
        // }

        showCustomAlert("Mozgatás befejezve.");
        window.refreshMapTransform(); // Újrarajzolás (színek visszaállnak)
        return;
    }

    // 2. MOZGATÁS INDÍTÁSA
    // console.log(`🚀 Mozgatás indítása: SP ID ${id}`);
    myCelestialConf.userData.uiState.movingSmartpointId = id;
    myCelestialConf.userData.uiState.isMovingSmartpoints = true;

    // // Globális gomb jelzése (opcionális, de jó visszajelzés)
    // const globalBtn = document.getElementById('btnMoveSmartpoints');
    // if (globalBtn) {
    //     globalBtn.style.background = "#ffeb3b";
    //     globalBtn.style.color = "#000";
    //     globalBtn.innerText = "Lerakás...";
    // }

    showCustomAlert("Kattints a vásznon (bárhova) az ÚJ helyre!", true);

    // Görgessünk a vászonhoz, hogy kényelmes legyen
    const canvas = document.getElementById('designer-canvas-area');
    if (canvas) canvas.scrollIntoView({ behavior: 'smooth' });

    // Frissítés (hogy sárga legyen a pont)
    window.refreshMapTransform();
}
// Régi eseménykezelő felülírása/biztosítása
const ensureSvgListener = () => {
    const designerSVG = document.getElementById('designer-svg');
    if (designerSVG) {
        // Közvetlen onclick tulajdonságként állítjuk be, 
        // hogy biztosan ez fusson le (és felülírja a régieket)
        designerSVG.onclick = window.handleCanvasClick;
    }
};
// --- EGYEDI ALERT DOBOZ ---
window.showCustomAlert = function (text, isSuccess = false) {
    const alertBox = document.getElementById('custom-sp-alert');
    const alertText = document.getElementById('sp-alert-text');

    alertText.innerText = text;

    if (isSuccess) {
        alertBox.style.borderColor = "#4caf50";
        alertBox.style.boxShadow = "0 5px 20px rgba(76, 175, 80, 0.3)";
    } else {
        alertBox.style.borderColor = "var(--accent-blue)";
        alertBox.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    }

    $(alertBox).fadeIn(200);

    // Automatikus eltűnés 3 másodperc után, ha sikerüzenet
    if (isSuccess) {
        setTimeout(() => {
            $(alertBox).fadeOut(500);
        }, 3000);
    }
}


// --- JAVÍTOTT: Okospont lista (Valós tartalommal + Aktív jelöléssel) ---
window.renderSmartpointsList = function () {
    const list = document.getElementById('smartpoints-list');
    if (!list) return;

    // Adatbázis inicializálása ha kell
    if (!myCelestialConf.userData) initUserData();
    if (!myCelestialConf.userData.smartpoints) myCelestialConf.userData.smartpoints = [];

    const points = myCelestialConf.userData.smartpoints;

    // Gombok elrejtése/megjelenítése
    const btnToggle = document.getElementById('btnToggleSmartpoints');
    const displayStyle = (points.length > 0) ? "" : "none";
    if (btnToggle) btnToggle.style.display = displayStyle;

    if (points.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #888; font-style: italic; padding: 10px;">Még nincs okospont.</div>';
        return;
    }

    list.innerHTML = '';
    points.forEach((sp, idx) => {
        // Ikon kiválasztása
        let iconHtml = '';
        if (sp.type === 'youtube') iconHtml = '<i class="fab fa-youtube" style="color: red; font-size: 16px;"></i>';
        else if (sp.type === 'spotify') iconHtml = '<i class="fab fa-spotify" style="color: #1DB954; font-size: 16px;"></i>';
        else {
            const icons = { 'audio': '🎵', 'video': '🎥', 'image': '🖼️', 'url': '🔗' };
            iconHtml = icons[sp.type] || '📍';
        }

        // Megjelenítendő szöveg (JAVÍTOTT: Nem írjuk át "Link"-re!)
        let displayText = sp.content;
        if (!displayText) displayText = "Nincs tartalom";

        // Hosszú szöveg vágása (hogy kiférjen)
        if (displayText.length > 35) displayText = displayText.substring(0, 32) + "...";

        // AKTÍV STÁTUSZ VIZSGÁLATA
        // Ha ezt az ID-t szerkesztjük éppen (globális editingSPId változó)
        const isEditing = (window.CelestialState.editingSPId === sp.id);

        // Stílusok összeállítása
        let bgStyle = isEditing ? "rgba(74, 158, 255, 0.15)" : "rgba(255,255,255,0.05)";
        let borderStyle = isEditing ? "1px solid var(--accent-blue)" : "1px solid #444";
        let titleColor = isEditing ? "var(--accent-blue)" : "#ddd";

        const div = document.createElement('div');
        div.className = 'sp-list-item';
        // Ha aktív, akkor görgessünk majd ide
        if (isEditing) div.id = 'active-editing-sp-item';

        div.style.cssText = `display: flex; align-items: center; justify-content: space-between; padding: 8px; background: ${bgStyle}; margin-bottom: 5px; border-radius: 4px; border: ${borderStyle}; transition: all 0.2s;`;

        div.innerHTML = `
            <div style="display:flex; align-items:center; overflow:hidden; flex-grow: 1;">
                <div style="width: 24px; text-align:center; margin-right: 8px;">${iconHtml}</div>
                <div style="overflow:hidden;">
                    <div style="font-weight:bold; font-size:12px; color:${titleColor};">Okospont ${idx + 1} ${isEditing ? '(Szerkesztés...)' : ''}</div>
                    <div style="font-size:11px; color:#aaa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${sp.content}">${displayText}</div>
                </div>
            </div>
            <div class="sp-actions" style="display:flex; gap:5px;">
                <button class="add-btn secondary" style="padding:5px 8px; font-size:12px;" onclick="window.startMoveSpecificSmartpoint(${sp.id})" title="Áthelyezés a vásznon">
                    ✥
                </button>
                
                <button class="add-btn secondary" style="padding:5px 8px; font-size:12px; ${isEditing ? 'background:var(--accent-blue); color:white;' : ''}" onclick="window.editSmartpoint(${sp.id})" title="Szerkesztés">
                    ✎
                </button>
                
                <button class="add-btn" style="padding:5px 8px; background:#ff4444; font-size:12px;" onclick="window.deleteSmartpoint(${sp.id})" title="Törlés">
                    🗑
                </button>
            </div>
        `;
        list.appendChild(div);
    });

    // Ha van aktív elem, görgessünk oda a listában (hogy látható legyen)
    const activeItem = document.getElementById('active-editing-sp-item');
    if (activeItem) {
        setTimeout(() => {
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// --- JAVÍTOTT: Fotó/Hold hozzáadása (Vászon növeléssel) ---
window.addNewElement = function (type, dataURL, side, fileName) {
    if (!myCelestialConf.userData) initUserData();
    const newId = Date.now();

    let defaultBorderColor = '#ffffff';
    let defaultBorderWidth = 2;
    let defaultBorderEnabled = true;
    const defaultWidthCM = 20;

    if (typeof window.myCelestialConf !== 'undefined') {
        const mapEl = myCelestialConf.userData.elements.find(e => e.type === 'map');
        if (mapEl) {
            defaultBorderColor = mapEl.borderColor || '#ffffff';
            defaultBorderWidth = mapEl.borderWidth || 2;
            defaultBorderEnabled = mapEl.borderEnabled;
        } else if (window.myCelestialConf.background) {
            defaultBorderColor = window.myCelestialConf.background.stroke || '#ffffff';
        }
    }

    const newEl = {
        id: newId, type: 'photo', subType: type, dataURL: dataURL,
        fileName: fileName || `element_${newId}.png`,
        align: 'center', scale: 1.0, rotation: 0,
        widthCM: defaultWidthCM,
        borderWidth: defaultBorderWidth, borderEnabled: defaultBorderEnabled, borderColor: defaultBorderColor,
        borderBlur: 0, borderDistance: 0, edgeBlur: 0, mask: 'none', maskScale: 1.0,
        calculated: { x: 0, y: 0, widthPx: 0, heightPx: 0 }
    };

    if (side === 'start' || side === 'left' || side === 'top') {
        myCelestialConf.userData.elements.unshift(newEl);
    } else {
        myCelestialConf.userData.elements.push(newEl);
    }

    myCelestialConf.userData.zones[`photo_${newId}`] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };

    // 1. VÁSZON MÉRETÉNEK FRISSÍTÉSE
    if (window.updateCanvasSize) window.updateCanvasSize();

    updateElementSelectorUI();
    highlightPhoto(newId, null);

    if (window.refreshMapTransform) window.refreshMapTransform();
}
window.addCurrentItem = function (side) {
    if (!myCelestialConf.userData) initUserData();
    const mode = myCelestialConf.userData.uiState.activeAddMode || 'photo';

    if (mode === 'photo') {
        window.CelestialState.tempInsertSide = side;
        const uploadInput = document.getElementById('photo-upload');
        if (uploadInput) uploadInput.click();
    } else if (mode === 'moon') {
        addMoonElement(side);
    } else if (mode === 'map') {
        addMapElement(side);
    }
}



window.toggleAddPanel = function (mode) {
    if (!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.uiState.activeAddMode = mode;
    document.querySelectorAll('.add-btn').forEach(b => b.classList.remove('primary'));

    // Panel láthatóságok
    const pMoon = document.getElementById('panel-moon-gen');
    const pPhoto = document.getElementById('panel-photo-upload');

    if (pMoon) pMoon.style.display = (mode === 'moon') ? 'block' : 'none';
    if (pPhoto) pPhoto.style.display = (mode === 'photo') ? 'block' : 'none';

    if (mode === 'moon') {
        // --- PANEL ÚJRAÉPÍTÉSE A KÉRT SORRENDBEN ---
        pMoon.innerHTML = `
            <div class="section" style="margin-bottom: 16px;">
                
                <div style="font-size:11px; line-height:1.4; color:#ccc; margin-bottom:10px; padding-bottom:5px; border-bottom:1px solid #444;">
                    <div id="moon-data-phase" style="font-weight:bold; color:var(--accent-blue); margin-bottom:5px; font-size:14px; text-transform:uppercase;">-</div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                        <span>Megvilágítottság:</span> <span id="moon-data-illum" style="color:white; font-weight:bold;">-</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                        <span>Hold kora:</span> <span id="moon-data-age" style="color:white;">-</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                        <span>Csillagjegy:</span> <span id="moon-data-zodiac" style="color:white;">-</span>
                    </div>
                    <div style="margin-top:5px; font-size:10px; color:#888;">
                        <div>Következő Újhold: <span id="moon-data-nextnew">-</span></div>
                        <div>Következő Telihold: <span id="moon-data-nextfull">-</span></div>
                    </div>
                </div>

                <div class="setting-group" style="margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" id="moon-text-check" checked>
                    <label for="moon-text-check" style="margin: 0; cursor: pointer;">Szöveg megjelenítése a kép alatt</label>
                </div>

                <div style="text-align:center; margin-bottom:15px;">
                    <img id="moon-preview-img" src="" style="width:120px; height:120px; border-radius:50%; display:inline-block; box-shadow: 0 0 15px rgba(255,255,255,0.1);">
                </div>

                <div class="setting-group">
                    <label>Dátum:</label>
                    <input type="date" id="moon-date" class="input-glass" onchange="updateMoonPreview()" style="width:100%;">
                </div>
                <div class="setting-group">
                    <label>Idő (UTC):</label>
                    <input type="time" id="moon-time" class="input-glass" value="12:00" onchange="updateMoonPreview()" style="width:100%;">
                </div>

                <div class="setting-group" style="margin-top: 10px; border-top: 1px solid #444; padding-top: 10px;">
                    <label>Helyszín (Forgatáshoz):</label>
                    <input type="text" id="add-moon-city-search" class="input-glass" placeholder="Város keresése..." style="width:100%;">
                </div>

                <div id="add-moon-controls-placeholder"></div>
            </div>
        `;

        // Árnyék gombok berenderelése
        renderMoonControls('add-moon-controls-placeholder', 'add');

        // Eseménykezelők a gombokhoz (Timeout kell, hogy a DOM felépüljön)
        setTimeout(() => {
            const btnB = document.getElementById('add-btn-shadow-black');
            const btnT = document.getElementById('add-btn-shadow-trans');
            if (btnB && btnT) {
                btnB.onclick = () => { window.CelestialState.moonShadowColor = 'black'; updateAddPanelUI(); updateMoonPreview(); };
                btnT.onclick = () => { window.CelestialState.moonShadowColor = 'transparent'; updateAddPanelUI(); updateMoonPreview(); };
            }
            updateAddPanelUI();

            // Autocomplete inicializálása
            initSpecificMoonAutocomplete('add-moon-city-search', 'add');
        }, 50);

        // Dátum init
        const dateInput = document.getElementById('moon-date');
        if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();
        initMoonPreview();
    }

    // Fő mód gombok színezése
    const bPhoto = document.getElementById('btn-mode-photo');
    const bMoon = document.getElementById('btn-mode-moon');
    const bMap = document.getElementById('btn-mode-map');

    if (bPhoto) bPhoto.className = (mode === 'photo') ? 'add-btn primary' : 'add-btn secondary';
    if (bMoon) bMoon.className = (mode === 'moon') ? 'add-btn primary' : 'add-btn secondary';
    if (bMap) bMap.className = (mode === 'map') ? 'add-btn primary' : 'add-btn secondary';
}

function updateAddPanelUI() {
    // Képforrás gombok
    const isNasa = (window.CelestialState.moonSource === 'nasa');
    const btnNasa = document.getElementById('add-btn-src-nasa');
    const btnOrig = document.getElementById('add-btn-src-original');
    if (btnNasa && btnOrig) {
        btnNasa.className = isNasa ? 'add-btn primary' : 'add-btn secondary';
        btnOrig.className = !isNasa ? 'add-btn primary' : 'add-btn secondary';
    }

    // Árnyék gombok
    const isBlack = (window.CelestialState.moonShadowColor === 'black');
    const btnB = document.getElementById('add-btn-shadow-black');
    const btnT = document.getElementById('add-btn-shadow-trans');
    if (btnB && btnT) {
        btnB.className = isBlack ? 'add-btn primary' : 'add-btn secondary';
        btnT.className = !isBlack ? 'add-btn primary' : 'add-btn secondary';
    }
    const padInp = document.getElementById('add-moon-padding');
    if (padInp) padInp.value = window.CelestialState.moonPadding;
}

// --- 3. MÓDOSÍTÁS: Kijelöléskor adatok betöltése ---
window.highlightPhoto = function (id, element) {
    console.log("window.highlightPhoto = function (id, element) {");
    console.log("window.highlightPhoto = function (id, element) {");
    console.log('$("#moon-header").length', $("#moon-header").length);
    if (!myCelestialConf.userData) initUserData();

    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el) return;

    // UI State
    myCelestialConf.userData.uiState.selectedElementId = id;
    myCelestialConf.userData.uiState.activePhotoId = id;

    // UI MEGJELENÍTÉS
    document.getElementById('settings-group-map').style.display = 'none';
    document.getElementById('settings-group-photo').style.display = 'block';

    const btnDel = document.getElementById('btn-delete-element-container');
    if (btnDel) btnDel.style.display = 'block';

    updateCommonControls(el);

    // Cím és Méret
    const titleEl = document.getElementById('photo-size-title');
    if (titleEl) titleEl.innerText = (el.subType === 'moon') ? 'HOLD MÉRETE' : 'KÉP MÉRETE';

    const wInput = document.getElementById('photo-width-cm-input');
    if (wInput) wInput.value = el.widthCM || 20;

    // Hold panel kezelés
    const mep = document.getElementById('moon-edit-panel');
    if (el.subType === 'moon') {
        if (mep) {
            mep.style.display = 'block';
            // --- ÚJ: COLLAPSIBLE SZERKEZET ---
            var collHeader = `
                <div id="moon-header" class="collapsible-header" data-target="moon-settings-content" style="margin-bottom:0;">
                    <h2 style="margin:0; font-size:14px; ">🌔 HOLD BEÁLLÍTÁSOK</h2>
                    <span class="collapsible-icon"><i class="collapsible-icon-icon">▼</i></span>
                </div>`;

            console.log("asddddddddddddddddddddd");
            console.log('$("#moon-header").length', $("#moon-header").length);
            $("#moon-header").length ? $(collHeader) : $(collHeader).insertBefore("#moon-edit-panel");
            // mep.innerHTML = `
            var collCont = `

                
                <div class="collapsible-content" id="moon-settings-content" style="padding:10px;">
                    
                    <div class="setting-group">
                        <label>Dátum:</label>
                        <input type="date" id="moon-edit-date" class="input-glass" style="width:100%;">
                    </div>
                    <div class="setting-group">
                        <label>Idő (UTC):</label>
                        <input type="time" id="moon-edit-time" class="input-glass" style="width:100%;">
                    </div>

                    <div class="setting-group" style="margin-top:10px; padding-top:10px; border-top:1px solid #444;">
                        <label>Helyszín (Forgatáshoz):</label>
                        <input type="text" id="moon-city-search" class="input-glass" placeholder="Város keresése..." style="margin-bottom:5px; width:100%;">
                        
                        <div class="grid-2-cols">
                            <div>
                                <label style="font-size:10px; color:#aaa;">Szélességi fok:</label>
                                <input type="number" id="moon-edit-lat" class="input-glass" step="0.0001">
                            </div>
                            <div>
                                <label style="font-size:10px; color:#aaa;">Hosszúsági fok:</label>
                                <input type="number" id="moon-edit-lon" class="input-glass" step="0.0001">
                            </div>
                        </div>
                    </div>
                    
                    <div id="edit-controls-placeholder"></div>
                </div>
            `;
            !$("#moon-header").length ? $(collCont) : $(collCont).insertBefore("#moon-edit-panel");
            $("#moon-edit-panel").remove();
            let dateVal = el.moonDate || new Date().toISOString().split('T')[0];
            let timeVal = el.moonTime || "12:00";
            let latVal = (el.moonLat !== undefined) ? el.moonLat : 47.4979;
            let lonVal = (el.moonLng !== undefined) ? el.moonLng : 19.0402;
            let cityVal = el.moonLocationName || "";
            // ÚJ ADATOK BETÖLTÉSE
            let shadowVal = el.moonShadowMode || 'black';

            // Rendereljük a gombokat a BELSŐ placeholderbe
            renderMoonControls('edit-controls-placeholder', 'edit');

            const dateInp = document.getElementById('moon-edit-date');
            if (dateInp) {
                dateInp.value = dateVal;
                dateInp.onchange = () => updateActiveMoonSettings(null);
            }
            const timeInp = document.getElementById('moon-edit-time');
            if (timeInp) {
                timeInp.value = timeVal;
                timeInp.onchange = () => updateActiveMoonSettings(null);
            }
            const latInp = document.getElementById('moon-edit-lat');
            if (latInp) {
                latInp.value = latVal;
                latInp.onchange = () => updateActiveMoonSettings(null);
            }
            const lonInp = document.getElementById('moon-edit-lon');
            if (lonInp) {
                lonInp.value = lonVal;
                lonInp.onchange = () => updateActiveMoonSettings(null);
            }
            const cityInp = document.getElementById('moon-city-search');
            if (cityInp) cityInp.value = cityVal;

            // Gombok állapota
            const btnB = document.getElementById('edit-btn-shadow-black');
            const btnT = document.getElementById('edit-btn-shadow-trans');

            if (btnB && btnT) {
                btnB.className = (shadowVal === 'black') ? 'add-btn primary' : 'add-btn secondary';
                btnT.className = (shadowVal === 'transparent') ? 'add-btn primary' : 'add-btn secondary';

                btnB.onclick = () => { el.moonShadowMode = 'black'; updateActiveMoonSettings(null); };
                btnT.onclick = () => { el.moonShadowMode = 'transparent'; updateActiveMoonSettings(null); };
            }

            // Autocomplete init (Késleltetve)
            setTimeout(() => {
                initSpecificMoonAutocomplete('moon-city-search', 'edit');
            }, 50);


        }
    } else {
        if (mep) mep.style.display = 'none';
    }

    switchTextContext(`photo_${id}`);
    updateElementSelectorUI();
}

window.initSpecificMoonAutocomplete = function (inputId, mode) {
    const input = document.getElementById(inputId);

    // Ha nincs input, vagy már van rajta 'pac-target-input' osztály (a Google teszi rá), akkor kilépünk
    if (!input || input.classList.contains('pac-target-input')) return;

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        // Opciók: csak városok
        const options = { types: ['(cities)'], fields: ['geometry', 'name'] };
        const autocomplete = new google.maps.places.Autocomplete(input, options);

        // Listener
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) return;

            const lat = place.geometry.location.lat();
            const lon = place.geometry.location.lng();
            const cityName = place.name;

            console.log(`Hold Helyszín (${mode}):`, cityName, lat, lon);

            if (mode === 'edit') {
                // --- SZERKESZTÉS MÓD ---
                const latInp = document.getElementById('moon-edit-lat');
                const lonInp = document.getElementById('moon-edit-lon');
                if (latInp) latInp.value = lat.toFixed(4);
                if (lonInp) lonInp.value = lon.toFixed(4);

                // Beírjuk a mezőbe is, ha nem írta volna be a Google
                input.value = cityName;

                // Frissítés
                updateActiveMoonSettings(cityName);

            } else if (mode === 'add') {
                // --- HOZZÁADÁS MÓD ---
                window.tempMoonLat = lat;
                window.tempMoonLng = lon;
                window.tempMoonCity = cityName;

                // Frissítés
                updateMoonPreview();
            }
        });

        // Enter tiltása
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    }
}

// Fotó szélesség beállítása (Kifutó ellenőrzéssel)
window.setPhotoWidth = function (val) {
    if (!myCelestialConf.userData) initUserData();
    const id = myCelestialConf.userData.uiState.activePhotoId;
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el) return;

    const inputEl = document.getElementById('photo-width-cm-input');
    if (!val && inputEl) val = parseFloat(inputEl.value);

    // Kifutó ellenőrzés
    console.log(`[DEBUG] setPhotoWidth called with val: ${val}, activePhotoId: ${id}`);

    // --- FALLBACK FIX: Ha nincs aktív ID, de van fotó, használjuk az elsőt ---
    if (!id) {
        const firstPhoto = myCelestialConf.userData.elements.find(e => e.type !== 'map' && (e.subType === 'photo' || e.subType === 'moon'));
        if (firstPhoto) {
            console.warn(`[DEBUG] setPhotoWidth: No activePhotoId! Falling back to first photo: ${firstPhoto.id}`);
            myCelestialConf.userData.uiState.activePhotoId = firstPhoto.id;
            // Rekurzívan hívjuk újra
            window.setPhotoWidth(val);
            return;
        }
    }

    const allowOverflow = document.getElementById('allow-photo-overflow') ? document.getElementById('allow-photo-overflow').checked : false;

    if (!allowOverflow) {
        const canvasW = myCelestialConf.userData.canvas.width || 21;
        const canvasH = myCelestialConf.userData.canvas.height || 30;
        const maxAllowed = Math.max(canvasW, canvasH); // Megengedőbb

        if (val > maxAllowed) {
            val = maxAllowed;
            if (inputEl) inputEl.value = val;
        }
    }

    el.widthCM = parseFloat(val) || 20;
    window.refreshMapTransform();
}

window.fitPhotoToCanvas = function () {
    if (!myCelestialConf.userData) initUserData();
    const canvasWidthInput = document.getElementById('canvas-width');
    const canvasHeightInput = document.getElementById('canvas-height');

    if (canvasWidthInput && canvasHeightInput) {
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1);

        const photoInput = document.getElementById('photo-width-cm-input');
        if (photoInput) photoInput.value = maxWidth;

        window.setPhotoWidth(maxWidth);
    }
}


// --- JAVÍTOTT: Térkép betöltése (Nem ugrik vissza az elsőre) ---
window.loadMapToEditor = function (id) {
    if (!myCelestialConf.userData) initUserData();

    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el || el.type !== 'map') return;

    // Kijelölés mentése
    myCelestialConf.userData.uiState.selectedElementId = id;
    myCelestialConf.userData.uiState.activePhotoId = null;

    // Konfiguráció betöltése (Celestial API)
    if (el.celestialConfig) {
        const savedUserData = myCelestialConf.userData;
        myCelestialConf = JSON.parse(JSON.stringify(el.celestialConfig));
        myCelestialConf.userData = savedUserData;

        if (typeof Celestial !== 'undefined') {
            Celestial.apply(myCelestialConf);
            if (myCelestialConf.Ido) Celestial.date(new Date(myCelestialConf.Ido));
            if (myCelestialConf.geopos) Celestial.location(myCelestialConf.geopos);
            Celestial.redraw();
        }

        if (typeof window.updateGUIFromConfig === 'function') window.updateGUIFromConfig(myCelestialConf);
        // --- ÚJ: KIEMELÉSEK VISSZAÁLLÍTÁSA ---
        // Ha van mentett kiemelés ehhez a térképhez, töltsük be
        if (el.highlights) {
            Celestial.highlightList = JSON.parse(JSON.stringify(el.highlights));
        } else {
            // Ha nincs, akkor ÜRÍTSÜK KI a globális listát (hogy ne maradjon ott az előző térképé!)
            Celestial.highlightList = {};
        }

        // Frissítjük a nézetet és a UI listát
        Celestial.redraw();
        if (typeof renderActiveHighlights === 'function') renderActiveHighlights();
        // -------------------------------------
    }

    // HTML Inputok frissítése (Dátum, Helyszín, stb. a panelen)
    // Ez a függvény a legutóbbi kérésedre készült, itt hívjuk meg:
    if (window.loadMapSettingsToUI) window.loadMapSettingsToUI(id);

    // UI Frissítés
    document.getElementById('settings-group-map').style.display = 'block';
    document.getElementById('settings-group-photo').style.display = 'none';

    const btnDel = document.getElementById('btn-delete-element-container');
    if (btnDel) btnDel.style.display = (myCelestialConf.userData.elements.length > 1) ? 'block' : 'none';

    updateCommonControls(el);

    const wInput = document.getElementById('map-width-cm-input');
    if (wInput) wInput.value = el.widthCM || 20;

    // --- A JAVÍTÁS LÉNYEGE ITT VAN ---
    // Régen: if (id === 'main-map') switchTextContext('map'); -> EZ OKOZTA A HIBÁT
    // Most: Mindig a pontos 'map_ID'-t használjuk!

    // Zóna inicializálása, ha nincs
    if (!myCelestialConf.userData.zones[`map_${id}`]) {
        myCelestialConf.userData.zones[`map_${id}`] = { top: { blocks: [] }, bottom: { blocks: [] } };
    }

    // Váltás a pontos ID-ra
    switchTextContext(`map_${id}`);

    // Lista frissítése
    updateElementSelectorUI();
}
// Térkép szélesség
window.setMapWidth = function (val) {
    if (!myCelestialConf.userData) initUserData();

    const id = myCelestialConf.userData.uiState.selectedElementId;
    const mapEl = myCelestialConf.userData.elements.find(e => e.id == id && e.type === 'map');
    if (!mapEl) return;

    const inputEl = document.getElementById('map-width-cm-input');
    if (!val && inputEl) val = parseFloat(inputEl.value);

    const allowOverflow = document.getElementById('allow-map-overflow') ? document.getElementById('allow-map-overflow').checked : false;
    if (!allowOverflow) {
        const canvasW = myCelestialConf.userData.canvas.width || 21;
        const canvasH = myCelestialConf.userData.canvas.height || 30;
        const maxAllowed = Math.min(canvasW, canvasH);

        if (val > maxAllowed) {
            val = maxAllowed;
            if (inputEl) inputEl.value = val;
        }
    }

    mapEl.widthCM = parseFloat(val);
    window.refreshMapTransform();
}

window.fitMapToCanvas = function () {
    if (!myCelestialConf.userData) initUserData();
    const canvasWidthInput = document.getElementById('canvas-width');
    const canvasHeightInput = document.getElementById('canvas-height');

    if (canvasWidthInput && canvasHeightInput) {
        // let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1);
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value), parseFloat(canvasHeightInput.value));
        const mapInput = document.getElementById('map-width-cm-input');
        if (mapInput) mapInput.value = maxWidth;
        window.setMapWidth(maxWidth);
    }
}

// Közös vezérlők
function updateCommonControls(el) {
    ['top', 'center', 'bottom'].forEach(type => {
        const btn = document.getElementById(`btn-align-${type}`);
        if (btn) {
            // btn.style.border = (type === el.align) ? "1px solid #4a9eff" : "1px solid #555";
            // btn.style.backgroundColor = (type === el.align) ? "#333" : "";
            (type === el.align) ? $("#btn-align-" + type).addClass("active") : $("#btn-align-" + type).removeClass("active");
            // $(ez).toggleClass("active");
            // $(ez).siblings('.toggleCulture').toggleClass("active");
        }
    });

    const topCont = document.getElementById('element-margin-top-container');
    const bottomCont = document.getElementById('element-margin-bottom-container');
    if (topCont) {
        topCont.style.display = (el.align === 'top') ? 'block' : 'none';
        document.getElementById('element-margin-top').value = el.marginTop || 0;
    }
    if (bottomCont) {
        bottomCont.style.display = (el.align === 'bottom') ? 'block' : 'none';
        document.getElementById('element-margin-bottom').value = el.marginBottom || 0;
    }

    // Feliratok
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const l1 = document.getElementById('lbl-element-margin-top');
    const l2 = document.getElementById('lbl-element-margin-bottom');
    if (l1 && l2) {
        if (layoutDir === 'row') {
            l1.innerText = "Bal Margó (cm):";
            l2.innerText = "Jobb Margó (cm):";
        } else {
            l1.innerText = "Felső Margó (cm):";
            l2.innerText = "Alsó Margó (cm):";
        }
    }

    updatePhotoMaskUI(el.mask || 'none', 'c-mask-btn');
    const slider = document.getElementById('common-mask-scale-slider');
    if (slider) {
        slider.value = (el.maskScale || 1.0) * 100;
        document.getElementById('common-mask-scale-container').style.display = (el.mask === 'none') ? 'none' : 'block';
    }

    document.getElementById('common-border-check').checked = el.borderEnabled;
    document.getElementById('common-border-color').value = el.borderColor || '#ffffff';
    document.getElementById('common-border-settings-wrapper').style.display = el.borderEnabled ? 'block' : 'none';

    document.getElementById('common-border-input').value = el.borderWidth || 0;
    document.getElementById('common-border-disp').innerText = (el.borderWidth || 0) + 'px';
    document.getElementById('common-border-offset-input').value = el.borderDistance || 0;
    document.getElementById('common-border-offset-disp').innerText = (el.borderDistance || 0);
    document.getElementById('common-border-blur-input').value = el.borderBlur || 0;
    document.getElementById('common-border-blur-disp').innerText = (el.borderBlur || 0) + 'px';

    document.getElementById('common-edge-blur-input').value = el.edgeBlur || 0;
    document.getElementById('common-edge-blur-disp').innerText = (el.edgeBlur || 0) + 'px';
}

// UI Handlerek
window.setElementAlign = function (align) {
    console.log("window.setElementAlign = function(align) {");
    console.log("window.setElementAlign = function(align) { align", align);
    const id = myCelestialConf.userData.uiState.selectedElementId;
    console.log("window.setElementAlign = function(align) { id", id);
    if (!id) return;
    console.log("window.setElementAlign = function(align) {");
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (el) {
        el.align = align;
        window.refreshMapTransform();
        window.renderFixedTexts();
        updateCommonControls(el);
    }
}

window.updateElementMargin = function (side, val) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (el) {
        if (side === 'top') el.marginTop = parseFloat(val) || 0;
        if (side === 'bottom') el.marginBottom = parseFloat(val) || 0;
        window.refreshMapTransform();
        window.renderFixedTexts();
    }
}

window.setCommonMask = function (type) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (el) {
        el.mask = type;
        updateCommonControls(el);
        window.refreshMapTransform();
    }
}

window.updateCommonMaskScale = function (val) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (el) {
        el.maskScale = parseInt(val) / 100;
        window.refreshMapTransform();
    }
}

window.updateCommonBorderProp = function (prop, value) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (el) {
        if (prop === 'width') { el.borderWidth = parseInt(value); document.getElementById('common-border-disp').innerText = value + 'px'; }
        else if (prop === 'color') el.borderColor = value;
        else if (prop === 'enabled') { el.borderEnabled = value; document.getElementById('common-border-settings-wrapper').style.display = value ? 'block' : 'none'; }
        else if (prop === 'blur') { el.borderBlur = parseInt(value); document.getElementById('common-border-blur-disp').innerText = value + 'px'; }
        else if (prop === 'offset') { el.borderDistance = parseInt(value); document.getElementById('common-border-offset-disp').innerText = value; }
        else if (prop === 'edgeBlur') { el.edgeBlur = parseInt(value); document.getElementById('common-edge-blur-disp').innerText = value + 'px'; }

        window.refreshMapTransform();
    }
}

window.deleteActiveElement = function () {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if (!id) return;
    if (confirm("Biztosan törölni szeretnéd ezt az elemet?")) {
        myCelestialConf.userData.elements = myCelestialConf.userData.elements.filter(el => el.id != id);
        if (myCelestialConf.userData.elements.length > 0) {
            handleElementSelection(myCelestialConf.userData.elements[0].id);
        }
        window.updateCanvasSize();
        updateElementSelectorUI();
    }
}

// --- 1. MINDEN VÁLASZTÓ FRISSÍTÉSE (Biztosan megjelenik a Szöveg választó is) ---
window.updateElementSelectorUI = function () {
    if (!myCelestialConf.userData) initUserData();

    const uiState = myCelestialConf.userData.uiState;
    const currentCtx = uiState.currentTextContext;
    const allElements = myCelestialConf.userData.elements || [];

    // --- 0. BIZTONSÁGI LÉPÉS: Konténer pótlása, ha hiányzik ---
    let textContainer = document.getElementById('photo-text-selector-container');

    if (!textContainer) {
        // Megkeressük a jobb oldali panel vezérlő konténerét
        const parent = document.querySelector('#fragment_r-3 .designer-controls');

        if (parent) {
            console.log("⚠️ A #photo-text-selector-container hiányzott, újra létrehozom...");
            textContainer = document.createElement('div');
            textContainer.id = 'photo-text-selector-container';
            // Stílus beállítása
            textContainer.style.cssText = "margin-bottom: 15px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border-left: 4px solid var(--accent-purple); display: block;";

            // Beszúrjuk a panel legelejére
            parent.insertBefore(textContainer, parent.firstChild);
        }
    }

    // --- SEGÉDFÜGGVÉNY: HTML ÉPÍTÉSE ---
    // includeCommon: true -> Szöveg menü (van Közös)
    // includeCommon: false -> Beállítások menü (nincs Közös)
    const buildOptionsHTML = (includeCommon) => {
        let html = '';

        // A) KÖZÖS OPCIÓ
        const zoneFlags = uiState.zoneFlags || {};
        const isCommonActive = (zoneFlags.topCommon || zoneFlags.bottomCommon);

        if (includeCommon && (isCommonActive || currentCtx === 'common')) {
            const isSel = (currentCtx === 'common') ? 'selected' : '';
            html += `<option value="common" ${isSel}>🔗 Közös szerkesztő (Minden kép)</option>`;
        }

        // B) ELEMEK LISTÁZÁSA
        const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
        const isRow = layoutDir === 'row';

        allElements.forEach((el, idx) => {
            // Érték: mindig típus_ID (pl. map_main-map)
            let val = (el.type === 'map') ? `map_${el.id}` : `photo_${el.id}`;

            // Kiválasztottság
            let isSel = '';
            // Ha a jelenlegi kontextus 'map' (régi mód), és ez a main-map
            if (currentCtx === 'map' && el.id === 'main-map') isSel = 'selected';
            else if (currentCtx === val) isSel = 'selected';

            // Címke
            let label = "";
            if (el.type === 'map') label = "✨ Csillagtérkép";
            else if (el.subType === 'moon') label = "🌔 Holdfázis";
            else label = "📷 Saját Fotó";

            // Pozíció
            let posText = "";
            if (allElements.length > 1) {
                if (idx === 0) posText = isRow ? " (Bal)" : " (Fent)";
                else if (idx === allElements.length - 1) posText = isRow ? " (Jobb)" : " (Lent)";
                else posText = ` (${idx + 1}.)`;
            }

            html += `<option value="${val}" ${isSel}>${label}${posText}</option>`;
        });

        return html;
    };

    // --- 1. HELY: SZÖVEGEK MENÜ (Van Közös) ---
    // Akkor mutatjuk, ha van konténer ÉS (több elem van VAGY aktív a közös mód)
    if (textContainer) {
        const showTextSelector = (allElements.length > 1) || (uiState.zoneFlags && (uiState.zoneFlags.topCommon || uiState.zoneFlags.bottomCommon));

        if (showTextSelector) {
            textContainer.style.display = 'block';

            let select = document.getElementById('text-mode-selector');
            // Ha nincs select a dobozban, létrehozzuk
            if (!select) {
                textContainer.innerHTML = `
                    <div class="setting-group" style="margin-bottom:0;">
                        <label style="font-size:12px; color:#aaa; font-weight:bold; margin-bottom:5px; display:block;">Szerkesztett Szöveg Oldala:</label>
                        <select id="text-mode-selector" onchange="window.handleUnifiedSelection(this.value)" class="select-glass" style="width:100%; font-weight:bold; cursor: pointer;">
                        </select>
                    </div>`;
                select = document.getElementById('text-mode-selector');
            }

            // Tartalom töltése (TRUE = Közös opcióval)
            if (select) {
                select.innerHTML = buildOptionsHTML(true);

                // Helyes érték beállítása a selectnek
                if (currentCtx === 'common') select.value = 'common';
                else if (currentCtx === 'map') select.value = 'map_main-map';
                else if (currentCtx) select.value = currentCtx;
            }
        } else {
            textContainer.style.display = 'none';
        }
    }

    // --- 2. HELY: BEÁLLÍTÁSOK MENÜ (Nincs Közös) ---
    const settingsContainer = document.getElementById('element-selector-container');

    if (settingsContainer) {
        if (allElements.length <= 1) {
            settingsContainer.style.display = 'none';
        } else {
            settingsContainer.style.display = 'block';

            let visualSelect = document.getElementById('active-element-selector');
            if (visualSelect) {
                // Tartalom töltése (FALSE = Nincs Közös opció)
                visualSelect.innerHTML = buildOptionsHTML(false);

                // Aktív érték
                let visualVal = currentCtx;
                // Ha 'common'-ban vagyunk, itt mutassuk az utolsó kijelölt elemet
                if (currentCtx === 'common' || !currentCtx) {
                    const selId = uiState.selectedElementId;
                    if (selId) {
                        const el = allElements.find(e => e.id == selId);
                        if (el) visualVal = (el.type === 'map') ? `map_${el.id}` : `photo_${el.id}`;
                    }
                } else if (currentCtx === 'map') {
                    visualVal = 'map_main-map';
                }

                // Csak akkor állítjuk be, ha nem 'common' (hogy ne legyen üres)
                if (visualVal && visualVal !== 'common') {
                    // Ellenőrizzük, hogy létezik-e ilyen opció
                    if (visualSelect.querySelector(`option[value="${visualVal}"]`)) {
                        visualSelect.value = visualVal;
                    }
                }

                visualSelect.onchange = function () { window.handleUnifiedSelection(this.value); };
            }
        }
    }

    // --- 3. HELY: KIFUTÓ (BLEED) MENÜ (ÚJ) ---
    const bleedSelect = document.getElementById('bleed-element-selector');
    if (bleedSelect) {
        // Láthatóság kezelése: Csak akkor mutassuk, ha több elem van
        const showBleedSelector = (allElements.length > 1);
        // A szülő setting-group div-et rejtjük el/mutatjuk
        if (bleedSelect.parentElement.classList.contains('setting-group')) {
            bleedSelect.parentElement.style.display = showBleedSelector ? 'block' : 'none';
        }

        if (showBleedSelector) {
            console.log("[Bleed] updateElementSelectorUI: Updating bleed selector options.");

            // Ugyanazt a listát használjuk, mint a fő választónál (van Közös opció)
            let options = buildOptionsHTML(true);

            // Fallback debugging
            if (!options) {
                console.warn("[Bleed] buildOptionsHTML returned empty! Manually building options...");
                options += `<option value="common">🔗 Közös szerkesztő (Minden kép)</option>`;
                allElements.forEach((el, idx) => {
                    let val = (el.type === 'map') ? `map_${el.id}` : `photo_${el.id}`;
                    let label = (el.type === 'map') ? "✨ Csillagtérkép" : (el.subType === 'moon' ? "🌔 Holdfázis" : "📷 Saját Fotó");
                    options += `<option value="${val}">${label} (${idx + 1})</option>`;
                });
            }

            console.log(`[Bleed] Populating bleed selector with ${options.length} chars of HTML.`);
            bleedSelect.innerHTML = options;

            // Helyes érték beállítása
            let currentVal = currentCtx;
            if (currentCtx === 'common') currentVal = 'common';
            else if (currentCtx === 'map') currentVal = 'map_main-map';
            else if (!currentCtx && uiState.selectedElementId) {
                const el = allElements.find(e => e.id == uiState.selectedElementId);
                if (el) currentVal = (el.type === 'map') ? `map_${el.id}` : `photo_${el.id}`;
            }

            if (currentVal && bleedSelect.querySelector(`option[value="${currentVal}"]`)) {
                bleedSelect.value = currentVal;
            }
        }
    }
}

// --- 2. VÁLASZTÁS KEZELÉSE (MINDENHONNAN) ---
window.handleUnifiedSelection = function (value) {
    // console.log("🪲 [DEBUG] handleUnifiedSelection called with:", value);
    if (!myCelestialConf.userData) initUserData();

    // 1. ESET: KÖZÖS VÁLASZTÁSA
    if (value === 'common') {
        window.switchTextContext('common');
        return;
    }

    // 2. ESET: KONKRÉT ELEM (Map vagy Photo)
    const parts = value.split('_');
    const typePrefix = parts[0];
    const id = parts[1];

    if (!id) return;

    // A) Szöveges környezet beállítása (Pontos ID-val!)
    window.switchTextContext(value);

    // B) Vizuális kijelölés és panel betöltés
    const el = myCelestialConf.userData.elements.find(e => e.id == id);

    if (el) {
        // Globális kijelölés mentése
        myCelestialConf.userData.uiState.selectedElementId = id;
        console.log(`🔀 handleUnifiedSelection: selectedElementId set to ${id}, type=${el.type}, subType=${el.subType || 'N/A'}`);

        if (typePrefix === 'map') {
            // Térkép betöltése
            if (window.loadMapToEditor) window.loadMapToEditor(id);
        } else {
            // Fotó/Hold kiemelése
            if (window.highlightPhoto) window.highlightPhoto(id);
        }

        // Frissítsük a téma mód rádiógombokat az elem típusa alapján
        if (typeof window.updateThemeModeRadioState === 'function') {
            window.updateThemeModeRadioState();
        }
    }
}


window.handleElementSelection = function (id) {
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el) return;

    console.log(`🔀 handleElementSelection: id=${id}, type=${el.type}, subType=${el.subType || 'N/A'}`);

    if (el.type === 'map') {
        loadMapToEditor(el.id);
    } else {
        highlightPhoto(el.id, null);
    }

    // Frissítsük a téma mód rádiógombokat az elem típusa alapján
    if (typeof window.updateThemeModeRadioState === 'function') {
        window.updateThemeModeRadioState();
    }
}


// --- JAVÍTOTT: Új Térkép hozzáadása (Biztosított szövegzónákkal) ---
window.addMapElement = function (side) {
    if (!myCelestialConf.userData) initUserData();
    const newId = Date.now();

    // 1. Konfiguráció másolása
    const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
    if (currentConfig.userData) delete currentConfig.userData;

    if (typeof Celestial !== 'undefined' && typeof Celestial.date === 'function') {
        currentConfig.Ido = Celestial.date();
    }
    var cityInput = document.getElementById('city');
    if (cityInput) currentConfig.Varos = cityInput.value;

    const canvas = document.querySelector('#celestial-map canvas');
    const placeholderURL = canvas ? canvas.toDataURL('image/png') : null;

    const newEl = {
        id: newId, type: 'map',
        dataURL: placeholderURL,
        vectorData: null,
        celestialConfig: currentConfig,
        widthCM: 20, align: 'center', marginTop: 0, marginBottom: 0,
        scale: 1.0, rotation: 0, mask: 'none', maskScale: 1.0,
        borderWidth: 0, borderEnabled: false, borderColor: '#ffffff',
        calculated: { x: 0, y: 0, scale: 1 }
    };

    // --- 2. SZÖVEGZÓNÁK LÉTREHOZÁSA (JAVÍTOTT) ---
    // Megpróbálunk másolni egy létező térképről
    let sourceZone = null;
    const zones = myCelestialConf.userData.zones;

    // a) Megnézzük a 'map' kulcsot (régi főtérkép)
    if (zones['map'] && zones['map'].top && zones['map'].top.blocks.length > 0) {
        sourceZone = zones['map'];
    }
    // b) Ha nincs, megnézzük a map_main-map kulcsot
    else if (zones['map_main-map']) {
        sourceZone = zones['map_main-map'];
    }
    // c) Ha nincs, keresünk bármilyen map_... kulcsot
    else {
        const anyMapKey = Object.keys(zones).find(k => k.startsWith('map_'));
        if (anyMapKey) sourceZone = zones[anyMapKey];
    }

    const newZoneKey = `map_${newId}`;

    if (sourceZone) {
        // Ha találtunk forrást, lemásoljuk
        myCelestialConf.userData.zones[newZoneKey] = JSON.parse(JSON.stringify(sourceZone));
        console.log(`Szövegzónák másolva innen: ${sourceZone === zones['map'] ? 'map' : 'egyik térkép'}`);
    } else {
        // Ha SEMMI nincs, létrehozzuk az alapértelmezett blokkokat (hogy ne legyen üres!)
        console.log("Nem találtam másolható térképet, alapértelmezett szövegek generálása...");
        myCelestialConf.userData.zones[newZoneKey] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };

        // Alapértelmezett szövegek betöltése az új zónába
        const mapZones = myCelestialConf.userData.zones[newZoneKey];
        const meta = getMapMetaData(); // Dátum, hely lekérése

        mapZones.top.blocks.push({
            id: Date.now() + 1, isNewLine: true, content: "Csillagokban megírva",
            font: "Great Vibes", size: 80, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: { x: 0, y: 0 },
            isSettingsOpen: false
        });

        mapZones.bottom.blocks.push(
            { id: Date.now() + 2, isNewLine: true, content: meta.location, font: "Space Grotesk", size: 50, weight: "bold", color: "#e8edf5", alignH: "middle", tag: "location", calculated: { x: 0, y: 0 }, isSettingsOpen: false },
            { id: Date.now() + 3, isNewLine: true, content: meta.date, font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", tag: "date", calculated: { x: 0, y: 0 }, isSettingsOpen: false },
            { id: Date.now() + 4, isNewLine: true, content: meta.coords, font: "Montserrat", size: 24, weight: "300", color: "#e8edf5", alignH: "middle", tag: "coords", calculated: { x: 0, y: 0 }, isSettingsOpen: false }
        );
    }

    // 3. Beszúrás a tömbbe
    if (side === 'start' || side === 'left' || side === 'top') {
        myCelestialConf.userData.elements.unshift(newEl);
    } else {
        myCelestialConf.userData.elements.push(newEl);
    }

    // 4. Vászon frissítése
    if (window.updateCanvasSize) window.updateCanvasSize();

    // 5. Lista frissítése (Ez fontos, hogy az új elem megjelenjen a selectben!)
    if (window.updateElementSelectorUI) window.updateElementSelectorUI();

    // 6. Betöltés
    loadMapToEditor(newId);

    // 7. Vektoros generálás
    if (typeof Celestial !== 'undefined') Celestial.resize({ width: 1440 });
    setTimeout(() => {
        if (typeof window.copyMapToDesigner === 'function') {
            window.copyMapToDesigner();
        }
    }, 500);
}
window.updateActiveMapSnapshot = function () {

    // Ellenőrizzük, hogy van-e elérhető Celestial export
    if (typeof Celestial !== 'undefined' && typeof Celestial.exportSVG === 'function') {

        // FONTOS JAVÍTÁS:
        // Nem null-t adunk át, hanem egy üres függvényt! 
        // Ez azért kell, mert a celestial_jo.js ellenőrzi, hogy van-e callback.
        // Ha null-t kap, azonnal megáll. Ha függvényt kap, továbbmegy, 
        // és a belső logikánk (a módosított q.await) úgyis a handleVectorExport-ot hívja majd.

        Celestial.exportSVG(function () {
            console.log("Celestial export technikai callback lefutott (ez normális).");
        });

    } else if (typeof window.generateVectorMap === 'function') {
        window.generateVectorMap();
    } else {
        console.error("❌ Hiba: Celestial.exportSVG nem elérhető! Ellenőrizd a celestial_jo.js betöltését.");
    }
}

// ============================================================
// --- 1. VEKTOROS ADAT FOGADÁSA (CSS Izolálás + Opacity + Méretezés Javítva) ---
// ============================================================
window.handleVectorExport = function (svgContent) {
    console.log("✅ Vektoros adat (SVG) érkezett feldolgozásra...");

    if (!myCelestialConf.userData) initUserData();

    // Cél elem keresése
    let targetId = myCelestialConf.userData.uiState.selectedElementId;
    let targetEl = null;

    if (targetId) {
        targetEl = myCelestialConf.userData.elements.find(e => e.id == targetId && e.type === 'map');
    }

    // Ha nincs kijelölt, keressük az utolsót (új hozzáadásnál fontos)
    if (!targetEl) {
        const maps = myCelestialConf.userData.elements.filter(e => e.type === 'map');
        if (maps.length > 0) targetEl = maps[maps.length - 1];
    }

    if (targetEl) {
        // --- CSS OSZTÁLYOK EGYEDIVÉ TÉTELE (SCOPING) ---
        let scopedSvg = svgContent;
        const uniquePrefix = `map_${targetEl.id}_`; // Pl. map_1715234_

        // 1. <style> blokkban lévő osztályok átnevezése
        // JAVÍTÁS 1: A (?!\d) biztosítja, hogy az opacity: .15 ne romoljon el!
        const styleMatch = scopedSvg.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
        if (styleMatch) {
            let originalCss = styleMatch[1];
            let newCss = originalCss.replace(/(\.)(?!\d)([a-zA-Z0-9_-]+)/g, (match, dot, className) => {
                return `.${uniquePrefix}${className}`;
            });
            scopedSvg = scopedSvg.replace(originalCss, newCss);
        }

        // 2. HTML elemek class attribútumainak átnevezése
        scopedSvg = scopedSvg.replace(/class="([^"]+)"/g, (match, classNames) => {
            const newClassNames = classNames.split(' ').map(c => uniquePrefix + c).join(' ');
            return `class="${newClassNames}"`;
        });

        // 3. JAVÍTÁS 2 (MÉRETEZÉS): Visszatesszük a "background" jelölőt!
        // A refreshMapTransform a .background osztályt keresi a méréshez.
        // Megkeressük az átnevezett (pl. map_123_background) osztályt, és mellé írjuk a sima "background"-ot is.
        // Mivel a style blokkban már nincs .background szabály, ez nem rontja el a színeket!
        scopedSvg = scopedSvg.replace(new RegExp(`class="[^"]*${uniquePrefix}background[^"]*"`, 'g'), (match) => {
            return match.slice(0, -1) + ' background"';
        });

        // 4. ID-k és URL hivatkozások egyedivé tétele
        scopedSvg = scopedSvg.replace(/id="([^"]+)"/g, (match, idVal) => {
            return `id="${uniquePrefix}${idVal}"`;
        });

        scopedSvg = scopedSvg.replace(/url\(#([^)]+)\)/g, (match, idRef) => {
            if (!idRef.startsWith(uniquePrefix)) {
                return `url(#${uniquePrefix}${idRef})`;
            }
            return match;
        });

        // // --- MENTÉS ---
        // FIX: Use scopedSvg to avoid CSS class conflicts between multiple maps
        // Each map needs unique class names so their styles don't override each other
        targetEl.vectorData = scopedSvg;

        // --- ÚJ: KIEMELÉSEK MENTÉSE AZ ELEMBE ---
        // Elmentjük a jelenlegi globális listát a térkép saját adatai közé
        if (typeof Celestial !== 'undefined' && Celestial.highlightList) {
            targetEl.highlights = JSON.parse(JSON.stringify(Celestial.highlightList));
        } else {
            targetEl.highlights = {};
        }
        // ----------------------------------------

        // Config snapshot frissítése
        const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
        if (currentConfig.userData) delete currentConfig.userData;
        targetEl.celestialConfig = currentConfig;

        console.log(`✅ Térkép (ID: ${targetEl.id}) izolált és méretezett SVG mentve.`);

        // Maszk frissítése
        if (typeof currentMapMask !== 'undefined' && currentMapMask !== 'none') {
            targetEl.mask = currentMapMask;
        }

        // Újrarajzolás és Méretezés
        window.refreshMapTransform();
        setTimeout(window.renderFixedTexts, 50);
    } else {
        console.warn("❌ Hiba: Nem találtam térképet az SVG mentéséhez.");
    }

    // --- SZINKRONIZÁCIÓ: Jelezzük a loopnak, hogy végeztünk! ---
    if (typeof window.onVectorExportFinished === 'function') {
        const callback = window.onVectorExportFinished;
        window.onVectorExportFinished = null;
        callback(); // MEHET A KÖVETKEZŐ!
    }
};

// --- INIT ÉS EGYÉB ---
window.updatePhotoMaskUI = function (activeType, prefix = 'p-mask-btn') {
    document.querySelectorAll('.mask-option').forEach(el => {
        el.style.border = '1px solid #555';
        el.style.borderColor = '#555';
    });
    const activeBtn = document.getElementById(`${prefix}-${activeType}`);
    if (activeBtn) activeBtn.style.border = '2px solid #4a9eff';
}



// --- 3. KONTEXTUS VÁLTÓ (DEBUG MÓDBAN + JAVÍTÁS) ---
window.switchTextContext = function (context) {
    // console.log("🪲 [DEBUG] switchTextContext called with:", context);
    // console.log("--------------------------------------------------");
    console.log("🔀 switchTextContext MEGHÍVVA ezzel:", context);

    if (!myCelestialConf.userData) initUserData();

    // 1. INPUT NORMALIZÁLÁS
    if (context === 'photo') {
        let targetId = myCelestialConf.userData.uiState.activePhotoId;
        if (!targetId) {
            const photos = myCelestialConf.userData.elements.filter(el => el.type === 'photo');
            if (photos.length > 0) targetId = photos[0].id;
        }
        context = targetId ? `photo_${targetId}` : 'map';
    }

    // 2. TÉRKÉP ID KEZELÉS (A JAVÍTÁS ITT VAN!)
    // Ha 'map' jön be, keressük meg a valódi ID-t
    if (context === 'map') {
        const mapEl = myCelestialConf.userData.elements.find(e => e.type === 'map');
        // Ha az ID 'main-map', akkor a kontextus maradjon 'map' (a kompatibilitás miatt)
        if (mapEl) {
            if (mapEl.id === 'main-map') context = 'map';
            else context = `map_${mapEl.id}`;
        }
    }
    // Ha 'map_main-map' jönne be (az új választóból), azt vissza kell fordítani 'map'-re!
    if (context === 'map_main-map') {
        console.log("   ⚠️ Észleltem: 'map_main-map' -> Javítom erre: 'map'");
        context = 'map';
    }

    console.log("   ✅ VÉGLEGES KONTEXTUS:", context);

    // 3. ADATOK ELLENŐRZÉSE (DEBUG)
    const zones = myCelestialConf.userData.zones;
    if (zones[context]) {
        console.log(`   🆗 Adatok megtalálva a '${context}' kulcs alatt.`);
        console.log(`      - Felső blokkok száma: ${zones[context].top.blocks.length}`);
        console.log(`      - Alsó blokkok száma: ${zones[context].bottom.blocks.length}`);
    } else {
        console.error(`   ❌ HIBA: Nincsenek adatok a '${context}' kulcs alatt!`);
        console.log("      Létező kulcsok:", Object.keys(zones));
    }

    // 4. ÁLLAPOT MENTÉSE
    myCelestialConf.userData.uiState.currentTextContext = context;

    // 5. KÖZÖS ZÓNA INIT (Ha kell)
    if (context === 'common') {
        if (!zones.common) zones.common = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
        if (zones.common.top.blocks.length === 0) addNewBlockToStore('common', 'top', true);
        if (zones.common.bottom.blocks.length === 0) addNewBlockToStore('common', 'bottom', true);
    }

    // 6. CÍMEK FRISSÍTÉSE
    let label = (context === 'common') ? "KÖZÖS" : "Elem";
    if (context !== 'common') {
        // ID kinyerése a megjelenítéshez
        let id = context.startsWith('photo_') ? context.replace('photo_', '') : context.replace('map_', '');
        if (context === 'map') id = 'main-map';

        const allElements = myCelestialConf.userData.elements;
        const idx = allElements.findIndex(e => e.id == id);

        if (idx !== -1) {
            const el = allElements[idx];
            let typeName = (el.type === 'map') ? "Csillagtérkép" : ((el.subType === 'moon') ? "Hold" : "Fotó");
            label = `${typeName} ${idx + 1}`;
        }
    }

    const titleTop = document.getElementById('top-zone-title');
    if (titleTop) titleTop.innerText = `📝 FELSŐ ZÓNA (${label})`;
    const titleBottom = document.getElementById('bottom-zone-title');
    if (titleBottom) titleBottom.innerText = `📝 ALSÓ ZÓNA (${label})`;

    // 7. UI FRISSÍTÉS
    const flags = myCelestialConf.userData.uiState.zoneFlags || {};
    const chkTop = document.getElementById('chk-common-top'); if (chkTop) chkTop.checked = !!flags.topCommon;
    const chkBottom = document.getElementById('chk-common-bottom'); if (chkBottom) chkBottom.checked = !!flags.bottomCommon;

    // Listák frissítése
    if (window.updateElementSelectorUI) window.updateElementSelectorUI();

    // Panelek újrarajzolása (Ez a lényeg!)
    console.log("   🔄 renderZoneUI hívása...");
    window.renderZoneUI('top');
    window.renderZoneUI('bottom');
    window.renderFixedTexts();
}



// ============================================================
// --- 1. JAVÍTOTT: Univerzális Kattintás Kezelő (MINDENHOL) ---
// ============================================================
window.handleCanvasClick = function (e) {
    if (!myCelestialConf.userData) return;

    // UI állapot ellenőrzése: Csak akkor fusson, ha Okospont művelet van!
    const uiState = myCelestialConf.userData.uiState;
    const isPlacing = uiState.placingSmartpoint;
    const isMoving = uiState.movingSmartpointId;

    // Ha NEM rakunk le és NEM mozgatunk, akkor ez a funkció nem csinál semmit
    // (A kijelölést az elemek saját kezelője intézi)
    if (!isPlacing && !isMoving) return;

    // --- KOORDINÁTA SZÁMÍTÁS ---
    const designerSVG = document.getElementById('designer-svg');
    if (!designerSVG) return;

    // 1. ViewBox és Képernyő méretek
    // Megbízhatóbb a getAttribute-ból parszolni, mert a baseVal néha nem frissül azonnal a DOM-ban
    const vbAttr = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const vbX = vbAttr[0];
    const vbY = vbAttr[1];
    const vbW = vbAttr[2];
    const vbH = vbAttr[3];

    const rect = designerSVG.getBoundingClientRect();

    // 2. Egér pozíciója a ViewBox-on belül (Belső egységben)
    const mouseX_Internal = vbX + (e.clientX - rect.left) * (vbW / rect.width);
    const mouseY_Internal = vbY + (e.clientY - rect.top) * (vbH / rect.height);

    // 3. CM konverzió (A rendszer CM-ben tárolja a pozíciókat)
    // Kiszámoljuk a pxPerCm arányt ugyanúgy, mint a renderelésnél
    const widthInput = document.getElementById('canvas-width');
    const singlePageWidthCm = parseFloat(widthInput ? widthInput.value : 21);

    const elements = myCelestialConf.userData.elements;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const count = elements.length > 0 ? elements.length : 1;

    let totalWidthCm = singlePageWidthCm;
    if (layoutDir === 'row') totalWidthCm = singlePageWidthCm * count;

    const pxPerCm = vbW / totalWidthCm;

    // Végleges CM koordináták
    const finalX_CM = mouseX_Internal / pxPerCm;
    const finalY_CM = mouseY_Internal / pxPerCm;

    console.log(`📍 Okospont Művelet: Pixel(${mouseX_Internal.toFixed(0)}, ${mouseY_Internal.toFixed(0)}) -> CM(${finalX_CM.toFixed(2)}, ${finalY_CM.toFixed(2)})`);

    var dessvg = document.getElementById('designer-svg');
    dessvg.style.cursor = "default";
    // --- VÉGREHAJTÁS ---
    window.finalizeSmartpointPlacement(finalX_CM, finalY_CM);

    // Megállítjuk az eseményt, hogy ne történjen kijelölés, ha épp elemre kattintottunk
    // --- FIX: Stop Immediate Propagation ---
    // Prevent other listeners on the same element (like the selection clearer) from firing
    e.stopImmediatePropagation();
    e.preventDefault();
}

// Eseményfigyelő hozzáadása (ha még nincs)
const cnv = document.getElementById('render-canvas');
if (cnv) cnv.onclick = window.handleCanvasClick;

// Ezt ellenőrizd a fájl végén:
designerSVG = document.getElementById('designer-svg');
if (designerSVG) {
    // Fontos: onclick-et használunk, hogy felülírjuk a korábbiakat
    designerSVG.onclick = window.handleCanvasClick;
}
window.loadMapSettingsToUI = function (elementId) {
    const el = myCelestialConf.userData.elements.find(e => e.id == elementId);
    if (!el || el.type !== 'map') return;

    // Az adatokat a celestialConfig-ból vesszük ki, mert ott van elmentve minden
    const conf = el.celestialConfig || {};

    // 1. Dátum
    const dateInp = document.getElementById('date');
    if (dateInp && conf.Ido) {
        // Az Ido lehet string vagy Date objektum
        const d = new Date(conf.Ido);
        if (!isNaN(d.getTime())) {
            dateInp.value = d.toISOString().split('T')[0];
        }
    }

    // 2. Idő (amit kértél a ... helyére)
    const timeInp = document.getElementById('time'); // Feltételezem, hogy ez az ID-ja
    if (timeInp && conf.Ido) {
        const d = new Date(conf.Ido);
        if (!isNaN(d.getTime())) {
            // Óra:Perc formátum (HH:mm)
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            timeInp.value = `${hours}:${minutes}`;
        }
    }

    // 3. Helyszín (Város neve)
    const locInp = document.getElementById('city'); // A fájlodban 'city' az ID, nem 'location'
    if (locInp && conf.Varos) {
        locInp.value = conf.Varos;
    }

    // 4. Szélesség/Hosszúság (geopos tömbből)
    const latInp = document.getElementById('lat');
    const lngInp = document.getElementById('lng');
    if (conf.geopos) {
        if (latInp) latInp.value = conf.geopos[0];
        if (lngInp) lngInp.value = conf.geopos[1];
    }

    // 5. Stílus / Téma (Opcionális)
    // Ha van elmentett téma ID, itt lehetne beállítani a selectet, 
    // de a Celestial.apply(myCelestialConf) ezt általában elintézi a loadMapToEditor-ban.

    console.log(`Térkép (${elementId}) adatai betöltve a HTML inputokba.`);
}


function renderPhotoContextSelector(currentContext) {
    // console.log("renderPhotoContextSelector fut, context:", currentContext);

    let container = document.getElementById('photo-text-selector-container');
    if (!container) {
        const parent = document.querySelector('#fragment_r-3 .designer-controls');
        if (parent) {
            container = document.createElement('div');
            container.id = 'photo-text-selector-container';
            container.style.cssText = 'margin-bottom:15px; padding:10px; background:rgba(0,0,0,0.2); border-radius:8px; border-left:4px solid var(--accent-purple);';
            parent.insertBefore(container, parent.firstChild);
        } else return;
    }

    const allElements = myCelestialConf.userData.elements;

    // --- ELLENŐRZÉS: Van-e aktív közös mód? ---
    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags || {};
    const isCommonActive = (zoneFlags.topCommon === true || zoneFlags.bottomCommon === true);

    // Ha csak 1 elem van, ÉS nincs bekapcsolva a közös mód, akkor nem kell a választó
    if (allElements.length <= 1 && !isCommonActive) {
        container.style.display = 'none';
        return;
    } else {
        container.style.display = 'block';
    }

    let options = "";

    // --- 1. KÖZÖS OPCIÓ (Ha aktív vagy épp azt szerkesztjük) ---
    if (isCommonActive || currentContext === 'common') {
        const isSel = (currentContext === 'common') ? 'selected' : '';
        options += `<option value="common" ${isSel}>🔗 Közös szerkesztő (Minden kép)</option>`;
    }

    // --- 2. ELEMEK LISTÁZÁSA ---
    allElements.forEach((el, idx) => {
        let contextKey;
        if (el.type === 'map') {
            // Ha a térkép az, akkor map vagy map_ID
            contextKey = (el.id === 'main-map' || !el.id) ? 'map' : `map_${el.id}`;
            // Ha a currentContext simán 'map', és ez a fő térkép, akkor egyezzen
            if (currentContext === 'map' && contextKey.startsWith('map')) contextKey = 'map';
        } else {
            contextKey = `photo_${el.id}`;
        }

        const isSel = contextKey === currentContext ? 'selected' : '';
        let label = (el.type === 'map') ? "✨ Csillagtérkép" : ((el.subType === 'moon') ? "🌔 Holdfázis" : "📷 Kép");

        let posText = "";
        const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
        if (allElements.length > 1) {
            if (layoutDir === 'row') {
                if (idx === 0) posText = " (Bal)"; else if (idx === allElements.length - 1) posText = " (Jobb)"; else posText = ` (${idx + 1}.)`;
            } else {
                if (idx === 0) posText = " (Fent)"; else if (idx === allElements.length - 1) posText = " (Lent)"; else posText = ` (${idx + 1}.)`;
            }
        }

        options += `<option value="${contextKey}" ${isSel}>${label}${posText}</option>`;
    });

    container.innerHTML = `
        <div class="setting-group" style="margin-bottom:0;">
            <label style="font-size:12px; color:#aaa; font-weight:bold; margin-bottom:5px; display:block;">Szerkesztett Szöveg Oldala:</label>
            <select onchange="window.switchTextContext(this.value)" class="select-glass" style="width:100%; font-weight:bold;">${options}</select>
        </div>
    `;
}
// --- UTILS ---
function initDefaultTexts() {
    if (!myCelestialConf.userData) return;
    const mapZones = myCelestialConf.userData.zones.map;
    const meta = getMapMetaData();

    if (mapZones.top.blocks.length === 0) {
        mapZones.top.blocks.push({
            id: Date.now() + 1, isNewLine: true, content: "Csillagokban megírva",
            font: "Great Vibes", size: 80, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: { x: 0, y: 0 }
        });
    }
    if (mapZones.bottom.blocks.length === 0) {
        mapZones.bottom.blocks.push(
            { id: Date.now() + 2, isNewLine: true, content: meta.location, font: "Space Grotesk", size: 50, weight: "bold", color: "#e8edf5", alignH: "middle", tag: "location", calculated: { x: 0, y: 0 } },
            { id: Date.now() + 3, isNewLine: true, content: meta.date, font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", tag: "date", calculated: { x: 0, y: 0 } },
            { id: Date.now() + 4, isNewLine: true, content: meta.coords, font: "Montserrat", size: 24, weight: "300", color: "#e8edf5", alignH: "middle", tag: "coords", calculated: { x: 0, y: 0 } }
        );
    }
}


// --- JAVÍTOTT: getMapMetaData (Opcionális paraméterrel) ---
function getMapMetaData(specificElement = null) {
    let result = { location: "Budapest", date: "2024. 01. 01.", coords: "47.4979° N, 19.0402° E" };
    if (!myCelestialConf.userData) return result;

    let targetElement = specificElement;

    // Ha nincs megadva konkrét elem, keressük az aktívot (régi működés megtartása)
    if (!targetElement) {
        const currentCtx = myCelestialConf.userData.uiState.currentTextContext;
        if (currentCtx && currentCtx !== 'common') {
            let id = null;
            if (currentCtx.startsWith('map_')) id = currentCtx.replace('map_', '');
            else if (currentCtx.startsWith('photo_')) id = currentCtx.replace('photo_', '');
            else if (currentCtx === 'map') id = 'main-map';
            if (id) targetElement = myCelestialConf.userData.elements.find(e => e.id == id);
        }
        if (!targetElement) {
            const selId = myCelestialConf.userData.uiState.selectedElementId;
            if (selId) targetElement = myCelestialConf.userData.elements.find(e => e.id == selId);
        }
    }

    if (targetElement) {
        if (targetElement.type === 'map') {
            // Fontos: Itt a TÉRKÉP SAJÁT configját olvassuk!
            const conf = targetElement.celestialConfig || myCelestialConf;

            if (conf.Ido) {
                const d = new Date(conf.Ido);
                if (!isNaN(d.getTime())) result.date = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
            }
            if (conf.Varos) result.location = conf.Varos;
            if (conf.geopos) {
                const lat = conf.geopos[0], lng = conf.geopos[1];
                result.coords = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
            }
        } else if (targetElement.subType === 'moon') {
            // ... (Hold logika változatlan) ...
            if (targetElement.moonDate) {
                const d = new Date(targetElement.moonDate);
                result.date = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
            }
            if (targetElement.moonLocationName) result.location = targetElement.moonLocationName;
            if (targetElement.moonLat !== undefined) {
                const lat = targetElement.moonLat, lng = targetElement.moonLng;
                result.coords = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lng).toFixed(4)}° ${lng >= 0 ? "E" : "W"}`;
            }
        }
    }
    return result;
}

window.renderFixedTexts = function () {
    if (!getDOMElements()) return;
    if (!myCelestialConf.userData) initUserData();

    const textLayer = document.getElementById('text-layer');
    textLayer.innerHTML = '';

    const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const totalW = paperVB[2];
    const totalH = paperVB[3];
    const elements = myCelestialConf.userData.elements;

    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const count = elements.length;

    let slotW, slotH;
    if (layoutDir === 'column') {
        slotW = totalW;
        slotH = totalH / count;
    } else {
        slotW = totalW / count;
        slotH = totalH;
    }

    const canvasWInput = document.getElementById('canvas-width');
    const pageWidthCm = parseFloat(canvasWInput ? canvasWInput.value : 21);

    let effectivePageWidthCm = pageWidthCm;
    if (layoutDir === 'row' && elements.length > 1) {
        effectivePageWidthCm = pageWidthCm * elements.length;
    }
    const pxPerCm = totalW / effectivePageWidthCm;

    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags;
    const zones = myCelestialConf.userData.zones;

    let globalContentTop = totalH;
    let globalContentBottom = 0;

    elements.forEach(el => {
        if (el.contentBounds) {
            if (el.contentBounds.top < globalContentTop) globalContentTop = el.contentBounds.top;
            if (el.contentBounds.bottom > globalContentBottom) globalContentBottom = el.contentBounds.bottom;
        }
    });

    if (globalContentTop === totalH) globalContentTop = totalH * 0.3;
    if (globalContentBottom === 0) globalContentBottom = totalH * 0.7;

    if (zoneFlags.topCommon && zones.common && zones.common.top) {
        let z = zones.common.top;
        renderComplexZone(z.blocks, 'top', 0, globalContentTop, 0, totalW, z.align || 'center', (z.margin || 0) * pxPerCm, pxPerCm);
    }

    if (zoneFlags.bottomCommon && zones.common && zones.common.bottom) {
        let z = zones.common.bottom;
        renderComplexZone(z.blocks, 'bottom', globalContentBottom, totalH, 0, totalW, z.align || 'center', (z.margin || 0) * pxPerCm, pxPerCm);
    }

    elements.forEach((el, index) => {
        let contextKey;
        if (el.type === 'map') {
            contextKey = (el.id === 'main-map' || !el.id) ? 'map' : `map_${el.id}`;
        } else {
            contextKey = `photo_${el.id}`;
        }

        let slotStartX, slotEndX, slotStartY, slotEndY;

        if (layoutDir === 'column') {
            slotStartX = 0;
            slotEndX = totalW;
            slotStartY = index * slotH;
            slotEndY = slotStartY + slotH;
        } else {
            slotStartX = index * slotW;
            slotEndX = slotStartX + slotW;
            slotStartY = 0;
            slotEndY = totalH;
        }

        let contentTop = el.contentBounds ? el.contentBounds.top : (slotStartY + slotH * 0.3);
        let contentBottom = el.contentBounds ? el.contentBounds.bottom : (slotStartY + slotH * 0.7);

        if (contentTop < slotStartY) contentTop = slotStartY;
        if (contentBottom > slotEndY) contentBottom = slotEndY;

        if (!zoneFlags.topCommon && zones[contextKey] && zones[contextKey].top) {
            let z = zones[contextKey].top;
            renderComplexZone(z.blocks, 'top', slotStartY, contentTop, slotStartX, slotEndX, z.align || 'center', (z.margin || 0) * pxPerCm, pxPerCm);
        }

        if (!zoneFlags.bottomCommon && zones[contextKey] && zones[contextKey].bottom) {
            let z = zones[contextKey].bottom;
            renderComplexZone(z.blocks, 'bottom', contentBottom, slotEndY, slotStartX, slotEndX, z.align || 'center', (z.margin || 0) * pxPerCm, pxPerCm);
        }
    });
    if (window.triggerAutoSave) window.triggerAutoSave();
}

function renderComplexZone(blocks, type, areaTop, areaBottom, xStart, xEnd, align, marginPx, pxPerCm) {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return;

    const textLayer = document.getElementById('text-layer');

    // 1. SOROKBA RENDEZÉS
    let rows = [];
    let currentRow = [];

    blocks.forEach((block, idx) => {
        if (idx === 0 || block.isNewLine) {
            if (currentRow.length > 0) rows.push(currentRow);
            currentRow = [block];
        } else {
            currentRow.push(block);
        }
    });
    if (currentRow.length > 0) rows.push(currentRow);

    // 2. MAGASSÁG SZÁMÍTÁSA
    let totalContentHeight = 0;
    let rowHeights = [];

    rows.forEach(row => {
        let maxFontSize = 0;
        row.forEach(b => {
            const s = parseInt(b.size) || 32;
            if (s > maxFontSize) maxFontSize = s;
        });
        const lineHeight = maxFontSize * 1.3;
        rowHeights.push(lineHeight);
        totalContentHeight += lineHeight;
    });

    // 3. KEZDŐ Y MEGHATÁROZÁSA
    let startY = areaTop;
    if (align === 'center') {
        const availableHeight = areaBottom - areaTop;
        const middle = areaTop + (availableHeight / 2);
        startY = middle - (totalContentHeight / 2);
    } else if (align === 'top') {
        startY = areaTop + marginPx;
    } else if (align === 'bottom') {
        startY = areaBottom - marginPx - totalContentHeight;
    }

    let currentY = startY;

    // 4. SOROK KIRAJZOLÁSA
    rows.forEach((row, rowIndex) => {
        const rowHeight = rowHeights[rowIndex];
        const textBaselineY = currentY + (rowHeight * 0.8);

        let leftBlocks = row.filter(b => b.alignH === 'start');
        let centerBlocks = row.filter(b => b.alignH === 'middle' || !b.alignH);
        let rightBlocks = row.filter(b => b.alignH === 'end');

        // --- SEGÉDFÜGGVÉNY: STÍLUSOK ALKALMAZÁSA ---
        const createAndMeasure = (block) => {
            const fontSize = parseInt(block.size) || 32;
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

            // Alap stílusok
            text.setAttribute('font-family', block.font);
            text.setAttribute('font-size', fontSize);
            text.textContent = block.content;

            // --- ÚJ STÍLUSOK ---
            text.setAttribute('font-weight', block.weight || 'normal'); // Bold
            text.setAttribute('font-style', block.style || 'normal');   // Italic
            text.setAttribute('text-decoration', block.decoration || 'none'); // Underline

            // Körvonal (Outline)
            if (block.strokeWidth && parseFloat(block.strokeWidth) > 0) {
                text.setAttribute('stroke', block.strokeColor || '#000000');
                text.setAttribute('stroke-width', block.strokeWidth);
                text.setAttribute('stroke-linejoin', 'round');
                // Ez fontos: a körvonal ne takarja ki a betű belsejét (SVG Paint Order)
                text.setAttribute('paint-order', 'stroke fill');
            } else {
                text.setAttribute('stroke', 'none');
            }

            text.setAttribute('opacity', '0');
            textLayer.appendChild(text);
            const width = text.getComputedTextLength();
            return { svgNode: text, width: width, data: block };
        };

        // --- A) BALRA IGAZÍTOTT ---
        let cursorX = xStart;
        leftBlocks.forEach(block => {
            const item = createAndMeasure(block);
            const margin = (block.marginSide || 0) * pxPerCm;
            cursorX += margin;

            item.svgNode.setAttribute('x', cursorX);
            item.svgNode.setAttribute('y', textBaselineY);
            item.svgNode.setAttribute('fill', block.color);
            item.svgNode.setAttribute('opacity', '1');
            item.svgNode.setAttribute('text-anchor', 'start');

            setupTextInteraction(item.svgNode, block, type);
            cursorX += item.width;
        });

        // --- B) JOBBRA IGAZÍTOTT ---
        let totalRightWidth = 0;
        let rightItems = rightBlocks.map(block => {
            const item = createAndMeasure(block);
            const margin = (block.marginSide || 0) * pxPerCm;
            item.margin = margin;
            totalRightWidth += item.width + margin;
            return item;
        });

        cursorX = xEnd - totalRightWidth;
        rightItems.forEach(item => {
            item.svgNode.setAttribute('x', cursorX);
            item.svgNode.setAttribute('y', textBaselineY);
            item.svgNode.setAttribute('fill', item.data.color);
            item.svgNode.setAttribute('opacity', '1');
            item.svgNode.setAttribute('text-anchor', 'start');

            setupTextInteraction(item.svgNode, item.data, type);
            cursorX += item.width + item.margin;
        });

        // --- C) KÖZÉPRE IGAZÍTOTT ---
        let totalCenterWidth = 0;
        let centerItems = centerBlocks.map(block => {
            const item = createAndMeasure(block);
            const margin = (block.marginSide || 0) * pxPerCm;
            item.margin = margin;
            totalCenterWidth += item.width + margin;
            return item;
        });

        const centerX = xStart + ((xEnd - xStart) / 2);
        cursorX = centerX - (totalCenterWidth / 2);

        centerItems.forEach(item => {
            cursorX += item.margin;
            item.svgNode.setAttribute('x', cursorX);
            item.svgNode.setAttribute('y', textBaselineY);
            item.svgNode.setAttribute('fill', item.data.color);
            item.svgNode.setAttribute('opacity', '1');
            item.svgNode.setAttribute('text-anchor', 'start');

            setupTextInteraction(item.svgNode, item.data, type);
            cursorX += item.width;
        });

        currentY += rowHeight;
    });
}
window.toggleBlockSettings = function (zone, id) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const block = myCelestialConf.userData.zones[currentTextContext][zone].blocks.find(b => b.id === id);
    if (block) {
        // Átváltjuk az állapotot (true <-> false)
        block.isSettingsOpen = !block.isSettingsOpen;
        // Újrarajzoljuk a panelt
        renderZoneUI(zone);
    }
}
// Segédfüggvény a kattintás eseményhez (hogy ne ismételjük a kódot)
function setupTextInteraction(node, block, zoneType) {
    node.style.cursor = "pointer";
    node.onclick = function (e) {
        e.stopPropagation();
        const textArea = document.getElementById(`textarea-${block.id}`);
        if (textArea) {
            textArea.focus();
            textArea.scrollIntoView({ behavior: "smooth", block: "center" });
            // Opcionális: Kijelölhetjük a szerkesztőben az inputot vizuálisan
            textArea.style.borderColor = "var(--accent-blue)";
            setTimeout(() => textArea.style.borderColor = "#555", 2000);
        }
    };
}

// --- JAVÍTOTT ÉS TELJES: addNewBlockToStore ---
window.addNewBlockToStore = function (zoneType, zoneSide, isNewLine) {
    if (!myCelestialConf.userData) initUserData();

    // Hova tegyük? (Közös vagy Egyéni)
    const currentCtx = myCelestialConf.userData.uiState.currentTextContext;
    const targetCtx = (zoneType === 'common') ? 'common' : currentCtx;

    if (!myCelestialConf.userData.zones[targetCtx]) {
        myCelestialConf.userData.zones[targetCtx] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
    }

    const zoneData = myCelestialConf.userData.zones[targetCtx][zoneSide];

    // ÚJ BLOKK LÉTREHOZÁSA (Minden tulajdonsággal)
    const newBlock = {
        id: Date.now() + Math.random(),
        isNewLine: isNewLine,

        tag: null,              // Nincs speciális címke (szabad szöveg)
        content: "Szöveg",      // Alap szöveg

        // --- Formázás ---
        font: "Space Grotesk",
        size: 32,
        weight: "normal",       // normal / bold
        style: "normal",        // normal / italic (VISSZARAKVA)
        decoration: "none",     // none / underline (VISSZARAKVA)
        color: "#e8edf5",

        // --- Körvonal (Stroke) ---
        strokeWidth: 0,         // 0 = nincs (VISSZARAKVA)
        strokeColor: "#000000", // (VISSZARAKVA)

        // --- Elrendezés ---
        alignH: "middle",       // start / middle / end
        marginSide: 0,          // JAVÍTVA: 0 cm alapértelmezett (1 helyett)

        // --- UI állapot ---
        isSettingsOpen: true,   // Legyen nyitva, hogy szerkeszthesd
        calculated: { x: 0, y: 0 }
    };

    zoneData.blocks.push(newBlock);

    // UI és Vászon frissítése
    if (window.renderZoneUI) {
        window.renderZoneUI(zoneSide);
    }
    window.renderFixedTexts();
}
function calculateCM(pxSize) {
    const widthInput = document.getElementById('canvas-width');
    const designerSVG = document.getElementById('designer-svg');
    if (!designerSVG || !widthInput) return "0.0 cm";
    const viewBox = designerSVG.viewBox.baseVal;
    if (!viewBox || viewBox.width === 0) return "— cm";
    const widthCm = parseFloat(widthInput.value) || 21;
    const pageCount = myCelestialConf.userData.elements ? myCelestialConf.userData.elements.length : 1;
    return ((pxSize / viewBox.width) * (widthCm * pageCount)).toFixed(2) + " cm";
}



window.renderZoneUI = function (zone) {
    if (!myCelestialConf.userData) initUserData();

    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags;
    const elements = myCelestialConf.userData.elements || [];
    const container = document.getElementById(`${zone}-blocks-container`);

    if (!container) return;
    container.innerHTML = '';

    // --- 1. KÖZÖS HASZNÁLAT KAPCSOLÓ ---
    let headerHTML = '';
    const isMultipleElements = elements.length > 1;
    const isZoneCommonActive = (zone === 'top' && zoneFlags.topCommon) || (zone === 'bottom' && zoneFlags.bottomCommon);

    if (isMultipleElements) {
        const checkboxId = `chk-common-${zone}`;
        const isChecked = isZoneCommonActive ? 'checked' : '';
        headerHTML = `
            <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #444;">
                <label style="font-size: 13px; font-weight: bold; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="${checkboxId}" ${isChecked} 
                        onchange="window.toggleCommonZone('${zone}', this.checked)"
                        style="width: 16px; height: 16px; cursor: pointer;">
                    🔗 Közös ${zone === 'top' ? 'Felső' : 'Alsó'} Szövegdoboz
                </label>
                <div style="font-size: 10px; color: #aaa; margin-left: 24px; margin-top: 4px;">
                    ${isChecked ? 'Minden képen ugyanaz a szöveg jelenik meg.' : 'Minden képen egyedi szöveg állítható.'}
                </div>
            </div>
        `;
    }

    // --- LOGIKA ELLENŐRZÉSE ---
    const isCommonContext = (currentTextContext === 'common');
    const wrapperId = zone === 'top' ? 'top-text-settings' : 'bottom-text-settings';
    const wrapper = document.getElementById(wrapperId);
    const settingsGroup = wrapper ? wrapper.querySelector('.setting-group') : null;

    if (!isCommonContext && isZoneCommonActive) {
        if (settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = headerHTML + `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>⚠️ A Közös ${zone === 'top' ? 'Felső' : 'Alsó'} Szövegdoboz aktív.</p><button onclick="switchTextContext('common')" class="add-btn primary" style="width:auto; font-size:12px;">Ugrás a Közös szerkesztőhöz ➡</button></div>`;
        return;
    }
    if (isCommonContext && !isZoneCommonActive) {
        if (settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = headerHTML + `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>Ez a zóna jelenleg "Egyéni" módra van állítva.</p></div>`;
        return;
    }
    if (settingsGroup) settingsGroup.style.display = 'block';

    if (!myCelestialConf.userData.zones[currentTextContext]) {
        myCelestialConf.userData.zones[currentTextContext] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
    }
    const data = myCelestialConf.userData.zones[currentTextContext][zone];

    // --- AKTÍV ELEM TÍPUSÁNAK ELLENŐRZÉSE ---
    // Megnézzük, hogy a jelenleg szerkesztett elem (currentTextContext) Hold-e?
    let isMoonContext = false;
    if (currentTextContext.startsWith('photo_')) {
        const photoId = currentTextContext.replace('photo_', '');
        const activeEl = elements.find(e => e.id == photoId);
        if (activeEl && activeEl.subType === 'moon') {
            isMoonContext = true;
        }
    }

    // --- GYORS ADATOK PANEL ---
    const hasLocation = data.blocks.some(b => b.tag === 'location');
    const hasDate = data.blocks.some(b => b.tag === 'date');
    const hasCoords = data.blocks.some(b => b.tag === 'coords');

    // const btnStyleBase = "flex:1; padding:6px; border:1px solid #444; color:#aaa; transition: all 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 11px;";
    // const btnStyleActive = "flex:1; padding:6px; border:1px solid var(--accent-blue); background: var(--accent-blue); color:white; font-weight:bold; transition: all 0.2s; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 11px;";

    const btnStyleActive = "flex:1; padding:6px; color:white; border: 1px solid var(--accent-blue); background: var(--accent-blue); font-weight:bold; transition: all 0.2s;";
    const btnStyleBase = "flex:1; padding:6px; border:1px solid #444; background: rgba(255, 255, 255, 0.05); color:#aaa;  transition: all 0.2s;";

    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = "margin-bottom:15px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px;";

    let moonButtonsHTML = '';

    // HA HOLDAT SZERKESZTÜNK, MEGJELENÍTJÜK A HOLDAS GOMBOKAT
    if (isMoonContext) {
        const hasPhase = data.blocks.some(b => b.tag === 'moon_phase');
        const hasIllum = data.blocks.some(b => b.tag === 'moon_illum');
        const hasAge = data.blocks.some(b => b.tag === 'moon_age');
        const hasNextNew = data.blocks.some(b => b.tag === 'moon_nextnew');
        const hasNextFull = data.blocks.some(b => b.tag === 'moon_nextfull');
        const hasZodiac = data.blocks.some(b => b.tag === 'moon_zodiac');

        moonButtonsHTML = `
            <div style="font-size:12px; color:#aaa; margin-top:10px; margin-bottom:5px;">Hold Adatok:</div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; margin-bottom:5px;">
                <button onclick="toggleDataBlock('${zone}', 'moon_phase')" style="${hasPhase ? btnStyleActive : btnStyleBase}">🌑 Fázis Neve</button>
                <button onclick="toggleDataBlock('${zone}', 'moon_illum')" style="${hasIllum ? btnStyleActive : btnStyleBase}">💡 Megvilágítottság</button>
                <button onclick="toggleDataBlock('${zone}', 'moon_age')" style="${hasAge ? btnStyleActive : btnStyleBase}">⏳ Hold Kora</button>
                <button onclick="toggleDataBlock('${zone}', 'moon_zodiac')" style="${hasZodiac ? btnStyleActive : btnStyleBase}">♈ Csillagjegy</button>
                <button onclick="toggleDataBlock('${zone}', 'moon_nextnew')" style="${hasNextNew ? btnStyleActive : btnStyleBase}">🌑 Köv. Újhold</button>
                <button onclick="toggleDataBlock('${zone}', 'moon_nextfull')" style="${hasNextFull ? btnStyleActive : btnStyleBase}">🌕 Köv. Telihold</button>
            </div>
        `;
    }

    controlsDiv.innerHTML = `
        <div style="font-size:12px; color:#aaa; margin-bottom:5px;">Általános Adatok:</div>
        <div style="display:flex; gap:5px; margin-bottom:5px;">
            <button onclick="toggleDataBlock('${zone}', 'location')" style="${hasLocation ? btnStyleActive : btnStyleBase}">📍 Helyszín</button>
            <button onclick="toggleDataBlock('${zone}', 'date')" style="${hasDate ? btnStyleActive : btnStyleBase}">📅 Dátum</button>
            <button onclick="toggleDataBlock('${zone}', 'coords')" style="${hasCoords ? btnStyleActive : btnStyleBase}">🌐 Koord.</button>
        </div>
        ${moonButtonsHTML}
        
        <div style="font-size:12px; color:#aaa; margin-top:10px; margin-bottom:5px;">Szöveg Sablonok:</div>
        <select onchange="applyTextTemplate('${zone}', this.value); this.value='';" class="select-glass" style="width:100%; padding:6px; color:white; border-radius:4px;">
            <option value="">-- Válassz egy témát --</option>
            ${Object.keys(TEXT_TEMPLATES).map(cat => `<optgroup label="${cat}">${TEXT_TEMPLATES[cat].map(t => `<option value="${t}">${t}</option>`).join('')}</optgroup>`).join('')}
        </select>
    `;

    // --- ÖSSZEÁLLÍTÁS ---
    container.innerHTML = headerHTML;
    container.appendChild(controlsDiv);

    if (data.blocks.length === 0) {
        container.innerHTML += `<div style="text-align: center; padding: 20px;"><button onclick="insertBlockAt('${zone}', -1, true)" class="add-btn primary" style="width:100%;">➕ Első sor hozzáadása</button></div>`;
        return;
    }

    const alignSelect = document.getElementById(`${zone}-zone-align-v`);
    if (alignSelect) alignSelect.value = data.alignV;

    const fonts = [
        "Roboto", "Playfair Display", "Montserrat", "Great Vibes", "Dancing Script",
        "Lato", "Oswald", "Merriweather", "Nunito", "Raleway",
        "Pacifico", "Satisfy", "Amatic SC", "Caveat", "Comfortaa",
        "Lobster", "Abril Fatface", "Shadows Into Light", "Indie Flower", "Cinzel"
    ];

    data.blocks.forEach((block, index) => {
        // ... (A blokkok renderelése változatlan, használd az előző verziód kódját innen) ...
        // A teljesség kedvéért ide másolom a blokk renderelést is, hogy egyben meglegyen a függvény.

        const div = document.createElement('div');
        div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;

        if (block.isNewLine) {
            div.style.borderLeft = "4px solid var(--accent-blue)";
            div.style.marginTop = "15px";
        } else {
            div.style.borderLeft = "4px dashed #666";
            div.style.marginLeft = "30px";
            div.style.marginTop = "2px";
            div.style.position = "relative";
        }

        let previewText = block.content ? block.content.trim() : "Minta";
        if (previewText.length > 25) previewText = previewText.substring(0, 25) + "...";

        let fontOptions = fonts.map(f => `
            <option value="${f}" style="font-family:'${f}'; font-size:16px;" ${block.font === f ? 'selected' : ''}>
                ${previewText}
            </option>`).join('');

        let marginLabel = block.alignH === 'start' ? 'Bal margó' : (block.alignH === 'end' ? 'Jobb margó' : 'Helyköz');
        let marginHTML = `<div style="margin-top:8px;"><label style="font-size:10px; color:#4a9eff;">${marginLabel} (cm):</label><input type="number" class="input-glass" value="${block.marginSide || 0}" step="0.1" oninput="updateBlockData('${zone}', ${block.id}, 'marginSide', this.value)" style="width:100%;"></div>`;

        const alignmentSelectorHTML = `
            <div>
                <label style="font-size:10px;">Rendezés:</label>
                <select class="select-glass" onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
                    <option value="start" ${block.alignH === 'start' ? 'selected' : ''}>Balra</option>
                    <option value="middle" ${block.alignH === 'middle' ? 'selected' : ''}>Közép</option>
                    <option value="end" ${block.alignH === 'end' ? 'selected' : ''}>Jobbra</option>
                </select>
            </div>
        `;

        let headerText = block.isNewLine ? '⏎ ÚJ SOR' : '➕ AZONOS SORBAN (Inline)';

        const isBold = block.weight === 'bold';
        const isItalic = block.style === 'italic';
        const isUnderline = block.decoration === 'underline';
        const hasOutline = (block.strokeWidth > 0);
        const isOpen = block.isSettingsOpen;
        const displayStyle = isOpen ? 'block' : 'none';
        const toggleIcon = isOpen ? '▲' : '▼';
        const toggleText = isOpen ? 'Beállítások elrejtése' : 'Részletes beállítások';

        div.innerHTML = `
            <div style="font-size:11px; margin-bottom:5px; color:#aaa; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:bold; ${!block.isNewLine ? 'color:#ddd;' : ''}">
                    ${headerText} 
                    ${block.tag ? `<span style="color:var(--accent-blue); margin-left:5px;">[${block.tag}]</span>` : ''}
                </span>
                ${!block.isNewLine ? '<span style="font-size:10px; opacity:0.6;">(Egy vonalban a fentivel)</span>' : ''}
            </div>

            <div class="setting-group" style="margin-bottom:8px;">
                <textarea id="textarea-${block.id}" class="input-glass" rows="2" oninput="window.updateBlockContentAndPreview('${zone}', ${block.id}, this.value)" style="width:100%; font-family:'${block.font}'; font-size: 24px; padding:5px;">${block.content}</textarea>
            </div>

            <div onclick="window.toggleBlockSettings('${zone}', ${block.id})" style="cursor:pointer; background:rgba(255,255,255,0.05); padding:5px 10px; border-radius:4px; font-size:11px; color:#aaa; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span>⚙️ ${toggleText}</span>
                <span>${toggleIcon}</span>
            </div>

            <div id="settings-panel-${block.id}" style="display:${displayStyle}; padding: 10px; background:rgba(0,0,0,0.15); border-radius:6px; margin-bottom:10px;">
                <div class="grid-2-cols" style="gap:10px; margin-bottom:8px;">
                    <div>
                        <label style="font-size:10px;">Betűméret: <span style="color:var(--accent-blue); float:right;">${calculateCM(block.size)}</span></label>
                        <input type="number" class="input-glass" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)">
                    </div>
                    <div>
                        <label style="font-size:10px;">Szín:</label><input type="color" class="input-glass" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:38px; padding: 2px;">
                    </div>
                </div>

                <div class="grid-2-cols" style="gap:10px; margin-bottom:8px;">
                    <div>
                        <label style="font-size:10px;">Betűtípus:</label>
                        <select id="font-select-${block.id}" class="select-glass" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="width:100%; font-family:'${block.font}'; padding: 5px;">
                            ${fontOptions}
                        </select>
                    </div>
                    ${alignmentSelectorHTML}
                </div>

                <div style="display:flex; gap:5px; margin-bottom:12px;">
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'weight', '${isBold ? 'normal' : 'bold'}')" class="btn-glass" style="flex:1; padding:5px; background:${isBold ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'}; font-weight:bold;">B</button>
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'style', '${isItalic ? 'normal' : 'italic'}')" class="btn-glass" style="flex:1; padding:5px; background:${isItalic ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'}; font-style:italic;">I</button>
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'decoration', '${isUnderline ? 'none' : 'underline'}')" class="btn-glass" style="flex:1; padding:5px; background:${isUnderline ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'}; text-decoration:underline;">U</button>
                </div>

                <div style="border-top:1px solid #444; padding-top:8px;">
                    <label style="font-size:11px; margin-bottom:5px; display:flex; align-items:center;">
                        <input type="checkbox" ${hasOutline ? 'checked' : ''} onchange="window.updateBlockData('${zone}', ${block.id}, 'strokeWidth', this.checked ? 1 : 0)" style="width:auto; margin-right:8px;"> 
                        🔲 Körvonal (Stroke)
                    </label>
                    <div style="display:${hasOutline ? 'flex' : 'none'}; gap:10px; align-items:center;">
                        <input type="color" class="input-glass" value="${block.strokeColor || '#000000'}" oninput="window.updateBlockData('${zone}', ${block.id}, 'strokeColor', this.value)" style="width:40px; height:30px; padding:2px; border:none;">
                        <div style="flex:1;">
                            <input type="range" class="slider-glass" min="0.1" max="5" step="0.1" value="${block.strokeWidth || 0}" oninput="window.updateBlockData('${zone}', ${block.id}, 'strokeWidth', this.value)">
                        </div>
                        <span style="font-size:10px; width:30px;">${block.strokeWidth || 0}px</span>
                    </div>
                </div>

                ${marginHTML}
            </div>

            <div style="text-align:center; font-size:10px; color:#aaa; margin-top:5px; margin-bottom:2px; text-transform:uppercase; letter-spacing:1px;">
                Új sor hozzáadása
            </div>

            <div class="block-actions" style="display: flex; gap: 4px; border-top: 1px solid #444; padding-top: 5px; flex-wrap: wrap;">
                <button onclick="insertBlockAt('${zone}', ${index}, true)" class="btn-glass btn-glass-primary" style="flex:1; padding:5px; font-size:10px;" title="Új sor beszúrása ez ALÁ">⏎ Alá</button>
                <button onclick="insertBlockAt('${zone}', ${index - 1}, true)" class="btn-glass btn-glass-primary" style="flex:1; padding:5px; font-size:10px;" title="Új sor beszúrása ez FÖLÉ">⬆ Felé</button>
                <button onclick="insertBlockAt('${zone}', ${index}, false)" class="btn-glass btn-glass-secondary" style="flex:1; padding:5px; font-size:10px;" title="Új elem ugyanebbe a sorba">➕ Mellé</button>
                <button onclick="removeBlock('${zone}', ${block.id})" class="btn-glass" style="width:auto; padding:5px; background:#ff4444; color:white; border-color: #ff4444;" title="Törlés">🗑</button>
            </div>
        `;

        container.appendChild(div);
    });

}



window.toggleCommonZone = function (zone, isChecked) {
    if (!myCelestialConf.userData) initUserData();

    // Biztosítjuk, hogy létezzen a zoneFlags
    if (!myCelestialConf.userData.uiState.zoneFlags) {
        myCelestialConf.userData.uiState.zoneFlags = {};
    }

    // 1. Flag mentése
    const flagKey = (zone === 'top') ? 'topCommon' : 'bottomCommon';
    myCelestialConf.userData.uiState.zoneFlags[flagKey] = isChecked;

    // 2. Szerkesztő Kontextus Váltása
    if (isChecked) {
        if (window.switchTextContext) window.switchTextContext('common');
    } else {
        const activeId = myCelestialConf.userData.uiState.activePhotoId;
        const targetContext = (activeId) ? `photo_${activeId}` : 'map';
        if (window.switchTextContext) window.switchTextContext(targetContext);
    }

    // --- JAVÍTÁS ITT: A lista frissítése (hogy megjelenjen a Közös opció) ---
    if (window.updateElementSelectorUI) {
        window.updateElementSelectorUI();
    }

    // 4. Vászon frissítése
    window.renderFixedTexts();
}


window.renderPhotoTextSelector = function () {
    // 1. Biztonsági ellenőrzés
    if (!window.myCelestialConf || !myCelestialConf.userData) return;

    // Adatszerkezet biztosítása
    if (!myCelestialConf.userData.uiState) myCelestialConf.userData.uiState = { zoneFlags: {} };
    if (!myCelestialConf.userData.uiState.zoneFlags) myCelestialConf.userData.uiState.zoneFlags = {};

    const container = document.getElementById('photo-text-selector-container');
    if (!container) return;

    // 2. Adatok közvetlen elérése
    const uiState = myCelestialConf.userData.uiState;
    const currentCtx = uiState.currentTextContext;
    const elements = myCelestialConf.userData.elements || [];
    const flags = uiState.zoneFlags;

    // --- LOGIKA: Mutassuk-e a Közöst? ---
    // Akkor mutatjuk, ha:
    // A) Bármelyik kapcsoló (top/bottom) be van pipálva (igaz értékű)
    // B) VAGY éppen a közös szerkesztőben vagyunk
    const isTopCommon = !!flags.topCommon;       // !! konvertálja boolean-re
    const isBottomCommon = !!flags.bottomCommon;

    const showCommonOption = (isTopCommon || isBottomCommon || currentCtx === 'common');

    // Konténer stílus
    container.style.cssText = "margin-bottom: 15px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 8px; border-left: 4px solid var(--accent-purple); display: block;";

    let optionsHTML = '';

    // 1. KÖZÖS OPCIÓ HOZZÁADÁSA (Ha a feltétel igaz)
    if (showCommonOption) {
        const selected = (currentCtx === 'common') ? 'selected' : '';
        optionsHTML += `<option value="common" ${selected}>🔗 Közös szerkesztő (Minden kép)</option>`;
    }

    // 2. ELEMEK LISTÁZÁSA
    elements.forEach((el, index) => {
        let val = "";
        let label = "";
        let posText = "";

        // Pozíció szöveg
        if (elements.length === 1) posText = "(Közép)";
        else if (elements.length === 2) posText = (index === 0) ? "(Bal)" : "(Jobb)";
        else if (elements.length >= 3) {
            if (index === 0) posText = "(Bal)";
            else if (index === elements.length - 1) posText = "(Jobb)";
            else posText = "(Közép)";
        }

        if (el.type === 'map') {
            val = 'map';
            label = `✨ Csillagtérkép ${posText}`;
        } else if (el.subType === 'moon') {
            val = `photo_${el.id}`;
            label = `🌔 Holdfázis ${posText}`;
        } else {
            val = `photo_${el.id}`;
            label = `📷 Saját Fotó ${posText}`;
        }

        const selected = (currentCtx === val) ? 'selected' : '';
        optionsHTML += `<option value="${val}" ${selected}>${label}</option>`;
    });

    // RENDERELÉS
    container.innerHTML = `
        <div class="setting-group" style="margin-bottom:0;">
            <label style="font-size:12px; color:#aaa; font-weight:bold; margin-bottom:5px; display:block;">Szerkesztett Szöveg Oldala:</label>
            <select onchange="window.switchTextContext(this.value)" style="width:100%; padding:8px; background:rgba(0,0,0,0.3); color:white; border:1px solid #444; border-radius:4px; font-weight:bold; cursor: pointer;">
                ${optionsHTML}
            </select>
        </div>
    `;
};
function getCurrentZoneData(zone) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (!myCelestialConf.userData.zones[currentTextContext]) return null;
    return myCelestialConf.userData.zones[currentTextContext][zone];
}

window.toggleDataBlock = function (zone, tag) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;

    if (!myCelestialConf.userData.zones[currentTextContext]) return;
    const data = myCelestialConf.userData.zones[currentTextContext][zone];

    // Megnézzük, létezik-e már ilyen blokk
    const existingIndex = data.blocks.findIndex(b => b.tag === tag);

    if (existingIndex !== -1) {
        // HA VAN -> TÖRLJÜK
        data.blocks.splice(existingIndex, 1);
        renderZoneUI(zone);
        window.renderFixedTexts();
    } else {
        // HA NINCS -> HOZZÁADJUK (Okos tartalom generálással)

        // Alapértékek
        let content = "Adat";
        let font = "Space Grotesk";
        let size = 32;
        let weight = "normal";

        // Megpróbáljuk kinyerni az aktív elem adatait a számításhoz
        const activeId = (currentTextContext.startsWith('photo_')) ? currentTextContext.split('_')[1] : null;
        const activeEl = activeId ? myCelestialConf.userData.elements.find(e => e.id == activeId) : null;

        // --- TARTALOM MEGHATÁROZÁSA CÍMKÉK ALAPJÁN ---
        // 0. Friss metaadatok lekérése a Térképhez
        const meta = getMapMetaData();
        // 1. Általános címkék
        if (tag === 'location') {
            // content = activeEl ? (activeEl.moonLocationName || myCelestialConf.Varos || "Budapest") : "Budapest";
            // size = 50; weight = "bold";
            // Ha van aktív fotó/hold elem, és van neve, használd azt, különben a térkép adatát
            content = (activeEl && activeEl.moonLocationName) ? activeEl.moonLocationName : meta.location;
            size = 50; weight = "bold";
        }
        else if (tag === 'date') {
            // content = "2024. 01. 01."; // Fallback
            if (activeEl && activeEl.moonDate) {
                const d = new Date(activeEl.moonDate);
                content = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
            } else {
                // Térkép dátum
                content = meta.date;
            }
        }
        else if (tag === 'coords') {
            if (activeEl && activeEl.moonLat !== undefined) {
                // ... (Hold koord logika marad változatlan) ...
                const latText = Math.abs(activeEl.moonLat).toFixed(4) + "° " + (activeEl.moonLat >= 0 ? "N" : "S");
                const lngText = Math.abs(activeEl.moonLng).toFixed(4) + "° " + (activeEl.moonLng >= 0 ? "E" : "W");
                content = `${latText}, ${lngText}`;
                font = "Montserrat"; size = 24; weight = "300";
            } else {
                // Térkép koordináta (EZT JAVÍTOTTUK)
                content = meta.coords;
                font = "Montserrat"; size = 24; weight = "300";
            }
        }

        // 2. Hold specifikus címkék (ÚJ!)
        else if (tag.startsWith('moon_') && activeEl && activeEl.moonDate) {
            // Számoljuk újra az adatokat a mentett dátum/idő alapján
            const dStr = activeEl.moonDate;
            const tStr = activeEl.moonTime || "12:00";
            const dateObj = new Date(dStr + 'T' + tStr + ':00Z');
            const phaseData = calculateMoonData(dateObj);

            if (tag === 'moon_phase') {
                content = getPhaseName(phaseData.cycle);
                font = "Playfair Display"; size = 40; weight = "bold";
            }
            else if (tag === 'moon_illum') {
                content = `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`;
                font = "Montserrat"; size = 24;
            }
            else if (tag === 'moon_age') {
                content = `Hold kora: ${phaseData.age.toFixed(1)} nap`;
                font = "Space Grotesk"; size = 24;
            }
            else if (tag === 'moon_zodiac') {
                content = `Csillagjegy: ${getZodiacSign(phaseData.cycle)}`;
                font = "Space Grotesk"; size = 24;
            }
            else if (tag === 'moon_nextnew' || tag === 'moon_nextfull') {
                const daysToNew = (1 - phaseData.cycle) * 29.53;
                const daysToFull = (phaseData.cycle < 0.5) ? (0.5 - phaseData.cycle) * 29.53 : (1.5 - phaseData.cycle) * 29.53;

                const targetDate = (tag === 'moon_nextnew')
                    ? new Date(dateObj.getTime() + daysToNew * 86400000)
                    : new Date(dateObj.getTime() + daysToFull * 86400000);

                const dateStr = targetDate.getFullYear() + ". " + (targetDate.getMonth() + 1).toString().padStart(2, '0') + ". " + targetDate.getDate().toString().padStart(2, '0') + ".";

                content = (tag === 'moon_nextnew') ? `Következő Újhold: ${dateStr}` : `Következő Telihold: ${dateStr}`;
                font = "Space Grotesk"; size = 24;
            }
        }

        // Új blokk beszúrása
        const newBlock = {
            id: Date.now() + Math.random(),
            isNewLine: true,
            tag: tag,
            content: content,
            font: font,
            size: size,
            weight: weight,
            color: "#e8edf5",
            alignH: "middle",
            isSettingsOpen: false,
            calculated: { x: 0, y: 0 }
        };

        data.blocks.push(newBlock);
        renderZoneUI(zone);
        window.renderFixedTexts();
    }
}
window.applyTextTemplate = function (zone, text) {
    if (!text) return;
    const data = getCurrentZoneData(zone);
    data.blocks.push({ id: Date.now() + Math.random(), isNewLine: true, content: text, font: "Great Vibes", size: (zone === 'top' ? 80 : 50), weight: "normal", color: "#e8edf5", alignH: "middle", calculated: { x: 0, y: 0 } });
    renderZoneUI(zone); window.renderFixedTexts();
}

window.setZoneAlign = function (zone, align) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (!myCelestialConf.userData.zones[currentTextContext]) myCelestialConf.userData.zones[currentTextContext] = { top: { blocks: [] }, bottom: { blocks: [] } };
    if (!myCelestialConf.userData.zones[currentTextContext][zone]) myCelestialConf.userData.zones[currentTextContext][zone] = { blocks: [] };
    myCelestialConf.userData.zones[currentTextContext][zone].align = align;
    const marginCont = document.getElementById(`zone-${zone}-margin-container`);
    if (marginCont) marginCont.style.display = (align === 'top' || align === 'bottom') ? 'block' : 'none';
    window.renderFixedTexts();
    console.log("window.setZoneAlign = function (zone, align) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}

window.updateZoneMargin = function (zone, val) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (!myCelestialConf.userData.zones[currentTextContext][zone]) myCelestialConf.userData.zones[currentTextContext][zone] = { blocks: [] };
    myCelestialConf.userData.zones[currentTextContext][zone].margin = parseFloat(val) || 0;
    window.renderFixedTexts();
    console.log("window.updateZoneMargin = function (zone, val) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}


window.insertBlockAt = function (zone, index, isNewLine) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const blocks = myCelestialConf.userData.zones[currentTextContext][zone].blocks;

    // Alapértelmezett beállítások
    const newBlock = {
        id: Date.now(),
        content: "Szöveg",
        size: 40,
        font: "Space Grotesk", // Vagy vedd az elsőt a listából
        color: "#ffffff",
        isNewLine: isNewLine,  // Ez a kulcs: Ha false, akkor ugyanabba a sorba kerül
        alignH: "middle",      // Alapértelmezetten középre, de most már állítható lesz
        marginSide: 0
    };

    // Kivétel kezelés: Ha még nincs semmi, az első elemnek muszáj Új Sornak lennie
    if (blocks.length === 0) {
        newBlock.isNewLine = true;
    }
    // Ha a legelső helyre szúrunk be (-1 index), az is mindig Új Sor
    else if (!isNewLine && index === -1) {
        newBlock.isNewLine = true;
    }

    if (index === -1) {
        blocks.unshift(newBlock);
    } else {
        // Beszúrás a megadott index után
        blocks.splice(index + 1, 0, newBlock);
    }

    // UI és Vászon frissítése
    renderZoneUI(zone);
    window.renderFixedTexts();
    console.log("window.insertBlockAt = function (zone, index, isNewLine) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
};
window.removeBlock = function (zone, id) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const data = myCelestialConf.userData.zones[currentTextContext][zone];
    data.blocks = data.blocks.filter(b => b.id !== id);
    renderZoneUI(zone); window.renderFixedTexts();
    console.log("window.removeBlock = function (zone, id) {");
    if (window.triggerAutoSave) window.triggerAutoSave();
}


window.updateBlockContentAndPreview = function (zone, id, newValue) {
    if (!myCelestialConf.userData) initUserData();

    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const zoneData = myCelestialConf.userData.zones[currentTextContext] && myCelestialConf.userData.zones[currentTextContext][zone];

    if (!zoneData) return;

    // Megkeressük a blokkot
    let block = zoneData.blocks.find(b => b.id == id);

    // Fallback, ha valamiért nem találná ID alapján
    if (!block && zoneData.blocks.length === 1) {
        block = zoneData.blocks[0];
    }

    if (block) {
        if (block.tag) { block.tag = null; }

        block.content = newValue;

        // 1. KÉP FRISSÍTÉSE
        window.renderFixedTexts();

        // 2. LISTA AZONNALI FRISSÍTÉSE (DOM manipulációval)
        // Megkeressük a hozzá tartozó legördülő menüt
        const select = document.getElementById(`font-select-${block.id}`);
        if (select) {
            // Levágjuk a szöveget, hogy kiférjen
            let previewText = newValue.trim() || "Minta";
            if (previewText.length > 25) previewText = previewText.substring(0, 25) + "...";

            // Végigmegyünk az összes opción és átírjuk a szövegét
            for (let i = 0; i < select.options.length; i++) {
                select.options[i].text = previewText;
            }
        }
    } else {
        renderZoneUI(zone);
    }
}
window.updateBlockData = function (zone, id, key, value) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const block = myCelestialConf.userData.zones[currentTextContext][zone].blocks.find(b => b.id === id);
    if (block) {
        if (key === 'size') block[key] = parseInt(value);
        else if (key === 'marginSide') block[key] = parseFloat(value) || 0;
        else block[key] = value;
        window.renderFixedTexts();
        if (key !== 'content') renderZoneUI(zone);
        console.log("window.updateBlockData = function (zone, id, key, value) {");
        if (window.triggerAutoSave) window.triggerAutoSave();
    }
}

// --- JAVÍTOTT: updateDesignerFromCelestial (Minden zónát a SAJÁT adataival frissít) ---
window.updateDesignerFromCelestial = function () {
    if (!myCelestialConf || !myCelestialConf.userData) return;

    const zones = myCelestialConf.userData.zones;
    const elements = myCelestialConf.userData.elements;

    // Végigmegyünk az összes definiált zónán
    Object.keys(zones).forEach(zoneKey => {
        let targetElement = null;

        // 1. Megkeressük, melyik elemhez tartozik ez a zóna
        if (zoneKey.startsWith('map_')) {
            const id = zoneKey.replace('map_', '');
            targetElement = elements.find(e => e.id == id);
        } else if (zoneKey === 'map') {
            targetElement = elements.find(e => e.id === 'main-map') || elements.find(e => e.type === 'map');
        }
        // A fotókat nem kell innen frissíteni, azoknak saját logikája van, 
        // de ha a 'coords' címkét használják, akkor itt is kezelhetnénk őket. 
        // Most fókuszáljunk a térképekre.

        if (targetElement && targetElement.type === 'map') {
            // 2. Lekérjük a SPECIFIKUS adatokat ehhez az elemhez
            const meta = getMapMetaData(targetElement);

            // 3. Frissítjük a blokkokat
            ['top', 'bottom'].forEach(side => {
                if (zones[zoneKey][side]) {
                    let needsRerender = false;
                    zones[zoneKey][side].blocks.forEach(block => {
                        if (block.tag === 'date' && block.content !== meta.date) {
                            block.content = meta.date;
                            updateTextareaIfVisible(block.id, meta.date);
                            needsRerender = true;
                        }
                        if (block.tag === 'location' && block.content !== meta.location) {
                            block.content = meta.location;
                            updateTextareaIfVisible(block.id, meta.location);
                            needsRerender = true;
                        }
                        if (block.tag === 'coords' && block.content !== meta.coords) {
                            block.content = meta.coords;
                            updateTextareaIfVisible(block.id, meta.coords);
                            needsRerender = true;
                        }
                    });
                }
            });
        }
    });

    window.renderFixedTexts();
};

// Segédfüggvény a textarea frissítéséhez (hogy ne ugráljon a kurzor, ha épp ír)
function updateTextareaIfVisible(id, newVal) {
    const ta = document.getElementById(`textarea-${id}`);
    if (ta && document.activeElement !== ta) {
        ta.value = newVal;
    }
}
window.copyMapToDesigner = function () {
    window.updateActiveMapSnapshot();
};

window.applyDesignerTheme = function (key, variant = 'normal') {
    // Determine source side based on visibility
    let side = 'right';
    if ($("#fragment-5").is(":visible")) side = 'left';

    if ($("#fragment-5").is(":visible")) side = 'left';

    // console.log(`🪲 [DEBUG] applyDesignerTheme called. key=${key}, variant=${variant}, detectedSide=${side}`);
    /*if (typeof window.logDebug === 'function') window.logDebug(`DEBUG_APPLY: key=${key}, side=${side}`);*/

    if (typeof window.loadTheme === 'function') window.loadTheme(key, variant, side);
}

window.updateCanvasBackground = function (color) {
    // console.log(`🪲 [DEBUG] updateCanvasBackground called. Color: ${color}`);
    // 1. Tervező és Szerkesztő hátterének beállítása
    const mapWrap = document.getElementById('map-wrap');
    if (mapWrap) mapWrap.style.background = color;

    // 1. DOM és vizuális háttér
    const dSvg = document.getElementById('designer-svg');
    if (dSvg) dSvg.style.background = color; // CSS-ben a gradiens működik

    // --- ÚJ: Scope alapú mentés (dobozokhoz) ---
    const scope = document.querySelector('input[name="bg-scope"]:checked')?.value || 'individual';
    //console.log(`Setting Background. Color: ${color}, Scope: ${scope}`);

    if (!myCelestialConf.userData) initUserData();
    if (!myCelestialConf.userData.elements) myCelestialConf.userData.elements = [];

    // Global background (fallback)
    myCelestialConf.userData.canvas.background = color;

    if (scope === 'common') {
        // MINDEN térkép elem hátterét beállítjuk
        myCelestialConf.userData.elements.forEach(el => {
            if (el.type === 'map') {
                el.localBackground = color;
            }
        });
        //console.log("Background set for ALL elements.");
    } else {
        // CSAK a kijelölt elem
        const activeId = myCelestialConf.userData.uiState.selectedElementId;
        const el = myCelestialConf.userData.elements.find(e => e.id === activeId);
        if (el && el.type === 'map') {
            el.localBackground = color;
            //console.log(`Background set for INDIVIDUAL element: ${activeId}`);
        } else {
            // Ha nincs kijelölt, vagy nem map, akkor a globálist már beállítottuk
        }
    }

    // Frissítsük a renderelést, hogy látsszon az elem háttere is
    window.refreshMapTransform();



    // 2. Export háttér rect (csak szín esetén működik jól itt, gradiensnél az exportáló intézi)
    const bgRect = document.getElementById('designer-background-rect');
    if (bgRect && !color.includes("gradient")) {
        bgRect.setAttribute('fill', color);
    }

    // 3. Adatbázis mentés - MÁR MEGTÖRTÉNT FENTEBB a scope szerint
    // myCelestialConf.userData.canvas.background = color; // Ezt már beállítottuk fallbacknek

    console.log("window.updateCanvasBackground = function (color) {");
    if (window.triggerAutoSave) window.triggerAutoSave();

    // 4. Input szinkronizálás (ha színválasztóról jött)
    const textInput = document.getElementById('canvas-bg-text');
    if (textInput && textInput.value !== color) {
        textInput.value = color;
    }

    // 5. Színválasztó (Color Picker) szinkronizálás (ÚJ)
    const picker = document.getElementById('canvas-bg-color');
    if (picker && picker.value !== color) {
        picker.value = color;
    }
}

// --- ÚJ: KIFUTÓ (BLEED) KEZELÉS ---
window.setBleedMode = function (mode) {
    // console.log(`🪲 [DEBUG] setBleedMode called. Mode: ${mode}`);
    if (!myCelestialConf.userData) initUserData();

    // 0. Update Global Config to persist state
    const storedMode = (mode === 'custom_all') ? 'custom' : mode;
    if (!myCelestialConf.userData.canvas.bleed) myCelestialConf.userData.canvas.bleed = {};
    myCelestialConf.userData.canvas.bleed.mode = storedMode;

    // 1. Hatókör meghatározása
    const bleedSelect = document.getElementById('bleed-element-selector');
    let scope = 'individual';

    // Force common scope for global modes
    if (mode === 'custom_all' || mode === 'theme' || mode === 'theme_local') {
        scope = 'common';
    }
    // Otherwise check selector (if visible/applicable)
    else if (bleedSelect && bleedSelect.value === 'common') {
        scope = 'common';
    } else if (myCelestialConf.userData.uiState.currentTextContext === 'common') {
        scope = 'common';
    }

    console.log(`[Bleed] setBleedMode calling. Mode: ${mode}, Scope: ${scope}`);

    // Helper: Apply mode to an element
    const applyToElement = (el) => {
        let effectiveMode = mode;
        if (mode === 'custom_all') effectiveMode = 'custom';

        console.log(`[Bleed] Applying to element: ${el.id}. Mode: ${effectiveMode}`);
        el.bleedMode = effectiveMode;

        if (effectiveMode === 'theme' || effectiveMode === 'theme_local') {
            // Téma módok: töröljük a lokális felülírást
            el.localBackground = null;
            el.bleedColor = null;
        } else {
            // Custom mód: beállítjuk a színt
            // Ha custom_all: mindenki megkapja a picker értékét (vagy defaultot)
            // Ha custom: megtartja a sajátját, VAGY ha nincs, kap defaultot
            const picker = document.getElementById('bleed-color-picker');
            const color = picker ? picker.value : (el.bleedColor || '#000000');

            // Csak akkor írjuk felül a bleedColor-t, ha custom_all van, VAGY ha még nincs színe
            if (mode === 'custom_all' || !el.bleedColor) {
                el.bleedColor = color;
                el.localBackground = color;
            } else {
                // Individual 'custom' switch: ensure localBackground syncs with existing bleedColor
                el.localBackground = el.bleedColor;
            }
        }
    };

    if (scope === 'common') {
        console.log("[Bleed] Applying to ALL elements.");
        myCelestialConf.userData.elements.forEach(el => applyToElement(el));
    } else {
        const activeId = myCelestialConf.userData.uiState.selectedElementId;
        console.log(`[Bleed] Applying to INDIVIDUAL element. ID: ${activeId}`);
        const el = myCelestialConf.userData.elements.find(e => e.id == activeId);
        if (el) {
            applyToElement(el);
        } else {
            console.warn(`[Bleed] Warn: Selected element with ID ${activeId} not found.`);
        }
    }

    // UI frissítése: Custom panel megjelenítése
    const panel = document.getElementById('custom-bleed-panel');
    const showPanel = (mode === 'custom' || mode === 'custom_all');
    if (panel) {
        panel.style.display = showPanel ? 'block' : 'none';
        console.log(`[Bleed] Picker visibility set to: ${showPanel ? 'BLOCK' : 'NONE'} (Mode: ${mode})`);
    }

    window.refreshMapTransform();
    if (window.updateBleedPreview) window.updateBleedPreview();
    if (window.triggerAutoSave) window.triggerAutoSave();
}

window.updateCustomBleedColor = function (color) {
    // console.log(`🪲 [DEBUG] updateCustomBleedColor called. Color: ${color}`);
    // 1. Hatókör meghatározása
    const bleedSelect = document.getElementById('bleed-element-selector');

    // Explicitly check the radio button to force Global behavior
    const customAllRadio = document.querySelector('input[name="bleed-mode"][value="custom_all"]');
    const isCustomAll = customAllRadio && customAllRadio.checked;

    let scope = 'individual';

    if (isCustomAll) {
        scope = 'common';
    } else if (bleedSelect && bleedSelect.value === 'common') {
        scope = 'common';
    }
    // Do NOT default to common from textContext if we are in explicit individual bleed mode
    // unless the selector explicitly says common.

    console.log(`[Bleed] updateCustomBleedColor calling. Color: ${color}, Scope: ${scope}, isCustomAll: ${isCustomAll}`);

    if (!myCelestialConf.userData) initUserData();

    // Ensure global mode says custom
    if (!myCelestialConf.userData.canvas.bleed) myCelestialConf.userData.canvas.bleed = {};
    myCelestialConf.userData.canvas.bleed.mode = 'custom';

    const applyColor = (el) => {
        el.bleedMode = 'custom';
        el.bleedColor = color;
        el.localBackground = color;
    };

    if (scope === 'common') {
        console.log("[Bleed] Applying COLOR to ALL elements.");
        myCelestialConf.userData.elements.forEach(el => applyColor(el));
    } else {
        const activeId = myCelestialConf.userData.uiState.selectedElementId;
        const el = myCelestialConf.userData.elements.find(e => e.id == activeId);
        console.log(`[Bleed] Applying COLOR to INDIVIDUAL element. ActiveID: ${activeId}`);
        if (el) applyColor(el);
    }

    if (typeof currentBleedGradientState !== 'undefined') currentBleedGradientState.isGradient = false;

    window.refreshMapTransform();
    if (window.triggerAutoSave) window.triggerAutoSave();
    if (window.updateBleedPreview) window.updateBleedPreview();

    const colorInput = document.getElementById('canvas-bg-color');
    if (colorInput) {
        let hex = color.startsWith('#') ? color : "#000000";
        if (color.includes("gradient")) {
            const match = color.match(/#[a-fA-F0-9]{6}/);
            if (match) hex = match[0];
        }
        colorInput.value = hex;
    }
}

// Kifutó élőnézet frissítése - SMART BLEED APPROACH
window.updateBleedPreview = function () {
    console.log(`📐 updateBleedPreview called (4-Mode Logic)`);

    const wrapper = document.getElementById('canvas-wrapper');
    const container = document.getElementById('designer-canvas-area');

    if (!wrapper || !container) return;
    if (!myCelestialConf.userData) initUserData();

    // Remove old preview
    window.removeBleedPreview();

    const elements = myCelestialConf.userData.elements;

    // Check if we need to draw anything at all.
    // Logic: If ALL elements are 'theme' (classic), and we want the classic look (no rects),
    // we should return.
    const hasVisibleBleed = elements.some(el => el.bleedMode === 'theme_local' || el.bleedMode === 'custom');

    if (!hasVisibleBleed) {
        console.log("📐 No explicit bleed rects needed (Classic Theme mode).");
        return;
    }

    // Create Container
    const bleedContainer = document.createElement('div');
    bleedContainer.id = 'bleed-preview-bg';
    bleedContainer.style.position = 'absolute';
    bleedContainer.style.top = '0';
    bleedContainer.style.left = '0';
    bleedContainer.style.width = '100%';
    bleedContainer.style.height = '100%';
    bleedContainer.style.pointerEvents = 'none';
    bleedContainer.style.zIndex = '0';

    wrapper.insertBefore(bleedContainer, wrapper.firstChild);

    const count = elements.length || 1;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';

    // Bleed sizes (approximate 3mm -> px)
    const bleedPxWidth = (3 / 210) * wrapper.clientWidth;
    const bleedPxHeight = (3 / 297) * wrapper.clientHeight;

    const wrapperWidthPx = wrapper.clientWidth;
    const wrapperHeightPx = container.clientHeight;

    const slotW = (layoutDir === 'row') ? (wrapperWidthPx / count) : wrapperWidthPx;
    const slotH = (layoutDir === 'column') ? (wrapperHeightPx / count) : wrapperHeightPx;

    elements.forEach((el, idx) => {
        const mode = el.bleedMode || 'theme';
        if (mode === 'theme') {
            // Classic mode: No rect.
            return;
        }

        let color = '#000000';
        const globalTheme = myCelestialConf.userData.canvas.background || '#0a0e27';

        if (mode === 'theme_local') {
            color = globalTheme;
        } else if (mode === 'custom') {
            const globalCustom = (myCelestialConf.userData.canvas.bleed && myCelestialConf.userData.canvas.bleed.customColor) || '#000000';
            color = el.bleedColor || el.localBackground || globalCustom;
        }

        let baseX = (layoutDir === 'row') ? (idx * slotW) : 0;
        let baseY = (layoutDir === 'column') ? (idx * slotH) : 0;

        let bLeft = 0, bRight = 0, bTop = 0, bBottom = 0;

        if (layoutDir === 'row') {
            bTop = bleedPxHeight;
            bBottom = bleedPxHeight;
            if (idx === 0) bLeft = bleedPxWidth;
            if (idx === count - 1) bRight = bleedPxWidth;
        } else { // column
            bLeft = bleedPxWidth;
            bRight = bleedPxWidth;
            if (idx === 0) bTop = bleedPxHeight;
            if (idx === count - 1) bBottom = bleedPxHeight;
        }

        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${baseX - bLeft}px`;
        div.style.top = `${baseY - bTop}px`;
        div.style.width = `${slotW + bLeft + bRight}px`;
        div.style.height = `${slotH + bTop + bBottom}px`;
        div.style.backgroundColor = color;
        div.style.zIndex = '-1';

        if (color && color.includes('gradient')) {
            div.style.background = color;
        }

        bleedContainer.appendChild(div);
    });
};

function initDesignerTemplates() {
    const container = document.getElementById('designer-templates-grid'); if (!container) return; container.innerHTML = '';
    const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : designerThemes;
    for (const [key, theme] of Object.entries(themesSource)) {
        const createCard = (variant) => {
            const isHeart = (variant === 'heart');
            const card = document.createElement('div'); card.className = 'theme-item';
            const preview = document.createElement('div'); preview.className = 'theme-preview-img';
            let imgUrl = theme.image; if (isHeart && imgUrl) imgUrl = imgUrl.replace('.png', '_heart.png');
            if (imgUrl) preview.style.background = `url('${imgUrl}') center/contain no-repeat, ${theme.background}`; else preview.style.background = theme.background;
            const label = document.createElement('div'); label.className = "theme-btn"; label.innerText = isHeart ? `♥ ${theme.name}` : theme.name;
            if (isHeart) { label.style.color = "#d81b60"; label.style.background = "#fff0f5"; }
            card.onclick = function () { if (typeof window.applyDesignerTheme === 'function') window.applyDesignerTheme(key, variant); };
            card.appendChild(label); card.appendChild(preview); return card;
        };
        container.appendChild(createCard('normal')); container.appendChild(createCard('heart'));
    }
}



// --- JAVÍTOTT EXPORTÁLÁS (Kifutó + Színjavítás + Gradiens Illesztés) ---
async function exportCanvas(format, previewCallback, forPreview) {
    if (!getDOMElements()) {
        alert("Hiba: A tervező elem nem található.");
        return;
    }
    document.body.style.cursor = 'wait';

    try {
        console.log("async function exportCanvas(format, previewCallback) {");
        // 1. EREDETI MÉRETEK
        const vb = designerSVG.viewBox.baseVal;
        const origWidth = vb.width;
        const origHeight = vb.height;
        const origX = vb.x;
        const origY = vb.y;

        // --- JAVÍTOTT HÁTTÉR KINYERÉS (Computed Style) ---
        // Ez pontosabban adja vissza azt a színt, amit a felhasználó lát
        const computedStyle = window.getComputedStyle(designerSVG);
        let bgStyle = computedStyle.backgroundImage;

        // Ha nincs background-image (tehát nem gradiens, hanem sima szín), akkor background-color kell
        if (!bgStyle || bgStyle === 'none') {
            bgStyle = computedStyle.backgroundColor || "#0a0e27";
        } else {
            // Ha gradiens, a böngésző gyakran visszaadja így: "linear-gradient(...)"
            // Nézzük meg, van-e elmentett érték a configban, mert az néha tisztább (pl. hex kódok)
            if (myCelestialConf.userData && myCelestialConf.userData.canvas.background) {
                bgStyle = myCelestialConf.userData.canvas.background;
            }
        }

        // --- KIFUTÓ (BLEED) SZÁMÍTÁSA ---
        const widthInput = document.getElementById('canvas-width');

        // Egy lap mérete cm-ben
        const singlePageWidthCm = parseFloat(widthInput ? widthInput.value : 21);

        // Teljes szélesség cm-ben (elemek számától függően)
        const elements = myCelestialConf.userData.elements;
        const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
        const count = elements.length > 0 ? elements.length : 1;

        let totalWidthCm = singlePageWidthCm;
        if (layoutDir === 'row') totalWidthCm = singlePageWidthCm * count;

        // Pixel / CM arány
        const pxPerCm = origWidth / totalWidthCm;

        // 2 cm kifutó pixelben
        const bleedCm = forPreview ? 0 : 2;
        const bleedPx = bleedCm * pxPerCm;

        // console.log(`Export Kifutó: ${bleedCm} cm = ${bleedPx.toFixed(1)} px`);

        // 2. STÍLUSOK ÉS FONTOK BEÁGYAZÁSA
        let finalCSS = "";

        // Google Fonts letöltése és beágyazása (Base64)
        if (typeof availableFonts !== 'undefined' && availableFonts.length > 0) {
            try {
                const families = availableFonts.map(f => f.replace(/ /g, '+')).join('&family=');
                const fontUrl = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;

                const response = await fetch(fontUrl);
                if (response.ok) {
                    let cssText = await response.text();

                    // Megkeressük benne a .woff2 linkeket
                    const urlRegex = /url\((https?:\/\/[^)]+)\)/g;
                    let match;
                    const urlsToFetch = [];

                    while ((match = urlRegex.exec(cssText)) !== null) {
                        let cleanUrl = match[1].replace(/['"]/g, '');
                        if (!urlsToFetch.includes(cleanUrl)) {
                            urlsToFetch.push(cleanUrl);
                        }
                    }

                    // Letöltjük a font fájlokat és Base64-re alakítjuk
                    for (const fontFileUrl of urlsToFetch) {
                        try {
                            const fontRes = await fetch(fontFileUrl);
                            const fontBlob = await fontRes.blob();

                            const base64Data = await new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve(reader.result);
                                reader.onerror = reject;
                                reader.readAsDataURL(fontBlob);
                            });

                            cssText = cssText.split(fontFileUrl).join(base64Data);

                        } catch (err) {
                            console.warn("Nem sikerült beágyazni egy fontot:", fontFileUrl);
                        }
                    }

                    finalCSS += cssText + "\n";
                }
            } catch (e) {
                console.warn("Hiba a fontok beágyazásakor:", e);
            }
        }

        // Helyi stílusok másolása
        const sheets = document.styleSheets;
        for (let i = 0; i < sheets.length; i++) {
            try {
                if (!sheets[i].href || sheets[i].href.includes(location.origin)) {
                    const rules = sheets[i].cssRules;
                    if (rules) {
                        for (let j = 0; j < rules.length; j++) {
                            finalCSS += rules[j].cssText + "\n";
                        }
                    }
                }
            } catch (e) { }
        }

        // 3. SVG KLÓNOZÁSA ÉS MÉRETEZÉS KIFUTÓVAL
        const svgClone = designerSVG.cloneNode(true);
        // Okospontok eltávolítása a nyomtatásból
        const smartPointsInClone = svgClone.querySelectorAll('.smartpoint-element');
        smartPointsInClone.forEach(el => el.remove());

        // ÚJ ViewBox beállítása (Kifutóval növelve)
        // Balra és Fentre eltoljuk negatívba (newX, newY), és megnöveljük a méretet
        const newX = origX - bleedPx;
        const newY = origY - bleedPx;
        const newWidth = origWidth + (2 * bleedPx);
        const newHeight = origHeight + (2 * bleedPx);

        svgClone.setAttribute("viewBox", `${newX} ${newY} ${newWidth} ${newHeight}`);
        svgClone.setAttribute("width", newWidth);
        svgClone.setAttribute("height", newHeight);

        // Stílus beszúrása
        const styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = finalCSS;
        svgClone.insertBefore(styleElement, svgClone.firstChild);

        // 4. HÁTTÉR ÉS KIFUTÓ KEZELÉSE (PER-ELEMENT LOCALBACKGROUND TÁMOGATÁSSAL)
        let defs = svgClone.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svgClone.insertBefore(defs, styleElement.nextSibling);
        }

        // Bleed beállítások lekérése
        const bleedSettings = myCelestialConf.userData.canvas.bleed || { mode: 'theme', customColor: '#000000' };
        // console.log(`📐 Export: bleedMode=${bleedSettings.mode}, customColor=${bleedSettings.customColor}`);

        // Segédfüggvény: SVG gradiens létrehozása CSS stringből
        const createSVGGradient = (colorStyle, rectX, rectY, rectW, rectH, gradientIdPrefix) => {
            if (!colorStyle.includes('gradient')) {
                return { fill: colorStyle, gradient: null };
            }

            const gradId = gradientIdPrefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
            const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            gradient.setAttribute("id", gradId);
            gradient.setAttribute("gradientUnits", "userSpaceOnUse");

            // Szög kinyerése
            let angleDeg = 180;
            const angleMatch = colorStyle.match(/(\d+)deg/);
            if (angleMatch) angleDeg = parseInt(angleMatch[1]);

            // Koordináták számítása a megadott rect-hez
            const cx = rectX + rectW / 2;
            const cy = rectY + rectH / 2;
            const rad = (angleDeg - 90) * (Math.PI / 180);
            const dx = Math.cos(rad);
            const dy = Math.sin(rad);
            const w2 = rectW / 2;
            const h2 = rectH / 2;
            const corners = [{ x: -w2, y: -h2 }, { x: w2, y: -h2 }, { x: w2, y: h2 }, { x: -w2, y: h2 }];
            let minProj = Infinity, maxProj = -Infinity;
            corners.forEach(p => {
                const proj = p.x * dx + p.y * dy;
                if (proj < minProj) minProj = proj;
                if (proj > maxProj) maxProj = proj;
            });

            gradient.setAttribute("x1", cx + minProj * dx);
            gradient.setAttribute("y1", cy + minProj * dy);
            gradient.setAttribute("x2", cx + maxProj * dx);
            gradient.setAttribute("y2", cy + maxProj * dy);

            // Színek parszolása
            const regex = /(#[a-fA-F0-9]{6})\s*(\d+%)?/g;
            let match, stopIndex = 0;
            while ((match = regex.exec(colorStyle)) !== null) {
                const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                let offset = match[2] || ((stopIndex === 0) ? "0%" : "100%");
                stop.setAttribute("offset", offset);
                stop.setAttribute("stop-color", match[1]);
                gradient.appendChild(stop);
                stopIndex++;
            }

            return { fill: `url(#${gradId})`, gradient: gradient };
        };

        // Bleed réteg csoport
        const bleedLayerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        bleedLayerGroup.setAttribute("id", "export-bleed-layer");

        // Slot méretek számítása
        const slotW = layoutDir === 'row' ? origWidth / count : origWidth;
        const slotH = layoutDir === 'column' ? origHeight / count : origHeight;

        // console.log(`📐 Export: layoutDir=${layoutDir}, count=${count}, slotW=${slotW.toFixed(1)}, slotH=${slotH.toFixed(1)}`);

        // Ha custom bleed mode, egyetlen nagy háttér rect a custom színnel
        if (bleedSettings.mode === 'custom') {
            // console.log(`📐 Export: Using CUSTOM bleed color: ${bleedSettings.customColor}`);

            // 1. Custom bleed rect - covers the entire export area (with bleed margins)
            const bleedRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            bleedRect.setAttribute("x", newX);
            bleedRect.setAttribute("y", newY);
            bleedRect.setAttribute("width", newWidth);
            bleedRect.setAttribute("height", newHeight);
            bleedRect.setAttribute("id", "export-bleed-custom");

            const bleedGradResult = createSVGGradient(bleedSettings.customColor, newX, newY, newWidth, newHeight, 'bleed-custom');
            if (bleedGradResult.gradient) defs.appendChild(bleedGradResult.gradient);
            bleedRect.setAttribute("fill", bleedGradResult.fill);
            bleedLayerGroup.appendChild(bleedRect);

            // 2. Canvas content background rect - covers only the original content area (on top of bleed)
            const canvasBgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            canvasBgRect.setAttribute("x", origX);
            canvasBgRect.setAttribute("y", origY);
            canvasBgRect.setAttribute("width", origWidth);
            canvasBgRect.setAttribute("height", origHeight);
            canvasBgRect.setAttribute("id", "export-background-canvas-custom");

            const canvasGradResult = createSVGGradient(bgStyle, origX, origY, origWidth, origHeight, 'bg-canvas-custom');
            if (canvasGradResult.gradient) defs.appendChild(canvasGradResult.gradient);
            canvasBgRect.setAttribute("fill", canvasGradResult.fill);
            bleedLayerGroup.appendChild(canvasBgRect);

            // console.log(`📐 Export: Custom mode - bleed rect at (${newX},${newY}) ${newWidth}x${newHeight}, canvas rect at (${origX},${origY}) ${origWidth}x${origHeight}`);

        } else {
            // Theme mode: per-element bleed handling
            // console.log(`📐 Export: Using THEME bleed mode (per-element localBackground)`);

            // Először rajzoljuk a teljes canvas hátteret
            const canvasBgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            canvasBgRect.setAttribute("x", newX);
            canvasBgRect.setAttribute("y", newY);
            canvasBgRect.setAttribute("width", newWidth);
            canvasBgRect.setAttribute("height", newHeight);
            canvasBgRect.setAttribute("id", "export-background-canvas");

            const canvasGradResult = createSVGGradient(bgStyle, origX, origY, origWidth, origHeight, 'bg-canvas');
            if (canvasGradResult.gradient) defs.appendChild(canvasGradResult.gradient);
            canvasBgRect.setAttribute("fill", canvasGradResult.fill);
            bleedLayerGroup.appendChild(canvasBgRect);

            // Elemenkénti bleed kezelés
            elements.forEach((el, idx) => {
                if (!el.localBackground) {
                    // console.log(`📐 Export: Element ${el.id} has no localBackground, skipping per-element bleed`);
                    return;
                }

                // console.log(`📐 Export: Element ${el.id} has localBackground: ${el.localBackground}`);

                // Elem pozíciója és mérete
                let elX, elY, elW, elH;
                if (layoutDir === 'row') {
                    elX = origX + idx * slotW;
                    elY = origY;
                    elW = slotW;
                    elH = origHeight;
                } else {
                    elX = origX;
                    elY = origY + idx * slotH;
                    elW = origWidth;
                    elH = slotH;
                }

                // Bleed területek meghatározása
                // Szélső elemek: +2cm az üres oldalra
                // Középső elemek: csak +2cm fel és le (row) vagy bal-jobb (column)
                const isFirst = idx === 0;
                const isLast = idx === count - 1;

                let bleedRectX, bleedRectY, bleedRectW, bleedRectH;

                if (layoutDir === 'row') {
                    // Vízszintes elrendezés
                    bleedRectY = elY - bleedPx; // Mindig +bleed felfelé
                    bleedRectH = elH + 2 * bleedPx; // +bleed fel és le

                    if (isFirst && isLast) {
                        // Egyetlen elem: minden irányban bleed
                        bleedRectX = elX - bleedPx;
                        bleedRectW = elW + 2 * bleedPx;
                    } else if (isFirst) {
                        // Első elem: bleed balra, de jobbra nem
                        bleedRectX = elX - bleedPx;
                        bleedRectW = elW + bleedPx;
                    } else if (isLast) {
                        // Utolsó elem: bleed jobbra, de balra nem
                        bleedRectX = elX;
                        bleedRectW = elW + bleedPx;
                    } else {
                        // Középső elem: nincs oldalsó bleed
                        bleedRectX = elX;
                        bleedRectW = elW;
                    }
                } else {
                    // Függőleges elrendezés
                    bleedRectX = elX - bleedPx; // Mindig +bleed balra
                    bleedRectW = elW + 2 * bleedPx; // +bleed bal és jobb

                    if (isFirst && isLast) {
                        // Egyetlen elem: minden irányban bleed
                        bleedRectY = elY - bleedPx;
                        bleedRectH = elH + 2 * bleedPx;
                    } else if (isFirst) {
                        // Első elem: bleed felfelé, de lefelé nem
                        bleedRectY = elY - bleedPx;
                        bleedRectH = elH + bleedPx;
                    } else if (isLast) {
                        // Utolsó elem: bleed lefelé, de felfelé nem
                        bleedRectY = elY;
                        bleedRectH = elH + bleedPx;
                    } else {
                        // Középső elem: nincs függőleges bleed
                        bleedRectY = elY;
                        bleedRectH = elH;
                    }
                }

                // console.log(`📐 Export: Element ${el.id} bleed rect: x=${bleedRectX.toFixed(1)}, y=${bleedRectY.toFixed(1)}, w=${bleedRectW.toFixed(1)}, h=${bleedRectH.toFixed(1)}`);

                // Bleed rect létrehozása az elem localBackground színével
                const elBleedRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                elBleedRect.setAttribute("x", bleedRectX);
                elBleedRect.setAttribute("y", bleedRectY);
                elBleedRect.setAttribute("width", bleedRectW);
                elBleedRect.setAttribute("height", bleedRectH);
                elBleedRect.setAttribute("id", `export-bleed-${el.id}`);

                const elGradResult = createSVGGradient(el.localBackground, elX, elY, elW, elH, `bleed-${el.id}`);
                if (elGradResult.gradient) defs.appendChild(elGradResult.gradient);
                elBleedRect.setAttribute("fill", elGradResult.fill);
                bleedLayerGroup.appendChild(elBleedRect);
            });
        }

        // Bleed réteg beszúrása a tartalom ALÁ
        let insertPoint = svgClone.firstChild;
        while (insertPoint && (insertPoint.tagName === 'defs' || insertPoint.tagName === 'style')) {
            insertPoint = insertPoint.nextSibling;
        }
        if (insertPoint) svgClone.insertBefore(bleedLayerGroup, insertPoint);
        else svgClone.appendChild(bleedLayerGroup);

        // 5. EXPORTÁLÁS
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgClone);

        if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+xmlns:xlink/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        // --- PREVIEW CALLBACK: Return source instead of downloading ---
        if (typeof previewCallback === 'function') {
            document.body.style.cursor = 'default';
            previewCallback(source);
            return;
        }

        if (format === 'svg') {
            const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            const link = document.createElement("a");
            link.download = `csillagterkep_print_bleed_${Date.now()}.svg`;
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.style.cursor = 'default';
        } else {
            // PNG Export
            const scaleFactor = 3;
            const canvas = document.createElement("canvas");
            canvas.width = newWidth * scaleFactor;
            canvas.height = newHeight * scaleFactor;
            const ctx = canvas.getContext("2d");

            const img = new Image();
            const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const link = document.createElement('a');
                const ext = format === 'jpeg' ? 'jpg' : format;
                link.download = `csillagterkep_print_bleed_${Date.now()}.${ext}`;
                link.href = canvas.toDataURL(`image/${format}`, 0.95);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                document.body.style.cursor = 'default';
            };
            img.onerror = function (e) {
                console.error("Hiba:", e);
                alert("Hiba történt a kép generálásakor.");
                document.body.style.cursor = 'default';
            };
            img.src = url;
        }

    } catch (e) {
        console.error(e);
        alert("Exportálási hiba: " + e.message);
        document.body.style.cursor = 'default';
    }
}
window.openSymbolPicker = function (event, zone, blockId) {
    event.stopPropagation(); event.preventDefault();
    activeSymbolZone = zone; activeSymbolBlockId = blockId;
    const picker = $('#symbol-picker');
    if (picker.parent().prop("tagName") !== "BODY") picker.appendTo("body");
    const rect = event.currentTarget.getBoundingClientRect();
    let left = rect.left + (rect.width / 2) - (picker.outerWidth() / 2);
    let top = rect.top - picker.outerHeight() - 10;
    if (top < 0) top = rect.bottom + 10;
    picker.css({ 'top': top + 'px', 'left': left + 'px', 'display': 'block' });
}

window.insertSymbol = function (symbol) {
    if (!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (activeSymbolZone && activeSymbolBlockId) {
        const block = myCelestialConf.userData.zones[currentTextContext][activeSymbolZone].blocks.find(b => b.id == activeSymbolBlockId);
        if (block) {
            block.content += symbol;
            window.renderFixedTexts();
            const textarea = document.getElementById(`textarea-${block.id}`);
            if (textarea) { textarea.value = block.content; textarea.focus(); } else renderZoneUI(activeSymbolZone);
        }
    }
    $('#symbol-picker').fadeOut(200);
}

function calculateMoonData(date) {
    const synodicMonth = 29.53058867;
    const knownNewMoon = new Date('2000-01-06T12:24:00Z');
    const diffTime = date.getTime() - knownNewMoon.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    let currentCycle = (diffDays / synodicMonth) % 1;
    if (currentCycle < 0) currentCycle += 1;

    const age = currentCycle * synodicMonth;
    const illumination = (1 - Math.cos(currentCycle * 2 * Math.PI)) / 2 * 100;

    return { cycle: currentCycle, age: age, illumination: illumination };
}

function getPhaseName(c) {
    if (c < 0.03 || c > 0.97) return "Újhold";
    if (c < 0.23) return "Növekvő holdsarló";
    if (c < 0.27) return "Első negyed";
    if (c < 0.47) return "Növekvő hold";
    if (c < 0.53) return "Telihold";
    if (c < 0.73) return "Fogyó hold";
    if (c < 0.77) return "Utolsó negyed";
    return "Fogyó holdsarló";
}
function getZodiacSign(c) {
    const signs = ["Bak", "Vízöntő", "Halak", "Kos", "Bika", "Ikrek", "Rák", "Oroszlán", "Szűz", "Mérleg", "Skorpió", "Nyilas"];
    return signs[Math.floor(c * 12)] || "Bak";
}

function updateMoonInfoUI(data, currentDate) {
    let phaseName = getPhaseName(data.cycle);
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };

    setTxt('moon-data-phase', phaseName);
    setTxt('moon-data-illum', data.illumination.toFixed(1) + '%');
    setTxt('moon-data-age', data.age.toFixed(1) + ' nap');

    const daysToNew = (1 - data.cycle) * 29.53;
    const daysToFull = (data.cycle < 0.5) ? (0.5 - data.cycle) * 29.53 : (1.5 - data.cycle) * 29.53;
    const nextNew = new Date(currentDate.getTime() + daysToNew * 86400000);
    const nextFull = new Date(currentDate.getTime() + daysToFull * 86400000);

    setTxt('moon-data-nextnew', nextNew.toLocaleDateString('hu-HU'));
    setTxt('moon-data-nextfull', nextFull.toLocaleDateString('hu-HU'));
    setTxt('moon-data-zodiac', getZodiacSign(data.cycle));
}

window.initMoonPreview = function () {
    const dateInput = document.getElementById('moon-date');
    if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();
    updateMoonPreview();
};


window.updateMoonPreview = function () {
    const dateInput = document.getElementById('moon-date');
    if (!dateInput) return;

    const dateStr = dateInput.value;
    const timeInput = document.getElementById('moon-time');
    const timeStr = timeInput ? timeInput.value : "12:00";
    if (!dateStr) return;

    const date = new Date(dateStr + 'T' + timeStr + ':00Z');
    const phaseData = calculateMoonData(date);
    updateMoonInfoUI(phaseData, date);

    const imgPreview = document.getElementById('moon-preview-img');
    if (imgPreview) {
        // --- ÚJ: Paraméterek átadása ---
        // ...
        // --- ITT: Temp lat/lng használata a forgatáshoz ---
        let lat = window.tempMoonLat !== undefined ? window.tempMoonLat : 47.4979;
        let lng = window.tempMoonLng !== undefined ? window.tempMoonLng : 19.0402;

        const options = {
            shadowMode: window.tempMoonShadow || 'black',
            padding: 0,
            sourceType: 'nasa'
        };
        generateMoonImage(date, lat, lng, options, function (dataURL) {
            if (imgPreview) imgPreview.src = dataURL;
        });
    }
}
function calculateMoonOrientation(date, lat, lng) {
    if (lat === undefined || lat === null) lat = 47.4979;
    if (lng === undefined || lng === null) lng = 19.0402;

    const d = (date.getTime() - Date.UTC(2000, 0, 1, 12, 0, 0)) / 86400000;
    const rad = Math.PI / 180;

    const N = (280.466 + 0.9856474 * d) % 360;
    const g_sun = (357.528 + 0.9856003 * d) % 360;
    const lambda_sun = (N + 1.915 * Math.sin(g_sun * rad) + 0.020 * Math.sin(2 * g_sun * rad)) % 360;
    const eps = (23.439 - 0.0000004 * d) * rad;

    const alpha_sun = Math.atan2(Math.cos(eps) * Math.sin(lambda_sun * rad), Math.cos(lambda_sun * rad));
    const delta_sun = Math.asin(Math.sin(eps) * Math.sin(lambda_sun * rad));

    const L = (218.316 + 13.176396 * d) % 360;
    const M = (134.963 + 13.064993 * d) % 360;
    const F = (93.272 + 13.229350 * d) % 360;

    const lambda_moon = L + 6.289 * Math.sin(M * rad);
    const beta_moon = 5.128 * Math.sin(F * rad);

    const lam_m_rad = lambda_moon * rad;
    const bet_m_rad = beta_moon * rad;

    const alpha_moon = Math.atan2(Math.sin(lam_m_rad) * Math.cos(eps) - Math.tan(bet_m_rad) * Math.sin(eps), Math.cos(lam_m_rad));
    const delta_moon = Math.asin(Math.sin(bet_m_rad) * Math.cos(eps) + Math.cos(bet_m_rad) * Math.sin(eps) * Math.sin(lam_m_rad));

    const gmst = 18.697374558 + 24.06570982441908 * d;
    const lst_rad = ((gmst * 15 + lng) % 360) * rad;
    const H = lst_rad - alpha_moon;
    const phi = lat * rad;

    const q = Math.atan2(Math.sin(H), Math.tan(phi) * Math.cos(delta_moon) - Math.sin(delta_moon) * Math.cos(H));

    const y = Math.cos(delta_sun) * Math.sin(alpha_sun - alpha_moon);
    const x = Math.sin(delta_sun) * Math.cos(delta_moon) - Math.cos(delta_sun) * Math.sin(delta_moon) * Math.cos(alpha_sun - alpha_moon);
    let chi = Math.atan2(y, x);

    return (q - chi);
}


// --- HOLD KÉP BEÁLLÍTÁSOK ---
const MOON_SOURCES = {
    'original': {
        name: "Eredeti (Lágy)",
        // IDE ÍRD BE AZ EREDETI KÉPED URL-JÉT (vagy fájlnevét)!
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
        crop: 0.92 // Ennek vastagabb fekete kerete van, többet vágunk
    },
    'nasa': {
        name: "NASA (HD)",
        // A letöltött nagy felbontású kép neve
        url: 'moon_highres.jpg',
        crop: 0.995 // Ennek vékony a kerete, alig vágunk
    }
};
window.generateMoonImage = function (date, lat, lng, options, callback) {
    // Kompatibilitás
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }
    options = options || {};

    // Paraméterek kiolvasása
    const shadowMode = options.shadowMode || 'black';
    const padding = (options.padding !== undefined) ? parseFloat(options.padding) : 20;
    // ÚJ: Képforrás kiválasztása (alapértelmezett: nasa)
    const sourceType = (options.sourceType && MOON_SOURCES[options.sourceType]) ? options.sourceType : 'nasa';

    // A kiválasztott forrás adatai
    const sourceConfig = MOON_SOURCES[sourceType];
    const imgUrl = sourceConfig.url;
    const cropFactor = sourceConfig.crop;

    const genCanvas = document.createElement('canvas');
    genCanvas.width = 3000; genCanvas.height = 3000;
    const ctx = genCanvas.getContext('2d');

    const moonImg = new Image();
    moonImg.crossOrigin = "Anonymous";
    moonImg.src = imgUrl;

    moonImg.onload = function () {
        const phaseData = calculateMoonData(date);
        const cycle = phaseData.cycle;

        let rotation = calculateMoonOrientation(date, lat, lng);
        rotation += Math.PI / 2;

        const cx = 1500, cy = 1500;
        const scaleFactor = 3000 / 2000;
        const r = 1500 - (padding * scaleFactor);

        // 1. MASZK ÉS FORGATÁS
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.translate(-cx, -cy);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.save();
        ctx.clip();

        ctx.clearRect(0, 0, 3000, 3000);

        // 2. KÉP RAJZOLÁSA (Dinamikus vágással!)
        const size = Math.min(moonImg.width, moonImg.height);
        const sSize = size * cropFactor; // Itt használjuk a configból jövő vágást
        const sx = (moonImg.width - sSize) / 2;
        const sy = (moonImg.height - sSize) / 2;

        ctx.drawImage(moonImg, sx, sy, sSize, sSize, cx - r, cy - r, r * 2, r * 2);

        // 3. ÁRNYÉK
        ctx.filter = 'blur(60px)';

        if (shadowMode === 'transparent') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = "rgba(0, 0, 0, 0.98)";
        }

        const p = cycle * 2 * Math.PI;
        // Görbület iránya (ez mindkét képnél működni fog, ha North-Up tájolásúak)
        const curveFactor = -Math.cos(p);

        ctx.beginPath();
        ctx.moveTo(cx, cy - r);

        for (let dy = -r; dy <= r; dy += 10) {
            const circleW = Math.sqrt(r * r - dy * dy);
            const x = cx + curveFactor * circleW;
            ctx.lineTo(x, cy + dy);
        }

        if (cycle < 0.5) ctx.arc(cx, cy, r + 60, Math.PI * 0.5, Math.PI * 1.5, false);
        else ctx.arc(cx, cy, r + 60, Math.PI * 0.5, Math.PI * 1.5, true);

        ctx.fill();
        ctx.restore();

        // 4. TISZTÍTÁS
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.restore();

        const dataURL = genCanvas.toDataURL('image/png');
        if (callback) callback(dataURL, phaseData);
    };

    moonImg.onerror = function () {
        console.error(`Hiba a kép betöltésekor: ${imgUrl}`);
        alert(`Nem sikerült betölteni a képet: ${sourceConfig.name}`);
        if (callback) callback(null, null);
    };
}


window.renderMoonControls = function (containerId, prefix) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Ha már létezik, ne duplikáljuk
    if (document.getElementById(`${prefix}-moon-controls`)) return;

    const div = document.createElement('div');
    div.id = `${prefix}-moon-controls`;
    div.className = 'setting-group';
    // Kis igazítás, hogy simuljon a környezetbe
    div.style.marginTop = '5px';
    div.style.paddingTop = '5px';
    div.style.borderTop = '1px solid #444';

    div.innerHTML = `
        <div style="margin-bottom:5px;">
            <label style="font-size:11px; margin-bottom:5px;">Árnyék Mód:</label>
            <div style="display:flex; gap:5px;">
                <button id="${prefix}-btn-shadow-black" class="btn-glass btn-glass-primary" style="flex:1; padding:6px; font-size:11px;">🌑 Sötét</button>
                <button id="${prefix}-btn-shadow-trans" class="btn-glass btn-glass-secondary" style="flex:1; padding:6px; font-size:11px;">◐ Átlátszó</button>
            </div>
        </div>
    `;
    container.appendChild(div);
}


window.addMoonElement = function (side) {
    // 1. Adatok begyűjtése az inputokból
    const dateInput = document.getElementById('moon-date');
    const timeInput = document.getElementById('moon-time');

    let dateStr = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    let timeStr = timeInput ? timeInput.value : "12:00";
    const date = new Date(dateStr + 'T' + timeStr + ':00Z');

    // Helyszín adatok (Temp változókból, amit az autocomplete állított be)
    let lat = window.tempMoonLat !== undefined ? window.tempMoonLat : 47.4979;
    let lng = window.tempMoonLng !== undefined ? window.tempMoonLng : 19.0402;
    let city = window.tempMoonCity || "Budapest";

    // Ha nincs temp adat, de van globális config (pl. térkép miatt), fallback
    if (window.tempMoonLat === undefined && window.myCelestialConf) {
        if (window.myCelestialConf.geopos) {
            lat = window.myCelestialConf.geopos[0];
            lng = window.myCelestialConf.geopos[1];
        }
        if (window.myCelestialConf.Varos) {
            city = window.myCelestialConf.Varos;
        }
    }

    const options = {
        shadowMode: window.tempMoonShadow || 'black',
        padding: 0,
        sourceType: 'nasa'
    };

    // 2. Kép generálása
    generateMoonImage(date, lat, lng, options, function (dataURL, phaseData) {

        // 3. Elem hozzáadása (Ez létrehozza az elemet és megnyitja a panelt - MÉG ÜRES ADATOKKAL)
        window.addNewElement('moon', dataURL, side, `Moon_${dateStr}_${timeStr}`);

        if (!myCelestialConf.userData) initUserData();
        const elements = myCelestialConf.userData.elements;
        // Az új elem megkeresése
        const newEl = (side === 'start' || side === 'left' || side === 'top') ? elements[0] : elements[elements.length - 1];

        if (newEl) {
            // 4. ADATOK MENTÉSE AZ ELEMBE (Ez eddig későn történt)
            newEl.borderWidth = 0; newEl.borderEnabled = false;
            newEl.moonDate = dateStr;
            newEl.moonTime = timeStr;
            newEl.moonLat = lat;
            newEl.moonLng = lng;
            newEl.moonLocationName = city;
            newEl.moonShadowMode = options.shadowMode;
            newEl.moonPadding = options.padding;
            newEl.moonSourceType = 'nasa';

            // Zónák létrehozása
            const zoneId = `photo_${newEl.id}`;
            if (!myCelestialConf.userData.zones[zoneId]) {
                myCelestialConf.userData.zones[zoneId] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
            }
            const topZone = myCelestialConf.userData.zones[zoneId].top;
            const bottomZone = myCelestialConf.userData.zones[zoneId].bottom;

            // Szövegek generálása
            const d = new Date(dateStr);
            const formattedDate = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
            const latText = Math.abs(lat).toFixed(4) + "° " + (lat >= 0 ? "N" : "S");
            const lngText = Math.abs(lng).toFixed(4) + "° " + (lng >= 0 ? "E" : "W");
            const coordStr = `${latText}, ${lngText}`;

            let phaseName = getPhaseName(phaseData.cycle);
            let zodiac = getZodiacSign(phaseData.cycle);
            const daysToNew = (1 - phaseData.cycle) * 29.53;
            const daysToFull = (phaseData.cycle < 0.5) ? (0.5 - phaseData.cycle) * 29.53 : (1.5 - phaseData.cycle) * 29.53;
            const nextNewDate = new Date(date.getTime() + daysToNew * 86400000);
            const nextFullDate = new Date(date.getTime() + daysToFull * 86400000);
            const nextNewStr = nextNewDate.getFullYear() + ". " + (nextNewDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextNewDate.getDate().toString().padStart(2, '0') + ".";
            const nextFullStr = nextFullDate.getFullYear() + ". " + (nextFullDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextFullDate.getDate().toString().padStart(2, '0') + ".";

            if (topZone.blocks.length === 0) {
                topZone.blocks.push(
                    { id: Date.now() + 10, isNewLine: true, tag: 'moon_phase', content: phaseName, font: "Playfair Display", size: 40, weight: "bold", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 11, isNewLine: true, tag: 'moon_illum', content: `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`, font: "Montserrat", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 12, isNewLine: true, tag: 'moon_age', content: `Hold kora: ${phaseData.age.toFixed(1)} nap`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 13, isNewLine: true, tag: 'moon_nextnew', content: `Következő Újhold: ${nextNewStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 14, isNewLine: true, tag: 'moon_nextfull', content: `Következő Telihold: ${nextFullStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 15, isNewLine: true, tag: 'moon_zodiac', content: `Csillagjegy: ${zodiac}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } }
                );
            }

            if (bottomZone.blocks.length === 0) {
                bottomZone.blocks.push(
                    { id: Date.now() + 1, isNewLine: true, tag: 'location', content: city, font: "Space Grotesk", size: 50, weight: "bold", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 2, isNewLine: true, tag: 'date', content: formattedDate, font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } },
                    { id: Date.now() + 3, isNewLine: true, tag: 'coords', content: coordStr, font: "Montserrat", size: 24, weight: "300", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: { x: 0, y: 0 } }
                );
            }

            myCelestialConf.userData.uiState.currentTextContext = zoneId;
            myCelestialConf.userData.uiState.activePhotoId = newEl.id;

            // --- JAVÍTÁS LÉNYEGE: ITT HÍVJUK MEG ÚJRA A PANELFELÉPÍTŐT ---
            // Mivel most már benne vannak az adatok (city, date, shadow) az elemben,
            // a highlightPhoto most már a helyes értékekkel fogja feltölteni az inputokat.
            window.highlightPhoto(newEl.id, null);
            // -------------------------------------------------------------

            if (window.renderZoneUI) {
                window.renderZoneUI('top');
                window.renderZoneUI('bottom');
            }
            if (window.updateElementSelectorUI) window.updateElementSelectorUI();
            window.renderFixedTexts();
        }
    });
}

function initMoonCitySearch() {
    const input = document.getElementById('moon-city-search');
    // Csak akkor fusson le, ha van input és még nincs rajta a 'pac-target-input' class (Google Maps jelzője)
    if (!input || input.classList.contains('pac-target-input')) return;

    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocomplete_m = new google.maps.places.Autocomplete(input, { types: ['(cities)'], fields: ['geometry', 'name'] });

        autocomplete_m.addListener('place_changed', async () => {
            // console.log("function initMoonCitySearch() {");
            // console.log("autocomplete.addListener('place_changed', () => {");
            const place = autocomplete_m.getPlace();
            // console.log("autocomplete.addListener('place_changed', () => { place", place);

            if (!place.geometry) {
                // console.log('No details available for input: ', place.name);
                return;
            }
            // if (place.geometry) {
            // console.log("autocomplete.addListener('place_changed', () => { place.name", place.name);
            const lat = place.geometry.location.lat();
            const lon = place.geometry.location.lng();

            // console.log("autocomplete.addListener('place_changed', () => { lat", lat);
            // console.log("autocomplete.addListener('place_changed', () => { lon", lon);
            // Inputok frissítése
            const latInp = document.getElementById('moon-edit-lat');
            const lonInp = document.getElementById('moon-edit-lon');
            if (latInp) latInp.value = lat.toFixed(4);
            if (lonInp) lonInp.value = lon.toFixed(4);

            // Beírjuk a nevet az inputba, hogy látszódjon
            input.value = place.name;

            // Frissítés indítása a város nevével
            updateActiveMoonSettings(place.name);
            // }
        });
        // Jelöljük meg, hogy inicializálva van (opcionális, de a class check biztonságosabb)
        input.dataset.initialized = "true";
    }
}

window.updateActiveMoonSettings = function (newCityName) {
    if (!myCelestialConf.userData) initUserData();
    const activeId = myCelestialConf.userData.uiState.activePhotoId;
    const el = myCelestialConf.userData.elements.find(e => e.id == activeId);

    if (!el || el.subType !== 'moon') return;

    // Adatok olvasása (dátum, hely, stb. változatlan)
    const dateStr = document.getElementById('moon-edit-date').value;
    const timeStr = document.getElementById('moon-edit-time').value;
    let latVal = parseFloat(document.getElementById('moon-edit-lat').value);
    let lonVal = parseFloat(document.getElementById('moon-edit-lon').value);

    let cityName = newCityName;
    if (!cityName) {
        const cityInput = document.getElementById('moon-city-search');
        if (cityInput && cityInput.value && cityInput.value !== "") {
            cityName = cityInput.value;
        } else {
            cityName = el.moonLocationName || "Ismeretlen Hely";
        }
    }

    if (isNaN(latVal)) latVal = (el.moonLat !== undefined) ? el.moonLat : 47.4979;
    if (isNaN(lonVal)) lonVal = (el.moonLng !== undefined) ? el.moonLng : 19.0402;

    if (!dateStr || !timeStr) return;

    const fullDate = new Date(dateStr + 'T' + timeStr + ':00Z');

    // --- ÚJ: Options összeállítása ---
    const options = {
        shadowMode: el.moonShadowMode || 'black',
        padding: (el.moonPadding !== undefined) ? el.moonPadding : 20,
        sourceType: el.moonSourceType || 'nasa' // Használjuk a mentett típust
    };
    // UI szinkronizálása (hogy a gombok színe frissüljön)
    const btnNasa = document.getElementById('edit-btn-src-nasa');
    const btnOrig = document.getElementById('edit-btn-src-original');
    if (btnNasa && btnOrig) {
        btnNasa.className = (options.sourceType === 'nasa') ? 'btn-glass btn-glass-primary' : 'btn-glass btn-glass-secondary';
        btnOrig.className = (options.sourceType === 'original') ? 'btn-glass btn-glass-primary' : 'btn-glass btn-glass-secondary';
    }

    // UI gombok frissítése (hogy biztosan szinkronban legyenek)
    const btnB = document.getElementById('edit-btn-shadow-black');
    const btnT = document.getElementById('edit-btn-shadow-trans');
    if (btnB && btnT) {
        btnB.className = (options.shadowMode === 'black') ? 'btn-glass btn-glass-primary' : 'btn-glass btn-glass-secondary';
        btnT.className = (options.shadowMode === 'transparent') ? 'btn-glass btn-glass-primary' : 'btn-glass btn-glass-secondary';
    }

    generateMoonImage(fullDate, latVal, lonVal, options, function (dataURL, phaseData) {
        el.dataURL = dataURL;
        el.fileName = `Moon_${dateStr}_${timeStr}`;
        el.moonDate = dateStr;
        el.moonTime = timeStr;
        el.moonLat = latVal;
        el.moonLng = lonVal;
        el.moonLocationName = cityName;

        window.refreshMapTransform();


        // --- SZÖVEG ZÓNÁK FRISSÍTÉSE ---
        const zoneId = `photo_${el.id}`;
        ['top', 'bottom'].forEach(zoneKey => {
            if (myCelestialConf.userData.zones[zoneId] && myCelestialConf.userData.zones[zoneId][zoneKey]) {
                const blocks = myCelestialConf.userData.zones[zoneId][zoneKey].blocks;

                // Formázott adatok (Alsó zónához)
                const d = new Date(dateStr);
                const formattedDate = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
                const latText = Math.abs(latVal).toFixed(4) + "° " + (latVal >= 0 ? "N" : "S");
                const lngText = Math.abs(lonVal).toFixed(4) + "° " + (lonVal >= 0 ? "E" : "W");
                const coordStr = `${latText}, ${lngText}`;

                // Hold adatok (Felső zónához)
                let phaseName = getPhaseName(phaseData.cycle);
                let zodiac = getZodiacSign(phaseData.cycle);
                const daysToNew = (1 - phaseData.cycle) * 29.53;
                const daysToFull = (phaseData.cycle < 0.5) ? (0.5 - phaseData.cycle) * 29.53 : (1.5 - phaseData.cycle) * 29.53;

                // Dátumok számítása a kiválasztott dátumhoz képest
                const nextNewDate = new Date(fullDate.getTime() + daysToNew * 86400000);
                const nextFullDate = new Date(fullDate.getTime() + daysToFull * 86400000);
                const nextNewStr = nextNewDate.getFullYear() + ". " + (nextNewDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextNewDate.getDate().toString().padStart(2, '0') + ".";
                const nextFullStr = nextFullDate.getFullYear() + ". " + (nextFullDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextFullDate.getDate().toString().padStart(2, '0') + ".";

                blocks.forEach(block => {
                    // Alsó zóna frissítése
                    if (block.tag === 'location') block.content = cityName;
                    if (block.tag === 'date') block.content = formattedDate;
                    if (block.tag === 'coords') block.content = coordStr;

                    // Felső zóna frissítése (Hold tulajdonságok)
                    if (block.tag === 'moon_phase') block.content = phaseName;
                    if (block.tag === 'moon_illum') block.content = `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`;
                    if (block.tag === 'moon_age') block.content = `Hold kora: ${phaseData.age.toFixed(1)} nap`;
                    if (block.tag === 'moon_nextnew') block.content = `Következő Újhold: ${nextNewStr}`;
                    if (block.tag === 'moon_nextfull') block.content = `Következő Telihold: ${nextFullStr}`;
                    if (block.tag === 'moon_zodiac') block.content = `Csillagjegy: ${zodiac}`;

                    // Ha épp szerkesztjük valamelyiket, frissítsük a textarea-t is
                    const ta = document.getElementById(`textarea-${block.id}`);
                    if (ta) ta.value = block.content;
                });
            }
        });
        window.renderFixedTexts();
    });
}
// --- INIT ---
const debouncedRefreshMapTransform = debounce(() => window.refreshMapTransform(), 10);
const debouncedApplyMaskToDesigner = debounce(() => window.applyMaskToDesigner(), 20);
window.switchToMainEditor = function () {
    // console.log("window.switchToMainEditor = function () {");
    // console.log("window.switchToMainEditor = function () { myCelestialConf", myCelestialConf);
    // console.log("window.switchToMainEditor = function () { myCelestialConf.userData.elements[0].widthCM", myCelestialConf.userData.elements[0].widthCM);
    // 1. ADATBÁZIS ELLENŐRZÉSE
    if (!myCelestialConf.userData) initUserData();

    const uiState = myCelestialConf.userData.uiState;
    const elements = myCelestialConf.userData.elements;

    // Megkeressük, melyik elem van épp kijelölve
    let activeId = uiState.selectedElementId;

    // Ha nincs kijelölt, vagy a kijelölt nem Térkép, keressük meg az első térképet
    let targetElement = elements.find(e => e.id == activeId);

    if (!targetElement || targetElement.type !== 'map') {
        // Próbáljuk meg az első térképet
        targetElement = elements.find(e => e.type === 'map');
        if (targetElement) {
            activeId = targetElement.id;
            // Frissítjük a kijelölést is
            uiState.selectedElementId = activeId;
        }
    }

    // Ha még így sincs térkép (pl. üres a vászon), akkor nincs mit szerkeszteni
    if (!targetElement) {
        alert("Nincs szerkeszthető csillagtérkép a vásznon!");
        return;
    }

    // console.log(`szerkesztő betöltése ehhez: ${targetElement.id} (${targetElement.celestialConfig?.Varos || 'Névtelen'})`);

    // 2. KONFIGURÁCIÓ CSERÉJE (A LÉNYEG)

    // A) Kimentjük a teljes projekt állapotát (userData), mert ez nem része az egyes térképeknek
    const currentProjectData = myCelestialConf.userData;

    // B) Betöltjük a térkép saját mentett konfigját a globális változóba
    // (Ha még nincs mentett konfigja, akkor marad a mostani - ez csak új elemnél fordulhat elő)
    if (targetElement.celestialConfig) {
        // Deep copy, hogy ne referencia maradjon
        myCelestialConf = JSON.parse(JSON.stringify(targetElement.celestialConfig));
    }

    // C) Visszatesszük a projekt adatokat (hogy a tervező tudja, hol tartunk)
    myCelestialConf.userData = currentProjectData;

    // console.log("window.switchToMainEditor = function () { targetElement", targetElement);
    // console.log("window.switchToMainEditor = function () { myCelestialConf targetelés után", myCelestialConf);

    // 3. UI INPUTOK FRISSÍTÉSE (Hogy a mezőkben a jó adat legyen)

    // Helyszín és Dátum
    if (myCelestialConf.Varos) $('#city').val(myCelestialConf.Varos);

    if (myCelestialConf.Ido) {
        const d = new Date(myCelestialConf.Ido);
        if (!isNaN(d.getTime())) {
            // Globális dátum változó frissítése (celestial_jo.js használja)
            if (typeof date !== 'undefined') date = d;
            $('#datetimepicker').datetimepicker('setDate', d);
        }
    }

    // Koordináták
    if (myCelestialConf.geopos) {
        const latVal = myCelestialConf.geopos[0];
        const lonVal = myCelestialConf.geopos[1];

        // Globális változók frissítése (celestial_jo.js használja)
        if (typeof lat !== 'undefined') lat = latVal;
        if (typeof lng !== 'undefined') lng = lonVal;

        $('#coord_lat').val(latVal);
        $('#coord_lon').val(lonVal);

        // Időzóna frissítése (ha van mentve)
        if (myCelestialConf.Idozona && typeof timeZone !== 'undefined') {
            timeZone = myCelestialConf.Idozona;
        }
    }

    // 4. GUI ELEMEK (Checkboxok, Színek) SZINKRONIZÁLÁSA
    // Ez a függvény a celestial_jo.js-ben vagy a HTML-ben van definiálva
    // (A korábbi beszélgetésünk alapján hoztuk létre)
    if (typeof window.updateGUIFromConfig === 'function') {
        window.updateGUIFromConfig(myCelestialConf);
    }

    // 5. TÉRKÉP ÚJRARAJZOLÁSA A SZERKESZTŐBEN
    // Alkalmazzuk az új konfigot a Celestial motorra
    Celestial.apply(myCelestialConf);
    Celestial.redraw();

    // 6. NÉZET VÁLTÁS
    // Átváltunk a bal oldali fő panelre (ahol a térkép van)
    $("#tabs").tabs("option", "active", 0);

    // Opcionális: Megnyitjuk az első fület (Helyszín beállítások) a bal oldalon
    // $("#mobile_tabs li:first-child a").click();
};
$(document).ready(function () {
    initUserData();
    window.initBackgroundPresets(); // <--- EZT SZÚRD BE IDE
    window.initGradientSortable(); // <--- EZT ADD HOZZÁ IDE!

    const moonBtn = $("#btn-mode-moon");
    if (moonBtn.length) {
        const mapBtn = moonBtn.next("button");
        if (mapBtn.length) {
            mapBtn.removeAttr("onclick");
            mapBtn.on("click", function (e) {
                e.preventDefault();
                toggleAddPanel('map');
            });
        }
    }
    setTimeout(ensureSvgListener, 1000); // Kicsit később, hogy biztosan létezzen
    // --- ÚJ: Kezdőállapot beállítása ---
    // Megnézzük, mi az alapértelmezett, és betöltjük a szerkesztőbe
    if (myCelestialConf && myCelestialConf.userData && myCelestialConf.userData.canvas.background) {
        window.loadGradientToEditor(myCelestialConf.userData.canvas.background);
    } else {
        // Fallback
        window.loadGradientToEditor("linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)");
    }

    updateLayoutButtons(myCelestialConf.userData.canvas.layoutDirection || 'row');
    if (window.switchTextContext) window.switchTextContext('map');

    setTimeout(window.initMoonPreview, 500);

    if (myCelestialConf.userData.canvas.wallColor && typeof window.updateWallColor === 'function') {
        window.updateWallColor(myCelestialConf.userData.canvas.wallColor);
        $("#wall-bg-color").val(myCelestialConf.userData.canvas.wallColor);
    }

    const picker = $('#symbol-picker');
    if (picker.length && picker.parent().prop("tagName") !== "BODY") picker.appendTo("body");

    renderZoneUI('top'); renderZoneUI('bottom');

    // --- EZT A SORT ADD HOZZÁ: ---
    if (window.renderSmartpointsList) window.renderSmartpointsList();
    // -----------------------------
    // --- EZT A SORT IS ADD HOZZÁ: ---
    if (window.updateLayoutVisibility) window.updateLayoutVisibility();

    setTimeout(function () {
        if (window.refreshMapTransform) window.refreshMapTransform();
        if (window.renderFixedTexts) window.renderFixedTexts();
    }, 500);

    if (typeof Celestial !== 'undefined' && Celestial.addCallback) Celestial.addCallback(window.updateDesignerFromCelestial);

    let isDesignerFirstRun = true;
    $("#tabs").on("tabsactivate", function (event, ui) {
        // console.log('$("#tabs").on("tabsactivate", function (event, ui) {');
        // console.log('$("#tabs").on("tabsactivate", function (event, ui) { myCelestialConf', myCelestialConf);
        // console.log('$("#tabs").on("tabsactivate", function (event, ui) { myCelestialConf.userData.elements[0].widthCM', myCelestialConf.userData.elements[0].widthCM);
        if (ui.newPanel[0].id === 'fragment-6') {
            // console.log('$("#tabs").on("tabsactivate", function (event, ui) { fragment-6');
            // console.log('$("#tabs").on("tabsactivate", function (event, ui) { fragment-6 myCelestialConf', myCelestialConf);
            // console.log('$("#tabs").on("tabsactivate", function (event, ui) { fragment-6 myCelestialConf.userData.elements[0].widthCM', myCelestialConf.userData.elements[0].widthCM);
            document.getElementById('full-screen-designer').style.display = 'block';
            document.getElementById('main-layout').style.display = 'none';

            // --- JAVÍTÁS 1: Azonnali méretezés kényszerítése ---
            // Egy apró timeout kell, hogy a böngésző renderelő motorja felfogja a display:block-ot
            setTimeout(() => {
                if (window.updateCanvasSize) window.updateCanvasSize();
            }, 10);

            // console.log('$("#tabs").on("tabsactivate", function (event, ui) { ');
            // console.log('$("#tabs").on("tabsactivate", function (event, ui) {  myCelestialConf', myCelestialConf);
            // console.log('$("#tabs").on("tabsactivate", function (event, ui) {  myCelestialConf.userData.elements[0].widthCM', myCelestialConf.userData.elements[0].widthCM);
            // --- JAVÍTÁS KEZD ---
            // Ha belépünk a tervezőbe, és nincs kijelölt elem, jelöljük ki az elsőt (main-map)!
            if (!myCelestialConf.userData.uiState.selectedElementId) {
                const elements = myCelestialConf.userData.elements;
                // console.log('$("#tabs").on("tabsactivate", function (event, ui) { if (!myCelestialConf.userData.uiState.selectedElementId) {');
                // console.log('$("#tabs").on("tabsactivate", function (event, ui) { if (!myCelestialConf.userData.uiState.selectedElementId) { myCelestialConf', myCelestialConf);
                // console.log('$("#tabs").on("tabsactivate", function (event, ui) { if (!myCelestialConf.userData.uiState.selectedElementId) { myCelestialConf.userData.elements[0].widthCM', myCelestialConf.userData.elements[0].widthCM);
                if (elements && elements.length > 0) {
                    const firstId = elements[0].id; // Ez általában 'main-map'
                    // console.log("Auto-select első elem:", firstId);

                    myCelestialConf.userData.uiState.selectedElementId = firstId;

                    // UI frissítése, hogy a panelek is betöltődjenek
                    if (window.handleElementSelection) {
                        window.handleElementSelection(firstId);
                    }
                }
            }
            requestAnimationFrame(() => {
                if (isDesignerFirstRun) {
                    const w = parseFloat(document.getElementById('canvas-width').value);
                    const h = parseFloat(document.getElementById('canvas-height').value);

                    // --- JAVÍTÁS: NE MAXIMALIZÁLJUK, HANEM FIX 20CM VAGY MAX-1 ---
                    // Régi: const maxWidth = Math.min(w, h);
                    // Új: Ha befér a 20, akkor 20, különben a maximum.

                    // console.log('$("#tabs").on("tabsactivate", function (event, ui) { ');
                    // console.log('$("#tabs").on("tabsactivate", function (event, ui) {  myCelestialConf', myCelestialConf);
                    // console.log('$("#tabs").on("tabsactivate", function (event, ui) {  myCelestialConf.userData.elements[0].widthCM defaultSizedefaultSizedefaultSizedefaultSize', myCelestialConf.userData.elements[0].widthCM);
                    const defaultSize = myCelestialConf.userData.elements[0].widthCM ? myCelestialConf.userData.elements[0].widthCM : 20;
                    const maxWidth = Math.min(w, h);
                    const finalSize = (maxWidth < defaultSize) ? maxWidth : defaultSize;

                    const mapInput = document.getElementById('map-width-cm-input');
                    if (mapInput) mapInput.value = finalSize;

                    if (window.setMapWidth) window.setMapWidth(finalSize);

                    // Fotó inputot is beállítjuk
                    const photoInput = document.getElementById('photo-width-cm-input');
                    if (photoInput) photoInput.value = finalSize;

                    isDesignerFirstRun = false;
                }
                if (window.copyMapToDesigner) window.copyMapToDesigner();
                requestAnimationFrame(() => {
                    if (window.refreshMapTransform) window.refreshMapTransform();
                    if (window.updateElementSelectorUI) window.updateElementSelectorUI();

                    $("#copy-svg").trigger("click");
                    $("#tabs_r").tabs("option", "active", 0);
                });
            });
        } else {
            document.getElementById('full-screen-designer').style.display = 'none';
            document.getElementById('main-layout').style.display = 'flex';
        }
    });

    $("#tabs_r").on("tabsactivate", function (event, ui) {
        // console.log('$("#tabs_r").on("tabsactivate", function (event, ui) {');
        if (ui.newPanel && ui.newPanel.length && ui.newPanel[0].id === 'fragment_r-6') {
            // console.log('$("#tabs_r").on("tabsactivate", function (event, ui) { fragment_r-6');
            if (window.switchToMainEditor) window.switchToMainEditor();
            else $("#tabs").tabs("option", "active", 0);
        }
    });

    if (getDOMElements()) {
        designerSVG.addEventListener('click', (e) => {
            // Safety Check: Do not clear selection if we are just placing/moving a SmartPoint
            if (myCelestialConf.userData.uiState.placingSmartpoint || myCelestialConf.userData.uiState.movingSmartpointId) return;

            if (e.target.id === 'designer-svg') if (typeof window.selectDesignerElement === 'function') window.selectDesignerElement(null);
        });
    }

    document.fonts.ready.then(function () { if (window.refreshMapTransform) window.refreshMapTransform(); });
    $(document).on('mousedown', function (e) {
        if ($('#symbol-picker').is(':visible') && !$(e.target).closest('#symbol-picker').length && !$(e.target).hasClass('symbol-opener')) {
            $('#symbol-picker').fadeOut(200);
        }
    });
    initDesignerTemplates();
});

window.setHeartMask = function (type) {
    const mapEl = getMainMapElement();
    mapEl.mask = type;
    if (type !== 'none' && typeof Celestial !== 'undefined') {
        const projSelect = document.getElementById('projection');
        if (projSelect && projSelect.value !== 'airy') {
            projSelect.value = 'airy';
            if (window.loadTheme) window.loadTheme(null);
        }
    }
    if (typeof window.copyMapToDesigner === 'function') window.copyMapToDesigner();
};

window.updateMaskScale = function (val) {
    const mapEl = getMainMapElement();
    mapEl.maskScale = parseInt(val) / 100;
    window.refreshMapTransform();
}

// Kompatibilitás miatt üres függvény, ha a régi hívná
window.applyMaskToDesigner = function () { };

window.updateMapMargin = function (side, val) {
    const mapEl = getMainMapElement();
    if (side === 'top') mapEl.marginTop = parseFloat(val) || 0;
    if (side === 'bottom') mapEl.marginBottom = parseFloat(val) || 0;
    window.refreshMapTransform();
}

window.alignCelestialMap = function (position) {
    const mapEl = getMainMapElement();
    mapEl.align = position;
    updateActiveButton('btn-map', position);
    document.getElementById('map-margin-top-container').style.display = (position === 'top') ? 'block' : 'none';
    document.getElementById('map-margin-bottom-container').style.display = (position === 'bottom') ? 'block' : 'none';
    window.refreshMapTransform();
}

window.updateMapBorderProp = function (prop, value) {
    if (!myCelestialConf.userData) initUserData();
    const mapEl = getMainMapElement();

    if (prop === 'width') {
        mapEl.borderWidth = parseInt(value);
        document.getElementById('map-border-disp').innerText = value + 'px';
    } else if (prop === 'color') {
        mapEl.borderColor = value;
    } else if (prop === 'enabled') {
        mapEl.borderEnabled = value;
        const wrapper = document.getElementById('map-border-settings-wrapper');
        if (wrapper) wrapper.style.display = value ? 'block' : 'none';
    } else if (prop === 'blur') {
        mapEl.borderBlur = parseInt(value);
        const disp = document.getElementById('map-border-blur-disp');
        if (disp) disp.innerText = value + 'px';
    } else if (prop === 'offset') {
        mapEl.borderDistance = parseInt(value);
        const disp = document.getElementById('map-border-offset-disp');
        if (disp) disp.innerText = value;
    } else if (prop === 'maskBlur') {
        mapEl.edgeBlur = parseInt(value);
        const disp = document.getElementById('map-mask-blur-disp');
        if (disp) disp.innerText = value + 'px';
    }
    window.refreshMapTransform();
};

window.initCropperFromFile = function (input) {
    if (input.files && input.files[0]) {
        window.CelestialState.tempUploadedFileName = input.files[0].name;
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = document.getElementById('image-to-crop');
            image.src = e.target.result;
            document.getElementById('cropper-modal').style.display = 'flex';
            if (window.CelestialState.cropper) window.CelestialState.cropper.destroy();
            window.CelestialState.cropper = new Cropper(image, { aspectRatio: 1, viewMode: 1, autoCropArea: 1 });
        };
        reader.readAsDataURL(input.files[0]);
    }
    input.value = '';
}

window.closeCropper = function () {
    document.getElementById('cropper-modal').style.display = 'none';
    if (window.CelestialState.cropper) window.CelestialState.cropper.destroy();
}

window.performCrop = function () {
    if (!window.CelestialState.cropper) return;
    const canvas = window.CelestialState.cropper.getCroppedCanvas({ width: 1500, height: 1500 });
    const dataURL = canvas.toDataURL('image/png');
    addNewElement('photo', dataURL, window.CelestialState.tempInsertSide, window.CelestialState.tempUploadedFileName);
    closeCropper();
}

window.selectDesignerElement = function (id, element) {
    if (!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.uiState.selectedElementId = id;
    window.highlightPhoto(id, element);
}

window.getOptimalMapSize = function () {
    // console.log("function getOptimalMapSizeeeeeeeeeeee() {"); return 1440;
    return 1440;
};
function getHexFromBackground(bg) { if (!bg) return "#000000"; if (bg.startsWith("#")) return bg; const match = bg.match(/#[a-fA-F0-9]{6}/); if (match) return match[0]; return "#000000"; }

// ============================================================
// --- GRADIENS SZERKESZTŐ LOGIKA (Javított: %, Egy kattintás) ---
// ============================================================

let currentGradientState = {
    isGradient: false,
    angle: 135,
    stops: [] // [{color: '#...', percent: 0}, ...]
};

// 1. Kapcsoló kezelése
window.toggleGradientEditor = function (isChecked) {
    const simpleContainer = document.getElementById('simple-bg-container');
    const editorPanel = document.getElementById('gradient-editor-panel');

    currentGradientState.isGradient = isChecked;

    if (isChecked) {
        // Bekapcsolás
        simpleContainer.style.opacity = '0.3';
        simpleContainer.style.pointerEvents = 'none';
        editorPanel.style.display = 'block';
        updateGradientFromEditor();
    } else {
        // Kikapcsolás
        simpleContainer.style.opacity = '1';
        simpleContainer.style.pointerEvents = 'auto';
        editorPanel.style.display = 'none';

        // Visszaállunk az egyszínű választó értékére
        // const color = document.getElementById('canvas-simple-color').value;
        const color = document.getElementById('canvas-bg-color').value;
        window.applySolidColor(color);
    }
}

window.applySolidColor = function (color) {
    window.updateCanvasBackground(color);
}

// 2. Gradiens összeállítása a szerkesztőből (Színek + %)
window.updateGradientFromEditor = function () {
    const angle = document.getElementById('grad-angle-range').value;
    document.getElementById('grad-angle-val').textContent = angle + '°';

    // Adatok begyűjtése a sorokból
    const rows = document.querySelectorAll('.grad-stop-row');
    let stopsData = [];

    rows.forEach(row => {
        const color = row.querySelector('.grad-stop-input').value;
        let percent = row.querySelector('.grad-stop-percent').value;
        stopsData.push({ color: color, percent: percent });
    });

    // Ha nincs elég szín, ne csináljon semmit vagy adjon defaultot
    if (stopsData.length < 2) return;

    // CSS String generálása
    // Pl: linear-gradient(135deg, #000 0%, #fff 100%)
    let stopsStr = stopsData.map(s => `${s.color} ${s.percent}%`).join(', ');
    const gradientCSS = `linear-gradient(${angle}deg, ${stopsStr})`;

    currentGradientState.angle = angle;

    window.updateCanvasBackground(gradientCSS);
}

// 3. Új szín hozzáadása (Százalékkal + Drag Handle)
window.addGradientStop = function (colorValue = '#ffffff', percentValue = null) {
    const list = document.getElementById('grad-stops-list');

    if (percentValue === null) {
        const rows = list.querySelectorAll('.grad-stop-row');
        if (rows.length > 0) {
            // Próbáljuk okosan kitalálni a következő %-ot
            const lastVal = parseInt(rows[rows.length - 1].querySelector('.grad-stop-percent').value);
            percentValue = Math.min(lastVal + 10, 100);
        } else {
            percentValue = 0;
        }
    }

    const row = document.createElement('div');
    row.className = 'grad-stop-row';
    // Fontos: data-id nélkül is működik, mert a DOM sorrend számít

    row.innerHTML = `
        <span class="grad-drag-handle" style="cursor:grab; color:#888; font-size:14px; padding-left:5px; padding-right:5px;">☰</span>
        
        <input type="color" class="grad-stop-input input-glass" value="${colorValue}" 
               oninput="window.updateGradientFromEditor()" style="padding: 2px; height: 32px; width: 40px;">
               
        <input type="number" class="grad-stop-percent input-glass" value="${percentValue}" min="0" max="100" step="1"
               style="width: 45px; height: 32px; text-align: center; font-size: 11px; padding: 0;"
               oninput="window.updateGradientFromEditor()">
        
        <button class="grad-remove-btn btn-glass" title="Törlés"
                onclick="this.parentElement.remove(); window.updateGradientFromEditor();" style="padding: 0 8px; color: #ff4444; border-color: #ff4444;">✕</button>
    `;
    list.appendChild(row);
    window.updateGradientFromEditor();

    // Frissítjük a sortable-t, ha esetleg újra kell inicializálni (biztonsági okból)
    if (typeof $ !== 'undefined' && $("#grad-stops-list").data('ui-sortable')) {
        $("#grad-stops-list").sortable("refresh");
    }
}

// Segéd: Csak a UI hozzáadása (frissítés nélkül)
function addStopUIOnly(colorValue, percentValue) {
    const list = document.getElementById('grad-stops-list');
    const row = document.createElement('div');
    row.className = 'grad-stop-row';

    row.innerHTML = `
        <span class="grad-drag-handle" style="cursor:grab; color:#888; font-size:14px; padding-left:5px; padding-right:5px;">☰</span>
        
        <input type="color" class="grad-stop-input input-glass" value="${colorValue}" oninput="window.updateGradientFromEditor()" style="padding: 2px; height: 32px; width: 40px;">
        <input type="number" class="grad-stop-percent input-glass" value="${percentValue}" min="0" max="100" step="1"
               style="width: 45px; height: 32px; text-align: center; font-size: 11px; padding: 0;"
               oninput="window.updateGradientFromEditor()">
        <button class="grad-remove-btn btn-glass" title="Törlés" onclick="this.parentElement.remove(); window.updateGradientFromEditor();" style="padding: 0 8px; color: #ff4444; border-color: #ff4444;">✕</button>
    `;
    list.appendChild(row);
}
// --- SORTABLE INICIALIZÁLÁSA (Sorrendezés) ---
window.initGradientSortable = function () {
    // Ellenőrizzük, hogy létezik-e a lista és a jQuery UI
    if (typeof $ === 'undefined' || !$.fn.sortable) {
        console.warn("jQuery UI Sortable hiányzik!");
        return;
    }

    $("#grad-stops-list").sortable({
        axis: "y",                // Csak függőlegesen mozgatható
        handle: ".grad-drag-handle", // Csak a ☰ ikonnal húzható (hogy a color input működjön)
        cursor: "grabbing",       // Kurzor stílus húzáskor
        opacity: 0.8,             // Átlátszóság húzáskor
        tolerance: "pointer",     // Finomabb érzékelés
        update: function (event, ui) {
            // AMIKOR KÉSZ A HÚZÁS: Frissítjük a gradienst!
            // Mivel a DOM-ban már megcserélődtek az elemek, 
            // az updateGradientFromEditor a helyes új sorrendet olvassa ki.
            window.updateGradientFromEditor();
        }
    });
}
// ============================================================
// --- ÚJ GRADIENS LOGIKA (Lenyitható + Kapcsolható) ---
// ============================================================

// 1. Csak a panel nyitása/csukása (Nyílra kattintás)
window.toggleGradientPanel = function (forceState = null) {
    const panel = document.getElementById('gradient-editor-panel');
    const arrow = document.getElementById('gradient-arrow');

    // Ha nincs megadva kényszerített állapot, akkor toggle
    const shouldOpen = (forceState !== null) ? forceState : (panel.style.display === 'none');

    if (shouldOpen) {
        panel.style.display = 'block';
        arrow.style.transform = 'rotate(0deg)'; // Lefelé nyíl
    } else {
        panel.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)'; // Oldalra nyíl
    }
}

// 2. A funkció aktiválása/inaktiválása (Kapcsoló)
window.toggleGradientActive = function (isChecked) {
    const simpleContainer = document.getElementById('simple-bg-container');

    currentGradientState.isGradient = isChecked;

    if (isChecked) {
        // Bekapcsolás
        simpleContainer.style.opacity = '0.3';
        simpleContainer.style.pointerEvents = 'none';

        // Automatikusan kinyitjuk a szerkesztőt, ha bekapcsolja
        window.toggleGradientPanel(true);

        // Frissítjük a vásznat a szerkesztő értékeiből
        updateGradientFromEditor();
    } else {
        // Kikapcsolás
        simpleContainer.style.opacity = '1';
        simpleContainer.style.pointerEvents = 'auto';

        // NEM csukjuk be automatikusan, hadd lássa a beállításokat, ha akarja
        // De visszaállítjuk az egyszínű hátteret
        // const color = document.getElementById('canvas-simple-color').value;
        const color = document.getElementById('canvas-bg-color').value;
        window.applySolidColor(color);
    }
}

// 3. Sablon betöltésekor (Javított logika)
window.loadGradientToEditor = function (cssString) {
    const toggle = document.getElementById('gradient-toggle');
    const simpleContainer = document.getElementById('simple-bg-container');

    // --- EGYSZÍNŰ ESET ---
    if (!cssString.includes('gradient')) {
        toggle.checked = false;
        currentGradientState.isGradient = false;

        // UI frissítés
        simpleContainer.style.opacity = '1';
        simpleContainer.style.pointerEvents = 'auto';

        // Becsukjuk a panelt, mert nem releváns
        window.toggleGradientPanel(false);

        if (cssString.startsWith('#')) {
            // document.getElementById('canvas-simple-color').value = cssString;
            document.getElementById('canvas-bg-color').value = cssString;
        }
        return;
    }

    // --- GRADIENS ESET ---
    toggle.checked = true;
    currentGradientState.isGradient = true;

    // UI frissítés
    simpleContainer.style.opacity = '0.3';
    simpleContainer.style.pointerEvents = 'none';

    // Kinyitjuk a panelt, hogy lássa, mit töltött be
    window.toggleGradientPanel(true);

    // --- PARSOLÁS ---
    // Szög
    let angle = 180;
    const angleMatch = cssString.match(/(\d+)deg/);
    if (angleMatch) angle = angleMatch[1];

    document.getElementById('grad-angle-range').value = angle;
    document.getElementById('grad-angle-val').textContent = angle + '°';

    // Lista ürítése és újraépítése
    const list = document.getElementById('grad-stops-list');
    list.innerHTML = '';

    // Színek parszolása (Split módszerrel)
    let content = cssString.substring(cssString.indexOf('(') + 1, cssString.lastIndexOf(')'));
    let parts = content.split(',');

    parts.forEach(part => {
        part = part.trim();
        if (part.includes('deg')) return;

        let color = '#000000';
        let percent = 50;

        const hexMatch = part.match(/#[a-fA-F0-9]{6}/);
        if (hexMatch) color = hexMatch[0];

        const permatch = part.match(/(\d+)%/);
        if (permatch) percent = parseInt(permatch[1]);
        else {
            // Ha nincs %, saccolunk (de a mentettben lesz)
        }

        if (hexMatch) {
            addStopUIOnly(color, percent);
        }
    });

    // Állapot mentése
    currentGradientState.angle = angle;
}
// 5. Preset lista gombok (JAVÍTOTT: 1 KATTINTÁS)
window.initBackgroundPresets = function () {
    const container = document.getElementById('bg-presets-container');
    if (!container) return;
    container.innerHTML = '';

    GRADIENT_PRESETS.forEach(preset => {
        const btn = document.createElement('div');
        btn.style.cssText = `
            width: 100%; aspect-ratio: 1; border-radius: 50%; cursor: pointer; 
            border: 2px solid #555; background: ${preset.value};
            transition: transform 0.2s, border-color 0.2s; 
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        `;
        btn.title = preset.name;

        btn.onclick = () => {
            // Vizuális visszajelzés
            Array.from(container.children).forEach(c => c.style.borderColor = '#555');
            btn.style.borderColor = 'var(--accent-blue)';

            // 1. Vászon frissítése AZONNAL
            window.updateCanvasBackground(preset.value);

            // 2. Szerkesztő UI betöltése AZONNAL (kapcsolók állítása)
            window.loadGradientToEditor(preset.value);
        };
        container.appendChild(btn);
    });
};

window.togglePresetList = function () {
    const container = document.getElementById('bg-presets-container');
    const arrow = document.getElementById('preset-arrow');
    if (!container) return;

    if (container.style.display === 'none') {
        container.style.display = 'grid';
        arrow.innerText = '▲';
    } else {
        container.style.display = 'none';
        arrow.innerText = '▼';
    }
}

// ============================================================
// --- KIFUTÓ (BLEED) BEÁLLÍTÁSOK ---
// ============================================================

let currentBleedGradientState = {
    isGradient: false,
    angle: 135,
    stops: []
};

// Bleed mód beállítása (theme vagy custom)
// DUPLICATE FUNCTIONS REMOVED (setBleedMode, updateCustomBleedColor)



// Kifutó gradiens panel nyitás/csukás
window.toggleBleedGradientPanel = function (forceState = null) {
    const panel = document.getElementById('bleed-gradient-editor-panel');
    const arrow = document.getElementById('bleed-gradient-arrow');
    if (!panel || !arrow) return;

    const shouldOpen = (forceState !== null) ? forceState : (panel.style.display === 'none');

    if (shouldOpen) {
        panel.style.display = 'block';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        panel.style.display = 'none';
        arrow.style.transform = 'rotate(-90deg)';
    }
};

// Kifutó gradiens aktiválás/deaktiválás
window.toggleBleedGradientActive = function (isChecked) {
    // console.log(`📐 toggleBleedGradientActive: isChecked=${isChecked}`);
    const simpleContainer = document.getElementById('simple-bleed-container');
    if (!simpleContainer) return;

    currentBleedGradientState.isGradient = isChecked;

    if (isChecked) {
        simpleContainer.style.opacity = '0.3';
        simpleContainer.style.pointerEvents = 'none';
        window.toggleBleedGradientPanel(true);
        window.updateBleedGradientFromEditor();
    } else {
        simpleContainer.style.opacity = '1';
        simpleContainer.style.pointerEvents = 'auto';
        const color = document.getElementById('bleed-color-picker').value;
        window.updateCustomBleedColor(color);
    }
};

// Kifutó gradiens frissítése a szerkesztőből
window.updateBleedGradientFromEditor = function () {
    const angleInput = document.getElementById('bleed-grad-angle-range');
    const angleVal = document.getElementById('bleed-grad-angle-val');
    if (!angleInput || !angleVal) return;

    const angle = angleInput.value;
    angleVal.textContent = angle + '°';

    const rows = document.querySelectorAll('#bleed-grad-stops-list .grad-stop-row');
    let stopsData = [];

    rows.forEach(row => {
        const colorInput = row.querySelector('.grad-stop-input');
        const percentInput = row.querySelector('.grad-stop-percent');
        if (colorInput && percentInput) {
            stopsData.push({ color: colorInput.value, percent: percentInput.value });
        }
    });

    if (stopsData.length < 2) return;

    let stopsStr = stopsData.map(s => `${s.color} ${s.percent}%`).join(', ');
    const gradientCSS = `linear-gradient(${angle}deg, ${stopsStr})`;

    // console.log(`📐 updateBleedGradientFromEditor: ${gradientCSS}`);

    if (!myCelestialConf.userData) initUserData();
    if (!myCelestialConf.userData.canvas.bleed) {
        myCelestialConf.userData.canvas.bleed = { mode: 'custom', customColor: gradientCSS, previewEnabled: false };
    } else {
        myCelestialConf.userData.canvas.bleed.customColor = gradientCSS;
    }

    currentBleedGradientState.angle = angle;

    if (myCelestialConf.userData.canvas.bleed.previewEnabled) {
        window.updateBleedPreview();
    }
};

// Új kifutó gradiens szín hozzáadása
window.addBleedGradientStop = function (colorValue = '#ffffff', percentValue = null) {
    const list = document.getElementById('bleed-grad-stops-list');
    if (!list) return;

    if (percentValue === null) {
        const rows = list.querySelectorAll('.grad-stop-row');
        if (rows.length > 0) {
            const lastVal = parseInt(rows[rows.length - 1].querySelector('.grad-stop-percent').value);
            percentValue = Math.min(lastVal + 10, 100);
        } else {
            percentValue = 0;
        }
    }

    const row = document.createElement('div');
    row.className = 'grad-stop-row';
    row.innerHTML = `
        <span class="grad-drag-handle" style="cursor:grab; color:#888; font-size:14px; padding-left:5px; padding-right:5px;">☰</span>
        <input type="color" class="grad-stop-input input-glass" value="${colorValue}" oninput="window.updateBleedGradientFromEditor()" style="padding: 2px; height: 32px; width: 40px;">
        <input type="number" class="grad-stop-percent input-glass" value="${percentValue}" min="0" max="100" step="1"
               style="width: 45px; height: 32px; text-align: center; font-size: 11px; padding: 0;"
               oninput="window.updateBleedGradientFromEditor()">
        <button class="grad-remove-btn btn-glass" title="Törlés" onclick="this.parentElement.remove(); window.updateBleedGradientFromEditor();" style="padding: 0 8px; color: #ff4444; border-color: #ff4444;">✕</button>
    `;
    list.appendChild(row);
    window.updateBleedGradientFromEditor();
};

// Kifutó élőnézet be/ki
window.toggleBleedPreview = function (isChecked) {
    // console.log(`📐 toggleBleedPreview: isChecked=${isChecked}`);
    if (!myCelestialConf.userData) initUserData();
    if (!myCelestialConf.userData.canvas.bleed) {
        myCelestialConf.userData.canvas.bleed = { mode: 'theme', customColor: '#000000', previewEnabled: false };
    }

    myCelestialConf.userData.canvas.bleed.previewEnabled = isChecked;

    if (isChecked) {
        window.updateBleedPreview();
    } else {
        window.removeBleedPreview();
    }
};

// Kifutó élőnézet frissítése - NEW APPROACH: positioned background div BEHIND canvas-wrapper
// Kifutó élőnézet frissítése - SMART BLEED APPROACH
window.updateBleedPreview = function () {
    // console.log(`🪲 [DEBUG] updateBleedPreview called (Smart Bleed)`);

    const wrapper = document.getElementById('canvas-wrapper');
    // We use the same ID but treat it as a container now
    let bleedContainer = document.getElementById('bleed-preview-bg');

    if (!wrapper) {
        console.warn(`📐 Missing wrapper element.`);
        return;
    }

    if (!bleedContainer) {
        // Create if missing (should exist in HTML usually, but safe fallback)
        bleedContainer = document.createElement('div');
        bleedContainer.id = 'bleed-preview-bg';
        wrapper.parentElement.appendChild(bleedContainer);
    }

    if (!myCelestialConf.userData) initUserData();
    const bleedSettings = myCelestialConf.userData.canvas.bleed || { mode: 'theme', customColor: '#000000' };

    // Get canvas/page dimensions
    const widthInput = document.getElementById('canvas-width');
    const heightInput = document.getElementById('canvas-height');
    const pageWidthCm = parseFloat(widthInput ? widthInput.value : 21);
    const pageHeightCm = parseFloat(heightInput ? heightInput.value : 30);
    const elements = myCelestialConf.userData.elements;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const count = elements.length > 0 ? elements.length : 1;

    // Total dimensions logic (reused for ratio calc)
    let totalWidthCm, totalHeightCm;
    if (layoutDir === 'column') {
        totalWidthCm = pageWidthCm;
        totalHeightCm = pageHeightCm * count;
    } else {
        totalWidthCm = pageWidthCm * count;
        totalHeightCm = pageHeightCm;
    }

    // Get wrapper's current screen dimensions
    const wrapperRect = wrapper.getBoundingClientRect();
    const wrapperWidthPx = wrapperRect.width;
    const wrapperHeightPx = wrapperRect.height;

    // Calculate 2cm in screen pixels
    const pxPerCmWidth = wrapperWidthPx / totalWidthCm;
    const pxPerCmHeight = wrapperHeightPx / totalHeightCm;
    // Use average or specific dim? Usually uniform scaling, but let's be safe.
    // Bleed is typically 2mm or 2cm? User said "+2 cm-es kifutó".
    // Wait, 2cm is HUGE for bleed. Usually it's 3-5mm. But if user said 2cm, we use 2cm.
    // The previous code used 2.
    const bleedCm = 2;
    const bleedPxWidth = bleedCm * pxPerCmWidth;
    const bleedPxHeight = bleedCm * pxPerCmHeight;

    // console.log(`📐 Bleed preview: bleedPx=${bleedPxWidth.toFixed(1)}x${bleedPxHeight.toFixed(1)}px`);

    // Position container MATCHING the wrapper
    const parent = wrapper.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const wrapperLeft = wrapperRect.left - parentRect.left;
    const wrapperTop = wrapperRect.top - parentRect.top;

    bleedContainer.style.display = 'block';
    bleedContainer.style.position = 'absolute';
    bleedContainer.style.left = `${wrapperLeft}px`;
    bleedContainer.style.top = `${wrapperTop}px`;
    bleedContainer.style.width = `${wrapperWidthPx}px`;
    bleedContainer.style.height = `${wrapperHeightPx}px`;
    bleedContainer.style.background = 'transparent'; // Container is invisible
    bleedContainer.style.zIndex = '0'; // Behind wrapper (wrapper should be higher z-index)
    // Note: If wrapper has z-index, ensure bleedContainer is below. 
    // Usually wrapper is static/relative. We might need z-index -1 if parent isn't stacking context.
    // But let's try standard appending (it is appended after wrapper usually? No, before?)
    // If it covers wrapper, clicks fail.
    // Let's set pointer-events none to be safe.
    bleedContainer.style.pointerEvents = 'none';

    // Clear previous children
    bleedContainer.innerHTML = '';

    // Slot dimensions
    const slotW = (layoutDir === 'row') ? (wrapperWidthPx / count) : wrapperWidthPx;
    const slotH = (layoutDir === 'column') ? (wrapperHeightPx / count) : wrapperHeightPx;

    // Generate Bleed Rects for each element
    elements.forEach((el, idx) => {
        // Determine Color
        // Priority: Element Local (if Custom Mode/Scope) > Global Custom (if Custom Mode) > Theme (if Theme Mode)
        // Actually, logic:
        // If Mode == Custom:
        //    If el.localBackground set -> use it.
        //    Else -> use global customColor.
        // If Mode == Theme:
        //    Use theme background (myCelestialConf.userData.canvas.background).
        //    (User said "Theme Bleed" -> margins invisible? Or theme color? Usually theme color.)

        let color = '#000000';
        if (bleedSettings.mode === 'custom') {
            color = el.localBackground || bleedSettings.customColor;
        } else {
            color = myCelestialConf.userData.canvas.background || '#0a0e27';
        }

        // Calculate Position
        // Row layout: x = idx * slotW, y = 0
        // Col layout: x = 0, y = idx * slotH

        let baseX = (layoutDir === 'row') ? (idx * slotW) : 0;
        let baseY = (layoutDir === 'column') ? (idx * slotH) : 0;
        let baseW = slotW;
        let baseH = slotH;

        // Calculate Bleed Expansions (SMART BLEED)
        // Only extend on OUTER edges.
        // Row: First (Left), Last (Right). Top/Bottom always.
        // Col: First (Top), Last (Bottom). Left/Right always.

        let bLeft = 0, bRight = 0, bTop = 0, bBottom = 0;

        if (layoutDir === 'row') {
            bTop = bleedPxHeight;
            bBottom = bleedPxHeight;
            if (idx === 0) bLeft = bleedPxWidth;
            if (idx === count - 1) bRight = bleedPxWidth;
        } else { // column
            bLeft = bleedPxWidth;
            bRight = bleedPxWidth;
            if (idx === 0) bTop = bleedPxHeight;
            if (idx === count - 1) bBottom = bleedPxHeight;
        }

        // Create Div
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${baseX - bLeft}px`;
        div.style.top = `${baseY - bTop}px`;
        div.style.width = `${baseW + bLeft + bRight}px`;
        div.style.height = `${baseH + bTop + bBottom}px`;
        div.style.backgroundColor = color;
        div.style.zIndex = '-1'; // Ensure it stays behind content if container is on top

        // Gradients handling (simple approximation for preview)
        if (color.includes('gradient')) {
            div.style.background = color;
        }

        bleedContainer.appendChild(div);

        // console.log(`📐 Bleed Element ${idx}: Color=${color}, Rect=[${baseX - bLeft}, ${baseY - bTop}, ${baseW + bLeft + bRight}, ${baseH + bTop + bBottom}]`);
    });
};

// Kifutó élőnézet eltávolítása
window.removeBleedPreview = function () {
    // console.log(`📐 removeBleedPreview called`);

    const bleedBg = document.getElementById('bleed-preview-bg');
    if (bleedBg) {
        bleedBg.style.display = 'none';
        bleedBg.style.background = '';
    }
};

// Kifutó gradiens inicializálása (alapértelmezett színekkel)
window.initBleedGradientStops = function () {
    const list = document.getElementById('bleed-grad-stops-list');
    if (!list) return;
    if (list.children.length === 0) {
        window.addBleedGradientStop('#0a0e27', 0);
        window.addBleedGradientStop('#1a1f3a', 50);
        window.addBleedGradientStop('#0a0e27', 100);
    }
};

// ============================================================
// --- KIFUTÓ (BLEED) BEÁLLÍTÁSOK VÉGE ---
// ============================================================


// --- 1. MINDEN VÁLASZTÓ FRISSÍTÉSE (Biztosan megjelenik a Szöveg választó is) ---
// --- DUPLICATE FUNCTIONS REMOVED ---
// window.updateElementSelectorUI and window.handleTemplateElementSelection definitions
// have been removed from here as they were duplicates of the functions defined earlier (~line 2200).
// --- ALKALMAZÁSI MÓDOK LÁTHATÓSÁGÁNAK FRISSÍTÉSE ---
window.updateApplyModeVisibility = function () {
    if (!myCelestialConf.userData) return;

    const uiState = myCelestialConf.userData.uiState;
    const selId = uiState.selectedElementId;
    const el = myCelestialConf.userData.elements.find(e => e.id == selId);

    const noneLabel = document.getElementById('apply-mode-none-label');
    const localLabel = document.getElementById('apply-mode-local-label');
    const globalRadio = document.querySelector('input[name="bg-mode-right"][value="global"]');
    const noneRadio = document.querySelector('input[name="bg-mode-right"][value="none"]');

    // Ha nem csillagtérkép (fotó/hold) van kiválasztva
    const isNotMap = el && el.type !== 'map';

    if (noneLabel) {
        if (isNotMap) {
            // Letiltjuk a "Csak csillagtérkép" opciót fotó/hold esetén
            noneLabel.style.opacity = '0.4';
            noneLabel.style.pointerEvents = 'none';
            noneLabel.title = 'Ez az opció csak csillagtérkép esetén elérhető';

            // Ha éppen ez volt kiválasztva, átváltunk globálisra
            if (noneRadio && noneRadio.checked && globalRadio) {
                globalRadio.checked = true;
            }
        } else {
            noneLabel.style.opacity = '1';
            noneLabel.style.pointerEvents = 'auto';
            noneLabel.title = '';
        }
    }
}

// ============================================================
// --- TELJES KÉPERNYŐS NÉZET (FULL SCREEN PREVIEW) ---
// ============================================================

window.fsViewMode = 'all'; // 'all' or 'selected'
window.fsCurrentZoom = 1;
window.fsPanX = 0;
window.fsPanY = 0;
window.fsIsPanning = false;
window.fsStartX = 0;
window.fsStartY = 0;

window.openFullScreenView = function () {
    const modal = document.getElementById('fs-preview-modal');
    const container = document.getElementById('fs-content-inner');
    if (!modal || !container) return;
    if (!myCelestialConf.userData) initUserData();

    // Show loading indicator
    if (window.showLoading) window.showLoading();
    modal.style.display = 'flex';
    container.innerHTML = '<div style="color:white;font-size:18px;text-align:center;padding:40px;">⏳ Exportálás folyamatban...</div>';

    // Use exportCanvas with forPreview=true (no bleed) and a preview callback
    exportCanvas('svg', function (svgSource) {
        try {
            window._processExportedPreview(svgSource);
        } catch (err) {
            console.error("[FS Preview] Error processing exported SVG:", err);
            container.innerHTML = '<div style="color:red;font-size:14px;text-align:center;padding:40px;">Hiba történt az előnézet generálásakor.</div>';
        }
        if (window.hideLoading) window.hideLoading();
    }, true);

    // --- TOUCH EVENT REGISTRATION ---
    const contentContainer = document.getElementById('fs-content-container');
    if (contentContainer) {
        contentContainer.addEventListener('touchstart', window.startTouchPan, { passive: false });
    }
    document.addEventListener('touchmove', window.touchPan, { passive: false });
    document.addEventListener('touchend', window.touchStopPan);
};

// --- Process the exported SVG and display it in the preview modal ---
window._processExportedPreview = function (svgString) {
    const modal = document.getElementById('fs-preview-modal');
    const container = document.getElementById('fs-content-inner');
    if (!modal || !container) return;

    // 1. Parse SVG string
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.documentElement;

    // Check for parse errors
    const parseError = doc.querySelector('parsererror');
    if (parseError) {
        console.error("[FS Preview] SVG parse error:", parseError.textContent);
        container.innerHTML = '<div style="color:red;">SVG parse error</div>';
        return;
    }

    svg.id = 'fs-preview-svg';
    svg.style.maxWidth = 'none';
    svg.style.maxHeight = 'none';
    svg.style.display = 'block';

    // 2. Since forPreview=true, the exported SVG has NO bleed.
    // The SVG viewBox IS the original canvas — use it directly.
    const vbStr = svg.getAttribute('viewBox');
    const vb = vbStr ? vbStr.trim().split(/\s+/).map(Number) : [0, 0, 5000, 7143];
    // console.log("[FS Preview] Exported SVG viewBox (no bleed):", vb.join(' '));

    const canvasX = vb[0];
    const canvasY = vb[1];
    const canvasW = vb[2];
    const canvasH = vb[3];

    // 3. Determine crop based on view mode (always WITHOUT bleed)
    const isSelectedMode = window.fsViewMode === 'selected';
    const allElements = myCelestialConf.userData.elements || [];
    const count = allElements.length > 0 ? allElements.length : 1;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const selId = myCelestialConf.userData.uiState.selectedElementId;

    let finalVB;

    if (!isSelectedMode) {
        // --- FULL CANVAS MODE (no bleed) ---
        finalVB = [canvasX, canvasY, canvasW, canvasH];
        // console.log("[FS Preview] Full Canvas mode (no bleed), viewBox:", finalVB.join(' '));
    } else {
        // --- SELECTED ELEMENT MODE (no bleed) ---
        const selIndex = allElements.findIndex(function (e) { return e.id == selId; });

        if (selIndex !== -1 && count > 1) {
            let slotX, slotY, slotW, slotH;

            if (layoutDir === 'column') {
                slotW = canvasW;
                slotH = canvasH / count;
                slotX = canvasX;
                slotY = canvasY + (selIndex * slotH);
            } else {
                slotW = canvasW / count;
                slotH = canvasH;
                slotX = canvasX + (selIndex * slotW);
                slotY = canvasY;
            }

            finalVB = [slotX, slotY, slotW, slotH];
            // console.log("[FS Preview] Selected Element mode, slot " + selIndex + ", viewBox:", finalVB.join(' '));
        } else {
            // Single element or not found — show entire canvas
            finalVB = [canvasX, canvasY, canvasW, canvasH];
            // console.log("[FS Preview] Selected mode but single element, viewBox:", finalVB.join(' '));
        }
    }

    // 5. Apply the crop viewBox and sync width/height attributes
    svg.setAttribute('viewBox', finalVB.join(' '));
    svg.setAttribute('width', finalVB[2]);
    svg.setAttribute('height', finalVB[3]);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('overflow', 'hidden');
    svg.style.width = '100%';
    svg.style.height = '100%';

    // For Selected Element mode, add explicit clipPath to guarantee neighbor clipping
    if (isSelectedMode && count > 1) {
        // Remove any previous preview clip
        const oldClip = svg.querySelector('#preview-clip-path');
        if (oldClip) oldClip.remove();

        const ns = 'http://www.w3.org/2000/svg';
        const defs = svg.querySelector('defs') || svg.insertBefore(document.createElementNS(ns, 'defs'), svg.firstChild);
        const clipPath = document.createElementNS(ns, 'clipPath');
        clipPath.id = 'preview-clip-path';
        const clipRect = document.createElementNS(ns, 'rect');
        clipRect.setAttribute('x', finalVB[0]);
        clipRect.setAttribute('y', finalVB[1]);
        clipRect.setAttribute('width', finalVB[2]);
        clipRect.setAttribute('height', finalVB[3]);
        clipPath.appendChild(clipRect);
        defs.appendChild(clipPath);

        // Wrap all content in a clipped group
        const wrapGroup = document.createElementNS(ns, 'g');
        wrapGroup.setAttribute('clip-path', 'url(#preview-clip-path)');
        // Move all children (except defs) into the clipped group
        const children = Array.from(svg.childNodes);
        children.forEach(function (child) {
            if (child.nodeName !== 'defs' && child !== wrapGroup) {
                wrapGroup.appendChild(child);
            }
        });
        svg.appendChild(wrapGroup);
        // console.log("[FS Preview] Applied clipPath for Selected Element mode");
    }

    // 6. Insert into DOM
    container.innerHTML = '';
    container.appendChild(svg);

    // 7. Background — always black for clean, distraction-free preview
    modal.style.background = '#000000';
    svg.style.backgroundColor = 'transparent';

    // 8. Reset Zoom
    window.setPreviewZoom('fit');

    // 9. Pan events
    document.addEventListener('mousemove', window.pan);
    document.addEventListener('mouseup', window.stopPan);

    console.log("[FS Preview] High-res preview ready.");
};

window.closeFullScreenView = function () {
    const modal = document.getElementById('fs-preview-modal');
    if (modal) modal.style.display = 'none';
    const container = document.getElementById('fs-content-inner');
    if (container) container.innerHTML = ''; // Memory cleanup

    document.removeEventListener('mousemove', window.pan);
    document.removeEventListener('mouseup', window.stopPan);

    // Touch event cleanup
    const contentContainer = document.getElementById('fs-content-container');
    if (contentContainer) {
        contentContainer.removeEventListener('touchstart', window.startTouchPan);
    }
    document.removeEventListener('touchmove', window.touchPan);
    document.removeEventListener('touchend', window.touchStopPan);
};

window.setPreviewZoom = function (val) {
    const container = document.getElementById('fs-content-inner');
    const svg = document.getElementById('fs-preview-svg');
    if (!container || !svg) return;

    if (val === 'fit') {
        // True fit to window: scale 1.0 means the SVG fills the container
        // preserveAspectRatio="xMidYMid meet" ensures it fits without distortion
        window.fsCurrentZoom = 1.0;
        window.fsPanX = 0;
        window.fsPanY = 0;
        // Reset transform
        container.style.transform = `translate(0px, 0px) scale(${window.fsCurrentZoom})`;

        // Slider update
        const slider = document.getElementById('fs-zoom-slider');
        if (slider) slider.value = window.fsCurrentZoom;
        updateZoomLevelDisplay();
        return;
    }

    if (val === 1) { // 1:1 Valós méret (életnagyságú)
        // 1cm = 37.795275591 CSS pixels (96 DPI web standard)
        // CSS pixels are resolution-independent — the browser handles DPI scaling
        const CM_TO_PX = 37.795275591;

        // Get canvas width in cm for the current view mode
        let widthCm = 21;
        if (myCelestialConf && myCelestialConf.userData && myCelestialConf.userData.canvas) {
            const count = myCelestialConf.userData.elements.length;
            const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
            const baseW = parseFloat(document.getElementById('canvas-width').value) || 21;

            if (layoutDir === 'row') widthCm = baseW * count;
            else widthCm = baseW;

            if (window.fsViewMode === 'selected') widthCm = baseW;
        }

        // Target width in CSS pixels for true 1:1 at screen DPI
        const targetPx = widthCm * CM_TO_PX;

        // Get SVG viewBox info
        const vb = svg.getAttribute('viewBox').split(' ').map(Number);
        const vbW = vb[2];
        const vbH = vb[3];
        const vbAspect = vbW / vbH;

        // Get the parent container dimensions
        const parentContainer = document.getElementById('fs-content-container');
        if (!parentContainer) return;
        const parentRect = parentContainer.getBoundingClientRect();
        const parentW = parentRect.width;
        const parentH = parentRect.height;
        const parentAspect = parentW / parentH;

        // Calculate ACTUAL RENDERED WIDTH at scale=1 (contain behavior)
        let renderedWidth;
        if (vbAspect > parentAspect) {
            renderedWidth = parentW;
        } else {
            renderedWidth = parentH * vbAspect;
        }

        // Scale: we want displayed width = targetPx
        let newScale = targetPx / renderedWidth;

        // Clamp
        if (newScale < 0.1) newScale = 0.1;
        if (newScale > 5) newScale = 5;

        console.log(`[1:1 Debug] widthCm=${widthCm}, targetPx=${targetPx.toFixed(1)}, renderedWidth=${renderedWidth.toFixed(1)}, newScale=${newScale.toFixed(3)}`);

        window.fsCurrentZoom = newScale;
        window.fsPanX = 0;
        window.fsPanY = 0;
        updateTransform();

        const slider = document.getElementById('fs-zoom-slider');
        if (slider) slider.value = newScale;
        updateZoomLevelDisplay();
        return;
    }
}

window.manualZoom = function (val) {
    window.fsCurrentZoom = parseFloat(val);
    updateTransform();
    updateZoomLevelDisplay();
}

function updateZoomLevelDisplay() {
    const span = document.getElementById('fs-zoom-level');
    if (span) span.innerText = Math.round(window.fsCurrentZoom * 100) + '%';
}

// --- PANNING LOGIC ---
window.startPan = function (e) {
    if (e.button !== 0) return;
    window.fsIsPanning = true;
    window.fsStartX = e.clientX - window.fsPanX;
    window.fsStartY = e.clientY - window.fsPanY;

    document.getElementById('fs-content-container').classList.add('panning');
    e.preventDefault();
}

window.pan = function (e) {
    if (!window.fsIsPanning) return;
    e.preventDefault();
    window.fsPanX = e.clientX - window.fsStartX;
    window.fsPanY = e.clientY - window.fsStartY;
    updateTransform();
}

window.stopPan = function () {
    window.fsIsPanning = false;
    const c = document.getElementById('fs-content-container');
    if (c) c.classList.remove('panning');
}

// --- TOUCH PANNING (Mobile) ---
window.startTouchPan = function (e) {
    if (e.touches.length !== 1) return;
    window.fsIsPanning = true;
    const touch = e.touches[0];
    window.fsStartX = touch.clientX - window.fsPanX;
    window.fsStartY = touch.clientY - window.fsPanY;

    const c = document.getElementById('fs-content-container');
    if (c) c.classList.add('panning');
    e.preventDefault();
}

window.touchPan = function (e) {
    if (!window.fsIsPanning || e.touches.length !== 1) return;
    e.preventDefault();
    const touch = e.touches[0];
    window.fsPanX = touch.clientX - window.fsStartX;
    window.fsPanY = touch.clientY - window.fsStartY;
    updateTransform();
}

window.touchStopPan = function () {
    window.fsIsPanning = false;
    const c = document.getElementById('fs-content-container');
    if (c) c.classList.remove('panning');
}

function updateTransform() {
    const container = document.getElementById('fs-content-inner');
    if (container) {
        container.style.transform = `translate(${window.fsPanX}px, ${window.fsPanY}px) scale(${window.fsCurrentZoom})`;
    }
}
// --- 10. SESSION RECOVERY (IndexedDB) ---
const DB_NAME = 'CelestialEditorDB'; // Unique name to avoid conflicts
const DB_VERSION = 1;
const STORE_NAME = 'editor_session';

const SessionDB = {
    db: null,

    init() {
        return new Promise((resolve, reject) => {
            if (this.db) return resolve(this.db);
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve(this.db);
            };
            request.onerror = (e) => reject(e.target.error);
        });
    },

    async save(data) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(data, 'current_session');
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    },

    async load() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get('current_session');
            request.onsuccess = () => resolve(request.result);
            request.onerror = (e) => resolve(null); // Return null if not found
        });
    },

    async clear() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete('current_session');
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e.target.error);
        });
    }
};
// Globális változó inicializálása valahol a script elején (vagy a window objektumon)
window.isSaveEnabled = false;
// Debounce for auto-save
let autoSaveTimeout;
window.triggerAutoSave = function () {
    // console.log("window.triggerAutoSave = function () {");
    // --- ÚJ RÉSZ: A KAPUŐR ---
    // Ha még nem engedélyeztük a mentést, azonnal lépjen ki.
    // Így hiába hívódik meg 232-szer, 232-szer azonnal vissza is tér erőforrás-használat nélkül.
    if (!window.isSaveEnabled) {
        return;
    }
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
        // console.log("window.triggerAutoSave = function () { autoSaveTimeout = setTimeout(() => {");
        window.autoSaveSession();
    }, 2000); // Save after 2 seconds of inactivity
};

// ============================================================
// --- COMPREHENSIVE AUTO-SAVE ---
// Saves the ENTIRE myCelestialConf object + highlights + visual state
// ============================================================
window.autoSaveSession = async function () {
    try {
        // console.log("autoSaveSession");
        //console.log("myCelestialConf.userData.elements[0].widthCM", myCelestialConf.userData.elements[0].widthCM);
        if (typeof myCelestialConf === 'undefined' || !myCelestialConf) return;
        if (!myCelestialConf.userData) initUserData();

        // Sync DOM inputs into myCelestialConf before saving
        /*const width = parseFloat(document.getElementById('canvas-width')?.value) || 21;*/
        /*const height = parseFloat(document.getElementById('canvas-height')?.value) || 30;*/
        const widthMap = parseFloat(document.getElementById('map-width-cm-input')?.value);

        /*myCelestialConf.userData.canvas.width = width;*/
        /*myCelestialConf.userData.canvas.height = height;*/

        // Capture the visual background (may be a gradient CSS string)
        const designerSvgEl = document.getElementById('designer-svg');
        const visualBackground = designerSvgEl ?
            (designerSvgEl.style.background || designerSvgEl.style.backgroundColor || '') : '';

        const sessionData = {
            // The ENTIRE myCelestialConf - this is the single source of truth
            conf: JSON.parse(JSON.stringify(myCelestialConf)),

            // Highlights (Celestial library state, separate from conf)
            highlights: (typeof Celestial !== 'undefined' && Celestial.highlightList) ?
                JSON.parse(JSON.stringify(Celestial.highlightList)) : {},

            // UI state that lives outside myCelestialConf
            ui: {
                currentTheme: window.currentTheme || 'Misty Original',
                activeTab: document.querySelector('.ui-tabs-active a')?.getAttribute('href') || '#fragment_r-1',
                scrollPos: window.scrollY
            },

            // Visual state that might not be in myCelestialConf
            visual: {
                background: visualBackground,
                wallColor: document.getElementById('wall-bg-color')?.value || '#BABABA'
            },

            // DOM inputs for quick restore
            inputs: {
                width: myCelestialConf.userData.canvas.width,
                height: myCelestialConf.userData.canvas.height,
                mapWidth: myCelestialConf.userData.elements[0].widthCM
                /*mapWidth: widthMap*/
            },

            // Map projection state (D3 projection parameters)
            mapState: null,

            timestamp: Date.now()
        };

        // Capture Map Projection State
        if (typeof Celestial !== 'undefined' && Celestial.mapProjection) {
            const proj = Celestial.mapProjection;
            sessionData.mapState = {
                center: proj.center ? proj.center() : null,
                rotate: proj.rotate ? proj.rotate() : null,
                scale: proj.scale ? proj.scale() : null,
                translate: proj.translate ? proj.translate() : null
            };
        }

        await SessionDB.save(sessionData);
        if (window.debugMode) console.log('[AutoSave] ✅ Session saved.', new Date().toLocaleTimeString());
    } catch (e) {
        console.error('[AutoSave] ❌ Failed:', e);
    }
};

window.checkAndPromptSession = async function () {
    try {
        const savedData = await SessionDB.load();
        if (savedData && savedData.conf) {
            const modal = new bootstrap.Modal(document.getElementById('recoveryModal'));
            modal.show();

            document.getElementById('restoreSession').onclick = function () {
                modal.hide();
                window.restoreSession(savedData);
            };

            document.getElementById('discardSession').onclick = async function () {
                await SessionDB.clear();
                modal.hide();
            };
        }
    } catch (e) {
        console.warn('[Session] Check failed or no session found:', e);
    }
};

// ============================================================
// --- COMPREHENSIVE RESTORE ---
// Restores the ENTIRE myCelestialConf + re-syncs ALL UI inputs
// ============================================================
window.restoreSession = async function (data) {
    window.showLoading();
    try {
        // console.log('[Session] 🔄 Restoring full session...', data);

        // ========== 1. RESTORE myCelestialConf (THE SINGLE SOURCE OF TRUTH) ==========
        window.myCelestialConf = data.conf;

        // ========== 2. RESTORE CANVAS/LAYOUT DOM INPUTS ==========
        if (document.getElementById('canvas-width')) document.getElementById('canvas-width').value = data.inputs.width;
        if (document.getElementById('canvas-height')) document.getElementById('canvas-height').value = data.inputs.height;
        if (document.getElementById('map-width-cm-input') && data.inputs.mapWidth) {
            document.getElementById('map-width-cm-input').value = data.inputs.mapWidth;
        }

        // ========== 3. RESTORE STAR CHART EDITOR UI INPUTS ==========
        // These inputs control the Celestial map's visual appearance (stars, constellations, etc.)
        // They must be synced from myCelestialConf so the UI reflects the saved state.
        try {
            const conf = myCelestialConf;

            // --- Milky Way ---
            if (conf.mw) {
                if (conf.mw.style) {
                    if (document.getElementById('mw_style_fill')) document.getElementById('mw_style_fill').value = conf.mw.style.fill || '';
                    if (document.getElementById('mw_style_opacity')) document.getElementById('mw_style_opacity').value = conf.mw.style.opacity ?? 1;
                }
                if (document.getElementById('mw_show')) {
                    document.getElementById('mw_show').checked = !!conf.mw.show;
                    const mwSettings = document.getElementById('mw_show_settings');
                    if (mwSettings) mwSettings.style.display = conf.mw.show ? '' : 'none';
                }
            }

            // --- Background (Map circle/outline) ---
            if (conf.background) {
                if (document.getElementById('background_fill')) document.getElementById('background_fill').value = conf.background.fill || '';
                if (document.getElementById('background_opacity')) document.getElementById('background_opacity').value = conf.background.opacity ?? 1;
                if (document.getElementById('background_stroke')) document.getElementById('background_stroke').value = conf.background.stroke || '';
                if (document.getElementById('background_stroke_width')) document.getElementById('background_stroke_width').value = conf.background.width ?? 1;

                // Dash settings
                const bgDash = conf.background.dash;
                const hasBgDash = bgDash && bgDash.length > 0;
                if (document.getElementById('background_stroke_dash_check')) {
                    document.getElementById('background_stroke_dash_check').checked = hasBgDash;
                }
                const bgDashSettings = document.getElementById('background_stroke_dash_settings');
                if (bgDashSettings) bgDashSettings.style.display = hasBgDash ? '' : 'none';
                if (hasBgDash) {
                    if (document.getElementById('background_stroke_dash_1')) document.getElementById('background_stroke_dash_1').value = bgDash[0];
                    if (document.getElementById('background_stroke_dash_2')) document.getElementById('background_stroke_dash_2').value = bgDash[1];
                }
            }

            // --- Stars ---
            if (conf.stars) {
                if (document.getElementById('stars_limit')) document.getElementById('stars_limit').value = conf.stars.limit ?? 6;
                if (document.getElementById('stars_size')) document.getElementById('stars_size').value = conf.stars.size ?? 5;
                if (conf.stars.style) {
                    if (document.getElementById('stars_style_fill')) document.getElementById('stars_style_fill').value = conf.stars.style.fill || '';
                    if (document.getElementById('stars_style_opacity')) document.getElementById('stars_style_opacity').value = conf.stars.style.opacity ?? 1;
                }
                if (document.getElementById('stars_show')) {
                    document.getElementById('stars_show').checked = !!conf.stars.show;
                    const starsSettings = document.getElementById('stars_show_settings');
                    if (starsSettings) starsSettings.style.display = conf.stars.show ? '' : 'none';
                }
            }

            // --- Constellations ---
            if (conf.constellations) {
                if (document.getElementById('const_show')) {
                    document.getElementById('const_show').checked = !!conf.constellations.lines;
                    const constSettings = document.getElementById('const_show_settings');
                    if (constSettings) constSettings.style.display = conf.constellations.lines ? '' : 'none';
                }
                if (conf.constellations.lineStyle) {
                    const cStyle = conf.constellations.lineStyle;
                    const cStroke = Array.isArray(cStyle.stroke) ? cStyle.stroke[0] : cStyle.stroke;
                    const cOpacity = Array.isArray(cStyle.opacity) ? cStyle.opacity[0] : cStyle.opacity;
                    const cWidth = Array.isArray(cStyle.width) ? cStyle.width[0] : cStyle.width;

                    if (document.getElementById('constellation_lineStyle_stroke')) document.getElementById('constellation_lineStyle_stroke').value = cStroke || '';
                    if (document.getElementById('constellation_lineStyle_opacity')) document.getElementById('constellation_lineStyle_opacity').value = cOpacity ?? 1;
                    if (document.getElementById('constellation_lineStyle_stroke_width')) document.getElementById('constellation_lineStyle_stroke_width').value = cWidth ?? 1;

                    // Constellation dash
                    let cDash = cStyle.dash;
                    if (Array.isArray(cDash) && cDash.length > 0 && Array.isArray(cDash[0])) cDash = cDash[0];
                    const hasConstDash = cDash && cDash.length > 0;
                    if (document.getElementById('constellation_lineStyle_dash_check')) {
                        document.getElementById('constellation_lineStyle_dash_check').checked = hasConstDash;
                    }
                    const constDashSettings = document.getElementById('constellation_lineStyle_dash_settings');
                    if (constDashSettings) constDashSettings.style.display = hasConstDash ? '' : 'none';
                    if (hasConstDash) {
                        if (document.getElementById('constellation_lineStyle_dash_1')) document.getElementById('constellation_lineStyle_dash_1').value = cDash[0];
                        if (document.getElementById('constellation_lineStyle_dash_2')) document.getElementById('constellation_lineStyle_dash_2').value = cDash[1];
                    }
                }
            }

            // --- Graticule (Grid lines) ---
            if (conf.lines && conf.lines.graticule) {
                const grat = conf.lines.graticule;
                if (document.getElementById('lines_graticule_color')) document.getElementById('lines_graticule_color').value = grat.stroke || '';
                if (document.getElementById('lines_graticule_size')) document.getElementById('lines_graticule_size').value = grat.width ?? 1;
                if (document.getElementById('lines_graticule_opacity')) document.getElementById('lines_graticule_opacity').value = grat.opacity ?? 0.5;
                if (document.getElementById('lines_graticule')) {
                    document.getElementById('lines_graticule').checked = !!grat.show;
                }

                // Graticule dash
                const gratDash = grat.dash;
                const hasGratDash = gratDash && gratDash.length > 0;
                if (document.getElementById('lines_graticule_dash_check')) {
                    document.getElementById('lines_graticule_dash_check').checked = hasGratDash;
                }
                const gratDashSettings = document.getElementById('lines_graticule_dash_settings');
                if (gratDashSettings) gratDashSettings.style.display = hasGratDash ? '' : 'none';
                if (hasGratDash) {
                    if (document.getElementById('lines_graticule_dash_1')) document.getElementById('lines_graticule_dash_1').value = gratDash[0];
                    if (document.getElementById('lines_graticule_dash_2')) document.getElementById('lines_graticule_dash_2').value = gratDash[1];
                }
            }

            // --- Projection selector ---
            if (conf.projection && document.getElementById('projection_')) {
                document.getElementById('projection_').value = conf.projection;
            }

            // --- 6. Helyszín és Dátum UI Szinkronizáció (HIÁNYZOTT!) ---
            if (conf.Varos && document.getElementById('city')) {
                document.getElementById('city').value = conf.Varos;
            }
            if (conf.geopos) {
                if (document.getElementById('coord_lat')) document.getElementById('coord_lat').value = conf.geopos[0];
                if (document.getElementById('coord_lon')) document.getElementById('coord_lon').value = conf.geopos[1];
            }
            if (conf.Ido && document.getElementById('datetimepicker') && typeof $ !== 'undefined') {
                try {
                    $("#datetimepicker").datetimepicker('setDate', new Date(conf.Ido));
                } catch (dtErr) { console.warn("Datetimepicker restore error:", dtErr); }
            }

            // --- 7. Csillagjegy UI Szinkronizáció ---
            if (conf.Csillagjegy && document.getElementById('zodiacsigns')) {
                document.getElementById('zodiacsigns').value = conf.Csillagjegy;
            }

        } catch (uiErr) {
            console.warn('[Session] ⚠️ Some UI inputs could not be synced:', uiErr);
        }

        // ========== 4. RESTORE THEME ==========
        if (data.ui && data.ui.currentTheme) {
            let themeObj = null;
            if (typeof data.ui.currentTheme === 'object') {
                themeObj = data.ui.currentTheme;
            } else if (typeof themes !== 'undefined') {
                themeObj = themes.find(t => t.name === data.ui.currentTheme);
            }

            if (themeObj) {
                window.applyTheme(themeObj);
            } else {
                console.warn('[Session] Theme not found:', data.ui.currentTheme);
            }
        }

        // ========== 5. RESTORE VISUAL BACKGROUND & WALL COLOR ==========
        if (data.visual) {
            if (data.visual.background) {
                const designerSvgEl = document.getElementById('designer-svg');
                if (designerSvgEl) {
                    designerSvgEl.style.background = data.visual.background;
                }
                const mapWrap = document.getElementById('map-wrap');
                if (mapWrap) mapWrap.style.background = data.visual.background;

                if (window.updateCanvasBackground && !data.visual.background.includes('gradient')) {
                    window.updateCanvasBackground(data.visual.background);
                }
            }
            if (data.visual.wallColor) {
                const wallInput = document.getElementById('wall-bg-color');
                if (wallInput) wallInput.value = data.visual.wallColor;
                if (typeof window.updateWallColor === 'function') {
                    window.updateWallColor(data.visual.wallColor);
                }
            }
        }

        // ========== 6. RE-APPLY MAP CONFIGURATION (Celestial.display) ==========
        if (typeof Celestial !== 'undefined') {
            try {
                // Re-display the Celestial map with the restored config
                if (typeof Celestial.display === 'function') {
                    // 1. Alap megjelenítés
                    myCelestialConf.width = (typeof getOptimalMapSize === 'function') ? getOptimalMapSize() : myCelestialConf.width;
                    Celestial.clear();
                    Celestial.display(myCelestialConf);

                    // 2. Kényszerített Stílus Frissítés (Milky Way & Background)
                    // Néha a display() nem frissíti a belső stílusokat, ha a config struktúra nem egyezik 100%-ban
                    if (myCelestialConf.mw && myCelestialConf.mw.style) {
                        // Nem hívunk külön API-t rá, mert nincs publikus setter, de a display-nek kezelnie kell.
                        // Ha mégsem, itt lehetne trükközni, de a display elvileg elég.
                    }
                }

                // 3. Dátum és Helyszín Kényszerítése
                if (myCelestialConf.Ido) {
                    try {
                        Celestial.date(new Date(myCelestialConf.Ido));
                    } catch (err) { console.warn("[Restore] Date restore error:", err); }
                }
                if (myCelestialConf.geopos) {
                    try {
                        Celestial.location(myCelestialConf.geopos);
                    } catch (err) { console.warn("[Restore] Location restore error:", err); }
                }

                // 4. Csillagjegy (Zodiac) Kiemelés és Zoom
                if (myCelestialConf.Csillagjegy) {
                    // Ez a függvény végzi a zoomolást és a vonalak megjelenítését
                    if (typeof Celestial.showConstellation === 'function') {
                        // console.log(`[Restore] Restoring Zodiac: ${myCelestialConf.Csillagjegy}`);
                        Celestial.showConstellation(myCelestialConf.Csillagjegy);
                    }
                }

                // 5. Projekció (Már volt, de itt hagyjuk)
                if (myCelestialConf.projection && typeof changeProjection === 'function') {
                    changeProjection(myCelestialConf.projection);
                }

                // 6. Térkép Mozgatás/Zoom (Pan/Zoom) visszaállítása
                if (data.mapState && Celestial.mapProjection) {
                    const proj = Celestial.mapProjection;
                    const state = data.mapState;

                    if (state.rotate && proj.rotate) proj.rotate(state.rotate);
                    if (state.center && proj.center) proj.center(state.center);
                    if (state.scale && proj.scale) proj.scale(state.scale);
                    if (state.translate && proj.translate) proj.translate(state.translate);

                    if (Celestial.redraw) Celestial.redraw();
                }

                // 7. Kiemelések (Highlights)
                if (data.highlights && Celestial.highlightList !== undefined) {
                    Celestial.highlightList = data.highlights;
                    if (Celestial.redraw) Celestial.redraw();
                }
            } catch (mapErr) {
                console.warn('[Session] ⚠️ Map restore partial failure:', mapErr);
            }
        }

        // ========== 7. FORCE RE-RENDERS ==========
        if (window.updateMapPreview) window.updateMapPreview();
        if (window.redrawTextLayer) window.redrawTextLayer();
        if (window.updateCanvasSize) window.updateCanvasSize();
        if (window.refreshMapTransform) window.refreshMapTransform();
        if (window.renderSmartpointsList) window.renderSmartpointsList();
        if (window.updateGUIFromConfig) window.updateGUIFromConfig(myCelestialConf);
        // console.log('[Session] ✅ Full restore complete.');
        window.showCustomAlert("Munkamenet sikeresen visszaállítva!", "success");

    } catch (e) {
        console.error('[Session] ❌ Restore failed:', e);
        window.showCustomAlert("Hiba a visszaállítás közben!", "error");
    } finally {
        setTimeout(() => {
            window.hideLoading();
        }, 500);
    }
};

// ============================================================
// --- AUTO-SAVE EVENT LISTENERS ---
// ============================================================
window.addEventListener('load', () => {
    // console.log("window.addEventListener('load', () => {");
    // Small delay to ensure other inits are done
    /*setTimeout(() => {
        window.checkAndPromptSession();
    }, 1000);*/

    // Attach Auto-Save listeners to all form inputs
    document.querySelectorAll('input, select, textarea').forEach(el => {
        // console.log("document.querySelectorAll('input, select, textarea').forEach(el => {");
        el.addEventListener('change', window.triggerAutoSave);
        el.addEventListener('input', window.triggerAutoSave);
    });
    // 2. Várunk, amíg az oldal "megnyugszik"
    setTimeout(() => {
        window.checkAndPromptSession();

        // --- ÚJ RÉSZ: ENGEDÉLYEZÉS ---
        // Most, hogy az inicializálás és a betöltés kész, engedélyezzük a mentést.
        window.isSaveEnabled = true;
        // console.log("Auto-save rendszer élesítve (mostantól figyel a változásokra).");

    }, 1000); // 1 másodperc múlva élesedik
    // Capture Map Interactions (Drag/Zoom end)
    /*const mapContainer = document.getElementById('celestial-map');
    if (mapContainer) {
        mapContainer.addEventListener('mouseup', window.triggerAutoSave);
        mapContainer.addEventListener('touchend', window.triggerAutoSave);
        mapContainer.addEventListener('wheel', window.triggerAutoSave, { passive: true });
    }*/
});

// ==========================================
// --- THEME SYSTEM IMPLEMENTATION ---
// ==========================================

const themes = [
    // Light Themes (Restored & Fixed)
    { name: 'Ivory Elegance', colors: ['#FDFBFB', '#FFFFFF', '#C5A059'], dark: false, category: 'light' },
    { name: 'Porcelain', colors: ['#F8F6F3', '#EEEBE5', '#8B7355'], dark: false, category: 'light' },
    { name: 'Morning Mist', colors: ['#F5F7FA', '#E8EDF5', '#5C7AEA'], dark: false, category: 'light' },
    { name: 'Sage Whisper', colors: ['#F4F7F4', '#E8F0E8', '#6B8E6B'], dark: false, category: 'light' },
    { name: 'Blush Rose', colors: ['#FDF6F6', '#F5EBEB', '#D4A5A5'], dark: false, category: 'light' },
    { name: 'Vanilla Cream', colors: ['#FFFEF5', '#FFF8E7', '#D4A574'], dark: false, category: 'light' },
    { name: 'Pearl White', colors: ['#FFFFFF', '#F0F0F0', '#9CA3AF'], dark: false, category: 'light' },
    // --- MISTY / LIGHT SETS ---
    { name: "Misty Original", colors: ["#FDFBFB", "#FFFFFF", "#C5A059"], dark: false, category: "light" },
    { name: "Rose Gold", colors: ["#FFF0F5", "#FFFFFF", "#D4AF37"], dark: false, category: "light" },
    { name: "Vintage Blush", colors: ["#F4E1E1", "#FFFAFA", "#8B5F65"], dark: false, category: "light" },
    { name: "Soft Romance", colors: ["#FFF5F7", "#FFFFFF", "#E6C2C2"], dark: false, category: "light" },
    { name: "Dusty Rose", colors: ["#E0D0D5", "#F5EBEB", "#5C4033"], dark: false, category: "light" },
    { name: "Porcelain Pink", colors: ["#FFFEFE", "#FFE4E1", "#708090"], dark: false, category: "light" },
    { name: "Misty Copper", colors: ["#FFE4E1", "#FFF", "#B87333"], dark: false, category: "light" },
    { name: "Champagne", colors: ["#FAF0E6", "#FFF5EE", "#C5A059"], dark: false, category: "light" },
    // --- MODERN / MINIMAL ---
    { name: "Scandi", colors: ["#F7F7F7", "#FFFFFF", "#333333"], dark: false, category: "modern" },
    { name: "Cream & Gold", colors: ["#F5F5DC", "#FFFFF0", "#DAA520"], dark: false, category: "modern" },
    { name: "Arctic", colors: ["#F0F8FF", "#FFFFFF", "#4682B4"], dark: false, category: "modern" },
    { name: "Urban", colors: ["#F0F0F0", "#FFFFFF", "#FF4500"], dark: false, category: "modern" },
    { name: "Latte", colors: ["#EBE0D6", "#FFF8F0", "#6F4E37"], dark: false, category: "modern" },
    { name: "Pure Gold", colors: ["#FAFAFA", "#FFFFFF", "#FFD700"], dark: false, category: "modern" },
    { name: "Marble", colors: ["#E5E5E5", "#F9F9F9", "#000000"], dark: false, category: "modern" },
    { name: "Sage", colors: ["#F0FFF0", "#FFFFFF", "#556B2F"], dark: false, category: "modern" },
    { name: "Lavender", colors: ["#F3E5F5", "#FFFFFF", "#9370DB"], dark: false, category: "modern" },
    // --- DARK / PREMIUM ---
    { name: "Onyx", colors: ["#000000", "#111111", "#FFFFFF"], dark: true, category: "dark" },
    { name: "Midnight", colors: ["#0B1026", "#151B3B", "#C5A059"], dark: true, category: "dark" },
    { name: "Deep Space", colors: ["#121212", "#1E1E1E", "#BB86FC"], dark: true, category: "dark" },
    { name: "Emerald", colors: ["#04291C", "#083D2A", "#D4AF37"], dark: true, category: "dark" },
    { name: "Royal", colors: ["#1A0526", "#2D0A3D", "#E6C200"], dark: true, category: "dark" },
    { name: "Cosmic", colors: ["#121212", "#1E1E1E", "#BB86FC"], dark: true, category: "dark" },
    { name: "Chocolate", colors: ["#3E2723", "#4E342E", "#D7CCC8"], dark: true, category: "dark" },
    { name: "Gunmetal", colors: ["#263238", "#37474F", "#00BCD4"], dark: true, category: "dark" },
    { name: "Velvet Red", colors: ["#4A0404", "#600606", "#FFD700"], dark: true, category: "dark" },
    { name: "Space Grey", colors: ["#1C1C1E", "#2C2C2E", "#0A84FF"], dark: true, category: "dark" },
    { name: "Vampire", colors: ["#1A0000", "#2E0000", "#FF0000"], dark: true, category: "dark" },
    // --- EXTRA / VIBRANT ---
    { name: "Ocean", colors: ["#E0F7FA", "#4DD0E1", "#006064"], dark: false, category: "vibrant" },
    { name: "Sunset", colors: ["#FFF3E0", "#FFB74D", "#E65100"], dark: false, category: "vibrant" },
    { name: "Mint", colors: ["#E0F2F1", "#4DB6AC", "#004D40"], dark: false, category: "vibrant" },
    { name: "Berry", colors: ["#FCE4EC", "#F06292", "#880E4F"], dark: false, category: "vibrant" },
    { name: "Steel", colors: ["#ECEFF1", "#90A4AE", "#263238"], dark: false, category: "vibrant" },
    { name: "Cyber", colors: ["#0d0d0d", "#1a1a1a", "#00ffcc"], dark: true, category: "vibrant" },
    { name: "Miami", colors: ["#222", "#333", "#ff00ff"], dark: true, category: "vibrant" },
    { name: "Forest", colors: ["#1b2e1b", "#2a422a", "#55aa55"], dark: true, category: "vibrant" },
    { name: "Lemonade", colors: ["#FFFDE7", "#FFF59D", "#FBC02D"], dark: false, category: "vibrant" },
    { name: "Ice", colors: ["#E3F2FD", "#90CAF9", "#1565C0"], dark: false, category: "vibrant" },
    { name: "Ruby", colors: ["#2b0a0a", "#4a1212", "#ff3333"], dark: true, category: "vibrant" }
];

window.currentTheme = "Onyx";

window.toggleThemePanel = function () {
    const el = document.getElementById('themePanel');
    if (el) el.classList.toggle('active');
}

window.applyTheme = function (themeInput) {
    // console.log(`🪲 [DEBUG] applyTheme called. Input:`, themeInput);
    let themeName = themeInput;
    let theme = null;

    if (typeof themeInput === 'object') {
        theme = themeInput;
        themeName = theme.name;
    } else {
        theme = themes.find(t => t.name === themeInput);
    }

    if (!theme) {
        console.warn("Theme not found:", themeInput);
        return;
    }

    window.currentTheme = themeName;
    const [bg, blob, accent] = theme.colors;
    const root = document.documentElement;

    // Background colors
    root.style.setProperty('--bg-color', bg);
    root.style.setProperty('--blob-1', blob);
    root.style.setProperty('--blob-2', accent);
    root.style.setProperty('--blob-3', theme.dark ? '#333333' : '#cccccc');

    // Glass/Text colors based on dark/light mode
    if (theme.dark) {
        root.style.setProperty('--glass-surface', 'rgba(0, 0, 0, 0.4)');
        root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--glass-highlight', 'rgba(255, 255, 255, 0.15)');
        root.style.setProperty('--text-main', '#f0f0f0');
        root.style.setProperty('--text-muted', '#aaaaaa');
        root.style.setProperty('--card-bg', 'rgba(40, 40, 40, 0.6)');
        root.style.setProperty('--card-bg-hover', 'rgba(60, 60, 60, 0.7)');
        root.style.setProperty('--card-bg-light', 'rgba(30, 30, 30, 0.6)');
    } else {
        root.style.setProperty('--glass-surface', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--glass-highlight', 'rgba(255, 255, 255, 0.5)');
        root.style.setProperty('--text-main', '#1a1a1a');
        root.style.setProperty('--text-muted', '#555555');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.6)');
        root.style.setProperty('--card-bg-hover', 'rgba(255, 255, 255, 0.75)');
        root.style.setProperty('--card-bg-light', 'rgba(255, 255, 255, 0.5)');
    }

    // Accent colors
    root.style.setProperty('--accent', accent);

    // Gradient helper
    const adjustBrightness = (hex, percent) => {
        if (!hex || hex.length < 4) return hex;
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = Math.min(255, Math.max(0, r + (r * percent / 100)));
        g = Math.min(255, Math.max(0, g + (g * percent / 100)));
        b = Math.min(255, Math.max(0, b + (b * percent / 100)));
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    };

    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accent} 0%, ${adjustBrightness(accent, -20)} 100%)`);

    // Legacy variable support
    root.style.setProperty('--color-primary', theme.dark ? '#f0f0f0' : '#1a1a1a');
    root.style.setProperty('--color-secondary', accent);
    root.style.setProperty('--color-accent', accent);


    // Update blob colors (Simple logic)
    document.querySelectorAll('.b4, .b5').forEach((el, i) => {
        if (themeName === "Misty Original") {
            // Default behavior
        } else {
            el.style.background = i === 0 ? "#575757" : "#676767";
        }
    });

    // Mark active theme
    document.querySelectorAll('.theme-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.theme === themeName) {
            item.classList.add('active');
        }
    });

    localStorage.setItem('selectedTheme', themeName);

    // Update Quick Toggle Icon
    const toggleBtn = document.getElementById('quickThemeToggle');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = theme.dark ? 'fas fa-sun' : 'fas fa-moon';
            toggleBtn.title = theme.dark ? 'Váltás Világos módra' : 'Váltás Sötét módra';
        }
    }
}

window.applyCustomTheme = function () {
    const bg = document.getElementById('customColorMain').value;
    const blob = document.getElementById('customColorSec').value;
    const accent = document.getElementById('customColorAcc').value;

    const root = document.documentElement;

    // Helper
    const isColorDark = (hex) => {
        if (!hex) return true;
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    };

    const isDark = isColorDark(bg);

    root.style.setProperty('--bg-color', bg);
    root.style.setProperty('--blob-1', blob);
    root.style.setProperty('--blob-2', accent);
    root.style.setProperty('--blob-3', isDark ? '#333333' : '#cccccc');

    if (isDark) {
        root.style.setProperty('--glass-surface', 'rgba(0, 0, 0, 0.4)');
        root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--text-main', '#f0f0f0');
        root.style.setProperty('--text-muted', '#aaaaaa');
        root.style.setProperty('--card-bg', 'rgba(40, 40, 40, 0.6)');
    } else {
        root.style.setProperty('--glass-surface', 'rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--glass-border', 'rgba(0, 0, 0, 0.1)');
        root.style.setProperty('--text-main', '#1a1a1a');
        root.style.setProperty('--text-muted', '#555555');
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.6)');
    }

    root.style.setProperty('--accent', accent);

    // Gradient helper duplicated for scope
    const adjustBrightness = (hex, percent) => {
        if (!hex || hex.length < 4) return hex;
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        r = Math.min(255, Math.max(0, r + (r * percent / 100)));
        g = Math.min(255, Math.max(0, g + (g * percent / 100)));
        b = Math.min(255, Math.max(0, b + (b * percent / 100)));
        return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    };
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accent} 0%, ${adjustBrightness(accent, -20)} 100%)`);

    // Legacy mapping
    root.style.setProperty('--color-primary', isDark ? '#f0f0f0' : '#1a1a1a');

    window.currentTheme = "Custom";
    document.querySelectorAll('.theme-item').forEach(item => item.classList.remove('active'));
    window.toggleThemePanel();
}

window.renderThemeGrid = function () {
    const container = document.getElementById('themePanelBody');
    if (!container) return;

    const categories = ['light', 'modern', 'dark', 'vibrant'];
    const categoryNames = {
        light: '🌸 Világos / Romantikus',
        modern: '🏛️ Modern / Minimal',
        dark: '🌙 Sötét / Prémium',
        vibrant: '🎨 Vibráns / Extra'
    };

    let html = '';
    categories.forEach(cat => {
        const catThemes = themes.filter(t => t.category === cat);
        html += `<div class="theme-category">
            <div class="theme-category-title">${categoryNames[cat]}</div>
            <div class="theme-grid">`;
        catThemes.forEach(t => {
            html += `<div class="theme-item ${t.name === window.currentTheme ? 'active' : ''}" data-theme="${t.name}" onclick="window.applyTheme('${t.name}')">
                <div class="theme-colors">
                    <div class="theme-color-swatch" style="background: ${t.colors[0]}"></div>
                    <div class="theme-color-swatch" style="background: ${t.colors[1]}"></div>
                    <div class="theme-color-swatch" style="background: ${t.colors[2]}"></div>
                </div>
                <div class="theme-name">${t.name}</div>
            </div>`;
        });
        html += '</div></div>';
    });
    container.innerHTML = html;
}

function initThemeSystem() {
    // console.log('[ThemeSystem] Initializing...');
    const btn = document.getElementById('themeSelectorBtn');
    const panel = document.getElementById('themePanel');
    const closeBtn = document.getElementById('themePanelClose');
    const applyBtn = document.getElementById('applyCustomColors');
    const toggleBtn = document.getElementById('quickThemeToggle');

    if (btn) {
        btn.onclick = (e) => {
            e.preventDefault();
            window.toggleThemePanel();
        };
    }

    if (closeBtn) closeBtn.onclick = () => window.toggleThemePanel();

    if (applyBtn) applyBtn.onclick = window.applyCustomTheme;

    if (toggleBtn) {
        toggleBtn.onclick = (e) => {
            e.preventDefault();
            // Simple toggle between Onyx (Dark) and Misty Original (Light)
            const target = (window.currentTheme === 'Onyx' || window.currentTheme === 'Midnight' || window.currentTheme === 'Deep Space')
                ? 'Misty Original' : 'Onyx';
            window.applyTheme(target);
        };
    }

    window.renderThemeGrid();

    // Apply default or saved theme
    const saved = localStorage.getItem('selectedTheme') || 'Onyx';
    // console.log('[ThemeSystem] Applying saved theme:', saved);
    setTimeout(() => window.applyTheme(saved), 100);
}

// Initialize Theme System
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSystem);
} else {
    initThemeSystem();
}

// --- ÚJ: Térkép beállítások betöltése UI-ra ---
window.loadMapSettingsToUI = function (id) {
    if (!myCelestialConf.userData) initUserData();
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el || !el.celestialConfig) return;

    const conf = el.celestialConfig;

    console.log(`[DEBUG] loadMapSettingsToUI: Loading settings for Map ${id}... City: ${conf.Varos}`);

    // 1. Város
    const cityInput = document.getElementById('city');
    if (cityInput) {
        cityInput.value = conf.Varos || "";
    }

    // 2. Dátum (jQuery UI Datepicker)
    const dateInput = document.getElementById('datetimepicker');
    if (dateInput && conf.Ido) {
        try {
            const d = new Date(conf.Ido);
            if (!isNaN(d.getTime())) {
                if (typeof $ !== 'undefined' && $(dateInput).datepicker) {
                    $(dateInput).datepicker("setDate", d);
                } else {
                    // Fallback
                    // dateInput.value = d.toISOString().split('T')[0];
                }
            }
        } catch (e) {
            console.error("[DEBUG] Date load error:", e);
        }
    }

    // 3. Koordináták
    const latInput = document.getElementById('coord_lat');
    const lonInput = document.getElementById('coord_lon');

    // Check if geopos exists and is array
    if (conf.geopos && Array.isArray(conf.geopos)) {
        if (latInput) latInput.value = conf.geopos[0];
        if (lonInput) lonInput.value = conf.geopos[1];
    } else if (conf.Lokacio && Array.isArray(conf.Lokacio)) {
        if (latInput) latInput.value = conf.Lokacio[0];
        if (lonInput) lonInput.value = conf.Lokacio[1];
    }

    // 4. Timezone
    // (If needed)

    console.log(`[DEBUG] loadMapSettingsToUI: Completed. City Input Value: ${cityInput ? cityInput.value : 'N/A'}`);
};
