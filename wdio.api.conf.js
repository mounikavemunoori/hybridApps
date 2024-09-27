import allure from '@wdio/allure-reporter';
export const config = {
    runner: 'local',
    specs: [
        './tests/api/apiBooking.spec.js' // Update this path to point to your api spec files
    ],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: ['--headless'] // Headless and other options
        }
    }],
    logLevel: 'info',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: function() {
        // Any setup tasks before tests run
    },
    onComplete: function() {
        // Cleanup tasks after all tests are done
    },

    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: [
        // 'spec',
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        //
        // ['json', {
        //   outputDir: './test/reports/json-results'
        //   }],
  
        // ['junit', {
        //   outputDir: './test/reports/junit-results',
        //   outputFileFormat: function(options) {
        //         return `results-${options.cid}.${options.capabilities}.xml`
        //     }
        // }],
  
      ],

      /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
};
