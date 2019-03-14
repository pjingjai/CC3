fetch('homework2_1.json').then(response => {
        return response.json();
    })
    .then(myJson => {
        employees = myJson;
        //แปลง salary จาก string เป็น number
        iterate(employees, 'salary', toNumber);
        return employees;
    })
    .catch(error => {
        console.error('Error:', error);
    });

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
    for (i in array) {
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