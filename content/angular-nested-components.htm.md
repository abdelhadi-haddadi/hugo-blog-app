+++
title = "Angular - Nested Components"
date = "2025-08-22"
draft = false
description = "When you work with a large Angular application, placing all features in a single Component is not a good idea. As the application grows, maintaining it can become quite challenging. Therefore, we need to split it into multiple components. It may require creating components inside others to form a hi"
image = "/angular/images/nested-project-struct.jpg"
imageBig = "/angular/images/nested-project-struct.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Nested Components

URL: https://www.tutorialspoint.com/angular/angular-nested-components.htm

When you work with a large Angular application, placing all features in a single Component is not a good idea. As the application grows, maintaining it can become quite challenging. Therefore, we need to split it into multiple components. It may require creating components inside others to form a hierarchical structure.

In Angular, it is possible to nest components inside each other. The outside container is known as theparent container, and the inner one is known as thechild container.

Nested components are normal Angular Components with parent-child relations. The parent can access and share data with the child, either partially or fully. Creating nested components follows the same process as creating regular components.

Let's look at an example of how to create nested components in an Angular application. Following are the steps −

Step 1:Create an application namednestedApplication.

Step 2:Use thecdcommand to navigate inside the project folder. Then, create a component calledparentusing the following command −

Step 3:To create child component, use the command given below −

Here,childwill be created inside theparentcomponent. And, your project structure will look like this −

Step 4:Next, make changes in thechild.component.htmlfile:

Step 5:Add the below code snippet to theparent.component.htmlfile:

Step 6:Now, call theParentComponentinside theapp.component.htmlfile:

Step 7:After working on the HTML files, it's time to update all the TypeScript files. Start with thechild.component.tsfile:

Step 8:Next, import theChildComponentinparent.component.tsfile:

Step 9:Finally, call theParentComponentby importing it insideapp.component.tsfile:

Once you save all the code changes and run the application usingng scommand, you will get the following output −

You have reached the end of this chapter. Now, it's time to check your understanding of the angular nested component. Please try to give correct answers to the questions given below −

Q. 1- A component inside another component called as:

A- Parent components

B- Child components

C- Root components

D- Standalone components

In Angular, components nested inside another component are called child components. The component containing them is called the parent component.

Q. 2- What must be done in the parent component to display the child component in Angular?

A-  Import the child component in the parent component

B- Add a <router-outlet> inside the parent component

C-  Use the child selector inside the parent template

D- Both A & C

To display the child component, use the child component's selector inside the parent component's template. And, import the child component in the parent component.

Q. 3- In parent-child relations, the parent can access and share data with the child, either partially or fully:

A-  TRUE

B- FALSE

Nested components are normal Angular Components with parent-child relations. The parent can access and share data with the child, either partially or fully.

![Image](/angular/images/nested-project-struct.jpg)
![Image](/angular/images/nested-containers.jpg)
