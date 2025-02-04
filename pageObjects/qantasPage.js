import { $ } from '@wdio/globals'
import Page from './page.js';
// import utils from '../../utils/utils.js';
import utils from '../utils/utils.js';

class QantasPage extends Page {

    // locators
    get qantasLogon(){
        return $(`//body[contains(@class, 'homepage')]//img[contains(@class, 'logoQantas')]`) }
    get loginButton(){ return $(`.login-ribbon`)}
    get invalidLogo() { return $('img[alt="InvalidLogo"]')}



    // actions on elements
    async waitForLogo() {
        await this.qantasLogon.waitForDisplayed()
    }

    async isQantasLogoDisplayed() {
        await utils.maximizeWindow()
        return await utils.isElementEnabled(this.qantasLogon)
    }
    async isInvalidLogoDisplayed() {
        return await utils.isElementDisplayed(this.invalidLogo)
    }
     // Method to check if the login button is displayed
     async isLoginButtonDisplayed() {
        return await utils.isElementDisplayed(this.loginButton);
    }
}

export default new QantasPage()