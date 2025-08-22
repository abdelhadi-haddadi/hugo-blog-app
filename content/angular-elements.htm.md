+++
title = "Angular - Elements"
date = "2025-08-22"
draft = false
description = "Angular elements are reusable components that have been transformed into custom elements (also called Web Components). Angular provides a simple and effective method to create Web components."
image = "/angular/images/employee-information.jpg"
imageBig = "/angular/images/employee-information.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Elements

URL: https://www.tutorialspoint.com/angular/angular-elements.htm

Angular elements are reusable components that have been transformed into custom elements (also called Web Components). Angular provides a simple and effective method to create Web components.

Web components are custom HTML elements available in native HTML specifications to extend the features/tags of the HTML document. It can be created through JavaScript and can be made available in the HTML document. JavaScript has special methods to create custom HTML elements.

Creating custom HTML elements using JavaScript is a lengthy process and developers need to understand the internal workings of custom HTML elements and the Shadow DOM concept. Angular simplifies the process by enabling the conversion of Angular components to web components with minimal change in the component class.

Creating Angular elements means transforming a component into a custom element. For this purpose, the@angular/elementspackage is used. This package exports acreateCustomElement()function that converts a component into a class that can be registered with the browser as a custom element.

Let us learn how to create a custom HTML element in Angular.

In this example, we will create a component to display employee information (say EmpCard) and convert it into custom HTML element.

Step 1:Create an angular application,emp-card-web-componentusing Angular CLI.

Step 2:Create theemp-cardcomponent using Angular CLI.

Step 3:Add encapsulation option in the@Componentdecorator withViewEncapsulation.ShadowDomoption. ShadowDom option enables the HTML native ShadowDom concept to preserve the styles of the component without leaking into the other part of the HTML document.

Step 4:Next, add two input properties, name and role of the employee in the HTML element.

Step 5:The complete listing of the component is as follows −

Step 6:Next, open the components template and add markup to display employee name and role as shown below −

Step 7:Next, open the components style and add css to show shadow in the employee card.

Step 8:Next, install @angular/elements module provided by angular team. @angular/elements module has options to create custom HTML element from angular component.

Step 9:Next, open the main.ts file and remove all boilerplate code.

Step 10:Next, import createApplication from @angular/platform-browser. createApplication will bootstrap the angular application.

Step 11:Next, import createCustomElement from @angular/element module. createCustomElement will be used to create custom HTML element from the angular component.

Step 12:Next, import EmpCardComponnet component as shown below −

Step 13:Next, create application using createAppliation() method by inputting providers and a callback method. The callback method will be used to create the custom HTML element from angular component.

Step 14:Implement the callback method and create custom element using createCustomElement() method. createCustomElement accepts the component to be converted and the apps injector.

We can get injector from application reference returned from createApplication() method.

Step 15:Next, register the created custom component using JavaScript native method, customElements.define() method.

Step 16:The complete listing of the main file, main.ts is as follows,

Step 17:Next, buid the application using angular CLIs build command

Step 18:Once, the build is done, the output files are available in dist/emp-card-web-component folder. It has below files (similar files) along with a index.html file.

Step 19:Update theindex.htmlfile of thesrcfolder with the newly created component and check the output for correctness.

Here, we have added toemp-cardtag with two different employee details.

Step 20:Finally, run the application and check the output in the browser.

As we learned, creating a web component is super easy in Angular. We just need to develop the component as normal angular component. Once the functionality of the component is developed, we need to add some bootstrapping code in the main.ts file and build the application to get the necessary custom HTML element as a bunch of native JavaScript. We can use it on any website without angular.

![Image](/angular/images/employee-information.jpg)
