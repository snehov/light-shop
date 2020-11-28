import { baseURL } from '../../src/api'
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//# SLOW DOWN TESTING
const COMMAND_DELAY = 200
const SLOW_DOWN_TESTING = false

if (SLOW_DOWN_TESTING) {
	for (const command of ['click', 'get']) {
		Cypress.Commands.overwrite(command, (originalFn, ...args) => {
			const origVal = originalFn(...args)
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(origVal)
				}, COMMAND_DELAY)
			})
		})
	}
}
const URL_resetAll = baseURL + 'ls/cart_api/resetAll'
const URL_addTestProduct1 = baseURL + 'ls/cart_api/addTestProduct1'
const URL_addOnlineItem = baseURL + 'ls/cart_api/addOnlineItem'
const URL_clearCart = baseURL + 'ls/cart_api/clearCart'
const URL_removeTestUser = baseURL + 'removeTestUser'

// URL calling/visiting
const rootUrl = '/?env=test'
Cypress.Commands.add('resetAll', () => {
	cy.clearLocalStorage()
	cy.request(URL_resetAll)
	cy.reload()
})
Cypress.Commands.add('request_addTestProduct1', () => {
	cy.request(URL_addTestProduct1)
	cy.reload()
})
Cypress.Commands.add('clearedOrderWithOneProduct', () => {
	cy.resetAll()
	cy.request_addTestProduct1()
	cy.visit(rootUrl)
})
Cypress.Commands.add('visitRoot', () => {
	cy.visit(rootUrl)
})
Cypress.Commands.add('request_addOnlineItem', () => {
	cy.request(URL_addOnlineItem)
	cy.reload()
})
Cypress.Commands.add('request_clearCart', () => {
	cy.request(URL_clearCart)
	cy.reload()
})
Cypress.Commands.add('request_resetSession', () => {
	cy.request(URL_resetAll)
	cy.reload()
})
Cypress.Commands.add('request_removeTestUser', () => {
	cy.request(URL_removeTestUser)
	cy.reload()
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
Cypress.Commands.add('waitForDebounceSaveData', () => {
	cy.wait(2000) // eslint-disable-line
})
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
Cypress.Commands.add('paidDeliveryCheckbox', () => {
	cy.get('#delivery_1')
})
Cypress.Commands.add('paidPaymentCheckbox', () => {
	cy.get('#payment_1')
})
Cypress.Commands.add('onlineDeliveryCheckBox', () => {
	cy.get('#delivery_5')
})
Cypress.Commands.add('selectOnlineDelivery', () => {
	cy.get('label[for=delivery_5]').click()
})

// Form general
Cypress.Commands.add('formIsValid', () => {
	cy.get('.formSubmit').should('have.class', 'formSubmit--ready')
})
Cypress.Commands.add('formIsNotValid', () => {
	cy.get('.formSubmit').should('have.class', 'formSubmit--notReady')
})
