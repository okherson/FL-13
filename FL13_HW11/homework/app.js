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
// TODO: your code goes here
console.log(data);

function createTreeDom(obj) {
  if(!obj) {
    return ;
  }
  let ul = document.createElement('ul');
  for(let el of obj) {
    let li = document.createElement('li');
    li.innerHTML = el['title'];
    ul.append(li);
    setLiListeners(li);
    if (!el['folder']) {
      li.setAttribute('class', 'file');
    } else {
      li.setAttribute('class', 'closed folder');
      let folderElementsLi = document.createElement('li');
        ul.append(folderElementsLi);

      let childrenEl;
      // childrenEl.setAttribute('hidden', true)
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

(function contextMenuListener() {
  let menu = document.getElementsByClassName('context-menu');
  rootNode.addEventListener( 'contextmenu', function(e) {
    if(e) {
      target = e.target;
      e.preventDefault();
      const menuPosition = getMenuPosition(e);
      menu[0].style.left = menuPosition.x + 'px';
      menu[0].style.top = menuPosition.y + 'px';
      menu[0].classList.add('display');
      if (target.classList.contains('file') || target.classList.contains('folder')) {
        target.setAttribute('tabindex', '0');
        target.focus();
        if (menu[0].classList.contains('passive')) {
          menu[0].classList.remove('passive');
        }
        // menuEventParser(e.target);
      } else {
        menu[0].classList.add('passive');
      }
    }
  });
  document.addEventListener('click', () => {
    if (menu[0].classList.contains('display')) {
      menu[0].classList.remove('display');
    }
  })
})();

function getMenuPosition(e) {
  if (e) {
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x: posx, y: posy }
  }
  return ;
}

// function menuEventParser() {
//   if(target) {
//     let renameItem = document.getElementById('renameItem');
//     let deleteItem = document.getElementById('deleteItem');
//     renameItem.addEventListener('click', () => {
//       console.log('rename'+ target);


//     });
//     deleteItem.addEventListener('click', () => {
//       // document.remove(target);
//       console.log('removing next element');
//       // target.removeEventListener('click');
//       let targetParent = target.parentNode;
//       console.log(target);
//       console.log(targetParent);
//       console.log(targetParent.children);
//       target.remove();
//       target = null;
//       if(targetParent.children.length === 0) {
//         // let childrenEl = document.createElement('span');
//         targetParent.parentNode.innerHTML = 'Folder is empty';
//         // targetParent.append(childrenEl);
//         // console.log('add text');
//       }
//       // console.log(targetParent);

//     });
//   }
// }
rootNode.append(createContentMenu());
rootNode.append(createTreeDom(data));
