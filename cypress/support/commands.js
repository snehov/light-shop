// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clearedOrderWithOneProduct', (email, pw) => {
  cy.request('https://snowcorp.cz/ls/cart_api/resetAll')
  cy.request('https://snowcorp.cz/ls/cart_api/addTestProduct1')
  cy.visit('/')
})
// Cart 
Cypress.Commands.add('cartHaveDeliveryItem', (email, pw) => {
  cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--visible')
})
Cypress.Commands.add('cartNotHaveDeliveryItem', (email, pw) => {
  cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--hidden')
})
Cypress.Commands.add('cartHavePaymentItem', (email, pw) => {
  cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--visible')
})
Cypress.Commands.add('cartNotHavePaymentItem', (email, pw) => {
  cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--hidden')
})

Cypress.Commands.add('totalSum', (email, pw) => {
  cy.get('.cart-sum__TOTAL')
})
// Delivery and Payment methods
Cypress.Commands.add('deliveryInfoInputsDisabled', (email, pw) => {
  cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
})
Cypress.Commands.add('deliveryInfoInputsEnabled', (email, pw) => {
  cy.get('.deliveryInfoInputs').should('have.not.class', 'disabledBlock')
})

Cypress.Commands.add('selectFreeDelivery', (email, pw) => {
  cy.get('label[for=delivery_3]').click()
})
Cypress.Commands.add('selectPaidDelivery', (email, pw) => {
  cy.get('label[for=delivery_1]').click()
})
Cypress.Commands.add('selectFreePayment', (email, pw) => {
  cy.get('label[for=payment_3]').click()
})
Cypress.Commands.add('selectPaidPayment', (email, pw) => {
  cy.get('label[for=payment_1]').click()
})

// Form general
Cypress.Commands.add('formIsValid', (email, pw) => {
  cy.get('.formSubmit').should('have.class', 'formSubmit--ready')
})
Cypress.Commands.add('formIsNotValid', (email, pw) => {
  cy.get('.formSubmit').should('have.class', 'formSubmit--notReady')
})


