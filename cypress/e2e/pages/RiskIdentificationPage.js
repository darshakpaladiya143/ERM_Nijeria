class RiskIdentification{
    visit() {
        cy.visit('http://clientapp.narola.online:1196/login')
    }

        loginRiskOfficer(email = 'alexsmith@yopmail.com', password = 'Password123!'){
        cy.get('#email').type(email);
        cy.get('#formGroupExampleInput2').type(password);
        cy.get('.btn').click();
        cy.wait(5000); 
    }

    navigateToRiskIdenfication(){
        cy.get('#sidemenu-ul > :nth-child(3) > .nav-link').click()
        cy.wait(2000)
    }

    addRiskIdentificationButton(){
        cy.get('.head-btn-wrapper > .add-btn').click()
    }

    selectYear() {
        cy.get('#year').type("2024"); 
    }

    selectStation(){
        cy.get('#mat-input-18').click();
        cy.get('span.mdc-list-item__primary-text').contains('Katampe_I_330kV_Trx._Station').click(); 
    }

    riskDescription(){
        cy.get('#RiskDecription').type("The purpose of this memo is to outline the potential risks associated with policy within the power commission company. This assessment is aimed at identifying and evaluating the risks that could impact our operations, safety, compliance, and financial stability.");
    }

    selectCategory(){
        cy.get('#mat-input-12').click();
        cy.contains('span.mdc-list-item__primary-text', 'Reputation and Branding').click();
    }
  
    selectSubCategory(){
        cy.get('#mat-input-13').click();
        cy.contains('span.mdc-list-item__primary-text', 'Stakeholder Management').click();
    }

    enterSection(){
        cy.get('#section').type("Compliance and Regulatory Affairs");
    }

    departmentalObjectives(){
        cy.get('#DepartmentalObjectives').type("Ensure Regulatory Compliance and Mitigate Operational Risks.");
    }

    impactFactor(){
        cy.get('#mat-select-value-11 > .mat-mdc-select-placeholder').click();
        cy.contains('span.mdc-list-item__primary-text','Very low').click();
    }

    selectOccurence(){
        cy.get('.col-md-6.col-xl-6 > .form-group > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
        cy.contains('span.mdc-list-item__primary-text','Possible').click();
    }

    enterMitigration(){
        cy.get('textarea#Remark').eq(0).type('Your mitigation measures go here.')
    }

    enterRemark(){
        cy.get('textarea#Remark').eq(1).type('Your remark goes here');
    }
    
    saveButton(){
        cy.get('#save').click();
    }

    assertMemoCreatedSuccessMessage(expectedText, timeout = 20000) {
        cy.get('.swal2-popup', { timeout }).should('be.visible');
        cy.get('.swal2-popup .swal2-html-container', { timeout }).should('have.text', expectedText);
        cy.get('.swal2-confirm').click();
    }

    clickFilter(){
        cy.get('#dropdown-Modal').click();
    }

    selectDate(){
        cy.get('#year').click();
        cy.contains('.year', '2024').click();
    }

    applyButton(){
        cy.contains('button', 'Apply').click({force:true});
    }

    plusListing(){
        // Step 1: Click the button to load the data table
        cy.get('.td-plus').click(); // Click to display the table

        // Step 2: Wait for the Angular app to stabilize
        cy.window().its('angular').then(angular => {
        const injector = angular.element(document.body).injector();
        const $http = injector.get('$http');
        cy.wrap($http.pendingRequests).should('have.length', 0); // Wait until all HTTP requests are completed
    });

        // Step 3: Now perform the assertions once the app is stable
        cy.get('tr', { timeout: 30000 })
        .contains('td', 'Reputation and Branding')
        .should('be.visible')
        .then($row => {
       // Assert for 'Reputation and Branding' in the correct column
        cy.wrap($row)
       .find('td.cdk-column-categoryName')
       .should('be.visible')
       .should('contain.text', 'Reputation and Branding');

       // Assert that the remark column contains the correct text
       cy.wrap($row)
      .find('td.cdk-column-remark', { timeout: 30000 })
      .should('be.visible')
      .should('contain.text', 'Your remark goes here...');

       // Assert for the status in the correct column
       cy.wrap($row)
      .find('td.cdk-column-status')
      .should('be.visible')
      .should('contain.text', 'Pending');
  });

      // Step 4: Debugging - Click on the 'edit-item' link in that specific row
       cy.get('tr')
      .contains('td', 'Reputation and Branding')
      .then($row => {
      cy.log($row.html());
      cy.wrap($row).debug();
      cy.wrap($row)
      .find('a.edit-item', { timeout: 30000 })
      .should('be.visible')
      .click();
    });

    }

}
export default RiskIdentification;