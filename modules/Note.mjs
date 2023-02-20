import { ThemeSwitcher } from "./ThemeSwitcher.mjs";

class Note {
    constructor(input, localStorageItem = 'note') {
        this.input = input;
        this.localStorageItem = localStorageItem;
        this.clearNoteInput = document.querySelector('[data-clear-note]');
        this.themeSwitcher = new ThemeSwitcher(input, localStorageItem);

        this.loadNote();
        this.loadThemeSwitcher();

        this.input.addEventListener('input', (event) => {
            this.setLocalStorageInput(event.currentTarget.value);
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
        this.themeSwitcher.setThemeButtonStateActiveForCurrentTheme();
    }

    createLocalStorageItem() {
        if (!this.getLocalStorageItem()) {
            localStorage.setItem(this.localStorageItem, JSON.stringify({ text: '', theme: '' }));
            return true;
        } else {
            return false;
        }
    }

    clearNote() {
        this.setLocalStorageInput('');
        this.setInput();
    }

    syncAcrossBrowser() {
        window.addEventListener('storage', () => {
            this.setInput();
            this.loadThemeSwitcher();
        });
    }

    getLocalStorageItem() {
        const storage = localStorage.getItem(this.localStorageItem);

        return storage ? JSON.parse(storage) : false;
    }

    setInput() {
        this.input.value = this.getLocalStorageItem().text;
    }

    setLocalStorageInput(text) {
        let storage = this.getLocalStorageItem();

        storage.text = text;
        localStorage.setItem(this.localStorageItem, JSON.stringify(storage));
    }
}

export { Note }