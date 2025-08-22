+++
title = "Angular - Directives"
date = "2025-08-22"
draft = false
description = "Angular directives are classes that enhance the feature of a HTML element or component and add additional behavior to the web application. They can transform a static HTML page into dynamic by manipulating DOM. They begin with ng, which stands for Angular."
image = "/angular/images/types-of-directives.jpg"
imageBig = "/angular/images/types-of-directives.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Directives

URL: https://www.tutorialspoint.com/angular/angular-directives.htm

Angulardirectivesare classes that enhance the feature of a HTML element or component and add additional behavior to the web application. They can transform a static HTML page into dynamic by manipulating DOM. They begin withng, which stands for Angular.

The@directivedecorator is used to mark aTypeScriptclass as an Angular Directive. This decorator contains some configuration metadata that determines how the directive should be processed, instantiated and used at runtime.

Following are the features and uses of Angular Directives −

Directives are categorized based on the type of feature it provides to the HTML element/component. The type of directive and its purpose are as follows:

Components:Component is basically a type of directive. As we know, they can generate a a piece of HTML document in memory (DOM structure), calledView. The view will have both design and event based dynamic functionality.

Attribute directives:Attribute directives provides additional feature to a HTML element/component (host) with respect to appearance and behavior. For example, a menu component attached to a attribute directive can show next level of menu upon hovering the component.

Structural directives:Structural directives can change the entire layout of the host HTML element/component by adding or removing the component's DOM elements.

Structural directiveschange the structure ofDOMby adding or removing elements. It is denoted by anasterisk (*)symbol with three pre-defined directivesngIf,ngForandngSwitch. Let's understand one by one in brief.

The list of commonly used structural directives are:

ngIf −This directive is used to display or hide data in your application. When the given condition becomes TRUE, it will display the data, otherwise not. We can add this to any tag in our template.

ngFor −ngFor is used to repeat a portion of elements from the given list of items.

ngSwitch −It checks multiple conditions.

Attribute directiveschange the appearance or behavior of DOM elements or components. It is used just like a normal HTML attribute. However, the directive should be enclosed within square brackets[ ]to bind it to the element.

The most commonly used attribute directives are as follows:

ngStyle −It is used to add dynamic styles.

ngClass −It adds or removes CSS classes in HTML elements.

ngModel −This directive is used for two-way binding.

Eachcomponentof an Angular application is a directive itself. It is a special directive with Views. Also, it has@Inputand@Outputdecorator to send and receive information between parent and child components.

To create a component for your Angular application, use the command given below −

The table below shows how Components are different from Directives −

Components in Angular are used to create UI elements and manage their state.

Directives in Angular are classes that can modify the behavior or appearance of existing DOM elements.

They create reusable UI elements.

They create reusable features and behaviors for certain elements.

The@Componentdecorator is used to declare a Component.

The@Directivedecorator is used to declare a Directive.

There is only one component for each DOM element.

There can be one or more directives for each DOM element.

Acustom directiveis a user-defined directive that allows developers to extend the functionality of HTML elements. The attribute and structural built-in directives (covered in previous two chapters) offers very basic and pre-defined functionalities. However, with custom directives, you can add specific behaviors to HTML elements based on project requirements, user interactions, or changes in data.

To create a custom directive, run the following command in Angular CLI −

You have reached the end of this chapter. Now, it's time to check your understanding of the angular directives. Please try to give correct answers to the questions given below −

Q. 1- Angular Directives are used for:

A- To create reusable UI elements

B- To manage the data flow between components

C- adding additional behavior to the angular application

D- User interactions

Angular directives are classes that enhance the feature of HTML element or component and add additional behavior to the web application.

Q. 2- Which decorator is used to define Angular Directive?

A- @Component

B- @Injectable

C- @Directive

D- @NgModule

The @Directive decorator is used to mark a TypeScript class as an Angular Directive.

Q. 3-  Is ngFor a structural directive?

A- No

B- Yes

The ngFor is a structural directive used to repeat a portion of elements from the given list of items.

![Image](/angular/images/types-of-directives.jpg)
