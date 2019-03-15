let employees;
let newEmployees;

fetch('homework2_1.json').then(response => {
    return response.json();
})
    .then(myJson => {
        employees = myJson;
        //แปลง salary จาก string เป็น number
        iterate(employees, 'salary', toNumber);
        return employees;
    })
    .then(employees => {
        newEmployees = addAdditionalFields(employees);
    })
    .catch(error => {
        console.error('Error:', error);
    });

//display employees table
$(function () {
    //create field name row
    $('#people').append("<tr id=\"header1\"></tr>");

    //create record rows
    for (let e in employees) {
        $('#people').append(`<tr id="record1_${e}"></tr>`);
    }

    //append field names
    for (let field in employees[0]) {
        $('#header1').append(`<th>${field}</th>`);
    }

    //append record values
    for (let i = 0; i < employees.length; i++) {
        for (let field in employees[0]) {
            $(`#record1_${i}`).append(`<td>${employees[i][field]}</td>`);
        }
    }

});

//display newEmployees table
$(function () {
    //create field name row
    $('#newPeople').append("<tr id=\"header2\"></tr>");

    //create record rows
    for (let e in newEmployees) {
        $('#newPeople').append(`<tr id="record2_${e}"></tr>`);
    }

    //append field names
    for (let field in newEmployees[0]) {
        $('#header2').append(`<th>${field}</th>`);
    }

    //append record values
    for (let i = 0; i < newEmployees.length; i++) {
        for (let field in newEmployees[0]) {
            if (field !== 'nextSalary'){
                $(`#record2_${i}`).append(`<td>${newEmployees[i][field]}</td>`);
             } else {
                $(`#record2_${i}`).append("<td><ol type='1'>");
                for (let l in newEmployees[i][field]) {
                    $(`#record2_${i} ol`).append(`<li>${newEmployees[i][field][l]}</li>`);
                }
                $(`#record2_${i}`).append("</ol></td>");
            }
                
        }
    }

});

//----------------------------------------

function addAdditionalFields(array) {
    let clonedArray = clone(array);
    for (let i in clonedArray) {
        clonedArray[i]['yearSalary'] = addYearSalary(clonedArray[i]);
        clonedArray[i]['nextSalary'] = addNextSalary(clonedArray[i]);
    }
    return clonedArray;
}

function addYearSalary(row) {
    let clonedRow = clone(row);
    return clonedRow.yearSalary = clonedRow.salary * 12;
}

function addNextSalary(row) {
    let clonedRow = clone(row);
    let salary = parseFloat(clonedRow.salary);
    let nextSalary = [salary];
    nextSalary.push(nextSalary[0] + (nextSalary[0] * 10 / 100));
    nextSalary.push(nextSalary[1] + (nextSalary[1] * 10 / 100));
    return clonedRow.nextSalary = nextSalary;
}

function toNumber(row, property) {
    if (typeof (row[property]) === 'string')
        row[property] = parseFloat(row[property]);
    return row[property];
}

iterate = (array, property, func) => {
    for (let i in array) {
        func(array[i], property);
    }
    return array;
}

function clone(obj) {
    if (typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Array) {
        let newArr = [];
        for (let i in obj) {
            newArr[i] = clone(obj[i]);
        }
        return newArr;
    }
    else {
        let newObj = {};
        for (let i in obj) {
            newObj[i] = clone(obj[i]);
        }
        return newObj;
    }
}