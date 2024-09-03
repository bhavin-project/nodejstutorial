console.log(`Process ID: ${process.pid}`);
console.log(`Current working directory: ${process.cwd()}`);

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

console.log("Process env:");
Object.entries(process.env).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// console.log(`Process env: ${JSON.stringify(process.env)}`);

// console.log(`Process memory usase: ${process.memoryUsage()}`);

const memoryUsage = process.memoryUsage();
console.log("Process memory usage:");
Object.entries(memoryUsage).forEach(([key, value]) => {
  console.log(`${key}: ${value} bytes`);
});

console.log(`Uptime: ${process.uptime()} seconds`);

// Simulate some work
setTimeout(() => {
  console.log("Doing some work...");
  process.exit(0); // Exit the process
}, 2000);
