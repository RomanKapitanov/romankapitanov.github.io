//1 сохранить
let btnAddField = document.getElementById('btnAddField');

let nameProcess = document.getElementById('nameProcess');
let countSteps = document.getElementById('countSteps');

let timeStart = document.getElementById('timeStart');
let minTimeStart = Number.MAX_VALUE;
let tempVal_for_select;
let counter = 1;

btnAddField.addEventListener('click', () => {
    while (true) {
        var countStepsCheck = countSteps.value ? countSteps.value : undefined;
        var timeStartCheck = timeStart.value ? timeStart.value : undefined;
        if ((countStepsCheck == undefined) || (timeStartCheck == undefined) || (Number(countStepsCheck) <= 0) || (Number(timeStartCheck) < 0)) {
            alert('Корректно заполните все поля');
            break;
        }
        minTimeStart = Math.min(minTimeStart, timeStart.value);

        let linkFTbl =
            `<tr><td>${counter}</td><td>${nameProcess.value}</td><td>${countStepsCheck}</td><td>${timeStartCheck}</td><td>${0}</td></tr>`;
        counter += 1;
        first_table.innerHTML += linkFTbl;
        let linkSTbl =
            `<tr><td class="timeSTbl">${timeStartCheck}</td><td>${nameProcess.value}</td><td>${""}</td><td>${"Создание"}</td><td>${""}</td><td>${0}</td></tr>`;
        second_table.innerHTML += linkSTbl;
        break;
    }
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

    document.getElementById('nameProcess').value = "Имя";
    document.getElementById('countSteps').value = "1";
    document.getElementById('timeStart').value = "0";


    var l = document.getElementById('btnAddProcess');
    l.style.display = 'block';
}
//4 после кнопки "играть"
btnPlay.addEventListener('click', () => {
    $('td').parent().css('background-color', '#98FB98');
    document.querySelector('.event_table').style.display = 'block';
    document.querySelector('.btnProcessing').style.display = 'flex';
    document.getElementById('inputInfoAboutProcess').style.display = 'none';
    document.getElementById('btnAddProcess').style.display = 'none';
    document.querySelector('.nowTimeSTbl').style.display = 'block';
});

//5 текущее время:...

var btn = document.querySelector('.nowTime');
btnEditTime.addEventListener('click', function handleClick() {
    btn.textContent = `Текущее время: ${minTimeStart}`;
    tempVal_for_select = minTimeStart;
});

//6 выбрать следующее текущее 

btnSelectCurrent.addEventListener('click', () => {

    var minVal = Number.MAX_VALUE;
    var $minTr;

    $("#second_table .timeSTbl").each(function () {
        var cellValue = parseFloat($(this).text());

        if (!isNaN(cellValue) && cellValue === parseFloat(tempVal_for_select)) {
            minVal = cellValue;
            $minTr = $(this).parent();
        }
        if (typeof(tempVal_for_select) === 'undefined'){
            alert("Измените время");
        }
    });

    if ($minTr) {
        $minTr.css('background-color', 'yellow');
    }
});

//7 сортировка
btnSort.addEventListener('click', () => {
    var $tableCopy = $("#second_table").clone();

    $tableCopy.find('tr').sort(function (a, b) {
        var aValue = parseFloat($(a).find('.timeSTbl').text());
        var bValue = parseFloat($(b).find('.timeSTbl').text());

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return aValue - bValue;
        } else {
            return 0;
        }
    }).appendTo($tableCopy);

    $("#second_table").replaceWith($tableCopy);

});

//$('span').bind('dblclick', при даблклике редактиррвать
//    function(){
//        $(this).attr('contentEditable',true);
//    });

//timeSTbl
