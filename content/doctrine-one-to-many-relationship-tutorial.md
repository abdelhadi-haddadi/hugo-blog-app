+++
title = "Doctrine one-to-many relationship tutorial"
date = 2025-08-29T19:53:05.018+01:00
draft = false
description = "Doctrine one-to-many relationship tutorial shows how to create a one-to-many relationship in PHP with Doctrime ORM."
image = ""
imageBig = ""
categories = ["doctrine"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Doctrine one-to-many relationship tutorial

last modified July 10, 2020 

Doctrine one-to-many relationship tutorial shows how to create a one-to-many
relationship in PHP with Doctrime ORM.

## Doctrine

Doctrine is a set of PHP libraries primarily focused on providing
persistence services in PHP. Its main projects are an object-relational mapper
(ORM) and the database abstraction layer (DBAL).
Doctrine is an open source project made available for free under the MIT license.

## Doctrine entity relationships

Entity is a PHP object that is going to be persisted. Entity classes
are decorated with annotations such as @Id, @Table,
or @Column. There are relationships between entities (also called
associations.) The basic associations are one-to-one, one-to-many, and many-to-many.

Relationships may be unidirectional or bidirectional. In a unidirectional
relationship we have a navigational access in one direction, in a bidirectional
relationship, we have access in both directions. Suppose we have two entities:
User and Post. There is a one-to-many relationship between the entities; one
user may have multiple posts. In a unidirectional relationship, we can get posts
from a user. In a bidirectional, we can get the user from the posts as well.

## One-to-many relationship

In a one-to-many relationship, one record in a table can be associated with
one or more records in another table. For example, one customer can have
many orders.

The bidirectional one-to-many mapping requires the mappedBy attribute
to be on the one side and the inversedBy attribute on the many side.
There is no difference between a bidirectional one-to-many and a bidirectional
many-to-one relationship.

The @ManyToOne represents the owning side of a bidirectional assocation.
The @OneToMany represents the inverse side of a bidirectional assocation.
The owning side of a bidirectional relationship is the side that contains the foreign key.

The targetEntity property defines the entity to which we are creating 
the relationship.

The mappedBy attribute hints the name of the variable that maps the child 
entity in the parent entity. The inversedBy attribute hints the name of 
the variable that maps the parent entity in the child entity. 
Both attributes help Doctrine optimize the queries.

The @JoinColumn defines the name of the column that contains the foreign 
key. The foreign key is created on the table which has the annotation.
The annotation is no required; if not used, the necessary attributes are inferred.
If specified, the name and referencedColumnName attributes 
are required. The name specifies the column name that holds the foreign key 
identifier for the relation. The referencedColumnName specified the name of 
the primary key identifier that is used for joining of the relation.

## Doctrine installation

We install Doctrine and some helper tools.

$ composer req doctrine/dbal

We install Doctrine. Note that the DBAL layer is included in the doctrine/dbal
package.

$ composer req symfony/var-dumper
$ composer req tightenco/collect

We install Symfony's dumper and Laravel collections. We will be using
them in our examples.

$ composer dumpautoload

We generate a list of all classes that need to be included in the project.
The composer re-reads the composer.json file to build
up the list of files to autoload.

## Bootstrapping Doctrine CLI examples

We create a bootstrap file that will be included in all examples.

bootstrap.php
  

&lt;?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once "vendor/autoload.php";

$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration([__DIR__ . "/src"], $isDevMode);
$config-&gt;addEntityNamespace('', 'App\Entity');

$conn = ['driver' =&gt; 'pdo_pgsql', 'host' =&gt; 'localhost', 'dbname' =&gt; 'testdb',
    'port' =&gt; 5432, 'user' =&gt; 'postgres', 'password' =&gt; 's$cret'];

$em = EntityManager::create($conn, $config);

In the bootstrap file, we include the autoloading file and set up the
connection to the PostgreSQL database.

$isDevMode = true;
$config = Setup::createAnnotationMetadataConfiguration([__DIR__ . "/src"], $isDevMode);
$config-&gt;addEntityNamespace('', 'App\Entity');

We create a Doctrine ORM configuration for annotations.

$conn = ['driver' =&gt; 'pdo_pgsql', 'host' =&gt; 'localhost', 'dbname' =&gt; 'testdb',
  'port' =&gt; 5432, 'user' =&gt; 'postgres', 'password' =&gt; 's$cret'];

We specify the database configuration parameters.

$em = EntityManager::create($conn, $config);

We obtain the entity manager.

composer.json
  

{
    "require": {
        "doctrine/orm": "^2.6"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src"
        }
    },
    "require-dev": {
        "symfony/var-dumper": "^4.2"
    }
}

