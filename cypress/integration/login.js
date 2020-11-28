import cz from '../../src/i18n/cz.json'
describe('Register and login new user', () => {
	it('Reset app', () => {
		cy.clearedOrderWithOneProduct()
	})
	it('Register new user', () => {
		cy.get('label[for=createAccountOpt]').click()
		//TODO: finish registration, and ensure, delete test user after every test run
	})
	it('Test validations at create user accout', () => {
		cy.get('label[for=createAccountOpt]').click()
		cy.get('#name_register').type('Test BBB user')
		cy.get('#email_register').type('bbb@bbb.bbb')

		cy.get('#pwd_register').type('bbbb')
		cy.get('#pwd2_register').type('bbbb').blur()
		cy.get('#pwd_register')
			.parent()
			.within(() => {
				cy.get('.validation--error')
				//.contains(cz.translation.login.pwdReqirement) // TODO: put validation messages into i18n
			})
		cy.get('#pwd_register').type('bb')
		cy.get('#pwd_register')
			.parent()
			.within(() => {
				cy.get('.validation--error').contains(cz.translation.login.pwdNotEqual)
			})
		cy.get('#pwd2_register').type('bb').blur()
		cy.get('#pwd_register')
			.parent()
			.within(() => {
				cy.get('.validation--empty')
			})
	})
	it('Test if already registered user cant be created again', () => {
		cy.get('.cy-submitCreateUser').click()
		cy.get('.cy-createUserErr').contains(cz.translation.login.err_username_exists)
		cy.request_removeTestUser()
	})
	it('Submit create user form', () => {
		cy.get('.cy-submitCreateUser').click()
		cy.get('.cy-loggedUser').contains(cz.translation.login.loggedAsUser)
	})
	it('Reset app', () => {
		cy.clearedOrderWithOneProduct()
	})
	it('Login', () => {
		cy.get('#name_personal').should('have.value', '')
		cy.get('#street_delivery').should('have.value', '')
		cy.get('label[for=loginOpt]').click()
		cy.get('#email_login').type('aaa@aaa.aaa')
		cy.get('#pwd_login').type('aaaaaa')
		cy.get('.submitLogin').click()
	})
	it('Check login caused filling of known user info', () => {
		cy.get('#name_personal').should('have.value', '_Test_user')
		cy.get('#street_delivery').should('have.value', 'Ve Věží 15')
	})
})
