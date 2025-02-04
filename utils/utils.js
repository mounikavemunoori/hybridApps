import { browser } from '@wdio/globals'

class Utils {

    async isElementDisplayed(element) {
        try {
            return element.isDisplayed();
        } catch (e) {
            return false;
        }
    }

    async isElementSelected(element) {
        return await element.isSelected();
    }

    async isElementEnabled(element){
        return await element.isEnabled();
    }

    async maximizeWindow() {
        // Maximize the browser window
        return await browser.maximizeWindow();
    }

    
/**
 * @Desc Waits until the document readyState to complete
 * @param None
 * @return None
 */
async  waitForDocumentToLoad() {
    await browser.waitUntil(() => browser.execute('return document.readyState') === 'complete', {
        timeout: browser.options.waitforTimeout,
        timeoutMsg: 'Page is still loading',
        interval: 5000,
    });
}

/**
 * @Desc Waits for the jquery to  be active is zero
 * @param None
 * @return None
 */
async waitForJSToLoad() {
    await browser.waitUntil(() => browser
        .execute('return window.jQuery != undefined || jQuery.active == 0') === true, {
        timeout: 60000,
        timeoutMsg: 'js is still loading',
        interval: 5000,
    });
}

async scrollToPixel(pixel=500){
    await browser.execute(() => {
        window.scrollBy(0, 500); // Scroll down by 500 pixels
    });
}  

/**
 * @Desc Clicks on the element
 * @param element
 * @return None
 */
 async clickElement(element) {
    await this.waitForElementClickable(element);
    element.click();
}

/**
 * @Desc Waits for the element clickable
 * @param element
 * @return None
 */
 async waitForElementClickable(element) {
    await element.waitForClickable({ timeout: browser.options.waitforTimeout });
}


/**
 * @Desc Inputs the value to the elements
 * @param element
 * @param value
 * @return None
 */
 async setInputField(element, value) {
    await element.waitForClickable();
    await element.setValue(value);
}

/**
 * @Desc Waits for element disabled
 * @param element
 * @return None
 */
async waitForElementDisplayed(element) {
    await browser.waitUntil(async () => {
        return await element.isDisplayed();
    }, {
        timeout: browser.options.waitforTimeout,
        timeoutMsg: `The following element is not displayed: ${await element.selector}`,
        interval: 500,
    });
}

/**
 * Gets date format
 * @param year
 * @param month
 * @param date
 * @returns {Promise<string> | string}
 */
async datePicker(year, month, date){
     // Define the desired date
     const selectedDate = new Date(year, month, date); // September is 8, because months are 0-indexed in JavaScript

     // Format the date as "Thu Sep 26 2024"
     const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
     const formattedDate = selectedDate.toLocaleDateString('en-US', options).replace(/,/g, '');

     console.log(formattedDate); // Output: Thu Sep 26 2024
     return formattedDate
}

/**
 * Gets the element value
 * @param element
 * @returns {Promise<string> | string}
 */
 async getElementValue(element) {
    return await element.getValue();
}

/**
 * Gets the element value
 * @param element
 * @returns {Promise<string> | string}
 */
async getElementText(element) {
    return await element.getText();
}

async getElementCSSProperty(element, property){
    return await element.getAttribute(property);
}

}

export default new Utils()