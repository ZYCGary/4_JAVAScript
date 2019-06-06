'use strict';

function createBookTable(book) {
    let tr = document.createElement('tr');
    tr.innerHTML = '<td><input type="checkbox"></td><td><img src="' + book.img + '" width="60px"></td><td><em>' + book.title + '</em></td><td>' + book.authors + '</td><td>' + book.year + '</td><td>' + book.price + '</td><td>' + book.publisher + '</td><td>' + book.category + '</td>';

    return tr;
}


function loadBooks(list) {
    let bookList = document.getElementById('bookList');
    for (let i = 0; i < list.length; i++) {
        let book = createBookTable(list[i]);
        bookList.appendChild(book);
    }
}


function clearBooks() {
    let bookList = document.getElementById('bookList');
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
}


function notification(msg, indicator) {
    if (indicator === "err") {
        let errorMsg = document.getElementsByClassName('errorMsg')[0];
        let errText = document.getElementById('errorText');
        errText.innerHTML = msg;
        errorMsg.style.display = "block";
    } else if (indicator === "succ") {
        let successMsg = document.getElementsByClassName('successMsg')[0];
        let succText = document.getElementById('successText');
        succText.innerHTML = msg;
        successMsg.style.display = "block";
    }
}


function clearNotifications() {
    let errorMsg = document.getElementsByClassName('errorMsg')[0];
    let errText = document.getElementById('errorText');
    errText.innerHTML = '';
    errorMsg.style.display = "none";

    let successMsg = document.getElementsByClassName('successMsg')[0];
    let succText = document.getElementById('successText');
    succText.innerHTML = '';
    successMsg.style.display = "none";
}


function highlightBox(index) {
    let target = document.getElementById('bookList').children[index];
    target.style.backgroundColor = "yellow";
}


function filter(bookList) {
    let select = document.getElementById('category');
    let category = select.options[select.selectedIndex].value;
    //    console.log(category);
    let result = [];

    // Clear all books, ready for showing match result
    clearBooks();

    // Retreval bookList and match
    if (category && category !== "All") {
        for (let i = 0; i < bookList.length; i++) {
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

    return (result);
}


function search(filterResult) {
    let input = document.getElementById('searchText').value;
    //    console.log(input);
    let count = 0;
    let select = document.getElementById('category');
    let category = select.options[select.selectedIndex].value;

    if (filterResult.length === 0) {
        // No books in category
        clearBooks();
        let categoryErr = "Oops! Category <strong><em>" + category + "</em></strong> does not contain any books ~_~";
        notification(categoryErr, "err");
    } else if (input) {
        for (let i = 0; i < filterResult.length; i++) {
            if (filterResult[i].title.indexOf(input) !== -1) {
                highlightBox(i);
                count++;
            }
        }
        if (count === 0) {
            // No book title contains search term
            clearBooks();
            let searchErr = "Oops! Search term <strong><em>\"" + input + "\"</em></strong> does not appear in any title of book in category of <strong><em>" + category + "</em></strong> ~_~"
            notification(searchErr, "err");
        }
    }
    return count;
}


// Combine search and filter functions
function combineResult(bookList) {
    clearNotifications();

    let filterResult = filter(bookList);
    search(filterResult);
}


function addToCart() {
    clearNotifications();

    let checkBoxes = document.getElementById('bookList').getElementsByTagName('input');
    let count = 0;

    // Count checked books
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            count++;
        }
    }

    // Change the number of added books
    let incart = document.getElementById('incart');
    incart.innerHTML = Number(incart.innerHTML) + count;

    // Clear check marks
    for (i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].checked = false;
    }

    // Show notifications
    if (count > 0) {
        let succMsg = "Yeah! Seleted books are added to cart!";
        notification(succMsg, "succ");
    } else {
        let errMsg = "Oops! You have not selected any books ~_~";
        notification(errMsg, "err");
    }
}

