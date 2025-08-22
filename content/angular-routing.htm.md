+++
title = "Angular - Routing"
date = "2025-08-22"
draft = false
description = "In web development, routing is a technique for navigating between different views or pages in a an application. It allows the application to determine which page to display based on the URL requested by the user."
image = "/angular/images/routing.jpg"
imageBig = "/angular/images/routing.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Routing

URL: https://www.tutorialspoint.com/angular/angular-routing.htm

In web development,routingis a technique for navigating between different views or pages in a an application. It allows the application to determine which page to display based on the URL requested by the user.

In Angular,routingis used to develop a single-page applications (SPAs). Although, an SPA does not support multipage navigation, it allows navigation from one view (component) to another without reloading the entire page. You can define the routes for different components to navigate when the URL changes.

Below is the snippet of code of how routes are defined for differentcomponents:

Here,

When you create a new application, anÂapp.routes.tsÂ file will automatically generated, where you can define these routes for navigation.

The diagram below will give you a clear understanding of how routing works in Angular when the user clicks on a link to navigate to a different component:



These routes are useparametersin the URL to dynamically load different entities of a components based on current  paramter pased in URL:

To configure a static (basic) routing in our Angular application, theAngular CLI(command line interface) provides comprehensive support for setting up routing both during the application creation process and while working on an existing application.

Let's create a new application with routing enabled using the command below:

Even if you do not provide the--routingflag, the above command will generate a new file namedapp.routes.tsby default:

Here,

ImportsRoutesfrom '@angular/router' package.

Routesprovides functionality to configure and execute routing in the application.

Routesis the type used to setup the navigation rules.

Routesis the local variable (of type Routes) used to configure the actual navigation rules of the application.

To define routes in your Angular application that redirect to different components when the URL changes, follow the steps below:

Step 1: Add your routes to your application

Open theapp.routes.tsfile and place the below code:

Here,

Make sure that the generated routes are added in the Configuration file (app.config.ts) otherwise, you might get an error:

To work with routing, you need to include the<router-outlet>directivein your root component (recommended to add inapp.component.html.),  where you want to display the loaded components.

Including the "router-outlet" directive inapp.component.html:

To test the routing, run the application and try to navigate to "/home" and "/about" by changing the URL:

Rather than changing the URL manually, you can use the RouterLink directive. TheRouterLinkdirective is used to set a path for navigating between views or components in an Angular application.

Binding a specified path inapp.routes.tswith an anchor element (<a>) to handle navigation when links are clicked:

The output will look like:

Here,

Note:Make sure that all the necessary modules and dependencies such asRouterOutlet,RouterLink, andCommonModuleshould be added to your root component.

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What is the purpose of Angular Router?

A− To manage server-side routing.

B− To manage client-side navigation.

C− To manage database connections.

D− To manage Angular services.

Angular Router is used to manage the client-side navigation. It enables developers to create Single Page Applications (SPA).

Q 2− Which decorator is used to define routes in Angular?

A− @Component

B− @NgModule

C− @Injectable

D− @RouteConfig

In Angular, the @RouteConfig decorator is used to define route configurations in Angular.

Q 3− How can you pass parameters in Angular routes?

A− Using URL segments.

B− Using query strings.

C− Both A and B.

D− None of the above.

You can pass parameters in Angular routes using both URL segments and query strings. For example, /user/:id for URL segments and /user?id=1 for query strings.

Q 4− Which method is used to navigate between routes programmatically in Angular?

A− Router.go()

B− Router.navigate()

C− Router.change()

D− Router.switch()

The Router.navigate() method is used to navigate between routes programmatically in Angular.

Q 5− Which method is used to navigate between routes programmatically in Angular?

A− To display the default component.

B− To switch between different templates.

C− To act as a placeholder for dynamically loaded components based on the current route.

D− To manage Angular services.

The RouterOutlet directive acts as a placeholder that marks where the router should display the component for the active route.

![Image](/angular/images/routing.jpg)
![Image](/angular/images/angular-routing.gif)
![Image](/angular/images/angular-routing1.gif)
