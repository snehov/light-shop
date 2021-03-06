//Cypress.env('REACT_APP_TT')
describe('It opens empty cart', function () {
  it('Visits empty cart ', function () {
    cy.resetAll()
    cy.visitRoot()
    cy.get('.cart__header').should('have.class', 'cart__header--empty')
  })
})
describe('Open cart with some item in it', () => {
  it('Check present items in cart', () => {
    cy.request_addTestProduct1()
    cy.visitRoot()
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
  it('Changing amount input to another number', () => {
    cy.get('.cart-item--amount__input').type('{backspace}').type(7)
    cy.get('.cart-item--price__sum').contains('700 Kč')
    cy.get('.cart-sum__TOTAL').contains('700 Kč')
  })
  it('Reudce count by one by click on minus', () => {
    cy.get('.cart-item--amount__minus').click()
    cy.get('.cart-item--price__sum').contains('600 Kč')
  })
})
describe('After reload cart loads already changed values', () => {
  it('After refresh it should have same items counts', () => {
    cy.reload()
    cy.get('.cart-item--price__sum').contains('600 Kč')
    cy.get('.cart-sum__TOTAL').contains('600 Kč')
  })
})
describe('Test session expiration and reloading of previous cart items', () => {
  it('Clear cart and expect to visit empty cart', () => {
    cy.request_resetSession()
    cy.get('.cart__header').should('have.class', 'cart__header--empty')
  })
  it('Clear localStorage and check its really cleared and cart is empty', () => {
    cy.resetAll()
    cy.reload()
    cy.get('.cart__header').should('have.class', 'cart__header--empty')
  })
  it('add item to cart, reset session, load cart from locastorage', () => {
    cy.request_addTestProduct1()
    cy.visitRoot()
    cy.get('.cart-item')
    cy.request_resetSession()
  })
  it('Should send localstored items to BE, which will renew cart from it', () => {
    cy.reload()
    cy.get('.cart-item')
  })
})
