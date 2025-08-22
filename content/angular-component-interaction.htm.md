+++
title = "Angular - Component Interaction"
date = "2025-08-22"
draft = false
description = "Angular provides options to share data from parent component to child component as well as, child to parent component. Also, it is possible to share data between any other component within the Angular application. Component is a TypeScript class decorated with the @Component decorator. It is used to"
image = "/angular/images/counter.jpg"
imageBig = "/angular/images/counter.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Component Interaction

URL: https://www.tutorialspoint.com/angular/angular-component-interaction.htm

Angular provides options to share data from parent component to child component as well as, child to parent component. Also, it is possible to share data between any other component within the Angular application.Componentis aTypeScriptclass decorated with the@Componentdecorator. It is used to create the user interface.

Data sharing is the practice of making important information accessible to different parts of an application. It is done by transferring data from one component to another, allowing access to data during operations, or synchronizing data between different parts of an application.

Interaction between components is one of the important and necessary features in the context of component based architecture. Angular provides multiple options to pass and receive data between components. Let us see how to share data between components in this tutorial.

In Angular, parent and child components shares data or interacts to each other through the following ways −

The parent component can pass the data to the child component through the@Input()decorator. The child component receives data during its entire life cycle from initialization to destruction. Angular is designed in such a way that the child component automatically intercepts the data changes from the parent component and does the necessary update. Angular also provides hooks to intercept the data changes and write custom processing.

Overall, we have three ways for the child component to intercept data from parent component −

Auto interceptionsimplifies receiving the data from parent component. Angular provides a decorator @Input to receive data from parent component. It receives the data whenever the parent component updates the data Configuring Input decorator is very simple. Just append the input decorator to a property in the child component and then pass the data from parent component through child component attributes in the template.

Let us create a child component and then try to pass the data from parent to child and render it in the child component.

Step 1:Create a new child component,InOutChildSampleusing angular CLI as shown below −

Step 2:Add acounterproperty in the child component and decorate it with@Input()decorator as shown below −

Step 3:Open the child component template,in-out-child-sample.component.htmland use thecounterproperty as shown below −

Step 4:Open the parent component template,app.component.htmland render the child component along with counter attribute as shown below −

Step 5:Open theapp.component.tsfile and add the code given below −

Step 6:Finally, run the application and check that the counter shows whether the value passed from the parent component or not −

Thesetterbased interception is just an extension of the previous technique. It basically uses a getter and setter for the property used in@Inputdecorator.

Let us change our counter example,in-out-child-sample.component.tsto intercept the counter using setter and reset the counter to 1, if the counter value exceeds 25.

Add a function to increment the counter value in the parent component as shown below −

Add a button in the parent components template and bind the function as shown below −

Run the application, and you can see that the counter will reset to 1 once it reaches 25.

As we learned in the life cycle of a component and its hook methods, ngOnChanges is a hook method, which will run whenever angular detects changes in its input.

ngOnChanges hook accepts an object of type SimpleChanges. SimpleChanges is a dictionary having all properties with changes. We can go through all the properties and find the latest value of the property. The pseudo-code to go through all changed properties is as follows −

Child component can send the data to parent component through the@Outputdecorator. Use of this decorator is quite simple and similar to@Inputdecorator except that the output is actually an event emitter passing the data (output) along with event. The parent component can be subscribed for the event in the child component and get the emitted value from the child component whenever the data is changed in the child component.

Let us write an@outputdecorator in our child component,InOutChildSamplecomponent and try to get the output from the parent component.

Step 1:Create an output event emitter in the child component,in-out-child-sample.component.tsalong with a method to pass the value of the counter by emitting the event along with counter data in the child component,in-out-child-sample.component.ts.

Step 2:Open the child component template,in-out-child-sample.component.htmland add a button to invoke the counter event when the user clicks the button.

Here,

clickis the button click event and it is configured to runpassCounterToParent()function when it is clicked.

Step 3:Add a variable in the parent component to hold the output data passed through event from child component. Also, add a function in the parent component to get the output data passed through event from child component.

Step 4:Open the parent component template,app.component.htmland add the code as shown below −

Here,

counterEventis the event from the child component

get($event)is the callback function.$eventwill hold the current counter value.

childContentis the data from the child component.

Step 5:Finally, run the application and you can see that the child component will send the updated counter value to the parent component when the button in the child component is clicked.

Parent components can get complete access to the child component throughlocal variable. However, parent component gets access to the child component in its template only.

Let us create two component, ParentCounterComponent and ChildCounterComponent to understand the concept. The purpose of the ParentCounterComponent is to provide counter functionality through two button, increment and decrement button. The increment button will increment the counter and the decrement button will decrement the counter. Parent component will get the increment and decrement functionality from child component instead of implementing itself.

Step 1:Create child component,ChildCounterComponentusing angular CLI as shown below −

Step 2:Declare a variablecounterand two methodsinc()anddec()to increment and decrement the counter respectively inside the child component −

