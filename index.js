const notesElement = document.querySelector(".notes");
const saveElement = document.querySelector(".save");
const inputElement = document.getElementById("header");
const textareaElement = document.getElementById("memory");
const newNoteElement = document.querySelector(".new-note");
const deleteElement = document.querySelector(".delete");

function displayNotes() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteB.timestamp - noteA.timestamp);

  notesElement.replaceChildren();

  sortedNotes.forEach((note) => {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.dataset.id = note.id;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("title");
    titleElement.textContent = note.header;

    const previewElement = document.createElement("div");
    previewElement.classList.add("preview");
    previewElement.textContent = note.memory;

    const timestampElement = document.createElement("div");
    timestampElement.classList.add("timestamp");
    timestampElement.textContent = new Date(note.timestamp).toLocaleString("de-DE");

    noteElement.append(titleElement, previewElement, timestampElement);

    notesElement.append(noteElement);
  });
}

displayNotes();
applyEvent();

saveElement.addEventListener("click", function () {
  // oder zeile ersetzen durch function clickSaveButtun() {.....}
  const header = inputElement.value;
  const memory = textareaElement.value;

  if (!header || !memory) {
    alert("Bitte Überschrift und Inhalt eingeben.");
    return; //ganz wichtig, damit hier Funktion wieder endet!
  }

  let selectId = undefined;

  const currentlySelectedNoteElement = document.querySelector(".selected-note");

  if (currentlySelectedNoteElement) {
    selectId = currentlySelectedNoteElement.getAttribute("data-id");
  }

  saveNotes(header, memory, Number(getSelectId()));

  displayNotes();
  applyEvent();
});

function deleteNoteButton() {
  const selectId = getSelectId();

  if (!selectId) return;

  deleteNote(selectId);

  inputElement.value = "";
  textareaElement.value = "";

  displayNotes();
  applyEvent();
}

newNoteElement.addEventListener("click", newNote);
deleteElement.addEventListener("click", deleteNoteButton);

function applyEvent() {
  const sidebarNotesElement = document.querySelectorAll(".note");

  sidebarNotesElement.forEach((note) => {
    note.addEventListener("click", function () {
      selectNote(note.getAttribute("data-id"));
    });
  });
}

function removeAllNotes() {
  const noteElement = document.querySelectorAll(".note");
  noteElement.forEach((note) => {
    note.classList.remove("selected-note");
  });
}
function selectNote(id) {
  const selectedNoteElement = document.querySelector(`.note[data-id="${id}"]`);

  if (selectedNoteElement.classList.contains("selected-note")) return;

  selectedNoteElement.classList.add("selected-note");

  const notes = getNotes();
  // Datenobjekt: selectedNote und oben haben wir nur das Element der Seite: selectedNoteElement -> daher können wir das hier fast gleich nennen
  const selectedNote = notes.find((note) => note.id === Number(id));

  if (!selectedNote) return;

  inputElement.value = selectedNote.header;
  textareaElement.value = selectedNote.memory;
}

function newNote() {
  inputElement.value = "";
  textareaElement.value = "";

  removeAllNotes();
}

function getSelectId() {
  let selectId = undefined;

  const currentlySelectedNoteElement = document.querySelector(".selected-note");

  if (currentlySelectedNoteElement) {
    selectId = currentlySelectedNoteElement.getAttribute("data-id");
  }

  return selectId;
}
