const root = document.getElementById('root');

function createSection1() {
  let section1 = document.createElement('div');
  section1.setAttribute('id', 'section1');
  let sectionName = document.createElement('h2');
  sectionName.innerText = 'Book\'s list';
  let bookList = document.createElement('div');
  bookList.setAttribute('id', 'bookList');
  let addBook = document.createElement('input');
  addBook.setAttribute('type', 'button');
  addBook.setAttribute('id', 'addBookBtn');
  addBook.setAttribute('class', 'btn');
  addBook.setAttribute('value','ADD');
  addBook.setAttribute('onclick', 'changeHash("", "add")');
  section1.appendChild(sectionName);
  section1.appendChild(bookList); 
  section1.appendChild(addBook);
  root.appendChild(section1);
}
createSection1();
function createSection2() {
  let section2 = document.createElement('div');
  section2.setAttribute('id', 'section2');
  let sectionName = document.createElement('h2');
  sectionName.setAttribute('id', 'contentHeader');
  let content = document.createElement('div')
  content.setAttribute('id', 'content');
  let bookPreview = document.createElement('div');
  bookPreview.setAttribute('id', 'bookPreview');
  root.appendChild(section2);
  section2.appendChild(sectionName);
  section2.appendChild(content);
  content.appendChild(bookPreview);
}
createSection2();

function creatingForm() {
  let section2 = document.getElementById('content');
  let form = document.createElement('form');
  let idHolder = document.createElement('div');
  idHolder.setAttribute('class', 'bookIdHolder');
  let bookName = document.createElement('label');
  bookName.innerHTML = `<span>BOOK TITLE:</span><input id='bookName' required="true" type='text'></input>`;
  let bookAuthor = document.createElement('label');
  bookAuthor.innerHTML = `<span>BOOK AUTHOR:</span><input required='true' id='bookAuthor' type='text'></input>`;
  let bookImgUrl = document.createElement('label');
  bookImgUrl.innerHTML = `<span>BOOK IMG URL:</span><input id='bookImgUrl' required='true' type='text'></input>`;
  let bookPlot = document.createElement('label');
  bookPlot.innerHTML = `<span>BOOK PLOT:</span><textarea id='bookPlot' required='true'></textarea>`;
  let cancel = document.createElement('input');
  cancel.setAttribute('type', 'button');
  cancel.setAttribute('class', 'btn');
  cancel.setAttribute('value', 'CANCEL');
  cancel.setAttribute('onclick', 'cancelBtn()');
  let save = document.createElement('input');
  save.setAttribute('class', 'btn');
  save.setAttribute('type', 'button');
  save.setAttribute('value', 'SAVE');
  save.setAttribute('onclick', 'formConfirmBtn()');
  section2.appendChild(form);
  form.appendChild(idHolder);
  form.appendChild(bookName);
  form.appendChild(bookAuthor);
  form.appendChild(bookImgUrl);
  form.appendChild(bookPlot);
  form.appendChild(save);
  form.appendChild(cancel);
}
creatingForm();

function setBookList() {
  let element;
  let bookView;
  let editBtn;
  let key; 
  let lastBook = +localStorage.getItem('lastBookUid');
  let bookList = document.getElementById('bookList');
  element = bookList.firstChild;
  for(let i = 0; i <= lastBook; i++) {
    if(localStorage.getItem(i)) {
      key = '' + i;
      if (!element) {
        element = document.createElement('div');
        element.setAttribute('class', 'bookListElement');
        bookList.appendChild(element);
      }
      bookView = `<div><a onclick="changeHash(${key}, 'preview')" href="#preview" class="link-previewBook" 
        id='${key}'>${JSON.parse(localStorage.getItem(i)).name}</a></div>`;
      editBtn = `<input type='button' onclick="changeHash(${key}, 'edit')" class="bnt" value='EDIT'>`
      element.innerHTML = bookView + editBtn;
      element = element.nextSibling;
    }
  }
}
setBookList();

function previewBook(id) {
  let book = JSON.parse(localStorage.getItem(id));
  let preview = document.getElementById('bookPreview');
  let name = `<p><span>BOOK TITLE: </span>${book['name']}</p>`;
  let author = `<p><span>BOOK AUTHOR: </span>${book['author']}</p>`;
  let imgUrl = `<img src="${book['img_url']}">`;
  let plot = `<p><span>BOOK PLOT: </span>${book['plot']}</p>`;
  preview.innerHTML = imgUrl + name + author + plot;
}

