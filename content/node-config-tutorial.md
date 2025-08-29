+++
title = "Node-config tutorial"
date = 2025-08-29T20:01:30.868+01:00
draft = false
description = "Learn how to use the Node-config module in JavaScript for managing application configurations, with examples and best practices."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Node-config tutorial

last modified last modified October 18, 2023

 

In this article we show how to create configuration files for Node
applications with node-config module.

## Node-config

Node-config creates configuration files for application deployments.

Node-config allows us to define a set of default parameters and extend them for
different deployment environments (development, qa, staging, production, etc.).

The configuration files are located in the default config
directory. The location can be overriden with the NODE_CONFIG_DIR
environment variable. The NODE_ENV environment variable contains
the name of our application's deployment environment; it is
development by default.

Node config supports various configuration file formats, including JSON, YAML,
properties, or XML. The default configuration file is default.json
(or default.yaml, default.xml). If we use a production
deployment, then the configuration is loaded from production.json.

## Setting up Node-config

First, we install node-config.

$ npm init -y

We initiate a new Node application.

$ npm i config

We install node-config with nmp i config.

$ npm i js-yaml

In addition, we install js-yaml for YAML support.

## Node-config example

The following example retrieves configuration data with config
package.

config/default.json
  

{
    "app": {
        "port": 3000
    },
    "db": {
        "host": "localhost",
        "port": 27017,
        "name": "ydb"
    }
}

We have default.json in the config directory.

simple.js
  

const config = require('config');

let appPort = config.get('app.port');
console.log(`Application port: ${appPort}`);

let dbHost = config.get('db.host');
console.log(`Database host: ${dbHost}`);

let dbPort = config.get('db.port');
console.log(`Database port: ${dbPort}`);

let dbName = config.get('db.name');
console.log(`Database name: ${dbName}`);

console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

We load the config package and get the values 
with config.get function. The default deployment 
type is specified in NODE_ENV.

$ node simple.js
Application port: 3000
Database host: localhost
Database port: 27017
Database name: ydb
NODE_ENV: development

## Node-config example II

We change the configuration file to YAML and set a production deployment
environment.

config/default.yaml
  

app:
  port: 3000

db: 
  host: localhost
  port: 27017
  name: ydb

This is default.yaml file.

config/production.yaml
  

app:
  port: 3300

db: 
  host: localhost
  port: 27017
  name: mydb

This is production.yaml file.

simple.js
  

const config = require('config');

let appPort = config.get('app.port');
console.log(`Application port: ${appPort}`);

let dbHost = config.get('db.host');
console.log(`Database host: ${dbHost}`);

let dbPort = config.get('db.port');
console.log(`Database port: ${dbPort}`);

let dbName = config.get('db.name');
console.log(`Database name: ${dbName}`);

console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

The simple.js file is the same.

$ node simple.js
Application port: 3000
Database host: localhost
Database port: 27017
Database name: ydb
NODE_ENV: development

This is the output for the default environment. The configuration is loaded from
default.yaml.

$ set NODE_ENV=production
$ node simple.js
Application port: 3300
Database host: localhost
Database port: 27017
Database name: mydb
NODE_ENV: production

We change the NODE_ENV variable with the set command.
(Use export on Linux.) Now the configuration data is loaded from
production.yaml file.

## Source

[node-config Github page](https://github.com/node-config/node-config)

In this article we have used node-config package to create
configuration files for our Node.js application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)