+++
title = "Angular - Components"
date = "2025-08-22"
draft = false
description = "Components are the building blocks of an Angular application. The primary use of Angular Component is to generate a section of web page called View. By combining different views, a single application is created. Every component will have an associated template and it will be called in order to gener"
image = "/angular/images/component-arch.jpg"
imageBig = "/angular/images/component-arch.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Components

URL: https://www.tutorialspoint.com/angular/angular-components.htm

Componentsare the building blocks of an Angular application. The primary use of Angular Component is to generate a section of web page calledView. By combining different views, a single application is created. Every component will have an associated template and it will be called in order to generate views.

Let us learn the basic concept of components in this tutorial.

Each component of an Angular application has a few important parts which are as follows −

@component Decorator:All the application related configurations are written inside this decorator.

HTML Template:View of the Angular application.

Styles:It controls the styles of a view.

TypeScript Class:Code related to behavior of the Angular application goes into this class.

By default, all these parts are created by Angular CLI, you can update, add or even delete them if any of them is not required.

In Angular, a new Component is created using theng generate componentcommand as specified below −

Let's see an example where we create a new component in ourExpenseManagerapplication. This component will contain our first expense entry. First, open the command prompt and navigate toExpenseManagerapplication.

Now, use the command given below to create aexpense-entrycomponent −

Following files and folders will be created by Angular CLI on the above command −

Here,

Next, we add a title property toExpenseEntryComponent, i.e., (src/app/expense-entry/expense-entry.component.ts) component.

Update template,src/app/expense-entry/expense-entry.component.htmlwith below content.

Opensrc/app/app.component.htmland include the newly created component.

Here,

app-expense-entryis the selector value and it can be used as a regular HTML Tag.

At the end, importExpenseEntryComponentto theapp.component.tsfile as shown below −

Finally, the output of the application is −

Angular component goes through a series of stages/events during its existence. The different stages of the AngularComponents Lifecycleare creation, change detection, rendering and destruction.

Each phase of the angular component is associated with a lifecycle hook interface which can be implemented to perform arbitrary action in that particular phase. The lifecycle hooks refer to the methods of lifecycle hook interfaces.

Component interactionis one of the important and necessary features in the context of component based architecture. Angular provides multiple options to pass and receive data between components.

You can share data from parent component to child component as well as, child to parent component. Also, it is possible to share data between any other component within the Angular application.

In Angular, parent and child components interacts through the following ways −

Component stylingis the process of designing and formatting the visual presentation of views or components. You can use the following ways for styling:

Nested componentsare normal Angular Components with parent-child relations. The parent can access and share data with the child, either partially or fully. The component nested inside another component is called child component. The component containing the child component is called the parent component.

Angular allows the component to be dynamically created and loaded at run time at a specific location in the host (another) component.

You can createdynamic componentsin Angular using the following ways −

You have reached the end of this chapter. Now, it's time to check your understanding of the angular component concept. Please try to give correct answers to the questions given below −

Q. 1- What is the primary purpose of an Angular Component?

A- To define the routing configuration

B- To generate and manage views

C- To create and manage services

D- To initialize the Angular module.

An Angular Component is responsible for generating views and managing the behavior associated with them.

Q. 2- Which Angular decorator is used to define a component?

A- @Component

B- @NgModule

C- @Directive

D- @Injectable

The @Component decorator is used to define an Angular component, which contains metadata such as the selector, template, and style URLs.

Q. 3- Command to generate a new component in Angular:

A- ng build component

B- ng generate component component-name

C- ng serve component

D- ng create component

The ng generate component component-name command is used to create a new component in an Angular application using Angular CLI.

![Image](/angular/images/component-arch.jpg)
![Image](/angular/images/component-example.jpg)
