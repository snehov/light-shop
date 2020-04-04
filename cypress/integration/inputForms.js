describe('Open cart with some item in it', () => {
  it('Fill only name, submit, expect error submit', () => {
    cy.clearedOrderWithOneProduct()
    cy.selectPaidDelivery()
    cy.selectFreePayment()
    cy.formIsNotValid()
    cy.get('#name_personal').type('jarmil')
    cy.formIsNotValid()
    cy.get('.formSubmit').click()
    cy.get('label[for=tel_personal]')
      .parent()
      .within(() => {
        cy.get('.validation--error')
      })
  })
  it('Test email validation', () => {
    cy.get('#tel_personal').type('abc')
    cy.get('#email_personal')
      .type('abc')
      .blur()
    cy.get('label[for=email_personal]')
      .parent()
      .within(() => {
        cy.get('.validation--error')
      })
    cy.get('#email_personal')
      .type('name@domain.com')
      .blur()
    cy.get('label[for=email_personal]')
      .parent()
      .within(() => {
        cy.get('.validation--empty')
      })
  })
  const delivStreet = 'Wilkinson 2nd'
  const delivCity = 'Mojokerto'
  const zip = '14900'
  it('Fill delivery address', () => {
    cy.get('#descr_delivery').type('Reception at 2nd floor')
    cy.get('#street_delivery').type(delivStreet)
    cy.get('#city_delivery').type(delivCity)
    cy.get('#zip_delivery').type(zip)
    cy.formIsValid()
  })
  it('Fill uncheck invoice addr same as delivery', () => {
    cy.get('#street_invoice').should('not.be.visible')
    cy.get('.cy-invAsDeliv').click()
    cy.get('#street_invoice').should('be.visible')
    cy.get('#street_invoice').should('have.value', delivStreet)
    cy.get('#city_invoice').should('have.value', delivCity)
    cy.get('#zip_invoice').should('have.value', zip)
    cy.formIsValid()
  })
  // TODO add reload (cy.reload()) and check pre-filling
  // TODO add company value checking
})
