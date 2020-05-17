const FIRST_BOOK = [
  'JAVASCRIPT. ПОДРОБНОЕ РУКОВОДСТВО. 6-Е ИЗД',
  'Дэвид Флэнаган',
  'https://i.grenka.ua/shop/1/1/253/JavaScript--Podrobnoe-rukovodstvo--6-e-izd_12186_1.png',
  `ПРОСТО О СЛОЖНОМ.\nРегулярно ищете в интернете сведения по Java? Разработчикам приложений для Web 2.0 иногда 
  приходится несладко, ведь их профессия – одна из самыхпередовых. Если на работе что-то вылетело из памяти – 
  вспоминать придется самостоятельно: спрашивать просто не у кого! Для таких случаев есть «JavaScript. 
  Подробное руководство». Купите эту книгу – обретете помощника и учителя под одной обложкой. 
  Издание подойдет как опытным программистам, так и новичкам, которые хотят изучить Java, 
  не прибегая для этого к помощи платных курсов.`
];
const SECOND_BOOK = [
  'Clean Code: A Handbook of Agile Software Craftsmanship',
  'Robert C. Martin',
  'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg',
  `Programming is about polishing the craft with years of trial and error. I wish there was a way to save yourself 
  from all the hard work by learning from the mistakes of other programmers? Fortunately, there is, and it is known 
  to the world as the Clean Code: A Handbook of Agile Software Craftsmanship book from the legendary Uncle Bob.
  \nThe clean code offers invaluable insights into code cleaning and software development. It has thorough, 
  step-by-step explanations on cleaning, writing, and refactoring code. The programming book has a galore of 
  practical examples about the how and why of writing clean code. Post successful completion of the Clean Code 
  book, you will be able to effortlessly implement Agile methodology, one of the leading forms of SDLC, in your 
  software development projects. Also, you will find yourself to be a more resolute, disciplined programmer than 
  before.`
];
const THIRD_BOOK = [
  'Design Patterns. Elements of Reusable Object-Oriented Software.',
  'Richard Helm',
  'https://images-na.ssl-images-amazon.com/images/I/51szD9HC9pL._SX395_BO1,204,203,200_.jpg',
  `Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a 
  catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 
  patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to 
  rediscover the design solutions themselves. The authors begin by describing what patterns are and how they can 
  help you design object-oriented software. They then go on to systematically name, explain, evaluate, and catalog 
  recurring designs in object-oriented systems. With Design Patterns as your guide, you will learn how these 
  important patterns fit into the software development process, and how you can leverage them to solve your own 
  design problems most efficiently.`
];

let setLocalBook = (id, bookArr) => {
  if (!localStorage.getItem(id)) {
    let newBook = {};
    const SECOND = 2;
    const THIRD = 3;
    newBook.name = bookArr[0];
    newBook.author = bookArr[1];
    newBook.img_url = bookArr[SECOND];
    newBook.plot = bookArr[THIRD];  
    localStorage.setItem(id, JSON.stringify(newBook));
    localStorage.setItem('lastBookUid', id);
  }
}

setLocalBook('0', FIRST_BOOK);
setLocalBook('1', SECOND_BOOK);
setLocalBook('2', THIRD_BOOK);
