+++
title = "Python logging"
date = 2025-08-29T20:08:52.274+01:00
draft = false
description = "Python logging tutorial shows how to do logging in Python with the logging module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python logging

last modified January 29, 2024

Python logging tutorial shows how to do logging in Python with the logging
module.

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

## Which events to log

Events that should be logged include input validation failures, authentication and authorization
failures, application errors, configuration changes, and application start-ups and shut-downs.

## Which events not to log

Events that should not be logged include application source code, session identification values,
access tokens, sensitive personal data, passwords, database connection strings, encryption keys,
bank account and card holder data.

## Logging best practices

The following are some best practices for doing logging:

- Logging should be meaningful.

- Logging should contain context.

- Logging should structured and done at different levels.

- Logging should be balanced; it should not include too little or too much information.

- Logging messages should be understandable to humans and parseable by machines.

- Logging in more complex applications should be done into several log files.

- Logging should be adapted to development and to production.

## The logging module

Python logging module defines functions and classes which
implement a flexible event logging system for applications and libraries.

## The logging module components

The logging module has four main components: loggers, handlers, filters,
and formatters. Loggers expose the interface that application code directly uses.
Handlers send the log records (created by loggers) to the appropriate destination.
Filters provide a finer grained facility for determining which log records to output.
Formatters specify the layout of log records in the final output.

## Python logging hierarchy

Python loggers form a hierarchy. A logger named main is a parent
of main.new.

Child loggers propagate messages up to the handlers associated with
their ancestor loggers. Because of this, it is unnecessary to define and
configure handlers for all the loggers in the application. It is
sufficient to configure handlers for a top-level logger and create child
loggers as needed.

## Python logging levels

Levels are used for identifying the severity of an event. There are six
logging levels:

    - CRITICAL

    - ERROR

    - WARNING

    - INFO

    - DEBUG

    - NOTSET

If the logging level is set to WARNING, all WARNING,
ERROR, and CRITICAL messages are written to the log file
or console. If it is set to ERROR, only ERROR and
CRITICAL messages are logged.

Loggers have a concept of *effective level*. If a level is not explicitly
set on a logger, the level of its parent is used instead as its
effective level. If the parent has no explicit level set, its parent is
examined, and so on - all ancestors are searched until an explicitly set
level is found.

When the logger is created with getLogger, the level is set to
NOTSET. If the logging level is not set explicitly with setLevel,
the messages are propagated to the logger parents. The logger's chain of ancestor loggers
is traversed until either an ancestor with a level other than NOTSET is found,
or the root is reached. The root logger has a default WARNING level set.

## Root logger

All loggers are descendants of the root logger. Each logger passes log messages
on to its parent. New loggers are created with the getLogger(name)
method. Calling the function  without a name (getLogger) returns
the root logger.

The root logger always has an explicit level set, which is WARNING
by default.

The root looger sits at the top of the hierarchy and is always present, even if
not configured. In general, the program or library should not log directly
against the root logger. Instead a specific logger for the program should be
configured. Root logger can be used to easily turn all loggers from all
libraries on and off.

## Python logging simple example

The logging module has simple methods that can be used right
away without any configuration. This can be used for simple logging.

simple.py
  

#!/usr/bin/python

import logging

logging.debug('This is a debug message')
logging.info('This is an info message')
logging.warning('This is a warning message')
logging.error('This is an error message')
logging.critical('This is a critical message')

The example calls five methods of the logging module.
The messages are written to the console.

$ simple.py
WARNING:root:This is a warning message
ERROR:root:This is an error message
CRITICAL:root:This is a critical message

Notice that root logger is used and only three messages were written.
This is because by default, only messages with level warning and up are
written.

## Python set logging level

The logging level is set with setLevel.
It sets the threshold for this logger to lvl.
Logging messages which are less severe than lvl will be ignored.

set_level.py
  

#!/usr/bin/python

import logging

logger = logging.getLogger('dev')
logger.setLevel(logging.DEBUG)

logger.debug('This is a debug message')
logger.info('This is an info message')
logger.warning('This is a warning message')
logger.error('This is an error message')
logger.critical('This is a critical message')

In the example, we change the logging level to DEBUG.

logger = logging.getLogger('dev')

The getLogger returns a logger with the specified name.
If name is None, it returns the root logger. The name can
be a dot separated string defining logging hierarchy; for instance
'a', 'a.b', or 'a.b.c'. Note that there is an implicit root name, which
is not shown.

$ set_level.py
This is a warning message
This is an error message
This is a critical message

Now all the messages were written.

## Python effective logging level

The effective logging level is the level set explicitly or
determined from the logger parents.

effective_level.py
  

#!/usr/bin/python

import logging

main_logger = logging.getLogger('main')
main_logger.setLevel(5)

dev_logger = logging.getLogger('main.dev')

print(main_logger.getEffectiveLevel())
print(dev_logger.getEffectiveLevel())

In the example, we examine the effective logging level of two loggers.

dev_logger = logging.getLogger('main.dev')

The level of the dev_logger is not set; the level of
its parent is then used.

