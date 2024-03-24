//1 сохранить
let btnAddField = document.getElementById('btnAddField');

let nameProcess = document.getElementById('nameProcess');
let countSteps = document.getElementById('countSteps');

let timeStart = document.getElementById('timeStart');
let minTimeStart = Number.MAX_VALUE;
let tempVal_for_select;
let EVENT = "Создание"
let counter = 1;
let statusPS = "0";
let count;
let numOption = 0;
let count_forLastBtn = 0;

let yellowCellValues = [];
var arrLitTime = [];
let secondArrayAllInfo = [];

btnAddField.addEventListener('click', () => {
    while (true) {
        var countStepsCheck = countSteps.value ? countSteps.value : undefined;
        var timeStartCheck = timeStart.value ? timeStart.value : undefined;
        if ((countStepsCheck == undefined) || (timeStartCheck == undefined) || (Number(countStepsCheck) <= 0) || (Number(timeStartCheck) < 0)) {
            alert('Корректно заполните все поля');
            break;
        }
        arrLitTime.push(Number(timeStart.value));
        console.log(arrLitTime);
        let linkFTbl =
            `<tr><td>${counter}</td><td class = 'edit'>${nameProcess.value}</td><td class = 'edit'>${countStepsCheck}</td><td class = 'edit'>${timeStartCheck}</td><td>${statusPS}</td></tr>`;
        counter += 1;
        first_table.innerHTML += linkFTbl;
        let linkSTbl =
            `<tr><td class="timeSTbl yellow">${timeStartCheck}</td><td class = "edit yellow">${nameProcess.value}</td><td class="yellow">${""}</td><td class = "yellow">${EVENT}</td><td class = "yellow">${""}</td><td class = "status_ps yellow">${statusPS}</td></tr>`;
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
//3 отказ ввод информации о процессе 
function showhideField(id) {
    var e = document.getElementById('inputInfoAboutProcess');
    e.style.display = 'none';

    document.getElementById('nameProcess').value = "Имя";
    document.getElementById('countSteps').value = 1;
    document.getElementById('timeStart').value = 0;


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

    let rowsFT = document.querySelectorAll('#first_table tr');
    let rowsST = document.querySelectorAll('#second_table tr');

    rowsFT.forEach(row => {
        let statusCell = row.querySelector('td:last-child');

        if (statusCell) {
            let currentStatus = statusCell.innerText;

            if (currentStatus === '0') {
                statusCell.innerText = '1';
            }
        }
    });
    rowsST.forEach(row => {
        let statusCell = row.querySelector('td:last-child');

        if (statusCell) {
            let currentStatus = statusCell.innerText;

            if (currentStatus === '0') {
                statusCell.innerText = '1';
            }
        }
    });
});

//5 текущее время:...

btnEditTime.addEventListener('click', function handleClick() {
    btnEditTime.setAttribute('disabled', '');

    if (arrLitTime.length === 0)
        alert("Процессы закончены");

    let rowsSTS = document.querySelectorAll('#second_table tr');
    var btn = document.querySelector('.nowTime');
    for (let i = 0; i < rowsSTS.length; i++) {
        let row = rowsSTS[i];
        let statusOne = row.querySelector('td:last-child');

        if (statusOne && statusOne.innerText === "1" && arrLitTime.length != 0) {

            btn.textContent = `Текущее время: ${Math.min(...arrLitTime)}`;
            tempVal_for_select = Math.min(...arrLitTime);
            return false;
        }
    }
});

//6 выбрать следующее текущее 
btnSelectCurrent.addEventListener('click', () => {

    var tableRowsS = document.getElementById("second_table").getElementsByTagName("tr");
    let minVal = Number.MAX_VALUE;
    var $minTr;
    console.log(arrLitTime);
    console.log(typeof (tempVal_for_select));
    if (typeof (tempVal_for_select) === 'undefined' || tempVal_for_select != Math.min(...arrLitTime)) {
        alert("Измените время");
        return;
    }
    yellowCellValues = [];


    const minTime = Math.min(...arrLitTime);
    const index = arrLitTime.indexOf(minTime);
    if (index !== -1)
        arrLitTime.splice(index, 1);
    console.log(arrLitTime);
    $("#second_table .timeSTbl").each(function () {
        var cellValue = parseFloat($(this).text());
        var $lastCell = $(this).parent().find("td:last");
        var lastCellValue = parseFloat($lastCell.text());
        if (!isNaN(cellValue) && cellValue === parseFloat(tempVal_for_select) && lastCellValue === 1) {
            minVal = cellValue;
            $minTr = $(this).parent();
            console.log($minTr);
            return false;
        }
    });

    let rowsSTS = document.querySelectorAll('#second_table tr');
    for (let i = 0; i < rowsSTS.length; i++) {
        let row = rowsSTS[i];
        let statusOne = row.querySelector('td:last-child');
        if (statusOne && statusOne.innerText === "1" && $minTr) {
            $minTr.css('background-color', 'yellow');
            console.log($minTr);
            break;
        }
    }

    //Забиваем инфу в input (информация о текущем событии )

    $("#second_table .yellow").each(function () {
        if ($(this).parent().css('background-color') === 'rgb(255, 255, 0)') {
            let cellValue = $(this).text();
            yellowCellValues.push(cellValue);
            console.log(yellowCellValues);
            btnProcessCurrentEvent.removeAttribute('disabled', '');
        }
    });
});

//7 сортировка
btnSort.addEventListener('click', () => {
    var $tableCopy = $("#second_table").clone();

    $tableCopy.find('tr').sort(function (a, b) {
        var aValue = parseFloat($(a).find('.timeSTbl').text());
        var bValue = parseFloat($(b).find('.timeSTbl').text());

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return Number(aValue - bValue);
        } else {
            return 0;
        }
    }).appendTo($tableCopy);

    $("#second_table").replaceWith($tableCopy);
});

// обработать текущее событие 
btnProcessCurrentEvent.addEventListener('click', () => {
    if (typeof (yellowCellValues[0]) === "undefined") {
        alert("Выберите следующее текущее");
        return false;
    }
    document.getElementById('timeEvent').value = yellowCellValues[0];
    document.getElementById('processEvent').value = yellowCellValues[1];
    document.getElementById('stepEvent').value = yellowCellValues[2];
    document.getElementById('EvEvent').value = yellowCellValues[3];
    document.querySelector('.btnProcessing').style.display = 'none';
    document.querySelector('.InfoEvent').style.display = 'block';
    document.getElementById('btnPlay').setAttribute('disabled', '');

    console.log(yellowCellValues);
    secondArrayAllInfo.push(yellowCellValues);
    console.log(secondArrayAllInfo);

});

//9 отказ (информация о текущем событии )
function showhideEvent(id) {
    secondArrayAllInfo.pop();
    document.querySelector('.InfoEvent').style.display = 'none';
    document.querySelector('.btnProcessing').style.display = 'flex';
}
//10 завершить процесс (информация о текущем событии)
btnCompleteProcess.addEventListener('click', () => {
    secondArrayAllInfo.pop();

    var tableRowsF = document.getElementById("first_table").getElementsByTagName("tr");
    var tableRowsS = document.getElementById("second_table").getElementsByTagName("tr");

    var linkSTbl = document.createElement('tr');
    linkSTbl.innerHTML = `<td class="timeSTbl yellow">${yellowCellValues[0]}</td><td class="edit yellow">${yellowCellValues[1]}</td><td class="yellow"></td><td class="yellow">Завершился</td><td class="yellow"></td><td class="status_ps yellow">9</td>`;
    linkSTbl.style.backgroundColor = "#FFCBDB";
    document.getElementById("second_table").appendChild(linkSTbl);

    for (var i = 0; i < tableRowsF.length; i++) {
        var cellsF = tableRowsF[i].getElementsByTagName("td");

        if (cellsF.length >= 1 && cellsF[1].textContent.toString() === yellowCellValues[1].toString() && cellsF[3].textContent.toString() === yellowCellValues[0].toString()) {
            tableRowsF[i].style.backgroundColor = "#FFCBDB";
            var statusNineF = tableRowsF[i].querySelector('td:last-child');
            if (statusNineF) {
                let currentStatusF = statusNineF.innerText;

                if (currentStatusF === '1') {
                    statusNineF.innerText = '9';
                    break;
                }
            }
        }
    }
    for (var i = 0; i < tableRowsS.length; i++) {
        var cellsS = tableRowsS[i].getElementsByTagName("td");
        if (cellsS.length >= 5 && cellsS[1].textContent.toString() === yellowCellValues[1].toString() && cellsS[0].textContent.toString() === yellowCellValues[0].toString() && cellsS[3].textContent.toString() === yellowCellValues[3].toString()) {
            tableRowsS[i].style.backgroundColor = "#9ACEEB";
            var statusNineS = tableRowsS[i].querySelector('td:last-child');
            if (statusNineS) {
                let currentStatusS = statusNineS.innerText;

                if (currentStatusS === '1') {
                    statusNineS.innerText = '8';
                    break;
                }
            }
        }

    }
    btnEditTime.removeAttribute('disabled', '');



    yellowCellValues = [];
    document.querySelector('.btnProcessing').style.display = 'flex';
    document.querySelector('.InfoEvent').style.display = 'none';
});
//Добавить новый шаг ps
//Заполнение input полей (Ввод информации о новом событии)
btnNewStep.addEventListener('click', () => {
    document.getElementById('timeNewEvent').value = yellowCellValues[0];
    document.getElementById('NewEvent').value = "Начало";

    var option = document.createElement("option");
    option.text = yellowCellValues[1];
    option.selected = "selected";
    document.getElementById("addOption").appendChild(option);

    document.querySelector('.InfoEvent').style.display = 'none';
    document.querySelector('.Input_info_NEvent').style.display = 'block';


});

//Сохранить (Ввод информации о новом событии)
btnsave.addEventListener('click', () => {
    var name_step = document.getElementById("StepNewEvent").value;
    var how_long = document.getElementById("HowLongEvent").value;

    var linkSTbl = document.createElement('tr');
    linkSTbl.innerHTML = `<td class="timeSTbl">${yellowCellValues[0]}</td><td class="edit">${yellowCellValues[1]}</td><td>${name_step}</td><td>Начало</td><td>${how_long}</td><td class="status_ps">8</td>`;
    linkSTbl.style.backgroundColor = "#9ACEEB";
    document.getElementById("second_table").appendChild(linkSTbl);

    var linkSTbl = document.createElement('tr');
    linkSTbl.innerHTML = `<td class="timeSTbl yellow">${Number(yellowCellValues[0]) + Number(how_long)}</td><td class="edit yellow">${yellowCellValues[1]}</td><td class="yellow">${name_step}</td><td class="yellow">Конец</td><td class"yellow"></td><td class="status_ps yellow">1</td>`;
    document.getElementById("second_table").appendChild(linkSTbl);
    arrLitTime.push(Number(yellowCellValues[0]) + Number(how_long));
    var tableRowsF = document.getElementById("first_table").getElementsByTagName("tr");
    var tableRowsS = document.getElementById("second_table").getElementsByTagName("tr");

    for (var i = 0; i < tableRowsF.length; i++) {
        var cellsF = tableRowsF[i].getElementsByTagName("td");

        if (cellsF.length >= 1 && cellsF[1].textContent.toString() === yellowCellValues[1].toString() && cellsF[3].textContent.toString() === yellowCellValues[0].toString()) {
            tableRowsF[i].style.backgroundColor = "#FFFFFF";
            var statusNineF = tableRowsF[i].querySelector('td:last-child');
            if (statusNineF) {
                let currentStatusF = statusNineF.innerText;

                //                if (currentStatusF === '1') {
                //                    statusNineF.innerText = '8';
                break;
                //                }
            }
        }
    }
    for (var i = 0; i < tableRowsS.length; i++) {
        var cellsS = tableRowsS[i].getElementsByTagName("td");
        if (cellsS.length >= 5 && cellsS[1].textContent.toString() === yellowCellValues[1].toString() && cellsS[0].textContent.toString() === yellowCellValues[0].toString() && cellsS[3].textContent.toString() === yellowCellValues[3].toString()) {
            tableRowsS[i].style.backgroundColor = "#9ACEEB";
            var statusNineS = tableRowsS[i].querySelector('td:last-child');
            if (statusNineS) {
                let currentStatusS = statusNineS.innerText;

                if (currentStatusS === '1') {
                    statusNineS.innerText = '8';
                    break;
                }
            }
        }
    }
    document.querySelector('.Input_info_NEvent').style.display = 'none';
    document.querySelector('.btnProcessing').style.display = 'flex';
    btnEditTime.removeAttribute('disabled', '');
    count_forLastBtn += 1;
    yellowCellValues = [];
});

//Отказ (Ввод информации о новом событии)
function showhideNewEvent(id) {
    document.querySelector('.Input_info_NEvent').style.display = 'none';
    document.querySelector('.InfoEvent').style.display = 'block';
}

//PS в очередь готовых
btnPSQueueReady.addEventListener('click', () => {
    var tableRowsF = document.getElementById("first_table").getElementsByTagName("tr");
    var tableRowsS = document.getElementById("second_table").getElementsByTagName("tr");

    for (var i = 0; i < tableRowsF.length; i++) {
        var cellsF = tableRowsF[i].getElementsByTagName("td");

        if (cellsF.length >= 1 && cellsF[1].textContent.toString() === yellowCellValues[1].toString() && cellsF[3].textContent.toString() === yellowCellValues[0].toString()) {
            tableRowsF[i].style.backgroundColor = "#FFFFFF";
            var statusNineF = tableRowsF[i].querySelector('td:last-child');
            if (statusNineF) {
                let currentStatusF = statusNineF.innerText;

                if (currentStatusF === '1') {
                    statusNineF.innerText = '8';
                    break;
                }
            }
        }
    }
    for (var i = 0; i < tableRowsS.length; i++) {
        var cellsS = tableRowsS[i].getElementsByTagName("td");
        if (cellsS.length >= 5 && cellsS[1].textContent.toString() === yellowCellValues[1].toString() && cellsS[0].textContent.toString() === yellowCellValues[0].toString() && cellsS[3].textContent.toString() === yellowCellValues[3].toString()) {
            tableRowsS[i].style.backgroundColor = "#9ACEEB";
            var statusNineS = tableRowsS[i].querySelector('td:last-child');
            if (statusNineS) {
                let currentStatusS = statusNineS.innerText;

                if (currentStatusS === '1') {
                    statusNineS.innerText = '8';
                    break;
                }
            }
        }
    }
    document.querySelector('.InfoEvent').style.display = 'none';
    document.querySelector('.btnProcessing').style.display = 'flex';
    btnEditTime.removeAttribute('disabled', '');
    count_forLastBtn += 1;
    yellowCellValues = [];
});

//Добавить шаг другого процесса
//Input заполняем (Ввод информации о новом событии222)
btnAddStepProcess.addEventListener('click', () => {
    if (count_forLastBtn < 1) {
        alert("Обработайте текущее событие");//Подумать!!!!!!!!!!!!!!!!!!!!!!!!!!
        return false;
    }
    document.getElementById('timeNewEventTwo').value = tempVal_for_select;
    document.getElementById('NewEventTwo').value = "Начало";
    numOption = 0;
    $("#addOptionTwo").empty();
    for (var i = 0; i < secondArrayAllInfo.length; i++) {
        if (secondArrayAllInfo[i]) {
            var option = document.createElement("option");
            option.text = secondArrayAllInfo[i][1];
            option.value = numOption++;
            document.getElementById("addOptionTwo").appendChild(option);
        }
    }

    document.querySelector('.Input_info_NEventTwo').style.display = 'block';
    document.querySelector('.btnProcessing').style.display = 'none';
});

//Отказ (Ввод информации о новом событии222)
function showhideNewEventTwo(id) {
    document.querySelector('.Input_info_NEventTwo').style.display = 'none';
    document.querySelector('.btnProcessing').style.display = 'flex';
    console.log($("#addOptionTwo").val());
};

//сохранить (Ввод информации о новом событии222)
btnsaveTwo.addEventListener('click', () => {
    var name_step = document.getElementById("StepNewEventTwo").value;
    var how_long = document.getElementById("HowLongEventTwo").value;

    var linkSTbl = document.createElement('tr');
    linkSTbl.innerHTML = `<td class="timeSTbl">${tempVal_for_select}</td><td class="edit">${$("#addOptionTwo option:selected").text()}</td><td>${name_step}</td><td>Начало</td><td>${how_long}</td><td class="status_ps">8</td>`;
    linkSTbl.style.backgroundColor = "#9ACEEB";
    document.getElementById("second_table").appendChild(linkSTbl);

    var linkSTbl = document.createElement('tr');
    linkSTbl.innerHTML = `<td class="timeSTbl yellow">${Number(tempVal_for_select) + Number(how_long)}</td><td class="edit yellow">${$("#addOptionTwo option:selected").text()}</td><td class="yellow">${name_step}</td><td class="yellow">Конец</td><td class="yellow"></td><td class="status_ps yellow">1</td>`;
    document.getElementById("second_table").appendChild(linkSTbl);
    arrLitTime.push(Number(tempVal_for_select) + Number(how_long));
    document.querySelector('.Input_info_NEventTwo').style.display = 'none';
    document.querySelector('.btnProcessing').style.display = 'flex';
    count_forLastBtn -= 1;
});
