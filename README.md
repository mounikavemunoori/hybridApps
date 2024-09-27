
# WebDriverIoProject
 This projec supports for mobile, web, and api automation.
 To implement the web, api and mobile and created the separate folder under tests folder
 tests
     web
     api
     mobile
Created the three different configs for api , web and mobile tests

# Prerequisites
 Node.js
 Appium Server
 Appium Inspector (to find selector)
 Android Studio (for device emulator)
 An Android emulator or real device
 Hybrid apps- chrome:://inspect (to find locator on web)
 Xcode (for iOS Simulator)

# WEB

# Step 1: Prerequisites
Make sure you have Node.js installed on your machine. webdriverio requires Node.js version 20 or above. You can check your Node.js version by running the command in your terminal.
```
node -v
```
# Step 2: Create a new project
Create a new directory for your project and navigate to it in your terminal.

# Step3: Clone the code from Repo then change directory use below command
```
cd hybridApps
```
# Step4: How to setup:
Clone the project and run below command to install the packages

```
Run npm install
```

## API
TO API api automation, install the supertest node module

## Step 6: Run below command to install api node module
```
 npm install supertest --save-dev
```

## Step 7: To install Chai using npm, can run the following command in the project directory:
```
 npm install chai --save-dev
```

# APPIUM/MOBILE

## Step 8: To install Appium dependencies in project using npm
```
npm install @wdio/appium-service --save-dev
```


# How to run the test:

## Note:

Here I have created the three different configs for api , web and mobile 

## Step 9: Run web all tests use below command
```
npx wdio run .\wdio.web.conf.js
```

## Step 10: Run api all tests use below command
```
npx wdio run .\wdio.api.conf.js
```

## Step 11: Run mobile all tests use below command

Make sure before running the mobile test cases, need to start the appium server using below command
```
 appium server --allow-cors
```

```
npx wdio run .\wdio.android.config.js
```

# specific spec / test file
npx wdio run .\wdio.android.config.js --spec .\tests\mobile\iDVerse.spec.js

# specific suite / test suite
```
npx wdio run .\wdio.android.config.js -- --suite "suiteName"
```

# specific test case
```
npx wdio run .\wdio.android.config.js -- --spec ./to/file/location.js --mochaOpts.grep "testcase name"
```

```
npm run test-android -- --suite "suiteName" --mochaOpts.grep "testcase name"
```

To inspect the hybrid mobile apps, we should connect with emulator/real device , then go to chrome type

```
chrome:://inspect
```

# Step 9 : To Generate the reports run ,need to download the specific reports, 
```
npm install -g allure-commandline --save-dev
```

# Step 10: Need to change the wdio.config.js with below piece of code in reports config section
```
reporters: [
        // 'spec',
        ['allure', {
            outputDir: './allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
]
```

# generate the reprots
```
allure generate allure-results --clean -o allure-report
```
```
allure open
```

Reports will be stored in the allure-report folder 


