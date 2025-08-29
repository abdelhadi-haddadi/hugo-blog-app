+++
title = "Symfony Entity"
date = 2025-08-29T20:12:42.329+01:00
draft = false
description = "Symfony Entity tutorial shows how to create entities in Symfony application."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Entity

last modified March 4, 2025 

Symfony Entity tutorial shows how to create entities in Symfony application.

## Symfony

Symfony is one of the leading PHP frameworks. It is a set of reusable
PHP components and a PHP framework for web projects. Symfony was published as
free software in 2005. Symfony was inspired by Django, RoR, and Spring
frameworks.

## Entity

An entity is a lightweight domain object which is to be persisted. Typically, an
entity represents a table in a relational database, and each entity instance
corresponds to a row in the table.

A repository is an abstraction of the persistence functionality. It allows to
store, retrieve and search for entity objects. In essence, a repository is a
collection of entity objects.

## Symfony entity example

In the following example, we work with the City entity.

$ symfony new syment --version=7.2 --webapp
$ cd syment

We create a new Symfony 7.2 project with the --webapp option, which
includes common bundles for web applications, and navigate to the project
directory.

$ php bin/console --version
Symfony 7.2.0 (env: dev, debug: true)

We work with Symfony 7.2.0 version.

$ composer require symfony/orm-pack

We install the Doctrine ORM pack, which includes annotations and other necessary
dependencies. The annot package is no longer needed separately as
it's bundled with symfony/orm-pack.

$ composer require --dev orm-fixtures maker

We install the fixtures and maker bundles for development purposes. Fixtures
load fake data into the database, and the maker bundle assists with scaffolding.

.env
  

DATABASE_URL="sqlite:///%kernel.project_dir%/var/ydb.db"

In the .env file, we define the database URL. We use SQLite for
simplicity in this example.

$ php bin/console doctrine:database:create

The doctrine:database:create command creates a new database based
on the provided URL.

$ php bin/console make:entity

Using the make:entity command, we create a new City
entity. This generates src/Entity/City.php and
src/Repository/CityRepository.php. We add two properties:
name (string, 255 characters) and population
(integer).

src/Entity/City.php
  

&lt;?php

namespace App\Entity;

use App\Repository\CityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CityRepository::class)]
#[ORM\Table(name: 'cities')]
class City
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column]
    private ?int $population = null;

    public function getId(): ?int
    {
        return $this-&gt;id;
    }

    public function getName(): ?string
    {
        return $this-&gt;name;
    }

    public function setName(string $name): static
    {
        $this-&gt;name = $name;
        return $this;
    }

    public function getPopulation(): ?int
    {
        return $this-&gt;population;
    }

    public function setPopulation(int $population): static
    {
        $this-&gt;population = $population;
        return $this;
    }
}

This is the City entity updated for Symfony 7.2. We use PHP 8
attribute syntax (e.g., #[ORM\Entity]) instead of PHPDoc
annotations. The entity maps to the cities table.

src/Repository/CityRepository.php
  

&lt;?php

namespace App\Repository;

use App\Entity\City;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository&lt;City&gt;
 *
 * @method City|null find($id, $lockMode = null, $lockVersion = null)
 * @method City|null findOneBy(array $criteria, array $orderBy = null)
 * @method City[]    findAll()
 * @method City[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, City::class);
    }
}

The CityRepository remains largely the same but uses modern PHP
type hints and docblock notation.

$ php bin/console make:migration

We generate a migration with make:migration to version the database
schema changes.

$ php bin/console doctrine:migrations:migrate

This applies the migration, creating a file like 
Version20250304120000.php (timestamp will vary).

src/Migrations/Version20250304120000.php
  

&lt;?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20250304120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create cities table';
    }

    public function up(Schema $schema): void
    {
        $this-&gt;addSql('CREATE TABLE cities (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          name VARCHAR(255) NOT NULL, population INTEGER NOT NULL)');
    }

    public function down(Schema $schema): void
    {
        $this-&gt;addSql('DROP TABLE cities');
    }
}

The migration file now includes a description and simplified SQLite-specific SQL.

$ php bin/console make:fixtures

We create a CityFixtures class with make:fixtures to
load sample data.

src/DataFixtures/CityFixtures.php
  

&lt;?php

namespace App\DataFixtures;

use App\Entity\City;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CityFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $cities = [
            ['name' =&gt; 'Bratislava', 'population' =&gt; 432000],
            ['name' =&gt; 'Budapest', 'population' =&gt; 1759000],
            ['name' =&gt; 'Prague', 'population' =&gt; 1280000],
            ['name' =&gt; 'Warsaw', 'population' =&gt; 1748000],
            ['name' =&gt; 'Los Angeles', 'population' =&gt; 3971000],
            ['name' =&gt; 'New York', 'population' =&gt; 8550000],
            ['name' =&gt; 'Edinburgh', 'population' =&gt; 464000],
            ['name' =&gt; 'Berlin', 'population' =&gt; 3671000],
        ];

        foreach ($cities as $data) {
            $city = new City();
            $city-&gt;setName($data['name']);
            $city-&gt;setPopulation($data['population']);
            $manager-&gt;persist($city);
        }

        $manager-&gt;flush();
    }
}

The CityFixtures class is updated with a more concise structure
using an array and a loop.

$ php bin/console doctrine:fixtures:load

This command loads the fixture data into the cities table.

src/Controller/CityController.php
  

&lt;?php

namespace App\Controller;

use App\Repository\CityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CityController extends AbstractController
{
    #[Route('/cities', name: 'cities')]
    public function index(CityRepository $cityRepository): JsonResponse
    {
        $cities = $cityRepository-&gt;findAll();

        if (empty($cities)) {
            return new JsonResponse(['message' =&gt; 'No data found'], Response::HTTP_NOT_FOUND);
        }

        return $this-&gt;json($cities);
    }
}

The CityController uses the new #[Route] attribute
syntax and returns a JsonResponse directly. The response handling
is streamlined.

$ symfony serve

We start the Symfony development server.

$ curl localhost:8000/cities
[{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},
{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},
{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},
{"id":8,"name":"Berlin","population":3671000}]

We test the endpoint with curl and retrieve the JSON data.

In this tutorial, we worked with an entity in a Symfony 7.2 application using
modern PHP and Symfony features.

List [all Symfony tutorials](/all/#symfony).