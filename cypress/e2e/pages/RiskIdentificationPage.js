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
        
        cy.url().should('include', '/ERM/riskidentificationAddEditComponent/0');

        cy.get('button[type="button"][data-bs-dismiss="modal"]')
        .contains('Cancel')
        .click();
    }

    selectStation(){
        cy.get('#mat-input-18').click({force:true});
    }





}

export default RiskIdentification;