"use strict"
const { title } = require('process');

const fs = require('fs'),
chalk = require('chalk'),
file = 'notes.json';

const addNote = (title, body) => {
    const notes = loadNotes();
    let validator;

    title = titling(notes, title);
    notes.push({
        title: title,
        body: body,
    }); 
    saveNotes(notes);
}


const titling = (notes, title) => {
    const print = (x) => {
        console.log(x);
    }

    print('0. titling');
    let titleString = '';
    let validator, counter;

    //convert '_' to '-'
    const removeIllegal = () => {
        print('1. removeIllegal')
        if(title.includes('_')) {
            console.log(chalk.yellow.bold('1'));
            console.error(chalk.red.bold(`Character '_' is illegal, it was replaced with em dash '-'`));
            title = title.replaceAll('_', '-');
            print(`1. ${title}`);
        }    
    }


    // isUnique
    const isUnique = () => {
        print('2. isUnique');
        const x = notes.find((indice) => {
            return indice.title === title;
        });
        return x;
    }

    // isAltered
    const isAltered = () => {
        print('3. isAltered');
        for(let i = 0; i < title.length; i++) {
            let char = title[i];
            if(char === '_') {
                return true;
            }
            else {
                titleString = titleString + char;
            }
        }
        return false;
    };

    //  changeTitle
    const changeTitleAltered = () => {
        print('4. changeTitleAltered');
        let sum = '';
        for(let i = titleString.length - 1; i < title.length; i++) {
            sum = sum + title[i];
        }
        sum = Number(sum);
        sum++;
        sum = '00' + String(sum);
        print(`4. ${title = titleString + sum}`)
        return title = titleString + sum;
    }  

    const changeTitleUnaltered = () => {
        print('5. changeTitleUnaltered');
        counter = '001';
        print(`5. ${title}`)
        return title = title + '_' + counter;
    }

    // newTitle check

    // main
    const newTitle = () => {
        removeIllegal();
        if(isUnique() != undefined) {
            if(isAltered() === true) {
                title = changeTitleAltered();
            } else if (isAltered() === false) {
                title = changeTitleUnaltered();
            }
        }
        return title;
    };

    do {
        print(newTitle());
        newTitle();
        validator = notes.find(indice => {
            return indice.title === title;
        });
        print(validator);
    } while(validator != undefined)

    return newTitle();
} 



// const newTitle = (notes, title) => {
//     let stringSum, tempTitle, sum = 0;
//     const isUnique = notes.find(indice => {return indice.title === title});
//     do{
//         if(isUnique != undefined && title.includes('_') === true) {
//             stringSum = 0,
//             tempTitle = 0;
//             console.log(chalk.yellow.bold('2'));
//             for(let i = 0; i < title.length; i++) {
//                 tempTitle = tempTitle + title[i];
//                 if(title[i] === '_') {
//                     for(let j = i + 1; j === title.length - 1; j++) {
//                         if(j != undefined) {
//                             stringSum = title[j];
//                             console.log(chalk.magenta(stringSum));
//                         }
//                     };  
//                     sum = sum + Number(stringSum);
//                     sum++;    
//                 }         
//             }
//             title = tempTitle + stringSum;
//             console.log(chalk.bgMagenta(title));
//             console.log(chalk.green(isUnique));
//         }
//         else if(isUnique != undefined) {
//             console.log(chalk.yellow.bold('3'));
//             title = title + '_' + sum;
//             sum++;
//         }
//     } while (isUnique != undefined);
//     return title;
// }

const saveNotes = function(notes) {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(file, dataJson);
}

const loadNotes = function() {
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
}