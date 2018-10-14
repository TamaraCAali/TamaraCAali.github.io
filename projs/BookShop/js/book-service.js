'use strict';

console.log('I am book-service');


const PAGE_SIZE = 3;
var gBooks;
var gCurrPageNo = 0;
var gPriceSort = 'price';
var gAlphabitical = 'name';

function createBooks() {
    gBooks = [
        createBook('A Clash Of Kings',40),
        createBook('A Million Little Pieces', 34),
        createBook('Al Les Wal Kilab', 62),
        createBook('The Da Vinci Code', 53),
        createBook('A Game Of Thrones',37), 
        createBook('The God Delusion', 33), 
        createBook('The Hunger Games', 29) 
    ];
}


function createBook(name, price) {
    return {
        id: makeId(),
        name: name,
        price: price,
        rating : 0,
    };
}


function getBooks() {
    var fromBookIdx = gCurrPageNo * PAGE_SIZE;
    return gBooks.slice(fromBookIdx, fromBookIdx+PAGE_SIZE);
}

function getBookById(bookId) {
    return gBooks.find(function(book){
        return book.id === bookId;
    })
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book){
        return book.id === bookId;
    })
    gBooks.splice(bookIdx, 1);
}

function addBook(book) {
    gBooks.push(book);
}

function updateBook(bookId, newPrice) {
    var bookIdx = gBooks.findIndex(function(book){
        return book.id === bookId;
    })
    gBooks[bookIdx].price = newPrice;
}

function goNextPage(pageNum) {
    var pageNumber = +pageNum; // 0 1
    gCurrPageNo = pageNumber-1; /// 0 1
}

function goToPage(operator){
    // var toPage;
    if(operator === '-' && gCurrPageNo > 0){
        // toPage = gCurrPageNo-1;
        gCurrPageNo--;
        // console.log('to pager -',toPage);
        console.log('gCurrPageNo',gCurrPageNo);

    }
    else if(operator === '+') {
    // toPage = gCurrPageNo+2;
    gCurrPageNo++;
}
    console.log(gCurrPageNo);
    // console.log('toPage',toPage);
    renderBooks();
}



function onSetLang(lang) {
    setLang(lang);
    renderBooks();
}
