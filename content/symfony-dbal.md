+++
title = "Symfony DBAL"
date = 2025-08-29T20:12:42.324+01:00
draft = false
description = "Symfony DBAL tutorial shows how to use the Doctrine DBAL component to work with a database in a Symfony application."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony DBAL

last modified July 5, 2020 

Symfony DBAL tutorial shows how to use the Doctrine DBAL component to work
with a database in a Symfony application.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework
for web projects. Symfony was published as free software in 2005. Symfony was
inspired by Ruby on Rails, Django, and the Spring framework.

## Doctrine DBAL component

Doctrine Database Abstraction Layer (DBAL) is an abstraction
layer that sits on top of PDO and offers an intuitive and flexible API
for communicating with the most popular relational databases.
DBAL library makes it easy to execute queries and perform other
database actions.

## Symfony DBAL example

In the following example, we create a simple Symfony application that
reads data using DBAL. We use MySQL database.

$ symfony new symdbal

With symfony CLI, we create a new Symfony skeleton project.

$ cd symdbal

We go to the project directory.

$ php bin/console --version
Symfony 5.0.8 (env: dev, debug: true)

We use Symfony version 5.0.8.

$ composer require symfony/orm-pack

We install the symfony/orm-pack, which contains the DBAL
API.

$ composer require maker --dev

In addition, we install the maker component. The maker package
provides scaffolding.

countries_mysql.sql
  

CREATE TABLE countries(id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

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

This is some test data. It creates a small table in MySQL. We can
execute the file with the source command.

.env
  

...
DATABASE_URL=mysql://user12:s$cret@localhost:3306/mydb

In the .env file, we configure the database URL.

$ php bin/console make:controller HomeController

The HomeController is created with the Symfony maker.

src/Controller/HomeController.php
  

&lt;?php

namespace App\Controller;

use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/home", name="home")
     * @param Connection $conn
     * @return JsonResponse
     */
    public function index(Connection $conn): JsonResponse
    {
        $queryBuilder = $conn-&gt;createQueryBuilder();
        $data = $queryBuilder-&gt;select('*')-&gt;from('countries')-&gt;execute()-&gt;fetchAll();

        return $this-&gt;json([
            'data' =&gt; $data
        ]);
    }
}

The controller method executes a query that fetches all rows from the
countries table and returns it as JSON data. Note that for
simplicity reasons, we have placed the query builder into the controller. In
production applications, there should also be a service layer and a repository.

public function index(Connection $conn)
{

The DBAL Connection object is injected into the method
variable.

$queryBuilder = $conn-&gt;createQueryBuilder();

We create a QueryBuilder from the connection.

$data = $queryBuilder-&gt;select('*')-&gt;from('countries')-&gt;execute()-&gt;fetchAll();

We execute the query and fetch all rows.

return $this-&gt;json([
    'data' =&gt; $data
]);

The data is returned in JSON format.

$ symfony serve

The web server is started.

$ curl localhost:8000/home
{"data":[{"id":"1","name":"China","population":"1382050000"},
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

We use the curl tool to execute the GET request.

This was a simple introductory tutorial which showed how to set up Doctrine
DBAL in Symfony.

List [all Symfony tutorials](/all#symfony).