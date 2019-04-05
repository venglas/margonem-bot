const $textarea = document.querySelector('#notes-textarea');
const $button_save_notes = document.querySelector('#button-save-notes');
const $notes_list = document.querySelector('#notes-list');

//
let wholeNotes = [];
let checkNotes;
//

function init_notes(){
    checkIfNotesWasCreated();
    loadNotes();
    showNotes();
    deleteNote();
}
init_notes();

function checkIfNotesWasCreated(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        if (!bot.notes){
            chrome.storage.sync.set({'notes': wholeNotes});
        } else {
            bot.notes.forEach(el => {
                if (el.nickname === bot.nickname){
                    checkNotes = true;
                }
            });
        }

        setTimeout(() => {
            if (checkNotes === undefined && bot.notes) {
                bot.notes.push({nickname: bot.nickname, notes: []});
                chrome.storage.sync.set({'notes': bot.notes});
            }
        }, 200);
    });
}

function loadNotes(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        if(bot.notes){
            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    wholeNotes = el;
                }
            });
        }
    });
}

function showNotes(){
    chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
        let whichNotes;

        if (bot.notes) {
            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname) {
                    whichNotes = i;
                }
            });

            setTimeout(() => {
                console.log(bot.notes[whichNotes])
                bot.notes[whichNotes].notes.forEach( (el, i) => {
                    createNote(el, i); 
                });
            }, 100);
        }
    });
}

function createNote(text, id){
    const note = document.createElement('p');
    note.classList.add('single-note');
    note.id = id;
    note.innerHTML = text;
    
    $notes_list.appendChild(note);

    const deleteNote = document.createElement('img');
    deleteNote.src = '../img/delete-button.png';
    deleteNote.classList.add('delete-note');
    note.appendChild(deleteNote);
}

function deleteNote(){
    setTimeout(() => {
        document.querySelectorAll('.delete-note').forEach(el => {
            el.addEventListener('click', (e) => {
                e.target.parentNode.classList.add('single-note-fade-out');
                // const noteHeight = e.target.parentNode.offsetHeight;
                setTimeout(() => {
                    e.target.parentNode.style.display = 'none';
                }, 900);
                
                chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
                    let whichCharacter;

                    bot.notes.forEach( (el, i) => {
                        if (el.nickname === bot.nickname){
                            whichCharacter = i;
                        }
                    });

                    let data = bot.notes;

                    data[whichCharacter].notes.splice(parseInt( e.target.parentNode.id ), 1);

                    chrome.storage.sync.set({'notes': data});


                    // now after delete more than 2 note, id is mixing and after reload extension we deleted note which we dont want to delete
                    // solution is: remowe all elements from notes and display all of them (this give every note new id)
                    //Solution under not working - buttont 'x' cant delete note
                    $notes_list.innerHTML = '';

                    showNotes(); // not working
                });
            })
        });    
    }, 250);
}


let activeNote = '';
$textarea.addEventListener('keyup', e => {
    if (e.key != 'Backspace' && e.key != 'Enter' && e.key != 'Tab' && e.key != 'CapsLock' && e.key != 'Shift' && e.key != 'Control' && e.key != 'Alt' && e.key != 'Meta' && e.key != 'ArrowLeft' && e.key != 'ArrowUp' && e.key != 'ArrowRight' && e.key != 'ArrowDown' && e.key != 'Escape' && e.key != 'F1' && e.key != 'F2' && e.key != 'F3' && e.key != 'F4' && e.key != 'F5' && e.key != 'F6' && e.key != 'F7' && e.key != 'F8' && e.key != 'F9' && e.key != 'F10' && e.key != 'F11' && e.key != 'F12'){
        activeNote += e.key;
    }

    if (e.which === 13){
        activeNote = activeNote + '<br />';
    } else if (e.which === 8){
        activeNote = activeNote.slice(0, -1);
    }
});

$button_save_notes.addEventListener('click', () => {
    if (activeNote != '') {
        chrome.storage.sync.get(['notes', 'nickname'], (bot) => {
            let data;
            let whichCharacter;

            bot.notes.forEach( (el, i) => {
                if (el.nickname === bot.nickname){
                    data = el.notes;
                    whichCharacter = i;
                }
            });
    
            data.push(activeNote);

            bot.notes[whichCharacter].notes = data;

            chrome.storage.sync.set({'notes': bot.notes});

            createNote(activeNote, data.length-1);
            
            $textarea.value = '';
            activeNote = '';
        });
    }
    
});