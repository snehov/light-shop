describe('It check proper I18n switching', function () {
  it('Check default language labels are in CZ ', function () {
    cy.clearedOrderWithOneProduct()
    cy.get('.langToCz').click()
    cy.get('.cart__header').contains('Košík')
    cy.get('label[for=delivery_2]').contains('Poštou')
    cy.get('#name_personal').parent().contains('Jméno')
    cy.get('.langToEn').click()
    cy.get('.cart__header').contains('Shopping cart')
    cy.get('label[for=delivery_2]').contains('Czech post')
    cy.get('#name_personal').parent().contains('Name')
    cy.get('.langToCz').click()
    cy.get('.cart__header').contains('Košík')
    cy.get('.langToEn').click()
    cy.get('.cart__header').contains('Shopping cart')
    cy.reload()
    cy.get('.cart__header').contains('Shopping cart')
    cy.get('label[for=delivery_2]').contains('Czech post')
  })
})
