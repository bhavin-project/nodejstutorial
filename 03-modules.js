// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)
const names = require("./04-names");
const sayHi = require("./05-utils");
const data = require("./06-alternative-flavor");
require("./07-mind-grenade");
sayHi("Hiren");
sayHi(names.mahesh);
sayHi(names.nirav);
console.log(data.items[1]);
