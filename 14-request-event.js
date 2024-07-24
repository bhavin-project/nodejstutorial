const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Welcome");
// });

// Using Event Emitter API
const server = http.createServer();
// emits request event
// subcribe to it / listen for it / respond to it
server.on("request", (req, res) => {
  console.log("Request method:", req.method);
  console.log("Request headers:", req.headers);
  res.end("Welcome");
});

// server.on("request", (req, res) => {
//   if (req.url === "/favicon.ico") {
//     res.writeHead(204); // Send a 204 No Content response
//     res.end();
//     return;
//   }

//   console.log("Request method:", req.method);
//   console.log("Request headers:", req.headers);
//   res.end("Welcome");
// });

server.listen(5000);
