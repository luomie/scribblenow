function addCurrentThemeToLocalStorage(stored, themeName) {
    stored.theme = themeName;
    localStorage.setItem('note', JSON.stringify(stored));
}

function updateHtmlThemeClass(themeName) {
    const html = document.querySelector('html');

    if (html.className.includes('[^=theme--]')) {
        html.className = html.className.replace(/^theme--[^\s]+/g, `theme--${themeName}`)
    } else {
        html.className = `theme--${themeName}`;
    }
}

function updateActiveStateOfCurrentThemeButton(inputs, stored) {
    inputs.forEach((input) => {
        input.dataset.theme === stored.theme
            ? input.classList.add('active')
            : input.classList.remove('active');
    });
}

export default function () {
    const inputs = document.querySelectorAll('[data-theme]');

    inputs.forEach((input) => {
        input.addEventListener('click', (event) => {
            let stored = JSON.parse(localStorage.getItem('note')),
                currentTheme = event.currentTarget.dataset.theme;

            addCurrentThemeToLocalStorage(stored, currentTheme)
            updateHtmlThemeClass(currentTheme);
            updateActiveStateOfCurrentThemeButton(inputs, stored);
        });
    });

    // handle synchronization across multiple browsers
    window.addEventListener('storage', () => {
        let stored = JSON.parse(localStorage.getItem('note'));

        updateHtmlThemeClass(stored.theme);
        updateActiveStateOfCurrentThemeButton(inputs, stored);
    });
}