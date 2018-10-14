'use strict';

console.log('I am book-service');


const PAGE_SIZE = 3;
var gBooks;
var gCurrPageNo = 0;
var gPriceSort = 'price';
var gAlphabitical = 'name';
const KEY_BOOKS = 'books';



function createBooks() {
    var books = getFromStorage(KEY_BOOKS);
    gBooks = (books && books.length) ? books : [
        createBook('A Clash Of Kings', 40),
        createBook('A Million Little Pieces', 34),
        createBook('Al Les Wal Kilab', 62),
        createBook('The Da Vinci Code', 53),
        createBook('A Game Of Thrones', 37),
        createBook('The God Delusion', 33),
        createBook('The Hunger Games', 29)
    ];
}

function createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        rating: 0,
    };
}


function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    console.log('from to',fromBookIdx ,fromBookIdx + PAGE_SIZE );
    return gBooks.slice(fromBookIdx, fromBookIdx + PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId;
    })
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
    saveToStorage(KEY_BOOKS, gBooks);
}

function addBook(book) {
    gBooks.push(book);
    saveToStorage(KEY_BOOKS, gBooks);
}

function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
    saveToStorage(KEY_BOOKS, gBooks);
}

function goNextPage(pageNum) {
    var pageNumber = +pageNum; // 0 1
    gCurrPageNo = pageNumber - 1; /// 0 1
    //
    renderBooks();
}

function goToPage(operator) {
    if (operator === '-' && gCurrPageNo > 0) {
        gCurrPageNo--;
    }
    else if (operator === '+') {
        gCurrPageNo++;
    }
    renderBooks();
    renderPagination(PAGE_SIZE);
}

function onSetLang(lang) {
    setLang(lang);
    renderBooks();
}











// function createBooks() {
//     gBooks = [
//         createBook('A Clash Of Kings',40),
//         createBook('A Million Little Pieces', 34),
//         createBook('Al Les Wal Kilab', 62),
//         createBook('The Da Vinci Code', 53),
//         createBook('A Game Of Thrones',37), 
//         createBook('The God Delusion', 33), 
//         createBook('The Hunger Games', 29) 
//     ];
// }