context('Recorder', () => {
  before(() => {
    cy.server()
    cy.visit('/')
  })

  describe('Records adds, remove, edit', () => {
    it('playback', () => {
      cy.fixture('recording/recording.json')
        .as('storage')
        .then((storage) => {
          cy.fixture('todo/list-data.json')
            .as('list')
            .then((data) => {
              localStorage.setItem('todoRecording', JSON.stringify(storage))
              cy.get('[data-cy=play]').click()

              cy.wait(1500)

              cy.get(`[data-cy=todo-list-item]:nth-of-type(1)`)
                .find('[data-cy=name]')
                .should('contain', data.jaumvuc5lgs.name)

              cy.wait(3000)
              cy.get(`[data-cy=todo-list-item]:nth-of-type(1)`)
                .find('[data-cy=name]')
                .should('not.contain', data.jaumvuc5lgs.name)

              cy.wait(3000)
              cy.get(`[data-cy=todo-list-item]:nth-of-type(1)`)
                .find('[data-cy=name]')
                .should('contain', 42)
            })
        })
    })
  })
})
