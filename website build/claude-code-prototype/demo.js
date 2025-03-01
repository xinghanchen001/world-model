#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log(
  '\x1b[36m%s\x1b[0m',
  '======================================================='
);
console.log('\x1b[36m%s\x1b[0m', '  Claude Code - Interactive Demo');
console.log(
  '\x1b[36m%s\x1b[0m',
  '  This demo shows how Claude Code would analyze and fix'
);
console.log('\x1b[36m%s\x1b[0m', '  issues in the example project.');
console.log(
  '\x1b[36m%s\x1b[0m',
  '======================================================='
);
console.log();

// Pre-defined demo scenarios
const scenarios = [
  {
    command: 'analyze example-project/src/buggy.js',
    response: `Analyzing example-project/src/buggy.js for issues...

I've identified several issues in this file:

1. **Bug in calculateAverage**: Doesn't handle empty arrays (would cause division by zero)
2. **Inefficient implementation in findDuplicates**: O(n²) complexity and redundant includes check
3. **Security vulnerability in queryUser**: SQL injection risk
4. **Callback hell in processData**: Complex nested callbacks make code hard to maintain
5. **Improper error handling**: Not capturing or logging the actual error information

Would you like me to fix these issues? I can address them one by one or all at once.`,
  },
  {
    command: 'fix the calculateAverage function',
    response: `I'll fix the calculateAverage function to handle empty arrays properly.

\`\`\`diff
function calculateAverage(numbers) {
+  if (!numbers || numbers.length === 0) {
+    return 0; // or throw an error, or return null, depending on requirements
+  }
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}
\`\`\`

Change applied! The function now checks for empty arrays and returns 0 as a default value.`,
  },
  {
    command: 'refactor the findDuplicates function',
    response: `I'll refactor the findDuplicates function to be more efficient.

\`\`\`diff
function findDuplicates(array) {
-  const duplicates = [];
-  for (let i = 0; i < array.length; i++) {
-    for (let j = i + 1; j < array.length; j++) {
-      if (array[i] === array[j] && !duplicates.includes(array[i])) {
-        duplicates.push(array[i]);
-      }
-    }
-  }
-  return duplicates;
+  const seen = new Set();
+  const duplicates = new Set();
+  
+  for (const item of array) {
+    if (seen.has(item)) {
+      duplicates.add(item);
+    } else {
+      seen.add(item);
+    }
+  }
+  
+  return Array.from(duplicates);
}
\`\`\`

Change applied! The function now:
1. Uses Sets for O(1) lookups instead of arrays with O(n) includes checks
2. Has O(n) complexity instead of O(n²)
3. Only loops through the array once
4. Returns a deduplicated array of duplicates`,
  },
  {
    command: 'fix the SQL injection vulnerability',
    response: `I'll fix the SQL injection vulnerability in the queryUser function.

\`\`\`diff
function queryUser(userId) {
-  const query = \`SELECT * FROM users WHERE id = \${userId}\`; // Vulnerable to SQL injection
+  const query = \`SELECT * FROM users WHERE id = ?\`;
-  return executeQuery(query); // Pretend this executes the query
+  return executeQuery(query, [userId]); // Using parameterized query
}

// Mock function to prevent errors
- function executeQuery(query) {
+ function executeQuery(query, params) {
  return { id: 1, name: 'Test User' };
}
\`\`\`

Change applied! The function now:
1. Uses parameterized queries with placeholders
2. Prevents SQL injection by properly separating code from data
3. Modified the mock executeQuery function to accept parameters`,
  },
  {
    command: 'modernize the processData function',
    response: `I'll modernize the processData function by replacing the callback pattern with async/await.

\`\`\`diff
- function processData(data, callback) {
-   validateData(data, function(err, validData) {
-     if (err) {
-       callback(err);
-     } else {
-       transformData(validData, function(err, transformedData) {
-         if (err) {
-           callback(err);
-         } else {
-           saveData(transformedData, function(err, result) {
-             if (err) {
-               callback(err);
-             } else {
-               callback(null, result);
-             }
-           });
-         }
-       });
-     }
-   });
- }
+ async function processData(data) {
+   try {
+     const validData = await validateDataAsync(data);
+     const transformedData = await transformDataAsync(validData);
+     const result = await saveDataAsync(transformedData);
+     return result;
+   } catch (error) {
+     throw error; // Re-throw for caller to handle
+   }
+ }
+
+ // Promisified versions of the helper functions
+ function validateDataAsync(data) {
+   return new Promise((resolve, reject) => {
+     validateData(data, (err, result) => {
+       if (err) reject(err);
+       else resolve(result);
+     });
+   });
+ }
+
+ function transformDataAsync(data) {
+   return new Promise((resolve, reject) => {
+     transformData(data, (err, result) => {
+       if (err) reject(err);
+       else resolve(result);
+     });
+   });
+ }
+
+ function saveDataAsync(data) {
+   return new Promise((resolve, reject) => {
+     saveData(data, (err, result) => {
+       if (err) reject(err);
+       else resolve(result);
+     });
+   });
+ }
\`\`\`

Change applied! The function now:
1. Uses async/await for cleaner, more readable code
2. Properly handles errors with try/catch
3. Returns a Promise that resolves with the result or rejects with an error
4. Includes Promise-wrapped versions of the existing callback functions`,
  },
  {
    command: 'improve the error handling',
    response: `I'll improve the error handling in the try/catch block.

\`\`\`diff
try {
  const result = riskyOperation();
  console.log(result);
- } catch {
-   console.log('An error occurred'); // Not logging the actual error
+ } catch (error) {
+   console.error('An error occurred:', error.message);
+   console.error('Stack trace:', error.stack);
+   // In a real application, you might log to a file, send to monitoring service, etc.
}
\`\`\`

Change applied! The error handling now:
1. Captures the error object in the catch block
2. Logs the specific error message instead of a generic one
3. Includes the stack trace for debugging
4. Provides a comment about more robust error handling in real applications`,
  },
  {
    command: 'add the missing imports',
    response: `I'll add the missing imports at the top of the file.

\`\`\`diff
// This file contains intentional bugs and issues for Claude Code to fix

// Missing imports
- // const fs = require('fs');
+ const fs = require('fs');
\`\`\`

Change applied! I've uncommented the fs import. 

Note: The import is currently not used in the code. If you intend to use it for file operations, make sure to include those operations in the code. Otherwise, it would be best to remove unused imports.`,
  },
  {
    command: 'run tests',
    response: `Running tests for the project...

✅ calculateAverage: All tests passed
✅ findDuplicates: All tests passed
✅ queryUser: All tests passed
✅ processData: All tests passed

Test Results:
- 12 tests passed
- 0 tests failed
- 100% code coverage

All the fixed issues are now working correctly!`,
  },
  {
    command: 'create a PR with these changes',
    response: `Creating a pull request with all the changes we've made...

PR draft created with the following details:

**Title**: Fix bugs and improve code quality in buggy.js

**Description**:
This PR addresses several issues in the buggy.js file:

1. Fix division by zero bug in calculateAverage function
2. Improve efficiency of findDuplicates function from O(n²) to O(n)
3. Fix SQL injection vulnerability in queryUser function
4. Modernize callback-based code in processData with async/await
5. Improve error handling with proper error capturing
6. Add missing imports

**Changes**:
- 7 files changed
- 78 additions
- 42 deletions

**Tests**:
- All tests passing
- Code coverage: 100%

Would you like me to finalize this PR?`,
  },
];

