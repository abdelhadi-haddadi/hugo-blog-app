+++
title = "Angular - Class and Style Binding"
date = "2025-08-22"
draft = false
description = "A dynamic web application usually have dynamic styles and are set during the runtime of the application. Class binding is a special binding to bind a dynamic value to the class attribute of a HTML element."
image = "/angular/images/blue-button.jpg"
imageBig = "/angular/images/blue-button.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Class and Style Binding

URL: https://www.tutorialspoint.com/angular/angular-class-style-binding.htm

A dynamic web application usually have dynamic styles and are set during the runtime of the application. Class binding is a special binding to bind a dynamic value to the class attribute of a HTML element.

Let us see more details about class binding in this chapter.

Angular provides four different ways to implement class binding. Each of them supports a special feature. The four ways are as follows:

Let us learn one by one in the upcoming sections.

In single class binding, class string should be surrounded by square bracket and a template variable should be set as it's value.

Here, the template variable holds the class name for the specific HTML element.

In single class binding with on/off feature, class style should be appended by the actual class name of the given HTML element and a template variable with boolean value should be set as it's value. The boolean value determines the availability of the specific class to the HTML element.

Here, the template variable outputs either true or false.

Let us consider a class with name red, used to set the text of the HTML element to red color.

Consider a member variable, isRedEnabled available in the component.

Then, the class binding can be set in a HTML element as shown below −

In multiple class binding, class string should be surrounded by square bracket and the value should be set with one of more existing class name separated by space. For example, two class (myClass and myAnotherClass) for a HTML element can be set using [class] as shown below −

Here, the template variable will emit myClass myAnotherClass string.

In multiple class binding through an object with on/off feature, class string should be surrounded by square bracket and the value should be set with an object of type Record<string, boolean> having keys and values with class name and boolean value respectively. The boolean value of a key determine whether the corresponding key will be set a class of the given HTML element.

Let as consider an object with multiple keys representing class name and have boolean values as shown below −

Apply the class binding in the template as shown below −

Then the output will have c1 and c3 class because both of these classes have true value in the object.

Let us create a simple registration form to understand class binding. Our registration form will have three input field as shown below and a button to submit the registration form.

Step 1:Create a new application,my-appusing angular CLI as shown below −

Step 2:Create a new registration form component,RegisterFormusing angular CLI as shown below −

Step 3:Next, open the registration form component's template and add a form with username, password and confirm password.

Step 4:Open the registration form component's CSS style and style the form using CSS as shown below −

Step 5:Include our registration form component in the app template file, app.component.html

Step 6:Run the application and test the registration form.

Step 7:Next, let us create few classes in the style file and apply our new class for the button using class binding.

Step 8:Next, add two class, purple and smallcaps in the component's style file.

Step 9:Add a member variable, isPurple in the component as shown below −

Step 10:Next, add an object in the component with purple and smallcaps class as keys as shown below −

Step11:Next, assign the variable, isPurple to the button through class binding.

Step12:Run the application and check the output. Output will show the button with purple color.

Step13:Next, reassign the object, btnClass to the buttons class through class binding.

Here, both purple and small caps will be applied.

Step14:Run the application and check the output. Output will show the button with purple color and Register text is small caps format.

Step15:The complete listing of the component is as follows,

Step16:The complete listing of the component's template is as follows,

Style binding in Angular allows you to dynamically set inline CSS styles on an HTML element based on the component's properties or template variables.

Angular provides four different syntax in style binding. Each type of style binding supports a special feature. The four syntax as are follows:

We will learn style binding in thenext chapterin more detail.

Class binding enables the developer to set complex values for class attribute of the any HTML element easily through either string or custom object.

![Image](/angular/images/blue-button.jpg)
![Image](/angular/images/purple-button.jpg)
![Image](/angular/images/button-small-caps.jpg)
