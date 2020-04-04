const deliverDescr = 'Delivery 2nd place'
const delivStreet = 'Wilkinson 2nd'
const delivCity = 'Mojokerto'
const zip = '14900'

describe('Play with input form fields', () => {
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
  it('Fill delivery address', () => {
    cy.get('#descr_delivery').type('Reception at 2nd floor')
    cy.get('#street_delivery').type(delivStreet)
    cy.get('#city_delivery').type(delivCity)
    cy.get('#zip_delivery').type(zip)
    cy.formIsValid()
  })
  it('Uncheck invoice addr which shoul be now same as delivery', () => {
    cy.get('#street_invoice').should('not.be.visible')
    cy.get('.cy-invAsDeliv').click()
    cy.get('#street_invoice').should('be.visible')
    cy.get('#street_invoice').should('have.value', delivStreet)
    cy.get('#city_invoice').should('have.value', delivCity)
    cy.get('#zip_invoice').should('have.value', zip)
    cy.formIsValid()
  })
  it('Write different delivery addres, uncheck and check copy invoice addr', () => {
    cy.get('#descr_delivery')
      .clear()
      .type(deliverDescr)
    cy.get('#descr_invoice')
      .clear()
      .type('Invoice descr')
    cy.get('.cy-invAsDeliv').click()
    cy.get('#descr_invoice').should('not.be.visible')
    cy.get('.cy-invAsDeliv').click()
    cy.get('#descr_invoice').should('have.value', deliverDescr)
    cy.get('.cy-invAsDeliv').click()
    cy.formIsValid()
  })
  it('Check if company info get cleared if uncheck and check company again', () => {
    cy.get('#name_company').should('not.be.visible')
    cy.get('.cy-fillCompany').click()
    cy.get('#name_company').should('be.visible')
    cy.get('#name_company').type('TestCorp s.r.o.')
    cy.get('.cy-fillCompany').click()
    cy.get('#name_company').should('not.be.visible')
    cy.get('.cy-fillCompany').click()
    cy.get('#name_company').should('have.value', '')
    cy.get('.cy-fillCompany').click()
  })
  it('Fill company info', () => {
    cy.get('#name_company').should('not.be.visible')
    cy.get('.cy-fillCompany').click()
    cy.get('#name_company').should('be.visible')
    cy.get('#name_company').type('TestCorp s.r.o.')
    cy.get('#crn_company').type('783259')
    cy.get('#utr_company').type('CZ783259')
    cy.formIsValid()
  })
  // TODO add reload (cy.reload()) and check pre-filling
  // TODO add company value checking
})

describe('Test refresh and pre-filling already filled values', () => {
  it('After refresh it should have still same input values', () => {
    cy.wait(2000) // eslint-disable-line
    cy.reload()
    cy.get('#descr_delivery').should('have.value', deliverDescr)
    cy.get('#street_delivery').should('have.value', delivStreet)
    cy.get('#city_delivery').should('have.value', delivCity)
    cy.get('#zip_delivery').should('have.value', zip)

  })
})