function editBook(id) {
  let book = JSON.parse(localStorage.getItem(id));
  if (book) {
    let idHolder = document.querySelector('.bookIdHolder');
    let name = document.getElementById('bookName');
    let author = document.getElementById('bookAuthor');
    let imgUrl = document.getElementById('bookImgUrl');
    let plot = document.getElementById('bookPlot');
    idHolder.setAttribute('id', id);
    name.setAttribute('value', `${book['name']}`);
    author.setAttribute('value', `${book['author']}`);
    imgUrl.setAttribute('value', `${book['img_url']}`);
    plot.innerText = book['plot'];
  }
}

function cancelBtn() {
  if(window.confirm('Discard changes?')) {
    window.history.back();
    parseUrl();
  }
}

function formConfirmBtn() {
  if (!location.hash) {
    return ;
  }
  let newBook = {};
  let id;
  let timeout = 300;
  let idHolder = document.querySelector('.bookIdHolder');
  let name = document.getElementById('bookName');
  let author = document.getElementById('bookAuthor');
  let imgUrl = document.getElementById('bookImgUrl');
  let plot = document.getElementById('bookPlot');
  if(!idHolder.id) {
    id = +localStorage.getItem('lastBookUid');
    id++;
    localStorage.setItem('lastBookUid', id);
  } else {
    id = idHolder.id;
  }
  newBook.name = name.value;
  newBook.author = author.value;
  newBook.img_url = imgUrl.value;
  newBook.plot = plot.value
  localStorage.setItem(id, JSON.stringify(newBook));
  setBookList();
  window.history.pushState('', '', `./index.html?id=${id}#preview`);
  parseUrl();
  setTimeout(alert('Book successfully updated'), timeout);
}

function clearForm() {
  let idHolder = document.querySelector('.bookIdHolder');
  let name = document.getElementById('bookName');
  let author = document.getElementById('bookAuthor');
  let imgUrl = document.getElementById('bookImgUrl');
  let plot = document.getElementById('bookPlot');
  if (name.value) {
    idHolder.removeAttribute('id');
    name.setAttribute('value', '');
    author.setAttribute('value', '');
    imgUrl.setAttribute('value', '');
    plot.innerText = '';
  }
}

function displayingSection2(currentHash) {
  let contentHeader = document.getElementById('contentHeader');
  let form = document.getElementsByTagName('form')[0];

  let preview = document.getElementById('bookPreview');
  if(currentHash === 'add') {
    clearForm();
    form.reset();
    contentHeader.innerText = 'ADD NEW BOOK';
    preview.style.display = 'none';
    form.style.display = 'block';
  } else if(currentHash === 'edit'){
    form.reset();
    clearForm();
    contentHeader.innerText = 'EDIT BOOK';
    preview.style.display = 'none';
    form.style.display = 'block';
  } else if(currentHash === 'preview') {
    contentHeader.innerText = 'BOOK PREVIEW';
    preview.style.display = 'block';
    form.style.display = 'none';
  } else {
    preview.style.display = 'none';
    form.style.display = 'none';
  }
}

function updatestate(bookId, currentHash) {
  if(!currentHash) {
    return ;
  }
  let links = {
    preview: previewBook,
    edit: editBook
  }
  displayingSection2(currentHash);
  if (currentHash === 'edit' || currentHash === 'preview') {
    links[currentHash](bookId);
  }
}

function changeHash(uid, action) {
  let state;
  if (action === 'add' && (!uid || uid === '')) {
    state = './index.html#add';
  } else if ((action === 'edit' || action === 'preview') && localStorage.getItem(uid)) {
    state = `./index.html?id=${uid}#${action}`;
  } else {
    state = './index.html';
  }
  window.history.pushState({}, '', ''+state);
    parseUrl();
}

window.addEventListener('popstate', parseUrl());

function parseUrl() {
  let currentHash, bookId;
  currentHash = location.hash.slice(1);
  if(location.search) {
    bookId = location.search.match(/[0-9]+/)[0];
  }
  if (currentHash === 'add') {
    updatestate(bookId, currentHash);
  } else if ((currentHash !== 'preview' || currentHash !== 'edit') && localStorage.getItem(bookId)) {
    updatestate(bookId, currentHash);
  } else {
    window.history.pushState({}, '', './index.html');
    currentHash = '';
    bookId = null;
  }
}
