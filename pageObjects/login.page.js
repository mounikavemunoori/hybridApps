import { $ } from '@wdio/globals'

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage  {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open () {
        await browser.url(`https://www.qantas.com/au/en.html`) 
        await browser.maximizeWindow()
    }
}

export default new LoginPage();
