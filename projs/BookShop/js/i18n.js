'use strict';

var gCurrLang = 'en';

var gTrans = {
    title: {
        en: 'Welcome to my catbrary',
        he: 'הספריה שלי'
    },
    add: {
        en: 'Add book',
        he: ' הוסף ספר',
    },
    // sure: {
    //     en: 'Are you sure?',
    //     he: 'בטוח נשמה?',
    // update_price_placeholder
    // },
    add_book_name_placeholder: {
        en: 'Book Title',
        he: 'שם של הספר'
    },
    price: {
        en: 'Price',
        he: 'מחיר',
    },
    price_conversion: {
        en: 'Price',
        he: 'מחיר',
    },
    save: {
        en: 'Save',
        he: 'שמור',
    },
    next: {
        en: 'Next',
        he: 'הבא',
    },
    prev: {
        en: 'Previous',
        he: 'הקודם',
    },
    'read': {
        en: 'Read',
        he: 'הצג',
    },
    update: {
        en: 'Update',
        he: 'עדכן',
    },
    delete: {
        en: 'Delete',
        he: 'מחק',
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    book_title: {
        en: 'Title',
        he: 'שם'
    },
    book_id: {
        en: 'ID',
        he: 'ID'
    },
    close: {
        en: 'Close',
        he: 'סגור'
    },
    actions: {
        en: 'Actions',
        he: 'פעולות'
    },
    book_img: {
        en: 'Image',
        he: 'תמונה'
    },
    // book_price:{
    //     en: $('span').text(),
    //     he: (+$('span').val())*4,

    // },

}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.getAttribute('data-trans');

        var txt = getTrans(transKey);

        // Translating is actually complex and needs a library
        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}


function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    // If not found - use english
    if (!txt) txt = keyTrans['en'];

    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
    if (gCurrLang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    doTrans();
    //renderBooks();
}


function usdToIls(usd) {
    return usd * 3.62;
}


function priceConversion(priceInUsd) {
    var bookPrice;
    if (gCurrLang === 'en') bookPrice = priceInUsd;
    else bookPrice = usdToIls(priceInUsd);
    return bookPrice;
}


function formatPrice(priceInUsd) {
    var price = priceConversion(priceInUsd);
    //console.log(price)
    return (gCurrLang === 'en') ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price) :
        new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(price);
}
