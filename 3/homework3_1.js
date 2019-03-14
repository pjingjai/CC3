fetch('homework2_1.json').then(response => {
   return response.json();
})
   .then(myJson => {
      employees = myJson;
   })
   .catch(error => {
      console.error('Error:', error);
   });

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