+++
title = "Angular - Data Binding"
date = "2025-08-22"
draft = false
description = "Data Binding is the process of connecting a target (such as a DOM element, property, or event) in a template to a model (data or behavior) in the component. This process lets the template to dynamically reflect changes in the component's state or execute actions based on user interactions, using tem"
image = "/angular/images/data-binding-types.jpg"
imageBig = "/angular/images/data-binding-types.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Data Binding

URL: https://www.tutorialspoint.com/angular/angular-data-binding.htm

Data Bindingis the process of connecting a target (such as a DOM element, property, or event) in a template to a model (data or behavior) in the component. This process lets thetemplateto dynamically reflect changes in the component's state or execute actions based on user interactions, using template expressions ortemplate statements.

InAngular, data binding is used to establish communication between component class to view template and view template to the component class.

There are two types of Data Binding in Angular −

The diagram below shows the categorization of data binding −

One-way data bindingis a one-directional interaction between acomponentand its template. The data flows either from component to its corresponding template or template to the component. If you perform any changes in your component, then it will reflect in the HTML elements.

One-way data binding can be achieved through the following ways −

In general,Text Interpolationis the process of formatting or manipulating strings. In Angular,itis used to display data from a component to a view. In this way of data binding, we use the curly braces{{ }}.

Let us consider a variable,nameavailable in the component.

Then, the name can be used in the template using interpolation as shown below −

The final output of the template is shown below −

Event bindingis the process of setting an action to the event of an HTML element or another component. It is used to achieve one-way data binding where data flows from the view template to the component class. Here, we use the parentheses( ).

Events are actions like a mouse click, double click, hover or any other keyboard and mouse actions. If a user interacts with an application and performs some actions, then an event will be raised.

Suppose there is a method calledmyAction()inside the component.

For this, event binding can be written as shown below −

Once the submit event is fired,myAction()method will be called and executed.

Property bindinglets us bind a property of a DOM. It is used to show or hide a DOM element, or simply manipulate the DOM. Here, we use square brackets[ ]

Let us consider a property,nameavailable in the component.

Property binding can be written as shown below −

The output of the template is shown below −

Attribute bindingis used to bind the data from component to HTML attributes. The syntax is as follows −

For example, let's consider a property,nameavailable in the component.

Attribute binding can be written as shown below −

The output of the template is shown below −

Two-way data bindingis a two-way interaction where data flows in both ways, from component to views and views to component at the same time. If you do any changes in your property (or model) then, it reflects in your view and vice-versa. It is the combination of property and event binding.

TheNgModel, a standalone Angular directive, is used for two-way data binding. This directive binds the form control to property and the property to form control.

The syntax ofngModelis as follows −

A sample two-way data binding format is as follows,

Here, data will be passed initially from parent to child component and then, whenever the data gets updated in the child component, the child component will fire an event with updated data and the parent will capture the data through event callback method, dataChange().

We will learn two-way data binding concept in more detail in the upcoming chapter.

Binding provides multiple options to connect a component to it's template. This enables the developer to create rich front-end application easily. Binding reduces the complexity of front-end logic and enable developer to concentrate on developing more feature in a short period of time.

Based on the Angular data binding concept, there are three MCQs given below. Answer them correctly to test your knowledge about the topic −

Q. 1- Use of data binding:

A- For communication between the component class and the view template

B- To manage the data flow between components

C- To change the structure of the application

D- For user interactions

In Angular, data binding is used to establish communication between component class to view template and view template to the component class.

Q. 2- Syntax used for one-way data binding:

A- {{data}}

B- (data)

C-  [(data)]

D- [data]

One-way data binding to bind data from the component to the view is done using square brackets [ ].

Q. 3-  Which of the following is used for two-way data binding?

A- [ngModel]

B- [(ngModel)]

B- {{ngModel}}

B- ngModel

The [(ngModel)] syntax is used for two-way data binding in Angular.

![Image](/angular/images/data-binding-types.jpg)
![Image](/angular/images/one-way-binding.jpg)
![Image](/angular/images/two-way-data-binding.jpg)
