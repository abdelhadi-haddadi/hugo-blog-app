+++
title = "Angular 8 - Reactive Programming"
date = "2025-08-22"
draft = false
description = "Reactive programming is a programming paradigm dealing with data streams and the propagation of changes. Data streams may be static or dynamic. An example of static data stream is an array or collection of data. It will have an initial quantity and it will not change."
image = "/angular/images/reactive.jpg"
imageBig = "/angular/images/reactive.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular 8 - Reactive Programming

URL: https://www.tutorialspoint.com/angular/angular-reactive-programming.htm

Reactive programmingis a programming paradigm dealing with data streams and the propagation of changes. Data streams may be static or dynamic. An example of static data stream is an array or collection of data. It will have an initial quantity and it will not change.

An example for dynamic data stream is event emitters. Event emitters emit the data whenever the event happens. Initially, there may be no events but as the time moves on, events happens and it will gets emitted.

Reactive programming enables the data stream to be emitted from one source calledObservableand the emitted data stream to be caught by other sources calledObserverthrough a process called subscription.

This Observable/Observer pattern or simpleObserverpattern greatly simplifies complex change detection and necessary updating in the context of the programming.

JavaScript does not have the built-in support for Reactive Programming.RxJsis a JavaScript Library which enables reactive programming inJavaScript. Angular usesRxJslibrary extensively to do below mentioned advanced concepts −

Let us learn reactive programming usingRxJslibrary in this chapter.

As learn earlier,Observableare data sources and they may be static or dynamic.Rxjsprovides lot of method to createObservablefrom common JavaScript Objects. Let us see some of the common methods.

of():Emit any number of values in a sequence and finally emit a complete notification.

Here,

numbers$is anObservableobject, which when subscribed will emit 1 to 10 in a sequence.

Dollar sign ($)at the end of the variable is to identify that the variable is Observable.

range():Emit a range of number in sequence.

from():Emit array, promise or iterable.

ajax():Fetch a url through AJAX and then emit the response.

Here,

https://httpbin.orgis a free REST API service which will return the supplied body content in the JSON format as specified below −

fromEvent():Listen to an HTML elements event and then emit the event and its property whenever the listened event fires.

Angular internally uses the concept extensively to provide data transfer between components and for reactive forms.

Subscribing to an Observable is quite easy. Every Observable object will have a method, subscribe for the subscription process. Observer need to implement three callback function to subscribe to the Observable object. They are as follows −

next:Receive and process the value emitted from the Observable

error:Error handling callback

complete:Callback function called when all data from Observable are emitted.

Once the three callback functions are defined, Observable's subscribe method has to be called as specified below −

Here,

next:method get the emitted number and then push it into the local variable,this.numbers.

next:method also adding the number to local variable,this.val1.

error:method just writes the error message to console.

complete:method also writes the completion message to console.

We can skiperrorandcompletemethod and write only thenextmethod as shown below −

Rxjslibrary provides some of the operators to process the data stream. Some of the importantoperatorsare as follows −

filter():Enable to filter the data stream using callback function.

map():Enables to map the data stream using callback function and to change the data stream itself.

pipe():Enable two or more operators to be combined.

Let us create a sample application to try out the reaction programming concept learned in this chapter.

Step 1:Create a new application, reactive using below command −

Step 2:Change the directory to our newly created application.

Step 3:Run the application.

Step 4:Change theAppComponentcode (src/app/app.component.ts) as specified below −

Here,

Change theAppComponenttemplate,src/app/app.component.htmlas specified below −

Here,

Shown all the local variable processed byObservercallback functions.

Open the browser, http://localhost:4200.

Click theClick herelink for five times. For each event, the event will be emitted and forward to theObserver. Observer callback function will be called. The callback function increment the counter for every click and the final result will be as shown below −

![Image](/angular/images/reactive.jpg)
![Image](/angular/images/observer.jpg)
