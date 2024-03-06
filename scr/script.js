//1
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

//2
function toggle_visibility(id) {
    var e = document.getElementById('inputInfoAboutProcess');
    e.style.display = 'block';
    var l = document.getElementById('btnAddProcess');
    l.style.display = 'none';
}

//3
function showhide(id) {
    var e = document.getElementById('inputInfoAboutProcess');
    e.style.display = 'none';
    
    document.getElementById('nameProcess').value = null;
    document.getElementById('countSteps').value = null;
    document.getElementById('timeStart').value = null;
    
    
    var l = document.getElementById('btnAddProcess');
    l.style.display = 'block';
}
