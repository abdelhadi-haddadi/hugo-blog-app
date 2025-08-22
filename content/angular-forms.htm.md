+++
title = "Angular - Forms"
date = "2025-08-22"
draft = false
description = "Forms are used to collect input data from users and enable users to interact with the application. A general form consists of various input fields such as text boxes, radio buttons, checkboxes, and dropdowns, along with a submit button that triggers the action of sending data to a server or performi"
image = "/angular/images/angular-form-classes.jpg"
imageBig = "/angular/images/angular-form-classes.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Forms

URL: https://www.tutorialspoint.com/angular/angular-forms.htm

Formsare used to collect input data from users and enable users to interact with the application. A general form consists of various input fields such as text boxes, radio buttons, checkboxes, and dropdowns, along with a submit button that triggers the action of sending data to a server or performing some other operation within the application.

In this tutorial, we will learn what are Angular forms, how they work and their use cases.

Angular formsare a way to accept user input in an Angular application. They receive input events from users through the template view, validate the input given by the user, create a form model and data model to update, and also, provide a way to track changes. It is important to note that the Angular forms are structured using theHTML form tag.

An Angular application that contains a form, keeps the view in sync with the component model and the component model in sync with the view. When users type or update values through the view, the new values are reflected in the data model. Similarly, if the program logic updates values in the data model, those values are also reflected in the view.

Following are the features and uses of Angular Forms −

The Angular forms are built on the following four foundation classes −

FormControl:Represents a single form input field. It tracks the value, validation status, and user interactions for the individual input control.

FormGroup:This foundation class represents a collection of FormControl instances or nested FormGroup instances. You can group related form controls together using this class. It's used to manage the state of a form section (e.g., user details, address information).

FormArray:It is used to handle an array of form controls, such as a list of checkboxes or input fields.

ControlValueAccessor:It connects Angular FormControl instances to built-in DOM elements.

Angular supports two types of forms. They are as follows −

Template-Driven Forms:As the name suggests, the template-driven forms are closely associated withAngular Templates. User input validation and behaviors are defined using directives within the template. For data flow, these forms use two-way data binding. You can build any kind of simple form within your Angular application, such as login forms and contact forms.  Remember, if you have very basic form requirements and prefer to manage it solely using the template, then template-driven forms may be a suitable choice.

Reactive Forms:The reactive forms follow a model-driven approach. Compared to template-driven forms, they are more robust, scalable and suitable for complex forms. Instead of a template, these forms are controlled from theAngular Componentclass. Use this type of form, if forms are a key part of your Angular application.

The table below shows how Reactive Forms are different from Template-Driven Forms −

They follow a model-driven approach.

They follow a view-driven approach

Forms are created and controlled from the component class.

Forms are created and validations are handled directly in the template.

The flow of data is Synchronous.

Asynchronous data flow.

It is flexible and scalable for complex forms with dynamic behavior.

More suitable for simple and static forms.

In reactive forms, the form control instances are accessed using FormControl and FormGroup.

Form controls are accessed using template reference variables.

Form validations are applied using the built-in validator functions.

Form validations are applied using the built-in directives.

Form validationis a process used to check whether the user input is in the correct format or not before submission. The validation process can be used to verify the format of email addresses and phone numbers as they have specific formats. Also, you can verify if the given input meets specific constraints like a minimum or maximum length. The form validation can prevent errors by catching invalid input before it is processed or sent to the server.

TheValidatorclass in Angular provides a set of built-in validator functions that validate the form controls. A few example of validators are min, max, required, email, pattern and so on.

A form generated or modified at the run time based on the application state or user interaction is called adynamic form. It makes the forms adaptable to changes in data model. For example, if a user selects a country, the form could dynamically adjust to show additional fields like postal code, state, or country code.

You can learn how to create and use dynamic forms in angular by visiting this link:dynamic form.

You have reached the end of this chapter. Now, it's time to check your understanding of the angular forms. Please try to give correct answers to the questions given below −

Q. 1- Which Angular form class represents a single form input field?

A- FormGroup

B- FormArray

C- FormControl

D- All of the above

FormControl represents a single form input field. It tracks the value, validation status, and user interactions for an individual form control.

Q. 2- Which type of Angular form is more suitable for complex forms?

A- Template-Driven Forms

B- Reactive Forms

C- Both

D- None

Reactive Forms are more suitable for complex forms.

![Image](/angular/images/angular-form-classes.jpg)
![Image](/angular/images/angular-form-types.jpg)
