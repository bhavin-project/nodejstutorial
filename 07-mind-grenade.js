const num1 = 5;
const num2 = 10;

function addValues() {
  console.log(`the sum is : ${num1 + num2}`);
}

addValues();

//while it's recommended to explicitly export values using module.exports or exports, Node.js allows you to access functions and variables defined in the module scope even if you don't explicitly export them.
