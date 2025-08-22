+++
title = "Angular - Component Styling"
date = "2025-08-22"
draft = false
description = "Styling is the process of designing and formatting the visual presentation of web pages. Since Angular applications are composed of multiple components, styles are applied to them individually. Angular components can be styled using CSS as well as popular pre-processors such as Sass and Less."
image = "/images/php.jpg"
imageBig = "/images/php.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Component Styling

URL: https://www.tutorialspoint.com/angular/angular-component-styles.htm

Styling is the process of designing and formatting the visual presentation of web pages. Since Angular applications are composed of multiple components, styles are applied to them individually. Angular components can be styled using CSS as well as popular pre-processors such as Sass and Less.

Let's see different techniques of applying styles to the Angular components and different ways to allow safe and efficient customization of styles by the component users in this chapter.

You can use the following ways for styling Angular components −

The simplest and fastest way to style a component is by usingstyles. It is a property of the@Componentdecorator. It accepts an array of CSS styles and applies it to the component view. The pseudo-code of using styles in a component is as follows:

The style applied using styles will affect the component view generated through component template only and is not inherited by the view of the nested components in the component template as well as any content projected in the component view.

ThestyleUrlsis also a property of the@Componentdecorator and is similar tostylesproperty. It accepts an array of CSS style file paths instead of the style itself and applies it to the component view. The pseudo-code of using styleUrls in a component is as follows:

The style applied usingstyleUrlswill affect the component view generated through the component template only and is not inherited by the view of the nested components in the component template as well as any content projected in the component view.

Styling through template is old school method of using CSS styles in the HTML itself through template property of@Componentdecorator. We can style a component using template in two ways, which are:

Styling through template does not restrict the styles to the component view only and applies to the entire HTML generated from the component including nested components and projections.

In HTML,styletag is used to define internal CSS styles for a web page. This tag allows you to embed CSS rules directly within the HTML document. The use of this tag in the Angular template is similar to how we use it in HTML. The pseudo-code to apply styles usingstyletag is as follows:

The most common use oflinktags in HTML documents is to attach external stylesheets. The pseudo code to apply styles to an Angular component using link tag is as follows:

The CSS file path should be relative to the component file. Otherwise, the CSS path in the generated HTML may be pointing to an incorrect or non-existing file.

@importcan be used in CSS files to load more CSS files and the import file should be relative to the host CSS file.

Global styles will be configured during the application creation itself. Angular CLI will setsrc/styles.cssfile as a global stylesheet. We can use it to set styles targeting anything in the application. We can use the global setting to set one or more style sheets as required. The below snippet shows the initial angular configuration created during application creation through angular CLI.

Angular allow not only the plain CSS to style the component. It allows the popular CSS preprocessors such asSassandLess. Using Sass and Less is as simple as including the Sass and Less files instead of CSS files.

Component styleUrls can be used to include Sass and Less as specified below.

CSS preprocessor can be configured at project level or component level through angular settings. Angular CLI command "ng new" will ask the preprocessor to set during initial project creation.

Angular CLI will configure the project with proper CSS preprocessor.

Generally, every angular component will have a default style associated with it. As components can be used in various scenarios, there is a necessity to customize the style of the component to match a given scenario. A good component should have a clear approach to changing the style to suit the environment where the component is used. Angular provides four ways to customize the style of a component.

CSS provides CSS variables to hold styles. Once the CSS variables are defined, they can be used in any CSS properties and allow certain styles to be changed across the application by changing the value of the CSS variable.

Let us see how to define and use CSS variables. CSS variables can be created using:rootpseudo selector as shown below −

Here, myColor variable is defined and its initial value is red. myColor variable can be used in other CSS properties as shown below −

Here, color will be set with the value of myColor (red in this case). If myColor does not have any value or undefined, then grey will be set as color.

The same concept can be applied in a component by using component property and CSS Variable as shown below.

Declare a property for the CSS variable,myColorVarin the component as shown below −

Use CSS variable, myColor and Component property, myColorVar in the style (template) as shown below −

Now, the component can be customized by changing the CSS variable in the :root pseudo selector as shown below −

CSS preprocessor provides a great option to mix different style as and when needed in the CSS usingmixinconcept. Mixin is simply grouping of one or more CSS styles with a name and using it afterwards wherever necessary using the defined name. Let us define two mixin, one for color and another for font style:

Next, we can use the mixin to define a global style using the@includeoption as shown below −

Finally, the user can customize the color and font style in the global style without interfering with the component.

Components usingshadow DOMcan be set with part attributes to allow the users to customize the style using::partpseudo selector in the CSS styles as shown below −

Here, my-web-component web component sets the part attribute for the h1 tag.

Here, h1 tag is targeted through ::part selector and can be customized.

The final and least preferred way to customize the style of the component is through custom component property as shown below −

Here, component will use the properties to get the color information from the user and set it in the template.

Angular provides two custom selectors similar to the shadow DOM concept.

:hostselector is used to style the host element of the component. It comes in two forms. First one is a simple form as shown below −

Here, :host selector applies to the host element and all its descendant elements.

The second one is the function form, which will target the host element only if the host element has the included selector (as arguments) as shown below −

Here, :host(.active) targets the host element only if it has an active class.

Finally,:host-contextselector is similar to host function form :host() except it checks whether any of the ancestor of the host element has the specified selector (in the argument).

Here, the style applies to the host only when any of the ancestors of the host element has .active class assigned to it.

Based on the Angular Component styles concept, there are three MCQs given below. Answer them to test your knowledge about the topics −

Q. 1- Which of the following is used to apply an array of CSS styles directly in the component?

A- styles

B- styleUrls

C- template

D- global styles

The styles property is used in the @Component decorator to directly define an array of CSS styles that apply to the component's view.

Q. 2- Correct way to apply multiple external CSS files to an Angular component:

A-  styles property with inline CSS

B- Template property with link tags

C- styleUrl property with file path

D- styleUrls property with file paths

The styleUrls property is used to link multiple external CSS files by specifying the file paths in the array.

Q. 3- Correct way to define Styling Process:

A- Use of CSS file

B- Modifying current styles

C-  Designing and formatting the visual presentation of web pages

D- It injects styles to component

Styling is the process of designing and formatting the visual presentation of web pages.