This is the composer.json file.

## Doctrine one-to-many bidirectional example

src/Entity/Task.php
  

&lt;?php

namespace App\Entity;

use App\Entity\User;

/**
 * @Entity
 * @Table(name="tasks")
 **/
class Task
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     *  @Column(type="string")
     */
    protected $name;

    /**
     * @ManyToOne(targetEntity="User", inversedBy="tasks", cascade={"persist", "remove"})
     * @JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;

    public function getId() : int
    {
        return $this-&gt;id;
    }

    public function getName() : string
    {
        return $this-&gt;name;
    }

    public function setName($name) : void
    {
        $this-&gt;name = $name;
    }

    public function addUser(User $user): void
    {
        $this-&gt;user = $user;
    }

    public function getUser() : User
    {
        return $this-&gt;user;
    }
}

src/Entity/User.php
  

&lt;?php

namespace App\Entity;

use App\Entity\Task;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity
 * @Table(name="users")
 **/
class User
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @Column(type="string")
     */
    protected $name;

    /**
     * @OneToMany(targetEntity="Task", mappedBy="user", cascade={"persist", "remove"})
     */
    protected $tasks;

    public function __construct()
    {
        $this-&gt;tasks = new ArrayCollection();
    }

    public function getId() : int
    {
        return $this-&gt;id;
    }

    public function getName() : string
    {
        return $this-&gt;name;
    }

    public function setName($name) : void
    {
        $this-&gt;name = $name;
    }

    public function getTasks() : Collection
    {
        return $this-&gt;tasks;
    }

    public function addTask(Task $task): void
    {
        $task-&gt;addUser($this);
        $this-&gt;tasks[] = $task;
    }
}

$ vendor\bin\doctrine orm:schema-tool:create

With the above command, we  create tables from the entities. 

create_users_tasks.php
  

&lt;?php

require_once 'bootstrap.php';

use App\Entity\User;
use App\Entity\Task;

$task1 = new Task();
$task1-&gt;setName('Task A');

$task2 = new Task();
$task2-&gt;setName('Task B');

$task3 = new Task();
$task3-&gt;setName('Task C');

$task4 = new Task();
$task4-&gt;setName('Task D');

$task5 = new Task();
$task5-&gt;setName('Task E');

$user1 = new User();
$user1-&gt;setName('John Doe');
$user1-&gt;addTask($task1);
$user1-&gt;addTask($task2);
$user1-&gt;addTask($task3);

$user2 = new User();
$user2-&gt;setName('Lucia Brenner');
$user2-&gt;addTask($task4);
$user2-&gt;addTask($task5);

$em-&gt;persist($task1);
$em-&gt;persist($task2);
$em-&gt;persist($task3);
$em-&gt;persist($task4);
$em-&gt;persist($task5);

$em-&gt;persist($user1);
$em-&gt;persist($user2);

$em-&gt;flush();

In the program, we create two users who have five tasks.

show_user_tasks.php
  

&lt;?php

require_once "bootstrap.php";

use App\Entity\User;

$userId = 2;

$repository = $em-&gt;getRepository(User::class);
$user = $repository-&gt;find($userId);

echo "User: " . $user-&gt;getName() . "\n";
dump($user-&gt;getTasks());

$tasks = $user-&gt;getTasks();

foreach ($tasks as $task)
{
   echo $task-&gt;getName() . "\n";
}

show_task_user.php
  

&lt;?php

require_once "bootstrap.php";

use App\Entity\Task;

$taskId = 5;

$repository = $em-&gt;getRepository(Task::class);
$task = $repository-&gt;find($taskId);

if ($task !== null)
{
    echo "Task: " . $task-&gt;getName() . "\n";
    echo "User: " . $task-&gt;getUser()-&gt;getName() . "\n";
}

In the example, we get a task and find out its user.

In this tutorial, we have

List [all PHP](/php/) tutorials.