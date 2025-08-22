+++
title = "Angular - HTTP DELETE Request"
date = "2025-08-22"
draft = false
description = "The HTTP standard verb DELETE can be used in the HTTP protocol to request the deletion of a specific resource (data) on the server. The purpose of the DELETE method is to ask the server to remove a particular piece of data."
image = "/images/php.jpg"
imageBig = "/images/php.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - HTTP DELETE Request

URL: https://www.tutorialspoint.com/angular/angular-delete.htm

TheHTTPstandard verbDELETEcan be used in the HTTP protocol to request the deletion of a specific resource (data) on the server. The purpose of the DELETE method is to ask the server to remove a particular piece of data.

In Angular, theHttpClientservice class provides adelete()method to delete data on the server. Let's learn more about this method, including its signature, various options, real-time usage, etc.

Following is the signature (different from syntax) of the HttpClientdelete()method −

Here,

Following is a list of the available options −

Theobservespecifies which part of the response has to be observed during the server communication. Based on the observe option, either the full or part of the response will be returned as Observable. The possible values arebody,events, andresponse.

body: Retrieves only the body content of the response from the HTTP request asObservable<R>, whereRis based on theresponseTypeoption and the requested type (e.g.,Expense) of data.

Here,

events: Retrieves the events fired in a response stream along with the corresponding response body asObservable<HttpEvent><R>>, whereRis based on theresponseTypeoption and the requested type (e.g., Expense) of data.

Here,

response: It is used to retrieve the complete response from the HTTP request asObservable<HttpResponse<R>>, whereRis based on theresponseTypeoption (which we will check in the next section) and the requested type (e.g., Expense) of data. The purpose of the HttpResponse class is to represent the complete HTTP response from the server.

Here,

TheresponseTypeis used to interpret the response body. It can havefourpossible values as shown below −

Let's understand the above options one by one:

arraybuffer: Interprets the response body as a generic raw binary data buffer and returns Observable. It can be used to streamaudio/videocontent.

blob: Interprets the response body as thebinary formatand returns Observable<blob>. It can be used to download large files.

text: Interprets the response body asplain text formatand returns Observable<String>. It can be used to represent text-based data.

JSON: Interprets the response body asJSON formatand returns Observable<R>, where R is the requested type (e.g., Expense) of data. It can be used to represent the result in JSON format.

Based on the observe andresponseType,HttpClientreturns Observable with a different type variable. Let's check a few combinations of observe and responseType to better understand this concept.

Returns the Observable. R represents the type variable.

Returns the Observable<HttpResponse>. R represents the type variable and encodes response body.

Returns the Observable<HttpEvent>. R represents the type variable and encodes the response body.

Returns the Observable<HttpEvent>. The response body is encoded as ArrayBuffer.

Returns the Observable<HttpEvent>. The Response body is encoded as ArrayBuffer.

Returns the Observable<HttpResponse>. The Response body is encoded as ArrayBuffer.

We can combine observe and responseType to create many more combinations as necessary.

Theheadersspecify the HTTP headers. It can include a standard HTTP header as a key/value pair or can encode the data in the HttpHeaders class. A sample header as a key/value pair is as follows:

It specifies that the request content type is JSON. We can also use theHttpHeadersclass provided by angular to create HTTP headers. A sample set of header information using HttpHeaders is as follows −

Theparamsrepresent the serialized request parameter inapplication/x-www-form-urlencodedformat. It can include params as a key/value pair or can encode the data in the HttpParams class. A sample parameter as a key/value pair is as follows:

It specifies that the request param key is thename, and its value isjohn. We can also use theHttpParamsclass provided by angular to create parameters. A sample set of parameters using HttpParams is as follows −

Thecontextsends arbitrary values as key/value pairs with type safety and without key conflict. It is used as a source of information for interceptors acting as middle-ware between client and server. Angular provides a special class,HttpContextto encode the context information. A sample context is as follows:

Here,

ThereportProgressis used to specify whether to send back the progress of the request (communication) from the server. It can be used to show the progress of large file uploads through web API:

