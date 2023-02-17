function saveNoteContentToLocalStorage(note) {
    const stored = JSON.parse(localStorage.getItem('note'));

    if (stored && note) {
        note.value ? stored.content = note.value : stored.content = '';
        localStorage.setItem('note', JSON.stringify(stored));
    }
}

function setNoteValueFromLocalStorage(note) {
    const stored = JSON.parse(localStorage.getItem('note'));

    if (stored && stored.content) {
        note.value = stored.content;
    }
}

function showActiveNoteSettings(note) {
    const stored = JSON.parse(localStorage.getItem('note')),
        html = document.querySelector('html'),
        themes = document.querySelectorAll('[data-theme]');

    if (stored) {
        stored.content ? note.value = stored.content : note.value = '';
        stored.theme ? html.classList.add(`theme--${stored.theme}`) : '';

        // set theme state on btn
        if (themes) {
            themes.forEach((theme) => {
                theme.dataset.theme === stored.theme
                    ? theme.classList.add('active')
                    : theme.classList.remove('active')
            });
        }
    }
}

/*
** Save note content to local storage an display it
*/
export default function () {
    const note = document.querySelector('[data-note-input]'),
        clearNote = document.querySelector('[data-clear-note]');

    if (!localStorage.getItem('note')) {
        localStorage.setItem('note', JSON.stringify({ content: '', theme: '' }));
    } else {
        // keep input values on refresh
        showActiveNoteSettings(note);
    }

    // save input value to local storage
    note.addEventListener('change', (event) => {
        saveNoteContentToLocalStorage(event.currentTarget);
    });


    clearNote.addEventListener('click', () => {
        note.value = '';
        saveNoteContentToLocalStorage(note);
    });


    // handle synchronization across multiple browsers
    window.addEventListener('storage', () => {
        setNoteValueFromLocalStorage(note);
    });
}
