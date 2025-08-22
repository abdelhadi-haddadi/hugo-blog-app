+++
title = "Angular - Response"
date = "2025-08-22"
draft = false
description = "In the HTTP protocol, the response is the process by which the server returns data to the client (application or browser) after receiving a request."
image = "/angular/images/http-request-response.jpg"
imageBig = "/angular/images/http-request-response.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - Response

URL: https://www.tutorialspoint.com/angular/angular-response.htm

In theHTTPprotocol, the response is the process by which the server returns data to the client (application or browser) after receiving a request.

In Angular, aresponserefers to the data received from the server following an HTTP call made by the client to fetch, send, or manipulate data. These responses are handled by the AngularHttpClientmodule.

The following diagram will give you a clear understanding of the HTTPRequestandResponsecalls −

Now, let's discuss the various events of theHttpEventclass that allow you to handle different phases of an HTTP request/response in Angular:

TheHttpEventclass is a key part of the AngularHttpClientmodule, which provides a way to monitor the progress of HTTP requests.

HttpClientwill send the request to the server and capture the response from the server. Then, based on the request configuration, it will enclose the response in an object with the below possible types:

Actually, theHttpEventis the union of all possible event classes in the response stream, as shown below −

Let us learn the response types provided by Angular one by one −

TheHttpSentEventis used to specify that the request is sent to the server, and it will be useful when the request is retried multiple times.

Syntax for theHttpSentEvent−

TheHttpUserEventis used to identify that the response event isuser-defined. It will be useful to group all custom events into one category. It will ensure that the event is properly handled and forwarded by all interceptors.

Syntax for theHttpUserEvent−

TheHttpProgressEventis used to identify whether the request is download-based or upload-based. Also, it will enclose the currently loaded bytes during download/upload functionality.

Syntax for theHttpProgressEvent−

Here,

TheHttpResponseBaseis the base class for bothHttpHeaderResponseandHttpResponse. It has basic information about the response.

Syntax for theHttpResponseBase−

Here,

TheHttpHeaderResponseinherits fromHttpResponseBaseand includes an option to clone the response. The purpose of this class is to enclose the response with header and status information, skipping the actual body of the response.

Here,

TheHttpResponseinherits fromHttpResponseBaseclass and includes response body and option to clone the response. The purpose of the class is to enclose the response with body, header and status information.

The responsed body can be fetched by using body property as shown below −

Here,

Cloning the response can be done similarly toHttpHeaderResponse class as shown below −

Here,

Let's create a "sample web application" to upload a file to the server. We will develop anAPIfor file uploads and then call this API from the Angular front-end application. Throughout this process, we will learn and handle different types of responses.

First, let's create a newexpress appto upload a file to the server by executing the following steps:

Step 1:Go to your favorite workspace as shown below −

Step 2:Create a new folder with the name expense-rest-api and move into the folder −

Step 3:Create a new application using theinitsubcommand provided by the npm command as shown below −

Once you hit the above command, it will ask a few questions and answer all of them with default answers.

Step 4:Install express and cors packages to create node-based web applications −

Here,

Step 5:Openindex.jsand place the below code (if not found create it manually within the root folder) −

Here,

Configured a simple express app by enabling cors, multi, and body-parser middleware.

Created a new API/api/uploadto accept a file and store it in the uploads folder on the server.

Configured the upload folder as uploads.

The API will accept a file input with the name photo.

Step 6:Create a directory for storing uploads −

Step 7:Now, run the application by executing the below command −

Step 8:To test the application, you can use thePostman,Curl, or any otherHTTPclient toolkit. Here is how you can do it −

Let us create a working angular example to get all expense item from server by usingHttpClientservice class and usingHttpRequestoption.

Step 1:Create a new angular application by runningng newcommand as shown below −

Enable angular routing and CSS as shown below −

Step 2:Enable HTTP communication in the application by importingHttpClientModulein the imports array in the module configuration file(app.component.ts)as per the latest version (standalone components) −

Here,

Imported the HttpClientModule from@angular/common/httpmodule.

Added the HttpClientModule into imports array of the@Componentconfiguration.

Step 3:Create new component,Uploadto show the expense items from the server −

It will create the component as shown below −

Step 4:Include our new component into the app root component view,app.component.htmlas shown below −

Step 5:Inject theHttpClientinto theUploadcomponent through the constructor and import necessary classes fromtherxjsand angular modules as shown below −

Step 6:Create a variable for the file to be uploaded and another variable for upload message −

Step 7:Create a function to get the file uploaded by the user from the form (to be created) and store it inthe filevariable −

Here,

Step 8:Create a function,getEventMessage()to print the uploaded event information −

Here,

Step 9:Create a function,upload()to upload the user-selected files to the server −

Here,

Step 10:The complete source code of the upload component (upload.component.ts) is as follows −

Step 11:Create an upload form in the component template (upload.component.html) and set theupload()method for upload buttonclickevent −

Step 12:Finally, run the application using the below command −

Step 13:Here, the output shows the form. Select a large file of around 30 MB and try to upload it as shown below −

Here, the output shows the form. Select a large file around 30 MB and try to upload it as shown below −

After uploading, inspect the application page and see in the console −

If the image fails to upload correctly, the following message will appear −

Note:The output shows all the events returned by the server in the browser and its console.

Angular provides different classes and types to properly enclose the response data from the server. All classes are simple to learn, understand, and manipulate the response before showing it on the website/app.

![Image](/angular/images/http-request-response.jpg)
![Image](/angular/images/uploads.jpg)
![Image](/angular/images/file-upload.jpg)
![Image](/angular/images/upload-file-example.jpg)
![Image](/angular/images/picture-cant-displayed.jpg)