ThewithCredentialsis used to specify whether the request should be sent with outgoing credentials (cookies). It accepts the boolean value:

ThetransferCachespecifies whether the request should be cached. It accepts the boolean value or HttpTransferCacheOptions value.HttpTransferCacheOptionsencode dynamic logic to filter requests to be cached based on a custom filter function and override default cache behavior:

To work out theHTTP client-servercommunication, we need to set up a web application and expose a set of web API. The web API can be requested from the client. Let us create a sample server application, Expense API App to provideCRUD REST API(mainlyDELETEmethod) for expenses −

Step 1:Go to your favorite workspace as shown below −

Step 2:Create a new folder,expense-rest-api, and move into the folder −

Step 3:Create a new application using theinitsub-command provided by thenpmcommand as shown below −

Once you run the above command, it will ask a few questions and answer all of them with default answers.

Step 4:Installexpressandcorspackages to create node-based web applications −

Step 5:InstallSQLitepackage to store the expenses in the SQLite-based database −

Step 6:Create a new file with the namesqlitedb.js, and add the below code to initialize the database with expense table and sample expense entries. An expense table will be used to store the expense item −

Step 7:Open theindex.js(if not found, create it manually) and place the below code −

Here, the code will create six below-mentionedREST APIendpoints:

Step 8:Run the application using the below command −

Step 9:To test the application, open your friendly browser (chrome) and go tohttp://localhost:8000/. It should return the below message if the application is working fine −

Let us create an angular application to delete an existing expense on the server using theHttpClientservice class:

Step 1:Create a new angular application by runningng newcommand as shown below −

Enable angular routing andCSSas shown below −

Step 2:Enable HTTP communication in the application by importingHttpClientModulein the component configuration file (app.component.ts) as per the latest version −

Here,

Step 3:Create a new interface,Expenseto represent our expense item −

Here,

Step 4:Create a new component,ListExpensesto show the expense items from the server −

It will create the component as shown below −

Step 5:Include our new component into the App root component view,app.component.htmlas shown below −

Step 6:Inject theHttpClientinto theListExpensescomponent through theconstructoras shown below −

Step 7:Implement theOnInitlife cycle hookto request the server for expenses after the initialization of theListExpensescomponent −

Step 8:Create a local variable,expensesto hold our expenses from the server −

Step 9:Create a local variable,newexpenseto hold the new expense created in the server −

Step 10:Call the get method ofthis.http(HttpClient instance) object by passing the list expensesURL and optionsand getting the expense object from the server. Then, set the expenses into our local variable, expenses −

Here,

Step 11:Add a new delete method and call thedelete()method ofthis.http(HttpClient instance) object by passing the delete URL −

Step 12:Next, get the expenses list object and render it in our component template page(list-expenses.component.html). Also, add an anchor tag for each expense and set the delete method by passing the corresponding expense ID −

Here,

Step 13:The complete code of theListExpensesComponentis as follows −

Step 14:Finally, run the application using the below command −

Step 15:Open the browser and navigate tohttp://localhost:4200/URL and check the output −

Here, the output shows our expenses as a list of items except item 1.

Angular provides an easy way to send data to the server through the HttpClientobject.delete()is a specific method used to send data to the server. We will learn more HTTP methods to target other HTTP verbs in the upcoming chapters.

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What is the main purpose of the HTTP DELETE method in Angular?

A−  To delete a resource on the server

B− To send data to the server to create or update a resource

C− To fetch data from the server

D− To send a request to load a webpage

The DELETE method is used to request the removal of a specific resource on the server.

Q 2− Which option in HttpClient.delete() allows you to specify query parameters in the request?

A−  headers

B− context

C− params

D− responseType

The params option allows you to add query parameters to the request URL.

Q 3− In the HttpClient.delete() method, what does the URL parameter represent?

A−  The data to be sent to the server

B− The server address for the DELETE request

C− The type of data the server returns

D− The headers for the HTTP request

In the HttpClient.delete() method, the URL parameter represents the server address or endpoint to which the DELETE request will be sent in order to delete a specific resource.
