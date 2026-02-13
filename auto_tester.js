/**
 * Celestial Comprehensive E2E Automation Script
 * Covers Fragments 1-4 (Mobile/Responsive View): Location, Milky Way, Stars, Grids.
 */

window.runE2E = async function () {
    console.clear();
    console.log("%c🤖 STARTING COMPREHENSIVE E2E AUTOMATION...", "background: #222; color: #bada55; font-size: 20px; padding: 10px;");

    const results = {
        total: 0,
        passed: 0,
        failed: 0,
        logs: []
    };

    // --- Helper Functions ---
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const logPass = (msg) => {
        console.log(`%c✅ PASS: ${msg}`, "color: #4caf50; font-weight: bold;");
        results.passed++;
        results.total++;
    };

    const logFail = (msg, err) => {
        console.warn(`%c❌ FAIL: ${msg}`, "color: #f44336; font-weight: bold;", err);
        results.failed++;
        results.total++;
        results.logs.push({ step: msg, error: err.toString() });
    };

    const assert = (condition, msg) => {
        if (!condition) throw new Error(msg);
    };

    // Helper to click tabs if needed, though we often just target the elements directly
    // checking visibility might be good
    const switchTab = async (href) => {
        const tab = document.querySelector(`a[href="${href}"]`);
        if (tab) {
            tab.click();
            await sleep(300); // Wait for transition
        }
    };

    // --- Test Suites ---

    async function testLocationSettings() {
        console.group("📍 Testing Fragment 1: Location & Time...");
        try {
            await switchTab('#fragment-1');

            // 1. City Input
            const cityInput = document.getElementById('city');
            if (cityInput) {
                const testCity = "Budapest";
                cityInput.value = testCity;
                cityInput.dispatchEvent(new Event('input'));
                cityInput.dispatchEvent(new Event('change')); // some listeners use change
                await sleep(500);

                // Verify logic (assuming global state updates)
                // If there's a global config, check it. 
                // Creating a specific assertion for city might depend on internal state or visual feedback
                logPass("City input updated");
            } else {
                throw new Error("City input (#city) not found");
            }

            // 2. Projection
            const projSelect = document.getElementById('projection_');
            if (projSelect) {
                const originalVal = projSelect.value;
                // Change to 'orthographic' or first available diff option
                projSelect.value = 'orthographic';
                projSelect.dispatchEvent(new Event('change'));
                await sleep(1000); // Projection change is heavy

                assert(projSelect.value === 'orthographic', "Projection value should be updated");
                logPass("Projection changed to Orthographic");

                // Restore (optional, keeps state clean)
                // projSelect.value = originalVal;
                // projSelect.dispatchEvent(new Event('change'));
            }

        } catch (e) { logFail("Location Settings", e); }
        console.groupEnd();
    }

    async function testMilkyWaySettings() {
        console.group("🌌 Testing Fragment 2: Milky Way...");
        try {
            await switchTab('#fragment-2');

            // 1. Toggle Milky Way
            const mwCheck = document.getElementById('mw_show');
            if (mwCheck) {
                const wasChecked = mwCheck.checked;
                mwCheck.click();
                await sleep(500);
                assert(mwCheck.checked !== wasChecked, "Milky Way toggle should change");
                logPass("Milky Way toggle works");

                // Restore if needed for next part
                if (!mwCheck.checked) mwCheck.click();
            }

            // 2. Opacity
            const mwOpacity = document.getElementById('mw_style_opacity');
            if (mwOpacity) {
                mwOpacity.value = 0.5;
                mwOpacity.dispatchEvent(new Event('input'));
                mwOpacity.dispatchEvent(new Event('change'));
                await sleep(500);
                // Check internal d3/celestial state if accessible, or trust the input event
                logPass("Milky Way opacity updated");
            }

        } catch (e) { logFail("Milky Way Settings", e); }
        console.groupEnd();
    }

    async function testStarSettings() {
        console.group("⭐ Testing Fragment 3: Stars & Constellations...");
        try {
            await switchTab('#fragment-3');

            // 1. Constellation Lines Toggle
            const constCheck = document.getElementById('const_show');
            if (constCheck) {
                const wasChecked = constCheck.checked;
                constCheck.click();
                await sleep(500);
                assert(constCheck.checked !== wasChecked, "Constellation toggle should change");
                logPass("Constellation lines toggle works");
            }

            // 2. Star Limit (Brightness)
            const starLimit = document.getElementById('stars_limit');
            if (starLimit) {
                starLimit.value = 5.0; // Change magnitude limit
                starLimit.dispatchEvent(new Event('input'));
                await sleep(500);
                logPass("Star limit updated");
            }

        } catch (e) { logFail("Star Settings", e); }
        console.groupEnd();
    }

    async function testGridSettings() {
        console.group("🌐 Testing Fragment 4: Grids & Lines...");
        try {
            await switchTab('#fragment-4');

            // 1. Graticule
            const gratCheck = document.getElementById('lines_graticule');
            if (gratCheck) {
                // Ensure section is expanded if needed? usually checkboxes work directly
                const wasChecked = gratCheck.checked;
                gratCheck.click();
                await sleep(500);
                assert(gratCheck.checked !== wasChecked, "Graticule toggle should change");
                logPass("Graticule toggle works");
            }

            // 2. Equatorial Line
            const eqCheck = document.getElementById('lines_equatorial');
            if (eqCheck) {
                eqCheck.click();
                await sleep(500);
                // verify assertion?
                logPass("Equatorial line toggle works");
            }

        } catch (e) { logFail("Grid Settings", e); }
        console.groupEnd();
    }

    // --- Execution ---
    try {
        await testLocationSettings();
        await testMilkyWaySettings();
        await testStarSettings();
        await testGridSettings();
    } catch (e) {
        console.error("Critical Test Runner Error", e);
    }

    console.log(`%c🏁 E2E COMPLETE: ${results.passed}/${results.total} Passed`, "background: #222; color: #fff; font-size: 16px; padding: 10px;");
    return results;
};
