const buttons = document.querySelectorAll('.calculator button');
const result = document.querySelector('.result');
let stack = [];


const csvHeader = 'Timestamp,Button Click\n'; // Add the following code to create a CSV file and write the header
const csvData = [];
csvData.push(csvHeader);

function updateResult() {
  result.textContent = stack.join(' ');
}

function pushNumber(number) {
  stack.push(number);
  updateResult();
  
  const timestamp = new Date().toLocaleString(); // add timestamp
  const csvRow = `${timestamp},Number: ${number}\n`;  // this is how we log each click
  csvData.push(csvRow);
}

function popNumbers(count) {
  const popped = stack.splice(-count);
  updateResult();
  return popped;
}

function operate(operator) {
  const [b, a] = popNumbers(2);
  switch (operator) {
    case '+':
      pushNumber(a + b);
      break;
    case '-':
      pushNumber(a - b);
      break;
    case '*':
      pushNumber(a * b);
      break;
    case '/':
      pushNumber(a / b);
      break;
  }
  
  const timestamp = new Date().toLocaleString(); // add timestamp
  const csvRow = `${timestamp},Operator: ${operator}\n`; // This is how we log each click
  csvData.push(csvRow);
}

buttons.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault(); // Prevent default behavior
    const value = button.value;
    if (Number.isInteger(+value)) {
      pushNumber(+value);
    } else if (value === "+"
      || value === "-"
      || value === "*"
      || value === "/") {
      operate(value);
    } else if (value === "Enter") {
      const timestamp = new Date().toLocaleString(); // add timestamp
      const csvRow = `${timestamp},Enter\n`; // log enter with timestamp
      csvData.push(csvRow);
    } else if (value === "C") {
      stack = [];
      updateResult();
    }
    
   
    if (value === "Download CSV") { //download csv button functionality
      const csvContent = csvData.join('');
      const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'button_clicks.csv');
      document.body.appendChild(link);
      link.click();
    }
  });
});