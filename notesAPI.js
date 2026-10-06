const LOCAL_STORAGE_KEY = "note-app";

// const MOCK_NOTES = [
//   // Array mit beispieldaten erstellen damit wir erst einmal die Optik der ausgegeben Zeilen der Notiz sehen können
//   {
//     id: 1,
//     title: "Notiz 1",
//     preview: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
//     timestamp: new Date().getTime(),
//   },
//   {
//     id: 2,
//     title: "Notiz 2",
//     preview: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
//     timestamp: new Date().getTime(),
//   },
//   {
//     id: 3,
//     title: "Notiz 3",
//     preview: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
//     timestamp: new Date().getTime(),
//   },
// ];

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []; // hier wird entweder zurückgegeben, was im Localstorage liegt ODER ein leeres Array (damit keine Fehlermeldung in der Console ausgegeben wird)
}

function saveNotes(header, memory, id = undefined) {
  const notes = getNotes();

  let newId = 1;

  while (notes.some((note) => note.id === newId)) {
    newId++;
  }

  if (!id) {
    notes.push({
      header,
      memory,
      id: newId,
      timestamp: new Date().getTime(),
    });
  } else {
    const indexNoteId = notes.findIndex((note) => note.id === id);

    if (indexNoteId > -1) {
      notes[indexNoteId] = {
        header,
        memory,
        id,
        timestamp: new Date().getTime(),
      };
    }
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function deleteNote(id) {
  if (!id) return;

  const notes = getNotes();

  const filteredNotes = notes.filter((note) => note.id !== Number(id));

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}
