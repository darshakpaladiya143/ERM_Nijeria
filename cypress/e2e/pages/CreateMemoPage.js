class CreateMemoPage {
    visit() {
        cy.visit('http://clientapp.narola.online:1196/login'); // Base URL should be set in Cypress config
    }

    loginSuperAdmin(email = 'johndoe@yopmail.com', password = 'Password123!'){
        cy.get('#email').type(email);
        cy.get('#formGroupExampleInput2').type(password);
        cy.get('.btn').click();
        cy.wait(5000); 
    }

    navigateToCreateMemoPage() {  
        cy.get(':nth-child(8) > .nav-link').click();
        cy.get('.add-btn').click();
    }

    selectYear(){
        
    }

    selectQuater(){
        cy.get('select[formcontrolname="quarter"]').select('Other');
    }

    fromDate(){
        cy.get('#fromDate').click();
        cy.get('.datepicker-days').should('be.visible'); // Ensure the day view is visible
        cy.get('.datepicker-days').contains('15').click(); // Select the desired day
    }

    toDate(){
        cy.get('#toDate').click();
        cy.get('.datepicker-days').should('be.visible');
        cy.get('.datepicker-days').contains('19').click();
    }

    riskSubmissionEndDate(){
        cy.get('#riskSubmissionEndDate').click();
        cy.wait(1000); 
        this.checkSeptemberAndSelect();
        // cy.get('#riskSubmissionEndDate').should('have.value', '2024-09-25');
    }

    checkSeptemberAndSelect() {
        cy.log('Checking month...');
        cy.get('.datepicker-switch', { timeout: 10000 }).should('be.visible').then(($month) => {
            cy.log(`Month found: ${$month.text()}`);
            if (!$month.text().includes('September 2024')) {
                cy.get('.datepicker-days .next').click();
                cy.wait(500);
                this.checkSeptemberAndSelect();
            } else {
                cy.log('Selecting the 25th day of September 2024');
                cy.get('.datepicker-days td.day').contains('25').should('be.visible').click();
            }
        });
    }

    riskReportSubmissionDate(){
        cy.get('#riskReportSubmissionDate').click();
        cy.get('.datepicker-days').should('be.visible');
        cy.get('.datepicker-days').contains('30').click();
    }

    subject(){
        cy.get('textarea[placeholder="Enter Subject.."]').type('Memo Concerning Operational Risk Management for Q3 - Strategic Decision Needed');
    }

    riskRegisterTemplate(){
        cy.get('#mat-input-0').click()
        cy.contains('span.mdc-list-item__primary-text', 'Risk Register Template').click();
    }

    selectTreatment(){
        cy.get('#mat-input-1').click()
        cy.contains('span.mdc-list-item__primary-text', 'Treatment of Risk Template').click();
    }

    selectIncident(){
        cy.get('#mat-input-2').click()
        cy.contains('span.mdc-list-item__primary-text','Incident Report Template').click()
    }
    
    selectRiskIdentification(){
        cy.get('#mat-input-3').click()
        cy.contains('span.mdc-list-item__primary-text','Project Based').click()
    }

    sendTo(){
        cy.get('#mat-input-4').click()
        cy.contains('span.mdc-list-item__primary-text','Managing Director (MD)').click()
    }

    saveForm() {
        cy.get('.btn-wrapper > .theme-primary').click({multiple:true});

    }

    removeValidationMsg(){
        cy.get('.text-danger.ng-star-inserted').invoke('remove');
    }

    assertUserCreatedSuccessMessage(expectedText, timeout = 20000) {
        cy.get('.swal2-popup', { timeout }).should('be.visible');
        cy.get('.swal2-popup .swal2-html-container', { timeout }).should('have.text', expectedText);
        cy.get('.swal2-confirm').click();
    }
}

export default CreateMemoPage;