Step 3:Next, open parent component's template file,app.component.htmland add child component along with an id,#childto access the child component.

Step 4:Next, add two buttons and bind click events with child component'sinc()anddec()methods accessed through child identifier. Also, show the current value of counter using child identifier.

Step 5:Next, include the given code insideapp.component.tsfile.

Step 6:Finally, run the application and check whether the counter is working fine.

Like thelocal variable, the@ViewChilddecorator is also used to get complete access to the child component. However, along with template, the parent component will get access to the child component in its class environment as well. This makes a huge difference as the parent component can use the child component functionality in its methods as well.

To understand the@Viewchilddecorator, let's change the parent component, i.e.AppComponent. Now, we will use@ViewChildconcept instead of local variable. We don't need to make any changes in the child component.

Step 1:Import necessary classes from @angular/core module:

Step 2:ImplementAfterViewInitlife cycle hook as shown below:

Step 3:Access the child component using@ViewChildas shown below −

Here,@ViewChilddecorator accepts the type of the child component, which is in the component's template.

Step 4:Implement increment and decrement functionality by accessing the child component.

Here, we have usedthis.childvariable to access the functionality from child component.

Step 5:Implement a counter functionality to retrieve the current counter value as shown below −

Here, we have created a counter method inngAterViewInitlife cycle hook. The child component will be available only after this life cycle. So, we have created a dummy counter method (which needs to access child component's counter value ) during component initialization and the update the counter method in the hook method.

Step 6:The complete code of theAppComponentis as follows −

Step 7:Next, open the component's template file,app.component.htmland add the child component along with button and method binding as shown below −

Here, we have not included the identifier and used only the parent components functionality instead of child component (which we have done in previous example, local variable concept). The parent component will get the required functionality from child variable, which it got through@ViewChilddecorator.

Step 8:Finally, run the application and check that the counter shows that the value passed from parent component as shown below −

Serviceis an integral part of the angular framework. We can create a service to implement specific functionality and then use it in any component. The best use cases of services are as follows:

Let us learn how to use services to share data between components in this section. We will learn the step by step process to share data through a service in this example.

Step 1:Create a service,MyCounterServiceusing angular CLI as shown below −

It is better to put all the services inside a single folder. Therefore, we are creatingMyCounterinsideservicefolder using the above command.

Step 2:Create a component,MyCounterServiceComponentusing angular CLI as shown below −

Step 3:Create an observable object to track the value ofcountervariable in the service as shown below −

Here,

counterSourceis a variable of type Subject. Subject is an observable object provided byrxjslibrary. Subject can emit and receive values.

Invoked asObservable method on the counterSource to hide the identity of the source sequence.

Step 4:Implement increment and decrement methods as shown below −

Here,

next()method from counterSource is used to update the value of the counter.

Step5:The complete code of the service,MyCounterServiceis as follows:

Step 6:Now, open themy-counter-service.component.tsfile and inject the service through constructor in the component.

Step 7:Subscribe to the observables available in the service through component constructor as shown below −

Here, the subscription will update the counter value whenever there is a change in the observable.

Step 8:Implement increment (inc()) and decrement (dec()) methods by calling counter service methods as shown below −

Step 9:The complete code of the component,MyCounterServiceComponentis as follows,

Step 10:Next, open the component's template,my-counter-service.component.htmland write template markup to show the current counter value and then add two more buttons to increment and decrement the counter value. Bind inc() and dec() methods to increment and decrement button's click event respectively.

Step 11:Next, open the app component's template and include our component as shown below −

Step 12:Run the application and check the output.

Step 13:Next, add another component in the app component's template as shown below −

Step14:Run the application and see that incrementing one component will reflect in the other component as well. It happens as it is based on the same service.

Now that you have learned the how Angular Components interacts, let's test your knowledge. Please answer the following questions based on your understanding −

Q. 1- Which Angular decorator is used to pass data from a parent component to a child component?

A- @ViewChild

B- @Output

C- @Input

D- @Directive

The @Input decorator bind data of the parent component to a property in the child component.

Q. 2- Which lifecycle hook detect changes in input properties in Angular?

A-  ngOnChanges

B- ngAfterViewInit

C- ngOnInit

D- ngOnDestroy

The ngOnChanges lifecycle hook is called whenever Angular detects changes in the input properties of a component.

Q. 3- Use of @Output decorator:

A- It allows the parent component to pass data to the child component.

B- It creates an event emitter for the child to send data to the parent.

C- It initializes a variable in the parent component.

D- It injects services into the child component.

The @Output decorator is used to emit events from the child component to the parent component.

![Image](/angular/images/counter.jpg)
![Image](/angular/images/counter-reset.jpg)
![Image](/angular/images/child-component.jpg)
![Image](/angular/images/counter-working.jpg)
![Image](/angular/images/parent-component.jpg)
![Image](/angular/images/app-component.jpg)
![Image](/angular/images/two-component.jpg)
