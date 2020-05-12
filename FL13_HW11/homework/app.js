const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
let target;

function createTreeDom(obj) {
  if(!obj) {
    return ;
  }
  let ul = document.createElement('ul');
  for(let el of obj) {
    let li = document.createElement('li');
    li.innerHTML = `${el['title']}`;
    li.setAttribute('tabindex', '0');
    li.style.cursor = 'pointer';
    ul.append(li);
    setLiListeners(li);
    if (!el['folder']) {
      li.setAttribute('class', 'file');
    } else {
      li.setAttribute('class', 'closed folder');
      let folderElementsLi = document.createElement('li');
        ul.append(folderElementsLi);

      let childrenEl;
      if (el['children']) {
        childrenEl = createTreeDom(el['children']);
      } else {
        childrenEl = document.createTextNode('Folder is empty');
      }
      folderElementsLi.append(childrenEl);
    }
  }
  return ul;
}

function setLiListeners(el) {
  el.addEventListener('click', (e) => {
    if (e.buttons === 0 && el.classList.contains('folder')) {
      el.classList.toggle('closed');
      el.blur();
    }
  });
}

rootNode.append(createTreeDom(data));
function createContentMenu() {
  let menu = document.createElement('div');
  menu.setAttribute('class', 'context-menu');
  let renameItem = document.createElement('div');
  renameItem.innerHTML = 'Rename';
  renameItem.setAttribute('id', 'renameItem');
  let deleteItem = document.createElement('div');
  deleteItem.innerHTML = 'Delete item';
  deleteItem.setAttribute('id', 'deleteItem');
  menu.append(renameItem);
  menu.append(deleteItem);
  return menu;
}

rootNode.append(createContentMenu());

function setRange(el) {
  let range = new Range();
  range.setStart(el.firstChild, 0);
  el.classList.contains('file') ? range.setEnd(el.firstChild, el.innerHTML.indexOf('.')) :
  range.setEnd(el.firstChild, el.innerHTML.length);
  window.getSelection().addRange(range)
}

function renameElement() {
  if(target) {
    target.focus();
    target.setAttribute('contenteditable', true);
    setRange(target);
    document.addEventListener('click', () => {
      if (event.button === 0 && target.getAttribute('contenteditable') && event.target.textContent !== 'Rename') {
        target.setAttribute('contenteditable', false);
      }
    });
  }
}

function deleteElement() {
  if(target) {
    let targetParent = target.parentNode;
    if(target.classList.contains('folder')) {
      target.nextSibling.remove();
    }
    target.remove();
    if(targetParent.children.length === 0) {
      targetParent.parentNode.innerHTML = 'Folder is empty';
    }
  }
}

(function contextMenuListener() {
  let menu = rootNode.lastChild;
  let renameItem = document.getElementById('renameItem');
  let deleteItem = document.getElementById('deleteItem');
rootNode.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    target = e.target;
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    if (target.classList.contains('file') || target.classList.contains('folder')) {
      menu.classList.remove('disabled');
    } else {
      menu.classList.add('disabled');
    }
    menu.classList.add('active');
    renameItem.addEventListener('click', renameElement);
    deleteItem.addEventListener('click', deleteElement);
  })
  document.addEventListener('click', () => {
    if(menu.classList.contains('active')) {
      renameItem.removeEventListener('click', renameElement);
      deleteItem.removeEventListener('click', deleteElement);
      menu.classList.remove('active');
    }
  }, false);
})();