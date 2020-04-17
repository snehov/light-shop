describe('Register and login new user', () => {
  it('Reset app', () => {
    cy.clearedOrderWithOneProduct()
  })
  it('Register new user', () => {
    cy.get('label[for=createAccountOpt]').click()
    //TODO: finish registration, and ensure, delete test user after every test run
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
