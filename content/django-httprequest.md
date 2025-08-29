+++
title = "Django HttpRequest"
date = 2025-08-29T19:53:03.911+01:00
draft = false
description = "Django HttpRequest tutorial shows how to use HttpRequest object in Django."
image = ""
imageBig = ""
categories = ["django"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Django HttpRequest

last modified January 9, 2023 

Django HttpRequest tutorial shows how to work with HttpRequest object in Django.

## Django

Django is a high-level Python web framework. It encourages rapid development
and clean, pragmatic design. Django's primary goal is to ease the creation of complex,
database-driven websites.

Django is maintained by the Django Software Foundation.

## Django HttpRequest

Django uses request and response objects to pass state through the system.
When a page is requested, Django creates an HttpRequest object that contains
metadata about the request. These include request method, user agent, address, or 
cookies.

Later Django loads the appropriate view, passing the HttpRequest as
the first argument to the view function. Each view is must return an
HttpResponse object.

## Django HttpRequest example

In the following example, we create a Django application that examines the 
data send in an HttpRequest object.

$ mkdir httprequest
$ cd httprequest
$ mkdir src
$ cd src

We create the project and the and src directories.
Then we locate to the src directory.

$ django-admin startproject httprequest .

We create a new Django project in the src directory.

$ cd ..
$ pwd
/c/Users/Jano/Documents/pyprogs/django/httprequest

We locate to the project directory.

$ tree /f
src
│   db.sqlite3
│   manage.py
│
└───httprequest
        settings.py
        urls.py
        views.py
        wsgi.py
        __init__.py

These are the contents of the project directory.

**Note:** The Django way is to put functionality into 
apps, which are created with django-admin startapp. 
In this tutorial, we do not use an app to make the example simpler.
We focus on demonstrating how to examine the HttpRequest.

src/httprequest/urls.py
  

from django.contrib import admin
from django.urls import path
from .views import data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data/', data, name='data'),
]

We add a new data/ path; it calls the data 
function from the views.py module.

src/httprequest/views.py
  

from django.http import HttpResponse

def data(request):

    path = request.path
    scheme = request.scheme
    method = request.method
    address = request.META['REMOTE_ADDR']
    user_agent = request.META['HTTP_USER_AGENT']

    msg = f'''
&lt;html&gt;
Path: {path}&lt;br&gt;
Scheme: {scheme}&lt;br&gt;
Method: {method}&lt;br&gt;
Address: {address}&lt;br&gt;
User agent: {user_agent}&lt;br&gt;
&lt;/html&gt;
'''

    return HttpResponse(msg, content_type='text/html', charset='utf-8')

Inside data, we get the request's path, scheme, method, 
address, and user agent. We return it in an HttpResponse.

**Note:** For this simple example, we have manually built 
the HTML string. HTML response is normally created with a template system;
Django uses Jinja.

$ python manage.py runserver

We run the server and navigate to http://127.0.0.1:8000/data/.

In this article, we have demonstrated how to send work with
HttpRequest object in Django.