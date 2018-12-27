const yargs = require('yargs');
const notes = require('./notes');

const options = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};

const argv = yargs
  .command('add', 'Add a new note', options)
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: options.title
  })
  .command('delete', 'Delete a note', {
    title: options.title
  })
  .help()
  .argv;

const command = argv._[0];

if (command === 'add') {
  notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
  notes.listNotes();
} else if (command === 'read') {
  notes.readNote(argv.title);
} else if (command === 'delete') {
  notes.deleteNote(argv.title);
} else {
  console.log('command not recognised');
}