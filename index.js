const titleMessage = document.getElementById("titleMessage");
const textMessage = document.getElementById("textMessage");
const searchInput = document.getElementById("searchInput");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const list = document.getElementById("list");
const counter = document.getElementById("counter");
const counterNotes = document.getElementById("counterNotes");
const counterShowNotes = document.getElementById("counterShowNotes");

const STORAGE_KEY = "notes-app";

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
};

function addNote(title, text) {
    const note = {
        title,
        text
    };
    notes.push(note);
}


function showNotes(notesToShow) {
    list.textContent = "";

    notesToShow.forEach(note => {
        const li = document.createElement("li");
        li.textContent = `${note.title} - ${note.text}`;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Редактирай";
        editBtn.addEventListener("click", ()=> {
            const newTitle = prompt("Промени заглавието:", note.title);
            if(newTitle === null || newTitle.trim() === ""){
                return;
            }
            const newText = prompt("Промени текста:",note.text);
            
            
            if(newText === 0 || newText.trim() === ""){
                return;
            }
            note.title = newTitle.trim();
            note.text = newText.trim();
            saveToStorage();
            refreshNotes();
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "изтрий"
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {

            const noteIndex = notes.indexOf(note);
            if (noteIndex === -1) {
                return;
            }
            notes.splice(noteIndex, 1);
            saveToStorage();
            refreshNotes();

        })

        list.appendChild(li);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
    })
    
    const showNoteLength = notesToShow.length;
    const totalLength = notes.length;
    counterNotes.textContent = `${totalLength} бележки`
    counterShowNotes.textContent = `${showNoteLength} показани бележки`
}




saveNoteBtn.addEventListener("click", () => {
    const title = titleMessage.value.trim();
    if (title === "") {
        alert("Въведи заглавие");
        return;
    }

    const text = textMessage.value.trim();
    if (text === "") {
        alert("Въведи текст");
        return;
    }
    addNote(title, text);
    saveToStorage();
    refreshNotes();
    titleMessage.value = "";
    textMessage.value = "";

    counter.textContent = "0/150";
})

textMessage.addEventListener("input", () => {
    const maxLength = textMessage.maxLength;
    const currentLength = textMessage.value.length;
    counter.textContent = `${currentLength} / ${maxLength} символа`
})



function refreshNotes() {
    const search = searchInput.value.trim().toLowerCase();
    const filteredNote = notes.filter(note => note.title.toLowerCase().includes(search))
    showNotes(filteredNote);
}

searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    refreshNotes();
    searchInput.value = "";
})

refreshNotes();