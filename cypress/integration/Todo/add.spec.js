context('Todo', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
  })

  describe('Adds, edits, removes', () => {
    it('adds a todo', () => {
      cy.fixture('todo/list-data.json')
        .as('list')
        .then(({ data }) => {
          cy.get('[name=name]').should('exist').type(data[0].name)
          cy.get('[name=desc]').should('exist').type(data[0].desc)
          cy.get('[data-cy=add]').click()

          cy.get('[data-cy=todo-list-item]')
            .should('exist')
            .first()
            .find('[data-cy=name]')
            .should('contain', data[0].name)

          cy.get('[data-cy=todo-list-item]')
            .should('exist')
            .first()
            .find('[data-cy=desc]')
            .should('contain', data[0].desc)
        })
    })
  })
})
