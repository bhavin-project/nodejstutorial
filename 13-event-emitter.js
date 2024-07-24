// Every action on a computer is an event. Like when a connection is made or a file is opened.
// Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file:
// Events Module
// Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.

// To include the built-in Events module use the require() method. In addition, all event properties and methods are an instance of an EventEmitter object. To be able to access these properties and methods, create an EventEmitter object:
// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance

const EventEmitter = require("events");

const customEmitter = new EventEmitter();

// on and emit methods
// keep track of the order
// additional arguments
// built-in modules utilize it

//Assign the event handler to an event:
customEmitter.on("response", (name, id) => {
  console.log(`data recieved user ${name} with id:${id}`);
});

//Assign the event handler to an event:
customEmitter.on("response", () => {
  console.log("some other logic here");
});

//Fire the 'response' event:
customEmitter.emit("response", "Mohan", 34);
