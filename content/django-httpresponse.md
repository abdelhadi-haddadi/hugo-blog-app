+++
title = "Django HttpResponse"
date = 2025-08-29T19:53:05.044+01:00
draft = false
description = "Django HttpResponse tutorial shows how to send string data with HttpResponse in Django."
image = ""
imageBig = ""
categories = ["django"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Django HttpResponse

last modified January 9, 2023 

Django HttpResponse tutorial shows how to send string data with HttpResponse
in Django.

## Django

Django is a high-level Python web framework. It encourages rapid development
and clean, pragmatic design. Django's primary goal is to ease the creation of complex,
database-driven websites.

Django is maintained by the Django Software Foundation.

## Django HttpResponse

HttpResponse is a response class with string data. While 
HttpRequest is created by Django, HttpResponse
is created by programmer.

HttpResponse has subclasses including JsonResponse, 
StreamingHttpResponse, and FileResponse.

## Django HttpResponse example

In the following example, we create a Django application that sends
text data to the client. We send today's datetime.

$ mkdir httpresponse
$ cd httpresponse
$ mkdir src
$ cd src

We create the project and the and src directories.
Then we locate to the src directory.

$ django-admin startproject httpresponse .

We create a new Django project in the src directory.

**Note:** If the optional destination is provided, Django will use
that existing directory as the project directory. If it is omitted, Django
creates a new directory based on the project name. We use the dot (.)
to create a project inside the current working directory.

$ cd ..
$ pwd
/c/Users/Jano/Documents/pyprogs/django/httpresponse

We locate to the project directory.

$ tree /f
src
│   db.sqlite3
│   manage.py
│
└───httpresponse
        settings.py
        urls.py
        views.py
        wsgi.py
        __init__.py

These are the contents of the project directory.

**Note:** The Django way is to put functionality into apps, which
are created with django-admin startapp. In this tutorial, we do not
use an app to make the example simpler. We focus on demonstrating how to send
HttpResponse.

src/httpresponse/urls.py
  

from django.contrib import admin
from django.urls import path
from .views import now

urlpatterns = [
    path('admin/', admin.site.urls),
    path('now/', now, name='now'),
]

We add a new path now/; it calls the now 
function from the views.py module.

src/httpresponse/views.py
  

from django.http import HttpResponse
import datetime

def now(request):

    now = datetime.datetime.now() 

    msg = f'Today is {now}'

    return HttpResponse(msg, content_type='text/plain')

Inside now, we determine the current datetime.
We build a message and send it to the client in HttpResponse. 
The content type is set to plain text.

$ python manage.py runserver

We run the server and navigate to http://127.0.0.1:8000/now/.

$ curl localhost:8000/now/
Today is 2019-04-17 13:39:46.216899

We use the curl tool to make the GET request.

In this articles, we have demonstrated how to send text data in Django
with HttpResponse.