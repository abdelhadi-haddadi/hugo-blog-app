+++
title = "Angular - Request"
date = "2025-08-22"
draft = false
description = "In HTTP protocol,the requestis a process of starting communication with the server by the client application or browser. In Angular, a request refers to making HTTP calls to a server to fetch, send, or manipulate data. These requests are handled by the Angular HttpClient module."
image = "/angular/images/http-request.jpg"
imageBig = "/angular/images/http-request.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Request

URL: https://www.tutorialspoint.com/angular/angular-request.htm

InHTTPprotocol,the requestis a process of startingcommunicationwith the server by the client application or browser. In Angular, arequestrefers to making HTTP calls to a server to fetch, send, or manipulate data. These requests are handled by the AngularHttpClientmodule.

The following diagram will give you a clear understanding of the HTTP Request:

Let's see how to send a request (HTTP calls) to the server in the Angular framework, there are various options available in the request phase in this chapter. We will discuss them one by one.

To workout the HTTPclient-servercommunication, we need to set up a web application and expose a set of webAPI. The web API can be requested from the client (i.e., web application or a browser). Let us create a sample server application,Expense API Appto provide CRUD REST API for expenses.

Step 1:Go to your favorite workspace as shown below −

Step 2:Create a new folder,expense-rest-api, and move into this folder −

Step 3:Create a new application using theinitsubcommand provided by thenpmcommand, as shown below −

Once you hit the above command,  it will ask a few questions and answer all of them with default answers.

Step 4:Installexpressandcorspackages to create node-based web applications −

Step 5:InstallSQLitepackage to store the expenses in the SQLite-based database −

Step 6:Create a new file with the namesqlitedb.js, and place the below code to initialize the database with the expense table and sample expense entries. An expense table will be used to store the expense items −

Step 7:Open theindex.jsfile and update the below code −

Here, the code will create sixREST API endpointsas mentioned below:

/ endpoint returns anOKmessage to make sure the application is working fine.

/api/expense endpoint returns all expense items available in the database.

/api/jsonp/expense endpoint returns all expense items available in the database inJSONPformat.

/api/expense/:id endpoint returns the expense entry based on the expense entryid.

/api/expense/:id endpoint with put verb will update the expense entry based on the expense entryid.

/api/expense endpoint with post verb will add a new expense entry into the database.

/api/expense/:id/update_amount endpoint with post verb will update the amount of the expense entry specified in theURL.

/api/expense/:id endpoint with delete verb will delete the expense entry based on theexpense entry id.

Step 8:Run the application using the following command −

Step 9:To test the application open a browser enterhttp://localhost:8000/, and hit enter. It should return the below message if the application is working fine &minu;

Before makingHTTPrequests, we need to properly set up theHttpClientservice in our Angular application. Angular provides theHttpClientModulefor handling HTTP communication, which includes the HttpClient service. To use HttpClient, import HttpClientModule in the root module or any specific module where it is required.

Step 1:Import theHttpClientModulein your root module (if the application is not standalone) or in the imports array of the root component as follows −

Importing the HttpClientModule will include the HttpClient service in Angular's dependency injection setup, allowing it to be injected into any Angular component when necessary, as shown below:

TheHttpClientprovides several methods to start an HTTP request. All methods return an observable with an optional type variable (Observable<T>).

The observable need to besubscribedto to start the request. Once the observable is subscribed, it starts the request, passes it through a series of registered interceptors, and finally reaches the server. The response is then received from the server and published to the subscribed function.

The workflow of the request is as follows −

Once a user subscribes to the Observable, it passes the request to the registered interceptors in the order in which the interceptors are registered.

Once the request passes all registered interceptors, Observable will send the request to the server.

Observable waits for the server response, and once receives the response from the server, it returns the response to the subscribed function.

The subscribed function will do the necessary business logic and set the output to the components variable.

The component will render its template using the output of the HttpClient.

A sample request is as follows −

Here,

Thethis.httpis the HttpClient instance

Therequest()is the method use to create observable, when subscribed, starts the request.

Thesubscribe()is the method use to subscribe to the returned observable and to subsequently start the request and fetch the response.

Finally, the argument to the subscribe method is the callback function used to get the actual responses body content.

Arguments supported by HttpClients methods are as follows −

