"use strict"
const { title } = require('process');

const fs = require('fs'),
chalk = require('chalk'),
file = 'notes.json';

// const getNotes = () => {
//     return 'Yout notes...'
// }

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find( (indice) => indice.title === title);

    if(duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body,
        }); 
        console.log(chalk.green('Note added.'))
    } else {
        console.warn(chalk.red('Note title taken!'));  
    }

    
    saveNotes(notes);
}


const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(file, dataJson);
}

// const removeNote = (title) => {
//     const notes = loadNotes();

//     const toRemove = notes.findIndex( (indice) => {
//         return indice.title === title;
//     });
    
//     if(toRemove != -1) {
//         notes.splice(toRemove);
//         saveNotes(notes);
//         console.log('Note removed.');
//         return;
            
//     } else {
//         console.warn(chalk.red(`Note doesn't exist.`));
//         return;
//     }
// }

const removeNote2 = (title) => {
    const notes = loadNotes();

    const filtered = notes.filter( (indice) => indice.title != title );
    saveNotes(filtered);
    if(notes.length === filtered.length) {
        console.log(chalk.red('Notes remain unchanged.'));
    } else {
        console.log(chalk.green('Note removed.'));
    };
    return;
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(error) {
        console.log(chalk.red.bold(error));
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue('Your notes:'));
    
    notes.forEach(element => console.log(element.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((element) => element.title === title);

    if(note != undefined) {
        console.log(chalk.blue(`Note "${note.title}":\n${note.body}`));
    } else {
        console.log(chalk.red(`Note title doesn't exist.`));
    }
}
 
module.exports = {
    // getNotes: getNotes,
    addNote: addNote,
    // removeNote: removeNote,
    removeNote2: removeNote2,
    listNotes: listNotes,
    readNote: readNote,
}