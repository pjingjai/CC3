let employees;

fetch('homework2_1.json').then(response => {
   return response.json();
})
   .then(myJson => {
       employees = myJson;
       //แปลง salary จาก string เป็น number
       iterate(employees, 'salary', toNumber);
       addAdditionalFields(employees);
       return employees;
   })
   .catch(error => {
       console.error('Error:', error);
   });

$(function () {
   //create field name row
   $('#people').append("<tr id=\"header\"></tr>");

   //create record rows
   for (let e in employees) {
       $('#people').append(`<tr id="record${e}"></tr>`);
   }

   //append field names
   for (let field in employees[0]) {
       $('#header').append(`<th>${field}</th>`);
   }

   //append record values
   for (let i = 0; i < employees.length; i++) {
       for (let field in employees[0]) {
           if (field !== 'nextSalary'){
               $(`#record${i}`).append(`<td>${employees[i][field]}</td>`);
            } else {
               $(`#record${i}`).append("<td><ol type='1'>");
               for (let l in employees[i][field]) {
                   $(`#record${i} ol`).append(`<li>${employees[i][field][l]}</li>`);
               }
               $(`#record${i}`).append("</ol></td>");
           }
               
       }
   }

});

//--------------------------------------

function addYearSalary(row) {
   return row.yearSalary = row.salary * 12;
}

function addNextSalary(row) {
   let salary = parseFloat(row.salary);
   let nextSalary = [salary];
   nextSalary.push(nextSalary[0] + (nextSalary[0] * 10 / 100));
   nextSalary.push(nextSalary[1] + (nextSalary[1] * 10 / 100));
   return row.nextSalary = nextSalary;
}

function addAdditionalFields(array) {
   for (let i in array) {
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
   for (let i in array) {
      func(array[i], property);
   }
   return array;
}