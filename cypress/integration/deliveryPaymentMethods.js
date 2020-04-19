import cz from '../../src/i18n/cz.json'
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
    cy.selectPersonalPickup()
    cy.paidPaymentCheckbox().should('not.be.checked')
    cy.paidPaymentCheckbox().should('be.disabled')
    cy.get('#payment_2').should('be.checked')
  })
})

describe('Test refresh and pre-filling already selected values', () => {
  it('After refresh it should have still same selected values', () => {
    cy.wait(2000) // eslint-disable-line
    cy.reload()
    cy.get('#delivery_3').should('be.checked')
    cy.get('#payment_2').should('be.checked')
  })
})
describe('Test online products', () => {
  it('Reset cart, add online item ', () => {
    cy.resetAll()
    cy.request_addOnlineItem()
    cy.get('.cart-item')
  })
  it('Check disabled deliveries', () => {
    cy.get('#delivery_1').should('be.disabled')
    cy.get('#delivery_2').should('be.disabled')
    cy.get('#delivery_3').should('be.disabled')
    cy.onlineDeliveryCheckBox().should('be.enabled')
  })
  it('Select online delivery', () => {
    cy.selectOnlineDelivery()
  })
  it('Check disabled payments', () => {
    cy.get('#payment_1').should('be.disabled')
    cy.get('#payment_2').should('be.enabled')
  })
  it('Select online payment', () => {
    cy.selectFreePayment()
    cy.get('.formSubmit__fieldsLeft').contains(
      cz.translation.orderInfo.justAgreeLeft,
    )
  })
  it('After checking agree, form shoud be valid to submit', () => {
    cy.get('#terms_agree_checkmark').click()
    cy.get('.formSubmit__fieldsLeft').contains(
      cz.translation.orderInfo.sendWithSum,
    )
  })
})
