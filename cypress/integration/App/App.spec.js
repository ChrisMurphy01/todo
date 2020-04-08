context('App', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
  })

  describe('App loads', () => {
    it('has loaded', () => {
      cy.get('[data-cy=app]').should('contain', 'App')
    })
  })
})
