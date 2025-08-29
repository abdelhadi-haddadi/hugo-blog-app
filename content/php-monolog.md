+++
title = "PHP Monolog"
date = 2025-08-29T20:04:32.474+01:00
draft = false
description = "PHP Monolog tutorial shows how to do logging in PHP with Monolog."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP Monolog

last modified February 16, 2025

PHP Monolog tutorial shows how to do logging in PHP with Monolog.

## Logging

Logging is the process of writing information into log files. Log files
contain information about various events that happened in operating system, software, or
in communication.

## Purpose of logging

Logging is done for the following purposes:

- Information gathering

- Troubleshooting

- Generating statistics

- Auditing

- Profiling

Logging is not limited to identifying errors in software development. It is also used
in detecting security incidents, monitoring policy violations, providing information in case
of problems, finding application bottlenecks, or generating usage data.

## Events to log

Events that should be logged include input validation failures, authentication
and authorization failures, application errors, configuration changes, and
application start-ups and shut-downs.

## Events not to log

Events that should not be logged include application source code, session
identification values, access tokens, sensitive personal data, passwords,
database connection strings, encryption keys, bank account and card holder data.

## Logging best practices

The following are some best practices for logging:

- Logging should be meaningful.

- Logging should contain context.

- Logging should be balanced; it should not include too little or too much information.

- Logging messages should be understandable to humans and parseable by machines.

- Logging should structured and done at different levels.

- Logging should be adapted to development and to production.

- Logging in more complex applications should be done into several log files.

## PHP Monolog

Monolog is a popular PHP logging library. It allows to send
logs to files, sockets, inboxes, databases and various web services.
It implements the PSR-3 interface.

$ composer req monolog/monolog

We install Monolog with composer.

## Monolog structure

A Monolog logger instance has a *channel* (name) and a stack of *handlers*.
The handlers are responsible for saving the message to the file, database,
or sending it to a mail.

A logged message travels through the *handler stack*. The last handler acts
first. The further propagation of a message is controlled with the bubble
variable, which is by default set to true.

A *message record* is a piece of information that is going to be written
to the log. The message record has the the following parts:

    
        Key
        Type
        Description
    

    
        message
        string
        The log message.
    
    
        level
        int
        Severity of the log message.
    
    
        level_name
        string
        String representation of log level.
    
    
        context
        array
        Arbitrary data passed with the construction of the message. 
    
    
        channel
        string
        The channel this message was logged to.
    
    
        datetime
        Monolog\DateTimeImmutable
        Date and time when the message was logged.
    
    
        extra
        array
        A placeholder array where processors can put additional data.
    

A *processor* is any PHP callable that can be used to process the
log message. It can add some extra data to the record.

The context is array data which has additional information that
does not fit well in the primary string. The context is a parameter to the
logging methods (e.g. info or warn).

*Formatters* are used to format message records.

## Monolog log levels

Logging levels are used to categorize log messages by urgency.
Monolog has the following log levels:

    - DEBUG - detailed debug information

    - INFO - interesting events

    - NOTICE - normal but significant events

    - WARNING - exceptional occurrences that are not errors

    - ERROR - runtime errors that do not require immediate action

    - CRITICAL - critical conditions

    - ALERT - events for which action must be taken immediately

    - EMERGENCY - emergency events

Less severe logs are not processed by handlers with more severe logging levels.
By setting the log level to ERROR we get messages with ERROR level and up.

Each handler is specified a log level; the default is DEBUG.
To produce a message with a specific log level, we have methods including
info, warn, error, and
critical. Since Monolog predates PSR-3, it contains
duplicate methods (e.g. addInfo or addWarning).

## Monolog simple example

In the first example, we use Streamhandler to log
a message to a file.

simple.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('main');
$logger-&gt;pushHandler(new StreamHandler(__DIR__ . '/logs/app.log', Logger::DEBUG));

$logger-&gt;info('First message');

The example writes an info message to the logs/app.log file.

$logger = new Logger('main');

A new logger named main is created.

$logger-&gt;pushHandler(new StreamHandler(__DIR__ . '/logs/app.log', Logger::DEBUG));

We add a StreamHandler to the logger with pushHandler.
The handler writes messages to the specified file with the DEBUG severity.

$logger-&gt;info('First message');

We log an info message with info method.

$ cat logs\app.log
[2019-05-15 15:49:48] main.INFO: First message [] []

This is the written message. The log message starts with the current
datetime. It is followed by the log channel name and level. Then
comes the message record. The two pairs of square brackets is
where we can specify context and extra data. We can customize this
output with Monolog formatters.

## Monolog console logging

We can write log messages to terminal.

console_log.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;

$logger = new Logger('stderr');
$logger-&gt;pushHandler(new StreamHandler('php://stderr', Logger::WARNING));

$logger-&gt;warn('A warning message');

We write to console by specifying php://stderr to the StreamHandler.

## Monolog context array

Monolog context array allows to add information to the message records
at the userland level.

context_array.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('main');
$logger-&gt;pushHandler(new StreamHandler('php://stderr'));

$logger-&gt;info('Information message', ['user' =&gt; get_current_user()]);

The second parameter of the info method is the context array.
We add the current user to the message.

$ php context_array.php
[2019-05-15 15:37:56] main.INFO: Information message {"user":"Jano"} []

