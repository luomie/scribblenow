class LocalStorage {
    constructor(localStorageKey = 'note') {
        this.localStorageKey = localStorageKey;
    }

    getLocalStorageKey() {
        return this.localStorageKey;
    }

    getLocalStorageItem() {
        const storage = localStorage.getItem(this.getLocalStorageKey());

        return storage ? JSON.parse(storage) : null;
    }

    getLocalStorageItemValue(key) {
        const storage = this.getLocalStorageItem();

        return storage[key];
    }

    setLocalStorageItemValueByKey(key, value) {
        let storage = this.getLocalStorageItem();

        storage[key] = value;

        localStorage.setItem('note', JSON.stringify(storage));
    }
}

export { LocalStorage }