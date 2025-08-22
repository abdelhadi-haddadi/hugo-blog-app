+++
title = "Angular - CRUD Operations Using HTTP"
date = "2025-08-22"
draft = false
description = "CRUD is an acronym (a shortened name) that stands for Create, Read, Update, and Delete. These are the four basic operations performed on data in most databases and web applications such as Employee Management System, LMS, etc. Each operation has its own functionality as follows:"
image = "/angular/images/read-data.jpg"
imageBig = "/angular/images/read-data.jpg"
categories = ["Tutorial"]
authors = ["Cude Admin"]
avatar = "/images/avatar.webp"
+++

# Angular - CRUD Operations Using HTTP

URL: https://www.tutorialspoint.com/angular/angular-curd-operations-using-http.htm

CRUDis an acronym (a shortened name) that stands forCreate,Read,Update, andDelete. These are the four basicoperationsperformed on data in most databases and web applications such as Employee Management System, LMS, etc. Each operation has its own functionality as follows:

Now that we have a basic understanding of CRUD operations. Let's learn about implementing CRUD operations in Angular and how to perform them usingHTTP(HyperText Transfer Protocol).

In Angular, theCRUD(Create, Read, Update, and Delete) operations play an important role in managing data and performing specific tasks. These operations are handled using the AngularHttpClientservice class to interact with HTTPRESTfulAPIs.

These operations allows you as follows:

Let's discuss these angular operations one by one:

In Angular, theCreateoperation involves sending aPOSTrequest toadd (create)a new record to the server. This is done using theHttpClientservice class, which provides an easy way to communicate with aRESTfulAPI's.

Following is the signature (different from syntax) of theCreateoperation (which isPOSTa method) −

Here,

In Angular, theReadoperation involves sending aGETrequest toretrieve (get)an existing record from the server. This is done using theHttpClientservice class, which provides an easy way to communicate withRESTfulAPI's.

Following is the signature (different from syntax) of theReadoperation (which isGETa method) −

Here,

In Angular, theUpdateoperation involves sending aPUT/PATCHrequest tomodify (update)an existing record on the server. This is done using theHttpClient service class, which provides an easy way to communicate withRESTfulAPI's.

Following is the signature (different from syntax) of theUpdateoperation (which isPUT/PATCHa method) −

Here,

In Angular, theDeleteoperation involves sending aDELETErequest toremove (delete)an existing record on the server. This is done using theHttpClient service class, which provides an easy way to communicate withRESTfulAPI's.

Following is the signature (different from syntax) of theDeleteoperation (which isDELETEa method) −

Here,

We will create an Angular application namedEMS(Employee Management System), where we will implement all four CRUD operations to 'create', 'read', 'update', and 'delete' employee data.

Now, let's see the step-by-step guides for setting up a mini Angular project and implementing all four CRUD operations:

Step 1:Open your friendly IDE's terminal (e.g,vs code) ornode.jscommand, and go to your favorite workspace as follows:

Step 2:To manage your Angular application via commands, install the AngularCLIusing the following command:

Step 3:Create a new Angular application using the following command (see more):

Once you run the above command, it will ask you a few questions. You can reply with the default answers as shown below:

Step 4:Navigate to your "application directory" and run the following commands one by one to create the four components:

Step 5:Now, open theapp.component.htmlfile, remove everything, and leave only the following:

Step 6:Finally, run the application using the following command:

As we set up the application, we are ready to implement the CRUD operations in our Angular my-crud-app application. Let's set up the database too.

Step 7:Go to your assets folder (cd src/assets), create a.jsonfile (e.g., db.json), and place the dummy data below:

The above data will be treated as the applicationdatabase(endpoint URL), where we will send all the requests to manipulate data.

Step 8:Now, install theJSON-Serverto access the above database as follows:

Step 9:Run the following command to start the JSON-Server:

Open your browser and navigate tohttp://localhost:3000(default port) to see the JSON-Server data. To see the employee's data, navigate tohttp://localhost:3000/employees.

Step 10:Install the service to communicate over the HTTP protocol for performingCRUDoperations:

Once the above command is executed successfully, you will be able to see a folder namedservicescontaining two files:auth.service.tsandauth.service.spec.ts. We will implement all the CRUD operations in our "auth.service.ts" file.

To work with the HTTP protocol, make sure theHttpClientModuleis added and imported into the root component as follows:

Note:Make sure theHttpClientModuleis also added in providers within theapp.config.tsfile as follows:

Step 11:Open yourauth.service.tsfile and place the below code:

The above service class code will implement all four operations to "read", "update", "delete", and "create" employee data.

We need to set uproutingthat defines the paths for each component so that when the links or buttons are clicked, we can navigate through the different components.

Step 12:Open theapp.routes.tsfile, and place the below code to navigate to the respective component:

To retrieve (read) all the employee data from the JSON-server, we will use theHTTP GEToperation.

Step 13:Open the respective files of the dashboard component in your angular application i.edashboard.component.html,dashboard.component.ts, anddashboard.component.cssfiles, and place the respective code below:

The dashboard (landing) page will look like this:

To create (add) a new employee record in our JSON-server (i.e., database), we will use theHTTP POSToperation.

Step 14:Now opencreate.component.html,create.component.ts, andcreate.component.cssfiles and place the code below:

The employee create page will look like:

Once the new employee is created, the dashboard will look like this:

To update the employee record (data), we will use theHTTP PUToperation.

Step 15:Open theupdate.component.html,update.component.ts, andupdate.component.cssfiles and place the respective code below:

The employee update page looks like:

To delete an employee, we will use theHTTP DELETEoperation.

Step 16:Simply add the function below to yourdashboard.component.tsfile:

After deleting an employee, the dashboard will look like this:

Here we have mentioned a few MCQs to test your knowledge on the current concept:

Q 1− What does the CRUD stand for?

A−  To delete a resource on the server

B− To send data to the server to create or update a resource

C− To fetch data from the server

D− To send a request to load a webpage

The DELETE method is used to request the removal of a specific resource on the server.

Q 2− Which HTTP method is used to update an existing record in Angular?

A−  GET

B− POST

C− PUT

D− DELETE

The PUT HTTP method is used to update an existing record on the server in Angular.

Q 3− In Angular, which HTTP method is used to send data to the server for the creation of a new record?

A−  POST

B− GET

C− PUT

D− DELETE

The POST method is used to send data to the server to create a new record in Angular.

Q 4− Which of the following is the correct signature of the put() method in Angular's HttpClient?

A−  put(url: string, body: any, options?: Object): Observable<any>

B− put(url: string, body: any): Observable<any>

C− put(url: string, body: any): Observable<void>

D− put(url: string): Observable<any>

The signature of the put() method is put(url: string, body: any, options?: Object): Observable<any>, where URL is the destination URL, body is the data being updated, and options are the optional configurations.

![Image](/angular/images/read-data.jpg)
![Image](/angular/images/create-employee.jpg)
![Image](/angular/images/new-dashboard.jpg)
![Image](/angular/images/update-employee.jpg)
![Image](/angular/images/delete-employee.jpg)
