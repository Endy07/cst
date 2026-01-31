// --- 1. KONSTANSOK ÉS GLOBÁLIS VÁLTOZÓK ---
const MOON_IMG_SRC = 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Full_Moon_as_Seen_From_Denmark.jpg';

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
window.tempMoonShadow = "black";
let designerSVG, textLayer, mapLayer, transformGroup;
let activeSymbolZone = null;
let activeSymbolBlockId = null;
let cropper;
let tempInsertSide = 'end'; 
let tempUploadedFileName = ''; 

// --- 2. ADATBÁZIS ÉS INITIALIZÁLÁS ---
function initUserData() {
    if (typeof myCelestialConf === 'undefined' || !myCelestialConf) {
        window.myCelestialConf = {};
    }
    
    if (!myCelestialConf.userData) {
        console.log("Adatbázis inicializálása (V5.15 - Cleaned)...");
        myCelestialConf.userData = {
            canvas: { 
                // width: 21, height: 30, background: "#ffffff", wallColor: "#BABABA", resizeLock: true,
                width: 21, height: 30, background: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)", wallColor: "#BABABA", resizeLock: true, 
                ratio: 21/30, lastW: 21, lastH: 30, resizeRatio: 21/30,
                layoutDirection: 'row' 
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
    }
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
window.setLayoutDirection = function(dir) {
    if(!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.canvas.layoutDirection = dir;
    updateLayoutButtons(dir);
    updateCanvasSize();
    refreshMapTransform();
    updateElementSelectorUI(); 
}

function updateLayoutButtons(dir) {
    const btnRow = document.getElementById('btn-layout-row');
    const btnCol = document.getElementById('btn-layout-column');
    const btnRow_ = document.getElementById('btn-layout-row_');
    const btnCol_ = document.getElementById('btn-layout-column_');
    if(!btnRow || !btnCol || !btnRow_ || !btnCol_) return;
    
    if (dir === 'row') {
        btnRow.className = 'add-btn primary';
        btnCol.className = 'add-btn secondary';
        btnRow_.className = 'add-btn primary';
        btnCol_.className = 'add-btn secondary';
        const l1 = document.getElementById('lbl-element-margin-top'); if(l1) l1.innerText = "Bal Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if(l2) l2.innerText = "Jobb Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "SOR (↔)";
        document.getElementById('btn-add-start').innerHTML = "⬅ BALRA (Elejére)";
        document.getElementById('btn-add-end').innerHTML = "➡ JOBBRA (Végére)";
    } else {
        btnRow.className = 'add-btn secondary';
        btnCol.className = 'add-btn primary';
        btnRow_.className = 'add-btn secondary';
        btnCol_.className = 'add-btn primary';
        const l1 = document.getElementById('lbl-element-margin-top'); if(l1) l1.innerText = "Felső Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if(l2) l2.innerText = "Alsó Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "OSZLOP (↕)";
        document.getElementById('btn-add-start').innerHTML = "⬆ FENTRE (Tetejére)";
        document.getElementById('btn-add-end').innerHTML = "⬇ LENTRE (Végére)";
    }
}


// --- JAVÍTOTT ÉS PROFESSZIONÁLIS: Vászon méretezése ---
window.updateCanvasSize = function() {
    if(!myCelestialConf.userData) initUserData();

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

    console.log(`Vászon újraszámolása: ${count} elem -> ${totalWidthCm}x${totalHeightCm} cm`);

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
    if(bgRect) {
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
    setTimeout(function() {
        if (window.refreshMapTransform) window.refreshMapTransform();
    }, 50);
}

window.toggleResizeLock = function(checkbox) {
    if(!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.canvas.resizeLock = checkbox.checked; 
    if (myCelestialConf.userData.canvas.resizeLock) {
        const w = parseFloat(document.getElementById('canvas-width').value) || 21;
        const h = parseFloat(document.getElementById('canvas-height').value) || 30;
        myCelestialConf.userData.canvas.lastW = w;
        myCelestialConf.userData.canvas.lastH = h;
        myCelestialConf.userData.canvas.resizeRatio = w / h;
    }
}

window.handleCanvasParamChange = function(type, val) {
    if(!myCelestialConf.userData) initUserData();
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

window.updateWallColor = function(color) {
    if(!myCelestialConf.userData) initUserData();
    const area = document.getElementById('designer-canvas-area');
    if(area) area.style.backgroundColor = color;
    myCelestialConf.userData.canvas.wallColor = color;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


// BBox segéd
function getMapContentBBox(mapSvg) {
    try {
        if (mapSvg.tagName === 'image') {
             return {x:0, y:0, width: parseFloat(mapSvg.getAttribute('width')), height: parseFloat(mapSvg.getAttribute('height'))};
        }
        if (typeof mapSvg.getBBox === 'function') {
            return mapSvg.getBBox();
        }
        return {x:0,y:0,width:1000,height:1000};
    } catch(e) { 
        return {x:0,y:0,width:1000,height:1000}; 
    }
}



// --- JAVÍTOTT: refreshMapTransform (ViewBox alapú Pixel-Pontos Igazítás) ---
window.refreshMapTransform = function() {
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

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('id', `element-group-${el.id}`);
        g.setAttribute('class', `designer-element type-${el.type}`);

        // Méretezés (KERET MÉRETE = 20cm alap)
        const contentBaseSize = 1000; 
        let desiredWidthCm = el.widthCM || 20;
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
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = el.vectorData;
            const svgNode = tempDiv.querySelector('svg');
            if (svgNode) {
                // Fix méret és pozíció, hogy a csoporton belül ne ugráljon
                svgNode.setAttribute('width', contentBaseSize);
                svgNode.setAttribute('height', contentBaseSize);
                svgNode.setAttribute('x', 0);
                svgNode.setAttribute('y', 0);
                svgNode.setAttribute('id', `embedded-map-${el.id}`);
                svgNode.style.pointerEvents = "none"; 
                svgNode.style.overflow = "visible"; 
                contentNode = svgNode;
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
        
        const oldClip = defs.querySelector(`#${clipId}`); if(oldClip) oldClip.remove();
        const oldMask = defs.querySelector(`#${maskId}`); if(oldMask) oldMask.remove();

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
        g.onclick = function(e) {
            const uiState = myCelestialConf.userData.uiState;
            if (uiState.placingSmartpoint || uiState.movingSmartpointId) {
                window.handleCanvasClick(e); e.stopPropagation(); return;
            }
            e.stopPropagation();
            if (el.type === 'map') {
                window.loadMapToEditor(el.id);
                if(window.handleElementSelection) window.handleElementSelection(el.id);
            } else {
                window.highlightPhoto(el.id, this);
                if(window.handleElementSelection) window.handleElementSelection(el.id);
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
                     try { bbox = bg.getBBox(); } catch(e) {}

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
             } catch(e) { 
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
            circle.setAttribute("fill", circleColor); circle.setAttribute("stroke", "white"); circle.setAttribute("stroke-width", radiusPx*0.1);
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
                const icons = {'audio': '🎵', 'video': '🎥', 'image': '🖼️', 'url': '🔗'};
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
window.updateLayoutVisibility = function() {
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

let tempSPType = null;
let editingSPId = null; // Ha szerkesztünk egy meglévőt


window.startAddSmartpoint = function() {
    window.editingSPId = null; // JAVÍTVA: Globális reset
    
    document.getElementById('sp-type-selector').style.display = 'block';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'none';
    
    // Gombok alaphelyzetbe állítása
    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));
    
    // Ha esetleg maradt volna kijelölés a listában, azt is töröljük
    renderSmartpointsList();
}

window.selectSPType = function(type, btn) {
    tempSPType = type;
    
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

window.saveSmartpoint = function() {
    if (!tempSPType) return;
    
    var dessvg = document.getElementById('designer-svg');
    dessvg.style.cursor = "pointer";
    let content = '';
    
    // Tartalom kinyerése
    if (['audio', 'video', 'image'].includes(tempSPType)) {
        const fileInp = document.getElementById('sp-input-file');
        if (fileInp.files.length > 0) content = fileInp.files[0].name;
        else { 
            // Ha szerkesztünk és nem választott új fájlt, tartsuk meg a régit
            if (window.editingSPId) { // JAVÍTVA: window.editingSPId
                const existing = myCelestialConf.userData.smartpoints.find(sp => sp.id === window.editingSPId);
                if (existing) content = existing.content;
            } else {
                showCustomAlert("Válassz fájlt!"); return; 
            }
        }
    } else {
        content = document.getElementById('sp-input-url').value;
        if (!content) { showCustomAlert("Adj meg URL-t!"); return; }
    }
    
    if (window.editingSPId) { // JAVÍTVA: window.editingSPId ellenőrzése
        // --- SZERKESZTÉS MENTÉSE (UPDATE) ---
        const sp = myCelestialConf.userData.smartpoints.find(s => s.id === window.editingSPId);
        if (sp) {
            sp.type = tempSPType;
            sp.content = content;
            showCustomAlert("Okospont sikeresen frissítve!", true);
        }
        window.editingSPId = null; // Reset
        
        cancelSmartpoint(); // Bezárjuk a szerkesztőt
        renderSmartpointsList(); // Lista frissítése
        window.refreshMapTransform(); // Ikon frissítése a vásznon
    } else {
        // --- ÚJ LÉTREHOZÁSA (LERAKÁSRA VÁR) ---
        if(!myCelestialConf.userData.uiState) initUserData();
        
        if (!myCelestialConf.userData.uiState.showSmartpoints) {
            toggleSmartpointsVisibility(); 
        }

        myCelestialConf.userData.uiState.placingSmartpoint = {
            id: Date.now(),
            type: tempSPType,
            content: content,
            x: null, y: null
        };
        
        cancelSmartpoint();
        showCustomAlert("Kattints a vásznon oda, ahová az Okospontot szeretnéd tenni!");
    }
}


// --- JAVÍTOTT: Okospont szerkesztése (Áthelyezés gomb beszúrásával) ---
window.editSmartpoint = function(id) {
    const sp = myCelestialConf.userData.smartpoints.find(s => s.id === id);
    if (!sp) return;

    // editingSPId = id;
    // Beállítjuk a globális szerkesztési ID-t
    window.editingSPId = id;

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
        <button onclick="window.startMoveSpecificSmartpoint(${id})" class="add-btn secondary" style="width:100%; background: #ffeb3b; color: black; font-weight: bold; margin-bottom: 10px;">
            ✥ Okospont Áthelyezése
        </button>
        <div style="text-align:center; font-size:10px; color:#aaa; margin-bottom:5px;">
            Jelenlegi pozíció: X: ${sp.x.toFixed(1)} cm, Y: ${sp.y.toFixed(1)} cm
        </div>
    `;
    moveBtnContainer.style.display = 'block';

    // Görgetés
    selector.scrollIntoView({behavior: 'smooth'});
}

window.cancelSmartpoint = function() {
    document.getElementById('sp-type-selector').style.display = 'none';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'block';
    
    document.getElementById('sp-input-url').value = '';
    document.getElementById('sp-input-file').value = '';
    
    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));
    
    // Eltüntetjük az extra mozgatás gombot, ha van
    const moveBtnContainer = document.getElementById('sp-edit-move-container');
    if (moveBtnContainer) moveBtnContainer.style.display = 'none';

    tempSPType = null;
    window.editingSPId = null; // Töröljük az aktív szerkesztési ID-t
    
    renderSmartpointsList(); // Újrarajzoljuk a listát (eltűnik a kék keret)
}


// --- 3. JAVÍTOTT: Véglegesítés és Takarítás ---
window.finalizeSmartpointPlacement = function(x, y) {
    if(!myCelestialConf.userData.smartpoints) myCelestialConf.userData.smartpoints = [];

    // 1. ÚJ LERAKÁSA
    if (myCelestialConf.userData.uiState.placingSmartpoint) {
        const newSP = myCelestialConf.userData.uiState.placingSmartpoint;
        newSP.x = x;
        newSP.y = y;
        myCelestialConf.userData.smartpoints.push(newSP);
        myCelestialConf.userData.uiState.placingSmartpoint = null;
        
        if(window.renderSmartpointsList) window.renderSmartpointsList();
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
        
        // Reset
        myCelestialConf.userData.uiState.movingSmartpointId = null;
        myCelestialConf.userData.uiState.isMovingSmartpoints = false;
    }
    
    window.refreshMapTransform(); 
}

// Ezt ellenőrizd vagy írd be a fájl végére:
const svgEl = document.getElementById('designer-svg');
if (svgEl) {
    svgEl.onclick = window.handleCanvasClick;
}
window.deleteSmartpoint = function(id) {
    if(confirm("Biztosan törlöd ezt az Okospontot?")) {
        myCelestialConf.userData.smartpoints = myCelestialConf.userData.smartpoints.filter(sp => sp.id !== id);
        renderSmartpointsList();
        window.refreshMapTransform();
    }
}

// --- MEGJELENÍTÉS ÉS ÁTHELYEZÉS VEZÉRLÉS ---

window.toggleSmartpointsVisibility = function() {
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

window.toggleSmartpointsMoveMode = function() {
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
window.startMoveSpecificSmartpoint = function(id) {
    if(!myCelestialConf.userData) initUserData();
    var dessvg = document.getElementById('designer-svg');
    dessvg.style.cursor = "pointer";
    // 1. TOGGLE LOGIKA: Ha már ezt mozgatjuk, akkor kapcsoljuk KI.
    if (myCelestialConf.userData.uiState.movingSmartpointId === id) {
        console.log("🛑 Mozgatás megszakítása (Toggle OFF)");
        
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
    console.log(`🚀 Mozgatás indítása: SP ID ${id}`);
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
    if(canvas) canvas.scrollIntoView({behavior: 'smooth'});
    
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
window.showCustomAlert = function(text, isSuccess = false) {
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
window.renderSmartpointsList = function() {
    const list = document.getElementById('smartpoints-list');
    if (!list) return;
    
    // Adatbázis inicializálása ha kell
    if(!myCelestialConf.userData) initUserData();
    if(!myCelestialConf.userData.smartpoints) myCelestialConf.userData.smartpoints = [];

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
        const isEditing = (window.editingSPId === sp.id);
        
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
    if(activeItem) {
        setTimeout(() => {
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// --- JAVÍTOTT: Fotó/Hold hozzáadása (Vászon növeléssel) ---
window.addNewElement = function(type, dataURL, side, fileName) {
    if(!myCelestialConf.userData) initUserData();
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
    if(window.updateCanvasSize) window.updateCanvasSize();
    
    updateElementSelectorUI();
    highlightPhoto(newId, null);
    
    if(window.refreshMapTransform) window.refreshMapTransform();
}
window.addCurrentItem = function(side) {
    if(!myCelestialConf.userData) initUserData();
    const mode = myCelestialConf.userData.uiState.activeAddMode || 'photo'; 
    
    if (mode === 'photo') {
        tempInsertSide = side; 
        const uploadInput = document.getElementById('photo-upload');
        if(uploadInput) uploadInput.click();
    } else if (mode === 'moon') {
        addMoonElement(side);
    } else if (mode === 'map') {
        addMapElement(side); 
    }
}



window.toggleAddPanel = function(mode) {
    if(!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.uiState.activeAddMode = mode;
    document.querySelectorAll('.add-btn').forEach(b => b.classList.remove('primary'));
    
    // Panel láthatóságok
    const pMoon = document.getElementById('panel-moon-gen');
    const pPhoto = document.getElementById('panel-photo-upload');
    
    if(pMoon) pMoon.style.display = (mode === 'moon') ? 'block' : 'none';
    if(pPhoto) pPhoto.style.display = (mode === 'photo') ? 'block' : 'none';

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
                    <input type="checkbox" id="moon-text-check" checked style="width: 16px; height: 16px;">
                    <label for="moon-text-check" style="margin: 0; cursor: pointer;">Szöveg megjelenítése a kép alatt</label>
                </div>

                <div style="text-align:center; margin-bottom:15px;">
                    <img id="moon-preview-img" src="" style="width:120px; height:120px; border-radius:50%; display:inline-block; box-shadow: 0 0 15px rgba(255,255,255,0.1);">
                </div>

                <div class="setting-group">
                    <label>Dátum:</label>
                    <input type="date" id="moon-date" onchange="updateMoonPreview()" style="width:100%;">
                </div>
                <div class="setting-group">
                    <label>Idő (UTC):</label>
                    <input type="time" id="moon-time" value="12:00" onchange="updateMoonPreview()" style="width:100%;">
                </div>

                <div class="setting-group" style="margin-top: 10px; border-top: 1px solid #444; padding-top: 10px;">
                    <label>Helyszín (Forgatáshoz):</label>
                    <input type="text" id="add-moon-city-search" placeholder="Város keresése..." style="width:100%;">
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
                btnB.onclick = () => { window.tempMoonShadow = 'black'; updateAddPanelUI(); updateMoonPreview(); };
                btnT.onclick = () => { window.tempMoonShadow = 'transparent'; updateAddPanelUI(); updateMoonPreview(); };
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

    if(bPhoto) bPhoto.className = (mode === 'photo') ? 'add-btn primary' : 'add-btn secondary';
    if(bMoon) bMoon.className = (mode === 'moon') ? 'add-btn primary' : 'add-btn secondary';
    if(bMap) bMap.className = (mode === 'map') ? 'add-btn primary' : 'add-btn secondary';
}

function updateAddPanelUI() {
    // Képforrás gombok
    const isNasa = (window.tempMoonSource === 'nasa');
    const btnNasa = document.getElementById('add-btn-src-nasa');
    const btnOrig = document.getElementById('add-btn-src-original');
    if(btnNasa && btnOrig) {
        btnNasa.className = isNasa ? 'add-btn primary' : 'add-btn secondary';
        btnOrig.className = !isNasa ? 'add-btn primary' : 'add-btn secondary';
    }

    // Árnyék gombok
    const isBlack = (window.tempMoonShadow === 'black');
    const btnB = document.getElementById('add-btn-shadow-black');
    const btnT = document.getElementById('add-btn-shadow-trans');
    if(btnB && btnT) {
        btnB.className = isBlack ? 'add-btn primary' : 'add-btn secondary';
        btnT.className = !isBlack ? 'add-btn primary' : 'add-btn secondary';
    }
    const padInp = document.getElementById('add-moon-padding');
    if(padInp) padInp.value = window.tempMoonPadding;
}

// --- 3. MÓDOSÍTÁS: Kijelöléskor adatok betöltése ---
window.highlightPhoto = function(id, element) {
    if(!myCelestialConf.userData) initUserData();
    
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
    if(titleEl) titleEl.innerText = (el.subType === 'moon') ? 'HOLD MÉRETE' : 'KÉP MÉRETE';
    
    const wInput = document.getElementById('photo-width-cm-input');
    if (wInput) wInput.value = el.widthCM || 20;

    // Hold panel kezelés
    const mep = document.getElementById('moon-edit-panel');
    if (el.subType === 'moon') {
        if(mep) {
            mep.style.display = 'block';
            // --- ÚJ: COLLAPSIBLE SZERKEZET ---
            mep.innerHTML = `
                <div class="collapsible-header" data-target="moon-settings-content" style="margin-bottom:0;">
                    <h2 style="margin:0; font-size:14px; color:var(--accent-purple);">🌔 HOLD BEÁLLÍTÁSOK</h2>
                    <span class="collapsible-icon"><i class="collapsible-icon-icon">▼</i></span>
                </div>
                
                <div class="collapsible-content" id="moon-settings-content" style="padding:10px; background: rgba(0,0,0,0.2); border: 1px solid #444; border-top: none; border-radius: 0 0 8px 8px;">
                    
                    <div class="setting-group">
                        <label>Dátum:</label>
                        <input type="date" id="moon-edit-date" style="width:100%;">
                    </div>
                    <div class="setting-group">
                        <label>Idő (UTC):</label>
                        <input type="time" id="moon-edit-time" style="width:100%;">
                    </div>

                    <div class="setting-group" style="margin-top:10px; padding-top:10px; border-top:1px solid #444;">
                        <label>Helyszín (Forgatáshoz):</label>
                        <input type="text" id="moon-city-search" placeholder="Város keresése..." style="margin-bottom:5px; width:100%;">
                        
                        <div class="grid-2-cols">
                            <div>
                                <label style="font-size:10px; color:#aaa;">Lat:</label>
                                <input type="number" id="moon-edit-lat" step="0.0001">
                            </div>
                            <div>
                                <label style="font-size:10px; color:#aaa;">Lon:</label>
                                <input type="number" id="moon-edit-lon" step="0.0001">
                            </div>
                        </div>
                    </div>
                    
                    <div id="edit-controls-placeholder"></div>
                </div>
            `;
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
            if(dateInp) {
                dateInp.value = dateVal;
                dateInp.onchange = () => updateActiveMoonSettings(null);
            }
            const timeInp = document.getElementById('moon-edit-time');
            if(timeInp) {
                timeInp.value = timeVal;
                timeInp.onchange = () => updateActiveMoonSettings(null);
            }
            const latInp = document.getElementById('moon-edit-lat');
            if(latInp) {
                latInp.value = latVal;
                latInp.onchange = () => updateActiveMoonSettings(null);
            }
            const lonInp = document.getElementById('moon-edit-lon');
            if(lonInp) {
                lonInp.value = lonVal;
                lonInp.onchange = () => updateActiveMoonSettings(null);
            }
            const cityInp = document.getElementById('moon-city-search');
            if(cityInp) cityInp.value = cityVal;

            // Gombok állapota
            const btnB = document.getElementById('edit-btn-shadow-black');
            const btnT = document.getElementById('edit-btn-shadow-trans');
            
            if(btnB && btnT) {
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
        if(mep) mep.style.display = 'none';
    }

    switchTextContext(`photo_${id}`);
    updateElementSelectorUI();
}

window.initSpecificMoonAutocomplete = function(inputId, mode) {
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
                if(latInp) latInp.value = lat.toFixed(4);
                if(lonInp) lonInp.value = lon.toFixed(4);
                
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
        input.addEventListener('keydown', (e) => { if(e.key === 'Enter') e.preventDefault(); });
    }
}

// Fotó szélesség beállítása (Kifutó ellenőrzéssel)
window.setPhotoWidth = function(val) {
    if(!myCelestialConf.userData) initUserData();
    const id = myCelestialConf.userData.uiState.activePhotoId;
    if(!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(!el) return;

    const inputEl = document.getElementById('photo-width-cm-input');
    if (!val && inputEl) val = parseFloat(inputEl.value);
    
    // Kifutó ellenőrzés
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

window.fitPhotoToCanvas = function() {
    if(!myCelestialConf.userData) initUserData();
    const canvasWidthInput = document.getElementById('canvas-width');
    const canvasHeightInput = document.getElementById('canvas-height');
    
    if(canvasWidthInput && canvasHeightInput) {
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1);
        
        const photoInput = document.getElementById('photo-width-cm-input');
        if(photoInput) photoInput.value = maxWidth;
        
        window.setPhotoWidth(maxWidth);
    }
}


// --- JAVÍTOTT: Térkép betöltése (Nem ugrik vissza az elsőre) ---
window.loadMapToEditor = function(id) {
    if(!myCelestialConf.userData) initUserData();
    
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
        if(typeof renderActiveHighlights === 'function') renderActiveHighlights();
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
    if(!myCelestialConf.userData.zones[`map_${id}`]) {
        myCelestialConf.userData.zones[`map_${id}`] = { top: {blocks:[]}, bottom: {blocks:[]} };
    }
    
    // Váltás a pontos ID-ra
    switchTextContext(`map_${id}`);
    
    // Lista frissítése
    updateElementSelectorUI();
}
// Térkép szélesség
window.setMapWidth = function(val) {
    if(!myCelestialConf.userData) initUserData();
    
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

window.fitMapToCanvas = function() {
    if(!myCelestialConf.userData) initUserData();
    const canvasWidthInput = document.getElementById('canvas-width');
    const canvasHeightInput = document.getElementById('canvas-height');
    
    if(canvasWidthInput && canvasHeightInput) {
        // let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1);
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value), parseFloat(canvasHeightInput.value));
        const mapInput = document.getElementById('map-width-cm-input');
        if(mapInput) mapInput.value = maxWidth;
        window.setMapWidth(maxWidth);
    }
}

// Közös vezérlők
function updateCommonControls(el) {
    ['top', 'center', 'bottom'].forEach(type => {
        const btn = document.getElementById(`btn-align-${type}`);
        if(btn) {
            btn.style.border = (type === el.align) ? "1px solid #4a9eff" : "1px solid #555";
            btn.style.backgroundColor = (type === el.align) ? "#333" : "";
        }
    });

    const topCont = document.getElementById('element-margin-top-container');
    const bottomCont = document.getElementById('element-margin-bottom-container');
    if(topCont) {
        topCont.style.display = (el.align === 'top') ? 'block' : 'none';
        document.getElementById('element-margin-top').value = el.marginTop || 0;
    }
    if(bottomCont) {
        bottomCont.style.display = (el.align === 'bottom') ? 'block' : 'none';
        document.getElementById('element-margin-bottom').value = el.marginBottom || 0;
    }
    
    // Feliratok
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const l1 = document.getElementById('lbl-element-margin-top');
    const l2 = document.getElementById('lbl-element-margin-bottom');
    if(l1 && l2) {
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
    if(slider) {
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
window.setElementAlign = function(align) {
    console.log("window.setElementAlign = function(align) {");
    console.log("window.setElementAlign = function(align) { align", align);
    const id = myCelestialConf.userData.uiState.selectedElementId;
    console.log("window.setElementAlign = function(align) { id", id);
    if(!id) return;
    console.log("window.setElementAlign = function(align) {");
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(el) {
        el.align = align;
        window.refreshMapTransform();
        window.renderFixedTexts();
        updateCommonControls(el);
    }
}

window.updateElementMargin = function(side, val) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(el) {
        if (side === 'top') el.marginTop = parseFloat(val) || 0;
        if (side === 'bottom') el.marginBottom = parseFloat(val) || 0;
        window.refreshMapTransform();
        window.renderFixedTexts();
    }
}

window.setCommonMask = function(type) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(el) {
        el.mask = type;
        updateCommonControls(el);
        window.refreshMapTransform();
    }
}

window.updateCommonMaskScale = function(val) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(el) {
        el.maskScale = parseInt(val) / 100;
        window.refreshMapTransform();
    }
}

window.updateCommonBorderProp = function(prop, value) {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if(el) {
        if (prop === 'width') { el.borderWidth = parseInt(value); document.getElementById('common-border-disp').innerText = value + 'px'; }
        else if (prop === 'color') el.borderColor = value;
        else if (prop === 'enabled') { el.borderEnabled = value; document.getElementById('common-border-settings-wrapper').style.display = value ? 'block' : 'none'; }
        else if (prop === 'blur') { el.borderBlur = parseInt(value); document.getElementById('common-border-blur-disp').innerText = value + 'px'; }
        else if (prop === 'offset') { el.borderDistance = parseInt(value); document.getElementById('common-border-offset-disp').innerText = value; }
        else if (prop === 'edgeBlur') { el.edgeBlur = parseInt(value); document.getElementById('common-edge-blur-disp').innerText = value + 'px'; }
        
        window.refreshMapTransform();
    }
}

window.deleteActiveElement = function() {
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
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
window.updateElementSelectorUI = function() {
    if(!myCelestialConf.userData) initUserData();
    
    const uiState = myCelestialConf.userData.uiState;
    const currentCtx = uiState.currentTextContext;
    const allElements = myCelestialConf.userData.elements || [];
    
    // --- 0. BIZTONSÁGI LÉPÉS: Konténer pótlása, ha hiányzik ---
    let textContainer = document.getElementById('photo-text-selector-container');
    
    if (!textContainer) {
        // Megkeressük a jobb oldali panel vezérlő konténerét
        const parent = document.querySelector('#fragment_r-2 .designer-controls');
        
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
                        <select id="text-mode-selector" onchange="window.handleUnifiedSelection(this.value)" style="width:100%; padding:8px; background:rgba(0,0,0,0.3); color:white; border:1px solid #444; border-radius:4px; font-weight:bold; cursor: pointer;">
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
                        if(el) visualVal = (el.type === 'map') ? `map_${el.id}` : `photo_${el.id}`;
                    }
                } else if (currentCtx === 'map') {
                    visualVal = 'map_main-map';
                }
                
                // Csak akkor állítjuk be, ha nem 'common' (hogy ne legyen üres)
                if(visualVal && visualVal !== 'common') {
                     // Ellenőrizzük, hogy létezik-e ilyen opció
                     if (visualSelect.querySelector(`option[value="${visualVal}"]`)) {
                         visualSelect.value = visualVal;
                     }
                }
                
                visualSelect.onchange = function() { window.handleUnifiedSelection(this.value); };
            }
        }
    }
}

// --- 2. VÁLASZTÁS KEZELÉSE (MINDENHONNAN) ---
window.handleUnifiedSelection = function(value) {
    if(!myCelestialConf.userData) initUserData();

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

        if (typePrefix === 'map') {
            // Térkép betöltése
            if (window.loadMapToEditor) window.loadMapToEditor(id);
        } else {
            // Fotó/Hold kiemelése
            if (window.highlightPhoto) window.highlightPhoto(id);
        }
    }
}


window.handleElementSelection = function(id) {
    if (!id) return;
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el) return;
    
    if (el.type === 'map') {
        loadMapToEditor(el.id);
    } else {
        highlightPhoto(el.id, null);
    }
}


// --- JAVÍTOTT: Új Térkép hozzáadása (Biztosított szövegzónákkal) ---
window.addMapElement = function(side) {
    if(!myCelestialConf.userData) initUserData();
    const newId = Date.now();
    
    // 1. Konfiguráció másolása
    const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
    if (currentConfig.userData) delete currentConfig.userData; 
    
    if (typeof Celestial !== 'undefined' && typeof Celestial.date === 'function') {
         currentConfig.Ido = Celestial.date(); 
    }
    var cityInput = document.getElementById('city');
    if(cityInput) currentConfig.Varos = cityInput.value;

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
        myCelestialConf.userData.zones[newZoneKey] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
        
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
    if(window.updateCanvasSize) window.updateCanvasSize();
    
    // 5. Lista frissítése (Ez fontos, hogy az új elem megjelenjen a selectben!)
    if(window.updateElementSelectorUI) window.updateElementSelectorUI();
    
    // 6. Betöltés
    loadMapToEditor(newId);
    
    // 7. Vektoros generálás
    if(typeof Celestial !== 'undefined') Celestial.resize({width: 1440});
    setTimeout(() => {
        if(typeof window.copyMapToDesigner === 'function') {
            window.copyMapToDesigner();
        }
    }, 500);
}
window.updateActiveMapSnapshot = function() {
    
    // Ellenőrizzük, hogy van-e elérhető Celestial export
    if(typeof Celestial !== 'undefined' && typeof Celestial.exportSVG === 'function') {
        
        // FONTOS JAVÍTÁS:
        // Nem null-t adunk át, hanem egy üres függvényt! 
        // Ez azért kell, mert a celestial_jo.js ellenőrzi, hogy van-e callback.
        // Ha null-t kap, azonnal megáll. Ha függvényt kap, továbbmegy, 
        // és a belső logikánk (a módosított q.await) úgyis a handleVectorExport-ot hívja majd.
        
        Celestial.exportSVG(function() { 
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
window.handleVectorExport = function(svgContent) {
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
        // targetEl.vectorData = scopedSvg;
        
        // // Config snapshot frissítése (A jelenlegi beállítások mentése)
        // const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
        // MENTÉS
        targetEl.vectorData = svgContent;
        
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
};


// --- INIT ÉS EGYÉB ---
window.updatePhotoMaskUI = function(activeType, prefix = 'p-mask-btn') {
    document.querySelectorAll('.mask-option').forEach(el => {
        el.style.border = '1px solid #555';
        el.style.borderColor = '#555';
    });
    const activeBtn = document.getElementById(`${prefix}-${activeType}`);
    if(activeBtn) activeBtn.style.border = '2px solid #4a9eff';
}



// --- 3. KONTEXTUS VÁLTÓ (DEBUG MÓDBAN + JAVÍTÁS) ---
window.switchTextContext = function(context) {
    console.log("--------------------------------------------------");
    console.log("🔀 switchTextContext MEGHÍVVA ezzel:", context);
    
    if(!myCelestialConf.userData) initUserData();

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
        if (!zones.common) zones.common = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
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
    if(titleTop) titleTop.innerText = `📝 FELSŐ ZÓNA (${label})`;
    const titleBottom = document.getElementById('bottom-zone-title');
    if(titleBottom) titleBottom.innerText = `📝 ALSÓ ZÓNA (${label})`;

    // 7. UI FRISSÍTÉS
    const flags = myCelestialConf.userData.uiState.zoneFlags || {};
    const chkTop = document.getElementById('chk-common-top'); if(chkTop) chkTop.checked = !!flags.topCommon;
    const chkBottom = document.getElementById('chk-common-bottom'); if(chkBottom) chkBottom.checked = !!flags.bottomCommon;

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
window.handleCanvasClick = function(e) {
    if(!myCelestialConf.userData) return;
    
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
    e.stopPropagation();
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
window.loadMapSettingsToUI = function(elementId) {
    const el = myCelestialConf.userData.elements.find(e => e.id == elementId);
    if (!el || el.type !== 'map') return;

    // Az adatokat a celestialConfig-ból vesszük ki, mert ott van elmentve minden
    const conf = el.celestialConfig || {};

    // 1. Dátum
    const dateInp = document.getElementById('date'); 
    if(dateInp && conf.Ido) {
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
    if(locInp && conf.Varos) {
        locInp.value = conf.Varos;
    }
    
    // 4. Szélesség/Hosszúság (geopos tömbből)
    const latInp = document.getElementById('lat');
    const lngInp = document.getElementById('lng');
    if (conf.geopos) {
        if(latInp) latInp.value = conf.geopos[0];
        if(lngInp) lngInp.value = conf.geopos[1];
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
        const parent = document.querySelector('#fragment_r-2 .designer-controls');
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
            <select onchange="window.switchTextContext(this.value)" style="width:100%; padding:8px; background:rgba(0,0,0,0.3); color:white; border:1px solid #444; border-radius:4px; font-weight:bold;">${options}</select>
        </div>
    `;
}
// --- UTILS ---
function initDefaultTexts() {
    if(!myCelestialConf.userData) return;
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

window.renderFixedTexts = function() {
    if (!getDOMElements()) return;
    if(!myCelestialConf.userData) initUserData();

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
        renderComplexZone(z.blocks, 'top', 0, globalContentTop, 0, totalW, z.align||'center', (z.margin||0)*pxPerCm, pxPerCm);
    }
    
    if (zoneFlags.bottomCommon && zones.common && zones.common.bottom) {
        let z = zones.common.bottom;
        renderComplexZone(z.blocks, 'bottom', globalContentBottom, totalH, 0, totalW, z.align||'center', (z.margin||0)*pxPerCm, pxPerCm);
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
            renderComplexZone(z.blocks, 'top', slotStartY, contentTop, slotStartX, slotEndX, z.align||'center', (z.margin||0)*pxPerCm, pxPerCm);
        }

        if (!zoneFlags.bottomCommon && zones[contextKey] && zones[contextKey].bottom) {
            let z = zones[contextKey].bottom;
            renderComplexZone(z.blocks, 'bottom', contentBottom, slotEndY, slotStartX, slotEndX, z.align||'center', (z.margin||0)*pxPerCm, pxPerCm);
        }
    });
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
window.toggleBlockSettings = function(zone, id) {
    if(!myCelestialConf.userData) initUserData();
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
    node.onclick = function(e) { 
        e.stopPropagation(); 
        const textArea = document.getElementById(`textarea-${block.id}`);
        if(textArea) {
            textArea.focus();
            textArea.scrollIntoView({behavior: "smooth", block: "center"});
            // Opcionális: Kijelölhetjük a szerkesztőben az inputot vizuálisan
            textArea.style.borderColor = "var(--accent-blue)";
            setTimeout(() => textArea.style.borderColor = "#555", 2000);
        }
    };
}

// --- JAVÍTOTT ÉS TELJES: addNewBlockToStore ---
window.addNewBlockToStore = function(zoneType, zoneSide, isNewLine) {
    if(!myCelestialConf.userData) initUserData();
    
    // Hova tegyük? (Közös vagy Egyéni)
    const currentCtx = myCelestialConf.userData.uiState.currentTextContext;
    const targetCtx = (zoneType === 'common') ? 'common' : currentCtx;
    
    if (!myCelestialConf.userData.zones[targetCtx]) {
        myCelestialConf.userData.zones[targetCtx] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
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
        calculated: {x:0, y:0}
    };
    
    zoneData.blocks.push(newBlock);
    
    // UI és Vászon frissítése
    if(window.renderZoneUI) {
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



window.renderZoneUI = function(zone) {
    if(!myCelestialConf.userData) initUserData();
    
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags;
    const elements = myCelestialConf.userData.elements || [];
    const container = document.getElementById(`${zone}-blocks-container`);
    
    if(!container) return;
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
        if(settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = headerHTML + `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>⚠️ A Közös ${zone === 'top' ? 'Felső' : 'Alsó'} Szövegdoboz aktív.</p><button onclick="switchTextContext('common')" class="add-btn primary" style="width:auto; font-size:12px;">Ugrás a Közös szerkesztőhöz ➡</button></div>`;
        return;
    }
    if (isCommonContext && !isZoneCommonActive) {
        if(settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = headerHTML + `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>Ez a zóna jelenleg "Egyéni" módra van állítva.</p></div>`;
        return;
    }
    if(settingsGroup) settingsGroup.style.display = 'block';

    if (!myCelestialConf.userData.zones[currentTextContext]) {
        myCelestialConf.userData.zones[currentTextContext] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
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
        <select onchange="applyTextTemplate('${zone}', this.value); this.value='';" style="width:100%; padding:6px; background:#111; color:white; border:1px solid #444; border-radius:4px;">
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
    if(alignSelect) alignSelect.value = data.alignV;

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
        let marginHTML = `<div style="margin-top:8px;"><label style="font-size:10px; color:#4a9eff;">${marginLabel} (cm):</label><input type="number" value="${block.marginSide||0}" step="0.1" oninput="updateBlockData('${zone}', ${block.id}, 'marginSide', this.value)" style="width:100%;"></div>`;

        const alignmentSelectorHTML = `
            <div>
                <label style="font-size:10px;">Rendezés:</label>
                <select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)">
                    <option value="start" ${block.alignH==='start'?'selected':''}>Balra</option>
                    <option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option>
                    <option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option>
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
                <textarea id="textarea-${block.id}" rows="2" oninput="window.updateBlockContentAndPreview('${zone}', ${block.id}, this.value)" style="width:100%; font-family:'${block.font}'; font-size: 24px; background:rgba(0,0,0,0.3); color:white; border:1px solid #555; padding:5px;">${block.content}</textarea>
            </div>

            <div onclick="window.toggleBlockSettings('${zone}', ${block.id})" style="cursor:pointer; background:rgba(255,255,255,0.05); padding:5px 10px; border-radius:4px; font-size:11px; color:#aaa; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <span>⚙️ ${toggleText}</span>
                <span>${toggleIcon}</span>
            </div>

            <div id="settings-panel-${block.id}" style="display:${displayStyle}; padding: 10px; background:rgba(0,0,0,0.15); border-radius:6px; margin-bottom:10px;">
                <div class="grid-2-cols" style="gap:10px; margin-bottom:8px;">
                    <div>
                        <label style="font-size:10px;">Betűméret: <span style="color:var(--accent-blue); float:right;">${calculateCM(block.size)}</span></label>
                        <input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)">
                    </div>
                    <div>
                        <label style="font-size:10px;">Szín:</label><input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:38px;">
                    </div>
                </div>

                <div class="grid-2-cols" style="gap:10px; margin-bottom:8px;">
                    <div>
                        <label style="font-size:10px;">Betűtípus:</label>
                        <select id="font-select-${block.id}" onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="width:100%; font-family:'${block.font}'; padding: 5px;">
                            ${fontOptions}
                        </select>
                    </div>
                    ${alignmentSelectorHTML}
                </div>

                <div style="display:flex; gap:5px; margin-bottom:12px;">
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'weight', '${isBold ? 'normal' : 'bold'}')" class="add-btn" style="flex:1; padding:5px; background:${isBold ? 'var(--accent-blue)' : '#333'}; font-weight:bold;">B</button>
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'style', '${isItalic ? 'normal' : 'italic'}')" class="add-btn" style="flex:1; padding:5px; background:${isItalic ? 'var(--accent-blue)' : '#333'}; font-style:italic;">I</button>
                    <button onclick="window.updateBlockData('${zone}', ${block.id}, 'decoration', '${isUnderline ? 'none' : 'underline'}')" class="add-btn" style="flex:1; padding:5px; background:${isUnderline ? 'var(--accent-blue)' : '#333'}; text-decoration:underline;">U</button>
                </div>

                <div style="border-top:1px solid #444; padding-top:8px;">
                    <label style="font-size:11px; margin-bottom:5px; display:flex; align-items:center;">
                        <input type="checkbox" ${hasOutline ? 'checked' : ''} onchange="window.updateBlockData('${zone}', ${block.id}, 'strokeWidth', this.checked ? 1 : 0)" style="width:auto; margin-right:8px;"> 
                        🔲 Körvonal (Stroke)
                    </label>
                    <div style="display:${hasOutline ? 'flex' : 'none'}; gap:10px; align-items:center;">
                        <input type="color" value="${block.strokeColor || '#000000'}" oninput="window.updateBlockData('${zone}', ${block.id}, 'strokeColor', this.value)" style="width:40px; height:30px; padding:0; border:none;">
                        <div style="flex:1;">
                            <input type="range" min="0.1" max="5" step="0.1" value="${block.strokeWidth || 0}" oninput="window.updateBlockData('${zone}', ${block.id}, 'strokeWidth', this.value)">
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
                <button onclick="insertBlockAt('${zone}', ${index}, true)" class="add-btn primary" style="flex:1; padding:5px; font-size:10px;" title="Új sor beszúrása ez ALÁ">⏎ Alá</button>
                <button onclick="insertBlockAt('${zone}', ${index - 1}, true)" class="add-btn primary" style="flex:1; padding:5px; font-size:10px;" title="Új sor beszúrása ez FÖLÉ">⬆ Felé</button>
                <button onclick="insertBlockAt('${zone}', ${index}, false)" class="add-btn secondary" style="flex:1; padding:5px; font-size:10px;" title="Új elem ugyanebbe a sorba">➕ Mellé</button>
                <button onclick="removeBlock('${zone}', ${block.id})" class="add-btn" style="width:auto; padding:5px; background:#ff4444; color:white;" title="Törlés">🗑</button>
            </div>
        `;

        container.appendChild(div);
    });

}



window.toggleCommonZone = function(zone, isChecked) {
    if(!myCelestialConf.userData) initUserData();
    
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


window.renderPhotoTextSelector = function() {
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
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (!myCelestialConf.userData.zones[currentTextContext]) return null;
    return myCelestialConf.userData.zones[currentTextContext][zone];
}

window.toggleDataBlock = function(zone, tag) {
    if(!myCelestialConf.userData) initUserData();
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
            calculated: {x:0, y:0}
        };

        data.blocks.push(newBlock);
        renderZoneUI(zone);
        window.renderFixedTexts();
    }
}
window.applyTextTemplate = function(zone, text) {
    if (!text) return;
    const data = getCurrentZoneData(zone);
    data.blocks.push({ id: Date.now() + Math.random(), isNewLine: true, content: text, font: "Great Vibes", size: (zone === 'top' ? 80 : 50), weight: "normal", color: "#e8edf5", alignH: "middle", calculated: { x: 0, y: 0 } });
    renderZoneUI(zone); window.renderFixedTexts();
}

window.setZoneAlign = function(zone, align) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if(!myCelestialConf.userData.zones[currentTextContext]) myCelestialConf.userData.zones[currentTextContext] = { top: {blocks:[]}, bottom: {blocks:[]} };
    if(!myCelestialConf.userData.zones[currentTextContext][zone]) myCelestialConf.userData.zones[currentTextContext][zone] = { blocks: [] };
    myCelestialConf.userData.zones[currentTextContext][zone].align = align;
    const marginCont = document.getElementById(`zone-${zone}-margin-container`);
    if (marginCont) marginCont.style.display = (align === 'top' || align === 'bottom') ? 'block' : 'none';
    window.renderFixedTexts();
}

window.updateZoneMargin = function(zone, val) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if(!myCelestialConf.userData.zones[currentTextContext][zone]) myCelestialConf.userData.zones[currentTextContext][zone] = { blocks: [] };
    myCelestialConf.userData.zones[currentTextContext][zone].margin = parseFloat(val) || 0;
    window.renderFixedTexts();
}


window.insertBlockAt = function(zone, index, isNewLine) {
    if(!myCelestialConf.userData) initUserData();
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
};
window.removeBlock = function(zone, id) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const data = myCelestialConf.userData.zones[currentTextContext][zone];
    data.blocks = data.blocks.filter(b => b.id !== id);
    renderZoneUI(zone); window.renderFixedTexts();
}


window.updateBlockContentAndPreview = function(zone, id, newValue) {
    if(!myCelestialConf.userData) initUserData();
    
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const zoneData = myCelestialConf.userData.zones[currentTextContext] && myCelestialConf.userData.zones[currentTextContext][zone];
    
    if (!zoneData) return;

    // Megkeressük a blokkot
    const block = zoneData.blocks.find(b => b.id == id);
    
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
window.updateBlockData = function(zone, id, key, value) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const block = myCelestialConf.userData.zones[currentTextContext][zone].blocks.find(b => b.id === id);
    if (block) {
        if (key === 'size') block[key] = parseInt(value);
        else if (key === 'marginSide') block[key] = parseFloat(value) || 0;
        else block[key] = value;
        window.renderFixedTexts();
        if (key !== 'content') renderZoneUI(zone); 
    }
}

// --- JAVÍTOTT: updateDesignerFromCelestial (Minden zónát a SAJÁT adataival frissít) ---
window.updateDesignerFromCelestial = function() {
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
window.copyMapToDesigner = function() {
    window.updateActiveMapSnapshot();
};

window.applyDesignerTheme = function(key, variant = 'normal') {
    if (typeof getOptimalMapSize === 'function' && typeof Celestial !== 'undefined') Celestial.resize({width: getOptimalMapSize()});
    if (typeof window.loadTheme === 'function') window.loadTheme(key, variant); 
    let themeBg = "#000000";
    if (typeof mapThemes !== 'undefined' && mapThemes[key]) themeBg = mapThemes[key].background;
    if (window.updateCanvasBackground) window.updateCanvasBackground(themeBg);
    const colorInput = document.getElementById('canvas-bg-color');
    if (colorInput) {
        let hex = themeBg.startsWith('#') ? themeBg : "#000000";
        if(themeBg.includes("gradient")) { const match = themeBg.match(/#[a-fA-F0-9]{6}/); if(match) hex = match[0]; }
        colorInput.value = hex;
    }
    if (typeof Celestial !== 'undefined') {
        setTimeout(() => {
            try { Celestial.redraw(); } catch (e) { console.warn("Redraw error", e); }
            setTimeout(() => {
                window.updateActiveMapSnapshot();
                if (typeof window.refreshMapTransform === 'function') window.refreshMapTransform(); 
                if (typeof window.renderFixedTexts === 'function') window.renderFixedTexts();
            }, 800); 
        }, 50);
    }
}

// window.updateCanvasBackground = function(color) {
//     const mapWrap = document.getElementById('map-wrap'); if (mapWrap) mapWrap.style.background = color;
//     const dSvg = document.getElementById('designer-svg'); if (dSvg) dSvg.style.backgroundColor = color;
//     const bgRect = document.getElementById('designer-background-rect'); if (bgRect) bgRect.setAttribute('fill', color.startsWith('#') ? color : "#000000");
// }

window.updateCanvasBackground = function(color) {
    // 1. Tervező és Szerkesztő hátterének beállítása
    const mapWrap = document.getElementById('map-wrap'); 
    if (mapWrap) mapWrap.style.background = color;
    
    const dSvg = document.getElementById('designer-svg'); 
    if (dSvg) dSvg.style.background = color; // CSS-ben a gradiens működik
    
    // 2. Export háttér rect (csak szín esetén működik jól itt, gradiensnél az exportáló intézi)
    const bgRect = document.getElementById('designer-background-rect'); 
    if (bgRect && !color.includes("gradient")) {
        bgRect.setAttribute('fill', color);
    }

    // 3. Adatbázis mentés
    if(!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.canvas.background = color;

    // 4. Input szinkronizálás (ha színválasztóról jött)
    const textInput = document.getElementById('canvas-bg-text');
    if (textInput && textInput.value !== color) {
        textInput.value = color;
    }
}

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
            if(isHeart) { label.style.color = "#d81b60"; label.style.background = "#fff0f5"; }
            card.onclick = function() { if (typeof window.applyDesignerTheme === 'function') window.applyDesignerTheme(key, variant); };
            card.appendChild(label); card.appendChild(preview); return card;
        };
        container.appendChild(createCard('normal')); container.appendChild(createCard('heart'));
    }
}



// --- JAVÍTOTT EXPORTÁLÁS (Kifutó + Színjavítás + Gradiens Illesztés) ---
async function exportCanvas(format) {
    if (!getDOMElements()) {
        alert("Hiba: A tervező elem nem található.");
        return;
    }

    document.body.style.cursor = 'wait';

    try {
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
        const bleedCm = 2;
        const bleedPx = bleedCm * pxPerCm;
        
        console.log(`Export Kifutó: ${bleedCm} cm = ${bleedPx.toFixed(1)} px`);

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
            } catch (e) {}
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

        // 4. HÁTTÉR TÉGLALAP (RECT) - TELJES MÉRETRE
        let defs = svgClone.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svgClone.insertBefore(defs, styleElement.nextSibling);
        }

        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("x", newX);
        bgRect.setAttribute("y", newY);
        bgRect.setAttribute("width", newWidth);
        bgRect.setAttribute("height", newHeight);
        bgRect.setAttribute("id", "export-background");

        // --- GRADIENS KEZELÉS (JAVÍTOTT SZÖG SZÁMÍTÁSSAL) ---
        if (bgStyle.includes("gradient")) {
            const colors = bgStyle.match(/#[a-fA-F0-9]{6}|rgb\([^)]+\)/g);
            
            // Szög kinyerése a stílusból (pl. 0deg, 90deg)
            let angle = 180; // Default: Fentről lefelé (standard CSS default)
            // const angleMatch = bgStyle.match(/(\d+)deg/);
            // if (angleMatch) angle = parseInt(angleMatch[1]);
            
            // Szög kinyerése
            let angleDeg = 180; 
            const angleMatch = bgStyle.match(/(\d+)deg/);
            if (angleMatch) angleDeg = parseInt(angleMatch[1]);
            if (colors && colors.length >= 2) {const gradId = "bg-gradient-export-" + Date.now();
                const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
                gradient.setAttribute("id", gradId);
                
                // FONTOS: Abszolút koordinátákat használunk
                gradient.setAttribute("gradientUnits", "userSpaceOnUse");
                
                // --- MATEK: A koordinátákat az EREDETI (orig) dobozhoz számoljuk! ---
                // Nem a 'new' (kifutós) dobozhoz. Így nem csúszik el a minta.
                
                const cx = origX + origWidth / 2;
                const cy = origY + origHeight / 2;
                
                // CSS szög konvertálása
                const rad = (angleDeg - 90) * (Math.PI / 180);
                const dx = Math.cos(rad);
                const dy = Math.sin(rad);

                // Sarkok az EREDETI doboz méretei alapján
                const w2 = origWidth / 2;
                const h2 = origHeight / 2;
                
                const corners = [
                    {x: -w2, y: -h2}, {x: w2, y: -h2}, {x: w2, y: h2}, {x: -w2, y: h2}
                ];
                
                let minProj = Infinity;
                let maxProj = -Infinity;
                
                corners.forEach(p => {
                    const proj = p.x * dx + p.y * dy; 
                    if (proj < minProj) minProj = proj;
                    if (proj > maxProj) maxProj = proj;
                });

                // A gradiens kezdő és végpontja az EREDETI dobozra illeszkedik
                const x1 = cx + minProj * dx;
                const y1 = cy + minProj * dy;
                const x2 = cx + maxProj * dx;
                const y2 = cy + maxProj * dy;

                gradient.setAttribute("x1", x1); 
                gradient.setAttribute("y1", y1);
                gradient.setAttribute("x2", x2); 
                gradient.setAttribute("y2", y2);

                // --- SZÍNEK ÉS HARD STOP LOGIKA ---
                let content = bgStyle.substring(bgStyle.indexOf('(') + 1, bgStyle.lastIndexOf(')'));
                let parts = content.split(',');
                
                let stopIndex = 0;
                let lastPercent = 0; 

                parts.forEach(part => {
                    if (part.includes('deg')) return;
                    
                    part = part.trim();
                    let color = '#000000';
                    let currentPercent = null;

                    const hexMatch = part.match(/#[a-fA-F0-9]{6}|rgb\([^)]+\)/);
                    if (hexMatch) color = hexMatch[0];
                    
                    const percentMatch = part.match(/(\d+)%/);
                    if (percentMatch) {
                        currentPercent = parseInt(percentMatch[1]);
                    } else {
                        currentPercent = (stopIndex / (colors.length - 1)) * 100;
                    }

                    if (currentPercent < lastPercent) {
                        currentPercent = lastPercent;
                    }
                    lastPercent = currentPercent;
                    
                    if (hexMatch) {
                        const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                        stop.setAttribute("offset", currentPercent + "%");
                        stop.setAttribute("stop-color", color);
                        gradient.appendChild(stop);
                        stopIndex++;
                    }
                });

                defs.appendChild(gradient);
                bgRect.setAttribute("fill", `url(#${gradId})`);
            } else {
                bgRect.setAttribute("fill", "#000000"); 
            }
        } else {
            bgRect.setAttribute("fill", bgStyle);
        }

        // Rect beszúrása a tartalom ALÁ
        let insertPoint = svgClone.firstChild;
        while(insertPoint && (insertPoint.tagName === 'defs' || insertPoint.tagName === 'style')) {
            insertPoint = insertPoint.nextSibling;
        }
        if (insertPoint) svgClone.insertBefore(bgRect, insertPoint);
        else svgClone.appendChild(bgRect);

        // 5. EXPORTÁLÁS
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgClone);

        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if(!source.match(/^<svg[^>]+xmlns:xlink/)){
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
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
            const svgBlob = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
            const url = URL.createObjectURL(svgBlob);

            img.onload = function() {
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
            img.onerror = function(e) {
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
window.openSymbolPicker = function(event, zone, blockId) {
    event.stopPropagation(); event.preventDefault();
    activeSymbolZone = zone; activeSymbolBlockId = blockId;
    const picker = $('#symbol-picker');
    if (picker.parent().prop("tagName") !== "BODY") picker.appendTo("body");
    const rect = event.currentTarget.getBoundingClientRect();
    let left = rect.left + (rect.width/2) - (picker.outerWidth()/2);
    let top = rect.top - picker.outerHeight() - 10;
    if (top < 0) top = rect.bottom + 10;
    picker.css({ 'top': top + 'px', 'left': left + 'px', 'display': 'block' });
}

window.insertSymbol = function(symbol) {
    if(!myCelestialConf.userData) initUserData();
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
    const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
    
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

window.initMoonPreview = function() {
    const dateInput = document.getElementById('moon-date');
    if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();
    updateMoonPreview();
};


window.updateMoonPreview = function() {
    const dateInput = document.getElementById('moon-date');
    if (!dateInput) return;
    
    const dateStr = dateInput.value;
    const timeInput = document.getElementById('moon-time');
    const timeStr = timeInput ? timeInput.value : "12:00";
    if(!dateStr) return;
    
    const date = new Date(dateStr + 'T' + timeStr + ':00Z');
    const phaseData = calculateMoonData(date);
    updateMoonInfoUI(phaseData, date);
    
    const imgPreview = document.getElementById('moon-preview-img');
    if(imgPreview) {
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
        generateMoonImage(date, lat, lng, options, function(dataURL) {
            if(imgPreview) imgPreview.src = dataURL;
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
window.generateMoonImage = function(date, lat, lng, options, callback) {
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
    
    moonImg.onload = function() {
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
        ctx.arc(cx, cy, r, 0, Math.PI*2); 
        ctx.closePath();
        ctx.save(); 
        ctx.clip(); 
        
        ctx.clearRect(0,0,3000,3000);
        
        // 2. KÉP RAJZOLÁSA (Dinamikus vágással!)
        const size = Math.min(moonImg.width, moonImg.height);
        const sSize = size * cropFactor; // Itt használjuk a configból jövő vágást
        const sx = (moonImg.width - sSize) / 2; 
        const sy = (moonImg.height - sSize) / 2;

        ctx.drawImage(moonImg, sx, sy, sSize, sSize, cx-r, cy-r, r*2, r*2);
        
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
        ctx.arc(cx, cy, r, 0, Math.PI*2);
        ctx.fillStyle = "#fff"; 
        ctx.fill();
        
        ctx.restore(); 

        const dataURL = genCanvas.toDataURL('image/png');
        if (callback) callback(dataURL, phaseData);
    };
    
    moonImg.onerror = function() { 
        console.error(`Hiba a kép betöltésekor: ${imgUrl}`);
        alert(`Nem sikerült betölteni a képet: ${sourceConfig.name}`);
        if(callback) callback(null, null);
    };
}


window.renderMoonControls = function(containerId, prefix) {
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
                <button id="${prefix}-btn-shadow-black" class="add-btn primary" style="flex:1; padding:6px; font-size:11px;">🌑 Sötét</button>
                <button id="${prefix}-btn-shadow-trans" class="add-btn secondary" style="flex:1; padding:6px; font-size:11px;">◐ Átlátszó</button>
            </div>
        </div>
    `;
    container.appendChild(div);
}


window.addMoonElement = function(side) {
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
    generateMoonImage(date, lat, lng, options, function(dataURL, phaseData) {
        
        // 3. Elem hozzáadása (Ez létrehozza az elemet és megnyitja a panelt - MÉG ÜRES ADATOKKAL)
        window.addNewElement('moon', dataURL, side, `Moon_${dateStr}_${timeStr}`);
        
        if(!myCelestialConf.userData) initUserData();
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
                 myCelestialConf.userData.zones[zoneId] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
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
                    { id: Date.now()+10, isNewLine: true, tag: 'moon_phase', content: phaseName, font: "Playfair Display", size: 40, weight: "bold", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+11, isNewLine: true, tag: 'moon_illum', content: `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`, font: "Montserrat", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+12, isNewLine: true, tag: 'moon_age', content: `Hold kora: ${phaseData.age.toFixed(1)} nap`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+13, isNewLine: true, tag: 'moon_nextnew', content: `Következő Újhold: ${nextNewStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+14, isNewLine: true, tag: 'moon_nextfull', content: `Következő Telihold: ${nextFullStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+15, isNewLine: true, tag: 'moon_zodiac', content: `Csillagjegy: ${zodiac}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} }
                );
            }

            if (bottomZone.blocks.length === 0) {
                bottomZone.blocks.push(
                    { id: Date.now()+1, isNewLine: true, tag: 'location', content: city, font: "Space Grotesk", size: 50, weight: "bold", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+2, isNewLine: true, tag: 'date', content: formattedDate, font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} },
                    { id: Date.now()+3, isNewLine: true, tag: 'coords', content: coordStr, font: "Montserrat", size: 24, weight: "300", color: "#e8edf5", alignH: "middle", isSettingsOpen: false, calculated: {x:0,y:0} }
                );
            }

            myCelestialConf.userData.uiState.currentTextContext = zoneId;
            myCelestialConf.userData.uiState.activePhotoId = newEl.id;

            // --- JAVÍTÁS LÉNYEGE: ITT HÍVJUK MEG ÚJRA A PANELFELÉPÍTŐT ---
            // Mivel most már benne vannak az adatok (city, date, shadow) az elemben,
            // a highlightPhoto most már a helyes értékekkel fogja feltölteni az inputokat.
            window.highlightPhoto(newEl.id, null); 
            // -------------------------------------------------------------

            if(window.renderZoneUI) {
                window.renderZoneUI('top');
                window.renderZoneUI('bottom');
            }
            if(window.updateElementSelectorUI) window.updateElementSelectorUI();
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
            console.log("function initMoonCitySearch() {");
            console.log("autocomplete.addListener('place_changed', () => {");
            const place = autocomplete_m.getPlace();
            console.log("autocomplete.addListener('place_changed', () => { place", place);

            if (!place.geometry) {
                console.log('No details available for input: ', place.name);
                return;
            }
            // if (place.geometry) {
            console.log("autocomplete.addListener('place_changed', () => { place.name", place.name);
                const lat = place.geometry.location.lat();
                const lon = place.geometry.location.lng();
                
            console.log("autocomplete.addListener('place_changed', () => { lat", lat);
            console.log("autocomplete.addListener('place_changed', () => { lon", lon);
                // Inputok frissítése
                const latInp = document.getElementById('moon-edit-lat');
                const lonInp = document.getElementById('moon-edit-lon');
                if(latInp) latInp.value = lat.toFixed(4);
                if(lonInp) lonInp.value = lon.toFixed(4);
                
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

window.updateActiveMoonSettings = function(newCityName) {
    if(!myCelestialConf.userData) initUserData();
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
    
    if(!dateStr || !timeStr) return;

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
    if(btnNasa && btnOrig) {
        btnNasa.className = (options.sourceType === 'nasa') ? 'add-btn primary' : 'add-btn secondary';
        btnOrig.className = (options.sourceType === 'original') ? 'add-btn primary' : 'add-btn secondary';
    }

    // UI gombok frissítése (hogy biztosan szinkronban legyenek)
    const btnB = document.getElementById('edit-btn-shadow-black');
    const btnT = document.getElementById('edit-btn-shadow-trans');
    if(btnB && btnT) {
        btnB.className = (options.shadowMode === 'black') ? 'add-btn primary' : 'add-btn secondary';
        btnT.className = (options.shadowMode === 'transparent') ? 'add-btn primary' : 'add-btn secondary';
    }

    generateMoonImage(fullDate, latVal, lonVal, options, function(dataURL, phaseData) {
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
                    if(block.tag === 'location') block.content = cityName;
                    if(block.tag === 'date') block.content = formattedDate;
                    if(block.tag === 'coords') block.content = coordStr;

                    // Felső zóna frissítése (Hold tulajdonságok)
                    if(block.tag === 'moon_phase') block.content = phaseName;
                    if(block.tag === 'moon_illum') block.content = `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`;
                    if(block.tag === 'moon_age') block.content = `Hold kora: ${phaseData.age.toFixed(1)} nap`;
                    if(block.tag === 'moon_nextnew') block.content = `Következő Újhold: ${nextNewStr}`;
                    if(block.tag === 'moon_nextfull') block.content = `Következő Telihold: ${nextFullStr}`;
                    if(block.tag === 'moon_zodiac') block.content = `Csillagjegy: ${zodiac}`;
                    
                    // Ha épp szerkesztjük valamelyiket, frissítsük a textarea-t is
                    const ta = document.getElementById(`textarea-${block.id}`);
                    if(ta) ta.value = block.content;
                });
            }
        });
        window.renderFixedTexts();
    });
}
// --- INIT ---
const debouncedRefreshMapTransform = debounce(() => window.refreshMapTransform(), 10);
const debouncedApplyMaskToDesigner = debounce(() => window.applyMaskToDesigner(), 20);
window.switchToMainEditor = function() {
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

    console.log(`szerkesztő betöltése ehhez: ${targetElement.id} (${targetElement.celestialConfig?.Varos || 'Névtelen'})`);

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
$(document).ready(function() {
    initUserData();
    window.initBackgroundPresets(); // <--- EZT SZÚRD BE IDE
    window.initGradientSortable(); // <--- EZT ADD HOZZÁ IDE!

    const moonBtn = $("#btn-mode-moon");
    if (moonBtn.length) {
        const mapBtn = moonBtn.next("button");
        if (mapBtn.length) {
            mapBtn.removeAttr("onclick");
            mapBtn.on("click", function(e) {
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
    if(window.switchTextContext) window.switchTextContext('map');
    
    setTimeout(window.initMoonPreview, 500);
    
    if (myCelestialConf.userData.canvas.wallColor && typeof window.updateWallColor === 'function') {
        window.updateWallColor(myCelestialConf.userData.canvas.wallColor);
        $("#wall-bg-color").val(myCelestialConf.userData.canvas.wallColor);
    }
    
    const picker = $('#symbol-picker');
    if (picker.length && picker.parent().prop("tagName") !== "BODY") picker.appendTo("body");

    renderZoneUI('top'); renderZoneUI('bottom');

    // --- EZT A SORT ADD HOZZÁ: ---
    if(window.renderSmartpointsList) window.renderSmartpointsList();
    // -----------------------------
    // --- EZT A SORT IS ADD HOZZÁ: ---
    if (window.updateLayoutVisibility) window.updateLayoutVisibility();

    setTimeout(function() {
        if(window.refreshMapTransform) window.refreshMapTransform();
        if(window.renderFixedTexts) window.renderFixedTexts();
    }, 500);

    if (typeof Celestial !== 'undefined' && Celestial.addCallback) Celestial.addCallback(window.updateDesignerFromCelestial);
    
    let isDesignerFirstRun = true; 
    $("#tabs").on("tabsactivate", function(event, ui) {
        if (ui.newPanel[0].id === 'fragment-6') { 
            document.getElementById('full-screen-designer').style.display = 'block';
            document.getElementById('main-layout').style.display = 'none';

            // --- JAVÍTÁS 1: Azonnali méretezés kényszerítése ---
            // Egy apró timeout kell, hogy a böngésző renderelő motorja felfogja a display:block-ot
            setTimeout(() => {
                if(window.updateCanvasSize) window.updateCanvasSize();
            }, 10);
            // --- JAVÍTÁS KEZD ---
            // Ha belépünk a tervezőbe, és nincs kijelölt elem, jelöljük ki az elsőt (main-map)!
            if (!myCelestialConf.userData.uiState.selectedElementId) {
                const elements = myCelestialConf.userData.elements;
                if (elements && elements.length > 0) {
                    const firstId = elements[0].id; // Ez általában 'main-map'
                    console.log("Auto-select első elem:", firstId);
                    
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
                    const defaultSize = 20; 
                    const maxWidth = Math.min(w, h);
                    const finalSize = (maxWidth < defaultSize) ? maxWidth : defaultSize;

                    const mapInput = document.getElementById('map-width-cm-input');
                    if(mapInput) mapInput.value = finalSize;
                    
                    if(window.setMapWidth) window.setMapWidth(finalSize);
                    
                    // Fotó inputot is beállítjuk
                    const photoInput = document.getElementById('photo-width-cm-input');
                    if(photoInput) photoInput.value = finalSize;
                    
                    isDesignerFirstRun = false;
                }
                if(window.copyMapToDesigner) window.copyMapToDesigner();
                requestAnimationFrame(() => {
                    if(window.refreshMapTransform) window.refreshMapTransform();
                    if(window.updateElementSelectorUI) window.updateElementSelectorUI();
                    
                    $("#copy-svg").trigger("click");
                    $("#tabs_r").tabs("option", "active", 0);
                });
            });
        } else {
            document.getElementById('full-screen-designer').style.display = 'none';
            document.getElementById('main-layout').style.display = 'flex';
        }
    });
    
    $("#tabs_r").on("tabsactivate", function(event, ui) {
        if (ui.newPanel[0].id === 'fragment_r-5') {
            if(window.switchToMainEditor) window.switchToMainEditor();
            else $("#tabs").tabs("option", "active", 0);
        }
    });

    if(getDOMElements()) {
        designerSVG.addEventListener('click', (e) => { 
            if(e.target.id==='designer-svg') if(typeof window.selectDesignerElement === 'function') window.selectDesignerElement(null);
        });
    }
    
    document.fonts.ready.then(function () { if(window.refreshMapTransform) window.refreshMapTransform(); });
    $(document).on('mousedown', function(e) {
        if ($('#symbol-picker').is(':visible') && !$(e.target).closest('#symbol-picker').length && !$(e.target).hasClass('symbol-opener')) {
            $('#symbol-picker').fadeOut(200);
        }
    });
    initDesignerTemplates();
});

window.setHeartMask = function(type) {
    const mapEl = getMainMapElement();
    mapEl.mask = type; 
    if (type !== 'none' && typeof Celestial !== 'undefined') {
        const projSelect = document.getElementById('projection');
        if (projSelect && projSelect.value !== 'airy') {
            projSelect.value = 'airy';
            if(window.loadTheme) window.loadTheme(null);
        }
    }
    if (typeof window.copyMapToDesigner === 'function') window.copyMapToDesigner();
};

window.updateMaskScale = function(val) {
    const mapEl = getMainMapElement();
    mapEl.maskScale = parseInt(val) / 100; 
    window.refreshMapTransform();
}

// Kompatibilitás miatt üres függvény, ha a régi hívná
window.applyMaskToDesigner = function() {}; 

window.updateMapMargin = function(side, val) {
    const mapEl = getMainMapElement();
    if (side === 'top') mapEl.marginTop = parseFloat(val) || 0; 
    if (side === 'bottom') mapEl.marginBottom = parseFloat(val) || 0; 
    window.refreshMapTransform();
}

window.alignCelestialMap = function(position) {
    const mapEl = getMainMapElement();
    mapEl.align = position; 
    updateActiveButton('btn-map', position); 
    document.getElementById('map-margin-top-container').style.display = (position === 'top') ? 'block' : 'none';
    document.getElementById('map-margin-bottom-container').style.display = (position === 'bottom') ? 'block' : 'none';
    window.refreshMapTransform();
}

window.updateMapBorderProp = function(prop, value) {
    if(!myCelestialConf.userData) initUserData();
    const mapEl = getMainMapElement();
    
    if (prop === 'width') {
        mapEl.borderWidth = parseInt(value);
        document.getElementById('map-border-disp').innerText = value + 'px';
    } else if (prop === 'color') {
        mapEl.borderColor = value;
    } else if (prop === 'enabled') {
        mapEl.borderEnabled = value;
        const wrapper = document.getElementById('map-border-settings-wrapper');
        if(wrapper) wrapper.style.display = value ? 'block' : 'none';
    } else if (prop === 'blur') {
        mapEl.borderBlur = parseInt(value);
        const disp = document.getElementById('map-border-blur-disp');
        if(disp) disp.innerText = value + 'px';
    } else if (prop === 'offset') {
        mapEl.borderDistance = parseInt(value);
        const disp = document.getElementById('map-border-offset-disp');
        if(disp) disp.innerText = value;
    } else if (prop === 'maskBlur') {
        mapEl.edgeBlur = parseInt(value);
        const disp = document.getElementById('map-mask-blur-disp');
        if(disp) disp.innerText = value + 'px';
    }
    window.refreshMapTransform();
};

window.initCropperFromFile = function(input) {
    if (input.files && input.files[0]) {
        tempUploadedFileName = input.files[0].name;
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = document.getElementById('image-to-crop');
            image.src = e.target.result;
            document.getElementById('cropper-modal').style.display = 'flex';
            if (cropper) cropper.destroy();
            cropper = new Cropper(image, { aspectRatio: 1, viewMode: 1, autoCropArea: 1 });
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
    addNewElement('photo', dataURL, tempInsertSide, tempUploadedFileName);
    closeCropper();
}

window.selectDesignerElement = function(id, element) {
    if(!myCelestialConf.userData) initUserData();
    myCelestialConf.userData.uiState.selectedElementId = id; 
    window.highlightPhoto(id, element);
}

window.getOptimalMapSize = function() { return 1440; };
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
window.toggleGradientEditor = function(isChecked) {
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

window.applySolidColor = function(color) {
    window.updateCanvasBackground(color);
}

// 2. Gradiens összeállítása a szerkesztőből (Színek + %)
window.updateGradientFromEditor = function() {
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
window.addGradientStop = function(colorValue = '#ffffff', percentValue = null) {
    const list = document.getElementById('grad-stops-list');
    
    if (percentValue === null) {
        const rows = list.querySelectorAll('.grad-stop-row');
        if (rows.length > 0) {
            // Próbáljuk okosan kitalálni a következő %-ot
            const lastVal = parseInt(rows[rows.length-1].querySelector('.grad-stop-percent').value);
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
        
        <input type="color" class="grad-stop-input" value="${colorValue}" 
               oninput="window.updateGradientFromEditor()">
               
        <input type="number" class="grad-stop-percent" value="${percentValue}" min="0" max="100" step="1"
               style="width: 45px; height: 32px; background: rgba(0,0,0,0.3); border: 1px solid #444; border-radius: 4px; color: white; text-align: center; font-size: 11px;"
               oninput="window.updateGradientFromEditor()">
        
        <button class="grad-remove-btn" title="Törlés"
                onclick="this.parentElement.remove(); window.updateGradientFromEditor();">✕</button>
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
        
        <input type="color" class="grad-stop-input" value="${colorValue}" oninput="window.updateGradientFromEditor()">
        <input type="number" class="grad-stop-percent" value="${percentValue}" min="0" max="100" step="1"
               style="width: 45px; height: 32px; background: rgba(0,0,0,0.3); border: 1px solid #444; border-radius: 4px; color: white; text-align: center; font-size: 11px;"
               oninput="window.updateGradientFromEditor()">
        <button class="grad-remove-btn" title="Törlés" onclick="this.parentElement.remove(); window.updateGradientFromEditor();">✕</button>
    `;
    list.appendChild(row);
}
// --- SORTABLE INICIALIZÁLÁSA (Sorrendezés) ---
window.initGradientSortable = function() {
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
        update: function(event, ui) {
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
window.toggleGradientPanel = function(forceState = null) {
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
window.toggleGradientActive = function(isChecked) {
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
window.loadGradientToEditor = function(cssString) {
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
        
        if(cssString.startsWith('#')) {
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
window.initBackgroundPresets = function() {
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

window.togglePresetList = function() {
    const container = document.getElementById('bg-presets-container');
    const arrow = document.getElementById('preset-arrow');
    if(!container) return;

    if (container.style.display === 'none') {
        container.style.display = 'grid';
        arrow.innerText = '▲';
    } else {
        container.style.display = 'none';
        arrow.innerText = '▼';
    }
}

// ============================================================
// --- 1. KÁRTYA LISTÁK GENERÁLÁSA (EGYSÉGESÍTVE) ---
// ============================================================
window.initThemeSelectors = function() {
    console.log("initThemeSelectors futtatása...");

    // Itt mondjuk meg, melyik ID melyik oldalhoz tartozik
    const containers = [
        { id: 'theme-grid-container-left', side: 'left' },  // Bal (Editor)
        { id: 'designer-templates-grid',   side: 'right' }  // Jobb (Designer)
    ];

    // Biztosítjuk, hogy a mapThemes létezzen
    const themesSource = (typeof mapThemes !== 'undefined') ? mapThemes : {};

    containers.forEach(item => {
        const container = document.getElementById(item.id);
        if (!container) return;

        container.innerHTML = ''; // Törlés

        for (const [key, theme] of Object.entries(themesSource)) {
            // Átadjuk az 'item.side' paramétert (left/right)
            container.appendChild(createThemeCardHTML(key, theme, 'normal', item.side));
            container.appendChild(createThemeCardHTML(key, theme, 'heart', item.side));
        }
    });
};

// ============================================================
// --- 2. EGY DARAB KÁRTYA LÉTREHOZÁSA ---
// ============================================================
window.createThemeCardHTML = function(key, theme, variant, sourceSide) {
    const isHeart = (variant === 'heart');
    const card = document.createElement('div');
    card.className = 'theme-item';

    // Fejléc
    const label = document.createElement('div');
    label.className = "theme-btn";
    label.innerText = isHeart ? `♥ ${theme.name}` : theme.name;

    if(isHeart) {
        label.style.color = "#d81b60";
        label.style.background = "#fff0f5";
    }

    // Kép
    const preview = document.createElement('div');
    preview.className = 'theme-preview-img';

    let imgUrl = theme.image;
    if (isHeart && imgUrl) imgUrl = imgUrl.replace('.png', '_heart.png');

    if (imgUrl) {
        preview.style.background = `url('${imgUrl}') center/contain no-repeat, ${theme.background}`;
    } else {
        preview.style.background = theme.background;
    }

    card.appendChild(label);
    card.appendChild(preview);

    // KATTINTÁS: Itt adjuk át a 'sourceSide'-ot a loadTheme-nek!
    card.onclick = function() {
        if (typeof window.loadTheme === 'function') {
            window.loadTheme(key, variant, sourceSide);
        }
    };

    return card;
};

// ============================================================
// --- STABIL TÉMA BETÖLTÉS (ADAT MÓDOSÍTÁS -> RENDER SOR) ---
// ============================================================
window.loadTheme = function(key, variant = 'normal', sourceSide = 'right') {
    console.log(`🎨 Téma kiválasztva: ${key} (${variant})`);

    if (!myCelestialConf.userData) initUserData();

    // 1. Melyik az aktív elem?
    const uiState = myCelestialConf.userData.uiState;
    let targetId = uiState.selectedElementId;
    let selectedEl = myCelestialConf.userData.elements.find(e => e.id == targetId);

    // Ha nincs (vagy nem térkép), keressük az első térképet
    if (!selectedEl || selectedEl.type !== 'map') {
        selectedEl = myCelestialConf.userData.elements.find(e => e.type === 'map');
        if (selectedEl) targetId = selectedEl.id;
    }

    if (!selectedEl) { alert("Nincs kiválasztva csillagtérkép!"); return; }

    // 2. Téma betöltése
    const theme = mapThemes[key];
    if (!theme) return;

    activeThemeKey = key;
    activeVariant = variant;

    // Alap config előkészítése (Kényszerített 1000px)
    let themeConfig = JSON.parse(JSON.stringify(theme.config));
    themeConfig.width = 1000;

    // Projekció kezelése
    if (variant === 'heart') {
        themeConfig.projection = "customHeart";
        selectedEl.mask = 'classic';
    } else {
        themeConfig.projection = "stereographic";
    }

    // 3. MÓD KIVÁLASZTÁSA
    let bgMode = 'global';
    let radioName = (sourceSide === 'left') ? 'bg-mode-left' : 'bg-mode-right';
    const selectedRadio = document.querySelector(`input[name="${radioName}"]:checked`);
    if (selectedRadio) bgMode = selectedRadio.value;

    console.log(`Mód: ${bgMode}`);

    // --- ADATBÁZIS FRISSÍTÉSE (MÉG NEM RAJZOLUNK!) ---
    const mapsToRender = []; // Ebbe gyűjtjük azokat az ID-kat, akiket újra kell generálni

    if (bgMode === 'global') {
        // 🌍 GLOBÁLIS:
        // 1. Vászon háttér beállítása
        window.updateCanvasBackground(theme.background);

        // 2. Minden elem módosítása
        myCelestialConf.userData.elements.forEach(el => {
            el.localBackground = null; // Globálisnál töröljük a lokális hátteret

            if (el.type === 'map') {
                // Config frissítése (megtartva a helyadatokat)
                updateElementConfig(el, themeConfig);
                // Szövegek színezése
                updateZoneColors(el.id, theme.textColor);
                // Hozzáadás a renderelési listához
                mapsToRender.push(el);
            }
        });

    } else if (bgMode === 'local') {
        // 🖼️ LOKÁLIS:
        // 1. Csak a kijelölt elem háttere
        selectedEl.localBackground = theme.background;

        // 2. Config frissítése
        updateElementConfig(selectedEl, themeConfig);

        // 3. Szövegek színezése
        updateZoneColors(selectedEl.id, theme.textColor);

        // 4. Hozzáadás a renderelési listához
        mapsToRender.push(selectedEl);

    } else if (bgMode === 'none') {
        // 🚫 CSAK STÍLUS:
        // 1. Háttérhez nem nyúlunk

        // 2. Config frissítése
        updateElementConfig(selectedEl, themeConfig);

        // 3. Szövegekhez nem nyúlunk

        // 4. Hozzáadás a renderelési listához
        mapsToRender.push(selectedEl);
    }

    // --- RENDERELÉS INDÍTÁSA (QUEUE) ---
    // Ez a függvény fogja egyesével, biztonságosan végrehajtani a rajzolást
    processRenderQueue(mapsToRender, 0);
};

// --- SEGÉDFÜGGVÉNY: Elem konfigurációjának frissítése ---
function updateElementConfig(el, newBaseConfig) {
    // Másolat készítése az új alapról
    let finalConfig = JSON.parse(JSON.stringify(newBaseConfig));

    // Meglévő adatok (Hely, Idő) átmentése, ha vannak
    if (el.celestialConfig) {
        if(el.celestialConfig.Ido) finalConfig.Ido = el.celestialConfig.Ido;
        if(el.celestialConfig.Varos) finalConfig.Varos = el.celestialConfig.Varos;
        if(el.celestialConfig.Lokacio) finalConfig.Lokacio = el.celestialConfig.Lokacio;
        if(el.celestialConfig.geopos) finalConfig.geopos = el.celestialConfig.geopos;
        // Kiemelések megőrzése
        if(el.celestialConfig.highlights) finalConfig.highlights = el.celestialConfig.highlights;
    }

    el.celestialConfig = finalConfig;
}

// --- SEGÉDFÜGGVÉNY: Szövegzónák színezése ---
function updateZoneColors(elementId, newColor) {
    if (!newColor) return;
    const zoneKey = (elementId === 'main-map') ? 'map' : `map_${elementId}`;
    const zones = myCelestialConf.userData.zones;

    if (zones[zoneKey]) {
        ['top', 'bottom'].forEach(z => {
            if (zones[zoneKey][z]) {
                zones[zoneKey][z].blocks.forEach(block => {
                    block.color = newColor;
                });
            }
        });
    }
}

// ============================================================
// --- RENDER QUEUE (JAVÍTOTT: REFERENCIA MENTÉSSEL) ---
// ============================================================
function processRenderQueue(elementsList, index) {
    // 1. KILÉPÉSI FELTÉTEL
    if (index >= elementsList.length) {
        console.log("✅ Minden térkép generálása kész.");

        // Visszaállítjuk a teljes UserDatát (Most már tartalmazza a frissítéseket!)
        if (window.savedFullUserData) {
            myCelestialConf.userData = window.savedFullUserData;
            window.savedFullUserData = null;
        }

        // Végső UI frissítés
        window.refreshMapTransform();
        window.renderFixedTexts();
        window.renderZoneUI('top');
        window.renderZoneUI('bottom');
        return;
    }

    // 2. ELŐKÉSZÜLETEK
    const el = elementsList[index];
    console.log(`⏳ Generálás: ${el.id} (${index + 1}/${elementsList.length})`);

    // --- JAVÍTÁS: CSAK REFERENCIÁT MENTÜNK, NEM MÁSOLATOT! ---
    if (index === 0 && !window.savedFullUserData) {
        window.savedFullUserData = myCelestialConf.userData;
    }
    // ---------------------------------------------------------

    // 3. ISOLÁCIÓ (Becsapjuk a rendszert)
    // Az elem configját másoljuk, hogy ne legyen gond
    myCelestialConf = JSON.parse(JSON.stringify(el.celestialConfig));

    // De a UserDatába az EREDETI elem referenciáját tesszük!
    // Így ha a handleVectorExport ír bele, az megmarad.
    myCelestialConf.userData = {
        uiState: {
            selectedElementId: el.id,
            zoneFlags: window.savedFullUserData.uiState.zoneFlags || {}
        },
        elements: [el], // <--- Eredeti referencia!
        zones: window.savedFullUserData.zones,
        canvas: window.savedFullUserData.canvas
    };

    // 4. GENERÁLÁS
    if (typeof Celestial !== 'undefined') {
        Celestial.resize({width: 1000});
        Celestial.apply(myCelestialConf);

        if (myCelestialConf.Ido) Celestial.date(new Date(myCelestialConf.Ido));
        if (myCelestialConf.geopos) Celestial.location(myCelestialConf.geopos);

        if (el.highlights) Celestial.highlightList = el.highlights;
        else Celestial.highlightList = {};

        Celestial.redraw();

        // Callback
        window.onVectorExportFinished = function() {
            processRenderQueue(elementsList, index + 1);
        };

        setTimeout(() => {
            window.updateActiveMapSnapshot();
        }, 150);
    } else {
        processRenderQueue(elementsList, index + 1);
    }
}

