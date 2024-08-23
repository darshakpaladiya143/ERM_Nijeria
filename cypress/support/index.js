Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the error related to the undefined 'backdrop' property
    if (err.message.includes("Cannot read properties of undefined (reading 'backdrop')")) {
      return false; // Prevents Cypress from failing the test
    }
    // If you want to let other errors cause the test to fail, remove the return false
  });
  