All method accept url / endpoint as one of the argument. It represents the resource to be fetched from the server. In our sample application, the url starts with http://localhost:8000/ and one of the possible option is http://localhost:8000/api/expenses. This endpoint will fetch all expenses from the server and send it back to the client in json format.

All methods accept URL / endpoint as one of the arguments. It represents the resource to be fetched from the server. In our sample application, the URL starts withhttp://localhost:8000/, and one of the possible options ishttp://localhost:8000/api/expenses. This endpoint will fetch all expenses from the server and send it back to the client in JSON format −

Form data. MIME-type is application/x-www-form-URL-encoded

Form data with uploads. MIME type is multipart/form-data

Plain text. MIME-type is text/plain

JSON. MIME-type is application/json

Formdata can be created using theHttpParamsclass provided by Angular. HttpParams accepts data in query string format (key/value as key=value and each key/value separated by &). It has methods to add one or more parameters as a sequence by chaining methods together. All methods create a copy of the instance add/remove the parameter (key/value pair) in the copied instance, and return it.

The signature of theHttpParamsconstructor is as follows −

Where,

The HttpParamsOptionsobject can be created using the below properties:

The sample code to create a HttpParams object using a constructor is as follows −

The methods supported byHttpParamsare as follows −

set():Accepts a parameter and value. Add a new parameter with the given value.

delete():Accepts a parameter. Delete the given parameter.

has():Accepts a parameter. Returns true/false based on the availability of the given parameter.

keys():Accepts nothing. Returns all parameters.

get():Accepts a parameter. Returns the first value of the given parameter.

getAll():Accepts a parameter. Returns all values of the given parameter.

append():Accepts a parameter. Append the value to the given parameter.

appendAll():Accepts an object with multiple parameters. Append the value to all parameters.

toString():Accepts nothing. Returns the object in query string format.

The sample code to create aHttpParamsobject is as follows −

Irrespective of the method,optionsare one common argument accepted by all methods and used to represent the request options. Option is a JavaScript object (or hash) with a standard set of request data. Options can have the below entries and represent different aspects of the request and response:

Let us learn one by one in the upcoming chapters:

Theobserveoption is used to specify which part of the response has to be observed during the server communication and send back the data to the subscribed function.

Based on the observe option, either the full or part of the response will be returned. The possible values are events, body, and response.

Theeventsare used to return the events fired in the response stream from the server. It will return the response asObservable<HttpEvent<R>>type. Here, R is the type of the actual data (response body) to be returned.

Here,

Theresponseoption is used to return the complete response from the server. It will return the response asObservable<HttpResponse<R>>type. Here, R is the type of the actual data (responses body) to be returned.

Here,

The body is used to return only the body content of the response from the server. It will return the response asObservable<HttpResponse<R>>type, Here, R is a type of the actual data (responses body) to be returned.

Here,

TheresponseTypeis used to interpret the response's body. It can have four possible values as shown below −

Let us understand the values and their usage one by one:

Thearraybufferinterprets the response's body as a generic raw binary data buffer and returns Observable. It can be used to stream audio/video content.

Theblobinterprets the response's body as the binary format and returns Observable. It can be used to download large files.

Thetextinterprets the response's body as plain text format and returns Observable. It can be used to represent text-based data.

TheJSONinterprets the response's body in JSON format and returns Observable, where R is the requested type (Expense) of data. It can be used to represent the result in JSON format. It can be further encoded into any type by specifying the type variable (R) in the method as shown below −

Based on the observe and responseType, Httpclient will return Observable with a different type variable. Let us check a few combinations of observe and responseType to better understand the concept.

observe => body and responseType => JSON

Returns the Observable R represents the type variable.

observe => response and responseType => JSON

Returns the Observable<HttpResponse>. R represents the type variable and encodes the response body.

observe => events and responseType => JSON

Returns the Observable<HttpEvent>. R represents the type variable and encodes the response body.

observe => events and responseType => arraybuffer

Returns the Observable<HttpEvent>. The Response body is encoded as ArrayBuffer.

observe => response and responseType => blob

Returns the Observable<HttpEvent>. The Response body is encoded as ArrayBuffer.

observe => response and responseType => text

Returns the Observable<HttpResponse>. The Response body is encoded as ArrayBuffer.

