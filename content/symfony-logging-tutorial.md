+++
title = "Symfony Logging Tutorial"
date = 2025-08-29T20:12:45.719+01:00
draft = false
description = "Symfony Logging tutorial shows how to use Monolog for logging in Symfony 7.2."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Logging Tutorial

last modified March 3, 2025 

Symfony Logging tutorial shows how to use Monolog for logging in Symfony 7.2.
We configure Monolog, create custom log channels, and use logging in controllers
and services.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Fabien Potencier
is the original author of Symfony. Symfony was heavily inspired by the Spring
Framework.

## Monolog

Monolog is a logging library for PHP. It is the default logging library
used in Symfony. Monolog supports multiple handlers, formatters, and processors,
making it highly flexible.

## Setting up the project

We start by creating a new Symfony project and installing the necessary
dependencies.

$ composer create-project symfony/skeleton symfony-logging "^7.2"
$ cd symfony-logging

We create a new Symfony 7.2 project and navigate to the project directory.

$ composer require symfony/monolog-bundle

We install the Monolog bundle, which is already included in Symfony by default.
This step ensures the bundle is properly configured.

## Configuring Monolog

Monolog is configured in the config/packages/monolog.yaml file.
We customize the configuration to create custom log channels and handlers.

config/packages/monolog.yaml
  

monolog:
    channels:
        - app
        - security
    handlers:
        main:
            type: stream
            path: "%kernel.logs_dir%/%kernel.environment%.log"
            level: debug
            channels: ["!event"]
        app:
            type: stream
            path: "%kernel.logs_dir%/app.log"
            level: info
            channels: ["app"]
        security:
            type: stream
            path: "%kernel.logs_dir%/security.log"
            level: warning
            channels: ["security"]

This configuration:
- Creates two custom log channels: app and security.
- Logs app messages to app.log at the info level.
- Logs security messages to security.log at the warning level.
- Logs all other messages to the default log file.

## Using Logging in a Controller

We create a controller to demonstrate logging.

$ php bin/console make:controller LogController

We generate a LogController.

src/Controller/LogController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class LogController extends AbstractController
{
    #[Route('/log', name: 'app_log')]
    public function index(LoggerInterface $logger): Response
    {
        // Log messages using the default logger
        $logger-&gt;debug('This is a debug message.');
        $logger-&gt;info('This is an info message.');
        $logger-&gt;warning('This is a warning message.');
        $logger-&gt;error('This is an error message.');
        $logger-&gt;critical('This is a critical message.');

        // Log messages using custom channels
        $logger-&gt;info('This is an app-specific message.', ['channel' =&gt; 'app']);
        $logger-&gt;warning('This is a security-specific message.', ['channel' =&gt; 'security']);

        return new Response('Logging example. Check your log files.');
    }
}

The LogController logs messages using the default logger and custom
channels. The LoggerInterface is injected into the controller.

## Using Logging in a Service

We create a service to demonstrate logging in a non-controller context.

src/Service/ExampleService.php
  

&lt;?php

declare(strict_types=1);

namespace App\Service;

use Psr\Log\LoggerInterface;

class ExampleService
{
    private LoggerInterface $logger;

    public function __construct(LoggerInterface $logger)
    {
        $this-&gt;logger = $logger;
    }

    public function doSomething(): void
    {
        $this-&gt;logger-&gt;info('Doing something important in the service.');
    }
}

The ExampleService logs a message when the doSomething
method is called.

## Testing the Logging

We start the Symfony development server and test the logging functionality.

$ php bin/console server:start

We start the development server.

$ curl localhost:8000/log

We visit the /log route to trigger logging in the controller.

Check the log files in the var/log/ directory:
- dev.log: Default log file for all messages.
- app.log: Custom log file for app channel messages.
- security.log: Custom log file for security channel messages.

## Advanced Logging Configuration

Monolog supports advanced configurations, such as:
- Logging to different files based on severity.
- Sending logs to external services (e.g., Slack, Elasticsearch).
- Using processors to add extra data to log records.

config/packages/monolog.yaml
  

monolog:
    handlers:
        slack:
            type: slack
            token: "xoxb-your-slack-token"
            channel: "#logs"
            level: critical

This configuration sends critical logs to a Slack channel.

In this tutorial, we used Monolog for logging in Symfony 7.2. We configured
custom log channels, used logging in controllers and services, and explored
advanced logging options.

List [all Symfony tutorials](/all/#symfony).