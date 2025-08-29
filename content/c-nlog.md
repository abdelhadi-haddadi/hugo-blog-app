+++
title = "C# NLog"
date = 2025-08-29T19:51:09.475+01:00
draft = false
description = "C# NLog tutorial shows how to do logging in C# with NLog."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# NLog

last modified July 5, 2023

 

In this article we show how to do logging in C# with NLog library.

NLog is a free logging library for .NET. It is easy to use,
performat and extensible. 

$ dotnet add package NLog

We add the package to the project.

## Logging

Logging is the process of writing information into log targets. The
logged data include information about various events that happened in operating
system, software, or in communication.

The reasons for logging information are:

    - information gathering

    - troubleshooting

    - generating statistics

    - auditing

    - profiling

In addition to identifying errors in software development, logging is also used
in detecting security incidents, monitoring policy violations, providing
information in case of problems, finding application bottlenecks, or generating
usage data.

## Logging levels

Logging levels indicate message priority. 

    - Off - logging turned off

    - Trace - very detailed and noisy, the most verbose level

    - Debug - less detailed, for internal events of interest

    - Info - informational messages

    - Warn - warnings about validation issues or temporary failures that can be recovered; may indicate future problems

    - Error - more serious error messages indicating loss of data or functionality

    - Fatal - most critical messages where applications often terminate

## Targets

Logging targets are destinations where logging information can be stored. 

NLog supports many targets including:

    - files

    - consoles

    - email adresses

    - databases

    - message queues

    - remote machines

    - remote services

    - application

## Layouts

The layout defines what kind of information in what format is being logged.

${longdate}|${level:uppercase=true}|${logger}|${message:withexception=true}

This is the default layout.

## NLog ConsoleTarget

When using the ConsoleTarget, the messages are written to the 
console. 

Program.cs
  

using NLog;
using NLog.Targets;

var target = new ConsoleTarget();

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Info);

Logger logger = LogManager.GetLogger("simple");
logger.Debug("debug message");
logger.Info("info message");
logger.Error("error message");

The example logs messages to the console.

var target = new ConsoleTarget();

A new console target is created.

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Info);

This line configures NLog to log to the specified target so that all messages
above and including the specified level are output.

Logger logger = LogManager.GetLogger("simple");

We create a named logger.

logger.Debug("debug message");
logger.Info("info message");
logger.Error("error message");

We log three messages with various log levels. 

$ dotnet run
2023-03-30 17:33:50.5430|INFO|simple|info message
2023-03-30 17:33:50.5656|ERROR|simple|error message

Since the Debug level is below the Info level, it is 
not being logged for this target.

## NLog layout example

In the next example, we choose our custom log layout.

Program.cs
  

using NLog;
using NLog.Targets;

var target = new ColoredConsoleTarget();
target.Layout = "${date:format=yy-MM-dd HH\\:MM\\:ss} ${logger} ${message}";

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Debug);

Logger logger = LogManager.GetLogger("simple");
logger.Debug("debug message");
logger.Info("info message");
logger.Error("error message");

We define a coloured console target with a custom layout.

target.Layout = "${date:format=yy-MM-dd HH\\:MM\\:ss} ${logger} ${message}";

In the layout, we include a custom formatted date, the name of the logger, and 
the message.

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Debug);

Logger logger = LogManager.GetLogger("simple");
logger.Debug("debug message");
logger.Info("info message");
logger.Error("error message");

Since the log level is set to Debug, all three messages are logged.

## NLog FileTarget

With FileTarget, we write our log message into a file.

Program.cs
  

using NLog;
using NLog.Targets;

var target = new FileTarget();
target.FileName = "${basedir}/output.log";

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Info);

Logger logger = LogManager.GetLogger("simple");
logger.Info("info message");
logger.Error("error message");

The example writes two message into a file target.

var target = new FileTarget();
target.FileName = "${basedir}/output.log";

We create a new FileTarget and define the log filename.

NLog.Config.SimpleConfigurator.ConfigureForTargetLogging(target, LogLevel.Info);

Logger logger = LogManager.GetLogger("simple");
logger.Info("info message");
logger.Error("error message");

We configure the target and write two messages.

$ cat bin\Debug\net7.0\output.log
2023-03-30 18:15:38.5713|INFO|simple|info message
2023-03-30 18:15:38.5905|ERROR|simple|error message

## NLog rules

The log rules control how the messages are written to targets.

Program.cs
  

using NLog;
using NLog.Targets;
using NLog.Config;

var config = new LoggingConfiguration();

var ftarget = new FileTarget();
ftarget.FileName = "${basedir}/output.log";
config.AddTarget("file", ftarget);

var ctarget = new ConsoleTarget();
config.AddTarget("console", ctarget);

var rule = new LoggingRule("error", LogLevel.Error, ftarget);
config.LoggingRules.Add(rule);

var rule2 = new LoggingRule("*", LogLevel.Info, ctarget);
config.LoggingRules.Add(rule2);

LogManager.Configuration = config;

Logger logger = LogManager.GetLogger("simple");
logger.Info("info message");
logger.Error("error message");

Logger logger2 = LogManager.GetLogger("error");
logger2.Info("info message 2");
logger2.Error("error message 2");

We have two targets: a file target and a console target. The two rules define 
how messages go to targets.

var rule = new LoggingRule("error", LogLevel.Error, ftarget);
config.LoggingRules.Add(rule);

The first rule has the error name pattern and goes to the file target.

var rule2 = new LoggingRule("*", LogLevel.Info, ctarget);
config.LoggingRules.Add(rule2);

The second rule is given * as the name pattern and is bound to the console
target.

Logger logger = LogManager.GetLogger("simple");
logger.Info("info message");
logger.Error("error message");

Logger logger2 = LogManager.GetLogger("error");
logger2.Info("info message 2");
logger2.Error("error message 2");

Four messages are written.

$ dotnet run 
2023-03-30 18:38:29.3712|INFO|simple|info message
2023-03-30 18:38:29.3818|ERROR|simple|error message
2023-03-30 18:38:29.3818|INFO|error|info message 2
2023-03-30 18:38:29.3818|ERROR|error|error message 2
$ cat bin\Debug\net7.0\output.log
2023-03-30 18:38:29.3818|ERROR|error|error message 2

All four messages were logged to the console because they satisfied the first
rule. Only one message satisfied the second rule, which was bound to a file log.

## Source

[NLog documentation page](https://github.com/nlog/nlog/wiki)

In this article we have done logging in C# with NLog library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).