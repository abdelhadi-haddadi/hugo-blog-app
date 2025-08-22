+++
title = "Angular - MVC Architecture"
date = "2025-08-22"
draft = false
description = "Building an application is one part of the job, and maintaining it is another. However, while building, it is necessary to consider the potential load on the application in future. We need to develop an application in a way that ensures it can run for a longer period of time. Architecture of a frame"
image = "/angular/images/component-arch.jpg"
imageBig = "/angular/images/component-arch.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - MVC Architecture

URL: https://www.tutorialspoint.com/angular/angular-mvc-architecture.htm

Building an application is one part of the job, and maintaining it is another. However, while building, it is necessary to consider the potential load on the application in future. We need to develop an application in a way that ensures it can run for a longer period of time. Architecture of a framework help developers to use the same structure each time they build code for an application, so that they do not have to rebuild each piece of code from scratch.

Angular framework has a well-defined architecture that provides a structured and organized approach to building and maintaining software or applications. Let's understand the architecture of the Angular framework in this tutorial.

Angular framework is based on several core concepts and they are as follows −

The core of the Angular framework architecture isAngular Component. Angular Component is the building block of every Angular application. Every angular application is made up of one moreAngular Component. It is basically a plain JavaScript/Typescript class along with a HTML template and an associated name.

The HTML template can access the data from its corresponding JavaScript/Typescript class. Component's HTML template may include other component using its selectors value (name). The Angular Component may have an optional CSS Styles associated it and the HTML template may access the CSS Styles as well.

Let us analyse theAppComponentcomponent in ourExpenseManagerapplication. TheAppComponentcode is as follows −

In the above code block,

@Component:A decorator used to convert a normal Typescript class toAngular Component.

app-root:It is the selector/name of the component and it is specified usingselectormeta data of the component's decorator.

app.component.html:It is the HTML template document associated with the component. The component template is specified usingtemplateUrlmeta data of the@Componentdecorator.

AppComponent:Its property (title) is used in the HTML template to set the title of the application.

app.component.css:This is the CSS style document associated with the component. The component style is specified usingstyleUrlsmeta data of the@Componentdecorator.

To show the view of this component, theapp-rootselector is used by root document, i.e.src/index.htmlof the Angular application as shown below −

Template is basically a super set of HTML. Template includes all the features of HTML and provides additional functionality to bind the component data into the HTML and to dynamically generate HTML DOM elements.

The core concept of the template can be categorised into two items and they are as follows −

Used to bind the data from the component to the template.

Here,titleis a property inAppComponentand it is bind to template usingInterpolation.

Used to include logic as well as enable creation of complex HTML DOM elements.

Here,ngIfandshowToolTip(just an example) are directives.ngIfcreate the paragraph DOM element only whencanShowis true. Similarly,showToolTipisAttribute Directives, which adds the tooltip functionality to the paragraph element.

When a user hover mouse over the paragraph, a tooltip will be shown. The content of the tooltip comes from tips property of its corresponding component.

Angular Moduleis basically a collection of related features/functionality. It groups multiple components and services under a single context.

For example, animations related functionality can be grouped into single module and Angular already provides a module for the animation related functionality,BrowserAnimationModulemodule.

An Angular application can have any number of modules but only one module can be set as root module, which will bootstrap the application and then call other modules as and when necessary. A module can be configured to access functionality from other module as well. In short, components from any modules can access component and services from any other modules.

Following diagram depicts the interaction between modules and its components.

Let us check the root module of ourExpense Managerapplication.

Here,

NgModuledecorator is used to convert a plain Typescript/JavaScript class intoAngular module.

declarationsoption is used to include components into theAppModulemodule.

bootstrapoption is used to set the root component of theAppModulemodule.

providersoption is used to include the services for theAppModulemodule.

importsoption is used to import other modules into theAppModulemodule.

Servicesare plain Typescript/JavaScript class providing a very specific functionality. They will do a single task and do it best. The main purpose of the service is to make a certain feature reusable. Instead of writing a functionality inside a component, separating it into a service will make it usable in other component as well.

Also,Servicesenables the developer to organize the business logic of the application. Basically, component uses services to do its own job.Dependency Injectionis used to properly initialize the service in the component so that the component can access the services as and when necessary without any setup.

In Angular, metadata is used to provide additional information about a class, component, or service. This information helps Angular understand how to process and use these elements within the application. Metadata is defined using decorators, which are special functions that associate metadata to a class.

We have learned the core concepts of Angular application. Let us see the complete flow of a typical Angular application.

When we run an Angular application,index.htmlis the first file that is loaded on the browser. Then, browser looks for the main TypeScript file, i.e.src/main.tswhich is the entry point of Angular application.

Now, this file bootstraps theAppComponent(src/app.component.ts), the root component of every Angular application.

TheAppComponentrenders its template(src/app.component.html)and uses the corresponding styles(src/app.component.css). AppComponentname, i.e.,app-rootis used inside thesrc/index.htmlso that view of the angular application can be rendered.

A component can use another component through directive in its template using target component's selector name.

Also, all registered services are accessible to all Angular components throughDependency Injection (DI)framework.

NOTE:For the complete workflow of a non-standalone angular application, please refer to this link:angular application workflow

Now that you have learned the Angular architecture, let's test your knowledge. Please answer the following questions based on your understanding −

Q. 1- What is the core building block of an Angular application?

A- Directive

B- Module

C- Component

D- Service

Component is the building block of every Angular application. It is a Typescript class which controls the View, which is defined in its HTML template.

Q. 2- What is ngIf?

A- Directive

B- Module

C- Component

D- Service

The ngIf is a structural directive.

Q. 3- In Angular, what is a Service primarily used for?

A- To define the HTML structure.

B- To create a reusable feature.

C- To inject dynamic text.

D- To manage the routes.

Service is TypeScript class that can be used to share data or a common feature across different parts of your angular application.

![Image](/angular/images/component-arch.jpg)
![Image](/angular/images/module-arch.jpg)
![Image](/angular/images/angular-application-workflow.gif)
