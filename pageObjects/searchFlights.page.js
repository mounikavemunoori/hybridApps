import { $ } from '@wdio/globals'
import utils from '../utils/utils.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchFlightsPage {
    /**
     * locators for search flights
     */
    get departureInput() { return $('div[data-testid="departure-port"]'); }
    get inputField() { return $('div[data-testid="InlineDialog-Container"] input') }
    get destinationInput() { return $('div[data-testid="arrival-port"]');}
    get departureDate() { return $('div[data-testid="travel-dates"]'); }
    get searchButton() { return $('button[type="submit"]');}
    selectAirport(place) { return $`(//ul[@role="listbox"]//li[contains(@aria-label,"${place}")])`}
    selectDate(date){return $(`//button[contains(@aria-label, '${date}')]`)}
    get continueButton() {return $('button[data-testid="dialogConfirmation"]') }
    get searchFlights() { return $('div[data-testid="search-flights-btn"]')}
    get flightsHeader() {return $('//h1[contains(text(), "Flights")]')}
    get flightsCount() { return $$('//div[contains(@class,"list-of-flights")]')}
    get destinationWarningMessage() { return $('//div[@data-testid="arrival-port"]//div[contains(@class, "validation-messages")]')}
    get arriavalDateWarningMessage() { return $('//div[@data-testid="travel-dates"]//div[contains(@class, "validation-messages")]')}

    // methods for search flights
    async setDepatureInput(depaturePlace) {
        await utils.scrollToPixel(500)
        await this.departureInput.waitForDisplayed(); 
        await utils.clickElement(this.departureInput)
        await utils.setInputField(this.inputField, depaturePlace)
        await utils.clickElement(this.selectAirport(depaturePlace))
    }

    /**
     * a method to encapsule automation code to interact with the page
     * Entering the arrival place
     */
    async setArrivalInput(destinationPlace) {
        await utils.clickElement(this.destinationInput)
        await utils.setInputField(this.inputField, destinationPlace)
        await utils.clickElement(this.selectAirport(destinationPlace))
    }

    /**
     * a method to encapsule automation code to interact with the page
     * Entering the depature date
     */
    async selectDepartureDate(year, month, date) {
        await utils.clickElement(this.departureDate)
        const dateFormat = utils.datePicker(year, month, date)
        await utils.clickElement(this.selectDate(dateFormat))
    }

    /**
     * a method to encapsule automation code to interact with the page
     * Entering the return date
     */
    async selectReturnDate(year, month, date) {
        const dateFormat = utils.datePicker(year, month, date)
        await utils.clickElement(this.selectDate(dateFormat))
    }

    async clickOnContinueButton() {
        await utils.clickElement(this.continueButton)
    }

    async clickOnSearchFlights() {
        await utils.clickElement(this.searchFlights)
    }

    async isAvailableFlightsDisplayed(){
        await utils.waitForElementDisplayed(this.flightsHeader)
        return utils.isElementDisplayed(this.flightsHeader)
    }

    async getDestinationWarningMessage() {
        return utils.getElementValue(this.destinationWarningMessage)
    }

    async getArriavalDateWarningMessage(){
        return utils.getElementValue(this.arriavalDateWarningMessage)
    }
}

export default new SearchFlightsPage();
