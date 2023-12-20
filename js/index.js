var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var bookMarkListT = document.getElementById('bookMarkListT');
var emptyFiledsError = document.getElementById('empty-fileds');

let bookMarksList = [];

var addBookMark = function () {
  if (!bookmarkName.value || !bookmarkURL.value) {
    emptyFiledsError.classList.replace('d-none', 'd-block');
    return;
  }
  var bookMark = {
    bMname: bookmarkName.value,
    bMurl: bookmarkURL.value,
  };
  bookMarksList.push(bookMark);
  displayBookMarksList(bookMarksList);
};
var displayBookMarksList = function (list) {
  var tableBody = '';
  for (let i = 0; i < list.length; i++) {
    tableBody += `
    <tr>
    <th class="align-middle" scope="row">${i + 1}</th>
    <td class="align-middle">${list[i].bMname}</td>
    <td>
    <a href="${checkURL(list[i].bMurl)}" target="blank" class="btn btn-visit">
    <i class="fa-solid fa-eye pe-2"></i> visit
  </a>  
    </td>
    <td><button class="btn btn-danger" onclick=deleteBookMark(${i})><i class="fa-solid fa-trash-can pe-2" ></i>Delete</button></td>
  </tr>
    `;
  }
  emptyFiledsError.classList.replace('d-block', 'd-none');
  localStorage.setItem('bookMarkListLs', JSON.stringify(list));
  bookMarkListT.innerHTML = tableBody;
  clearForm();
};

var clearForm = function () {
  bookmarkName.value = '';
  bookmarkURL.value = '';
  bookmarkName.classList.remove('is-valid');
  bookmarkURL.classList.remove('is-valid');
};

var deleteBookMark = function (id) {
  bookMarksList.splice(id, 1);
  localStorage.setItem('bookMarkListLs', JSON.stringify(bookMarksList));
  displayBookMarksList(bookMarksList);
};
const checkURL = function (url) {
  if (!url.startsWith('http') || !url.startsWith('https')) {
    return `//${url}`;
  } else {
    return url;
  }
};

function validateURL(url) {
  var regex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var warning = document.getElementById('warning');
  if (regex.test(url)) {
    warning.classList.replace('d-block', 'd-none');
    bookmarkURL.classList.replace('is-invalid', 'is-valid');
  } else {
    bookmarkURL.classList.add('is-invalid');
    warning.classList.replace('d-none', 'd-block');
  }
}

function validatName(name) {
  var regex = /^([a-z0-9]*[a-z]){3}[a-z0-9]*$/i;
  if (regex.test(name)) {
    bookmarkName.classList.replace('is-invalid', 'is-valid');
  } else {
    bookmarkName.classList.add('is-invalid');
  }
}

window.onload = () => {
  var bookMarkListLs = localStorage.getItem('bookMarkListLs');
  if (bookMarkListLs) {
    bookMarksList = JSON.parse(bookMarkListLs);
    displayBookMarksList(bookMarksList);
  }
};
