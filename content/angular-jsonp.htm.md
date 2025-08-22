+++
title = "Angular - JSONP"
date = "2025-08-22"
draft = false
description = "The JSONP is a special technique (of feature) used to bypass the cross-domain (CORS) policies enforced by web browsers. Generally, browsers only support AJAX calls within the same domain. To make AJAX calls to another domain, CORS policies need to be enabled on both the server and the client (browse"
image = "/angular/images/myhttpapp.jpg"
imageBig = "/angular/images/myhttpapp.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - JSONP

URL: https://www.tutorialspoint.com/angular/angular-jsonp.htm

TheJSONPis a special technique (offeature) used to bypass the cross-domain (CORS) policies enforced by web browsers. Generally, browsers only supportAJAX callswithin the same domain. To make AJAX calls to another domain, CORS policies need to be enabled on both the server and the client (browser).

Instead of enabling the CORS policy, the server can send the response in JSONP format. JSONP format isJSONenclosed in a callback function. When the browser receives the response, it executes it as a script. The callback function then processes the response and performs the necessary business logic.

Syntax for theJSONP callbackfunction −

Here,

In Angular, thejsonp()is the method available in theHttpClientservice class used to request the server using the JSONP technique. It is similar to the HttpClientget()method with an additional option to set the name of the query parameter used to get the callback function by the server.

An Angular will auto-generate a function toparsetheJSONon the client side. Then, it will add a new query parameter to the URL. The name of the query parameter will be the name set in the JSONP call. The value of the query parameter is the name of the function auto-generate by angular.

The signature (different from syntax) of the HttpClientjsonp()method is as follows −

Here,

A simple code to demonstrate the JSONP method is as follows −

Here,

To work out the HTTPclient-servercommunication, we need to set up a web application and need to expose a set of web APIs. The web API can be requested from the client. Let us create a sampleserver application,Expense APIApp to provideCRUD REST API(mainly JSONP request) for expenses −

Step 1: Go to your favorite workspace as follows −

Step 2:Create a new folder,expense-rest-api, and move into the folder −

Step 3:Create a new application using theinitsub-command provided by thenpmcommand as shown below −

Once you run the above command, it will ask a few questions and answer all of them with default answers.

Step 4:Installexpressandcorspackages to create node-based web applications −

Step 5:InstallSQLitepackage to store the expenses in the SQLite-based database −

Step 6:Create a new file,sqlitedb.js, and place the below code to initialize the database with expense table and sample expense entries. Anexpensetable will be used to store the expense items −

Step 7:Open theindex.jsfile (if not found, create it manually), and place the below code −

Here, the code will create six below-mentioned REST API endpoints:

Step 8:Run the application using the command as shown below −

Step 9:To test the application and to make sure it is working, open a browser and go tohttp://localhost:8000/. It should return the below message if the application is working fine −

Let us create a working angular example to get all expense items from the above server application by usingtheHttpClientservice class andget()method −

Step 1:Create a new angular application by runningng newcommand as shown below −

Enable angularroutingandCSSas shown below −

Step 2:Enable HTTP communication in the application by importingHttpClientModulein the component configuration file(app.component.ts)as per the latest version −

Here,

Step 3:Create a new interface with the nameExpenseto represent our expense item −

Step 4:Create a new component,ListExpensesto show the expense items from the server −

It will create the component as shown below −

Step 5:Include our new component into the App root component view,app.component.htmlas shown below −

Step 6:Inject theHttpClientinto theListExpensescomponent through the constructor as shown below −

Step 7:Implement the OnInit life cycle hook to request the server for expenses after the initialization of theListExpensescomponent −

Step 8:Create a local variable,expensesto hold our expenses from the server −

Step 9 :Call theget()method ofthis.http(HttpClient instance) object by passing the URL & options and retrieving the expense object from the server. Then, set the expenses into our local variable, expenses −

Here,

Step 10:The complete code of theListExpensesComponentis as follows −

Step 11:Next, get the expenses object from the component and render it in our component template page (list-expenses.component.html) −

Step 12:Finally, run the application using the below command −

Step 13:Open the browser and navigate to http://localhost:4200/ url and check the output

Here, the output shows our expenses as a list of items.

Angular provides an easy way to request the server through theHttpClient object.jsonp()is a specific method used to get resources from the server even if the server does not support cross-domain API calls (CORS).

![Image](/angular/images/myhttpapp.jpg)
