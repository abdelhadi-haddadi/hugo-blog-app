+++
title = "Angular - Navigation"
date = "2025-08-22"
draft = false
description = "Navigation in web applications refers to the process of moving (navigating) through different pages or views within an application. It allows users to interact with various components, access different sections, and use application features."
image = "/angular/images/navigation-app.jpg"
imageBig = "/angular/images/navigation-app.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Navigation

URL: https://www.tutorialspoint.com/angular/angular-navigation.htm

Navigationin web applications refers to the process of moving (navigating) through different pages or views within an application. It allows users to interact with various components, access different sections, and use application features.

Let's consider a simple login page in an application. On this login page, users can see links forSign UpandForgot Password. These links allow users to navigate to the Sign-Up and Forgot Password sections or components.

In Angular,navigationis a feature that allows users to move between different sections or components within an application. This can be done by definingroutingfor an individual click requests without using therouterLinkdirectivefrom theRouterModule.



In this chapter, we will discuss how to manually set the navigation without using the routerLink directive. In Angular, therouter serviceprovides thenavigate()method to programmatically navigate to different routes within the application.

To manually set navigation and navigate through different components in Angular, follow these steps:

Step 1:Open thenode.jscommand or terminal in your IDE (such as VS code) and go to your favorite workspace as follows:

Step 2:InstallCLIand create a new application using the command below:

Step 3:Now, navigate to your newly created application as follows:

Step 4:Open theapp.component.htmlfile and remove everything leaving only the following:

Step 5:Run the application using the below command to ensure that the application is created successfully:

Step 6:Createtwo componentsusing the command below:

Step 7:Open theapp.component.htmlfile and place the below code:

Step 8:Open theapp.component.tsfile and place the below code:

Step 9:Now open theapp.routes.tsfile and place the code below:

Step 10:Finally, run the application using the following command:

Step 11:Navigate tohttp://localhost:4200/in your browser to see the first view of the application as follows:

Click theGo to Inventorybutton to navigate theInventory Pageas follows:

Click theGo to Productbutton, you will get the following output which takes you to theProducts page.

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What is the default behavior of Angular Router when an unknown URL is accessed?

A− Redirect to home page.

B− Display 404 page templates.

C− Throw an error.

D− None.

By default, Angular Router displays a 404 page when an unknown URL is accessed.

Q 2− Which Angular module is used to configure the routing in an Angular application?

A− FormsModule

B− HttpClientModule

C− RouterModule

D− CommonModule

The RouterModule is used to configure the routing in an Angular application.

Q 3− Which method is used to get the current route parameters in Angular?

A− this.route.snapshot.params

B− this.route.getCurrentParams()

C− this.router.currentParams

D− this.router.getParams()

The this.route.snapshot.params method is used to get the current route parameters in Angular.

![Image](/angular/images/navigation-app.jpg)
![Image](/angular/images/inventory.jpg)
![Image](/angular/images/back-to-product.jpg)
