//1 сохранить
let tableHead = document.getElementById('first_table');
let btnAddField = document.getElementById('btnAddField');

let nameProcess = document.getElementById('nameProcess');
let countSteps = document.getElementById('countSteps');
let timeStart = document.getElementById('timeStart');
let counter = 1;

btnAddField.addEventListener('click', () => {

    let link =
        `<tr><td>${counter}</td><td>${nameProcess.value}</td><td>${countSteps.value}</td><td>${timeStart.value}</td><td>${-1}</td></tr>`;
    counter += 1;
    first_table.innerHTML += link;
});

//2 Добавить процесс
function toggle_visibility(id) {
    var e = document.getElementById('inputInfoAboutProcess');
    e.style.display = 'block';
    var l = document.getElementById('btnAddProcess');
    l.style.display = 'none';
}

//3 отказ
function showhide(id) {
    var e = document.getElementById('inputInfoAboutProcess');
    e.style.display = 'none';

    document.getElementById('nameProcess').value = null;
    document.getElementById('countSteps').value = null;
    document.getElementById('timeStart').value = null;


    var l = document.getElementById('btnAddProcess');
    l.style.display = 'block';
}

//4 Файл -> сохранить
document.querySelector('input[type="button"]').addEventListener('click', function() {
  // Создаем событие клавиатуры для Ctrl+S
  var event = new KeyboardEvent('keydown', {
    key: 's',
    code: 'KeyS',
    ctrlKey: true
  });

  // Диспетчеризуем событие на документе
  document.dispatchEvent(event);
});

document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault(); // Предотвращаем стандартное действие браузера (сохранение страницы)
    
    // Создаем ссылку для скачивания HTML страницы
    var blob = new Blob([document.documentElement.outerHTML], {type: 'text/html'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    
    // Освобождаем ресурсы
    URL.revokeObjectURL(url);
  }
});