// authorize.js
const authorize = (req, res, next) => {
  const user = { name: "Naresh Matre", id: 1 }; // Simulated user data
  req.user = user; // Attach user information to the request object
  console.log("User authorized:", user);
  next(); // Call the next middleware or route handler
};

module.exports = authorize;
