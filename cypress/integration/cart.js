describe('It opens empty cart', function() {
  it('Visits empty cart', function() {
    cy.request('https://snowcorp.cz/ls/cart_api/resetAll')
    cy.visit('/')
    //cy.contains('.cart__header--empty')
    //cy.get('.cart__header').contains('Košík je prázdný')
    cy.get('.cart__header').should('have.class', 'cart__header--empty')
  })
})
describe('Open cart with some item in it', () => {
  it('Check present items in cart', () => {
    cy.request('https://snowcorp.cz/ls/cart_api/addTestProduct1')
    cy.visit('/')
    cy.get('.cart')
    cy.get('.cart-item')
  })
  it('Check presence of delivery and payment methods', () => {
    cy.get('.deliveryAndPay')
  })
  it('Check fill forms are present, but not reachable', () => {
    cy.get('.deliveryInfoInputs').should('have.class', 'disabledBlock')
    cy.get('#name_personal')
      .should('have.css', 'pointer-events')
      .and('match', /none/)
  })
})
describe('Try some item changes', () => {
  it('Increase item amout and recalculate price', () => {
    cy.get('.cart-item')
    cy.get('.cart-item--amount__input').should('have.value', '1')
    cy.get('.cart-item--price__sum').contains('100 Kč')
    cy.get('.cart-item--amount__plus').click()
    cy.get('.cart-item--amount__input').should('have.value', '2')
    cy.get('.cart-item--price__sum').contains('200 Kč')
    cy.get('.cart-sum__TOTAL').contains('200 Kč')
  })
})

