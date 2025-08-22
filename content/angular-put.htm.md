+++
title = "Angular - HTTP PUT Request"
date = "2025-08-22"
draft = false
description = "The HTTP standard verb PUT can be used in the HTTP protocol to request the creation or update of a resource (data) on the server. The purpose of the PUT method is to send data to the server to create or update the resource based on the provided data."
image = "/angular/images/http-put.jpg"
imageBig = "/angular/images/http-put.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - HTTP PUT Request

URL: https://www.tutorialspoint.com/angular/angular-put.htm

TheHTTPstandard verbPUTcan be used in the HTTP protocol to request thecreation or updateof a resource (data) on the server. The purpose of the PUT method is to send data to the server to create or update the resource based on the provided data.

The server processes the data and either "creates or updates" the requested resource. Once the data is created or updated, the server returns a response to the client.

In Angular, theHttpClientservice class provides aput()method to send data to the server using the HTTP PUT verb. Let us learn more about this method, including its signature, options, and real-time usage.

The signature (different from syntax) of the HttpClientput()method is as follows −

Here,

Here are the availableoptionsfor theHttpClientmethod −

Observeis used to specify which part of the response has to be observed during the server communication. Based on the observe option, either the full or part of the response will be returned as Observable. The possible values arebody,events, andresponse.

body: Retrieves only the body content of the response from the HTTP request asObservable<R>, whereRis based on theresponseTypeoption and the requested type (e.g.,Expense) of data.

Here,

events: Retrieves the events fired in a response stream along with the corresponding response body asObservable<HttpEvent><R>>, whereRis based on theresponseTypeoption and the requested type (e.g., Expense) of data.

Here,

response: Retrieves the complete response from the HTTP request asObservable<HttpResponse<R>>, whereRis based on theresponseTypeoption (which we will check in the next section) and the requested type (e.g., Expense) of data.

Here,

TheresponseTypeinterprets the response body. It can havefourpossible values as shown below −

Let us understand these four options one by one:

arraybuffer: Interprets the response body as a generic raw binary data buffer and returns Observable. It can be used to streamaudio/videocontent −

blob: Interprets the response body as thebinary formatand returns Observable<blob>. It can be used to download large files −

text: Interprets the response body asplain text formatand returns Observable<String>. It can be used to represent text-based data −

JSON: Interprets the response body inJSON formatand returns Observable<R>, whereRis the requested type (e.g., Expense) of data. It can be further encoded into any type by specifying the type variable (R) in the method as shown below −

Based on theobserveandresponseType,HttpClientwill return Observable with a different type variable. Let us check a few combinations of observation and responseType to better understand the concept:

observe => body and responseType => JSON

Returns the Observable. R represents the type variable.

observe => response and responseType => JSON

Returns the Observable<HttpResponse>. R represents the type variable and encodes the response body.

observe => events and responseType => JSON

Returns the Observable<HttpEvent>. The response body is encoded as ArrayBuffer.

observe => events and responseType => arraybuffer

Returns the Observable<HttpEvent>. Responses body is encoded as ArrayBuffer.

observe => response and responseType => blob

Returns the Observable<HttpEvent>. The response body is encoded as ArrayBuffer.

observe => response and responseType => text

Returns the Observable<HttpResponse>. The response body is encoded as ArrayBuffer.

We can combine observe and responseType to create many more combinations as necessary.

Theheadersare specified as the HTTP headers. It can include a standardHTTPheader as a key/value pair or can encode the data in the HttpHeaders class. A sample header as a key/value pair is as follows:

It specifies that the request content type is JSON. We can also use the HttpHeaders class provided by angular to create HTTP headers. A sample set of header information using HttpHeaders is as follows −

Theparamsrepresent the serialized request parameter inapplication/x-www-form-urlencodedformat. It can include params as a key/value pair or can encode the data in the HttpParams class. A sample parameter as a key/value pair is as follows −

It specifies that the requestparam keyis a name, and itsvalueis "john". We can also use the HttpParams class provided by angular to create parameters. A sample set of parameters using HttpParams is as follows −

Thecontextsends arbitrary values as key/value pairs with type safety and without key conflict. It is used as a source of information for interceptors acting as middle-ware between client and server. Angular provides a special class,HttpContextto encode the context information. A sample context is as follows −

Here,

ThereportProgressspecifies whether to send back the progress of the request (communication) from the server. It can be used to show the progress of large file uploads through web API.

