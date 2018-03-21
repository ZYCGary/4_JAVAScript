'use strict';

function createBookTable(book) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="checkbox"></td><td><img src="' + book.img + '" width="60px"></td><td><em>' + book.title + '</em></td><td>' + book.authors + '</td><td>' + book.year + '</td><td>' + book.price + '</td><td>' + book.publisher + '</td><td>' + book.category + '</td>';

    return tr;
}

function loadBooks(list) {
    var bookList = document.getElementById('bookList');
    for (var i = 0; i < list.length; i++) {
        var book = createBookTable(list[i]);
        bookList.appendChild(book);
    }
}


function clearBooks() {
    var bookList = document.getElementById('bookList');
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}


function errorMessage(msg) {
    alert(msg);
}


function highlightBox(index) {
    var target = document.getElementById('bookList').children[index];
    target.style.backgroundColor = "yellow";
}

function filter(bookList) {
    var select = document.getElementById('category');
    var category = select.options[select.selectedIndex].value;
    //    console.log(category);
    var result = [];

    // Clear all books, ready for showing match result
    clearBooks();

    // Retreval bookList and match
    if (category && category !== "All") {
        for (var i = 0; i < bookList.length; i++) {
            //            console.log(bookList[i].category);
            if (bookList[i].category === category) {
                result.push(bookList[i]);
            }
        }
    } else {
        result = bookList;
    }

    // Show match result
    loadBooks(result);
    console.log(result);

    return (result);
}


function search(filterResult) {
    var input = document.getElementById('searchText').value;
    //    console.log(input);
    var count = 0;
    var select = document.getElementById('category');
    var category = select.options[select.selectedIndex].value;

    if (filterResult.length === 0) {
        // No books in category
        clearBooks();
        var categoryErr = "Oops! Category " + category + " does not contain any books ~_~";
        errorMessage(categoryErr);
    } else if (input) {
        for (var i = 0; i < filterResult.length; i++) {
            if (filterResult[i].title.indexOf(input) !== -1) {
                highlightBox(i);
                count++;
            }
        }
        if (count === 0) {
            // No book title contains search term
            clearBooks();
            var searchErr = "Oops! Search term \"" + input + "\" does not appear in any title of book in category of " + category + " ~_~"
            errorMessage(searchErr);
        }
    }
    return count;
}

// Combine search and filter
function combineResult(bookList) {
    var filterResult = filter(bookList);
    search(filterResult);
}

function addToCart() {

}

function resetCart() {
    alert("reset")
}

window.onload = function () {
    // Load all books
    var data = '[ {"img": "images/01.jpg","title": "The Arts: A Visual Encyclopedia","authors": "DK","year": "2017","price": "13.99","publisher": "DK Children","category": "Art"},{"img": "images/11.jpg","title": "The Lost Art of Reading Nature\'s Signs: Use Outdoor Clues to Find Your Way, Predict the Weather, Locate Water, Track Animals―and Other Forgotten Skills (Natural Navigation)","authors": "Tristan Gooley","year": "2015","price": "11.52","publisher": "The Experiment","category": "Art"}, {"img": "images/02.jpg","title": "The Scientists: A History of Science Told Through the Lives of Its Greatest Inventors","authors": "John Gribbin","year": "2004","price": "16.00","publisher": "Random House Trade Paperbacks","category": "Science History"}, {"img": "images/22.jpg","title": "The Invention of Science: A New History of the Scientific Revolution","authors": "David Wootton","year": "2016","price": "7.75","publisher": "Harper Perennial","category": "Science History"}, {"img": "images/03.jpg","title": "The Hunger Games","authors": "Suzanne Collins","year": "2010","price": "7.55","publisher": "Scholastic Press","category": "Action and Adventure"}, {"img": "images/33.jpg","title": "Coyote Peterson’s Brave Adventures: Wild Animals in a Wild World","authors": "Coyote Peterson","year": "2017","price": "13.44","publisher": "Mango","category": "Action and Adventure"},{"img": "images/04.jpg","title": "Dr. A\'s Habits of Health: The Path to Permanent Weight Control & Optimal Health","authors": "Wayne Scott Anderse","year": "2010","price": "24.43","publisher": "Habits of Health Press","category": "Health"},{"img": "images/44.jpg","title": "The New Health Rules: Simple Changes to Achieve Whole-Body Wellness","authors": "Frank Lipman M.D.","year": "2016","price": "8.98","publisher": "Artisan","category": "Health"},{"img": "images/05.jpg","title": "2084","authors": "Mason Engel","year": "2017","price": "12.50","publisher": "CreateSpace Independent Publishing Platform","category": "Science Fiction"},{"img": "images/55.jpg","title": "God\'s Ground: Compared to the settlement of space, all other forms of human endeavor shrink to insignificance","authors": "John Brophy","year": "2017","price": "6.99","publisher": "John R Brophy","category": "Science Fiction"}]';

    var bookList = JSON.parse(data);
    loadBooks(bookList);

    // Search books
    var searchBtn = document.getElementById('search');
    //    var filterResult = filter(bookList);
    searchBtn.addEventListener("click", function () {
        combineResult(bookList);
    });

    // Filter books
    var filterBtn = document.getElementById('filter');
    //    filterBtn.onsubmit = filter();
    filterBtn.addEventListener("click", function () {
        combineResult(bookList);
    });

    // Add selected books to cart
    var addBtn = document.getElementById('add');
    addBtn.addEventListener("click", addToCart);

    // Reset cart
    var resetBtn = document.getElementById('reset');
    resetBtn.addEventListener("click", resetCart);
}
