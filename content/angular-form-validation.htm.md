+++
title = "Angular - Form Validation"
date = "2025-08-22"
draft = false
description = "Form validation is a process used to check whether the user input is in the correct format or not before submission. The validation process can be used to verify the format of email addresses and phone numbers as they have specific formats. Also, you can verify if the given input meets specific cons"
image = "/angular/images/form-validation.jpg"
imageBig = "/angular/images/form-validation.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Form Validation

URL: https://www.tutorialspoint.com/angular/angular-form-validation.htm

Form validationis a process used to check whether the user input is in the correct format or not before submission. The validation process can be used to verify the format of email addresses and phone numbers as they have specific formats. Also, you can verify if the given input meets specific constraints like a minimum or maximum length. The form validation can prevent errors by catching invalid input before it is processed or sent to the server.

As we know,Angularhas two kinds of forms. The first one istemplate-driven forms, and the other isreactive forms. The validation is implemented in two different ways. In template-driven forms,directivesare used within the template to validate the form. In reactive forms, a model-driven approach is used where validation logic is defined in the component class.

TheValidatorclass in Angular provides a set of built-in validator functions that validate the form controls. A list of validator functions is −

1.

This validator is used to check whether the control's value is greater than or equal to the specified number.

2.

Unlikemin, themaxvalidator checks if the control's value is less than or equal to a specified number.

3.

Whenrequiredvalidator is applied, it checks if the input field has a value and marks the form control as invalid if it is empty. This validator is used in mandatory fields of a form to ensure that users provide the necessary information before submitting the form.

4.

If applied, it checks whether the value is true. Commonly used for checkbox validation.

5.

To make sure the control's value is a valid email address format, theemailvalidator is used.

6.

It validates that the control's value is at least a specified length.

7.

This validators ensures that the control's value does not exceed a specified length.

8.

It validates that the control's value matches a specified regular expression.

9.

It is a no operation validator that always returns null. Commonly used for validation control.

10.

Combines multiple synchronous validators into one validator function. It returns an error map if any of the individual validators fail.

11.

Similar tocompose, but it combines asynchronous validators and returns an observable that emits either null for valid or an error object for invalid.

In Angular,Template-DrivenForms are forms where the validation is applied directly in the HTML template using Angular's built-in directives, like required, minlength, maxlength, and more. This type of form usesngModeldirective fortwo-way data bindingand needs less code than Reactive Forms.

In the below example, we will see how to use the validation in Template-Driven Form.

Step 1:Add the below code inside Template file −

Step 2:Add the below code inside component class −

Step 3:Add some CSS −

On running the application, you will get the following output −

In AngularReactiveForms, form validation is handled within component class using theFormControl,FormGroup, andFormArrayclasses, along with built-in or custom validators.

In the below example, we will see how to apply validation in Reactive Form.

Step 1:Add the below code inside Template file −

Step 2:Add the below code inside component class −

When you run the application, following response will be displayed −

![Image](/angular/images/form-validation.jpg)
![Image](/angular/images/form-validation.jpg)
