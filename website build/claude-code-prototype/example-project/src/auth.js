// Authentication module
const crypto = require('crypto');
const fs = require('fs');

// User database (in real app, this would be a proper database)
const users = [];

// Helper function to hash passwords
function hashPassword(password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

// Register a new user
function registerUser(username, password) {
  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return { success: false, message: 'User already exists' };
  }

  // Generate a salt
  const salt = crypto.randomBytes(16).toString('hex');

  // Hash the password
  const hashedPassword = hashPassword(password, salt);

  // Create new user
  const newUser = {
    id: users.length + 1,
    username,
    salt,
    password: hashedPassword,
    createdAt: new Date(),
  };

  // Add to users array
  users.push(newUser);

  return {
    success: true,
    message: 'User registered successfully',
    userId: newUser.id,
  };
}

// Login a user
function loginUser(username, password) {
  // TODO: Add rate limiting to prevent brute force attacks

  // Find user
  const user = users.find((user) => user.username === username);
  if (!user) {
    return { success: false, message: 'Invalid username or password' };
  }

  // Hash the password with user's salt
  const hashedPassword = hashPassword(password, user.salt);

  // Compare passwords
  if (user.password !== hashedPassword) {
    return { success: false, message: 'Invalid username or password' };
  }

  // Generate session token (in a real app, use JWT or similar)
  const token = crypto.randomBytes(32).toString('hex');

  return {
    success: true,
    message: 'Login successful',
    token,
  };
}

// Export functions
module.exports = {
  registerUser,
  loginUser,
};
