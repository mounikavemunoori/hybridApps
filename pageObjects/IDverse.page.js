import { $ } from '@wdio/globals'
import Page from './page.js';
import utils from '../utils/utils.js';

class IDVersePage extends Page {

    // locators
    get idVerseLogo() { return $('img[class="logo"]')}
    get privacyConsentHeader() { return $('div[class="title"]')}
    get privacyConsentText() { return $('div[class="contents"]')}
    get consentAgreementLabel() { return $('label[class="label"]')}
    get consentCheckBox() { return $('button[role="checkbox"]')}
    get continueButton() { return $('//button[contains(text(), "Continue")]')}

    // capture your ID screen ID locators
    get captureYourIdHeader() { return $('div[class="title"]')} // Capture your Photo ID
    get content() { return $('[class="contents"]')}  // Take a photo of your Driver Licence, Proof of Age card or Passport.
    get animationImg() { return $('div[class="animation-container"]')}
    get seeAvailableDocuments() { return $('div[class="available-documents"]')}
    get captureMyIdButton() { return $('//button[contains(text(), "Capture my ID")]')}


    get documentsList() { return $$('div.document-name')}
    get backButton() { return $('span[class="back_button_label"]')}

    // Native locators
    // camera locators
    get whileUsingTheApp() { return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]')}
    // locatons locators
   get blockLocationBtn() { return $('//android.widget.Button[@text="Block"]')}
   get allowLocationBtn() { return $('//android.widget.Button[@text="Allow"]')}


    async openUrl(url) {
        await browser.url(url)
    }

    async waitUntilIDversePageLoad(){
        await utils.waitForElementDisplayed(this.consentCheckBox)
    }

    async isIDVerseLogoDisplayed() {
        return await utils.isElementDisplayed(this.idVerseLogo)
    }

    async isPrivacyConsentHeaderDisplayed() {
        return await utils.isElementDisplayed(this.privacyConsentHeader)
    }

    async isPrivacyConsentTextDisplayed(){
        return await utils.isElementDisplayed(this.privacyConsentText)
    }

    async getPrivacyConsentText(){
        return await utils.getElementText(this.privacyConsentText)
    }

    async getPrivacyConsentAgreementLabel() {
        return await utils.getElementText(this.consentAgreementLabel)
    }

    async isPrivacyCheckBoxChecked(){
        return await utils.isElementSelected(this.consentCheckBox)
    }

    async isPrivacyCheckBoxDisplayed(){
        return await utils.isElementDisplayed(this.consentCheckBox)
    }

    async clickOnPrivacyConsentCheckBox(){
         await utils.clickElement(this.consentCheckBox)
    }

    async clickOnContinueButton(){
        await utils.waitForElementClickable(this.continueButton)
        await utils.clickElement(this.continueButton)
    }

    async isCaptureyourIdScreenDisplayed(){
        return await utils.isElementDisplayed(this.captureYourIdHeader)
    }

    async getCaptureYourIDScreenContents() {
          return await utils.getElementText(this.content)
    }

    async isSeeAvailableDocumentsDisplayed(){
        return await utils.isElementDisplayed(this.seeAvailableDocuments)
    }

    async isMobileAnimationDisplayed(){
        return utils.isElementDisplayed(this.animationImg)
    }

    async clickOnCaptureMyIDButton() {
        await utils.clickElement(this.captureMyIdButton)
    }

    async isCameraPopUpDisplayed(){
        return await utils.isElementDisplayed(this.whileUsingTheApp)
    }

    async clickOnWhileUsingThisAppOtion(){
        await utils.clickElement(this.whileUsingTheApp)
    }

    async isAllowLocationPopUpOptionDisplayed(){
        return await utils.isElementDisplayed(this.allowLocationBtn)
    }

    async clickOnAllowLocationPopUpOption(){
        await utils.clickElement(this.allowLocationBtn)
    }

    async isBlockLocationPopUpOptionDisplayed(){
        return await utils.isElementDisplayed(this.blockLocationBtn)
    }

    async getCheckBoxCSSProperty(){
        return await utils.getElementCSSProperty(this.consentCheckBox,'style')
    }

}

export default new IDVersePage()