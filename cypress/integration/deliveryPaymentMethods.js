describe('Tests selecting delivery and payment methods', () => {
  it('Load cart item', () => {
    cy.request('https://snowcorp.cz/ls/cart_api/resetAll')
    cy.request('https://snowcorp.cz/ls/cart_api/addTestProduct1')
    cy.visit('/')
  })
  it('Select paid delivery', () => {
    cy.get('.cart-sum__TOTAL').contains('100 Kč')
    cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--hidden')
    cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
    cy.get('label[for=delivery_1]').click()
    cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--visible')
    cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
    cy.get('.cart-sum__TOTAL').contains('220 Kč')
  })
  it('Select free delivery', () => {
    cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--visible')
    cy.get('label[for=delivery_3]').click()
    cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--hidden')
    cy.get('.cart-sum__TOTAL').contains('100 Kč')
  })
  it('Select free payment', () => {
    cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
    cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--hidden')
    cy.get('label[for=payment_3]').click()
    cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--hidden')
    cy.get('.cart-sum__TOTAL').contains('100 Kč')
    cy.get('.deliveryInfoInputs').should('have.not.class', 'disabledBlock')
  })
  it('Select paid delivery and payment both', () => {
    cy.get('label[for=delivery_1]').click()
    cy.get('.cy-cart-delivery').should('have.class', 'cart-extraItem--visible')
    cy.get('.cart-sum__TOTAL').contains('220 Kč')

    cy.get('label[for=payment_1]').click()
    cy.get('.cy-cart-payment').should('have.class', 'cart-extraItem--visible')
    cy.get('.cart-sum__TOTAL').contains('237 Kč')
  })
  it('Change delivery with incosistent payment to current one', () => {
    cy.get('label[for=delivery_3]').click()
    cy.get("#payment_1").should('not.be.checked')
    cy.get("#payment_1").should('be.disabled')

  })
})
