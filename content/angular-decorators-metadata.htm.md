+++
title = "Angular - Decorators & Metadata"
date = "2025-08-22"
draft = false
description = "Decorators are special functions used to add metadata, modify behavior, or add some additional functionalities to classes, methods, properties, or parameters in programming languages like TypeScript or JavaScript."
image = "/images/php.jpg"
imageBig = "/images/php.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Decorators & Metadata

URL: https://www.tutorialspoint.com/angular/angular-decorators-metadata.htm

Decoratorsare special functions used to add metadata, modify behavior, or add some additional functionalities to classes, methods, properties, or parameters in programming languages likeTypeScriptorJavaScript.

InAngular, each decorator has a base configuration with some default values and you can change or update it according to the project's need. It is defined using the@ symbolfollowed by a function name. This symbol helps Angular to recognize decorators.

Angular provides the following decorators −

The@Componentdecorator is used to define acomponentin Angular. A component generates a section of web page called View and this decorator helps Angular understand the metadata related to the component.

The following example shows @component decorator in an angular component.

The metadata included in the above example is selector, imports, templateUrl, and styleUrl. They define how the component should be displayed in the DOM.

If a TypeScript class in Angular is decorated by@Injectable decorator, Angular will consider it as a service that can be injected into other classes.

Let's see an example of @Injectable decorator.

By marking a service with @Injectable, Angular knows to create and inject the service wherever it's needed in the application.

The@NgModule decoratoris used to define an Angular module. A module is a collection of related components, services, pipes, and directives that are bundled together.

Here is an example of @NgModule decorator −

The @NgModule decorator tells Angular about which components, directives, and pipes are part of the module and which other modules are imported.

The@Directive decoratoris used to define a custom directive, which can modify the behavior or appearance of elements in the DOM.

The example given below shows a custom directive that modifies the background color of any element it's applied to.

The@Input decoratordecorator is used in components to define inputs for property binding. It helps data to be passed into the component.

In the following, we will see how to use @Input decorator within a component.

Child component can send the data to parent component through the @Output decorator. This decorator is actually an event emitter that passes the data (output) along with event.

The following example shows the use of @Output decorator.

The@Pipe decoratorin Angular is used to define custom pipes, which transform data in templates.

Here is an example of @Pipe decorator.

This CapitalizePipe transforms the first letter of a string to uppercase and the rest to lowercase.

In Angular,Metadatais the information that is attached to classes and other elements to define their behavior. It is defined via decorators, as we saw earlier. When Angular processes a component or service, it reads the metadata to configure the element's behavior.

Let's see the metadata mentioned inside an Angular @Component decorator −

Here,

selectorspecifies the HTML tag to use for this component.

templateUrlpoints to the location of the HTML template file.

styleUrlsspecifies the location of the CSS files that define the component's styling.
