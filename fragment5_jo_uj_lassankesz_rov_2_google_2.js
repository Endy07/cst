
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
const availableFonts = [
    "Space Grotesk", "Montserrat", "Roboto", "Open Sans",
    "Merriweather", "Playfair Display", "Raleway", "Great Vibes", 
    "Dancing Script", "Cinzel", "Allura", "Sacramento",
    "MedievalSharp", "Uncial Antiqua", "Tangerine", "Special Elite",
    "Quicksand", "Parisienne"
];
const GRADIENT_PRESETS = [
    { name: "Alap Kék (Éjszaka)", value: "linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)" },
    { name: "Mély Űr (Fekete)", value: "#000000" },
    { name: "Tiszta Fehér", value: "#ffffff" },
    { name: "Monokróm (Fekete-Fehér)", value: "linear-gradient(135deg, #000000 0%, #ffffff 100%)" },
    { name: "Éjfél (Sötétkék)", value: "linear-gradient(135deg, #020024 0%, #090979 35%, #00d4ff 100%)" },
    { name: "Naplemente (Lila)", value: "linear-gradient(135deg, #240b36 0%, #c31432 100%)" },
    { name: "Aurora (Zöldes)", value: "linear-gradient(135deg, #000000 0%, #0f9b0f 100%)" },
    { name: "Királyi (Arany-Kék)", value: "linear-gradient(135deg, #141E30 0%, #243B55 100%)" },
    { name: "Vintage (Papír)", value: "#f0e6d2" },
    { name: "Szerelmes (Rózsaszín)", value: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" }
];

window.tempMoonShadow = "black";
let designerSVG, textLayer, mapLayer;
let activeSymbolZone = null, activeSymbolBlockId = null;
let cropper;
let tempInsertSide = 'end', tempUploadedFileName = '';

// --- ADATBÁZIS ÉS INICIALIZÁLÁS ---
function initUserData() {
    if (typeof myCelestialConf === 'undefined' || !myCelestialConf) {
        window.myCelestialConf = {};
    }
    
    if (!myCelestialConf.userData) {
        console.log("Adatbázis inicializálása...");
        myCelestialConf.userData = {
            canvas: { 
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
            smartpoints: [],
            uiState: {
                activePhotoId: null, 
                selectedElementId: 'main-map',
                currentTextContext: 'map',
                zoneFlags: { topCommon: false, bottomCommon: false },
                activeAddMode: 'photo',
                photoURL: null,
                showSmartpoints: true
            }
        };
        initDefaultTexts();
    }
}
//...
// (The full merged and corrected code will be written here)
// This will be a large block of code.
