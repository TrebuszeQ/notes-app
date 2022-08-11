const validator = require('validator'),
chalk = require('chalk'),
yargs = require('yargs'),
notes = require('./notes.js');

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
        console.log(`argv test\n${chalk.red.bold(argv.noteTitle)};\n${chalk.red.bold(argv.noteBody)};\n`);
        notes.addNote(argv.noteTitle, argv.noteBody);
    }
})

/// remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log('Removing the note.');
    }
})

/// list command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function() {
        console.log('Listing out the notes.');
    }
})

/// read command
yargs.command({
    command: 'read',
    describe: 'Read notes',
    handler: function() {
        console.log('Reading the notes.');
    }
})

for(let i = 0; i < process.argv.length; i++)
{
    console.log(`process.argv[${i}]: ${chalk.blue.bold(process.argv[i])}. \n`);
}


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