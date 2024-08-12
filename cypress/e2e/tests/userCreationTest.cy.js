import UserCreationPage from '../pages/UserCreationPage';

describe('User Creation Test Cases by SuperAdmin', () => {
    const userCreationPage = new UserCreationPage();

    beforeEach(() => {
        userCreationPage.visit();
        userCreationPage.loginSuperAdmin();
        userCreationPage.navigateToUserCreationPage();    
    });

    it('Verify SuperAdmin Access to User Management Form',()=>{
        const fullName = 'Paladiya Darshak';
        const email = 'paladiya.darshak99@gmail.com';
    
        cy.get('#username').type(fullName).should('have.value', fullName);
        cy.get('#email').type(email).should('have.value', email);
    })

    it('Verify All Fields are Present in User Management Form',()=>{
        cy.get('#username').should('be.visible'); 
        cy.get('#email').should('be.visible'); 
        cy.get('#Mobile').should('be.visible'); 
        cy.get('select[formcontrolname="designationId"]').should('be.visible'); 
        cy.get('#Password').should('be.visible'); 
        cy.get('#confirmPassword').should('be.visible'); 
        cy.get('button.theme-btn.theme-primary').should('be.visible'); 
    })   
    
    
    it('Verify Dropdown Contains All Roles',()=>{ 
        cy.get('select[formcontrolname="designationId"]').should('be.visible');
        cy.get('select[formcontrolname="designationId"]').then($select => {
        // Log all options
        cy.log($select.html());

        });

        const expectedRoles = [
        'AGM',
        'Assistant Head of Risk',
        'Board Chairman',
        'General Manager (GM)',
        'Head Of Risk',
        'Managing Director (MD)',
        'PM',
        'Risk Champion',
        'Risk Officer',              
        ];
             
        // Verify each role is in the dropdown
        expectedRoles.forEach(role => {
        cy.get('select[formcontrolname="designationId"]')
        .find('option') // Find all <option> elements within the dropdown
        .contains(role,{ timeout: 10000 }) // Check if each <option> contains the role
        .should('exist'); // Assert that the role exists
        });
    })  

    it('Create a new user as "AGM"', () => {
        userCreationPage.fillFullName('Akon Green');
        userCreationPage.fillEmail('akon@yopmail.com');
        userCreationPage.fillMobile('+1-555-143-5678');
        userCreationPage.selectRole('AGM');
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });

    
    it('Create a new user as "Assistant Head of Risk"', () => {
        userCreationPage.fillFullName('Bob White');
        userCreationPage.fillEmail('white@yopmail.com');
        userCreationPage.fillMobile('+1-555-345-6789');
        userCreationPage.selectRole('Assistant Head of Risk');
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });


    it('Create a new user as "Board Chairman"', () => {
        userCreationPage.fillFullName('Claire Evans');
        userCreationPage.fillEmail('claire@yopmail.com');
        userCreationPage.fillMobile('+1-555-456-7890');
        userCreationPage.selectRole('Board Chairman');
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });


    it('Create a new user as "General Manager (GM)"', () => {
        userCreationPage.fillFullName('Daniel Martinez');
        userCreationPage.fillEmail('daniel@yopmail.com');
        userCreationPage.fillMobile('+1-555-567-8901');
        userCreationPage.selectRole('General Manager (GM)');
        userCreationPage.selectRegion();
        userCreationPage.selectStation();
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });


    it('Create a new user as "Head Of Risk"', () => {
        userCreationPage.fillFullName('Ella Lewis');
        userCreationPage.fillEmail('ella@yopmail.com');
        userCreationPage.fillMobile('+1-555-678-9012');
        userCreationPage.selectRole('Head Of Risk');
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });

    it('Create a new user as "Managing Director (MD)"', () => {
        userCreationPage.fillFullName('Frank Thompson');
        userCreationPage.fillEmail('frank@yopmail.com');
        userCreationPage.fillMobile('0987654321');
        userCreationPage.selectRole('Managing Director (MD)');
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });

    it('Create a new user as "PM"', () => {
        userCreationPage.fillFullName('Grace Anderson');
        userCreationPage.fillEmail('grace@yopmail.com');
        userCreationPage.fillMobile('0987654321');
        userCreationPage.selectRole('PM');
        userCreationPage.selectRegion();
        userCreationPage.selectStation();
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });

    it('Create a new user as "Risk Champion"', () => {
        userCreationPage.fillFullName('Henry Roberts');
        userCreationPage.fillEmail('henry@yopmail.com');
        userCreationPage.fillMobile('+1-555-901-2345');
        userCreationPage.selectRole('Risk Champion');
        userCreationPage.selectRegion();
        userCreationPage.selectStation();
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });

    it('Create a new user as "Risk Officer"', () => {
        userCreationPage.fillFullName('Ivy Clark');
        userCreationPage.fillEmail('ivy@yopmail.com');
        userCreationPage.fillMobile('+1-555-012-3456');
        userCreationPage.selectRole('Risk Officer');
        userCreationPage.selectRegion();
        userCreationPage.selectStation();
        userCreationPage.fillPassword('Password123!');
        userCreationPage.fillConfirmPassword('Password123!');
        userCreationPage.isActive();
        userCreationPage.saveForm();
        userCreationPage.assertUserCreatedSuccessMessage('User added successfully');
    });
});