ThewithCredentialsis used to specify whether the request should be sent with outgoing credentials (cookies). It accepts the boolean value.

ThetransferCachespecifies whether the request should be cached. It accepts the boolean value or HttpTransferCacheOptions value.HttpTransferCacheOptionsencode dynamic logic to filter requests to be cached based on a custom filter function and override default cache behavior.

To work out theHTTP client-servercommunication, we need to set up a web application and need to exposes a set of web API. The web API can be requested from the client. Let us create a sample server application, Expense API App, and provideCRUD REST API(mainly PUT requests) for expenses.

Step 1:Go to your favorite workspace as shown below −

Step 2:Create a new folder with the nameexpense-rest-apiand move into the folder −

Step 3:Create a new application usinginitsub command provided bynpmcommand as shown below −

Once you run the above command, it will ask a few questions and answer all of them with default answers.

Step 4:Install express and cors packages to create node based web application −

Step 5:Installexpressandcorspackages to create node-based web applications −

Step 6:Create a new file with the namesqlitedb.js, and place the below code to initialize the database with the expense table and sample expense entries. An expense table will be used to store the expense items −

Step 7:Now, open theindex.js(if not found, create it manually) and place the below code −

Here, the code will create six REST API endpoints below-mentioned REST API endpoints −

Step 8:Run the application using the below command −

Step 9:To test the application open your friendly browser (chrome) and go to http://localhost:8000/. It should return the below message if the application is working fine −

Let's create a working angular application to put a resource into the above server application and then get all expense items from the server including the new resource by using theHttpClientservice class.

Step 1:Create a new angular application by runningng newcommand as shown below −

Enableangular routingandCSSas shown below −

Step 2:Enable http communication in the application by importingHttpClientModulein the component configuration file (app.component.ts) −

Here,

Step 3:Create a newinterface,Expenseto represent our expense item −

Here,

Step 4:Create a newcomponent,ListExpensesto show the expense items from the server −

It will create the component as shown below −

Step 5:Include our new component into the App root component view,app.component.htmlas shown below −

Step 6:Inject the HttpClient into theListExpensescomponent through the constructor as shown below −

Step 7:Implement theOnInitlife cycle hookto request the server for expenses after the initialization of theListExpensescomponent −

Step 8:Create a local variable,expensesto hold our expenses from the server −

Step 9:Create a local variable, anewexpenseto hold the new expense created in the server −

Step 10:Set the new expense item with sample data as shown below −

Here,

Step 11:Call theput()method ofthis.http(HttpClient instance) object by passing the put url & our new expense item and get the updated expense object from the server −

Step 12:Call theget()method ofthis.http(HttpClient instance) object by passing the list expenses URL and options and retrieving the expense object from the server. Then, set the expenses into our local variable, expenses −

Here,

The complete code of theListExpensesComponentis as follows −

Step 14:Next, get the expenses list object and new expense object from the component and
render it in our component template page(list-expenses.component.html)−

Here,

Step 15:Finally, run the application using below command −

Step 16:Open the browser and navigate tohttp://localhost:4200/URL and check the output−

Here, the output shows the our expenses as a list of items.

Angular provides an easy way to send data to the server through theHttpClient object.put()is a specific method used to send data to the server. We will learn more HTTP methods to target other HTTP verbs in the upcoming chapters.

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What is the primary purpose of an HTTP POST request in Angular?

A− To retrieve data from a server

B− To submit data to a server

C− To delete data from a server

D− To update data on a server

The primary purpose of an HTTP POST request is to send data to a server to create or update a resource.

Q 2− In the HttpClient.put() method, what does the body parameter represent?

A− The URL of the server

B− The data to be sent to the server

C− The response from the server

D− The headers of the HTTP request

The body parameter in the HttpClient.put() method is where you define the data that you want to send to the server.

Q 3− Which option of the HttpClient.put() method is used to specify additional settings like headers?

A− body

B− url

C− options

D− responseType

The options parameter allows you to include additional settings like HTTP headers, query parameters, or other configuration options.

Q 4− What type of data is sent in the body of the HttpClient.put() request?

A− Binary data

B− JSON data

C− HTML data

D− Plain text data

When using the HttpClient.put() method, the data sent to the server is in JSON format. This is because JSON is a commonly used JSON format for exchanging data between a client (Angular) and a server.

![Image](/angular/images/http-put.jpg)
