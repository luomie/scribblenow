class ThemeSwitcher {
    constructor(note, localStorageItem) {
        this.note = note;
        this.localStorageItem = localStorageItem;
        this.themes = document.querySelectorAll('[data-theme]');
        this.classes = {
            buttonActive: 'active'
        };
        this.activeTheme = 'default';
        this.html = document.querySelector('html');

        this.themes.forEach((button) => {
            button.addEventListener('click', (event) => {
                const currentButtonTheme = event.currentTarget.dataset.theme;

                this.activeTheme = currentButtonTheme;

                this.setCurrentThemeToLocalStorage();
                this.setThemeClass();
                this.setThemeButtonStateActiveForCurrentTheme();
            })
        });

    }

    getLocalStorageItemParsed() {
        return localStorage.getItem(this.localStorageItem) ? JSON.parse(localStorage.getItem(this.localStorageItem)) : false;
    }

    getCurrentThemeInLocalStorage() {
        return this.getLocalStorageItemParsed().theme;
    }

    setThemeClass() {
        this.html.className = this.html.className.replace(/^theme--[^\s]+/g, `theme--${this.getCurrentThemeInLocalStorage()}`);
    }

    setThemeButtonStateActiveForCurrentTheme() {
        this.setThemeButtonStateInactive();
        this.setThemeButtonStateActive();
    }

    setThemeButtonStateActive() {
        const button = document.querySelector(`[data-theme=${this.getCurrentThemeInLocalStorage()}]`);

        button ? button.classList.add(this.classes.buttonActive) : false;
    }

    setThemeButtonStateInactive() {
        const button = document.querySelector('.active[data-theme]');

        button ? button.classList.remove(this.classes.buttonActive) : false;
    }

    setCurrentThemeToLocalStorage() {
        let storage = this.getLocalStorageItemParsed();

        storage.theme = this.activeTheme;
        localStorage.setItem(this.localStorageItem, JSON.stringify(storage));
    }

}

export { ThemeSwitcher }