// Create an interactive CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[33m> \x1b[0m',
});

// Demo state
let scenarioIndex = 0;
let isAutoPlaying = false;
let autoplayTimer = null;

// Welcome message
console.log('\x1b[32m%s\x1b[0m', 'Welcome to the Claude Code demo!');
console.log(
  '\x1b[32m%s\x1b[0m',
  'This demo will show you how Claude Code would analyze and fix issues in a project.'
);
console.log(
  '\x1b[32m%s\x1b[0m',
  'Try typing "analyze example-project/src/buggy.js" to get started.'
);
console.log();
console.log('\x1b[36m%s\x1b[0m', 'Available commands:');
console.log(
  '\x1b[36m%s\x1b[0m',
  '- "autoplay": Run through the demo automatically'
);
console.log('\x1b[36m%s\x1b[0m', '- "stop": Stop autoplay');
console.log('\x1b[36m%s\x1b[0m', '- "exit": Quit the demo');
console.log();

// Process input
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim();

  if (input.toLowerCase() === 'exit') {
    console.log(
      '\x1b[36m%s\x1b[0m',
      'Thank you for trying the Claude Code demo. Goodbye!'
    );
    process.exit(0);
  }

  if (input.toLowerCase() === 'autoplay') {
    isAutoPlaying = true;
    console.log('\x1b[36m%s\x1b[0m', 'Starting autoplay demo...');
    playNextScenario();
    return;
  }

  if (input.toLowerCase() === 'stop') {
    isAutoPlaying = false;
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
      autoplayTimer = null;
    }
    console.log(
      '\x1b[36m%s\x1b[0m',
      'Autoplay stopped. You can continue manually or type "exit" to quit.'
    );
    rl.prompt();
    return;
  }

  // Check if the input matches a scenario command
  const matchedScenario = scenarios.find(
    (s) => s.command.toLowerCase() === input.toLowerCase()
  );

  if (matchedScenario) {
    console.log('\x1b[32m%s\x1b[0m', matchedScenario.response);
    console.log();
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      `I'll help you with "${input}". Try one of the demo commands like "analyze example-project/src/buggy.js"`
    );
    console.log();
  }

  if (!isAutoPlaying) {
    rl.prompt();
  }
}).on('close', () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    'Thank you for trying the Claude Code demo. Goodbye!'
  );
  process.exit(0);
});

// Function to play the next scenario in autoplay mode
function playNextScenario() {
  if (!isAutoPlaying || scenarioIndex >= scenarios.length) {
    isAutoPlaying = false;
    console.log(
      '\x1b[36m%s\x1b[0m',
      'Demo completed! You can try your own commands or type "exit" to quit.'
    );
    scenarioIndex = 0;
    rl.prompt();
    return;
  }

  const scenario = scenarios[scenarioIndex];
  console.log('\x1b[33m%s\x1b[0m', `> ${scenario.command}`);

  // Wait a moment before showing the response
  setTimeout(() => {
    console.log('\x1b[32m%s\x1b[0m', scenario.response);
    console.log();

    scenarioIndex++;

    // Schedule the next scenario
    autoplayTimer = setTimeout(playNextScenario, 5000);
  }, 1000);
}
