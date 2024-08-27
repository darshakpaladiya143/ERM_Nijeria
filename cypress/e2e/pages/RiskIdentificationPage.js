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
    





}

export default RiskIdentification;