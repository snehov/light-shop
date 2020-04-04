describe('Tests selecting delivery and payment methods', () => {
  it('Load cart item', () => {
    cy.clearedOrderWithOneProduct()
  })
  it('Select paid delivery', () => {
    cy.totalSum().contains('100 Kč')
    cy.cartNotHaveDeliveryItem()
    cy.deliveryInfoInputsDisabled()
    //cy.get('label[for=delivery_1]').click()
    cy.selectPaidDelivery()
    cy.cartHaveDeliveryItem()
    cy.deliveryInfoInputsDisabled()
    cy.totalSum().contains('220 Kč')
  })
  it('Select free delivery', () => {
    cy.cartHaveDeliveryItem()
    cy.selectFreeDelivery()
    cy.cartNotHaveDeliveryItem()
    cy.totalSum().contains('100 Kč')
  })
  it('Select free payment', () => {
    cy.deliveryInfoInputsDisabled()
    cy.cartNotHavePaymentItem()
    cy.selectFreePayment()
    cy.cartNotHavePaymentItem()
    cy.totalSum().contains('100 Kč')
    cy.deliveryInfoInputsEnabled()
  })
  it('Select paid delivery and payment both', () => {
    cy.get('label[for=delivery_1]').click()
    cy.cartHaveDeliveryItem()
    cy.totalSum().contains('220 Kč')

    cy.selectPaidPayment()
    cy.cartHavePaymentItem()
    cy.totalSum().contains('237 Kč')
  })
  it('Change delivery with incosistent payment to current one', () => {
    cy.selectFreeDelivery()
    cy.get("#payment_1").should('not.be.checked')
    cy.get("#payment_1").should('be.disabled')

  })
})
