// Main application module
const auth = require('./auth');

// Simple console-based interface for demonstration
function runApp() {
  console.log('Welcome to the Example App!');

  // Simulate user registration
  const registrationResult = auth.registerUser('testuser', 'password123');
  console.log('Registration result:', registrationResult);

  // Simulate successful login
  const loginSuccess = auth.loginUser('testuser', 'password123');
  console.log('Login result (success):', loginSuccess);

  // Simulate failed login
  const loginFail = auth.loginUser('testuser', 'wrongpassword');
  console.log('Login result (failure):', loginFail);
}

// Logs for demonstration
console.log('App initialized');

// Export function
module.exports = {
  runApp,
};

// Run the app if this is the main module
if (require.main === module) {
  runApp();
}
