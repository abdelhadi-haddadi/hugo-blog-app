+++
title = "Angular - First Application"
date = "2025-08-22"
draft = false
description = "In this tutorial, we will learn how to create and run our first Angular application on a local machine. We also analyze its project structure. Before we proceed, please ensure that you have set up an Angular development environment on your system. You can refer to our Angular Environment Setup tutor"
image = "/angular/images/project-structure.jpg"
imageBig = "/angular/images/project-structure.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - First Application

URL: https://www.tutorialspoint.com/angular/angular-first-application.htm

In this tutorial, we will learn how to create and run our first Angular application on a local machine. We also analyze its project structure. Before we proceed, please ensure that you have set up an Angular development environment on your system. You can refer to ourAngular Environment Setuptutorial, where we explain the installation of all the necessary tools required for the Angular development process.

The following steps are necessary to create and run each Angular application successfully −

Install Angular CLI

Create Angular Application

Start Angular Application

Angular CLI is a command line interface used to maintain Angular applications directly from a command shell. It uses Node and node package manager to install and run JavaScript tools outside the browser.

Use the following command to install Angular CLI −

Let us check whether the Angular is installed in our system and the version of the installed Angular using below command −

Here,

ngis the prefix that stands for Angular. It is used to denote Angular-specific directives, components, and modules. It runs in NodeJS environment.

The result will show the details of the Angular version −

So, Angular is installed in our system and the version is18.2.11.

To create a new Angular applicationng newcommand is used.

Let us create an Angular application to check our day to day expenses. Give it a nameexpense-manager. But, first navigate to the folder where you want to create an Angular application using thecdcommand. Then, use below command to create the new application −

When you run the above command a new folder with the nameexpense-managerwill be created in the current working directory. Inside this folder, the Angular CLI install all the necessary Angular npm packages and other dependencies.

You will be asked some basic question in order to create new application like type of style sheet, enable SSR and SSG. For style sheet, choose CSS and do not enable SSR and SSG for the time being.

Once the basic questions are answered, a new Angular application will be created underexpense-managerfolder. Let us move into the our newly created application folder −

The initial structure of the application will be −

The important directories of the application are −

src:This directory contains all the source code for your Angular application, including components, services, modules, templates, styles, and assets.

app:It is a sub-folder of src directory. It contains component files.

angular.json:This is the workspace configuration file which means it defines the configuration options for the entire Angular workspace.

node_modules:This directory contains all the npm packages installed as dependencies for the project.

package.json:This file contains metadata about the project and lists the npm dependencies required for the project.

tsconfig.json:It is the TypeScript configuration file that specifies the compiler options for TypeScript files.

public:This file is used to store asset files.

To start an Angular application, we use theng serveCLI command.

Here, the above sub command compile and run the Angular application using a local development web server. It will start a development web server and serves the application under port, 4200.

Let us fire up a browser and open http://localhost:4200. The browser will show the application as shown below −

We will change the application and learn how to code an Angular application in the upcoming chapters.

![Image](/angular/images/project-structure.jpg)
![Image](/angular/images/first-app-result.jpg)
