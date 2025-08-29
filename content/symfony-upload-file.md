+++
title = "Symfony upload file"
date = 2025-08-29T20:12:47.955+01:00
draft = false
description = "Symfony upload file tutorial shows how to upload a file in a Symfony application."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony upload file

last modified July 5, 2020 

Symfony upload file tutorial shows how to upload a file in
a Symfony application. In the example, we use a normal form to send
the file; we don't use a form builder.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework
for web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by
the Spring Framework and by Ruby on Rails.

## Uploading file

In order to upload a file, the form must have the enctype
set to multipart/form-data and the type of the input set
to file.

Also, in the PHP's php.ini, the file uploads are controlled
with the file_uploads option.

## Symfony file upload example

In the example, we have a simple form with one input field: file to upload.
After the form is submitted, we validate the CSRF token and load the image,
retrieve its name, and store the file inside the var directory.

$ symfony new symupl
$ cd symupl

We create a new Symfony project and go to the project directory.

$ php bin/console --version
Symfony 5.0.8 (env: dev, debug: true)

We use Symfony 5.0.8.

$ composer require annot twig

We install the following pakcage: annotations and twig.
These are needed for creating routes and templates.

$ composer require symfony/security-csrf monolog

The symfony/security-csrf package is needed against cross-site request
forgeries and monolog for logging.

$ composer require maker profiler --dev

For development stage, we also install the maker and the profiler.

### Building Symfony application

We define the directory where the images will be uploaded.

config/services.yaml
  

parameters:
    upload_dir: '../var/uploads'

services:
    # default configuration for services in *this* file
    _defaults:
        autowire: true      # Automatically injects dependencies in your services.
        autoconfigure: true # Automatically registers your services as commands, ...

        bind:
            $uploadDir: '%upload_dir%'
...

We define a parameter which contains the name of the directory where
the images should be uploaded. The upload_dir parameter
is binded to the $uploadDir variable, which can be injected.

$ php bin/console make:controller HomeController

We create a HomeController. The controller sends a form
to the client.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this-&gt;render('home/index.html.twig');
    }
}

This is a simple controller that sends a view containing the web form
to the user.

templates/home/index.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Upload file{% endblock %}

{% block body %}

  &lt;form action="{{ path('do-upload') }}" method="post" enctype="multipart/form-data"&gt;

        &lt;input type="hidden" name="token" value="{{ csrf_token('upload') }}" /&gt;

        &lt;div&gt;
            &lt;label for="myfile"&gt;File to upload:&lt;/label&gt;
            &lt;input type="file" name="myfile" id="myfile"&gt;
        &lt;/div&gt;

        &lt;button type="submit"&gt;Send&lt;/button&gt;

  &lt;/form&gt;

{% endblock %}

This view creates a form. It defines the multipart/form-data enctype and
the file input. In addition, it has a CSRF hidden input token.

$ php bin/console make:controller UploadController

We create a UploadController that responds to the form submission.
We don't need the generated twig template for this controller; therefore, we delete
it.

src/Controller/UploadController.php
  

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\FileUploader;
use Psr\Log\LoggerInterface;

class UploadController extends AbstractController
{
    /**
     * @Route("/doUpload", name="do-upload")
     * @param Request $request
     * @param string $uploadDir
     * @param FileUploader $uploader
     * @param LoggerInterface $logger
     * @return Response
     */
    public function index(Request $request, string $uploadDir,
                          FileUploader $uploader, LoggerInterface $logger): Response
    {
        $token = $request-&gt;get("token");

        if (!$this-&gt;isCsrfTokenValid('upload', $token))
        {
            $logger-&gt;info("CSRF failure");

            return new Response("Operation not allowed",  Response::HTTP_BAD_REQUEST,
                ['content-type' =&gt; 'text/plain']);
        }

        $file = $request-&gt;files-&gt;get('myfile');

        if (empty($file))
        {
            return new Response("No file specified",
               Response::HTTP_UNPROCESSABLE_ENTITY, ['content-type' =&gt; 'text/plain']);
        }

        $filename = $file-&gt;getClientOriginalName();
        $uploader-&gt;upload($uploadDir, $file, $filename);

        return new Response("File uploaded",  Response::HTTP_OK,
            ['content-type' =&gt; 'text/plain']);
    }
}

In the UploadController, we check the CSRF token, get the file
from the request, and call the uploader service upload() method.

public function index(Request $request, string $uploadDir,
                      FileUploader $uploader, LoggerInterface $logger): Response
{

We inject the request object, the upload directory parameter, the
FileUploader service, and the logger.

$token = $request-&gt;get("token");

if (!$this-&gt;isCsrfTokenValid('upload', $token))
{
    $logger-&gt;info("CSRF failure");

    return new Response("Operation not allowed",  Response::HTTP_BAD_REQUEST,
        ['content-type' =&gt; 'text/plain']);
}

We retrieve the token and validate it with isCsrfTokenValid() method.
If the validation fails, we log the incident and sent a plain response
"Operation not allowed" and Response::HTTP_BAD_REQUEST response code.

$file = $request-&gt;files-&gt;get('myfile');

if (empty($file))
{
    return new Response("No file specified",  Response::HTTP_UNPROCESSABLE_ENTITY,
        ['content-type' =&gt; 'text/plain']);
}

We check if the user has specified any file in the form with the empty() method.
If the input field is empty, we send a plain text "No file specified" back to the client
with Response::HTTP_UNPROCESSABLE_ENTITY response code.

$filename = $file-&gt;getClientOriginalName();

We get the file name with getClientOriginalName().

$uploader-&gt;upload($uploadDir, $file, $filename);

We call the uploader service upload() method, which moves the file
to the chosen directory. We pass the method the directory name, the file data,
and the file name.

return new Response("File uploaded",  Response::HTTP_OK,
    ['content-type' =&gt; 'text/plain']);

If everything goes OK, we send a plain message "File uploaded" back
to the client with Response::HTTP_OK response code.

src/Service/FileUploader.php
  

&lt;?php

namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Psr\Log\LoggerInterface;

class FileUploader
{
    private $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this-&gt;logger = $logger;
    }

    public function upload($uploadDir, $file, $filename)
    {
        try {

            $file-&gt;move($uploadDir, $filename);
        } catch (FileException $e){

            $this-&gt;logger-&gt;error('failed to upload image: ' . $e-&gt;getMessage());
            throw new FileException('Failed to upload file');
        }
    }
}

The FileUploader service moves the file to the upload
directory with move(). When the operation fails, we throw
a FileException. This will lead to an error page being produced.

templates/bundles/TwigBundle/Exception/error.html.twig
  

{% extends "base.html.twig" %}
{% block title %}
    Problem detected
{% endblock %}
{% block body %}
    &lt;div&gt;
        &lt;p&gt;
            There was a problem: {{ exception.message }}
        &lt;/p&gt;
    &lt;/div&gt;
{% endblock %}

We override the Twig's error.html.twig template. We need to create this
exact directory path: bundles/TwigBundle/Exception/ inside the
templates directory. This error view
will be generated for the user when a FileException occurs and when
the environment is set to production.

templates/base.html.twig
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;{% block title %}Welcome!{% endblock %}&lt;/title&gt;
        {% block stylesheets %}{% endblock %}
    &lt;/head&gt;
    &lt;body&gt;
        {% block body %}{% endblock %}
        {% block javascripts %}{% endblock %}
    &lt;/body&gt;
&lt;/html&gt;

This is the base Twig template.

In this tutorial we have shown how to upload a file in a Symfony application.

List [all Symfony tutorials](/all#symfony).