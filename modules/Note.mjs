import { LocalStorage } from "./LocalStorage.mjs";
import { ThemeSwitcher } from "./ThemeSwitcher.mjs";

class Note extends LocalStorage {
    constructor(input) {
        super();

        this.localStorageKey = super.getLocalStorageKey();

        this.input = input;
        this.localStorageItemKey = 'text';
        this.clearNoteInput = document.querySelector('[data-clear-note]');
        this.themeSwitcher = new ThemeSwitcher(input);

        this.loadNote();
        this.loadThemeSwitcher();

        this.input.addEventListener('input', (event) => {
            super.setLocalStorageItemValueByKey(this.localStorageItemKey, event.currentTarget.value);
        });

        this.clearNoteInput.addEventListener('click', () => {
            this.clearNote();
        });

    }

    loadNote() {
        this.createLocalStorageItem();
        this.setInput();
        this.syncAcrossBrowser();
    }

    loadThemeSwitcher() {
        this.themeSwitcher.setThemeClass();
        this.themeSwitcher.setMetaThemeColor();
        this.themeSwitcher.setThemeButtonStateActiveForCurrentTheme();
    }

    createLocalStorageItem() {
        if (!super.getLocalStorageItem()) {
            localStorage.setItem(this.localStorageKey, JSON.stringify({ text: '', theme: 'theme--nightowl' }));
            return true;
        } else {
            return false;
        }
    }

    clearNote() {
        super.setLocalStorageItemValueByKey(this.localStorageItemKey, '');
        this.setInput();
    }

    syncAcrossBrowser() {
        window.addEventListener('storage', () => {
            this.setInput();
            this.loadThemeSwitcher();
        });
    }

    setInput() {
        this.input.value = super.getLocalStorageItem().text;
    }
}

export { Note }