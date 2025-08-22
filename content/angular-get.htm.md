+++
title = "Angular - HTTP GET Request"
date = "2025-08-22"
draft = false
description = "TheHTTP standard verbGETcan be used in HTTP protocol to get (retrieve) a resource (data) from the server. The purpose of theGET method is to request data from the server. The server will check for the specified resource in the server and send it back if it is available."
image = "/angular/images/expenses.jpg"
imageBig = "/angular/images/expenses.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - HTTP GET Request

URL: https://www.tutorialspoint.com/angular/angular-get.htm

TheHTTPstandard verbGETcan be used in HTTP protocol to get (retrieve) a resource (data) from the server. The purpose of theGET method is to request data from the server. The server will check for the specified resource in the server and send it back if it is available.

In Angular, theHttpClientservice class provides aget()method to request data from the server using the HTTP GET verb. Let's learn more about this method, including it's signature, parameters, and real-time usage:

Following is the signature (different from syntax) of the HttpClientget()method −

Here,

To work out theHTTPclient-server communication, we need to create a backend web application and expose a set of web APIs. These webAPIscan be requested from the client. Let's create a sample server application,Expense API App, to provide CRUD REST APIs (mainly GET requests) for managing expenses.

Step 1:Go to your favorite workspace as shown below −

Step 2:Create a new folder,expense-rest-api, and move into the folder −

Step 3:Create a new application using theinitsub-command provided by thenpmcommand as shown below −

Note:Once you run the above command, it will ask a few questions and answer all of them with default answers.

Step 4:Install express and cors packages to create node-based web applications −

Step 5:InstallSQLitepackage to store the expenses in the SQLite-based database −

Step 6:Create a new file with the namesqlitedb.js, and add the below code to initialize the database with expense table and sample expense entries. An expense table will be used to store the expense items −

Step 7:Open theindex.jsfile,  and place the below code −

Here, the code will create six below-mentionedREST APIendpoints:

Step 8:Now, run the application using the below command −

Step 9:To test the application, open your friendly browser (chrome) and go tohttp://localhost:8000/URL. It should return the below message if the application is working fine −

Let us create a working angular example to get all expense items from the above server application by using theHttpClientservice class andget()method −

Step 1:Run the below command to create an angular application −

Enable angular routing and CSS as shown below −

Step 2:EnableHTTPcommunication in the application by importingHttpClientModulein the root component configuration file (app.component.ts) −

Here,

Imported the HttpClientModule from @angular/common/http module.

Added the HttpClientModule into imports section of the @Component configuration.

Step 3:Create a new interface,ListExpensesto show the expense items from the server −

Step 4:Create a new component,ListExpensesto show the expense items from the server −

It will create a new component as shown below −

Step 5:Include our new component into the App root component view,app.component.htmlas shown below −

Step 6:Inject theHttpClientinto theListExpensescomponent through theconstructoras shown below −

Step 7:Implement theOnInitlife cycle hook to request the server for expenses after the initialization of theListExpensescomponent −

Step 8:Create a local variable,expensesto hold our expenses from the server −

Step 9:Call the get method of this.http (HttpClient instance) object by passing the URL and options to get the expense object from the server. Then, set the expenses into our local variable, expenses −

Here,

Sets theExpense[]as the type of the object returned by the server. The server will send the array of expense objects in its body inJSONformat.

Subscribed to the request (this.http.get) object. Then parsed the subscribed data as an array of expense objects and set it to a local expense variable (this.expenses).

Step 10:The complete code of theListExpensesComponentis as follows −

Step 11:Next, get the expenses object from the component and render it in our component template page (list-expenses.component.html) −

Step 12:Finally, run the application using the below command −

Step 13:Now, open your friendly (chrome) browser navigate tohttp://localhost:4200/URL, and check the output −

Here, the output shows our expenses as a list of items.

Angular provides an easy way to request the server through the HttpClientobject.get()is a specific method used to get resources from the server. We will learn more HTTP methods to target other HTTP verbs in the upcoming chapters.

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What is the primary purpose of an HTTP GET request in Angular?

A− To submit data to a server

B− To retrieve data from a server

C− To delete data from a server

D− To update data on a server

The primary purpose of an HTTP GET request is to request data from a specified resource on the server.

Q 2− Which Angular service is commonly used to make HTTP GET requests?

A− HttpService

B− HttpModule

C− HttpClient

D− HttpRequest

The HttpClient service is commonly used to make HTTP GET requests in Angular applications.

Q 3− Which method is used to handle the response of an HTTP GET request in Angular?

A− subscribe

B− then

C− catchError

D− finally

The subscribe method is used to handle the response of an HTTP GET request in Angular.

![Image](/angular/images/expenses.jpg)
