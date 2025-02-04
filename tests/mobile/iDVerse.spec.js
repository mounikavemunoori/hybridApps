
import { browser } from '@wdio/globals'
import IDversePage from '../../pageObjects/IDverse.page.js';
import { assert } from 'chai';

const urls = [
    'https://stagingclientautoidmatrix.au.staging-idkit.com/01J8M1HSJK14G3W01X3WEKPK4T',
    'https://stagingclientautoidmatrix.au.staging-idkit.com/01J8M1JR9RQQMB24M6HZHP0TNG',
    'https://stagingclientautoidmatrix.au.staging-idkit.com/01J8M1K5QD3EVS9VJ15DHEXJ6Z',
    'https://stagingclientautoidmatrix.au.staging-idkit.com/01J8M1KK9FZK96RWJA48XRE6R9',
    'https://stagingclientautoidmatrix.au.staging-idkit.com/01J8M1M5H8BJJFFQP0PAS3K92H'
];

describe('ID verse mobile automation', () => {
    before(async () => {
        await IDversePage.openUrl(urls[2])
    });

    it('should display the logo in the mobile browser', async () => {
        await IDversePage.waitUntilIDversePageLoad()
        const isLogoDisplayed = await IDversePage.isIDVerseLogoDisplayed()
        assert.isTrue(isLogoDisplayed,'Id verse Logo is not displayed')
    });

    it('should display Privacy consent header', async () => {
        const isHeaderDisplayed = await IDversePage.isPrivacyConsentHeaderDisplayed()
        assert.isTrue(isHeaderDisplayed,'Privacy consent header not is displayed')
    });

    it('should validate Privacy text display', async () => {
        const isDisplayed = await IDversePage.isPrivacyConsentTextDisplayed()
        assert.isTrue(isDisplayed,'Privacy consent text not is displayed')
        const actualPrivacyContentText = await IDversePage.getPrivacyConsentText()
        const expectedOutput = 'To verify your identity we capture your personal data from your ID docs and selfie'
        assert.include(actualPrivacyContentText, expectedOutput, 'Privacy consent text is not displayed')
    });

    it('should show an error when Accept is clicked without consent', async () => {
        await IDversePage.clickOnContinueButton()
        const actualCssProperty = await IDversePage.getCheckBoxCSSProperty()
        const expectedCssProperty = 'red'
        assert.include(actualCssProperty, expectedCssProperty, 'Red color property is not displayed if we not select the consent checkbox')
    })

    it('should validate Consent checkbox display and able to select privacy consent checkbox', async () => {
        const isCheckBoxDisplayed = await IDversePage.isPrivacyCheckBoxDisplayed()
        assert.isTrue(isCheckBoxDisplayed,'Privacy consent check box is not displayed')

        let checkBoxState = await IDversePage.isPrivacyCheckBoxChecked()
        assert.equal(checkBoxState, false, 'Privacy consent checkbox is selected')

        await IDversePage.clickOnPrivacyConsentCheckBox()
        checkBoxState = await IDversePage.isPrivacyCheckBoxChecked()
        assert.equal(checkBoxState, true, 'Privacy consent checkbox is not selected')
    });

    it('should click on continue button and navigate to next screen', async () => {
        await IDversePage.clickOnContinueButton()
        const isDisplayed = await IDversePage.isCaptureyourIdScreenDisplayed()
        assert.isTrue(isDisplayed,'Capture your Photo ID not is displayed')
        
        // Handling location popup
        // Switch to native context to accept the camera permission
       const beforeContent= await browser.getContext()
       const contexts = await browser.getContexts();
       await browser.switchContext(contexts[0]); // native context
       const afterContent= await browser.getContext()

       const isPopUpOptionDisplayed = await IDversePage.isAllowLocationPopUpOptionDisplayed()
       assert.isTrue(isPopUpOptionDisplayed,'Allow location pop up option is not displayed')

       isPopUpOptionDisplayed = await IDversePage.isBlockLocationPopUpOptionDisplayed()
       assert.isTrue(isDisplayed,'Block location pop up option is not displayed')
       await IDversePage.clickOnAllowLocationPopUpOption()

       // Switch to back to web view context
        await browser.switchContext(contexts[1]); // native context
        const actualContent= await IDversePage.getCaptureYourIDScreenContents()
        const expectedOutput = 'Take a photo of your Driver Licence, Proof of Age card or Passport'
        assert.include(actualContent, expectedOutput, 'Content is not displayed')

        const isSeeAvailableDocumentsDisplayed = await IDversePage.isSeeAvailableDocumentsDisplayed()
        assert.isTrue(isSeeAvailableDocumentsDisplayed,'See available documents option is  not displayed')
        
        // clicking on capture my ID screen
        await IDversePage.clickOnCaptureMyIDButton()
    });

    it('should accept camera popup', async () => {
        // Switch to native context to accept the camera permission
        const contexts = await browser.getContexts();
        await browser.switchContext(contexts[0]); // Switch to the native context
        const cameraPopup = await IDversePage.isCameraPopUpDisplayed(); 
        if (await cameraPopup) {
            await IDversePage.clickOnWhileUsingThisAppOtion(); // Click the Allow button for camera access
        }
        // want to switch back to web context after handling the popups
        await browser.switchContext(contexts[1]); // Switch back to the WebView context
    });
})