We can combineobserveandresponseTypeto create many more combinations as we need.

Theheadersspecify the HTTP headers. It can include a standard HTTP header as a key/value pair or can encode the data using the HttpHeaders class. A sample header as a key/value pair is as follows:

It specifies that the request content type is JSON.

Angular provides a special class,HttpHeadersto compose header details. It accepts header information as an anonymous object and initializes it.

It has methods (set(), append(), and delete()) to add/remove one or more headers in a sequence by chaining methods together.

All methods create a copy of the instance add/remove the header information in the copied instance, and return it.

Here,

The methods supported byHttpHeadersare as follows −

Theparamsallow the query string to be set using theHttpParamsclass. Please check the Request body section for more aboutthe "HttpParams"class.

The sample code to create aHttpParamsobject and set it in the request is as follows −

TheContextis used to send arbitrary values as key/value pairs with type safety and without key conflict. It is used as a source of information for interceptors acting as middleware between client and server. Angular provides a special class,HttpContextto encode the context information. A sample context is as follows −

Here,

We can get the context value using theget()method by passing the token as shown below −

ThereportProgressspecifies whether to get the progress of the request (communication) from the server. It can be used to show the progress of large file uploads throughweb API.

ThewithCredentialspecifies whether the request should be sent with outgoing credentials (cookies). It accepts a boolean value.

ThetransferCachespecifies whether the request should be cached. It accepts the boolean value orHttpTransferCacheOptionsvalue. HttpTransferCacheOptions is used to encode dynamic logic to filter requests to be cached based on a custom filter function and override default cache behavior.

Methods provided by theHttpClientclass for client-server communication are as follows −

Let us learn genericrequest()method in this chapter and other method in subsequent chapters.

Therequest()is the generic method that sends a request to the server with every possible HTTP verb like get, post, patch, etc. It has many overloads. Let us check two main overload functions, one using the Generic option and another one using the HttpRequest object.

Angular provides a class,HttpRequestto represent the complete HTTP request. It has the built-in option to include URL, HTTP method/verb, response type, headers, params, etc.

Here,

The above sample request object can be used as below to send the request to the server:

Here,

It acceptsfourarguments as shown below in the given order:

A sample request is as follows −

Let us create a working angular example to get all expense items from the server by using theHttpClientservice class and theHttpRequestoption.

Step 1:Create a new angular application by running ng new command as shown below:

Enable angular routing and CSS as shown below −

Step 2:Enable HTTP communication in the application by importing HttpClientModule in the root component (app.component.ts) within the imports array:

Here,

Step 3:Create a new interface,Expenseto represent our expense item:

Step 4:Create a new component,ListExpensesto show the expense items from the server:

It will create the component as shown below −

Step 5:Include our new component into the App root components view, app.component.html as shown below:

Step 6:Inject theHttpClientinto theListExpensescomponent through the constructor as shown below:

Step 7:Implement the OnInit life cycle hook to request the server for expenses after the initialization of the ListExpenses component:

Step 8:Create a local variable,expensesto hold our expenses from the server:

Step 9:Create aHttpRequestobject and set the URL of the expenses endpoint:

Here,

Step 10:Call therequestmethod of this.HTTP (HttpClientinstance) object by passing theHttpRequestobject and getting the expense object from the server. Then, set the expenses into our local variable,expenses.

Here,

Step 11:The complete code of theListExpensesComponentis as follows −

Step 12:Next, get the expenses object from the component and render it in our component template page (list-expenses.component.html)

Step 13:Finally, run the application using below command:

Step 14:Open the browser and navigate tohttp://localhost:4200/URL and check the output:

Here, the output shows our expenses as a list of items.

Step 15:Let us modify the above sample application by changing theHttpRequestoption to a generic option.

Step 16:Change thengOnInitmethod as shown below:

Here,

Step 17:Run the application and confirm the output. The output is the same as the above sample:

AnAngularprovides an easy way to request a HTTP calls to the server through theHttpClient serviceandHttpRequestobjects.request()method is a generic method to support all HTTP verbs like GET, POST, PUT, DELETE, etc. We will learn more methods to target particular HTTP verbs in the upcoming chapters.

![Image](/angular/images/http-request.jpg)
![Image](/angular/images/template-page.jpg)
![Image](/angular/images/template-page.jpg)
