context('Todo', () => {
  beforeEach(() => {
    cy.server()
  })

  describe('Adds, removes, edits', () => {
    it('adds a todo', () => {
      cy.fixture('todo/list-data.json')
        .as('list')
        .then((data) => {
          cy.visit('/')

          Object.keys(data).map((id, i) => {
            cy.get('[name=name]').should('exist').type(data[id].name)
            cy.get('[name=desc]').should('exist').type(data[id].desc)
            cy.get('[data-cy=add]').click()

            cy.get(`[data-cy=todo-list-item]:nth-of-type(${i + 1})`)
              .should('exist')
              .find('[data-cy=name]')
              .should('contain', data[id].name)

            cy.get(`[data-cy=todo-list-item]:nth-of-type(${i + 1})`)
              .should('exist')
              .find('[data-cy=desc]')
              .should('contain', data[id].desc)
          })
        })
    })

    it('removes a todo', () => {
      cy.fixture('todo/list-data.json')
        .as('remove')
        .then((data) => {
          const id = Object.keys(data)[0]

          cy.get('[data-cy=todo-list-item]')
            .should('exist')
            .first()
            .find('[data-cy=name]')
            .should('contain', data[id].name)

          cy.get('[data-cy=remove]').first().click()

          cy.get('[data-cy=todo-list-item]')
            .should('exist')
            .first()
            .find('[data-cy=name]')
            .should('not.be', data[id].name)
        })
    })

    it('edits a todo', () => {
      cy.fixture('todo/list-data.json')
        .as('edit')
        .then((data) => {
          const id = Object.keys(data)[1]
          const newValue = 42

          cy.get('[data-cy=edit]').first().click()

          cy.get('[data-cy=edit-modal]').should('be.visible')

          cy.get('[data-cy=edit-modal-name]')
            .should('have.value', data[id].name)
            .clear()
            .type(newValue)

          cy.get('[data-cy=save]').first().click()

          cy.get('[data-cy=todo-list-item]')
            .first()
            .find('[data-cy=name]')
            .should('contain', newValue)
        })
    })
  })
})
