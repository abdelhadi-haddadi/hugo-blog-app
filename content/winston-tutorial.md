+++
title = "Winston tutorial"
date = 2025-08-29T20:01:43.817+01:00
draft = false
description = "Learn how to implement logging in JavaScript using Winston.js, with practical examples and detailed explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Winston tutorial

last modified last modified October 18, 2023

 

In this article we show how to do logging in JavaScript with Winston.js library, 
and demonstrates logging in several code examples.

## Logging

Logging is the process of writing information into log files. Log
files include information about various events that happened in operating
system, software, or in communication.

## Purpose of logging

Logging is done for the following purposes:

- Troubleshooting

- Information gathering

- Profiling

- Auditing

- Generating statistics

Logging is not limited to identifying errors in software development. It is also
used in detecting security incidents, monitoring policy violations, providing
information in case of problems, finding application bottlenecks, or generating
usage data.

## Which events to log

Events that should be logged include input validation failures, authentication
and authorization failures, application errors, configuration changes, and
application start-ups and shut-downs.

## Which events not to log

Events that should not be logged include application source code, session
identification values, access tokens, sensitive personal data, passwords,
database connection strings, encryption keys, bank account and card holder data.

## Logging best practices

The following are some best practices for doing logging:

- Logging should be meaningful.

- Logging should be structured and done at different levels.

- Logging should contain context.

- Logging messages should be understandable to humans and parsable by machines.

- Logging should be balanced; it should not include too little or too much information.

- Logging should be adapted to development and to production.

- Logging in more complex applications should be divided into several log files.

## Winston

Winston is a popular JavaScript logging library. It is designed to be
simple and universal. Each Winston logger can have multiple transports
configured at different levels. Winston uses JSON format for its logs by
default.

$ npm i winston

We install the winston package with the npm tool.

## Winston loggers

Winston loggers log the messages to log files. A winston logger is created with
the createLogger function. In addition, there is a default logger
if no logger is explicitly specified. 

The createLogger function accepts the following options:

    
        Name
        Default
        Description
    

    
        level
        info
        maximum level of log messages to log
    
    
        levels
        winston.config.npm.levels
        the set of level message types chosen
    
    
        format
        winston.format.json
        the format of log messages
    
    
        transports
        no transports
        set of logging destinations for log messages
    
    
        exitOnError
        true
        whether handled exceptions cause process.exit
    
    
        silent
        false
        if true, all logs are suppressed
        

Table: Winston logger parameters

## Winston transports

A transport is a storage device or output mechanism for our logs. Each Winston
logger can have  multiple transports configured at different levels. Winston
comes with three  core transports: console, file, and HTTP. The transports must
be created and added to the loggers.

A transport has the following settings:

    - level - Sets the level of messages to log.

    - filename - This is the filename to write log data to.

    - handleExceptions - Determines whether to catch and log unhandled exceptions.

    - json - Records log data in JSON format.

    - maxsize - Sets the max size of log file, in bytes, before a new file will be created.

    - maxFiles - Limits the number of files created when the size of the logfile is exceeded.

    - colorize - Colorizes the output; helpful when looking at console logs.

## Winston logging levels

Logging levels indicate message priority and are denoted by an integer. They are
specified for a transport. Winston comes with predefined sets of logging levels:
npm, syslog, and cli.

The following are the default npm logging levels:

- 0: error

- 1: warn

- 2: info

- 3: http

- 4: verbose

- 5: debug

- 6: silly

Anything at a particular level or higher will be logged. For instance, by
specifying the info level, anything at level error, warn, or info will be
logged. Log levels are specified when calling the logger.

logger.info('Information message').

We log an information message using the info function.

