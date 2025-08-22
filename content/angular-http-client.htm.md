+++
title = "Angular - HTTP Client"
date = "2025-08-22"
draft = false
description = "HTTP is an application layer protocol on the Internet. It stands for Hypertext Transfer Protocol and is the foundation of any data exchange on the web. It transmits hypertext requests and information between a server and a browser (client)."
image = "images/http_client.jpg"
imageBig = "images/http_client.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - HTTP Client

URL: https://www.tutorialspoint.com/angular/angular-http-client.htm

HTTPis an application layer protocol on the Internet. It stands forHypertext Transfer Protocoland is the foundation of any data exchange on the web. It transmits hypertext requests and information between a server and a browser (client).

HTTP Client is aclient-side programmingthat provides the HTTP server access to various resources and services. It allows the client (a browser or application) to send HTTP requests and receive responses from the server.

HTTP clientprogramming is an important feature in every modern web application. Nowadays, many applications expose their functionality throughREST APIs, which work over the HTTP protocol.

To support this, the Angular team offers extensive tools to enable HTTP communication with servers. Angular provides a module calledHttpClientModuleand a service calledHttpClientto handle HTTP programming.

The following diagram provides a clear understanding of the HTTP Client, and the request and response mechanism −

Let us learn how to use the HttpClient service in this chapter. Developers should have a basic understanding of HTTP programming to understand the concepts discussed in this chapter.

The prerequisite for HTTP programming is a basic understanding of the HTTP protocol and REST API techniques. HTTP programming involves two parts: the server and the client. Angular provides support for creating client-side applications, while Express (a popular web framework)  provides support for creating server-side applications.

Let us create anExpense Rest APIusing the express framework and then access it from ourExpenseManagerapplication using theAngular HttpClientservice.

Open a command prompt and create a new folder,express-rest-api.

Initialize a new node application using the below command −

After running thenpm init commondwill ask some basic questions like project name (express-rest-API), entry point (server.js), etc., as mentioned below −

Installexpress,SQLite, andcorsmodules using the below command −

Create a new filewith the namesqlitedb.jsand place the below code −

Here, we are creating a new SQLite database and loading some sample data.

Now, openserver.jsand place the below code (if you are not able to see the file in your application create it manually within the root directory) −

Here, we create a basic CURD rest API to select, insert, update, and delete expense entries.

Run the application using the below command −

Open a browser, enterhttp://localhost:8000/and press enter. You will see below response −

The above message confirms that our application is working fine.

Change the URL tohttp://localhost:8000/api/expense, and you will see all the expense entries in JSON format.

Finally, we created a simpleCURD REST APIfor expense entry, and we can access the REST API from our Angular application to learn the HttpClient module.

Let's learn how to configuretheHttpClientservice. The HttpClientservice is available inside theHttpClientModulemodule, which is available inside the@angular/common/httppackage.

To registerHttpClientModulemodule. You need to import the HttpClientModule inAppComponent:

Include HttpClientModule in imports meta data of AppComponent.

Let us create a new servicenamedExpenseEntryServicein yourExpenseManagerapplication to interact withExpense REST API. ExpenseEntryService will get the latest expense entries, insert new expense entries, modify existing expense entries, and delete the unwanted expense entries.

Open the command prompt and go to the project root folder:

Start the application by running the below command:

Run the below command to generate an Angular service with the nameExpenseService:

This will create two Typescript files (expense entry service & its testing file) as specified below:

Now, opentheExpenseEntryService(src/app/expense-entry.service.ts) file  importExpenseEntry,throwError, andcatchErrorfrom the rxjs library, and importHttpClient,HttpHeaders, andHttpErrorResponsefrom @angular/common/http package:

Inject the HttpClient service into our service:

Create a variable,expenseRestUrlto specify theExpense Rest APIendpoints:

Create a variable,httpOptionsto set the HTTP Header option. This will be used during the Http Rest API call by the AngularHttpClientservice:

The complete code is as follows:

The HttpClient provides aget()method to fetch data from a web page. The main argument is the target web URL. Another optional argument is the option object with the below format  −

Here,

headers:HTTP Headers of the request, either as string, an array of string, or an array of HttpHeaders.

withCredentials:Whether the request has credentials or not (true or false).

Note:All options are optional, you can choose to use them or not.

Theget()method returns the response of the request asObservable. The returned Observable emits the data when the response is received from the server.

The sample code to useget()method is as follows:

Theget()method has an option to return observables, which emits a typed response as well. The sample code to get a typed response (ExpenseEntry) is as follows:

Error handling is one of the important aspects of HTTP programming. Encountering errors is one of the common scenarios in HTTP programming.

Errors in HTTP Programming can be categorized into two groups −

Let us write a simple error handling for ourExpenseEntryServiceservice.

The error function can be called inget()as specified below −

As we mentioned earlier, errors can happen, and one way is to handle them by implementing the error handling. Another option is to try for a certain number of times. If the request fails due to a network issue or the HTTP server is temporarily offline, the next request may succeed.

We can usetherxjslibrary"retry"operator in this scenario as specified below :

Let us do the actual coding to fetch the expenses fromExpense Rest APIin our ExpenseManager application.

Open the command prompt and go to the project root folder:

Start the application by running the following command:

Now, add thegetExpenseEntries()andhttpErrorHandler()methods inExpenseEntryService(src/app/expense-entry.service.ts) service as follows:

Here,

The complete coding ofExpenseEntryServiceis as follows:

Open theExpenseEntryListComponentand go to the "src-entry-list-entry-list.component.ts" file and injectExpenseEntryServicethrough the constructor as specified below:

Change thegetExpenseEntries()method, and call the "getExpenseEntries()" method fromExpenseEntryServiceinstead of returning the mock items:

The completeExpenseEntryListComponentcodes are as follows −

Finally, check the application and you will see the below response:

TheHTTP POSTis similar toHTTP GETexcept that the post request will send the necessary data as posted content along with the request. HTTP POST is used to insert new records into the system.HttpClientprovidesthepost()method, which is similar toget(), except it supports an extra argument to send the data to the server.

Let us add a new method,addExpenseEntry()in ourExpenseEntryServiceto add new expense entry as mentioned below:

TheHTTP PUTis similar toHTTP POSTrequests. This is used to update existing records in the system. The HttpClientprovidesaput()method, which is similar topost().

Let us add a new method,updateExpenseEntry()in ourExpenseEntryServiceto update existing expense entry as mentioned below:

TheHTTP DELETEis similar to theHTTP GETrequest. It is used to delete entries in the system. The HttpClientprovidesadelete()method, which is similar toget().

Let us add a new method,deleteExpenseEntry()in ourExpenseEntryServiceto delete existing expense entries as mentioned below:

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What does HttpClient in Angular do?

A− Manages routing

B− Handles form validation

C− Performs HTTP requests

D− None of the above

In Angular, the HttpClient performs HTTP requests to communicate with backend services.

Q 2− What does HttpClient return when making requests?

A− String

B− Promise

C− JSON

D− Observable

In Angular, the HttpClient returns an Observable, allowing for asynchronous data handling.

Q 3− Which method is provided by HttpClient to make HTTP requests?

A− send()

B− get()

C− fetch()

D− request()

The get() method is one of the methods provided by HttpClient to make HTTP requests in Angular.

![Image](images/http_client.jpg)
![Image](/angular/images/failed-request.jpg)
