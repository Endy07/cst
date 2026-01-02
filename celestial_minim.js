// Initialize Google Maps Places Autocomplete
const cityInput = document.getElementById('city');
const autocomplete = new google.maps.places.Autocomplete(cityInput, {
    types: ['(cities)'],
    componentRestrictions: { country: 'hu' },
    fields: ['geometry', 'name']
});

autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
        console.log('No details available for input: ', place.name);
        return;
    }

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    celestial.setOption('geopos', [lat, lng]);
    celestial.refresh();
});

// Initialize Celestial.js
const celestialConfig = {
    width: 0,
    projection: "orthographic",
    geopos: [47.4979, 19.0402], // Budapest
    container: "celestial-map",
    datapath: "https://ofrohn.github.io/data/",
    stars: {
        show: true,
        limit: 6,
        colors: true,
        style: {
            fill: "#ffffff",
            opacity: 1
        },
        designation: false,
        propername: false
    },
    lines: {
        graticule: { show: false },
        equatorial: { show: false },
        ecliptic: { show: false },
        galactic: { show: false },
        supergalactic: { show: false }
    },
    constellations: {
        names: false,
        lines: true,
        bounds: false
    },
    dsos: {
        show: false,
        names: false
    },
    interactive: true,
    form: false
};

const celestial = d3.celestial(celestialConfig);

// Initialize Celestial.js
celestial.create();

// Update settings when form controls change
document.getElementById('projection').addEventListener('change', (e) => {
    celestial.setOption('projection', e.target.value);
    celestial.refresh();
});
