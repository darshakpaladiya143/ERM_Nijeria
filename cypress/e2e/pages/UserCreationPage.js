class UserCreationPage {
    visit() {
        cy.visit('http://clientapp.narola.online:1196/login'); // Base URL should be set in Cypress config
    }

    loginSuperAdmin(email = 'johndoe@yopmail.com', password = 'Password123!'){
        cy.get('#email').type(email);
        cy.get('#formGroupExampleInput2').type(password);
        cy.get('.btn').click();
        cy.wait(5000); 
    }

    navigateToUserCreationPage() {
        cy.get(':nth-child(7) > .nav-link.ng-star-inserted').click();
        cy.get('a.nav-link').contains('Create User & Assign Role').click();
        cy.get('a.add-btn.icon-btn[data-bs-target="#add-UserModal"]').click();
        cy.get('#add-UserModal').should('be.visible');
    }

    fillForm(fullName, email, mobile, role, password) {
        this.fillFullName(fullName);
        this.fillEmail(email);
        this.fillMobile(mobile);
        this.selectRole(role);
        this.fillPassword(password);
        this.fillConfirmPassword(password);
    }

    fillFullName(fullName) {
        cy.get('#username').type(fullName);
    }

    fillEmail(email) {
        cy.get('#email').type(email);
    }

    fillMobile(mobile) {
        cy.get('#Mobile').type(mobile);
    }

    selectRole(role) {
        const roleValueMap = {
            'AGM': '1: 23',
            'Assistant Head of Risk': '2: 20',
            'Board Chairman': '3: 22',
            'General Manager (GM)': '4: 15',
            'Head Of Risk': '5: 12',
            'Managing Director (MD)': '6: 13',
            'PM': '7: 24',
            'Risk Champion': '8: 16',
            'Risk Officer': '9: 14'
        };
        cy.get('form select[formcontrolname="designationId"]').first().select(roleValueMap[role], { force: true });
    }

    fillPassword(password) {
        cy.get('#Password').type(password);
    }

    fillConfirmPassword(confirmPassword) {
        cy.get('#confirmPassword').type(confirmPassword);
    }

    selectRegion(region = 'Abuja - TSP') {
        cy.get('select[formcontrolname="regionId"]',{ timeout: 30000 }).eq(0).select(region);
    }

    selectStation(station = 'Katampe_I_330kV_Trx._Station') {
        cy.get('span.dropdown-btn').click({ force: true, multiple: true });
        cy.get('input[type="checkbox"][aria-label="' + station + '"]').check({ force: true });
    }

    isActive() {
        cy.get('#yes').click();
    }

    saveForm() {
        cy.get('#add-UserModal .modal-footer .theme-primary').click();
    }

    assertUserCreatedSuccessMessage(expectedText,timeout = 20000) {
        cy.get('.swal2-popup',{timeout}).should('be.visible');
        cy.get('.swal2-popup .swal2-html-container',{timeout}).should('have.text', expectedText);
        cy.get('.swal2-confirm').click();
    }
}

export default UserCreationPage;
