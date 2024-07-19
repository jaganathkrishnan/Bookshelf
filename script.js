const bookForm = document.getElementById("bookform");
const bookshelfContainer = document.getElementById("bookshelfcontainer");
const addBookButton = document.getElementById("addBook");
const cancelButton = document.getElementById("cancel");

let library = [];

class Book {
    constructor(author, title, pagesTotal, pagesRead, read) {
        this.author = author;
        this.title = title;
        this.pagesTotal = pagesTotal;
        this.pagesRead = pagesRead;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(author, title, pagesTotal, pagesRead, read) {
    const newBook = new Book(author, title, pagesTotal, pagesRead, read);
    library.push(newBook);
    displayBooks();
}

function displayBooks() {
    bookshelfContainer.innerHTML = '';
    library.forEach((book, index) => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-entry');
        bookElement.dataset.index = index;

        bookElement.innerHTML = `
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Total Pages:</strong> ${book.pagesTotal}</p>
            <p><strong>Pages Read:</strong> ${book.pagesRead}</p>
            <p><strong>Read:</strong> ${book.read ? 'Yes' : 'No'}</p>
            <button class="toggle-read">Toggle Read</button>
            <button class="remove-book">Remove Book</button>
        `;

        bookshelfContainer.appendChild(bookElement);

        bookElement.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();  
            displayBooks();     
        });

        bookElement.querySelector('.remove-book').addEventListener('click', () => {
            library.splice(index, 1);  
            displayBooks();           
        });
    });
}

addBookButton.addEventListener('click', (event) => {
    event.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const pagesTotal = document.getElementById('pagesTotal').value;
    const pagesRead = document.getElementById('pagesRead').value;
    const read = document.getElementById('read').checked;

    if (author && title && pagesTotal && pagesRead) {
        addBookToLibrary(author, title, pagesTotal, pagesRead, read);
        bookForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

cancelButton.addEventListener('click', () => {
    bookForm.reset();
});
