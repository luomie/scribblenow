import { Note } from "./modules/Note.mjs";

const noteInput = document.querySelector('[data-note-input]');

if (noteInput) {
    const app = new Note(noteInput);
}