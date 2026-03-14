describe('Dark Mode Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Helper: opens the navigation drawer via the FAB button
  function openDrawer() {
    cy.get('[aria-label="Abrir menu"]').click();
    // Wait for drawer to be visible
    cy.get('[data-testid="dark-mode-toggle"]').should('exist');
  }

  it('renders the dark mode toggle inside the drawer', () => {
    openDrawer();
    cy.get('[data-testid="dark-mode-toggle"]').should('exist').and('be.visible');
  });

  it('toggles dark mode when clicking the toggle', () => {
    openDrawer();
    // App starts in dark mode (Dark.set(true) in boot file)
    // Click once to disable dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('not.have.class', 'body--dark');

    // Click again to re-enable dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('have.class', 'body--dark');
  });

  it('shows correct aria-label based on current mode', () => {
    openDrawer();
    // App starts in dark mode — aria-label should indicate switching to light
    cy.get('[data-testid="dark-mode-toggle"]').should(
      'have.attr',
      'aria-label',
      'Ativar modo claro',
    );

    // Click to switch to light mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('[data-testid="dark-mode-toggle"]').should(
      'have.attr',
      'aria-label',
      'Ativar modo escuro',
    );
  });

  it('applies dark mode immediately without page reload', () => {
    openDrawer();
    // Disable dark mode first
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('not.have.class', 'body--dark');

    // Re-enable dark mode
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get('body').should('have.class', 'body--dark');
  });
});
