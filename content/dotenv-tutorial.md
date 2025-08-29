+++
title = "Dotenv tutorial"
date = 2025-08-29T20:01:15.671+01:00
draft = false
description = "Learn how to use the dotenv module in JavaScript for loading environment variables, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dotenv tutorial

last modified last modified October 18, 2023

 

In this article we show how to load environment variables in JavaScript using
the dotenv module.

## The dotenv module

The *dotenv* is a zero-dependency module that loads environment
variables from a .env file into process.env.
Storing configuration in the environment separate from code is based on
the Twelve-Factor App methodology.

## Environment variables

Environment variables allow us to manage the configuration of our applications
separately from our codebase. Separating configurations makes it easier for our
application to be deployed in different environments.

Environment variables are variables external to our application which reside
in the OS or the container where the production application is running. Because
development is mostly done on local machines, environment variables are put
either to local environment variables with commands such as set
or export, or stored in the local .env file.

By convention, the variables are written in uppercase letters (e.g. PORT).

Common examples of configuration data that are stored in environment variables
include:

  - HTTP port

  - database connection string

  - location of static files

  - endpoints of external services

The .env file *should never* be committed to the source code repository. We
must place the file into the .gitignore file. (When using git.)

Modern editors have support for .env files; for instance, the code
has the DotENV extension.

## The .env parsing rules

Here are some basic parsing engine rules:

  - BASIC=basic becomes {BASIC: 'basic'}

  - empty lines are skipped

  - comments start with #

  - empty values become empty strings; BASIC= becomes {BASIC: ''}

  - inner quotes are maintained

Existing environment variables are not modified; they are skipped.

## Dotenv set up

We install the dotenv module with npm.

$ node -v
v11.5.0

We use Node version 11.5.0.

$ npm init -y

We initiate a new Node application.

$ npm i dotenv

We install dotenv with npm i dotenv command.

## Dotenv simple example

In the first example, read configuration data from the
.env file.

.env
  

HOST = localhost
DATABASE = ydb
PORT = 5432

We have three variables: HOST, DATABASE, and
PORT. We adhere to the naming convention by using uppercase
letters.

simple.js
  

require('dotenv').config()

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

console.log(hostname);
console.log(database);
console.log(port);

In the example, we read the three variables and print them to
the console.

require('dotenv').config()

We load the dotenv library and call the config
method, which loads the variables into the process.env.

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

We read the three variables from process.env.

console.log(hostname);
console.log(database);
console.log(port);

Finally, the variables are printed to the terminal.

$ node simple.js
localhost
ydb
5432

## Dotenv preloading

We can use the --require (-r) command line option to preload dotenv. 
By doing this, we do not need to require and load dotenv in the application.  

.env
  

HOST = localhost
DATABASE = ydb
PORT = 5432

We have the same variables.

preload.js
  

const hostname = process.env.HOST;  
const database = process.env.DATABASE;  
const port = process.env.PORT;
const user = process.env.USER;

console.log(hostname);
console.log(database);
console.log(port);
console.log(user);

In this example, we do not require the dotenv module. 
In addition, we read a variable that is set in the OS environment.

$ set USER=user7
$ node -r dotenv/config preload.js
localhost
ydb
5432
user7

On Windows, we use set to define environment variables. 
(Use export on Linux). The variables are printed OK. 

## Source

[dotenv Github page](https://github.com/motdotla/dotenv)

In this article we have used the dotenv module to read environment variables 
from the  .env file.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)