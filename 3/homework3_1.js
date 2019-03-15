let employees;

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

//display employees table
$(function () {
   //create field name row
   $('#people').append("<tr id=\"header1\"></tr>");

   //create record rows
   for (e in employees) {
       $('#people').append(`<tr id="record1_${e}"></tr>`);
   }

   //append field names
   for (field in employees[0]) {
       $('#header1').append(`<th>${field}</th>`);
   }

   //append record values
   for (i = 0; i < employees.length; i++) {
       for (field in employees[0]) {
           $(`#record1_${i}`).append(`<td>${employees[i][field]}</td>`);
       }
   }

});

//--------------------------------------

function addNextSalary(row) {
   let salary = parseFloat(row.salary);
   let nextSalary = [salary];
   nextSalary.push(nextSalary[0] + (nextSalary[0] * 10 / 100));
   nextSalary.push(nextSalary[1] + (nextSalary[1] * 10 / 100));
   return row.nextSalary = nextSalary;
}

function addAdditionalFields(array) {
   for (i in array) {
      addYearSalary(array[i]);
      addNextSalary(array[i]);
   }
   return array;
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