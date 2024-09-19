const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

// static assets
app.use(express.static("./methods-public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/api/people", people);
app.use("/login", auth);

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

// Using express.Router() in an Express.js application offers several advantages, particularly in terms of organization, modularity, and maintainability of your code. Here’s a detailed overview of the benefits of using routers and the potential consequences of not using them.
// Advantages of Using express.Router()
// Modularity:
// Routers allow you to break your application into smaller, manageable pieces. Each router can handle a specific set of routes related to a particular feature or resource (e.g., users, products), making your codebase cleaner and easier to navigate.
// Separation of Concerns:
// By using routers, you can separate different functionalities of your application. For instance, you can have a dedicated router for authentication and another for managing resources like users or products. This separation helps in maintaining and updating code without affecting unrelated parts of the application.
// Middleware Management:
// Routers can have their own middleware functions. This means you can apply specific middleware to a group of routes without affecting the entire application. For example, you can have authentication middleware that only applies to routes in an authRouter.
// Cleaner Code:
// Using routers leads to less clutter in your main application file (e.g., app.js). Instead of having all routes defined in one place, you can define them in separate files, making the main file easier to read and manage.
// Easier Testing:
// With modular routes, it becomes easier to write unit tests for specific parts of your application. Each router can be tested independently, which simplifies the testing process and improves code reliability.
// Scalability:
// As your application grows, maintaining a single file with all routes can become cumbersome. Using routers allows you to scale your application more effectively by adding new features without cluttering existing code.
// Consequences of Not Using express.Router()
// Code Clutter:
// Without routers, your main application file can become overcrowded with route definitions, making it difficult to read and manage. This can lead to confusion, especially in larger applications.
// Tight Coupling:
// All routes being in one file can lead to tight coupling of different functionalities, making it harder to modify or extend the application. Changes in one part of the code might inadvertently affect other parts.
// Difficulty in Maintenance:
// Maintaining and debugging a large file with numerous routes can be challenging. It may become difficult to locate specific route handlers or middleware, leading to increased development time and potential errors.
// Limited Reusability:
// Without routers, you may find it hard to reuse route definitions or middleware across different parts of your application or in different applications altogether. Routers promote reusability by allowing you to export and import route modules easily.
// Less Organized Middleware:
// Applying middleware globally can lead to unintended consequences, as it may affect routes that do not require that middleware. With routers, you can apply middleware specifically to routes that need it, avoiding such issues.
// In summary, using express.Router() greatly enhances the organization and maintainability of an Express.js application, especially as it scales. Not using routers can lead to a disorganized codebase that is harder to manage and extend over time.
