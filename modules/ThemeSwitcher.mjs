import { LocalStorage } from "./LocalStorage.mjs";

class ThemeSwitcher extends LocalStorage {
    constructor(note) {
        super();

        this.localStorageKey = super.getLocalStorageKey();

        this.note = note;
        this.localStorageItemKey = 'theme';
        this.themes = document.querySelectorAll('[data-theme]');
        this.classes = {
            buttonActive: 'active',
            themeContainerActive: 'header__content--active',
        };
        this.html = document.querySelector('html');

        this.themes.forEach((button) => {
            button.addEventListener('click', (event) => {
                super.setLocalStorageItemValueByKey(this.localStorageItemKey, event.currentTarget.dataset.theme);
                this.setThemeClass();
                this.setThemeButtonStateActiveForCurrentTheme();
                this.setMetaThemeColor();
            })
        });

        const themeContainer = document.querySelector('[data-theme-container]'),
            toggleThemeContainer = document.querySelector('[data-toggle-theme-container]');

        toggleThemeContainer.addEventListener('click', () => {
            if (themeContainer.classList.contains(this.classes.themeContainerActive)) {
                themeContainer.classList.remove(this.classes.themeContainerActive)
            } else {
                themeContainer.classList.add(this.classes.themeContainerActive);
            }
        });

    }


    getCurrentThemeInLocalStorage(key) {
        return super.getLocalStorageItemValue(key);
    }

    setThemeClass() {
        this.html.className = this.html.className.replace(/^theme--[^\s]+/g, `theme--${this.getCurrentThemeInLocalStorage(this.localStorageItemKey)}`);
    }

    setMetaThemeColor() {
        document.querySelector('meta[name="theme-color"]')
            .setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--background'));
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