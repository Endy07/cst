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
                width: 21, height: 30, background: "#ffffff", wallColor: "#BABABA", resizeLock: true,
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
                selectedElementId: null, 
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
    if(!btnRow || !btnCol) return;
    
    if (dir === 'row') {
        btnRow.className = 'add-btn primary';
        btnCol.className = 'add-btn secondary';
        const l1 = document.getElementById('lbl-element-margin-top'); if(l1) l1.innerText = "Bal Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if(l2) l2.innerText = "Jobb Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "SOR (↔)";
        document.getElementById('btn-add-start').innerHTML = "⬅ BALRA (Elejére)";
        document.getElementById('btn-add-end').innerHTML = "➡ JOBBRA (Végére)";
    } else {
        btnRow.className = 'add-btn secondary';
        btnCol.className = 'add-btn primary';
        const l1 = document.getElementById('lbl-element-margin-top'); if(l1) l1.innerText = "Felső Margó (cm):";
        const l2 = document.getElementById('lbl-element-margin-bottom'); if(l2) l2.innerText = "Alsó Margó (cm):";
        document.getElementById('layout-dir-display').innerHTML = "OSZLOP (↕)";
        document.getElementById('btn-add-start').innerHTML = "⬆ FENTRE (Tetejére)";
        document.getElementById('btn-add-end').innerHTML = "⬇ LENTRE (Végére)";
    }
}

window.updateCanvasSize = function() {
    if(!myCelestialConf.userData) initUserData();

    const widthInput = document.getElementById('canvas-width');
    const heightInput = document.getElementById('canvas-height');
    let widthCm = parseFloat(widthInput.value) || 21;
    let heightCm = parseFloat(heightInput.value) || 30;

    myCelestialConf.userData.canvas.width = widthCm;
    myCelestialConf.userData.canvas.height = heightCm;

    const pageCount = myCelestialConf.userData.elements ? myCelestialConf.userData.elements.length : 1;
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';

    let totalWidthCm, totalHeightCm;
    if (layoutDir === 'column') {
        totalWidthCm = widthCm;
        totalHeightCm = heightCm * pageCount;
    } else {
        totalWidthCm = widthCm * pageCount;
        totalHeightCm = heightCm;
    }

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

    const designerSVG = document.getElementById('designer-svg');
    if (designerSVG) {
        designerSVG.setAttribute('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
    }
    
    const bgRect = document.getElementById('designer-background-rect');
    if(bgRect) {
        bgRect.setAttribute('width', viewBoxWidth);
        bgRect.setAttribute('height', viewBoxHeight);
    }

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

// --- JAVÍTOTT refreshMapTransform (OKOSPONTOK RAJZOLÁSÁVAL) ---
window.refreshMapTransform = function() {
    if (!getDOMElements()) return;
    if(!myCelestialConf.userData) initUserData();

    // Biztosítjuk, hogy legyen smartpoints tömb
    if (!myCelestialConf.userData.smartpoints) {
        myCelestialConf.userData.smartpoints = [];
    }

    // Láthatóság alapértelmezett értéke
    if (typeof myCelestialConf.userData.uiState.showSmartpoints === 'undefined') {
        myCelestialConf.userData.uiState.showSmartpoints = true;
    }

    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const paperVB = designerSVG.getAttribute('viewBox').split(' ').map(Number);
    const paperW = paperVB[2];
    const paperH = paperVB[3];
    const elements = myCelestialConf.userData.elements;
    const count = elements.length;

    let slotW, slotH;
    if (layoutDir === 'column') {
        slotW = paperW;
        slotH = paperH / count;
    } else {
        slotW = paperW / count;
        slotH = paperH;
    }

    const renderLayer = document.getElementById('celestial-map-layer');
    if (!renderLayer) return;
    renderLayer.innerHTML = ''; 
    
    const photoGroup = document.getElementById('photo-transform-group');
    if (photoGroup) photoGroup.innerHTML = '';

    let defs = designerSVG.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        designerSVG.insertBefore(defs, designerSVG.firstChild);
    }

    // Blur filter helper (változatlan)
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

    const pxPerCm = slotW / (myCelestialConf.userData.canvas.width || 21);

    // Elemek kirajzolása (Változatlan logika, csak a végén jön az extra)
    elements.forEach((el, index) => {
        let slotStartX, slotStartY, slotCenterX, slotCenterY;
        if (layoutDir === 'column') {
            slotStartX = 0;
            slotStartY = index * slotH;
            slotCenterX = paperW / 2;
            slotCenterY = slotStartY + (slotH / 2);
        } else {
            slotStartX = index * slotW;
            slotStartY = 0;
            slotCenterX = slotStartX + (slotW / 2);
            slotCenterY = paperH / 2;
        }

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute('id', `element-group-${el.id}`);
        g.setAttribute('class', `designer-element type-${el.type}`);

        // Méretezés
        let targetSize;
        if (el.widthCM && el.widthCM > 0) targetSize = el.widthCM * pxPerCm;
        else targetSize = Math.min(slotW, slotH) * (el.scale || 1.0);
        
        const pSize = 1000; 
        const finalScale = targetSize / pSize;
        let realSize = targetSize;
        
        const mt = (el.marginTop || 0) * pxPerCm;
        const mb = (el.marginBottom || 0) * pxPerCm;

        let transX = slotCenterX - (realSize / 2);
        let transY = slotCenterY - (realSize / 2);
        
        if (el.align === 'top') {
            transY = (layoutDir === 'column') ? slotStartY + mt : mt;
        } else if (el.align === 'bottom') {
            transY = (layoutDir === 'column') ? (slotStartY + slotH) - mb - realSize : paperH - mb - realSize;
        }

        const rot = el.rotation || 0;
        g.setAttribute('transform', `translate(${transX}, ${transY}) rotate(${rot}, ${realSize/2}, ${realSize/2}) scale(${finalScale})`);
        
        el.calculated = { x: transX, y: transY, scale: finalScale, widthPx: realSize, heightPx: realSize };
        el.contentBounds = { top: transY, bottom: transY + realSize };

        // Eseménykezelő a kattintáshoz (Okospont lerakás)
        g.style.cursor = "pointer";
        g.onclick = function(e) {
            e.stopPropagation();
            if (myCelestialConf.userData.uiState.placingSmartpoint) {
                // Koordináta számítás a csoporthoz képest
                // Az e.clientX/Y globális, nekünk a transzformált SVG koord kell.
                // Egyszerűsítés: Az element középpontjához képest számolunk CM-ben?
                // Vagy globális SVG koordban tároljuk és CM-re váltjuk.
                
                const svgRect = designerSVG.getBoundingClientRect();
                const pt = designerSVG.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                // Transzformáljuk a kattintást az SVG koordináta-rendszerébe
                const svgP = pt.matrixTransform(designerSVG.getScreenCTM().inverse());
                
                // Konvertálás CM-be (globális vászonhoz képest)
                const xCM = svgP.x / pxPerCm;
                const yCM = svgP.y / pxPerCm;
                
                window.finalizeSmartpointPlacement(xCM, yCM);
            } else {
                if (el.type === 'map') loadMapToEditor(el.id); 
                else window.highlightPhoto(el.id, this);
            }
        };


        if (el.dataURL) {
            const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', el.dataURL);
            img.setAttribute('width', pSize);
            img.setAttribute('height', pSize);
            
            // Maszkolás
            const maskType = el.mask || 'none';
            const maskScale = el.maskScale || 1.0;
            const clipId = `clip-${el.id}`;
            
            let existingClip = defs.querySelector(`#${clipId}`);
            if (existingClip) existingClip.remove();

            if (maskType !== 'none' && HEART_PATHS[maskType]) {
                const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                clipPath.setAttribute('id', clipId);
                const shape = document.createElementNS("http://www.w3.org/2000/svg", "path");
                shape.setAttribute('d', HEART_PATHS[maskType]);
                shape.setAttribute('transform', `translate(500, 500) scale(${maskScale}) translate(-500, -500)`);
                clipPath.appendChild(shape);
                defs.appendChild(clipPath);
                
                img.setAttribute('clip-path', `url(#${clipId})`);
                
            } else if (el.type !== 'map' && maskType === 'none') {
                 // Körvágás (fotóknál alapból)
                 const cp = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
                 cp.setAttribute('id', clipId);
                 const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                 c.setAttribute('cx', 500); c.setAttribute('cy', 500); 
                 c.setAttribute('r', 500 * maskScale);
                 cp.appendChild(c);
                 defs.appendChild(cp);
                 
                 img.setAttribute('clip-path', `url(#${clipId})`);
            }
            g.appendChild(img);

            // Keret rajzolása
            if (el.borderEnabled && el.borderWidth > 0) {
                let borderShape;
                const distFactor = (el.borderDistance || 0) / 200; 
                const borderTotalScale = maskScale + distFactor; 

                if (maskType === 'none') {
                    borderShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    borderShape.setAttribute('cx', 500); 
                    borderShape.setAttribute('cy', 500);
                    borderShape.setAttribute('r', (500 * borderTotalScale)); 
                } else if (HEART_PATHS[maskType]) {
                    borderShape = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    borderShape.setAttribute('d', HEART_PATHS[maskType]);
                    borderShape.setAttribute('transform', `translate(500, 500) scale(${borderTotalScale}) translate(-500, -500)`);
                }

                if (borderShape) {
                    borderShape.setAttribute('fill', 'none');
                    borderShape.setAttribute('stroke', el.borderColor);
                    borderShape.setAttribute('stroke-width', el.borderWidth / finalScale); 
                    
                    const filterUrl = ensureBlurFilter(`border-${el.id}`, el.borderBlur || 0);
                    if (filterUrl) borderShape.setAttribute('filter', filterUrl);
                    
                    g.appendChild(borderShape);
                }
            }
            
            // Kép szélének elmosása
            if (el.edgeBlur > 0) {
               // Implementáció igény szerint
            }

        } else {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute('width', pSize); rect.setAttribute('height', pSize);
            rect.setAttribute('fill', 'rgba(255,255,255,0.05)');
            rect.setAttribute('stroke', '#444');
            rect.setAttribute('stroke-dasharray', '10,10');
            g.appendChild(rect);
        }

        
        renderLayer.appendChild(g);
    });

    // --- OKOSPONTOK KIRAJZOLÁSA ---
    // Csak akkor rajzoljuk ki, ha be van kapcsolva a láthatóság
    if (myCelestialConf.userData.uiState.showSmartpoints) {
        const smartpoints = myCelestialConf.userData.smartpoints || [];
        smartpoints.forEach(sp => {
            if (sp.x === null || sp.y === null) return;

            const gSP = document.createElementNS("http://www.w3.org/2000/svg", "g");
            
            // Pozíció CM-ből Pixelbe
            const posX = sp.x * pxPerCm;
            const posY = sp.y * pxPerCm;
            
            // Méret: 2 cm átmérő -> 1 cm sugár
            const radiusPx = 1.0 * pxPerCm; 

            // Kör alap
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", posX);
            circle.setAttribute("cy", posY);
            circle.setAttribute("r", radiusPx);
            
            // Szín: Ha épp ezt helyezzük át, legyen más színű
            if (myCelestialConf.userData.uiState.movingSmartpointId === sp.id) {
                circle.setAttribute("fill", "rgba(255, 215, 0, 0.8)"); // Arany szín áthelyezéskor
                circle.setAttribute("stroke", "red");
            } else {
                circle.setAttribute("fill", "rgba(40, 114, 186, 0.8)"); // --color-accent
                circle.setAttribute("stroke", "white");
            }
            
            circle.setAttribute("stroke-width", radiusPx * 0.1); 
            
            // Ikon vagy szám
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", posX);
            text.setAttribute("y", posY);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "central");
            text.setAttribute("fill", "white");
            text.setAttribute("font-family", "Arial, sans-serif");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("font-size", radiusPx); // A betűméret a sugár fele
            
            const icons = {
                'audio': '🎵', 'video': '🎥', 'image': '🖼️', 
                'youtube': '▶️', 'spotify': '🎧', 'url': '🔗'
            };
            text.textContent = icons[sp.type] || (smartpoints.indexOf(sp) + 1);

            gSP.style.cursor = "pointer";
            
            // Kattintás az okospontra
            gSP.onclick = (e) => {
                e.stopPropagation();
                // Ha áthelyezés módban vagyunk, akkor kiválasztjuk ezt a pontot
                if (myCelestialConf.userData.uiState.isMovingSmartpoints) {
                    startMoveSpecificSmartpoint(sp.id);
                } else {
                    // Egyébként szerkesztés (vagy törlés kérdés)
                    if(confirm(`Szeretnéd szerkeszteni ezt az Okospontot? (${sp.type})`)) {
                        window.editSmartpoint(sp.id);
                    }
                }
            };

            gSP.appendChild(circle);
            gSP.appendChild(text);
            renderLayer.appendChild(gSP); y
        });
    }
    window.renderFixedTexts();
}


