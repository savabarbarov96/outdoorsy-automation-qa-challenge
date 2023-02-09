/// <reference types="Cypress" />

const keywordSearch = "Travel";
// Function to prevent code duplication
const selectVehicle = () => {
  cy.get('[data-testid="more-menu-item"] > .relative').click();
  cy.get('[data-testid="keyword-search-input-container"]').click().type(keywordSearch); // type the keyword
  cy.wait(500); // wait for data to populate
  cy.get('[data-testid="apply-filter-button"]').click(); // click the search button
  cy.url().should("include", "keywords=" + keywordSearch); // verify the query params are present and the keyword matches
  cy.get('[data-testid="rental-listing-tile-103823-2020-21-ft-travel-trailer"] > [data-testid="link"] > .flex-col-reverse > .ListingTile_image__Qfq6p > .ListingTile_imageInner__g51y6 > .ListingTileCarousel_tileCarousel__3j9_J > [data-testid="tile-photos-slide-carousel"] > .slick-slider > .slick-list > .slick-track > .slick-active > :nth-child(1) > div').click();
  cy.url().should("include", "https://checkout-staging.wheelbasepro.com/r/reserve/103823?owner_id=28880"); // verify the page transition
};


beforeEach(() => {
  cy.visit('https://checkout-staging.wheelbasepro.com/r/reserve?owner_id=28880')
})

describe('Checkout pages', () => {
  it('should have page title', () => {
    cy.visit('https://checkout-staging.wheelbasepro.com/r/reserve?owner_id=28880') // visit the URL
    cy.title().should("equal", "Martin RV Rentals.com") // verify the page title 
  })

  it('should be able to select dates', () => {
    cy.get('[data-testid="add-dates-btn"]').click() // Open calendar
    cy.get('[aria-label="Fri Feb 10 2023"]').click() // Select Date1
    cy.get('[aria-label="Mon Feb 13 2023"]').click() // Select Date2
    cy.url().should('include', 'from=2023-02-10&to=2023-02-13') // Check if query params are present in the url


  })
  it('should be able to do a keyword search', () => {

    const keywordSearch = "Travel" // keyword

    cy.get('[data-testid="more-menu-item"] > .relative').click()
    cy.get('[data-testid="keyword-search-input-container"]').click().type(keywordSearch)  // type the keyword
    cy.wait(500) // wait for data to populate
    cy.get('[data-testid="apply-filter-button"]').click() // click the search button
    cy.url().should("include", "keywords=" + keywordSearch) // verify the query param
  })

  it('should be able select a vehicle listing', () => {

    // I decided not to use the function selectVehicle here to show an example

  selectVehicle()
  })

  it("should be able to select and view vehicle in image gallery", () => {
    selectVehicle()
    cy.get(':nth-child(1) > a.w-full > [data-testid="img"]').click(); // click on the photos
    cy.url().should("contain", "photos?") // verify we are lookinng at the photos
  });


  it('should be able to close image gallery popup', () => {

    selectVehicle();
    cy.get(':nth-child(1) > a.w-full > [data-testid="img"]').click() // click on an image
    cy.url().should("contain", "photos?") // verify we are looking at the photos page
    cy.get('.GalleryCarousel_galleryItem__LcNHo').should('be.visible') // verify that the element is visible before closing
    cy.get('.right-3 > button:nth-child(1)').dblclick() // exit the popup
    cy.get('.GalleryCarousel_galleryItem__LcNHo').should('not.exist') // verify the element is not visible

  })
})
