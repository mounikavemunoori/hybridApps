export const config = {
    // Specify Test Files
    specs: [
        './tests/**/iDVerse.spec.js' // Adjust this to your test file location
    ],

    // Appium service
    services: [
        ['appium', {
            command: 'appium', // This tells WDIO to use the global Appium installation
            logPath: './appium_logs/',
            args: {
                // Appium server arguments to customize the server behavior
                address: '127.0.0.1',
                port: 4723, // Default Appium port
                relaxedSecurity: true,
            }
        }]
    ],

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
    

    // Framework to use. This should match the package you installed.
    framework: 'mocha',

    // Appium capabilities
    capabilities: [
        {
            'appium:platformName': 'Android',
            'appium:platformVersion': '11.0', // e.g. '10.0'
            'appium:deviceName': '2d1cc14d', // e.g. 'Android Emulator'
            'appium:browserName': 'Chrome',
            'appium:automationName': 'UiAutomator2',
            'appium:noReset': true,
            'appium:fullReset': false,
            // appiumVersion: 'YOUR_APPIUM_VERSION' // Optional: specify if needed
        }
    ],

    // Other configurations
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
