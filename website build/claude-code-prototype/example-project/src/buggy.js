// This file contains intentional bugs and issues for Claude Code to fix

// Missing imports
// const fs = require('fs');

// Function with bug - doesn't handle edge cases
function calculateAverage(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length; // Bug: Doesn't handle empty array
}

// Inefficient code - could be refactored
function findDuplicates(array) {
  const duplicates = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j] && !duplicates.includes(array[i])) {
        duplicates.push(array[i]);
      }
    }
  }
  return duplicates;
}

// Security issue - SQL injection vulnerability
function queryUser(userId) {
  const query = `SELECT * FROM users WHERE id = ${userId}`; // Vulnerable to SQL injection
  return executeQuery(query); // Pretend this executes the query
}

// Function with callback hell
function processData(data, callback) {
  validateData(data, function (err, validData) {
    if (err) {
      callback(err);
    } else {
      transformData(validData, function (err, transformedData) {
        if (err) {
          callback(err);
        } else {
          saveData(transformedData, function (err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, result);
            }
          });
        }
      });
    }
  });
}

// Mock functions to prevent errors
function executeQuery(query) {
  return { id: 1, name: 'Test User' };
}

function validateData(data, callback) {
  callback(null, data);
}

function transformData(data, callback) {
  callback(null, { ...data, transformed: true });
}

function saveData(data, callback) {
  callback(null, { success: true, data });
}

// Incorrect error handling
try {
  const result = riskyOperation();
  console.log(result);
} catch {
  console.log('An error occurred'); // Not logging the actual error
}

function riskyOperation() {
  throw new Error('Something went wrong');
}

// Export functions
module.exports = {
  calculateAverage,
  findDuplicates,
  queryUser,
  processData,
};
