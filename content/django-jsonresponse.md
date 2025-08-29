+++
title = "Django JsonResponse"
date = 2025-08-29T19:53:05.027+01:00
draft = false
description = "Django JsonResponse tutorial shows how to send JSON data with JsonResponse in Django."
image = ""
imageBig = ""
categories = ["django"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Django JsonResponse

last modified January 9, 2023 

Django JsonResponse tutorial shows how to send JSON data with JsonResponse in
Django.

## Django

Django is a high-level Python web framework. It encourages rapid
development and clean, pragmatic design. Django's primary goal is to ease the
creation of complex, database-driven websites.

Django is maintained by the Django Software Foundation.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. The official Internet media type for JSON is application/json. The JSON
filename extension is .json. It is easy for humans to read and
write and for machines to parse and generate. 

## Django JsonResponse

JsonResponse is an HttpResponse subclass that helps to
create a JSON-encoded response. Its default Content-Type header is set to
application/json. The first parameter, data, should be a dict
instance. If the safe parameter is set to False, any
object can be passed for serialization; otherwise only dict instances are
allowed.

## Django JsonResponse example

In the following example, we create a Django application that sends
a file to the client. The file is a JPEG image, which
is located in the images directory in the project
root directory.

$ mkdir jsonresponse
$ cd jsonresponse
$ mkdir src
$ cd src

We create the project and the and src directories.
Then we locate to the src directory.

$ django-admin startproject jsonresponse .

We create a new Django project in the src directory.

**Note:** If the optional destination is provided, Django will use
that existing directory as the project directory. If it is omitted, Django
creates a new directory based on the project name. We use the dot (.)
to create a project inside the current working directory.

$ cd ..
$ pwd
/c/Users/Jano/Documents/pyprogs/django/jsonresponse

We locate to the project directory.

$ tree /f
src
│   manage.py
│
└───jsonresponse
        settings.py
        urls.py
        views.py
        wsgi.py
        __init__.py

These are the contents of the project directory.

**Note:** The Django way is to put functionality into apps, which
are created with django-admin startapp. In this tutorial, we do not
use an app to make the example simpler. We focus on demonstrating how to send
JSON response.

src/jsonresponse/urls.py
  

from django.contrib import admin
from django.urls import path
from .views import send_json

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sendjson/', send_json, name='send_json'),
]

We add a new route page; it calls the send_json 
function from the views.py module.

src/jsonresponse/views.py
  

from django.http import JsonResponse

def send_json(request):

    data = [{'name': 'Peter', 'email': 'peter@example.org'},
            {'name': 'Julia', 'email': 'julia@example.org'}]

    return JsonResponse(data, safe=False)

Inside send_json, we define a list of dictionaries.
Since it is a list, we set safe to False.
If we did not set this parameter, we would get a TypeError
with the following message:

In order to allow non-dict objects to be serialized set the safe parameter to False.

By default, JsonResponse accepts only Python dictionaries.

$ python manage.py runserver

We run the server and navigate to http://127.0.0.1:8000/sendjson/.

$ curl localhost:8000/sendjson/
[{"name": "Peter", "email": "peter@example.org"}, 
{"name": "Julia", "email": "julia@example.org"}]

We use the curl tool to make the GET request.

In this article, we have demonstrated how to send JSON data in Django.