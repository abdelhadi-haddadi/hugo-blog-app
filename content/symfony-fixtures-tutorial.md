+++
title = "Symfony Fixtures Tutorial"
date = 2025-08-29T20:12:42.308+01:00
draft = false
description = "Symfony Fixtures tutorial shows how to use fixtures with a many-to-many relationship between Authors and Books."
image = ""
imageBig = ""
categories = ["symfony"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Symfony Fixtures Tutorial

last modified March 3, 2025 

Symfony Fixtures tutorial shows how to use fixtures with a many-to-many
relationship between Authors and Books entities.

## Symfony

Symfony is a set of reusable PHP components and a PHP framework for
web projects. Symfony was published as free software in 2005. Fabien Potencier
is the original author of Symfony. Symfony was heavily inspired by the Spring
Framework.

## Fixtures

Fixtures are used to load a controlled set of data into a database.
They are useful for testing and development.

## Setting up the project

We start by creating a new Symfony project and installing the necessary
dependencies.

$ composer create-project symfony/skeleton symfony-fixtures "^7.2"
$ cd symfony-fixtures

We create a new Symfony 7.2 project and navigate to the project directory.

$ composer require symfony/orm-pack
$ composer require --dev symfony/maker-bundle

We install the ORM pack for database support and the maker bundle for
generating code.

$ composer require --dev doctrine/doctrine-fixtures-bundle

We install the fixtures bundle.

## Creating Entities

We create two entities: Author and Book, with a
many-to-many relationship.

$ php bin/console make:entity Author

We create the Author entity with fields: name (string).

src/Entity/Author.php
  

&lt;?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Author
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $name;

    #[ORM\ManyToMany(targetEntity: Book::class, mappedBy: 'authors')]
    private Collection $books;

    public function __construct()
    {
        $this-&gt;books = new ArrayCollection();
    }

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

    public function getBooks(): Collection
    {
        return $this-&gt;books;
    }

    public function addBook(Book $book): void
    {
        if (!$this-&gt;books-&gt;contains($book)) {
            $this-&gt;books-&gt;add($book);
            $book-&gt;addAuthor($this);
        }
    }

    public function removeBook(Book $book): void
    {
        if ($this-&gt;books-&gt;contains($book)) {
            $this-&gt;books-&gt;removeElement($book);
            $book-&gt;removeAuthor($this);
        }
    }
}

The Author entity has a many-to-many relationship with the
Book entity.

$ php bin/console make:entity Book

We create the Book entity with fields: title (string).

src/Entity/Book.php
  

&lt;?php

declare(strict_types=1);

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Book
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\ManyToMany(targetEntity: Author::class, inversedBy: 'books')]
    private Collection $authors;

    public function __construct()
    {
        $this-&gt;authors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this-&gt;id;
    }

    public function getTitle(): string
    {
        return $this-&gt;title;
    }

    public function setTitle(string $title): void
    {
        $this-&gt;title = $title;
    }

    public function getAuthors(): Collection
    {
        return $this-&gt;authors;
    }

    public function addAuthor(Author $author): void
    {
        if (!$this-&gt;authors-&gt;contains($author)) {
            $this-&gt;authors-&gt;add($author);
            $author-&gt;addBook($this);
        }
    }

    public function removeAuthor(Author $author): void
    {
        if ($this-&gt;authors-&gt;contains($author)) {
            $this-&gt;authors-&gt;removeElement($author);
            $author-&gt;removeBook($this);
        }
    }
}

The Book entity has a many-to-many relationship with the
Author entity.

$ php bin/console make:migration
$ php bin/console doctrine:migrations:migrate

We generate and run the migration to create the database tables.

## Using Fixtures

We use fixtures to populate the database with sample data.

src/DataFixtures/AppFixtures.php
  

&lt;?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Author;
use App\Entity\Book;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Create authors
        $author1 = new Author();
        $author1-&gt;setName('J.K. Rowling');
        $manager-&gt;persist($author1);

        $author2 = new Author();
        $author2-&gt;setName('George R.R. Martin');
        $manager-&gt;persist($author2);

        // Create books
        $book1 = new Book();
        $book1-&gt;setTitle('Harry Potter and the Philosopher\'s Stone');
        $book1-&gt;addAuthor($author1);
        $manager-&gt;persist($book1);

        $book2 = new Book();
        $book2-&gt;setTitle('A Game of Thrones');
        $book2-&gt;addAuthor($author2);
        $manager-&gt;persist($book2);

        $book3 = new Book();
        $book3-&gt;setTitle('Harry Potter and the Chamber of Secrets');
        $book3-&gt;addAuthor($author1);
        $manager-&gt;persist($book3);

        // Save all entities
        $manager-&gt;flush();
    }
}

The AppFixtures class populates the database with sample authors
and books, establishing the many-to-many relationship.

$ php bin/console doctrine:fixtures:load

We load the fixtures into the database.

## Displaying Data

We create a route to display the authors and their books.

src/Controller/AuthorController.php
  

&lt;?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Author;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AuthorController extends AbstractController
{
    #[Route('/authors', name: 'author_list')]
    public function list(EntityManagerInterface $em): Response
    {
        $authors = $em-&gt;getRepository(Author::class)-&gt;findAll();
        return $this-&gt;render('author/list.html.twig', ['authors' =&gt; $authors]);
    }
}

The AuthorController provides a route to list all authors and
their books.

templates/author/list.html.twig
  

{% extends 'base.html.twig' %}

{% block title %}Author List{% endblock %}

{% block body %}
&lt;h1&gt;Author List&lt;/h1&gt;
&lt;ul&gt;
    {% for author in authors %}
    &lt;li&gt;
        &lt;strong&gt;{{ author.name }}&lt;/strong&gt;
        &lt;ul&gt;
            {% for book in author.books %}
            &lt;li&gt;{{ book.title }}&lt;/li&gt;
            {% endfor %}
        &lt;/ul&gt;
    &lt;/li&gt;
    {% endfor %}
&lt;/ul&gt;
{% endblock %}

The Twig template displays the list of authors and their books.

## Running the Example

$ php bin/console server:start

We start the development server.

$ curl localhost:8000/authors

We view the author list in HTML by visiting the URL in a browser.

In this tutorial, we used Symfony fixtures to populate a database with
Authors and Books entities in a many-to-many
relationship.

List [all Symfony tutorials](/all/#symfony).