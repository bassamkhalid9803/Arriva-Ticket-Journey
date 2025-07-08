import moment from 'moment';

describe('Arriva UK Bus Website - Date Selection Validation', () => {
    const WEBSITE_URL = 'https://www.arrivabus.co.uk/';
    const DEPARTING_DATE_INPUT_SELECTOR = '._2SEQYXPF0ZUk74ybGirxc4'; 
    const DATE_PICKER_SELECTOR = '.react-datepicker';
    const NEXT_MONTH_BUTTON_SELECTOR = '#next-month-handler';
    const DAY_SELECTOR = '.react-datepicker__day';
    const DISABLED_DAY_CLASS = 'react-datepicker__day--disabled';
    // Selector for the displayed month/year (e.g., "August 2024")
    // If this selector is no longer correct, you MUST update it after inspecting the DOM.
    const CURRENT_MONTH_YEAR_SELECTOR = '.react-datepicker__month'; 

    beforeEach(() => {
        cy.visit(WEBSITE_URL);
        cy.wait(6000); 
        cy.get('#onetrust-accept-btn-handler').click(); 

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false; 
        });
    });

    /**
     * Helper function to navigate the date picker to a specific month.
     * @param {moment.Moment} targetDate - The moment.js object for the target date.
     */
    const navigateToMonth = (targetDate) => {
        // *** CRITICAL FIX HERE: Ensure the month/year display element is visible ***
        cy.get(CURRENT_MONTH_YEAR_SELECTOR)
            .should('be.visible') // Add this to wait for the element to appear and be visible
            .then(($currentMonthEl) => {
                const currentMonthText = $currentMonthEl.text();
                cy.log(`Initial Month Text: "${currentMonthText}"`); // Debugging: check what moment is parsing
                // Ensure the moment format 'MMMM YYYY' matches the actual text, e.g., "August 2024"
                const currentMonthMoment = moment(currentMonthText, 'MMMM YYYY');

                let attempts = 0;
                const maxAttempts = 12; // Max 12 clicks (approx. one year ahead)

                while (currentMonthMoment.isBefore(targetDate, 'month') && attempts < maxAttempts) {
                    cy.get(NEXT_MONTH_BUTTON_SELECTOR).click();
                    // *** CRITICAL FIX HERE: Wait for the updated month/year element to be visible after click ***
                    cy.get(CURRENT_MONTH_YEAR_SELECTOR, { timeout: 10000 })
                        .should('be.visible') // Wait for the element to re-render and become visible
                        .then(($updatedMonthEl) => {
                            const updatedMonthText = $updatedMonthEl.text();
                            cy.log(`After click, Updated Month Text: "${updatedMonthText}"`); // Debugging
                            currentMonthMoment.set(moment(updatedMonthText, 'MMMM YYYY'));
                        });
                    attempts++;
                }
                if (attempts >= maxAttempts) {
                    throw new Error(`Failed to navigate to target month ${targetDate.format('MMMM YYYY')} after ${maxAttempts} attempts.`);
                }
            });
    };

    it('should allow selecting the 60th day from today and disable the 61st day', () => {
        const today = moment();
        const day60 = today.clone().add(60, 'days');
        const day61 = today.clone().add(61, 'days');

        // 1. Open the date picker by clicking the departing date input
        cy.get(DEPARTING_DATE_INPUT_SELECTOR).click();
        cy.get(DATE_PICKER_SELECTOR).should('be.visible');

        // 2. Navigate to the month of the 60th day
        cy.log(`Navigating to month for 60th day: ${day60.format('MMMM Do, YYYY')}`);
        navigateToMonth(day60);

        // 3. Select the 60th day
        const day60AriaLabelFormat = 'dddd, MMMM Do, YYYY'; 
        const targetDay60Selector = `${DAY_SELECTOR}[aria-label*="${day60.format(day60AriaLabelFormat)}"]`;

        cy.get(targetDay60Selector)
          .should('be.visible') 
          .should('not.have.class', DISABLED_DAY_CLASS) 
          .click();

        // 4. Verify the 60th day is selected in the input field
        cy.get(DEPARTING_DATE_INPUT_SELECTOR)
            .should('have.value', day60.format('DD/MM/YYYY')); 

        // 5. Re-open the date picker to check the 61st day
        cy.get(DEPARTING_DATE_INPUT_SELECTOR).click();
        cy.get(DATE_PICKER_SELECTOR).should('be.visible');

        // 6. Navigate to the month of the 61st day
        cy.log(`Navigating to month for 61st day: ${day61.format('MMMM Do, YYYY')}`);
        navigateToMonth(day61);

        // 7. Verify the 61st day is disabled
        const day61AriaLabelFormat = 'dddd, MMMM Do, YYYY'; 
        const targetDay61Selector = `${DAY_SELECTOR}[aria-label*="${day61.format(day61AriaLabelFormat)}"]`;

        cy.get(targetDay61Selector)
            .should('be.visible') 
            .should('have.class', DISABLED_DAY_CLASS) 
            .and('have.attr', 'aria-disabled', 'true'); 

        // Optional: Attempt to click the disabled 61st day and assert no change
        cy.get(targetDay61Selector)
            .click({ force: true }); 

        // Verify the input value has not changed from the 60th day
        cy.get(DEPARTING_DATE_INPUT_SELECTOR)
            .should('have.value', day60.format('DD/MM/YYYY'));
    });
});