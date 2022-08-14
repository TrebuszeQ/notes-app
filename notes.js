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

    const duplicateNotes = notes.filter((indice) => {
        return indice.title === title;
    });
    if( duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body,
        }); 
    } else {
        console.warn(chalk.red('Note title taken!'));  
    }

    
    saveNotes(notes);
}


const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(file, dataJson);
}

const removeNote = (title) => {
    const notes = loadNotes();

    const toRemove = notes.findIndex( (indice) => {
        return indice.title === title;
    });
    
    if(toRemove != -1) {
        notes.splice(toRemove);
        saveNotes(notes);
        console.log('Note removed.');
        return;
            
    } else {
        console.warn(chalk.red(`Note doesn't exist.`));
        return;
    }
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

module.exports = {
    // getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}