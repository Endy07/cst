/**
 * Custom Font Selector Logic
 * Replaces standard <select> with a custom dropdown to support font previews.
 */

function initCustomFontSelector(selectId, inputId) {
    const originalSelect = document.getElementById(selectId);
    const inputElement = document.getElementById(inputId); // The text input source (e.g., #input-word)

    if (!originalSelect || !inputElement) {
        console.warn(`Custom Font Selector: Elements not found (${selectId}, ${inputId})`);
        return;
    }

    // Hide original select
    originalSelect.style.display = 'none';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';
    originalSelect.parentNode.insertBefore(wrapper, originalSelect);
    wrapper.appendChild(originalSelect); // Move original select inside wrapper (optional, helps with positioning)

    // Create custom trigger (the "box" you click)
    const trigger = document.createElement('div');
    trigger.className = 'custom-select-trigger';

    // Safety check: if no option is selected, select the first one
    if (originalSelect.selectedIndex === -1 && originalSelect.options.length > 0) {
        originalSelect.selectedIndex = 0;
    }

    const initialOption = originalSelect.options[originalSelect.selectedIndex];

    // Initial text should render in the selected font
    if (initialOption) {
        trigger.innerHTML = `<span>${inputElement.value || 'Sample'}</span>`;
        trigger.style.fontFamily = initialOption.value;
    } else {
        trigger.innerHTML = `<span>Válassz...</span>`;
    }

    wrapper.appendChild(trigger);

    // Create options container
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'custom-options';
    wrapper.appendChild(optionsContainer);

    // Populate options
    Array.from(originalSelect.options).forEach(option => {
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.dataset.value = option.value;
        customOption.style.fontFamily = option.value;
        customOption.textContent = inputElement.value || 'Sample'; // Display the current word

        if (option.selected) {
            customOption.classList.add('selected');
        }

        // Click handler for option
        customOption.addEventListener('click', function () {
            // Update UI
            trigger.innerHTML = `<span>${this.textContent}</span>`;
            trigger.style.fontFamily = this.style.fontFamily;

            optionsContainer.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            wrapper.classList.remove('open');

            // Update original select value
            originalSelect.value = this.dataset.value;

            // Trigger change event on original select so the app knows to redraw/update
            const event = new Event('change', { bubbles: true });
            originalSelect.dispatchEvent(event);
        });

        optionsContainer.appendChild(customOption);
    });

    // Toggle dropdown
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        // Close all other instances first if multiple exist
        document.querySelectorAll('.custom-select-wrapper.open').forEach(el => {
            if (el !== wrapper) el.classList.remove('open');
        });
        wrapper.classList.toggle('open');
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
        }
    });

    // Sync input text with dropdown options
    const updateOptionsText = () => {
        const text = inputElement.value || 'Sample';
        // Update trigger text
        trigger.querySelector('span').textContent = text;

        // Update all options text
        const options = optionsContainer.querySelectorAll('.custom-option');
        options.forEach(opt => {
            opt.textContent = text;
        });
    };

    // Listen for input changes
    inputElement.addEventListener('input', updateOptionsText);
    // Also listen for potential external updates to the input
    inputElement.addEventListener('change', updateOptionsText);
}
