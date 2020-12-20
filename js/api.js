const BOOKS_URL = "http://localhost:3000/books";
const USER_URL = "http://localhost:3000/users";

function makeOptions(method, body = {}) {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ users: body }),
  };
}

function generalFetch(url, options = {}) {
  return fetch(url, options).then((res) => res.json());
}

function fetchOneBook(id) {
  return generalFetch(`${BOOKS_URL}/${id}`);
}

function patchBook(id, body) {
  generalFetch(`${BOOKS_URL}/${id}`, makeOptions("PATCH", body))
    // .then((res) => res.json())
    .then((book) => {
      ulForUsers.innerHTML = "";
      populateBookInfo(book);
    });
}
