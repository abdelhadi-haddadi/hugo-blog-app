+++
title = "Angular - Event Binding"
date = "2025-08-22"
draft = false
description = "Angular provides option to listen and fire action for each user initiated event in a typical web application. Event binding is the process of targeting an event in a HTML element/component and set a responder for the target event. The responder will execute once the event is fired."
image = "/angular/images/application-using-event-binding.jpg"
imageBig = "/angular/images/application-using-event-binding.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Event Binding

URL: https://www.tutorialspoint.com/angular/angular-event-binding.htm

Angular provides option to listen and fire action for each user initiated event in a typical web application.Event bindingis the process of targeting an event in a HTML element/component and set a responder for the target event. The responder will execute once the event is fired.

In this tutorial, we will understand Event Binding.

An event can be set for an HTML element/component by including the event name inside the bracket(( ))and assigning a template statement. The template statement will execute once the event is fired by the user. The generic syntax to set an action for an event is as follows:

The syntax to listen a click event of a button is as follows:

Let us create a button and set an action to the button's click event.

Step 1:Create a submit button.

Step 2:Create an action method in the component.

Step 3:Bind ourmyAction()method to click event of the button as shown below −

Now,myAction()will execute whenever the submit button is clicked by the user.

Event objecthas the data about target and the event send by the firing event to the responding action. Angular expose the event object of any event in the an object represented by$eventin the context of template.

To get the event object of the button click event, use$eventobject available in the template as shown below −

Now, modify the action,myAction()in the component to use the$eventobject as shown below −

Here,preventDefault()is the method available in the HtmlButtonElement's event object to suppress the button events built-in action like submitting the form.

Angular supports all events in a web application and the events are categorized by its source and usage. The type of events are as follows:

Let's learn them one by one in brief.

Mouse based eventsare events fired by mouse actions like click, scroll, movement, drag, etc.,. Some of the most important events in this category and its angular event binding target name are given below −

Keyboard based eventsare events fired when the user works on the keyboard. Some of the most important events in this category are mentioned below −

Events targeting a specific key press can be done using below format:

Here,

Modifier_keyrepresents shift, alt and control

Key_coderepresent the target keyboard code like alphabets, digit, etc., as specified in HTML spec. Example, keydown.shift.t

Event coderepresent the event code as specified in HTML spec like keyT, Tab, etc.,

For example, pressingshift keyandtat the same time can be targeted as shown below −

Touch based eventsare events fired when the user interacts through a touch device. Some of the most important events in this category are as follows −

Pointing an element and start moving in a touch device - (touchstart)

Pointing an element and Moving in a touch device - (touchmove)

Pointing an element and stop moving in a touch device - (touchend)

Web document based eventsare specific events fired in the web document to perform actions like cut, copy and paste a text, submitting a form, etc., Some of the most important events in this category are mentioned below −

Submitting a form by clicking the submit button - (submit)

Copying a text to clipboard - (copy)

Pasting a text from clipboard - (paste)

Deleting and copying a piece of text to clipboard - (cut)

Let us create a simple registration form to understand attribute binding. Our registration form will have three input field as shown below and a button to submit the registration form.

Step 1:Create a new application,my-appusing angular CLI as shown below −

Step 2:Create a new registration form component,RegisterFormusing angular CLI as shown below −

Step 3:Next, open the registration form component's template and add a form with username, password and confirm password.

Step4:Open the registration form components css style and style the form using CSS as shown below −

Step 5:Include our registration form component in the app template file,app.component.html.

Step 6:Run the application and check the output.

Step 7:Let us add a method in the component to capture the submit event and suppress the form submission.

Step 8:Open the template and set the method for click event using event binding.

Step 9:The complete listing of the component is as follows:

Step 10:The complete listing of the component's template is as follows:

Step 11:Run the application and check the output. Clicking the button does not submit the form as it is intercepted and prevented using event binding.

Event binding simplifies event based programming in a typical web application. It allows keyboard, mouse and touch events. It provides detailed information of the target element and its event.

![Image](/angular/images/application-using-event-binding.jpg)
