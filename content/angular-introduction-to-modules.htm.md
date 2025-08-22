+++
title = "Angular - Modules"
date = "2025-08-22"
draft = false
description = "Angular modules are core concepts in Angular application, which help to organize the application structure by grouping the related components, services, etc."
image = "/angular/images/angular-module.jpg"
imageBig = "/angular/images/angular-module.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Modules

URL: https://www.tutorialspoint.com/angular/angular-introduction-to-modules.htm

Angularmodulesarecore conceptsin Angular application, which help to organize the application structure by grouping the related components, services, etc.

In this chapter, we will learn about the angular module, its importance in the application, how to create a module, and how to use it in our application in detail.

In Angular, amodulerefers to a place or container where you can group thecomponents,directives,pipes, andservices, which are related to the application. This helps organize the application, making it easier to understand and manage dependencies efficiently.

For example, if you are developing a website or an application, theheader,footer,left,center, andrightsections become part of a module. However, they are not modules themselves, they are individual components that belong to that module.

Following is a list of commonly usedAngular modules−

In Angular, amoduleplays an important role in "structuring an Angular application", making it easier for others to understand by simply viewing the application's hierarchy. An application is considered well-structured if each concern (say component or section) is separated into its own module.

For example,loginandsignupcomponents can belong to anAuthenticationmodule.

To create an Angular module, you must have a basic understanding of thefirst Angular applicationcreation and about CLI, etc. Here are the step-by-step guides to creating an Angular module in an application:

Step 1:In your code editor (such as VS Code) open any existing angular application or create new one. (See how to...)

Step 2:Open the "terminal" in your code editor and go to your application directory as follows:

Step 3:Now create anew moduleusing the following command:

Here,authis your "module name".

Once the above command is executed successfully, you may see:

Step 4:Toggle theAuthfolder you may able to see theauth.module.tsfile with some default code as follows:

As we have already created a new module named"auth"in our application. To use it properly in our angular application follow the steps below:

Step 1: Import Module

Import the newly created module within your rootmodule (older version)or in thecomponent (recent version)of your application as follows:

Step 2: Create Components

Now create "two" different components namedloginandsignupas follows:

Note:Make sure that thecomponentwithin the@NgModuleshould be"no standalone", otherwise, you may get an "error".

Step 3: Import and Export the components

Open theauth.module.tsfile and import both the components within the@NgModuleas follows:

Step 4: Use Components in your Templates

You can now use theLoginComponentandSignupComponentin your templates. For example, in theapp.component.htmlfile, you can include the following:

Step 5: Run Application



Finally, run the application to see the output:

Step 6: Navigate to localhost:4200



Open your friendly browser (e.gchrome) and navigate through thelocalhost:4200.

As you can see in the above picture the the login and signup components belongs to AuthModule.

In conclusion, theAngular modulesare important for building "scalable", "maintainable", and structured applications. Modules in Angular help organize and structure your code, making it easier to manage and understand.

![Image](/angular/images/angular-module.jpg)