$ effective_level.py
5
5

## Python logging handlers

Handler is an object responsible for dispatching the appropriate log
messages (based on the log messages' severity) to the handler's
specified destination.

Handlers are propagated like levels. If the logger has no
handler set, its chain of ancestors is search for a handler.

handlers.py
  

#!/usr/bin/python

import logging

logger = logging.getLogger('dev')
logger.setLevel(logging.INFO)

fileHandler = logging.FileHandler('test.log')
fileHandler.setLevel(logging.INFO)

consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.INFO)

logger.addHandler(fileHandler)
logger.addHandler(consoleHandler)

logger.info('information message')

The example creates two handlers for a logger: a file handler and
a console handler.

fileHandler = logging.FileHandler('test.log')

FileHandler sends log records to the test.log
file.

consoleHandler = logging.StreamHandler()

StreamHandler sends log records to a stream.
If the stream is not specified, the sys.stderr is used.

logger.addHandler(fileHandler)

The handler is added to the logger with addHandler.

## Python logging formatters

Formatter is an object which configures the final order,
structure, and contents of the log record. In addition to
the message string, log records also include date and time,
log names, and log level severity.

formatter.py
  

#!/usr/bin/python

import logging

logger = logging.getLogger('dev')
logger.setLevel(logging.INFO)

consoleHandler = logging.StreamHandler()
consoleHandler.setLevel(logging.INFO)

logger.addHandler(consoleHandler)

formatter = logging.Formatter('%(asctime)s  %(name)s  %(levelname)s: %(message)s')
consoleHandler.setFormatter(formatter)

logger.info('information message')

The example creates a console logger and adds a formatter to its
handler.

formatter = logging.Formatter('%(asctime)s  %(name)s  %(levelname)s: %(message)s')

The formatter is created. It includes the date time, logger name, logging level name,
and log message.

consoleHandler.setFormatter(formatter)

The formatter is set to the handler with setFormatter.

$ formatter.py
2019-03-28 14:53:27,446  dev  INFO: information message

The message with the defined format is shown in the console.

## Python logging basicConfig

The basicConfig configures the root logger. It does basic
configuration for the logging system by creating a stream handler with a default
formatter. The debug, info,
warning, error and critical call
basicConfig automatically if no handlers are defined for the root logger.

basic_config.py
  

#!/usr/bin/python

import logging

logging.basicConfig(filename='test.log', format='%(filename)s: %(message)s',
                    level=logging.DEBUG)

logging.debug('This is a debug message')
logging.info('This is an info message')
logging.warning('This is a warning message')
logging.error('This is an error message')
logging.critical('This is a critical message')

The example configures the root logger with basicConfig.

logging.basicConfig(filename='test.log', format='%(filename)s: %(message)s',
    level=logging.DEBUG)

With filename, we set the file to which we write the log messages.
The format determines what is logged into the file; we have
the filename and the message. With level, we set the logging treshold.

$ basic_config.py
$ cat test.log
basic_config.py: This is a debug message
basic_config.py: This is an info message
basic_config.py: This is a warning message
basic_config.py: This is an error message
basic_config.py: This is a critical message

After running the program, we have five messages written into the
test.log file.

## Python logging fileConfig

The fileConfig reads the logging configuration from
a configparser format file.

log.conf
  

[loggers]
keys=root,dev

[handlers]
keys=consoleHandler

[formatters]
keys=extend,simple

[logger_root]
level=INFO
handlers=consoleHandler

[logger_dev]
level=INFO
handlers=consoleHandler
qualname=dev
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=extend
args=(sys.stdout,)

[formatter_extend]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s

[formatter_simple]
format=%(asctime)s - %(message)s

The log.conf defines a logger, handler, and formatter.

file_config.py
  

#!/usr/bin/python

import logging
import logging.config

logging.config.fileConfig(fname='log.conf')

logger = logging.getLogger('dev')
logger.info('This is an information message')

The example reads the logging configuration file from
the log.conf.

$ file_config.py
2019-03-28 15:26:31,137 - dev - INFO - This is an information message

## Python logging variable

Dynamic data is logged by using string formatting.

log_variable.py
  

#!/usr/bin/python

import logging

root = logging.getLogger()
root.setLevel(logging.INFO)

log_format = '%(asctime)s %(filename)s: %(message)s'
logging.basicConfig(filename="test.log", format=log_format)

# incident happens

error_message = 'authentication failed'

root.error(f'error: {error_message}')

The example writes custom data to the log message.

2019-03-21 14:17:23,196 log_variable.py: error: authentication failed

This is the log message.

## Python logging format datetime

The datetime is included in the log message with the asctime
log record. With the datefmt configuration option, we can format
the datetime string.

date_time.py
  

#!/usr/bin/python

import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

log_format = '%(asctime)s %(filename)s: %(message)s'
logging.basicConfig(filename="test.log", format=log_format,
                    datefmt='%Y-%m-%d %H:%M:%S')

logger.info("information message")

The example formats the datetime of the log message.