## Monolog logger handler stack

We can add multiple handlers to the stack. The last added handler is
executed first.

handler_stack.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$main = new Logger('main');
$main-&gt;pushHandler(new StreamHandler(__DIR__ . '/logs/app.log'));

$main-&gt;pushHandler(new StreamHandler('php://stdout', $level = Logger::DEBUG,
        $bubble = true));

$main-&gt;info('Information message');

In the example, we have two logger handlers: a file and a console
handler. If we change the $bubble to false,
the message will not be written to the logs/app.log file.

## Monolog custom processor

A custom processor can be added with pushProcessor.

custom_processor.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('main');
$logger-&gt;pushHandler(new StreamHandler('php://stderr'));

$logger-&gt;pushProcessor(function ($record) {
    $record['extra']['user'] = get_current_user();

    return $record;
});

$logger-&gt;info('Information message');

In the example, we add some extra information to the message record
in the processor. According to the documentation, the difference between
context and extra data is that context is supplied in user land whereas
extra is internal only and can be filled by processors.

$ php custom_processor.php
[2019-05-15 17:24:48] main.INFO: Information message [] {"user":"Jano"}

The extra information is added at the end of the output.

## Monolog JsonFormatter

JsonFormatter writes records in JSON format.

json_formatter.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Formatter\JsonFormatter;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;

$logger = new Logger('main');

$formatter = new JsonFormatter();

$stream = new StreamHandler(__DIR__ . '/logs/app-json.log');
$stream-&gt;setFormatter($formatter);

$logger-&gt;pushHandler($stream);
$logger-&gt;info('Information message', ['user' =&gt; get_current_user()]);

The example writes an info message to a file in JSON format using JsonFormatter.

$ cat logs\app-json.log
{"message":"Information message","context":{"user":"Jano"},"level":200,"level_name":"INFO",
"channel":"main","datetime":{"date":"2019-05-15 17:37:40.433222","timezone_type":3,
"timezone":"Europe/Berlin"},"extra":[]}

This is the logged message.

## Monolog LineFormatter

LineFormatter formats a log record into a one-line string.

line_format.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;
use Monolog\Processor\ProcessIdProcessor;

$output = "[%datetime%] %channel%.%level_name%: %message% %context.user%\n";
$formatter = new LineFormatter($output);

$streamHandler = new StreamHandler('php://stdout');
$streamHandler-&gt;setFormatter($formatter);

$logger = new Logger('main');
$logger-&gt;pushHandler($streamHandler);

$logger-&gt;info('Information message from', ['user' =&gt; get_current_user()]);

In the example, we customize the message record with LineFormatter.

$output = "[%datetime%] %channel%.%level_name%: %message% %context.user%\n";
$formatter = new LineFormatter($output);

We create a custom record message. It contains datetime, channel name, level name,
message and context data.

$streamHandler-&gt;setFormatter($formatter);

We add the formatter to the handler with setFormatter.

$ php line_format.php
[2019-05-15 17:43:36] main.INFO: Information message from Jano

## Monolog mail log message

Emails can be sent with SwiftMailerHandler

$ composer req swiftmailer/swiftmailer

For this example, we need to install swiftmailer/swiftmailer
package.

**Note:** Gmail is not ideal for testing applications. We
should use an online service such as Mailtrap or Mailgun, or use an SMTP
server provided by a webhosting company.

In our example, we use Mailtrap service.

mail_log.php
  

&lt;?php

require __DIR__ . '/vendor/autoload.php';

use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Monolog\Handler\SwiftMailerHandler;

$transporter = new Swift_SmtpTransport('smtp.mailtrap.io', 2525, 'tls');
$transporter-&gt;setUsername('3178491df14b6d');
$transporter-&gt;setPassword('7c1d6fa59a5v08');

$mailer = new Swift_Mailer($transporter);

$message = new Swift_Message('Critical message');
$message-&gt;setFrom(['approot@example.com' =&gt; 'App root']);
$message-&gt;setTo(['support@example.com' =&gt; 'Support']);

$logger = new Logger('main');
$logger-&gt;pushHandler(new SwiftMailerHandler($mailer, $message, Logger::CRITICAL));
$logger-&gt;critical('Could not connect to the database');

In the example, we use the SwiftMailerHandler to send a message record 
to a mail inbox. 

$transporter = new Swift_SmtpTransport('smtp.mailtrap.io', 2525, 'tls');
$transporter-&gt;setUsername('3178491df14b6d');
$transporter-&gt;setPassword('7c1d6fa59a5v08');

Using the Mailtrap connection details, we build the transporter.

$mailer = new Swift_Mailer($transporter);

A Swinf_Mailer is created.

$message = new Swift_Message('Critical message');
$message-&gt;setFrom(['approot@example.com' =&gt; 'App root']);
$message-&gt;setTo(['support@example.com' =&gt; 'Support']);

A Swift_Message is created. It contains the from
the to fields.

$logger = new Logger('main');
$logger-&gt;pushHandler(new SwiftMailerHandler($mailer, $message, Logger::CRITICAL));
$logger-&gt;critical('Could not connect to the database');

We add the SwiftMailerHandler to the logger and create
a critical message with critical.

## Source

[Monolog Github repository](https://github.com/Seldaek/monolog)

In this article we have used Monolog to do logging in PHP.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.