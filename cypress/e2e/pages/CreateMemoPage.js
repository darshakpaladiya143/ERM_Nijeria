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
        cy.get('#year').click();
        cy.get('.datepicker').should('be.visible');
        cy.get('.datepicker-years').contains('2026').click();
    }

    selectQuater(){
        cy.get('select[formcontrolname="quarter"]').select('Quarter 2');
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

 
    assertMemoCreatedSuccessMessage(expectedText, timeout = 20000) {
        cy.get('.swal2-popup', { timeout }).should('be.visible');
        cy.get('.swal2-popup .swal2-html-container', { timeout }).should('have.text', expectedText);
        cy.get('.swal2-confirm').click();
    }

    memoListing(){
        cy.get(':nth-child(8) > .nav-link').click();
    }

    checkRecordPresent(){
        // Variables for year and quarter
        const expectedYear = '2026';
        const expectedQuarter = 'Quarter 2';

       // Get the table row containing the memo you want to assert
        cy.get('tr.mat-mdc-row')
        .should('be.visible') // Ensure the row is visible
        .within(() => {
      // Assert the year column
        cy.get('td.cdk-column-year')
       .should('contain.text', expectedYear);

    // Assert the quarter column
       cy.get('td.cdk-column-quarter')
       .should('contain.text', expectedQuarter);
  });

    }
}

export default CreateMemoPage;