log_format = '%(asctime)s %(filename)s: %(message)s'

We include the datetime string into the log with asctime.

logging.basicConfig(filename="test.log", format=log_format,
                    datefmt='%Y-%m-%d %H:%M:%S')

The datefmt option formats the datetime string.

2019-03-21 14:17:23,196 log_variable.py: error: authentication failed
2019-03-21 14:23:33 date_time.py: information message

Notice the difference in the datetime string format.

## Python logging stack trace

The stack trace is a call stack of functions that were run
up to the point of a thrown exceptions. The stack trace is
included with the exc_info option.

stack_trace.py
  

#!/usr/bin/python

import logging

log_format = '%(asctime)s %(filename)s: %(message)s'
logging.basicConfig(filename="test.log", format=log_format)

vals = [1, 2]

try:
    print(vals[4])

except Exception as e:
    logging.error("exception occurred", exc_info=True)

In the example, we log the exception that is thrown when we
try to access a non-existing list index.

logging.error("exception occurred", exc_info=True)

The stack trace is included in the log by setting the exc_info
to True.

2019-03-21 14:56:21,313 stack_trace.py: exception occurred
Traceback (most recent call last):
  File "C:\Users\Jano\Documents\pyprogs\pylog\stack_trace.py", line 11, in &lt;module&gt;
    print(vals[4])
IndexError: list index out of range

The stack trace is included in the log.

## Python logging getLogger

The getLogger returns a logger with the specified name.
If no name is specified, it returns the root logger. It is a common practice
to put the module name there with __name__.

All calls to this function with a given name return the same logger instance.
This means that logger instances never need to be passed between different parts
of an application.

get_logger.py
  

#!/usr/bin/python

import logging
import sys

main = logging.getLogger('main')
main.setLevel(logging.DEBUG)

handler = logging.FileHandler('my.log')

format = logging.Formatter('%(asctime)s  %(name)s
    %(levelname)s: %(message)s')
handler.setFormatter(format)

main.addHandler(handler)

main.info('info message')
main.critical('critical message')
main.debug('debug message')
main.warning('warning message')
main.error('error message')

The example creates a new logger with getLogger.
It is given a file handler and a formatter.

main = logging.getLogger('main')
main.setLevel(logging.DEBUG)

A logger named main is created; we set the
logging level to DEBUG.

handler = logging.FileHandler('my.log')

A file handler is created. The messages will be written to the
my.log file.

format = logging.Formatter('%(asctime)s  %(name)s
    %(levelname)s: %(message)s')
handler.setFormatter(format)

A formatter is created. It includes the time, the logger name,
the logging level, and the message in to log. The formatter is
set to the handler with setFormatter.

main.addHandler(handler)

The handler is added to the logger with addHandler.

$ cat my.log
2019-03-21 14:15:45,439  main  INFO: info message
2019-03-21 14:15:45,439  main  CRITICAL: critical message
2019-03-21 14:15:45,439  main  DEBUG: debug message
2019-03-21 14:15:45,439  main  WARNING: warning message
2019-03-21 14:15:45,439  main  ERROR: error message

These are the written log messages.

## Python logging YAML configuration

Logging details can be defined in a YAML configuration file.
YAML is a human-readable data serialization language. It is commonly
used for configuration files.

$ pip install pyyaml

We need to install pyyaml module.

config.yaml
  

version: 1

formatters:
  simple:
    format: "%(asctime)s %(name)s: %(message)s"
  extended:
    format: "%(asctime)s %(name)s %(levelname)s: %(message)s"

handlers:
  console:
    class: logging.StreamHandler
    level: INFO
    formatter: simple

  file_handler:
    class: logging.FileHandler
    level: INFO
    filename: test.log
    formatter: extended
    propagate: false

loggers:
  dev:
    handlers: [console, file_handler]
  test:
    handlers: [file_handler]
root:
  handlers: [file_handler]

In the configuration file, we have defined various formatters, handlers, and
loggers. The propagate option prevents from propagating
log messages to the parent loggers; in our case, to the root logger.
Otherwise, the messages would be duplicated.

log_yaml.py
  

#!/usr/bin/python

import logging
import logging.config
import yaml

with open('config.yaml', 'r') as f:

    log_cfg = yaml.safe_load(f.read())

logging.config.dictConfig(log_cfg)

logger = logging.getLogger('dev')
logger.setLevel(logging.INFO)

logger.info('This is an info message')
logger.error('This is an error message')

In the example, we read the configuration file and use
the dev logger.

$ log_yaml.py
2019-03-28 11:36:54,854 dev: This is an info message
2019-03-28 11:36:54,855 dev: This is an error message

When we run the program, there are two messages on the console.
The console handlers use the simple formatter with less information.

...
2019-03-28 11:36:54,854 dev INFO: This is an info message
2019-03-28 11:36:54,855 dev ERROR: This is an error message

There are log messages inside the test.log file.
They are produced by the extended formatter with more information.

## Source

[Logging facility for Python](https://docs.python.org/3/library/logging.html)

In this article we have worked with the Python logging library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).