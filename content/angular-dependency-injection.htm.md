+++
title = "Angular - Dependency Injection"
date = "2025-08-22"
draft = false
description = "Dependency Injection (in short, DI) is a design pattern in which a class receives its dependencies from an external source instead of creating them itself. This approach helps applications achieve loose coupling and reduce tight coupling between different parts of the application. By injecting depen"
image = "/angular/images/angular-dependency-injection.jpg"
imageBig = "/angular/images/angular-dependency-injection.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Dependency Injection

URL: https://www.tutorialspoint.com/angular/angular-dependency-injection.htm

Dependency Injection(in short, DI) is adesign patternin which a class receives its dependencies from an external source instead of creating them itself. This approach helps applications achieve loose coupling and reduce tight coupling between different parts of the application. By injecting dependencies, applications become more flexible and adaptable to changes.

InAngular, dependency injection is used to inject services and other dependencies into components and other classes. Before understanding dependency injection in Angular, let's discuss its features and uses.

Dependency injection is used because of the following reasons −

In Angular, dependency injection is the feature of injecting services and values (like, strings and functions) into classes havingAngular decorators. Angular usesprovidersto define how dependencies should be created, andinjectorsto manage the lifecycle of these dependencies. Services, components, directives, and pipes can all use DI to receive their dependencies.

In Angular, when you declare a dependency in the Component's class constructor, Angular looks up the service in its dependency graph and injects it into the component automatically. Let's see how dependency injection works step by step −

Service Creation:First, define a service using the@Injectabledecorator. Inside this decorator useprovidedInand give it a valuerootwhich will provide the service at the root level (means whole application).

Injecting the Service:In the component's constructor, declare the service as a parameter. Angular will inject the required instance of the service automatically.

Usage:Once injected, you can use the service in your component or other classes.

Scope of the Service:By default, services provided in the root are singleton, which means only one instance is shared across the application. However, services can also be provided at different levels if you want different instances for different parts of the application.

In this section, we will see how to implement dependency injection in an Angular application with the help of an example.

In the following example, we create an array of color names and then print it. The name of the colors will be printed using dependency injection.

Step 1:Create a service which is a class that holds the code to fetch data. This data will be shared across components within the application. Use the below command to create a service −

You can give any name of your choice.

Step 2:Open the service file and add the code given below −

Step 3:Once you have created a service, inject it into any component that needs it by including it in the constructor as shown below. We are injecting it inside app component.

Step 4:Now, add the following code inside template file.

Step 5:Run the application usingng servecommand to get the output.

![Image](/angular/images/angular-dependency-injection.jpg)
![Image](/angular/images/example-dependency-injection.jpg)
