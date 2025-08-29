+++
title = "PHP config"
date = 2025-08-29T20:04:14.915+01:00
draft = false
description = "PHP config tutorial shows how to create configuration files in PHP. It uses the hassankhan/config package."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP config

last modified February 16, 2025

PHP config tutorial shows how to create configuration files in PHP. It uses
the hassankhan/config package.

The hassankhan/config is a lightweight configuration file loader
that supports PHP, INI, XML, JSON, and YAML files. If we work with YAML files,
we need to install symfony/yaml package.

## Setting up PHP config

First, we install the necessary packages.

$ composer req hassankhan/config symfony/yaml

We install two packages with composer. 

composer.json
  

{
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "require": {
        "hassankhan/config": "^2.0",
        "symfony/yaml": "^4.2"
    }
}

This is composer.json file. We also enable autoloading.

## PHP config JSON example

In the first example, we read the configuration data from a JSON 
file. 

config/db.json
  

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

We have db.json in the config directory.

read_json_cfg.php
  

&lt;?php

use Noodlehaus\Config;

require('vendor/autoload.php');

// $conf = Config::load('config/db.json');
$conf = new Config('config/db.json');

echo $conf-&gt;get('app.port') . "\n";

echo $conf-&gt;get('db.host') . "\n";
echo $conf-&gt;get('db.port') . "\n";
echo $conf-&gt;get('db.name') . "\n";

We load the configuration file either with Config::load
or Config. The values are retrieved with the get
method. The dot character is used to go through the hierarchy of attributes.

$ php read_json_cfg.php
3000
localhost
27017
ydb

## PHP YAML example

In the second example, we read configuration data from 
a YAML file.

config/db.yaml
  

app:
  port: 3000
  
db: 
  host: localhost
  port: 27017
  name: ydb

This is db.yaml file.

read_yaml_cfg.php
  

&lt;?php

use Noodlehaus\Config;
use Noodlehaus\Parser\Yaml;

require('vendor/autoload.php');

$conf = new Config('config/db.yaml', new Yaml);

echo $conf-&gt;get('app.port') . "\n";

echo $conf-&gt;get('db.host') . "\n";
echo $conf-&gt;get('db.port') . "\n";
echo $conf-&gt;get('db.name') . "\n";

The example reads configuration file from the db.yaml
file. 

$conf = new Config('config/db.yaml', new Yaml);

In the second parameter, we provide the configuration parser.

$ php read_yaml_cfg.php
3000
localhost
27017
ydb

## Merging configuration files

The merge method groups configuration files.

config/db.yaml
  

app:
  port: 3000
  
db: 
  host: localhost
  port: 27017
  name: ydb

This is the first configuration file.

config/app.yaml
  

version: 2.0-dev

This is the second configuration file.

merging.php
  

&lt;?php

use Noodlehaus\Config;
use Noodlehaus\Parser\Yaml;

require('vendor/autoload.php');

$conf = Config::load('config/db.yaml', new Yaml);
$conf2 = Config::load('config/app.yaml', new Yaml);

$conf-&gt;merge($conf2);

echo $conf-&gt;get('db.port') . "\n";
echo $conf-&gt;get('db.name') . "\n";
echo $conf-&gt;get('version') . "\n";

In the example we merge the two configuration files. We can access attributes 
from both files with one object.

## Code configuration with AbstractConfig

We can specify the configuration details in code by using AbstractConfig.

src/Config/AbstractConfig.php
  

&lt;?php

namespace App\Config;
    
use Noodlehaus\AbstractConfig;

class AppConfig extends AbstractConfig
{
    protected function getDefaults()
    {
        return [
            'host' =&gt; 'localhost',
            'port'    =&gt; 80,
            'servers' =&gt; [
                'host1',
                'host2',
                'host3'
            ]
        ];
    }
}

The configuration is specified in the AbstractConfig's getDefaults
file.

code_config.php
  

&lt;?php

require('vendor/autoload.php');

use Noodlehaus\Config;
use App\Config\AppConfig;

$conf = new AppConfig([]);

echo $conf-&gt;get('host') . "\n";
echo $conf-&gt;get('port') . "\n";
echo $conf-&gt;get('servers')[0] . "\n";

The example reads the configuration from the code.

## Source

[The hassankhan/config repository](https://github.com/hassankhan/config)

In this article we have shown how to read configuration files in PHP 
with hassankhan/config package.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP](/php/) tutorials.