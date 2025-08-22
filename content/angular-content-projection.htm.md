+++
title = "Angular - Content projection"
date = "2025-08-22"
draft = false
description = "Content projection is a technique available in the Angular component to include external content (from consumer of the component) along with layout and styles in the specific area of the component template. "
image = "/angular/images/output-application.jpg"
imageBig = "/angular/images/output-application.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Content projection

URL: https://www.tutorialspoint.com/angular/angular-content-projection.htm

Content projection is a technique available in the Angular component to include external content (from consumer of the component) along with layout and styles in the specific area of the component template.

The different ways in which we can implement content projection are:

A component involving only one content projection is called single-slot content projection.

Let us understand the content projection by creating the above explained component.

Step 1:Create aprojectionSampleapplication using the below command −

Step 2:Navigate to project folder and create a new component with the namecontent-projection-sample:

Step 3:Add<ng-content>tag in the template, i.e.content-projection-sample.component.htmlfile as shown below −

Step 4:Use thecontent-projection-samplecomponent in theapp.component.htmlfile as shown below −

Step 5:Now import theContentProjectionSampleComponentinside theAppComponent.

The output of the application is as shown below −

Angular allows multiple content to be projected in the component as well and it is called multi-slot content projection.

Let us see how to use multiple content projections by modifying the above example.

Step 1:Add another<ng-content>along with selector attribute in the component template,content-projection-sample.component.htmlas shown below −

Step 2:Update the app component template,app.component.htmlas shown below −

Here, the value of selector attribute (second) set in the component template is used in the content to be projected.

Step 3:Now, run the application and check the output.

Conditional content projection is projecting a content when certain condition is met. We can use ng-content to conditionally project the content. But it is not recommended since<ng-content>will be initialized even if the content is not going to be rendered. Instead, we can use<ng-template>to project the content safely since it will initialize the content only when it is going to be rendered.

Let us create a working demo by updating ourprojectionSampleapplication and learning the conditional projection in more detail.

Step 1:Create a directive,greet-contentusing angular CLI as shown below −

Step 2:Update the directive and get the template reference as shown below −

Here,

selectoris the key to identify the directive

templateis the reference object of type TemplateRef injected into the directive through constructor injection (dependency injection concept)

Step 3:Update the component,ContentProjectionSampleComponentto get the directive object and set the actual condition as shown below −

Here,

showis the variable, which holds the deciding condition

@ContentChildis the decorator, which will be used to get the directive instance

Step 4:In the component's template, usengIffor checking the condition,ng-containerandngTemplateOutletto display the template (greet.template) in the components template as shown below −

Step 5:Finally, use the component and its conditional projection in the app component as shown below −

Step 6:Now import the directive inside theAppComponent.

Step 7:Run the application and check the output to find whether content is rendered through conditional projection concept or not:

Step 8:Update the condition, show in the component to false and check the output to find that the ng-template content is not rendered.

ngProjectAsis a special attribute used to project content in complex scenarios. One example is using ng-container to layout the template. As we know, ng-container does not render itself and out-render its child content, we need to use ngProjectAs attribute to project its content.

Let us change the above example to use ng-container and ngProjectAs attribute. Update the app component template, app.component.html as shown below −

Here, the value of selector attribute (second) set in the component template is used in the ng-container.

The output of the application is as shown below −

![Image](/angular/images/output-application.jpg)
![Image](/angular/images/multi-slot-content.jpg)
![Image](/angular/images/conditional-projection.jpg)
![Image](/angular/images/component-template.jpg)
![Image](/angular/images/ngprojectas.jpg)
