fetch('homework2_1.json').then(response => {
   return response.json();
})
   .then(myJson => {
      employee = myJson;
   })
   .catch(error => {
      console.error('Error:', error);
   });

function addYearSalary(row) {
   return row.yearSalary = row.salary * 12;
}

function addNextSalary(row) {
   salary = parseInt(row.salary);
   nextSalary = [salary];
   nextSalary.push(nextSalary[0] + (nextSalary[0] * 10 / 100));
   nextSalary.push(nextSalary[1] + (nextSalary[1] * 10 / 100));
   return row.nextSalary = nextSalary;
}

function addAdditionalFields(employee) {
   for (e in employee) {
      addYearSalary(employee[e]);
      addNextSalary(employee[e]);
   }
}