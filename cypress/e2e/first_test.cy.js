describe('Arriva Bus - Homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.arrivabus.co.uk/')
    cy.wait(6000)
    cy.get('#onetrust-accept-btn-handler').click()
    Cypress.on('uncaught:exception', (err, runnable) => {
 
  return false;
});
  })
  
  it('date check 60 days from today should be disabled', () => {
    
  
    
const today = new Date(); 

const date = today.getDate();
let month = today.getMonth() + 1; 




let unavailable_date = new Date(today); 
unavailable_date.setDate(today.getDate() + 61); 
let paddedDate = String(unavailable_date.getDate()).padStart(2, '0');
//cy.log(`Unavailable Date: ${unavailable_date}`);
cy.get('body').then(()=>{
    cy.get('#DPdefault').click()
    for (let i =0 ;i<2;i++)
    {
      cy.get('#next-month-handler').click()
      cy.get(`.react-datepicker__day--0${paddedDate}`+'.react-datepicker__day--disabled').should('contain.class','react-datepicker__day--disabled')
      
      if(cy.get('#next-month-handler').should('be.disabled'))
      {
        break;

      } else {
        cy.get('#next-month-handler').click()
      }
    }
    
  
  })

  });


  })