// --- OKOSPONT KEZELŐ FÜGGVÉNYEK (ÚJ) ---

let tempSPType = null;
let editingSPId = null; // Ha szerkesztünk egy meglévőt


window.startAddSmartpoint = function() {
    editingSPId = null; // Új hozzáadása
    document.getElementById('sp-type-selector').style.display = 'block';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'none';
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
    
    let content = '';
    if (['audio', 'video', 'image'].includes(tempSPType)) {
        const fileInp = document.getElementById('sp-input-file');
        if (fileInp.files.length > 0) content = fileInp.files[0].name;
        else { 
            // Ha szerkesztünk és nem választott új fájlt, tartsuk meg a régit
            if (editingSPId) {
                const existing = myCelestialConf.userData.smartpoints.find(sp => sp.id === editingSPId);
                if (existing) content = existing.content;
            } else {
                showCustomAlert("Válassz fájlt!"); return; 
            }
        }
    } else {
        content = document.getElementById('sp-input-url').value;
        if (!content) { showCustomAlert("Adj meg URL-t!"); return; }
    }
    
    if (editingSPId) {
        // --- SZERKESZTÉS MENTÉSE ---
        const sp = myCelestialConf.userData.smartpoints.find(s => s.id === editingSPId);
        if (sp) {
            sp.type = tempSPType;
            sp.content = content;
            showCustomAlert("Okospont sikeresen frissítve!", true);
        }
        editingSPId = null;
        cancelSmartpoint(); // Reset UI
        renderSmartpointsList();
        window.refreshMapTransform(); // Ikon frissítése
    } else {
        // --- ÚJ LÉTREHOZÁSA (LERAKÁSRA VÁR) ---
        if(!myCelestialConf.userData.uiState) initUserData();
        
        // Ellenőrizzük, hogy láthatóak-e, ha nem, kapcsoljuk be
        if (!myCelestialConf.userData.uiState.showSmartpoints) {
            toggleSmartpointsVisibility(); 
        }

        myCelestialConf.userData.uiState.placingSmartpoint = {
            id: Date.now(),
            type: tempSPType,
            content: content,
            x: null, y: null
        };
        
        // UI Visszaállítás
        cancelSmartpoint();
        
        // Üzenet
        showCustomAlert("Kattints a vásznon oda, ahová az Okospontot szeretnéd tenni!");
    }
}

