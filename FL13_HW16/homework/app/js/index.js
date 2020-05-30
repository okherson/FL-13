const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

function loadingWindow() {
  const container = document.getElementById('app-container');
  const loading = document.createElement('div');
  loading.setAttribute('id', 'loadingWindow');
  loading.innerHTML = 'Loading...';
  container.appendChild(loading);  
}
loadingWindow();

function containerElements() {
  const container = document.getElementById('app-container');
  let header = document.createElement('h2');
  header.innerText = 'Manage User App';
  let form = document.createElement('form');
  let name = document.createElement('input');
  name.setAttribute('type', 'text');
  name.setAttribute('placeholder', 'Name');
  name.setAttribute('name', 'name');
  name.setAttribute('id', 'newName');
  let userName = document.createElement('input');
  userName.setAttribute('type', 'text');
  userName.setAttribute('placeholder', 'User Name');
  userName.setAttribute('name', 'username');
  userName.setAttribute('id', 'newUserName');
  let addUserBtn = document.createElement('input');
  addUserBtn.setAttribute('type', 'button');
  addUserBtn.setAttribute('value', 'Add New User');
  addUserBtn.setAttribute('id', 'addUserBtn');
  addUserBtn.setAttribute('onclick', `createNewUser()`);
  form.appendChild(name);
  form.appendChild(userName);
  form.appendChild(addUserBtn);
  container.appendChild(header);
  container.appendChild(form);
  let usersList = document.createElement('table');
  usersList.setAttribute('id', 'usersList');
  container.appendChild(usersList);
}
containerElements();

function listOfUsers() {
  const SUCCESS_STATUS = 200;
  const loadingWindow = document.getElementById('loadingWindow');
  const xhr = new XMLHttpRequest();
  xhr.open('GET', baseUrl + '/users');
  xhr.send();
  xhr.onload = function() {
    if (xhr.status !== SUCCESS_STATUS) {
      console.log(`Error ${xhr.status}:${xhr.statusText}`);
    } else {
      const users = JSON.parse(xhr.response);
      const usersList = document.getElementById('usersList');
      let list = '';
      for (let user of users) {
        list += `<tr id=${user.id}>`+
          `<td class='userIdTd' >${user.id}</td>`+
          `<td><input id="name${user.id}" type="text" value='${user.name}'></td>`+
          `<td><input id="username${user.id}" type="text" value='${user.username}'></td>`+
          `<td><input class='listBtn' type="button" value='Update' onclick='updateUser("${user.id}")'></td>`+
          `<td><input class='listBtn' type="button" value='Delete' onclick='deleteUser("${user.id}")'></td>`+
        `</tr>`;
      }
      usersList.innerHTML = list;
      loadingWindow.style.display = 'none';
    }
  }
}

function createNewUser() {
  const SUCCESS_STATUS = 201;
  const name = document.getElementById('newName');
  const username = document.getElementById('newUserName');
  if (!name.value || !username.value) {
    alert('Name or username was not set. Please try again.');
    return ;
  }
  const loadingWindow = document.getElementById('loadingWindow');
  loadingWindow.style.display = 'block';
  const xhr = new XMLHttpRequest();
  const json = JSON.stringify({'name' : name.value, 'username' : username.value});
  xhr.open('POST', baseUrl + '/users');
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(json);
  xhr.onload = () => {
    xhr.status !== SUCCESS_STATUS ? console.log(`Error ${xhr.status}:${xhr.statusText}`)
        : listOfUsers();
  }
  name.value = '';
  username.value = '';
}

function updateUser(userId) {
  const SUCCESS_STATUS = 204;
  const newName = document.getElementById('name'+userId).value;
  const newUserName = document.getElementById('username'+userId).value;
  if (!newName || !newUserName) {
    alert('Make attention, name or username could not be empty.');
    return ;
  }
  const loadingWindow = document.getElementById('loadingWindow');
  loadingWindow.style.display = 'block';
  const xhr = new XMLHttpRequest();
  const json = JSON.stringify({'name' : newName, 'username' : newUserName});
  xhr.open('PUT', baseUrl + '/users/' + userId);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.send(json);
  xhr.onload = () => {
    xhr.status !== SUCCESS_STATUS ? console.log(`Error ${xhr.status}:${xhr.statusText}`)
      : listOfUsers();
  }
}

function deleteUser(userId) {
  const SUCCESS_STATUS = 204;
  const loadingWindow = document.getElementById('loadingWindow');
  loadingWindow.style.display = 'block';
  const xhr = new XMLHttpRequest();
  xhr.open('Delete', baseUrl + '/users/' + userId);
  xhr.setRequestHeader('Authorization', 'admin');
  xhr.send();
  xhr.onload = () => {
    xhr.status !== SUCCESS_STATUS ? console.log(`Error ${xhr.status}:${xhr.statusText}`)
      : listOfUsers();
  }
}
