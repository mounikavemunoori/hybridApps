
import LoginPage from '../../pageObjects/login.page.js'
import searchFlightsPage from '../../pageObjects/searchFlights.page.js';
import { assert } from 'chai';

describe('Qantas Flight Search Tests', () => {
    before(async () => {
        await LoginPage.open()
    });

    it('should search for flights with valid input', async () => {
        await searchFlightsPage.setDepatureInput('Sydney, Australia')
        await searchFlightsPage.setArrivalInput('Adelaide')
        await searchFlightsPage.selectDepartureDate(2024, 8, 27)
        // return date
        await searchFlightsPage.selectReturnDate(2024, 8, 30)
        await searchFlightsPage.clickOnContinueButton()
        await searchFlightsPage.clickOnSearchFlights()
        assert.isTrue(await searchFlightsPage.isAvailableFlightsDisplayed(), 'Search flights are not displayed'); 
        
        // Further validation - Check for the presence of flights in the results
        assert.isAbove(searchFlightsPage.flightsCount.length, 0, 'No flights available'); 
    });

    it('Verify the error handling/messages without entering the destination and deapture date in the search', async () => {
        await searchFlightsPage.setDepatureInput('Sydney, Australia')
        await searchFlightsPage.clickOnSearchFlights()
        // verify the error messages for destiantion and time
        const destinationWarningMsg = await searchFlightsPage.getDestinationWarningMessage()
        const arriavalDateWarningMsg = await searchFlightsPage.getDestinationWarningMessage()
        assert.equal(destinationWarningMsg, 'Please select an arrival airport')
        assert.equal(arriavalDateWarningMsg, 'Please select a departure date')
    });

})

