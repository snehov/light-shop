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
const rootUrl='/?env=test'
Cypress.Commands.add('clearedOrderWithOneProduct', () => {
  cy.request('https://snowcorp.cz/ls/cart_api/resetAll')
  cy.request('https://snowcorp.cz/ls/cart_api/addTestProduct1')
  cy.visit(rootUrl)
})
Cypress.Commands.add('visitRoot', () => {
  cy.visit(rootUrl)
})
// Cart 
Cypress.Commands.add('cartHaveDeliveryItem', () => {
  cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--visible')
})
Cypress.Commands.add('cartNotHaveDeliveryItem', () => {
  cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--hidden')
})
Cypress.Commands.add('cartHavePaymentItem', () => {
  cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--visible')
})
Cypress.Commands.add('cartNotHavePaymentItem', () => {
  cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--hidden')
})

Cypress.Commands.add('totalSum', () => {
  cy.get('.cart-sum__TOTAL')
})
// Delivery and Payment methods
Cypress.Commands.add('deliveryInfoInputsDisabled', () => {
  cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
})
Cypress.Commands.add('deliveryInfoInputsEnabled', () => {
  cy.get('.deliveryInfoInputs').should('have.not.class', 'disabledBlock')
})

Cypress.Commands.add('selectFreeDelivery', () => {
  cy.get('label[for=delivery_3]').click()
})
Cypress.Commands.add('selectPaidDelivery', () => {
  cy.get('label[for=delivery_1]').click()
})
Cypress.Commands.add('selectPersonalPickup', () => {
  cy.get('label[for=delivery_3]').click()
})
Cypress.Commands.add('selectFreePayment', () => {
  cy.get('label[for=payment_3]').click()
})
Cypress.Commands.add('selectPaidPayment', () => {
  cy.get('label[for=payment_1]').click()
})
Cypress.Commands.add('paidPaymentCheckbox', () => {
  cy.get('#payment_1')
})

// Form general
Cypress.Commands.add('formIsValid', () => {
  cy.get('.formSubmit').should('have.class', 'formSubmit--ready')
})
Cypress.Commands.add('formIsNotValid', () => {
  cy.get('.formSubmit').should('have.class', 'formSubmit--notReady')
})


