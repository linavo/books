const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
}
// use below after items have been added to the DOM to delete the rest !!!
let books = myLibrary.forEach((book) => {
  let card = document.createElement("div");
  let progressStatus;
  card.className = "exampleCard";
  if (book.read == true) {
    progressStatus = "Completed";
  } else if (book.read == false) {
    progressStatus = "In Progress";
  }
  card.innerHTML = `<h2>${book.title}</h2><p>by ${book.author}</p><button class="readBtn">Read</button>
  <button class="deleteBtn">Delete</button><div class="progress">
  <p>${progressStatus}</p>
  <p>${book.pages} pages</p>
</div>`;
  document.querySelector(".main").appendChild(card);
});

// document.querySelector(".topRightBar").addEventListener("click", () => {
//   document.querySelector(".popUpContainer").style.height = "0";
//   document.querySelector(".firstPopUp").style.height = "0";
// });

// Add new book to myLibrary Array from the browser
let addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let pushBookValues = new Book(title, author, pages, read);
  addBookToLibrary(pushBookValues);
  let card = document.createElement("div");
  let progressStatus;
  let readStatus;
  let readText;
  card.className = "exampleCard";
  if (pushBookValues.read == true) {
    progressStatus = "Completed";
    readStatus = "readBtn";
    readText = "Read";
  } else if (pushBookValues.read == false) {
    progressStatus = "In Progress";
    readStatus = "unreadBtn";
    readText = "Unread";
  }
  let index = myLibrary.findIndex((e) => e.pages == pushBookValues.pages);
  card.innerHTML = `<h2>${pushBookValues.title}</h2><p>by ${pushBookValues.author}</p><button class="${readStatus}" data-name="${index}" data-name2="${pushBookValues.read}" onclick="toggleReadStatus(this)">${readText}</button>
  <button class="deleteBtn" data-name="${index}" onclick="deleteBook(this)">Delete</button><div class="progress">
  <p>${progressStatus}</p>
  <p>${pushBookValues.pages} pages</p>
</div>`;
  document.querySelector(".main").appendChild(card);
  document.querySelector(".popUpContainer").style.height = "0";
  document.querySelector(".firstPopUp").style.height = "0";
});

// i have no idea what code this is below lol
// let individualBooks = document.querySelectorAll(".exampleCard");
// individualBooks.forEach((book) => {
//   book.addEventListener("click", () => {
//     document.querySelector(".main").removeChild(book);
//   });
// });

// remove book from array AND dom
function deleteBook(button) {
  // used splice to remove index of book in array by assigning data attribute
  let book = button.getAttribute("data-name");
  myLibrary.splice(book, 1);
  console.log(book);
  console.log(myLibrary);
  // remove ALL child nodes from main so it can have a blank canvas before re-adding books to the page
  let child = document.querySelector(".main").lastElementChild;
  while (child) {
    document.querySelector(".main").removeChild(child);
    child = document.querySelector(".main").lastElementChild;
  }
  // re-add the updated array to page!!!
  let books = myLibrary.forEach((book) => {
    let card = document.createElement("div");
    let progressStatus;
    let readStatus;
    let readText;
    card.className = "exampleCard";
    if (book.read == true) {
      progressStatus = "Completed";
      readStatus = "readBtn";
      readText = "Read";
    } else if (book.read == false) {
      progressStatus = "In Progress";
      readStatus = "unreadBtn";
      readText = "Unread";
    }
    let index = myLibrary.findIndex((e) => e.pages == book.pages);
    card.innerHTML = `<h2>${book.title}</h2><p>by ${book.author}</p><button class="${readStatus}" data-name="${index}" data-name2="${book.read}"  onclick="toggleReadStatus(this)">${readText}</button>
  <button class="deleteBtn" data-name="${index}" onclick="deleteBook(this)">Delete</button><div class="progress">
  <p>${progressStatus}</p>
  <p>${book.pages} pages</p>
</div>`;
    document.querySelector(".main").appendChild(card);
  });
}

// toggle the read status class
function toggleReadStatus(button) {
  let book = button.getAttribute("data-name");
  let truthy = button.getAttribute("data-name2");

  if (truthy == false || truthy == "false") {
    myLibrary[book].read = true;
  } else if (truthy == true || truthy == "true") {
    myLibrary[book].read = false;
  }
  // remove ALL child nodes from main so it can have a blank canvas before re-adding books to the page
  let child = document.querySelector(".main").lastElementChild;
  while (child) {
    document.querySelector(".main").removeChild(child);
    child = document.querySelector(".main").lastElementChild;
  }
  // re-add the updated array to page!!!
  let books = myLibrary.forEach((book) => {
    let card = document.createElement("div");
    let progressStatus;
    let readStatus;
    let readText;
    card.className = "exampleCard";
    if (book.read == true) {
      progressStatus = "Completed";
      readStatus = "readBtn";
      readText = "Read";
    } else if (book.read == false) {
      progressStatus = "In Progress";
      readStatus = "unreadBtn";
      readText = "Unread";
    }
    let index = myLibrary.findIndex((e) => e.pages == book.pages);
    card.innerHTML = `<h2>${book.title}</h2><p>by ${book.author}</p><button class="${readStatus}" data-name="${index}" data-name2="${book.read}"  onclick="toggleReadStatus(this)">${readText}</button>
  <button class="deleteBtn" data-name="${index}" onclick="deleteBook(this)">Delete</button><div class="progress">
  <p>${progressStatus}</p>
  <p>${book.pages} pages</p>
</div>`;
    document.querySelector(".main").appendChild(card);
  });
}

// makes sidebar open
document.querySelector("#addBook").addEventListener("click", () => {
  document.querySelector(".sideBar").style.width = "600px";
});
// makes sidebar close
document.querySelector(".main").addEventListener("click", () => {
  document.querySelector(".sideBar").style.width = "0px";
});
document.querySelector(".popUpContainer").addEventListener("click", () => {
  document.querySelector(".sideBar").style.width = "0px";
});
