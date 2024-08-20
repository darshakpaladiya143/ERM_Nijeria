// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// commands.js

Cypress.Commands.add('login', (email, password, rememberMe = false) => {
    cy.get('#email').type(email)
    cy.get('#formGroupExampleInput2').type(password)
  
    // If rememberMe is true, click on the Remember Me checkbox
    if (rememberMe) {
      cy.get('#rememberMe').should('be.visible').click()
    }
  
    cy.get('.btn').click()
    cy.wait(5000)
  })
  
  Cypress.Commands.add('assertDashboard', () => {
    cy.get(':nth-child(1) > .page-title').should('be.visible')
      .invoke('text').then((text) => {
        expect(text.trim()).to.equal('Dashboard')
      })
  })
  
  Cypress.Commands.add('assertValidationPopup', (expectedText) => {
    cy.get('.swal2-popup').should('be.visible')
    cy.get('.swal2-popup .swal2-html-container').should('have.text', expectedText)
    cy.get('.swal2-confirm').click()
  })
  
  Cypress.Commands.add('logout', () => {
    cy.get('.user-dropdown').click()
    cy.get(':nth-child(4) > .dropdown-item').click()
    cy.get('a').contains('LOG IN').should('be.visible').click()
  })

  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  
    Cypress.Commands.add('setCkEditorContent', (editorSelector, content) => {
    cy.window().then((win) => {
        // Make sure CKEditor 5 is correctly referenced
        if (win.ClassicEditor) {
            win.ClassicEditor
                .create(document.querySelector(editorSelector))
                .then((editor) => {
                    editor.setData(content);
                })
                .catch((error) => {
                    cy.log('Error:', error);
                });
        } else {
            cy.log('ClassicEditor is not defined');
        }
    });
});

