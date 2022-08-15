const validator = require('validator'),
chalk = require('chalk'),
yargs = require('yargs'),
notesJS = require('./notes.js');
const { argv } = require('yargs');

// Customize yargs version
yargs.version('1.1.0');

// Add, remove, read, list

/// add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        noteTitle: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        noteBody: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notesJS.addNote(argv.noteTitle, argv.noteBody);
    }
});

/// remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        noteTitle: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function(argv) {
        notesJS.removeNote2(argv.noteTitle);
    }
})

/// list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        console.log('Listing out the notes.');
        notesJS.listNotes();
    }
})

/// read command
yargs.command({
    command: 'read',
    describe: 'Read notes',
    builder: {
        noteTitle: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function(argv) {
        console.log('Reading the notes.');
        notesJS.readNote(argv.noteTitle);
    }
})

// for(let i = 0; i < process.argv.length; i++)
// {
//     console.log(`process.argv[${i}]: ${chalk.blue.bold(process.argv[i])}. \n`);
// }


yargs.parse();

// console.log(`process.argv: ${chalk.green.bold(yargs.argv)}. \n`);

// if(command === 'add')
// {
//     console.log('Adding note.');
// }
// else if(command === 'remove')
// {
//     console.log('Removing note.');
// }
// else
// {
//     console.log('Unknown action.');
// }