logger.log('info', Information message').

This is an alternative way of logging an information message.

## Winston formats

Logging messages are formatted with Winston formats. Winston contains several
built-in formats, including:

  - simple

  - json

  - cli

  - padlevels

  - colorize

  - splat

  - align

The default format is json. Formats can be combined with
combine and custom formats can be created with printf.

## Winston simple example

The following is a simple Winston example.

simple.js
  

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');

We create a console logger and log three messages. Since the default 
logging level is info, all three messages are logged.

$ node simple.js 
{"message":"Information message","level":"info"}
{"message":"Warning message","level":"warn"}
{"message":"Error message","level":"error"}

In the output we can see three messages in JSON.

## Winston log functions

We can log messages with custom log functions (info,
warn) or use the generic log function and specify the
log level as the first option.

log_funs.js
  

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('Information message');
logger.warn('Warning message');

logger.log('info', 'Information message')
logger.log('warn', 'Warning message')

In the example, we log messages in both ways.

$ node log_funs.js 
{"message":"Information message","level":"info"}
{"message":"Warning message","level":"warn"}
{"level":"info","message":"Information message"}
{"level":"warn","message":"Warning message"}

## Winston configure logger

With the configure function, we can configure and already 
created logger.

configure_logger.js
  

const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');

logger.configure({
    level: 'error',
    transports: [
        new winston.transports.Console()
    ]
});

logger.info('Information message 2');
logger.warn('Warning message 2');
logger.error('Error message 2');

In the example, we change the logging level to 'error' and call
another three log functions. Only the second error message is outputted from the
additional messages.

$ node configure_logger.js 
{"message":"Information message","level":"info"}
{"message":"Warning message","level":"warn"}
{"message":"Error message","level":"error"}
{"message":"Error message 2","level":"error"}

## Winston default logger

The default logger is accessible through the winston module directly.
Initially, there are no transports set on the default logger. We must add or
remove transports via the add, remove, or 
configure methods.

default_logger.js
  

const winston = require('winston');

const console = new winston.transports.Console();

winston.add(console);
winston.info('Information message');
winston.remove(console);

The example uses the default logger to log an information message.

## Winston format cli

The cli format is a combination of the colorize 
and the padLevels formats.

format_cli.js
  

const winston = require('winston');
 

const myformat = winston.format.cli({ colors: { info: 'blue' }});

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: myformat
        })
    ]
});

logger.info('Information message');

In the example, we pass the cli format to the console transport. We choose a
blue colour. 

## Winston combine formats

Formats can be combined with the combine.

format_combine.js
  

const winston = require('winston');
 

const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info =&gt; `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: myformat
        })
    ]
});

logger.info('Information message');

In the example, we combine colorize, timestamp, align, 
and printf formats.

$ node format_combine.js 
2020-04-04T17:17:48.882Z info:  Information message

## Winston transport maxsize

The maxsize property of a transport sets the maximum size of a log
file, in bytes, before a new file will be created.

max_size.js
  

const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf(info =&gt; `${info.message}`),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, 'error.log'),
      level: 'info',
      maxsize: 500
    })
  ]
});

logger.info(`${'a'.repeat(200)}`);
logger.info(`${'b'.repeat(200)}`);
logger.info(`${'c'.repeat(200)}`);

setTimeout(() =&gt; {
  logger.info(`${'d'.repeat(200)}`);
  logger.info(`${'e'.repeat(200)}`);
}, 1500);

We use a file transport and set the maxsize to 500 bytes. Later we
write more than 500 characters into the file. The first 600 characters are
written to the error.log file, the remaining 400 characters into
the error1.log file.

## Winston multiple loggers

In the next example, we create two loggers that write to files.

loggers.js
  

const winston = require('winston');

const loggers = {
  mjson: winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'app-info.log'})],
  }),

  simple: winston.createLogger({
    level: 'error',
    format: winston.format.simple(),
    transports: [new winston.transports.File({ filename: 'app-error.log'}),],
  })
};

loggers.mjson.info('Information message');
loggers.mjson.error('Error message');
loggers.mjson.debug('Some message');

loggers.simple.error('Error message');
loggers.simple.info('Information message');
loggers.simple.warn('Warning message');
loggers.simple.debug('Some message');

The mjson logger writes in a json format, the simple
logger in a simple format. The loggers have different log levels.

$ node loggers.js
$ cat app-error.log 
error: Error message
$ cat app-info.log 
{"message":"Information message","level":"info"}
{"message":"Error message","level":"error"}

We run the program and show the file contents.

## Source

[Winston GitHub page](https://github.com/winstonjs/winston)

In this article we have worked with the Winston logging library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)