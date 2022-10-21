//structure for book genre and book name
class Book {
    constructor(name, author, genre, id, rating) {
        this.name = name;
        this.author = author;
        this.genre = genre;
        this.rating = rating;
        this.id = id;
    }
}

let currentRead = [];
let finishedRead = [];
let id = 0;

document.getElementById('btn-new-book').addEventListener('click', () => {
    let table = document.getElementById('booklist');
    let row = table.insertRow(1);

    //adding new row
    row.setAttribute('id', `item-${id}`);

    //filling out the new row columns
    row.insertCell(0).innerHTML = document.getElementById('name').value;
    row.insertCell(1).innerHTML = document.getElementById('author').value;
    row.insertCell(2).innerHTML = document.getElementById('genre').value;

    //creating action button for each row
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteButton(id++));
    document.getElementById('new-book').value = '';

    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let genre = document.getElementById('genre').value;

    currentRead.push(new Book(name, author, genre, id));


    // checkbox to see if you're done reading or not
    let read = row.insertCell(4);
    read.appendChild(createRead(id));
    document.getElementById('new-book').value = '';

    // rating the book
    let rating = row.insertCell(5);
    rating.appendChild(createRating(id));
    document.getElementById('new-book').value = '';

    console.log(currentRead);
});


//delete
function createDeleteButton(id) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger';
    btn.id = id;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);

     
        currentRead.splice(id, 1);

        console.log(currentRead);
    };
    return btn;
}


//update reading status
function createRead(id) {
    let input = document.createElement('input');
    input.className = 'form-check-input';
    input.type = 'checkbox';
    input.id = id;
    input.onclick = () => {
        console.log(`Mark book as read with id: item-${id}`);
       
        let currentBook = currentRead[id-1];
        currentBook.read = input.checked;

        console.log(currentRead);
    };
    return input;
}

//rating 
function createRating(id) {
    let input = document.createElement('input');
    input.className = 'form-control';
    input.id = id;
    input.innerHTML = 'Rating';
    input.onchange = () => {
        let currentBook = currentRead[id-1];
        currentBook.rating = input.value;

        console.log(currentRead);
    };
    return input;
}

