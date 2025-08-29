+++
title = "Bookshelf.js tutorial"
date = 2025-08-29T20:01:08.999+01:00
draft = false
description = "Learn how to program databases in JavaScript using the Bookshelf.js ORM, built on top of Knex.js, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Bookshelf.js tutorial

last modified last modified October 18, 2023

 

In this article we show how to program databases in JavaScript with the
Bookshelf.js ORM. Bookshelf.js is built on top of Knex.

## Bookshelf.js

Bookshelf.js is a JavaScript ORM for Node.js, built on the Knex
SQL query builder. It supports both promise based and traditional callback
interfaces. Bookshelf provides transaction support, eager/nested-eager relation
loading, polymorphic associations, and support for one-to-one, one-to-many,
and many-to-many relations.

Bookshelf.js works with PostgreSQL, MySQL, and SQLite3.

Object Relational Mapping (ORM) is a technique of accessing a relational
database from an object-oriented language. It is an abstraction of the
Python database API. In this article we work with PostgreSQL.

## Cities table

We work with the cities table.

cities_postgresql.sql
  

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id serial PRIMARY KEY, name VARCHAR(255), population INT);

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

## Setting up Bookshelf.js

We install Bookshelf.

$ node -v
v16.10.0

We use Node version 16.10.0.

$ npm init -y

We initiate a new Node application.

$ npm i pg
$ npm i knex bookshelf

We install PostgreSQL driver, Knex.js and Bookshelf.js.

## Bookshelf count rows

In the first example, we count the number of rows in the cities
table.

config/db.js
  

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'testdb',
        charset: 'utf8'
    }
});

module.exports.knex = knex;

In the db.js file, we define a Knex client object.

model/city.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);

const City = bookshelf.Model.extend({
    tableName: 'cities'
});

module.exports = City;

We have the model object. A model object maps to a row in a database table.

count_cities.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');

City.count().then((count) =&gt; {
    console.log(`There are ${count} cities`);
}).catch((err) =&gt; {
    console.log(err);
}).finally(() =&gt; {
    knex.destroy();
});

The example counts the number of rows in the cities table.
It uses callbacks.

$ node count_cities.js
There are 8 cities

count_cities2.js
  

```
const knex = require('./config/db').knex;
const City = require('./model/city');

async function countCities() {

    try {

        let count = await City.count();

        console.log(`There are ${count} cities`);
    } catch (e) {

        logger.info(`No data found ${e}`);
    } finally {

        knex.destroy();
    }
}

countCities();

```

In the second example, we use promises with async/await.

## Bookshelf fetch

The fetch gets a model from the database, using any
attributes currently set on the model to form a select query. With
the require option set, the returned response is rejected
with a NotFoundError if results are empty.

$ npm i winston

In this example, we also use the Winston logging module.

fetch_city.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');
const winston = require('winston');

const consoleTransport = new winston.transports.Console()
const options = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(options)

async function fetch_city() {

    try {

        let val = await City.where({ 'name': 'Bratislava' }).fetch({require:true});
        // console.log(val.toJSON());
        logger.info(val);
    } catch (e) {

        logger.info(`No data found ${e}`);
    } finally {

        knex.destroy();
    }
}

fetch_city();

The example retrieves the specified city.

let val = await City.where({ 'name': 'Bratislava' }).fetch({require:true});

We fetch a model whose name is 'Bratislava'.

logger.info(val);

We log the returned data.

$ node fetch_city.js
{"message":{"id":1,"name":"Bratislava","population":432000},"level":"info"}

## Bookshelf fetch_all

The fetch_all fetches a collection of models from the database,
using any query parameters currently set on the model to form a select query.

fetch_all.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');

