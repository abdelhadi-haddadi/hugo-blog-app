+++
title = "Angular - Property Binding"
date = "2025-08-22"
draft = false
description = "Property binding is a type of Data Binding in which we bind a property of a DOM. Its purpose is to show or hide a DOM element, or simply manipulate the DOM. It helps to set the value for the property of the HTML element or angular component."
image = "/angular/images/input_registration_form.jpg"
imageBig = "/angular/images/input_registration_form.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Property Binding

URL: https://www.tutorialspoint.com/angular/angular-property-binding.htm

Property bindingis a type of Data Binding in which we bind a property of a DOM. Its purpose is to show or hide a DOM element, or simply manipulate the DOM. It helps to set the value for the property of the HTML element or angular component.

Data bindingis a mechanism that allows flow of data between component class to template and template to component class.

To use property binding, we enclose the property of an HTML element or a component withing square brackets[...]as shown below −

The value of the property is basically a template variable. While generating the view from the template, angular will set the value of the property by processing the template variable.

Let's see how to set value for the property,srcinimgHTML element.

Step 1:Declare a variable,imagein the component and set a value.

Step 2:Set the image variable to thesrcproperty (enclose it using square bracket) of theimgHTML element in the template as shown below −

Angular exposes attributes of the common HTML element with a matching property.

Here,valueis the property of theHtmlInputElementexposed by angular.

For attributes with multiple words, the corresponding property name will be converted into camelCase format. for example, thecolspanattribute's corresponding angular property iscolSpan.

Boolean property of a HTML element/component does have value. Few examples of boolean property available in the HTML element aredisabled,requiredandreadonly. For boolean property, we can set a boolean variable for the property. The boolean value determines the presence / absence of property in the HTML element/component.

Let us see how to setrequiredproperty in input HTML element.

Step 1:Declare a variable,isRequiredin the component and set either TRUE or FALSE.

Step 2:Set theisRequiredvariable to the required property (enclose it using square bracket) of the input HTML element in the template as shown below −

Step 3:The output of the template will include required attribute because the value of the isRequired variable is true

Let us create a simple registration form to understand property binding. Our registration form will have three input field as shown below and a button to submit the registraion form.

Step 1:Create a new application,my-appusing angular CLI as shown below −

Step 2:Create a new registration form component,RegisterFormusing angular CLI as shown below −

Step 3:Open the registration form components template and a user with username, password and confirm password.

Step 4:Open the registration form components style and style the form using CSS as shown below −

Step 5:Include our registration form component in the app template file,app.component.html.

Step 6:Run the application and test the registration form.

Step 7:Next, we will try to set the placeholder text for all input field using attributes binding. Add three member variable in the component to represent the placeholder text for username, password and confirm password input field.

Step 8:Assign the above declared components member variable to the placeholder attributes of username, password and confirm password input accordingly in the template using [placeholder] property as shown below −

Here,

attr.placeholder represents the placeholder attribute.

Step 9:The complete listing of the component is as follows:

Step 10:The complete listing of the components template is as follows:

Step 11:Next, run the application and check the output.

Property binding provides option to set dynamic value for HTML elements and components. It supports boolean property as well. It is quite easy and intutive.

![Image](/angular/images/input_registration_form.jpg)
![Image](/angular/images/user-details.jpg)
