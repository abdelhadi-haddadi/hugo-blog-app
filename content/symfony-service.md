+++
title = "Symfony Service"
date = 2025-08-29T20:12:46.831+01:00
draft = false
description = "Symfony service tutorial shows how to create a service in Symfony. The service fetches data from a database."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Service

Last modified March 3, 2025

Symfony service tutorial shows how to create a service in Symfony. The service
fetches data from a database.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. The original
author of Symfony is Fabien Potencier. Symfony was heavily inspired by the
Spring Framework.

## Symfony Service

The functionality of a Symfony application is divided into smaller chunks called
services. A service is a PHP object. Services live in a Symfony service
container. There are many built-in services. Services can be autowired in a
Symfony application by using type hints.

A list of available services is generated with the 
php bin/console debug:container command.

# makes classes in src/ available to be used as services
# this creates a service per class whose id is the fully-qualified class name
App\:
    resource: '../src/*'
    exclude: '../src/{DependencyInjection,Entity,Migrations,Tests,Kernel.php}'

This is a piece of a services.yaml configuration file. The PHP
classes in the src directory can be automatically injected into our
code via type hints.

## Symfony Service Example

In the following example, we fetch data from a PostgreSQL database. The data
retrieval is delegated to a specific application component: a Symfony service.

$ symfony new symservice
$ cd symservice

We create a new Symfony skeleton project and locate to the newly created project
directory.

$ composer req doctrine orm

We install the Doctrine ORM module.

$ composer req maker --dev

We install the Symfony maker component.

countries_postgres.sql
    

CREATE TABLE countries (id serial PRIMARY KEY, name VARCHAR(100), population INT);

INSERT INTO countries(name, population) VALUES('China', 1382050000);
INSERT INTO countries(name, population) VALUES('India', 1313210000);
INSERT INTO countries(name, population) VALUES('USA', 324666000);
INSERT INTO countries(name, population) VALUES('Indonesia', 260581000);
INSERT INTO countries(name, population) VALUES('Brazil', 207221000);
INSERT INTO countries(name, population) VALUES('Pakistan', 196626000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Bangladesh', 162099000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Russia', 146838000);
INSERT INTO countries(name, population) VALUES('Japan', 126830000);
INSERT INTO countries(name, population) VALUES('Mexico', 122273000);
INSERT INTO countries(name, population) VALUES('Philippines', 103738000);

This is some test data. It creates a small table in PostgreSQL.

config/packages/doctrine.yaml
    

doctrine:
dbal:
    driver: 'pdo_pgsql'
    server_version: '13'
    charset: 'utf8'
    default_table_options:
        charset: 'utf8'
        collate: 'utf8_unicode_ci'
    url: '%env(resolve:DATABASE_URL)%'

By default, we have a PostgreSQL database configured for Doctqrine DBAL. Doctrine
Database Abstraction Layer (DBAL) is an abstraction layer that sits on top of
PDO and offers an intuitive and flexible API for communicating with the most
popular relational databases.

.env
    

DATABASE_URL=postgresql://user12:s$cret@localhost:5432/testdb

In the .env file, we configure the database URL.

$ php bin/console make:controller MyController

    A MyController is created with bin/console.

src/Controller/MyController.php
    

&lt;?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\CountryService;

class MyController extends AbstractController
{
    #[Route('/countries', name: 'countries')]
    public function index(CountryService $countryService): JsonResponse
    {
        $countries = $countryService-&gt;findAll();

        return $this-&gt;json([
            'countries' =&gt; $countries
        ]);  
    }
}

The MyController returns all rows from the
countries table in a JSON format. It uses the
CountryService service.

public function index(CountryService $countryService): JsonResponse

The CountryService is created via parameter injection.

src/Service/CountryService.php
    

&lt;?php

namespace App\Service;

use App\Repository\CountryRepository;

class CountryService 
{
    public function __construct(
        private readonly CountryRepository $countryRepository
    ) {}

    /**
    * Finds all countries
    */
    public function findAll(): array
    {
        return $this-&gt;countryRepository-&gt;findAll();
    }
}

    The CountryService uses the CountryRepository to fetch data.

public function __construct(
    private readonly CountryRepository $countryRepository
) {}

We autowire the CountryRepository, from which we retrieve the data.

src/Repository/CountryRepository.php
    

&lt;?php

namespace App\Repository;

use Doctrine\DBAL\Connection;

class CountryRepository
{
    public function __construct(
        private readonly Connection $conn
    ) {}

    /**
    * Finds all countries
    */
    public function findAll(): array
    {
        $queryBuilder = $this-&gt;conn-&gt;createQueryBuilder();
        $queryBuilder-&gt;select('*')-&gt;from('countries');

        return $queryBuilder-&gt;executeQuery()-&gt;fetchAllAssociative();
    }
}

CountryRepository contains a method that retrieves all rows from
the countries table. It uses Symfony's DBAL to execute queries.

public function findAll(): array
{
    $queryBuilder = $this-&gt;conn-&gt;createQueryBuilder();
    $queryBuilder-&gt;select('*')-&gt;from('countries');

    return $queryBuilder-&gt;executeQuery()-&gt;fetchAllAssociative();
}

We use DBAL QueryBuilder to fetch all rows from the table. Doctrine DBAL
QueryBuilder provides a convenient, fluent interface to creating and running
database queries.

$ symfony serve

    The web server is started.

$ curl localhost:8000/countries
{"countries":[{"id":"1","name":"China","population":"1382050000"},
{"id":"2","name":"India","population":"1313210000"},
{"id":"3","name":"USA","population":"324666000"},
{"id":"4","name":"Indonesia","population":"260581000"},
{"id":"5","name":"Brazil","population":"207221000"},
{"id":"6","name":"Pakistan","population":"196626000"},
{"id":"7","name":"Nigeria","population":"186988000"},
{"id":"8","name":"Bangladesh","population":"162099000"},
{"id":"9","name":"Nigeria","population":"186988000"},
{"id":"10","name":"Russia","population":"146838000"},
{"id":"11","name":"Japan","population":"126830000"},
{"id":"12","name":"Mexico","population":"122273000"},
{"id":"13","name":"Philippines","population":"103738000"}]}

We create a request with the curl command.

In this tutorial, we have created a simple service in Symfony. The service
fetches data from the database and is autowired in a Symfony controller.

List [all Symfony tutorials](/all/#symfony).