async function fetch_all() {

    try {

        let vals = await City.fetchAll();
        console.log(vals.toJSON());
    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

fetch_all();

The example retrieves all cities.

let vals = await City.fetchAll();

We call the fetchAll function.

console.log(vals.toJSON());

The data is written to the console in JSON format.

$ node fetch_all.js
[ { id: 1, name: 'Bratislava', population: 432000 },
    { id: 2, name: 'Budapest', population: 1759000 },
    { id: 3, name: 'Prague', population: 1280000 },
    { id: 4, name: 'Warsaw', population: 1748000 },
    { id: 5, name: 'Los Angeles', population: 3971000 },
    { id: 6, name: 'New York', population: 8550000 },
    { id: 7, name: 'Edinburgh', population: 464000 },
    { id: 8, name: 'Berlin', population: 3671000 } ]

## Bookshelf forge helper

Bookshelf's forge is a simple helper function to instantiate a new
model without needing the new keyword.

forge_helper.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');

async function fetch_city() {

    try {

        let val = await City.forge({ 'id': '4' }).fetch();
        console.log(val.toJSON());
    } catch (e) {

        console.info(`No data found ${e}`);
    } finally {

        knex.destroy();
    }
}

fetch_city();

In the example, we select a city using forge helper.

## Bookshelf save city

A new model is saved with save.

save_city.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');

async function save_city() {

    try {

        let val = await City.forge({ 'name': 'Kyiv', 'population': 2884000}).save();
        console.log(val.toJSON());
    } catch (e) {

        console.log(`Failed to save data: ${e}`);
    } finally {

        knex.destroy();
    }
}

save_city();

The example saves a new city.

$ node save_city.js
{ name: 'Kyiv', population: 2884000, id: 9 }
$ node fetch_all.js
[ { id: 1, name: 'Bratislava', population: 432000 },
    { id: 2, name: 'Budapest', population: 1759000 },
    { id: 3, name: 'Prague', population: 1280000 },
    { id: 4, name: 'Warsaw', population: 1748000 },
    { id: 5, name: 'Los Angeles', population: 3971000 },
    { id: 6, name: 'New York', population: 8550000 },
    { id: 7, name: 'Edinburgh', population: 464000 },
    { id: 8, name: 'Berlin', population: 3671000 },
    { id: 9, name: 'Kyiv', population: 2884000 } ]

## Bookshelf orderBy

The orderBy function orders the retrieved data by the specified
column name and sort order. The order parameter is optional and defaults to
'ASC'.

order_by.js
  

const knex = require('./config/db').knex;
const City = require('./model/city');

async function fetch_city() {

    try {

        let vals = await City.forge().orderBy('name', 'DESC').fetchAll({require:true});
        console.log(vals.toJSON());
    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

fetch_city();

In the example we fetch all cities and order them by name in descending order.

$ node order_by.js
[ { id: 4, name: 'Warsaw', population: 1748000 },
  { id: 3, name: 'Prague', population: 1280000 },
  { id: 6, name: 'New York', population: 8550000 },
  { id: 5, name: 'Los Angeles', population: 3971000 },
  { id: 9, name: 'Kyiv', population: 2884000 },
  { id: 7, name: 'Edinburgh', population: 464000 },
  { id: 2, name: 'Budapest', population: 1759000 },
  { id: 1, name: 'Bratislava', population: 432000 },
  { id: 8, name: 'Berlin', population: 3671000 } ]

## Bookshelf one-to-one relationship

One-to-one relationships are defined with hasOne and belongsTo
functions.

employees_projects.sql
  

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS projects;

CREATE TABLE projects(id serial PRIMARY KEY, name VARCHAR(255));
INSERT INTO projects(name) VALUES('Project A');
INSERT INTO projects(name) VALUES('Project B');
INSERT INTO projects(name) VALUES('Project C');

CREATE TABLE employees(id serial PRIMARY KEY, project_id INT REFERENCES projects (id),
    name VARCHAR(255));
INSERT INTO employees(project_id, name) VALUES(2, 'John Doe');
INSERT INTO employees(project_id, name) VALUES(1, 'Lucia Smith');

We have employees and projects. An employee can
be assigned to one project only.

### Bookshelf hasOne

The hasOne function defines a one-to-one relationships between
models. The hasOne relation specifies that the table has exactly one of another
type of object, specified by a foreign key in the other table.

model/project.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);
const Employee = require('./employee');

const Project = bookshelf.Model.extend({
    tableName: 'projects',
    employee: function () {
        return this.hasOne(Employee);
    }
});

module.exports = Project;

The Project model contains the hasOne function.
By querying for a project, we can fetch its linked employee.

model/employee.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);

const Employee = bookshelf.Model.extend({
    tableName: 'employees'
});

module.exports = Employee;

This is the Employee model.

has_one.js
  

const knex = require('./config/db').knex;
const Project = require('./model/project');

async function doQuery() {

    try {

        let val = await Project.where({ id: 2 }).fetch({
            withRelated: ['employee']
        });

        console.log(val.toJSON());
    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

doQuery();

In the example, we fetch a project and its associated employee.

let val = await Project.where({ id: 3 }).fetch({
    withRelated: ['employee']
});

The withRelated option is specified to fetch the models of the
collection, eager loading any specified relations named on the model.
Without this option, we only get the project without its linked employee.

$ node has_one.js
{ id: 2,
  name: 'Project B',
  employee: { id: 1, project_id: 2, name: 'John Doe' } }

### Bookshelf belongsTo in one-to-one

The belongsTo function is used when a model is a member
of another target model. The foreign key is defined in the current (source)
model. The belongsTo function is used in one-to-one and
one-to-many relationships.

model/project.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);

const Project = bookshelf.Model.extend({
    tableName: 'projects'
});

module.exports = Project;

This is the Project model.

model/employee.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);
const Project = require('./project');

const Employee = bookshelf.Model.extend({
    tableName: 'employees',
    project: function () {
        return this.belongsTo(Project);
    }
});

module.exports = Employee;

The Employee contains the belongsTo
function.

belongs_to.js
  

const knex = require('./config/db').knex;
const Employee = require('./model/employee');

async function doQuery() {

    try {

        let val = await Employee.where({ id: 1 }).fetch({
            withRelated: ['project'], require: true
        });

        console.log(val.toJSON());

    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

doQuery();

In the example, we fetch an employee with its linked project.

$ node belongs_to.js
{ id: 1,
    project_id: 2,
    name: 'John Doe',
    project: { id: 2, name: 'Project B' } }

## Bookshelf one-to-many relationship

One-to-many relationships are defined with hasMany
and belongsTo functions.

users_tasks.js
  

DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users(id serial PRIMARY KEY, name VARCHAR(255));
INSERT INTO users(name) VALUES('John Doe');
INSERT INTO users(name) VALUES('Lucia Smith');

CREATE TABLE tasks(id serial PRIMARY KEY, user_id INT REFERENCES users (id),
    name VARCHAR(255));
INSERT INTO tasks(user_id, name) VALUES(1, 'Task A');
INSERT INTO tasks(user_id, name) VALUES(1, 'Task B');
INSERT INTO tasks(user_id, name) VALUES(1, 'Task C');
INSERT INTO tasks(user_id, name) VALUES(2, 'Task D');
INSERT INTO tasks(user_id, name) VALUES(2, 'Task E');

We have users and tasks. A user can have one or more
tasks to do. A single task can be owned only by one user.

### Bookshelf hasMany

The hasMany defines a one-to-many relationship between models.
The relation specifies that the current model has one or more rows in another
table which match on this model's primary key.

model/user.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);
const Task = require('./task');

const User = bookshelf.Model.extend({
    tableName: 'users',
    tasks: function() {
        return this.hasMany(Task);
      }
});

module.exports = User;

The User model contains the hasMany function.

model/task.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);

const Task = bookshelf.Model.extend({
    tableName: 'tasks',
});

module.exports = Task;

This is the Task model.

has_many.js
  

const knex = require('./config/db').knex;
const User = require('./model/user');

async function doQuery() {

    try {

        let val = await User.where({ id: 1 }).fetch({
            withRelated: ['tasks'], require: true
        });

        console.log(val.toJSON());

    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

doQuery();

In the example, we fetch a user with its tasks.

$ node has_many.js
{ id: 1,
    name: 'John Doe',
    tasks:
    [ { id: 1, user_id: 1, name: 'Task A' },
        { id: 2, user_id: 1, name: 'Task B' },
        { id: 3, user_id: 1, name: 'Task C' } ] }

The user with Id 1 has three tasks.

### Bookshelf belongsTo in one-to-many

In one-to-many multiplicity, the belongsTo is the inverse of hasMany
and is the one side of the association.

model/user.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
    tableName: 'users',
});

module.exports = User;

This is the User model.

model/task.js
  

const knex = require('../config/db').knex;
const bookshelf = require('bookshelf')(knex);
const User = require('./user');

const Task = bookshelf.Model.extend({
    tableName: 'tasks',
    user: function() {
        return this.belongsTo(User);
    }
});

module.exports = Task;

The Task model contains the belongsTo function.

belongs_to2.js
  

const knex = require('./config/db').knex;
const Task = require('./model/task');

async function doQuery() {

    try {

        let val = await Task.where({ id: 4 }).fetch({
            withRelated: ['user'], require: true
        });

        console.log(val.toJSON());

    } catch (e) {

        console.log(`Failed to fetch data: ${e}`);
    } finally {

        knex.destroy();
    }
}

doQuery();

In the example, we fetch a task with its associated user.

## Source

[Bookshelf documentation](https://bookshelfjs.org/)

In this article we have worked with the Bookshelf library. We have created a
few command line programs that interacted with PostgreSQL.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)