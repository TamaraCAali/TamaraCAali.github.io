'use strict';

console.log('I am app.js');
var gPriceUpdateClick = 0;

function init() {
    createBooks();
    renderBooks();
    renderPagination(PAGE_SIZE);
}

function renderBooks() {
    //<th scope="row">${index+1}</th>
    var books = getBooks();
    var strHtmls = books.map(function (book, index) {
        return `
        <tr>
        <th scope="row">${book.id}</th>
        <td>${book.name}</td>
        <td class"price"><span>$${book.price}</span>
        <div class="update-price" id="'${book.id}'">
        <input class="new-price" type="text" placeholder="Price">
        <button class="new-price-btn" onclick="readAndUpdateBook('${book.id}')">✓</button>
        </div>
        </td>
        <div class="buttons">
        <td>
            <button class="btn btn-primary btn-sm" onclick="onBookDetails('${book.id}')">Read</button>
            <button class="btn btn-warning btn-sm update-btn" onclick="updateBookPrice()">Update</button>
            <button class="btn btn-danger btn-sm" onclick="onDeleteBook('${book.id}')">Delete</button>
        </td>
    </div>
    <td>
    <div>
            <img src="img/${book.name}.png" alt="Picture of a book" width="50" height="60";>
         </div>
    </td>
      </tr>
     `
    });
    $('.book-list').html(strHtmls.join(''));

}



function renderPagination(numOfPages){
    var strHtml = '';
    for (var i = 0; i < numOfPages; i++) {
        strHtml +=
        `
        <li class="page-item" onclick="onNextPage('${i+1}')"><a class="page-link">${i+1}</a></li>
        `
    }
    document.querySelector('.pages').innerHTML = strHtml;
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}

function onBookDetails(BookId) {
    var book = getBookById(BookId);
    // console.log('book', book);
    var $bookDetails = $('.book-details');
    $bookDetails.find('h4').text(book.name);
    $bookDetails.find('h2').text('$' + book.price);
    var $bookImg = `img/${book.name}.png`;
    $('.book-img').attr("src", $bookImg);
    $('.book-details').show();
    $('#bookId').val(book.id);
    $('.rate').text(book.rating);
}

function onCloseBookDetails() {
    $('.book-details').hide();
}


function onNextPage(pageNum) {
    goNextPage(pageNum);
    renderBooks();
}


function readAndAddNewBook() {
    var book = addBookDetails();
    addBook(book);
    $('.book-add').hide();
    renderBooks();
    
}
//opens modal 
function addBookDetails() {
    $('.book-add').show();
    var bookName = $('.bookName').val();
    var bookPrice = $('.bookPrice').val();
    var book = createBook(bookName, bookPrice);
    return book;
}

function onCloseAddBook() {
    $('.book-add').hide();
}

function readAndUpdateBook(bookId) {
    var newPrice = updateBookPrice();
    updateBook(bookId, newPrice);
    $('.update-price').hide();
    // debugger;
    renderBooks();

}

function updateBookPrice() {
    if(gPriceUpdateClick === 0){
        $('.update-price').css('visibility', 'visible');
        gPriceUpdateClick = 1;
    }
    else{ 
    $('.update-price').css('visibility', 'hidden');
    gPriceUpdateClick = 0;

    }
    var newPrice = $('.new-price').val();
    return newPrice;
}
function updateRating(operator) {
    var bookId = $('#bookId').val();
    var book = getBookById(bookId);
    if (operator === '+' && book.rating < 10) book.rating++;
    else if (operator === '-' && book.rating > 0) book.rating--;
    $('.rate').text(book.rating);
}


// function onSortBy(sortStatus) {
//     // console.log('i am sort by');
//     var books = getBooks();
//     if (sortStatus === 'price') books.sort(pricesComperator);
//     else if (sortStatus === 'name') books.sort(namesComperator);
// }

// function pricesComperator() {
//     // console.log('prices');
//     var books = getBooks();
//     books.map(function (book) {
//         return book.price - book.price;
//     });
//     renderBooks();
// }


// function namesComperator() {
//     var books = getBooks();
//     books.map(function (book) {
//         return book.name - book.name;
//     });
//     renderBooks();
// }
