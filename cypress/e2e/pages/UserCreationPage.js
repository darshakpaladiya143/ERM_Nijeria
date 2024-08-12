class UserCreationPage {
    visit() {
        cy.visit('http://clientapp.narola.online:1180/login')
    }

    loginSuperAdmin(){
        cy.get('#email').type('johndoe@yopmail.com');
        cy.get('#formGroupExampleInput2').type('Password123!');
        cy.get('.btn').click();
        cy.wait(5000); 
    }

    navigateToUserCreationPage() {
        cy.get(':nth-child(7) > .nav-link.ng-star-inserted').click()
        cy.wait(2000)
        cy.get('a.nav-link').contains('Create User & Assign Role').click();
        // Click the <a> element to open the modal
        cy.get('a.add-btn.icon-btn[data-bs-target="#add-UserModal"]').click();
        // Wait for the modal to be visible
        cy.get('#add-UserModal').should('be.visible');
    }


    fillFullName(fullName) {
        cy.get('#username').type(fullName)
    }

    fillEmail(email) {
        cy.get('#email').type(email)
    }

    fillMobile(mobile) {
        cy.get('#Mobile').type(mobile)
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
    
        // Make the selector more specific
        cy.get('form select[formcontrolname="designationId"]').first().select(roleValueMap[role], { force: true });
    }
    
    fillPassword(password) {
        cy.get('#Password').type(password)
    }

    fillConfirmPassword(confirmPassword) {
        cy.get('#confirmPassword').type(confirmPassword)
    }

    selectRegion(){
        cy.get('select[formcontrolname="regionId"]').eq(0).select('Abuja - TSP');
    }

    selectStation(){
        // Click the dropdown button to open the dropdown
        cy.get('span.dropdown-btn').click({ force: true,multiple:true });

       // Ensure the modal is visible by waiting for it to become visible
        cy.get('#edit-UserModal.modal.fade.theme-modal', { timeout: 10000 })
       .should('not.be.visible') // Ensure the modal is visible
       .then(($modal) => {
       // Check if the dropdown list is visible, if not, force it to be visible
       const dropdownList = $modal.find('div.dropdown-list');
       if (dropdownList.css('display') === 'none') {
       cy.wrap(dropdownList)
        .invoke('css', 'display', 'block') // Set display to block
        .invoke('css', 'opacity', '1'); // Set opacity to 1
    }
  });

       // Select the first checkbox from the dropdown listing
       cy.get('input[type="checkbox"][aria-label="Katampe_I_330kV_Trx._Station"]')
       .should('not.be.visible') // Ensure the checkbox is visible
       .check({force:true}); // Click to check the checkbox

    }
   
    isActive(){
        cy.get('#yes').click()
    }

    saveForm() {
        cy.get('#add-UserModal > .modal-dialog > .modal-content > .modal-footer > .theme-primary').click()
    }

    assertUserCreatedSuccessMessage(expectedText) {
        cy.get('.swal2-popup', { timeout: 10000 }).should('be.visible')
        cy.get('.swal2-popup .swal2-html-container').should('have.text', expectedText)
        cy.get('.swal2-confirm').click()
    }
}

export default UserCreationPage;
