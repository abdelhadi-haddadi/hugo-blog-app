+++
title = "Angular - Internationalization (i18n)"
date = "2025-08-22"
draft = false
description = "Internationalization (i18n) is a must required feature for any modern web application. Internationalization enables the application to target any language in the world. Localization is a part of the Internationalization and it enables the application to render in a targeted local language. Angular p"
image = "/angular/images/internationalization-sample.jpg"
imageBig = "/angular/images/internationalization-sample.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Internationalization (i18n)

URL: https://www.tutorialspoint.com/angular/angular-internationalization.htm

Internationalization(i18n) is a must required feature for any modern web application. Internationalization enables the application to target any language in the world. Localization is a part of the Internationalization and it enables the application to render in a targeted local language. Angular provides complete support for internationalization and localization feature.

Let us learn how to use Internationalization inAngularby creating a simplehello worldapplication in different languages.

Follow the steps given below to enable internationalization in Angular:

Step 1:Create a new Angular application using below command −

Step 2:Navigate to the app folder using the given command −

Step 3:Change theAppComponent'stemplate as specified below −

Step 4:Add localize module using below command −

Step 5:TheLOCALE_IDis the Angular variable to refer the current locale. By default, it is set asen_US. Let us change the locale by usinguseValue: 'hi'(for Hindi) in the providers array ofapp.component.ts. Import the locale data from@angular/common/locales/hiand then, register it usingregisterLocaleDatamethod. Also, define a local variable namedCurrentDateand set current time usingDate.now()as specified below:

Step 6:Now run the application usingng servecommand and check the result. You will see the date is specified usinghilocale.

Finally, we have created a localized application in Angular.

![Image](/angular/images/internationalization-sample.jpg)
