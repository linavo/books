const myLibrary = JSON.parse(localStorage.getItem("myLibrary")) || [];
const form = document.querySelector(".formContainer");

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook(book) {
  let deleteBtn = document.createElement("button");

  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));

  document.querySelector(".popUpContainer").style.height = "0";
  document.querySelector(".firstPopUp").style.height = "0";

  form.reset();

  let child = document.querySelector(".main").lastElementChild;
  while (child) {
    document.querySelector(".main").removeChild(child);
    child = document.querySelector(".main").lastElementChild;
  }
  getBooks();
  console.log(myLibrary);
}

function getBooks() {
  myLibrary.forEach((book, index) => {
    let card = document.createElement("div");
    let bookTitle = document.createElement("h2");
    let bookAuthor = document.createElement("p");
    let readBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    let progressContainer = document.createElement("div");
    let progressP1 = document.createElement("p");
    let progressP2 = document.createElement("p");

    let title = book.title;
    let author = book.author;
    let pages = book.pages;
    let read = book.read;

    let readStatus = read == true ? "readBtn" : "unreadBtn";
    let progressStatus = read == true ? "Completed" : "In Progress";
    let readText = read == true ? "Read" : "Unread";

    deleteBtn.setAttribute("data-id", `${pages}`);
    readBtn.classList.add(`${readStatus}`);
    deleteBtn.classList.add("deleteBtn");
    card.classList.add("exampleCard");
    progressContainer.classList.add("progress");

    bookTitle.innerHTML = `${title}`;
    bookAuthor.innerHTML = `by ${author}`;
    progressP1.innerHTML = `${progressStatus}`;
    progressP2.innerHTML = `${pages}`;
    readBtn.innerHTML = `${readText}`;
    deleteBtn.innerHTML = `Delete`;

    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(readBtn);
    card.appendChild(deleteBtn);
    progressContainer.appendChild(progressP1);
    progressContainer.appendChild(progressP2);
    card.appendChild(progressContainer);

    document.querySelector(".main").appendChild(card);
    document.querySelector(".popUpContainer").style.height = "0";
    document.querySelector(".firstPopUp").style.height = "0";

    readBtn.addEventListener("click", () => {
      readBtn.removeAttribute("class");
      if (book.read == true) {
        readBtn.classList.add("unreadBtn");
        progressP1.innerHTML = "In Progress";
        readBtn.innerHTML = "Unread";
        book.read = false;
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      } else if (book.read == false) {
        readBtn.classList.add("readBtn");
        progressP1.innerHTML = "Completed";
        readBtn.innerHTML = "Read";
        book.read = true;
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      }
    });

    deleteBtn.addEventListener("click", (e) => {
      document.querySelector(".main").removeChild(card);
    });
  });
  console.log(myLibrary);
  deleteItem();
}

// single responsibility rule: SEPARATE THE UI FROM THE FUNCTIONALITY/LOGIC!!!
function deleteItem() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((button) => {
    let dataID = button.getAttribute("data-id");
    let index = myLibrary.findIndex((e) => e.pages == dataID);
    button.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
      console.log(myLibrary);
    });
  });
}

window.addEventListener("load", getBooks);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook(e);
});

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
document.querySelector(".libraryLogo").addEventListener("click", () => {
  document.querySelector(".sideBar").style.width = "0px";
});
