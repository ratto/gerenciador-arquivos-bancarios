describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the dark mode toggle button in the toolbar', () => {
    cy.get('[data-testid="dark-mode-toggle"]').should('exist').and('be.visible');
  });

  it('toggles dark mode when clicking the button', () => {
    // Initially, body should not have body--dark (assuming system prefers light)
    // Click to enable dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('have.class', 'body--dark');

    // Click again to disable dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('not.have.class', 'body--dark');
  });

  it('shows correct aria-label based on current mode', () => {
    // After toggling to dark mode, aria-label should indicate switching to light
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('[data-testid="dark-mode-toggle"]').should(
      'have.attr',
      'aria-label',
      'Ativar modo claro',
    );

    // After toggling back to light mode, aria-label should indicate switching to dark
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('[data-testid="dark-mode-toggle"]').should(
      'have.attr',
      'aria-label',
      'Ativar modo escuro',
    );
  });

  it('applies dark mode immediately without page reload', () => {
    // Toggle to dark mode and verify it applies without reload
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('have.class', 'body--dark');

    // Verify the Quasar header adapts (dark class is applied globally)
    cy.get('.q-header').should('exist');
  });
});
