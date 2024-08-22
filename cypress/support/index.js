Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the specific ResizeObserver error
    if (err.message.includes('ResizeObserver loop completed with undelivered notification')) {
      return false;
    }
    // Fail the test on other uncaught exceptions
    return true;
   });
   