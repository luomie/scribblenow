import { LocalStorage } from "./LocalStorage.mjs";

class ThemeSwitcher extends LocalStorage {
    constructor(note) {
        super();

        this.localStorageKey = super.getLocalStorageKey();

        this.note = note;
        this.localStorageItemKey = 'theme';
        this.themes = document.querySelectorAll('[data-theme]');
        this.classes = {
            buttonActive: 'active'
        };
        this.html = document.querySelector('html');

        this.themes.forEach((button) => {
            button.addEventListener('click', (event) => {
                super.setLocalStorageItemValueByKey(this.localStorageItemKey, event.currentTarget.dataset.theme);
                this.setThemeClass();
                this.setThemeButtonStateActiveForCurrentTheme();
            })
        });

    }

    getCurrentThemeInLocalStorage(key) {
        return super.getLocalStorageItemValue(key);
    }

    setThemeClass() {
        this.html.className = this.html.className.replace(/^theme--[^\s]+/g, `theme--${this.getCurrentThemeInLocalStorage(this.localStorageItemKey)}`);
    }

    setThemeButtonStateActiveForCurrentTheme() {
        this.setThemeButtonStateInactive();
        this.setThemeButtonStateActive();
    }

    setThemeButtonStateActive() {
        const button = document.querySelector(`[data-theme=${this.getCurrentThemeInLocalStorage(this.localStorageItemKey)}]`);

        button ? button.classList.add(this.classes.buttonActive) : false;
    }

    setThemeButtonStateInactive() {
        const button = document.querySelector('.active[data-theme]');

        button ? button.classList.remove(this.classes.buttonActive) : false;
    }
}

export { ThemeSwitcher }