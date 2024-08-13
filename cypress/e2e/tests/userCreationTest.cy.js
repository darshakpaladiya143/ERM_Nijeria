import UserCreationPage from '../pages/UserCreationPage';

describe('User Creation Test Cases by SuperAdmin', () => {
    const userCreationPage = new UserCreationPage();
    const users = [
        { fullName: 'Jason Black', email: `jasonb+${Date.now()}@yopmail.com`, mobile: '+1-555-123-9876', role: 'AGM' },
        { fullName: 'Natalie Grey', email: `natalieg+${Date.now()}@yopmail.com`, mobile: '+1-555-234-8765', role: 'Assistant Head of Risk' },
        { fullName: 'Olivia Brown', email: `oliviab+${Date.now()}@yopmail.com`, mobile: '+1-555-345-7654', role: 'Board Chairman' },
        { fullName: 'Liam Green', email: `liamg+${Date.now()}@yopmail.com`, mobile: '+1-555-456-6543', role: 'General Manager (GM)' },
        { fullName: 'Sophia Blue', email: `sophiab+${Date.now()}@yopmail.com`, mobile: '+1-555-567-5432', role: 'Head Of Risk' },
        { fullName: 'Ethan Red', email: `ethanr+${Date.now()}@yopmail.com`, mobile: '+1-555-678-4321', role: 'Managing Director (MD)' },
        { fullName: 'Mia White', email: `miaw+${Date.now()}@yopmail.com`, mobile: '+1-555-789-3210', role: 'PM' },
        { fullName: 'Lucas Purple', email: `lucasp+${Date.now()}@yopmail.com`, mobile: '+1-555-890-2109', role: 'Risk Champion' },
        { fullName: 'Emma Yellow', email: `emmay+${Date.now()}@yopmail.com`, mobile: '+1-555-901-1098', role: 'Risk Officer' }
    ];
    

    beforeEach(() => {
        userCreationPage.visit();
        userCreationPage.loginSuperAdmin();
        userCreationPage.navigateToUserCreationPage();    
    });

    it('Verify SuperAdmin Access to User Management Form', () => {
        const { fullName, email } = users[0];
        userCreationPage.fillFullName(fullName);
        userCreationPage.fillEmail(email);
    });

    it('Verify All Fields are Present in User Management Form', () => {
        const fields = ['#username', '#email', '#Mobile', 'select[formcontrolname="designationId"]', '#Password', '#confirmPassword'];
        fields.forEach(field => cy.get(field).should('be.visible'));
    });

    it('Verify Dropdown Contains All Roles', () => { 
        const expectedRoles = ['AGM', 'Assistant Head of Risk', 'Board Chairman', 'General Manager (GM)', 'Head Of Risk', 'Managing Director (MD)', 'PM', 'Risk Champion', 'Risk Officer'];
        expectedRoles.forEach(role => cy.get('select[formcontrolname="designationId"]').find('option').contains(role).should('exist'));
    });

    users.forEach(user => {
        it(`Create a new user as "${user.role}"`, () => {
            userCreationPage.fillForm(user.fullName, user.email, user.mobile, user.role, 'Password123!');
            if (['General Manager (GM)', 'PM', 'Risk Champion', 'Risk Officer'].includes(user.role)) {
                userCreationPage.selectRegion();
                userCreationPage.selectStation();
            }
            userCreationPage.isActive();
            userCreationPage.saveForm();
            userCreationPage.assertUserCreatedSuccessMessage('User added successfully',20000);
        });
    });
});
