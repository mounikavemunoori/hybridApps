
import LoginPage from '../../pageObjects/login.page.js'
import QantasPage from '../../pageObjects/qantasPage.js'
import { assert } from 'chai';

describe('Qantas Website Tests', () => {
    before(async () => {
        await LoginPage.open()
    });

    it('should display the Qantas logo', async () => {
        const isDisplayed = await QantasPage.isQantasLogoDisplayed()
        assert.isTrue(isDisplayed,'Qantas Log is not displayed')
    });

    it('should not display an incorrect logo', async () => {
        const isDisplayed = await QantasPage.isInvalidLogoDisplayed();
        // Negative test
        assert.isFalse(isDisplayed, 'Incorrect logo should not be displayed');  
    });

    it('should display the login button', async () => {
        const isDisplayed = await QantasPage.isLoginButtonDisplayed();
        // Positive test
        assert.isTrue(isDisplayed, 'Login button should be displayed');  
    });
    
})