function resetCart() {
    clearNotifications();

    let incart = document.getElementById('incart');
    incart.innerHTML = "0";
    let msg = "Awesome! You cart is empty now!";
    notification(msg, "succ");
}


function confirmBoxDiplay(display) {
    let overlay = document.getElementById('overlay');
    let confirmBox = document.getElementById('confirm');
    overlay.style.display = display;
    confirmBox.style.display = display;
}


window.onload = function () {
    // Load all books
    let data = '[ {"img": "images/01.jpg","title": "The Arts: A Visual Encyclopedia","authors": "DK","year": "2017","price": "13.99","publisher": "DK Children","category": "Art"},{"img": "images/11.jpg","title": "The Lost Art of Reading Nature\'s Signs: Use Outdoor Clues to Find Your Way, Predict the Weather, Locate Water, Track Animals―and Other Forgotten Skills (Natural Navigation)","authors": "Tristan Gooley","year": "2015","price": "11.52","publisher": "The Experiment","category": "Art"}, {"img": "images/02.jpg","title": "The Scientists: A History of Science Told Through the Lives of Its Greatest Inventors","authors": "John Gribbin","year": "2004","price": "16.00","publisher": "Random House Trade Paperbacks","category": "Science History"}, {"img": "images/22.jpg","title": "The Invention of Science: A New History of the Scientific Revolution","authors": "David Wootton","year": "2016","price": "7.75","publisher": "Harper Perennial","category": "Science History"}, {"img": "images/03.jpg","title": "The Hunger Games","authors": "Suzanne Collins","year": "2010","price": "7.55","publisher": "Scholastic Press","category": "Action and Adventure"}, {"img": "images/33.jpg","title": "Coyote Peterson’s Brave Adventures: Wild Animals in a Wild World","authors": "Coyote Peterson","year": "2017","price": "13.44","publisher": "Mango","category": "Action and Adventure"},{"img": "images/04.jpg","title": "Dr. A\'s Habits of Health: The Path to Permanent Weight Control & Optimal Health","authors": "Wayne Scott Anderse","year": "2010","price": "24.43","publisher": "Habits of Health Press","category": "Health"},{"img": "images/44.jpg","title": "The New Health Rules: Simple Changes to Achieve Whole-Body Wellness","authors": "Frank Lipman M.D.","year": "2016","price": "8.98","publisher": "Artisan","category": "Health"},{"img": "images/05.jpg","title": "2084","authors": "Mason Engel","year": "2017","price": "12.50","publisher": "CreateSpace Independent Publishing Platform","category": "Science Fiction"},{"img": "images/55.jpg","title": "God\'s Ground: Compared to the settlement of space, all other forms of human endeavor shrink to insignificance","authors": "John Brophy","year": "2017","price": "6.99","publisher": "John R Brophy","category": "Science Fiction"}]';

    let bookList = JSON.parse(data);
    loadBooks(bookList);

    // Search books
    let searchBtn = document.getElementById('search');
    searchBtn.addEventListener("click", function () {
        combineResult(bookList);
    });

    // Filter books
    let filterBtn = document.getElementById('filter');
    filterBtn.addEventListener("click", function () {
        combineResult(bookList);
    });

    // Add selected books to cart
    let addBtn = document.getElementById('add');
    addBtn.addEventListener("click", addToCart);

    // Reset cart
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener("click", function () {
        confirmBoxDiplay("block");
    });

    // Close notification
    let close = document.getElementsByClassName('close');
    //    console.log(close);
    for (let i = 0; i < close.length; i++) {
        close[i].addEventListener("click", clearNotifications);
    }

    let cancelBtn = document.getElementById('no');
    //    cancelBtn.onclick = confirmBoxDiplay("none");
    cancelBtn.addEventListener("click", function () {
        confirmBoxDiplay("none");
    })

    let confirmBtn = document.getElementById('yes');
    confirmBtn.addEventListener("click", function () {
        confirmBoxDiplay("none");
        resetCart();
    });
}