window.editSmartpoint = function(id) {
    const sp = myCelestialConf.userData.smartpoints.find(s => s.id === id);
    if (!sp) return;

    editingSPId = id;
    
    // UI előkészítése
    document.getElementById('btnAddSmartpoint').style.display = 'none';
    document.getElementById('sp-type-selector').style.display = 'block';
    
    // Típus kiválasztása szimulálva
    const typeBtn = document.querySelector(`.sp-type-btn[onclick*="'${sp.type}'"]`);
    if (typeBtn) selectSPType(sp.type, typeBtn);
    
    // Tartalom betöltése
    if (['audio', 'video', 'image'].includes(sp.type)) {
        // Fájlt nem tudunk visszaírni a file inputba, de jelezhetjük
        // (Itt most egyszerűsítve hagyjuk üresen, a mentésnél kezeljük, ha üres marad)
    } else {
        document.getElementById('sp-input-url').value = sp.content;
    }
    
    // Görgetés a szerkesztőhöz
    // document.getElementById('sp-type-selector').scrollIntoView({behavior: 'smooth'});
    // Görgetés
    const container = document.getElementById('sp-type-selector');
    if(container) container.scrollIntoView({behavior: 'smooth'});
}
window.cancelSmartpoint = function() {
    document.getElementById('sp-type-selector').style.display = 'none';
    document.getElementById('sp-content-input').style.display = 'none';
    document.getElementById('btnAddSmartpoint').style.display = 'block';
    document.getElementById('sp-input-url').value = '';
    document.getElementById('sp-input-file').value = '';
    document.querySelectorAll('.sp-type-btn').forEach(b => b.classList.remove('active'));
    tempSPType = null;
    editingSPId = null;
}
window.finalizeSmartpointPlacement = function(x, y) {
    if(!myCelestialConf.userData.smartpoints) myCelestialConf.userData.smartpoints = [];

    // 1. ESET: ÚJ PONT LERAKÁSA
    if (myCelestialConf.userData.uiState.placingSmartpoint) {
        const newSP = myCelestialConf.userData.uiState.placingSmartpoint;
        newSP.x = x;
        newSP.y = y;
        
        myCelestialConf.userData.smartpoints.push(newSP);
        myCelestialConf.userData.uiState.placingSmartpoint = null;
        
        renderSmartpointsList();
        showCustomAlert("Okospont sikeresen elhelyezve!", true);
    } 
    // 2. ESET: MEGLÉVŐ PONT ÁTHELYEZÉSE
    else if (myCelestialConf.userData.uiState.movingSmartpointId) {
        const id = myCelestialConf.userData.uiState.movingSmartpointId;
        const sp = myCelestialConf.userData.smartpoints.find(s => s.id === id);
        if (sp) {
            sp.x = x;
            sp.y = y;
            showCustomAlert("Okospont áthelyezve!", true);
        }
        // Kilépés az áthelyezés módból ehhez a ponthoz
        myCelestialConf.userData.uiState.movingSmartpointId = null;
        myCelestialConf.userData.uiState.isMovingSmartpoints = false; // Teljes módból is kiléphetünk, vagy maradhatunk
        
        // Gomb visszaállítása
        document.getElementById('btnMoveSmartpoints').style.background = "";
        document.getElementById('btnMoveSmartpoints').innerText = "✥ Áthelyezés";
    }
    
    window.refreshMapTransform(); // Újrarajzolás
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
    
    const btn = document.getElementById('btnMoveSmartpoints');
    
    if (myCelestialConf.userData.uiState.isMovingSmartpoints) {
        // Bekapcsolás
        btn.style.background = "#ffeb3b";
        btn.style.color = "#000";
        btn.innerText = "Válassz pontot...";
        
        // Ha nincsenek látható pontok, kapcsoljuk be őket
        if (!myCelestialConf.userData.uiState.showSmartpoints) {
            toggleSmartpointsVisibility();
        }
        
        showCustomAlert("Kattints egy Okospontra a vásznon, amit át szeretnél helyezni!");
    } else {
        // Kikapcsolás
        btn.style.background = "";
        btn.style.color = "";
        btn.innerText = "✥ Áthelyezés";
        myCelestialConf.userData.uiState.movingSmartpointId = null;
        window.refreshMapTransform(); // Színek visszaállítása
    }
}

window.startMoveSpecificSmartpoint = function(id) {
    myCelestialConf.userData.uiState.movingSmartpointId = id;
    showCustomAlert("Most kattints az új helyre a vásznon!");
    window.refreshMapTransform(); // Frissítés, hogy a kiválasztott pont sárga legyen
}

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

window.renderSmartpointsList = function() {
    const list = document.getElementById('smartpoints-list');
    if (!list) return;
    
    const points = myCelestialConf.userData.smartpoints || [];
    if (points.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: #888; font-style: italic; padding: 10px;">Még nincs okospont.</div>';
        return;
    }
    
    list.innerHTML = '';
    points.forEach((sp, idx) => {
        const icons = { 'audio': '🎵', 'video': '🎥', 'image': '🖼️', 'youtube': '▶️', 'spotify': '🎧', 'url': '🔗' };
        
        const div = document.createElement('div');
        div.className = 'sp-list-item';
        // Koordináta megjelenítése (ellenőrzéshez)
        const coords = (sp.x !== null) ? `(X: ${sp.x.toFixed(1)} cm, Y: ${sp.y.toFixed(1)} cm)` : '(Nincs lerakva)';
        
        div.innerHTML = `
            <div style="display:flex; align-items:center;">
                <div class="sp-icon">${icons[sp.type]}</div>
                <div>
                    <div class="sp-title">Okospont ${idx + 1}</div>
                    <div class="sp-meta">${sp.type} ${coords}</div>
                </div>
            </div>
            <div class="sp-actions">
                <button class="add-btn secondary" style="padding:5px 8px; font-size:12px;" onclick="editSmartpoint(${sp.id})" title="Szerkesztés">✎</button>
                <button class="add-btn" style="padding:5px 8px; background:#ff4444; font-size:12px;" onclick="deleteSmartpoint(${sp.id})" title="Törlés">🗑</button>
            </div>
        `;
        list.appendChild(div);
    });
}
// --- 5. ELEM HOZZÁADÁS ÉS SZERKESZTÉS ---
window.addNewElement = function(type, dataURL, side, fileName) {
    if(!myCelestialConf.userData) initUserData();
    const newId = Date.now();
    let defaultBorderColor = '#ffffff';
    let defaultBorderWidth = 2;
    let defaultBorderEnabled = true; 
    
    // Alapértelmezett szélesség 20cm
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

    if (side === 'start' || side === 'left' || side === 'top') myCelestialConf.userData.elements.unshift(newEl);
    else myCelestialConf.userData.elements.push(newEl);
    
    myCelestialConf.userData.zones[`photo_${newId}`] = { top: { alignV: 'center', blocks: [] }, bottom: { alignV: 'center', blocks: [] } };
    window.updateCanvasSize(); 
    updateElementSelectorUI();
    highlightPhoto(newId, null);
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
    if(pMoon) pMoon.style.display = (mode === 'moon') ? 'block' : 'none';

    // Gombok színezése
    const bPhoto = document.getElementById('btn-mode-photo');
    const bMoon = document.getElementById('btn-mode-moon');
    const bMap = document.getElementById('btn-mode-map');

    if(bPhoto) {
        if(mode === 'photo') { bPhoto.classList.add('primary'); bPhoto.classList.remove('secondary'); }
        else bPhoto.classList.add('secondary');
    }
    if(bMoon) {
        if(mode === 'moon') { bMoon.classList.add('primary'); bMoon.classList.remove('secondary'); }
        else bMoon.classList.add('secondary');
    }
    if(bMap) {
        if(mode === 'map') { bMap.classList.add('primary'); bMap.classList.remove('secondary'); }
        else bMap.classList.add('secondary');
    }

    if (mode === 'moon') {
        const dateInput = document.getElementById('moon-date');
        if (dateInput && !dateInput.value) dateInput.valueAsDate = new Date();
        initMoonPreview(); 
    }
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
            let dateVal = el.moonDate || new Date().toISOString().split('T')[0];
            let timeVal = el.moonTime || "12:00";
            let latVal = (el.moonLat !== undefined) ? el.moonLat : 47.4979;
            let lonVal = (el.moonLng !== undefined) ? el.moonLng : 19.0402;
            let cityVal = el.moonLocationName || "";

            // Inputok feltöltése és eseménykezelők (hogy frissüljön a kép, ha változtatsz)
            // Fontos: névtelen függvényt használunk, hogy a 'this' kontextus vagy az event objektum ne zavarja meg a paraméterezést
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
            
            // Városkereső mező feltöltése a mentett névvel
            const cityInp = document.getElementById('moon-city-search');
            if(cityInp) cityInp.value = cityVal;
            
            // Autocomplete inicializálása (FONTOS, hogy itt is meghívjuk)
            initMoonCitySearch();
        }
    } else {
        if(mep) mep.style.display = 'none';
    }

    switchTextContext(`photo_${id}`);
    updateElementSelectorUI();
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

