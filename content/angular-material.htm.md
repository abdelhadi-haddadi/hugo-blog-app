+++
title = "Angular - Angular Material"
date = "2025-08-22"
draft = false
description = "This chapter will guide you through setting up your Angular project to start using Angular Material. It includes prerequisites, installing Angular Material, and an example of using a sample material component in your project to verify your setup."
image = "/angular/images/material-components.jpg"
imageBig = "/angular/images/material-components.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Angular Material

URL: https://www.tutorialspoint.com/angular/angular-material.htm

This chapter will guide you through setting up your Angular project to start usingÂAngular Material. It includes prerequisites, installing Angular Material, and an example of using a sample material component in your project to verify your setup.

Angular MaterialÂ is aÂUI component libraryÂ developed by the Angular team to integrate easily with your Angular applications. This library is "specific" to theÂAngular frameworkand provides a set of reusable, accessible, well-tested components that help create a responsive modern user interface (UI).

It also provides tools that help developers to createcustom UI componentswith common interaction patterns. Angular applications developed usingAngular Materialcomponents ensure "responsiveness" on different screen sizes, such as "phones", "tablets", and "laptops".

Let us learn how to installAngular Material Libraryin your Angular project and how to use its components.

To installAngular Material Libraryin your Angular project or application, ensure that theAngular CLIis already installed and that the application has been created successfully.

Follow the steps given below and implement each step in your existing project one by one to installAngular Material Library:

Step 1:Open any "existing Angular project" in your preferred code editor (e.g., vs code) −

Here,materialAppis your project folder name.

Step 2:Open the terminal in your editor and go to the application directory −

Step 3:AddAngular Materialto your application by running the following command −

Theng addcommand will "install Angular Material" in your application.

Once you run the above command,Angular CLIwill ask certain questions regarding "theme", "gesture recognition", and "browser animations".

Select any theme of your choice and then answer positively for gesture recognition and browser animation.

Set up "global Angular Material typography" styles:

Includebrowser animationsfor Angular Material:

Set up "browser animations" for Angular Material:

Importing theBrowserAnimationsModuleinto your application enables Angular's animation system.

Once theMaterialgets installed successfully you will be able to see the message below:

Theng addcommand will additionally perform the following actions:

Completed!Angular Materialis now configured to be used in your Angular application.

To use theAngular Material Componentsin your Angular project implement the following steps:

Step 1:Open the "Angular Material" website on your browser:

Step 2:Open the component (e.g., button) which you want to use:

Step 3:Go to theAPIsection and copy the import:

Step 4:Import the "relevant API" in your component or module where you want to use:

Step 5:Go to theexamples sectionand you will see various examples of button components:

Step 6:Open theAppComponent(i.e., app.component.htm) and place the code below to see the different types of buttons:



Here,

Step 6:Run your application to see the changes:

Then navigate your browser to http://localhost:4200 URL.

Here, the application clearly shows the Angular differentMaterial buttons.

Below is the some of the importantUI elementsprovided by Angular Material package:

UseAngular Materialbecause it provides built-inUI componentsthat are easy to integrate with Angular applications, saving developers time by offeringready-to-useelements like "buttons", "cards", and "input" fields. It also ensures the application is "responsive" and fully functional across various screen sizes.

Here is a list of some "key" advantages of theAngular Material:

![Image](/angular/images/material-components.jpg)
![Image](/angular/images/material-components1.jpg)
![Image](/angular/images/material-components2.jpg)
![Image](/angular/images/material-components3.jpg)
