+++
title = "Symfony SQLite Tutorial"
date = 2025-08-29T20:12:46.834+01:00
draft = false
description = "Symfony SQLite tutorial shows how to use SQLite with Symfony 7.2, create routes for JSON output, and use fixtures."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony SQLite Tutorial

last modified March 3, 2025 

Symfony SQLite tutorial shows how to use SQLite with Symfony 7.2. We create
routes for JSON output, use fixtures to populate the database, and display
data in HTML.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Fabien Potencier
is the original author of Symfony. Symfony was heavily inspired by the Spring
Framework.

## SQLite

SQLite is a lightweight, serverless, self-contained SQL database
engine. It is ideal for small applications, prototypes, and testing.

## Setting up the project

We start by creating a new Symfony project and installing the necessary
dependencies.

$ composer create-project symfony/skeleton symfony-sqlite "^7.2"
$ cd symfony-sqlite

We create a new Symfony 7.2 project and navigate to the project directory.

$ composer require symfony/orm-pack
$ composer require --dev symfony/maker-bundle

We install the ORM pack for database support and the maker bundle for
generating code.

$ composer require symfony/validator
$ composer require symfony/serializer

We install the validator and serializer components for data validation and
JSON output.

## Configuring SQLite

We configure SQLite in the .env file.

.env
  

DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"

This sets up SQLite to use a file named data.db in the var
directory.

$ php bin/console doctrine:database:create

We create the SQLite database.

## Creating an Entity

We create a Product entity to store product data. 

$ php bin/console make:entity Product

We create the Product entity with fields: name (string)
and price (decimal).

src/Entity/Product.php
  

&lt;?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private string $price;

    // Getters and setters
    public function getId(): ?int
    {
        return $this-&gt;id;
    }

    public function getName(): string
    {
        return $this-&gt;name;
    }

    public function setName(string $name): void
    {
        $this-&gt;name = $name;
    }

    public function getPrice(): string
    {
        return $this-&gt;price;
    }

    public function setPrice(string $price): void
    {
        $this-&gt;price = $price;
    }
}

The Product entity now uses Decimal for the price
field to ensure precision for monetary values.

$ php bin/console make:migration
$ php bin/console doctrine:migrations:migrate

We generate and run the migration to create the database table.

## Using Fixtures

We use fixtures to populate the database with sample data.

$ composer require --dev doctrine/doctrine-fixtures-bundle

We install the fixtures bundle.

src/DataFixtures/ProductFixtures.php
  

&lt;?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ProductFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $products = [
            ['name' =&gt; 'Product A', 'price' =&gt; '19.99'],
            ['name' =&gt; 'Product B', 'price' =&gt; '29.99'],
            ['name' =&gt; 'Product C', 'price' =&gt; '39.99'],
        ];

        foreach ($products as $data) {
            $product = new Product();
            $product-&gt;setName($data['name']);
            $product-&gt;setPrice($data['price']);
            $manager-&gt;persist($product);
        }

        $manager-&gt;flush();
    }
}

The ProductFixtures class populates the database with sample products.
Note that the price values are now passed as strings.

$ php bin/console doctrine:fixtures:load

We load the fixtures into the database.

## Creating Routes for JSON Output

We create routes to output product data in JSON format.

src/Controller/ProductController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'product_list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $products = $em-&gt;getRepository(Product::class)-&gt;findAll();
        $data = [];

        foreach ($products as $product) {
            $data[] = [
                'id' =&gt; $product-&gt;getId(),
                'name' =&gt; $product-&gt;getName(),
                'price' =&gt; $product-&gt;getPrice(),
            ];
        }

        return $this-&gt;json($data);
    }

    #[Route('/products/{id}', name: 'product_show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        return $this-&gt;json([
            'id' =&gt; $product-&gt;getId(),
            'name' =&gt; $product-&gt;getName(),
            'price' =&gt; $product-&gt;getPrice(),
        ]);
    }
}

The ProductController provides two routes: one to list all products
and another to show a single product by ID. The price is now
returned as a string.

## Displaying Data in HTML

We create a route to display product data in HTML.

templates/product/list.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Product List{% endblock %}

{% block body %}
&lt;h1&gt;Product List&lt;/h1&gt;
&lt;table&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;ID&lt;/th&gt;
            &lt;th&gt;Name&lt;/th&gt;
            &lt;th&gt;Price&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
        {% for product in products %}
        &lt;tr&gt;
            &lt;td&gt;{{ product.id }}&lt;/td&gt;
            &lt;td&gt;{{ product.name }}&lt;/td&gt;
            &lt;td&gt;{{ product.price }}&lt;/td&gt;
        &lt;/tr&gt;
        {% endfor %}
    &lt;/tbody&gt;
&lt;/table&gt;
{% endblock %}

The Twig template displays the product list in an HTML table. The price
is displayed as a string.

src/Controller/ProductController.php
  

#[Route('/products/html', name: 'product_list_html', methods: ['GET'])]
public function listHtml(EntityManagerInterface $em): Response
{
    $products = $em-&gt;getRepository(Product::class)-&gt;findAll();
    return $this-&gt;render('product/list.html.twig', ['products' =&gt; $products]);
}

We add a route to render the product list in HTML.

## Running the Example

$ php bin/console server:start

We start the development server.

$ curl localhost:8000/products
[{"id":1,"name":"Product A","price":"19.99"}, ...]
$ curl localhost:8000/products/1
{"id":1,"name":"Product A","price":"19.99"}

We test the JSON routes with curl.

$ curl localhost:8000/products/html

We view the product list in HTML by visiting the URL in a browser.

In this tutorial, we used SQLite with Symfony 7.2, created routes for JSON
output, used fixtures to populate the database, and displayed data in HTML.

List [all Symfony tutorials](/all/#symfony).