const fs = require('fs');

if (!fs.existsSync("notes.json")) {
  fs.writeFileSync("notes.json", "{}");
}

const readJSON = (path) => {
  try {
    let notesStr = fs.readFileSync(path);
    return JSON.parse(notesStr);
  } catch (e) {
    console.log(e);
    return {};
  }
};

const writeJSON = (path, obj) => {
  str = JSON.stringify(obj);
  fs.writeFileSync(path, str);
};

const addNote = (title, body) => {

  let notes = readJSON('notes.json');
  if (notes[title]) {
    console.log('note already exists');
    return;
  }
  notes[title] = body;
  writeJSON('notes.json', notes);
  console.log(`added note ${title}: ${body}`); 
};

const listNotes = () => {

  let notes = readJSON('notes.json');
  console.log('notes:');
  Object.keys(notes).forEach((key) => console.log(key));
};

const readNote = (title) => {

  let notes = readJSON('notes.json');
  debugger;
  if (!notes[title]) {
    console.log('note not found');
    return;
  }
  console.log(`${title}: ${notes[title]}`); 
};

const deleteNote = (title) => {

  let notes = readJSON('notes.json');
  if (!notes[title]) {
    console.log('note not found');
    return;
  }
  delete notes[title];
  writeJSON('notes.json', notes);
  console.log(`deleted note ${title}`); 
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  deleteNote
};