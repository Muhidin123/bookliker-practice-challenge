let bookDiv = document.querySelector("#show-panel");
const div = document.querySelector("#list-panel");
const ul = document.querySelector("#list");
const ulForUsers = document.createElement("ul");
let btn = document.createElement("button");
btn.textContent = "Like";

function makeOneLi(book) {
  let li = document.createElement("li");
  li.textContent = book.title;
  li.dataset.bookId = book.id;
  li.addEventListener("click", (e) => {
    // populateBookInfo(book);
    let bookId = parseInt(e.target.dataset.bookId);
    fetchOneBook(bookId).then((book) => {
      //   bookDiv.innerHTML = "";
      console.log(book);
      populateBookInfo(book);
    });
  });
  ul.append(li);
}

function makeImage(book) {
  let img = document.createElement("img");
  img.src = book.img_url;
  bookDiv.append(img);
}

function makeSubtitle(book) {
  let h4 = document.createElement("h4");
  h4.textContent = book.subtitle;
  bookDiv.append(h4);
}
function makeAuthor(book) {
  let h3 = document.createElement("h3");
  h3 = book.author;
  bookDiv.append(h3);
}

function makeDesc(book) {
  let p = document.createElement("p");
  p.textContent = book.description;
  bookDiv.append(p);
}

function populateBookInfo(book) {
  ulForUsers.innerHTML = "";
  bookDiv.innerHTML = "";
  makeImage(book);
  makeSubtitle(book);
  makeAuthor(book);
  makeDesc(book);
  makeUserLikes(book);
  btn.dataset.bookId = book.id;
  bookDiv.append(btn);
}

function makeUserLikes(book) {
  book.users.forEach((e) => {
    let li = document.createElement("li");
    li.textContent = e.username;
    ulForUsers.append(li);
  });
  bookDiv.append(ulForUsers);
}

generalFetch(BOOKS_URL).then((books) => {
  books.forEach(makeOneLi);
});

btn.addEventListener("click", (e) => {
  console.log(e.target);
  let bookId = parseInt(e.target.dataset.bookId);
  let arrayOfUsers = [];
  fetchOneBook(bookId).then((book) => {
    let user = {
      id: 1,
      username: "pouros",
    };
    let body = book.users;
    body.push(user);
    if (body[body.length - 1].username === "pouros") {
      alert("You liked this book");
    } else {
      patchBook(bookId, body);
    }
  });
});
