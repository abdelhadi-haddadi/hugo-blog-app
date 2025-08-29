+++
title = "Django email"
date = 2025-08-29T19:53:03.916+01:00
draft = false
description = "Django send email tutorial shows how to send emails in Django. In the tutorial we use the Mailtrap service."
image = ""
imageBig = ""
categories = ["django"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Django email

last modified January 9, 2023 

Django send email tutorial shows how to send emails in Django. In this tutorial,
we use the Mailtrap service.

## Django

Django is a high-level Python web framework. It encourages rapid
development and clean, pragmatic design. Django's primary goal is to ease the
creation of complex, database-driven websites.

Django is maintained by the Django Software Foundation.

## Django send email example

In the following example, we create a Django application that sends an email to
Mailtrap account. We need to register an account if we do not have one. The
registration process is very easy and fast. There is a free tier for sending 500
emails per month.

$ mkdir sendmail
$ cd sendmail
$ mkdir src

We create a project directory and create a src subdirectory.

$ cd src
$ django-admin start-project sendmail .

We create a new Django project.

$ mkdir sendmail/templates

We create the templates directory where we place our template files.

$ tree /f
src
│   manage.py
│
└───sendmail
    │   settings.py
    │   urls.py
    │   views.py
    │   wsgi.py
    │   __init__.py
    │
    └───templates
            home.html

This are the contents of the project directory.

**Note:** The Django way is to put functionality into apps, which
are created with django-admin startapp. In this tutorial, we do not
use an app to make the example simpler. We focus on demonstrating how to send an
email.

src/sendmail/settings.py
  

TEMPLATES = [
{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'sendmail/templates')],
...
]

...

# Email settings
EMAIL_HOST = 'smtp.mailtrap.io'
EMAIL_HOST_USER = 'username'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT = '2525'

Inside the setting.py file, we configure the templates directory.
At the end of the file, we provide the email configuration settings. These can
be found in SMTP Settings and Integration dropdown on Mailtrap.

src/sendmail/urls.py
  

from django.contrib import admin
from django.urls import path
from .views import home, sendmail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('sendmail', sendmail, name='sendmail'),
]

We define the routes. One route shows the home page and the other one calls our
custom sendmail function.

src/sendmail/views.py
  

from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail

def home(request):

    return render(request, 'home.html')

def sendmail(request):

    send_mail(
        'Subject',
        'Email message',
        'from@example.com',
        ['to@example.com'],
        fail_silently=False,
    )

    return HttpResponse('Mail successfully sent')

We create the views.py file in the src/sendmail.
There are two views functions.

def home(request):

    return render(request, 'home.html')

The home function renders the home page, which
contains an anchor to launch sending email.

def sendmail(request):

    send_mail(
        'Subject',
        'Email message',
        'from@example.com',
        ['to@example.com'],
        fail_silently=False,
    )

    return HttpResponse('Mail successfully sent')

The Django's send_mail function sends the email.

src/sendmail/templates/home.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;a href="{% url 'sendmail' %}"&gt;Send test mail&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;

The home page contains the anchor, which sends a request to send the email.

$ python manage.py runserver

We run the server and navigate to http://127.0.0.1:8000/.
Now we click on the link.

In this article, we have demonstrated how to send an email with Django web
framework.