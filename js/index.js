var bookmarkName = document.getElementById('bookmarkName');
var bookmarkURL = document.getElementById('bookmarkURL');
var bookMarkListT = document.getElementById('bookMarkListT');
var emptyFiledsError = document.getElementById('empty-fileds');
var submitBtn = document.getElementById('submitBtn');
var updateBtn = document.getElementById('updateBtn');
var searchInput = document.getElementById('searchInput');

var bookMarksList = [];
var inexToUpdate = -1;
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
  localStorage.setItem('bookMarkListLs', JSON.stringify(bookMarksList));
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
    <td><button class="btn btn-warning" onclick=updateBM(${i}) ><i class="fa-solid fa-marker pe-2"></i>update</button></td>
  </tr>
    `;
  }
  emptyFiledsError.classList.replace('d-block', 'd-none');
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

var updateBM = function (id) {
  inexToUpdate = id;
  bookmarkName.value = `${bookMarksList[id].bMname}`;
  bookmarkURL.value = `${bookMarksList[id].bMurl}`;
  submitBtn.classList.add('d-none');
  updateBtn.classList.replace('d-none', 'd-block');
  //put the old data in the form
  // replace the submit button to update btn => when click the btn it should update the element to the new data .in the same index , using map .
};
var updateBookMark = function () {
  if (inexToUpdate > -1) {
    const updatedBM = {
      bMname: bookmarkName.value,
      bMurl: bookmarkURL.value,
    };
    bookMarksList[inexToUpdate] = updatedBM;
    localStorage.setItem('bookMarkListLs', JSON.stringify(bookMarksList));
    displayBookMarksList(bookMarksList);
    inexToUpdate = -1;
  }

  submitBtn.classList.replace('d-none', 'd-block');
  updateBtn.classList.replace('d-block', 'd-none');
  clearForm();
};

var searchBookMark = function (text) {
  const newList = bookMarksList.filter((item) => item.bMname.includes(text));
  displayBookMarksList(newList);
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
