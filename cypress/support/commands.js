
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

// Custom command to set content in CKEditor
import './ckeditor-instance';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
     Cypress.Commands.add('initializeCkEditor', (editorSelector) => {
     cy.window().then((win) => {
    // Assuming the editor instance is exposed on the window object
    if (win.editorInstance) {
      return cy.wrap(win.editorInstance);
    }

    return cy.document().then((doc) => {
      const editorElement = doc.querySelector(editorSelector);
      return ClassicEditor.create(editorElement).then(editor => {
        win.editorInstance = editor;
        return cy.wrap(editor);
      });
    });
  });
});