// Térkép betöltése
window.loadMapToEditor = function(id) {
    if(!myCelestialConf.userData) initUserData();
    
    const el = myCelestialConf.userData.elements.find(e => e.id == id);
    if (!el || el.type !== 'map') return;
    
    myCelestialConf.userData.uiState.selectedElementId = id;
    myCelestialConf.userData.uiState.activePhotoId = null;
    
    if (el.celestialConfig) {
        const savedUserData = myCelestialConf.userData; 
        myCelestialConf = JSON.parse(JSON.stringify(el.celestialConfig));
        myCelestialConf.userData = savedUserData;
        Celestial.apply(myCelestialConf);
        if (myCelestialConf.Ido) Celestial.date(new Date(myCelestialConf.Ido));
        if (myCelestialConf.geopos) Celestial.location(myCelestialConf.geopos);
        Celestial.redraw();
        if (typeof window.updateGUIFromConfig === 'function') window.updateGUIFromConfig(myCelestialConf);
    }
    
    // UI Frissítés
    document.getElementById('settings-group-map').style.display = 'block';
    document.getElementById('settings-group-photo').style.display = 'none';
    
    const btnDel = document.getElementById('btn-delete-element-container');
    if (btnDel) btnDel.style.display = (myCelestialConf.userData.elements.length > 1) ? 'block' : 'none';

    updateCommonControls(el);
    
    const wInput = document.getElementById('map-width-cm-input');
    if (wInput) wInput.value = el.widthCM || 20;

    if (id === 'main-map' || !id) switchTextContext('map');
    else {
        if(!myCelestialConf.userData.zones[`map_${id}`]) myCelestialConf.userData.zones[`map_${id}`] = { top: {blocks:[]}, bottom: {blocks:[]} };
        switchTextContext(`map_${id}`);
    }
    
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
        let maxWidth = Math.min(parseFloat(canvasWidthInput.value) - 1, parseFloat(canvasHeightInput.value) - 1);
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
    const id = myCelestialConf.userData.uiState.selectedElementId;
    if(!id) return;
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

// Elemválasztó UI
window.updateElementSelectorUI = function() {
    if(!myCelestialConf.userData) initUserData();
    
    let activeId = myCelestialConf.userData.uiState.selectedElementId || myCelestialConf.userData.uiState.activePhotoId;
    
    const select = document.getElementById('active-element-selector');
    const container = document.getElementById('element-selector-container');
    
    if (!select) return;
    
    const allElements = myCelestialConf.userData.elements;
    
    // Elrejtés ha 1 vagy kevesebb elem van
    if (allElements.length <= 1) {
        if (container) container.style.display = 'none';
        
        if (allElements.length === 1 && !activeId) {
             const singleId = allElements[0].id;
             setTimeout(() => {
                 window.handleElementSelection(singleId);
             }, 10);
             activeId = singleId;
        }
    } else {
        if (container) container.style.display = 'block';
    }
    
    select.innerHTML = '';
    
    const layoutDir = myCelestialConf.userData.canvas.layoutDirection || 'row';
    const isRow = layoutDir === 'row';

    allElements.forEach((el, idx) => {
        const option = document.createElement('option');
        option.value = el.id;
        
        let label = "";
        if (el.type === 'map') label = "✨ Csillagtérkép";
        else if (el.subType === 'moon') label = "🌔 Holdfázis";
        else label = "📷 Saját Fotó";
        
        let posText = "";
        if (allElements.length > 1) {
            if (idx === 0) posText = isRow ? " (Bal)" : " (Fent)";
            else if (idx === allElements.length - 1) posText = isRow ? " (Jobb)" : " (Lent)";
            else posText = ` (${idx + 1}.)`;
        }
        
        option.text = `${label}${posText}`;
        if (el.id == activeId) option.selected = true;
        select.appendChild(option);
    });
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

// --- HOLD ÉS TÉRKÉP KIEGÉSZÍTŐK ---
window.addMapElement = function(side) {
    if(!myCelestialConf.userData) initUserData();
    const newId = Date.now();
    const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
    delete currentConfig.userData; 
    
    if (typeof Celestial !== 'undefined' && typeof Celestial.date === 'function') {
         currentConfig.Ido = Celestial.date(); 
    }
    var cityInput = document.getElementById('city');
    if(cityInput) currentConfig.Varos = cityInput.value;

    const newEl = {
        id: newId, type: 'map',
        dataURL: document.querySelector('#celestial-map canvas').toDataURL('image/png'),
        celestialConfig: currentConfig,
        widthCM: 20, align: 'center', marginTop: 0, marginBottom: 0, 
        scale: 1.0, rotation: 0, mask: 'none', maskScale: 1.0,
        borderWidth: 0, borderEnabled: false, borderColor: '#ffffff',
        calculated: { x: 0, y: 0, scale: 1 } 
    };

    const activeTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const sourceZoneKey = (activeTextContext && (activeTextContext === 'map' || activeTextContext.startsWith('map_'))) ? activeTextContext : 'map';
                          
    if (myCelestialConf.userData.zones[sourceZoneKey]) {
        myCelestialConf.userData.zones[`map_${newId}`] = JSON.parse(JSON.stringify(myCelestialConf.userData.zones[sourceZoneKey]));
    } else {
        myCelestialConf.userData.zones[`map_${newId}`] = { top: {blocks:[]}, bottom: {blocks:[]} };
    }

    if (side === 'start' || side === 'left' || side === 'top') myCelestialConf.userData.elements.unshift(newEl);
    else myCelestialConf.userData.elements.push(newEl);
    
    window.updateCanvasSize();
    updateElementSelectorUI(); 
    loadMapToEditor(newId);
}

window.updateActiveMapSnapshot = function() {
    if(!myCelestialConf.userData) return;
    const activeId = myCelestialConf.userData.uiState.selectedElementId || 'main-map';
    const el = myCelestialConf.userData.elements.find(e => e.id === activeId);
    
    if (el && el.type === 'map') {
        const canvas = document.querySelector('#celestial-map canvas');
        if (canvas) el.dataURL = canvas.toDataURL('image/png');
        
        const currentConfig = JSON.parse(JSON.stringify(myCelestialConf));
        if (typeof Celestial !== 'undefined' && typeof Celestial.date === 'function') currentConfig.Ido = Celestial.date(); 
        var cityInput = document.getElementById('city');
        if(cityInput) currentConfig.Varos = cityInput.value;
        
        delete currentConfig.userData; 
        el.celestialConfig = currentConfig;
        window.refreshMapTransform();
    }
}

// --- INIT ÉS EGYÉB ---
window.updatePhotoMaskUI = function(activeType, prefix = 'p-mask-btn') {
    document.querySelectorAll('.mask-option').forEach(el => {
        el.style.border = '1px solid #555';
        el.style.borderColor = '#555';
    });
    const activeBtn = document.getElementById(`${prefix}-${activeType}`);
    if(activeBtn) activeBtn.style.border = '2px solid #4a9eff';
}


// --- SZÖVEGEK ---
window.switchTextContext = function(context) {
    if(!myCelestialConf.userData) initUserData();
    
    if (context === 'photo') {
        let targetId = myCelestialConf.userData.uiState.activePhotoId;
        if (!targetId) {
            const photos = myCelestialConf.userData.elements.filter(el => el.type === 'photo');
            if (photos.length > 0) targetId = photos[0].id;
        }
        if (targetId) context = `photo_${targetId}`;
        else context = 'map'; 
    }

    myCelestialConf.userData.uiState.currentTextContext = context; 
    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags;
    // --- ÚJ: active-element-selector szinkronizálása ---
    // Ha nem 'common', akkor megkeressük az ID-t és beállítjuk a másik selectet is
    if (context !== 'common') {
        const idParts = context.split('_');
        let targetId = null;
        
        if (idParts.length > 1) {
            targetId = idParts[1]; // pl. photo_123 -> 123
        } else if (context === 'map') {
            // Ha 'map', akkor keressük meg a main-map ID-ját vagy az első térképét
            const mapEl = myCelestialConf.userData.elements.find(e => e.type === 'map');
            if (mapEl) targetId = mapEl.id;
        }

        if (targetId) {
            const activeSelector = document.getElementById('active-element-selector');
            if (activeSelector) {
                activeSelector.value = targetId;
                // Opcionális: Ha azt akarjuk, hogy a kiválasztás hatására a szerkesztő panel is frissüljön (pl. a térkép beállítások),
                // akkor meghívhatjuk a handleElementSelection-t, DE ez körkörös hívást okozhat, ha nem figyelünk.
                // A switchTextContext-et általában a szöveg fülön hívjuk, így itt elég csak a vizuális selectet átállítani,
                // vagy beállítani az activePhotoId/selectedElementId-t a háttérben.
                
                // Frissítjük a state-et is, hogy konzisztens legyen
                const el = myCelestialConf.userData.elements.find(e => e.id == targetId);
                if (el) {
                    if (el.type === 'map') {
                        myCelestialConf.userData.uiState.selectedElementId = targetId;
                        myCelestialConf.userData.uiState.activePhotoId = null;
                    } else {
                        myCelestialConf.userData.uiState.selectedElementId = targetId;
                        myCelestialConf.userData.uiState.activePhotoId = targetId;
                    }
                }
            }
        }
    }
    if (context === 'common') {
        if (!myCelestialConf.userData.zones.common) myCelestialConf.userData.zones.common = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
        if (myCelestialConf.userData.zones.common.top.blocks.length === 0) addNewBlockToStore('common', 'top', true);
        if (myCelestialConf.userData.zones.common.bottom.blocks.length === 0) addNewBlockToStore('common', 'bottom', true);
    }
    
    // Címek frissítése
    let label = (context === 'common') ? "KÖZÖS" : (context.startsWith('photo_') ? "Kép" : "Csillagtérkép");
    if (context !== 'common') {
        const idParts = context.split('_');
        let id = null;
        if (idParts.length > 1) id = idParts[1];
        else if (context === 'map') id = 'main-map';
        
        if (id) {
            const allElements = myCelestialConf.userData.elements;
            let idx = (id === 'main-map') ? allElements.findIndex(e => e.type === 'map') : allElements.findIndex(e => e.id == id);
            if (idx !== -1) {
                const el = allElements[idx];
                let typeName = (el.type === 'map') ? "Csillagtérkép" : ((el.subType === 'moon') ? "Hold" : "Fotó");
                label = `${typeName} ${idx + 1}`;
            }
        }
    }

    const titleTop = document.getElementById('top-zone-title');
    if(titleTop && myCelestialConf.userData.elements.length != 1) titleTop.innerText = `📝 FELSŐ ZÓNA (${label})`
    else titleTop.innerText = `📝 FELSŐ ZÓNA`;
    const titleBottom = document.getElementById('bottom-zone-title');
    if(titleBottom && myCelestialConf.userData.elements.length != 1) titleBottom.innerText = `📝 ALSÓ ZÓNA (${label})`
    else titleBottom.innerText = `📝 ALSÓ ZÓNA`;
    
    const chkTop = document.getElementById('chk-common-top'); if(chkTop) chkTop.checked = zoneFlags.topCommon;
    const chkBottom = document.getElementById('chk-common-bottom'); if(chkBottom) chkBottom.checked = zoneFlags.bottomCommon;
    
    renderPhotoContextSelector(context);
    renderZoneUI('top');
    renderZoneUI('bottom');
    window.renderFixedTexts();
}

function renderPhotoContextSelector(currentContext) {
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

    // --- JAVÍTOTT MEGJELENÍTÉS: Csak ha több mint 1 elem van ---
    const allElements = myCelestialConf.userData.elements;
    if (allElements.length <= 1) {
        container.style.display = 'none';
        return; // Nem rendereljük tovább
    } else {
        container.style.display = 'block';
    }

    let options = "";
    
    allElements.forEach((el, idx) => {
        let contextKey;
        if (el.type === 'map') {
            contextKey = (el.id === 'main-map' || !el.id) ? 'map' : `map_${el.id}`;
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

function getMapMetaData() {
    let dateStr = "Dátum";
    if (typeof Celestial !== 'undefined' && typeof Celestial.date === 'function') {
        const d = Celestial.date();
        if (d) dateStr = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
    }
    let cityInput = document.getElementById('city');
    let locStr = (cityInput && cityInput.value && cityInput.value !== "Város keresése...") ? cityInput.value : "Budapest"; 
    let coordStr = "47.4979° N, 19.0402° E";
    if (typeof Celestial !== 'undefined' && Celestial.settings) {
        const loc = Celestial.settings().location; 
        if (loc) coordStr = `${Math.abs(loc[0]).toFixed(4)}° ${loc[0] >= 0 ? "N" : "S"}, ${Math.abs(loc[1]).toFixed(4)}° ${loc[1] >= 0 ? "E" : "W"}`;
    }
    return { location: locStr, date: dateStr, coords: coordStr };
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
    const centerX = xStart + ((xEnd - xStart) / 2);

    let totalContentHeight = 0;
    blocks.forEach((block, idx) => {
        const fontSize = parseInt(block.size) || 32;
        const lineHeight = fontSize * 1.3; 
        if (block.isNewLine || idx === 0) totalContentHeight += lineHeight;
    });

    let startY = areaTop;

    if (align === 'center') {
        const availableHeight = areaBottom - areaTop;
        const middle = areaTop + (availableHeight / 2);
        startY = middle - (totalContentHeight / 2);
    } 
    else if (align === 'top') {
        startY = areaTop + marginPx;
    } 
    else if (align === 'bottom') {
        startY = areaBottom - marginPx - totalContentHeight;
    }

    let currentY = startY;
    
    blocks.forEach(block => {
        const fontSize = parseInt(block.size) || 32;
        const lineHeight = fontSize * 1.3;
        
        let posX = centerX;
        let anchor = "middle";
        
        let sideMargin = 0;
        if (block.marginSide !== undefined) {
             sideMargin = block.marginSide * pxPerCm;
        } else {
             sideMargin = (xEnd - xStart) * 0.05; 
        }

        if (block.alignH === 'start') { 
            posX = xStart + sideMargin; 
            anchor = "start"; 
        }
        if (block.alignH === 'end') { 
            posX = xEnd - sideMargin; 
            anchor = "end"; 
        }

        block.calculated = { x: posX, y: currentY + fontSize * 0.8 };

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', posX);
        text.setAttribute('y', currentY + fontSize * 0.8); 
        text.setAttribute('font-family', block.font);
        text.setAttribute('font-size', fontSize);
        text.setAttribute('font-weight', block.weight);
        text.setAttribute('fill', block.color);
        text.setAttribute('text-anchor', anchor);
        if (block.style === 'italic') text.setAttribute('font-style', 'italic');
        text.textContent = block.content;
        text.style.cursor = "pointer";
        text.onclick = function(e) { e.stopPropagation(); if(window.selectDataBlock) window.selectDataBlock(type, block.id); };

        textLayer.appendChild(text);

        if (block.isNewLine) currentY += lineHeight; 
        else currentY += lineHeight; 
    });
}

window.addNewBlockToStore = function(context, zone, isNewLine) {
    if(!myCelestialConf.userData) initUserData();
    const zones = myCelestialConf.userData.zones;
    if(!zones[context]) zones[context] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
    if(!zones[context][zone]) zones[context][zone] = { alignV:'center', blocks:[] };
    
    zones[context][zone].blocks.push({
        id: Date.now() + Math.random(), isNewLine: isNewLine, content: isNewLine ? "Új szöveg" : " folytatás...",
        font: "Space Grotesk", size: 32, weight: "normal", style: "normal", color: "#e8edf5", alignH: "middle", marginSide: 1, calculated: { x: 0, y: 0 } 
    });
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

function renderZoneUI(zone) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    const zoneFlags = myCelestialConf.userData.uiState.zoneFlags;
    const container = document.getElementById(`${zone}-blocks-container`);
    container.innerHTML = '';
    
    const isCommonContext = (currentTextContext === 'common');
    const isZoneCommonActive = (zone === 'top' && zoneFlags.topCommon) || (zone === 'bottom' && zoneFlags.bottomCommon);
    const wrapperId = zone === 'top' ? 'top-text-settings' : 'bottom-text-settings';
    const wrapper = document.getElementById(wrapperId);
    const settingsGroup = wrapper ? wrapper.querySelector('.setting-group') : null;

    if (!isCommonContext && isZoneCommonActive) {
        if(settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>⚠️ A Közös ${zone === 'top' ? 'Felső' : 'Alsó'} Szövegdoboz aktív.</p><button onclick="switchTextContext('common')" class="add-btn primary" style="margin-top:10px; width:auto; font-size:12px;">Ugrás a Közös szerkesztőhöz ➡</button></div>`;
        return;
    }
    if (isCommonContext && !isZoneCommonActive) {
        if(settingsGroup) settingsGroup.style.display = 'none';
        container.innerHTML = `<div style="text-align: center; padding: 20px; color: #aaa; background: rgba(0,0,0,0.2); border-radius: 8px; margin-top:10px;"><p>Ez a zóna nincs bekapcsolva közös használatra.</p></div>`;
        return;
    }
    if(settingsGroup) settingsGroup.style.display = 'block';

    if (!myCelestialConf.userData.zones[currentTextContext]) myCelestialConf.userData.zones[currentTextContext] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
    const data = myCelestialConf.userData.zones[currentTextContext][zone];
    
    // --- GYORS ADATOK AKTÍV ÁLLAPOTÁNAK ELLENŐRZÉSE ---
    const hasLocation = data.blocks.some(b => b.tag === 'location');
    const hasDate = data.blocks.some(b => b.tag === 'date');
    const hasCoords = data.blocks.some(b => b.tag === 'coords');

    const btnStyleBase = "flex:1; padding:6px; border:1px solid #444; color:#aaa; transition: all 0.2s;";
    const btnStyleActive = "flex:1; padding:6px; border:1px solid var(--accent-blue); background: var(--accent-blue); color:white; font-weight:bold; transition: all 0.2s;";
    
    const controlsDiv = document.createElement('div');
    controlsDiv.style.cssText = "margin-bottom:15px; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px;";
    controlsDiv.innerHTML = `
        <div style="font-size:12px; color:#aaa; margin-bottom:5px;">Gyors Adatok:</div>
        <div style="display:flex; gap:5px; margin-bottom:10px;">
            <button onclick="toggleDataBlock('${zone}', 'location')" style="${hasLocation ? btnStyleActive : btnStyleBase} ${!hasLocation ? 'background:rgba(255,255,255,0.05);' : ''}">📍 Helyszín</button>
            <button onclick="toggleDataBlock('${zone}', 'date')" style="${hasDate ? btnStyleActive : btnStyleBase} ${!hasDate ? 'background:rgba(255,255,255,0.05);' : ''}">📅 Dátum</button>
            <button onclick="toggleDataBlock('${zone}', 'coords')" style="${hasCoords ? btnStyleActive : btnStyleBase} ${!hasCoords ? 'background:rgba(255,255,255,0.05);' : ''}">🌐 Koord.</button>
        </div>
        <div style="font-size:12px; color:#aaa; margin-bottom:5px;">Szöveg Sablonok:</div>
        <select onchange="applyTextTemplate('${zone}', this.value); this.value='';" style="width:100%; padding:6px; background:#111; color:white; border:1px solid #444; border-radius:4px;">
            <option value="">-- Válassz egy témát --</option>
            ${Object.keys(TEXT_TEMPLATES).map(cat => `<optgroup label="${cat}">${TEXT_TEMPLATES[cat].map(t => `<option value="${t}">${t}</option>`).join('')}</optgroup>`).join('')}
        </select>
    `;
    container.appendChild(controlsDiv);

    if (data.blocks.length === 0) {
        container.innerHTML += `<div style="text-align: center; padding: 20px;"><button onclick="insertBlockAt('${zone}', -1, true)" class="add-btn primary" style="width:100%;">➕ Első sor hozzáadása</button></div>`;
        return; 
    }

    container.innerHTML += `<div style="margin-bottom:10px; text-align:center;"><button onclick="insertBlockAt('${zone}', -1, true)" class="add-btn secondary" style="width:100%; padding: 5px; font-size: 11px; border-style: dashed;">⬆ Beszúrás a legelejére</button></div>`;
    const alignSelect = document.getElementById(`${zone}-zone-align-v`);
    if(alignSelect) alignSelect.value = data.alignV;

    data.blocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.className = `block-card ${block.isNewLine ? 'newline' : 'inline'}`;
        const fonts = ["Space Grotesk", "Playfair Display", "Montserrat", "Great Vibes", "Cinzel"];
        let fontOptions = fonts.map(f => `<option value="${f}" style="font-family:'${f}'" ${block.font === f ? 'selected' : ''}>${f}</option>`).join('');
        let marginHTML = (block.isNewLine && block.alignH !== 'middle') ? `<div style="margin-top:8px;"><label style="font-size:10px; color:#4a9eff;">${block.alignH==='start'?'Bal':'Jobb'} margó (cm):</label><input type="number" value="${block.marginSide||0}" step="0.1" oninput="updateBlockData('${zone}', ${block.id}, 'marginSide', this.value)" style="width:100%;"></div>` : '';

        div.innerHTML = `
            <div style="font-size:11px; margin-bottom:5px; color:#aaa; display:flex; justify-content:space-between;"><span>${block.isNewLine ? '⏎ ÚJ SOR' : '➕ INLINE'} ${block.tag ? `<span style="color:var(--accent-blue);">[${block.tag}]</span>` : ''}</span></div>
            <div class="setting-group" style="margin-bottom:8px;"><textarea id="textarea-${block.id}" rows="2" oninput="updateBlockContentAndPreview('${zone}', ${block.id}, this.value)" style="width:100%; font-family:'${block.font}'; font-size: 24px; background:rgba(0,0,0,0.3); color:white; border:1px solid #555; padding:5px;">${block.content}</textarea></div>
            <div class="grid-2-cols" style="gap:10px; margin-bottom:8px;"><div><label style="font-size:10px;">Betűméret: <span style="color:var(--accent-blue); float:right;">${calculateCM(block.size)}</span></label><input type="number" value="${block.size}" oninput="updateBlockData('${zone}', ${block.id}, 'size', this.value)"></div><div><label style="font-size:10px;">Szín:</label><input type="color" value="${block.color}" oninput="updateBlockData('${zone}', ${block.id}, 'color', this.value)" style="height:38px;"></div></div>
            <div class="grid-2-cols" style="gap:10px; margin-bottom:12px;"><div><label style="font-size:10px;">Betűtípus:</label><select onchange="updateBlockData('${zone}', ${block.id}, 'font', this.value)" style="font-family:'${block.font}'">${fontOptions}</select></div>${block.isNewLine ? `<div><label style="font-size:10px;">Rendezés:</label><select onchange="updateBlockData('${zone}', ${block.id}, 'alignH', this.value)"><option value="start" ${block.alignH==='start'?'selected':''}>Balra</option><option value="middle" ${block.alignH==='middle'?'selected':''}>Közép</option><option value="end" ${block.alignH==='end'?'selected':''}>Jobbra</option></select></div>` : '<div></div>'}</div>
            ${marginHTML}
            <div class="block-actions" style="display: flex; gap: 5px; border-top: 1px solid #444; padding-top: 8px; margin-top:8px;">
                <button onclick="insertBlockAt('${zone}', ${index}, true)" class="add-btn primary" style="flex:1; padding:6px; font-size:11px;">⏎ Új sor</button>
                <button onclick="insertBlockAt('${zone}', ${index}, false)" class="add-btn secondary" style="flex:1; padding:6px; font-size:11px;">➕ Inline</button>
                <button onclick="window.openSymbolPicker(event, '${zone}', ${block.id})" class="add-btn accent" style="width:auto; padding:6px;">♥</button>
                <button onclick="removeBlock('${zone}', ${block.id})" class="add-btn" style="width:auto; padding:6px; background:#ff4444;">🗑</button>
            </div>
        `;
        container.appendChild(div);
    });
}
function getCurrentZoneData(zone) {
    if(!myCelestialConf.userData) initUserData();
    const currentTextContext = myCelestialConf.userData.uiState.currentTextContext;
    if (!myCelestialConf.userData.zones[currentTextContext]) return null;
    return myCelestialConf.userData.zones[currentTextContext][zone];
}

window.toggleDataBlock = function(zone, tag) {
    const data = getCurrentZoneData(zone);
    if (!data) return;
    const existingIndex = data.blocks.findIndex(b => b.tag === tag);
    if (existingIndex !== -1) data.blocks.splice(existingIndex, 1);
    else {
        const meta = getMapMetaData();
        let content = "", size = 32, font = "Space Grotesk", weight = "normal";
        if (tag === 'location') { content = meta.location; size = 50; weight = "bold"; }
        if (tag === 'date') { content = meta.date; size = 32; }
        if (tag === 'coords') { content = meta.coords; size = 24; font = "Montserrat"; weight = "300"; }
        data.blocks.push({ id: Date.now() + Math.random(), isNewLine: true, content: content, font: font, size: size, weight: weight, color: "#e8edf5", alignH: "middle", tag: tag, calculated: { x: 0, y: 0 } });
    }
    renderZoneUI(zone); window.renderFixedTexts();
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
    if (!myCelestialConf.userData.zones[currentTextContext]) return;
    const blocks = myCelestialConf.userData.zones[currentTextContext][zone].blocks;
    const newBlock = { id: Date.now() + Math.random(), isNewLine: isNewLine, content: isNewLine ? "Új szöveg" : " folytatás...", font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", marginSide: 1, calculated: { x: 0, y: 0 } };
    if (index === -1) blocks.unshift(newBlock); else blocks.splice(index + 1, 0, newBlock);
    renderZoneUI(zone); window.renderFixedTexts();
}

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
    const block = myCelestialConf.userData.zones[currentTextContext][zone].blocks.find(b => b.id === id);
    if (block) { block.content = newValue; window.renderFixedTexts(); }
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

window.updateDesignerFromCelestial = function() {
    if (!myCelestialConf || !myCelestialConf.userData) return;
    
    const meta = getMapMetaData();
    let changed = false;
    const zones = myCelestialConf.userData.zones;
    
    const activeMapId = myCelestialConf.userData.uiState.selectedElementId || 'main-map';
    const contextKey = (activeMapId === 'main-map') ? 'map' : `map_${activeMapId}`;
    
    const updateBlocks = (blocks) => {
        blocks.forEach(block => {
            if (['date','location','coords'].includes(block.tag) && block.content !== meta[block.tag]) {
                block.content = meta[block.tag]; changed = true;
                const ta = document.getElementById(`textarea-${block.id}`); if(ta) ta.value = meta[block.tag];
            }
        });
    };
    
    if (zones[contextKey]) {
        if(zones[contextKey].top) updateBlocks(zones[contextKey].top.blocks); 
        if(zones[contextKey].bottom) updateBlocks(zones[contextKey].bottom.blocks); 
    }
    
    if (changed) window.renderFixedTexts();
};

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

window.updateCanvasBackground = function(color) {
    const mapWrap = document.getElementById('map-wrap'); if (mapWrap) mapWrap.style.background = color;
    const dSvg = document.getElementById('designer-svg'); if (dSvg) dSvg.style.backgroundColor = color;
    const bgRect = document.getElementById('designer-background-rect'); if (bgRect) bgRect.setAttribute('fill', color.startsWith('#') ? color : "#000000");
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

async function exportCanvas(format) {
    if (!getDOMElements()) { alert("Hiba: A tervező elem nem található."); return; }
    document.body.style.cursor = 'wait';
    try {
        const vb = designerSVG.viewBox.baseVal;
        const width = vb.width; const height = vb.height; const x = vb.x; const y = vb.y;
        const bgStyle = designerSVG.style.background || designerSVG.style.backgroundColor || "#0a0e27";
        let finalCSS = "";
        
        if (typeof availableFonts !== 'undefined' && availableFonts.length > 0) {
            try {
                const families = availableFonts.map(f => f.replace(/ /g, '+')).join('&family=');
                const fontUrl = `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
                const response = await fetch(fontUrl);
                if (response.ok) {
                    let cssText = await response.text();
                    finalCSS += cssText + "\n";
                }
            } catch (e) {}
        }

        const svgClone = designerSVG.cloneNode(true);
        svgClone.setAttribute("width", width); svgClone.setAttribute("height", height);
        svgClone.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        const styleElement = document.createElementNS("http://www.w3.org/2000/svg", "style");
        styleElement.textContent = finalCSS;
        svgClone.insertBefore(styleElement, svgClone.firstChild);

        const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        bgRect.setAttribute("x", x); bgRect.setAttribute("y", y); bgRect.setAttribute("width", width); bgRect.setAttribute("height", height);
        bgRect.setAttribute("fill", bgStyle.includes('gradient') ? "#000000" : bgStyle);
        svgClone.insertBefore(bgRect, svgClone.firstChild);

        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgClone);
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        
        if (format === 'svg') {
            const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
            const link = document.createElement("a"); link.download = `csillagterkep_vektoros_${Date.now()}.svg`; link.href = url;
            document.body.appendChild(link); link.click(); document.body.removeChild(link);
        } else {
            const scaleFactor = 3; 
            const canvas = document.createElement("canvas");
            canvas.width = width * scaleFactor; canvas.height = height * scaleFactor;
            const ctx = canvas.getContext("2d");
            const img = new Image();
            const svgBlob = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
            const url = URL.createObjectURL(svgBlob);
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const link = document.createElement('a');
                link.download = `csillagterkep_${Date.now()}.${format==='jpeg'?'jpg':format}`;
                link.href = canvas.toDataURL(`image/${format}`, 0.95); 
                document.body.appendChild(link); link.click(); document.body.removeChild(link);
                URL.revokeObjectURL(url);
            };
            img.src = url;
        }
    } catch (e) { console.error(e); alert("Exportálási hiba: " + e.message); }
    document.body.style.cursor = 'default';
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
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 200; tempCanvas.height = 200;
        const ctx = tempCanvas.getContext('2d');
        
        const moonBaseImage = new Image();
        moonBaseImage.crossOrigin = "Anonymous";
        moonBaseImage.src = MOON_IMG_SRC;
        
        moonBaseImage.onload = function() {
             const cx = 100; const cy = 100; const r = 95;
             ctx.clearRect(0,0,200,200);
             ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
             ctx.save(); ctx.clip();
             ctx.clearRect(0,0,200,200);
             ctx.drawImage(moonBaseImage, 0, 0, 200, 200);
             ctx.filter = 'blur(5px)';
             ctx.globalCompositeOperation = 'source-over';
             ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
             const p = phaseData.cycle * 2 * Math.PI;
             ctx.beginPath(); ctx.moveTo(cx, cy - r);
             for (let dy = -r; dy <= r; dy += 2) {
                const x = cx - Math.cos(p) * Math.sqrt(r*r - dy*dy);
                ctx.lineTo(x, cy + dy);
             }
             if (phaseData.cycle < 0.5) ctx.arc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5);
             else ctx.arc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5, true);
             ctx.fill();
             ctx.restore();
             imgPreview.src = tempCanvas.toDataURL();
        }
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

window.generateMoonImage = function(date, lat, lng, callback) {
    const genCanvas = document.createElement('canvas');
    genCanvas.width = 2000; genCanvas.height = 2000;
    const ctx = genCanvas.getContext('2d');
    
    const moonImg = new Image();
    moonImg.crossOrigin = "Anonymous";
    moonImg.src = MOON_IMG_SRC;
    
    moonImg.onload = function() {
        const phaseData = calculateMoonData(date);
        const cycle = phaseData.cycle; 
        
        let rotation = calculateMoonOrientation(date, lat, lng);
        rotation += Math.PI / 2;

        const cx = 1000, cy = 1000, r = 980; 
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.translate(-cx, -cy);

        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.closePath();
        ctx.save();
        ctx.clip();
        
        ctx.clearRect(0,0,2000,2000);
        
        const size = Math.min(moonImg.width, moonImg.height);
        ctx.drawImage(moonImg, (moonImg.width-size)/2, (moonImg.height-size)/2, size, size, cx-r, cy-r, r*2, r*2);
        
        ctx.filter = 'blur(60px)';
        ctx.globalCompositeOperation = 'source-over'; 
        ctx.fillStyle = "rgba(0, 0, 0, 0.96)"; 
        
        const p = cycle * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(cx, cy - r);
        
        for (let dy = -r; dy <= r; dy += 20) {
            const width = r * Math.cos(p);
            const circleW = Math.sqrt(r * r - dy * dy);
            const x = cx - Math.cos(p) * circleW;
            ctx.lineTo(x, cy + dy);
        }
        
        if (cycle < 0.5) ctx.arc(cx, cy, r + 40, Math.PI * 0.5, Math.PI * 1.5);
        else ctx.arc(cx, cy, r + 40, Math.PI * 0.5, Math.PI * 1.5, true);
        
        ctx.fill();
        ctx.restore(); 
        
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
        ctx.fillStyle = "#fff"; ctx.fill();
        
        ctx.restore(); 

        const dataURL = genCanvas.toDataURL('image/png');
        if (callback) callback(dataURL, phaseData);
    };
    moonImg.onerror = function() { console.error("Hiba a Hold kép betöltésekor."); };
}

// --- 1. MÓDOSÍTÁS: Fázis adatok hozzáadása a FELSŐ zónába ---
window.addMoonElement = function(side) {
    const dateInput = document.getElementById('moon-date');
    const timeInput = document.getElementById('moon-time');
    
    let dateStr = dateInput ? dateInput.value : new Date().toISOString().split('T')[0];
    let timeStr = timeInput ? timeInput.value : "12:00";
    
    const date = new Date(dateStr + 'T' + timeStr + ':00Z');
    
    let defaultLat = 47.4979;
    let defaultLng = 19.0402;
    let defaultCity = "Budapest"; 

    if (window.myCelestialConf) {
        if (window.myCelestialConf.geopos) {
            defaultLat = window.myCelestialConf.geopos[0];
            defaultLng = window.myCelestialConf.geopos[1];
        }
        if (window.myCelestialConf.Varos) {
            defaultCity = window.myCelestialConf.Varos;
        }
    }
    
    generateMoonImage(date, defaultLat, defaultLng, function(dataURL, phaseData) {
        window.addNewElement('moon', dataURL, side, `Moon_${dateStr}_${timeStr}`);
        
        if(!myCelestialConf.userData) initUserData();
        const elements = myCelestialConf.userData.elements;
        const newEl = (side === 'start' || side === 'left' || side === 'top') ? elements[0] : elements[elements.length - 1];
        
        if (newEl) {
            newEl.borderWidth = 0; newEl.borderEnabled = false;
            newEl.moonDate = dateStr;
            newEl.moonTime = timeStr;
            newEl.moonLat = defaultLat;
            newEl.moonLng = defaultLng;
            newEl.moonLocationName = defaultCity;

            const check = document.getElementById('moon-text-check');
            if (check && check.checked) {
                const zoneId = `photo_${newEl.id}`;
                if (!myCelestialConf.userData.zones[zoneId]) {
                     myCelestialConf.userData.zones[zoneId] = { top: {alignV:'center', blocks:[]}, bottom: {alignV:'center', blocks:[]} };
                }
                const topZone = myCelestialConf.userData.zones[zoneId].top; 
                const bottomZone = myCelestialConf.userData.zones[zoneId].bottom; 
                
                // --- ALSÓ ZÓNA: Hely, Dátum, Koord ---
                const d = new Date(dateStr);
                const formattedDate = d.getFullYear() + ". " + (d.getMonth() + 1).toString().padStart(2, '0') + ". " + d.getDate().toString().padStart(2, '0') + ".";
                const latText = Math.abs(defaultLat).toFixed(4) + "° " + (defaultLat >= 0 ? "N" : "S");
                const lngText = Math.abs(defaultLng).toFixed(4) + "° " + (defaultLng >= 0 ? "E" : "W");
                const coordStr = `${latText}, ${lngText}`;

                bottomZone.blocks.push(
                    { id: Date.now()+1, isNewLine: true, tag: 'location', content: defaultCity, font: "Space Grotesk", size: 50, weight: "bold", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+2, isNewLine: true, tag: 'date', content: formattedDate, font: "Space Grotesk", size: 32, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+3, isNewLine: true, tag: 'coords', content: coordStr, font: "Montserrat", size: 24, weight: "300", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} }
                );

                // --- FELSŐ ZÓNA: Hold tulajdonságok ---
                let phaseName = getPhaseName(phaseData.cycle);
                let zodiac = getZodiacSign(phaseData.cycle);
                
                // Dátum számítások
                const daysToNew = (1 - phaseData.cycle) * 29.53;
                const daysToFull = (phaseData.cycle < 0.5) ? (0.5 - phaseData.cycle) * 29.53 : (1.5 - phaseData.cycle) * 29.53;
                const nextNewDate = new Date(date.getTime() + daysToNew * 86400000);
                const nextFullDate = new Date(date.getTime() + daysToFull * 86400000);
                const nextNewStr = nextNewDate.getFullYear() + ". " + (nextNewDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextNewDate.getDate().toString().padStart(2, '0') + ".";
                const nextFullStr = nextFullDate.getFullYear() + ". " + (nextFullDate.getMonth() + 1).toString().padStart(2, '0') + ". " + nextFullDate.getDate().toString().padStart(2, '0') + ".";

                topZone.blocks.push(
                    { id: Date.now()+10, isNewLine: true, tag: 'moon_phase', content: phaseName, font: "Playfair Display", size: 40, weight: "bold", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+11, isNewLine: true, tag: 'moon_illum', content: `Megvilágítottság: ${phaseData.illumination.toFixed(1)}%`, font: "Montserrat", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+12, isNewLine: true, tag: 'moon_age', content: `Hold kora: ${phaseData.age.toFixed(1)} nap`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+13, isNewLine: true, tag: 'moon_nextnew', content: `Következő Újhold: ${nextNewStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+14, isNewLine: true, tag: 'moon_nextfull', content: `Következő Telihold: ${nextFullStr}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} },
                    { id: Date.now()+15, isNewLine: true, tag: 'moon_zodiac', content: `Csillagjegy: ${zodiac}`, font: "Space Grotesk", size: 24, weight: "normal", color: "#e8edf5", alignH: "middle", calculated: {x:0,y:0} }
                );

                window.renderFixedTexts();
            }
        }
    });
}

function initMoonCitySearch() {
    const input = document.getElementById('moon-city-search');
    // Csak akkor fusson le, ha van input és még nincs rajta a 'pac-target-input' class (Google Maps jelzője)
    if (!input || input.classList.contains('pac-target-input')) return;
    
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        const autocomplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
        
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location.lat();
                const lon = place.geometry.location.lng();
                
                // Inputok frissítése
                const latInp = document.getElementById('moon-edit-lat');
                const lonInp = document.getElementById('moon-edit-lon');
                if(latInp) latInp.value = lat.toFixed(4);
                if(lonInp) lonInp.value = lon.toFixed(4);
                
                // Beírjuk a nevet az inputba, hogy látszódjon
                input.value = place.name;
                
                // Frissítés indítása a város nevével
                updateActiveMoonSettings(place.name);
            }
        });
        // Jelöljük meg, hogy inicializálva van (opcionális, de a class check biztonságosabb)
        input.dataset.initialized = "true";
    }
}
// --- 2. MÓDOSÍTÁS: Frissítéskor minden adat újraszámolása ---
window.updateActiveMoonSettings = function(newCityName) {
    if(!myCelestialConf.userData) initUserData();
    const activeId = myCelestialConf.userData.uiState.activePhotoId;
    const el = myCelestialConf.userData.elements.find(e => e.id == activeId);
    
    if (!el || el.subType !== 'moon') return;
    
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
    
    generateMoonImage(fullDate, latVal, lonVal, function(dataURL, phaseData) {
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
        if(document.getElementById('bottom-blocks-container') && document.getElementById('bottom-blocks-container').innerHTML !== "") renderZoneUI('bottom');
        if(document.getElementById('top-blocks-container') && document.getElementById('top-blocks-container').innerHTML !== "") renderZoneUI('top');
    });
}


// --- INIT ---
const debouncedRefreshMapTransform = debounce(() => window.refreshMapTransform(), 10);
const debouncedApplyMaskToDesigner = debounce(() => window.applyMaskToDesigner(), 20);

$(document).ready(function() {
    initUserData(); 

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
            requestAnimationFrame(() => {
                if (isDesignerFirstRun) {
                    const w = parseFloat(document.getElementById('canvas-width').value);
                    const h = parseFloat(document.getElementById('canvas-height').value);
                    const maxWidth = Math.min(w, h);
                    const mapInput = document.getElementById('map-width-cm-input');
                    if(mapInput) mapInput.value = maxWidth;
                    if(window.setMapWidth) window.setMapWidth(maxWidth);
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