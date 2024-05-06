const myLibrary = [
  {
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 650,
    read: "read",
  },
  {
    title: "Mistborn",
    author: "Brandon Sanderson",
    pages: 422,
    read: "read",
  },
  {
    title: "The Alchemist",
    author: "Paolo Coelho",
    pages: 208,
    read: "read",
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return title + " by " + author + ", " + pages + " pages, " + read;
  };
}

function addBookToLibrary(title, author, pages, read) {
  let newObject = new Book(title, author, pages, read);
  myLibrary.push(newObject);
}

const modal = document.querySelector("#modal");
const overlay = document.querySelector(".overlay");
const modalBtn = document.querySelector("#add");
const submitBtn = document.querySelector(".submit");
const readBtn = document.querySelector(".toggleRead");
const main = document.querySelector(".main");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

modalBtn.addEventListener("click", function () {
  openModal();
});

overlay.addEventListener("click", function () {
  closeModal();
});

submitBtn.addEventListener("click", function () {
  let newAuthor = document.querySelector("#author").value;
  let newTitle = document.querySelector("#title").value;
  let newPages = document.querySelector("#pages").value;
  let newRead;
  if (document.querySelector("#read").checked == true) {
    newRead = "read";
  } else {
    newRead = "unread";
  }

  if (newAuthor == "" || newTitle == "" || newPages == "") {
    return;
  }

  addBookToLibrary(newTitle, newAuthor, newPages, newRead);
  console.log(myLibrary);
  closeModal();
  main.innerHTML = "";
  displayBooks(myLibrary);
});

function displayBooks(books) {
  for (let i = 0; i < books.length; i++) {
    const newCard = document.createElement("div");
    const cardTitle = document.createElement("h1");
    const cardAuthor = document.createElement("p");
    const cardPages = document.createElement("p");
    const buttons = document.createElement("div");
    const cardRead = document.createElement("button");
    const svg = document.createElement("img");
    newCard.classList.add("card");
    cardTitle.classList.add("title");
    cardAuthor.classList.add("author");
    cardPages.classList.add("pages");
    buttons.classList.add("buttons");
    cardRead.classList.add("toggleRead");
    cardTitle.textContent = books[i].title;
    cardAuthor.textContent = books[i].author;
    cardPages.textContent = books[i].pages;
    cardRead.textContent = books[i].read;
    svg.src = "icons8-trash-24 (1).png";
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardAuthor);
    newCard.appendChild(cardPages);
    newCard.appendChild(buttons);
    buttons.appendChild(cardRead);
    buttons.appendChild(svg);
    main.appendChild(newCard);
    newCard.setAttribute("index", i);
    svg.addEventListener("click", () => {
      myLibrary.splice(newCard.getAttribute("index"), 1);
      main.innerHTML = "";
      displayBooks(myLibrary);
    });
    cardRead.addEventListener("click", (e) => {
      cardRead.classList.toggle("unread");
      if (myLibrary[newCard.getAttribute("index")].read == "read") {
        myLibrary[newCard.getAttribute("index")].read = "unread";
        cardRead.textContent = "unread";
      } else {
        myLibrary[newCard.getAttribute("index")].read = "read";
        cardRead.textContent = "read";
      }
    });
  }
}
displayBooks(myLibrary);
