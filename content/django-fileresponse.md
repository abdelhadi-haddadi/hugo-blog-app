+++
title = "Django FileResponse"
date = 2025-08-29T19:53:03.913+01:00
draft = false
description = "Django FileResponse tutorial shows how to send a file with FileResponse in Django."
image = ""
imageBig = ""
categories = ["django"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Django FileResponse

last modified January 9, 2023 

Django FileResponse tutorial shows how to send a file with FileResponse in Django.

## Django

Django is a high-level Python web framework. It encourages rapid development
and clean, pragmatic design. Django's primary goal is to ease the creation of complex, 
database-driven websites. 

Django is maintained by the Django Software Foundation.

## Django FileResponse

FileResponse is a subclass of StreamingHttpResponse optimized 
for binary files. The file is automatically close.

from django.http import FileResponse

response = FileResponse(open('myfile.png', 'rb'))

FileResponse accepts any file-like object with binary content.

## Django FileResponse example

In the following example, we create a Django application that sends
a file to the client. The file is a JPEG image, which 
is located in the images directory in the project 
root directory.

$ mkdir fileresponse 
$ cd fileresponse
$ mkdir src images
$ cd src

We create the project and the images and src subdirectories.
Then we locate to the src directory.

$ django-admin startproject fileresponse .

We create a new Django project in the src directory.

**Note:** If the optional destination is provided, Django will use
that existing directory as the project directory. If it is omitted, Django 
creates a new directory based on the project name. We use the dot (.) 
to create a project inside the current working directory.

$ django-admin startapp sendfile

We create a new app. The sendfile application contains the functionality
to send the image to the client.

$ cd ..
$ pwd
/c/Users/Jano/Documents/pyprogs/django/fileresponse

We show the current working diretory.  

$ tree /f
src
│   db.sqlite3
│   manage.py
│
├───fileresponse
│       settings.py
│       urls.py
│       wsgi.py
│       __init__.py
│
├───images
│       bojnice.jpg
│
└───sendfile
    │   admin.py
    │   apps.py
    │   models.py
    │   tests.py
    │   views.py
    │   __init__.py
    │
    └───migrations
            __init__.py

These are the contents of the project directory.

src/fileresponse/settings.py
  

...
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'sendfile',
] 
...

Inside the setting.py file, we add the sendfile 
component to installed apps.

src/fileresponse/urls.py
  

from django.contrib import admin
from django.urls import path
from sendfile.views import send_file

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_file, name='send_file'),
]

We add a new route for the root page; it calls the 
send_file function from the sendfile 
component.

src/sendfile/views.py
  

from django.http import FileResponse

def send_file(response):

    img = open('images/bojnice.jpg', 'rb')

    response = FileResponse(img)

    return response

Inside send_file, we read the image and return it 
to the client in FileResponse object.

$ python manage.py runserver

We run the server and navigate to http://127.0.0.1:8000/.
We should see the image in the browser.

In this article, we have demonstrated how to send a file with Django.