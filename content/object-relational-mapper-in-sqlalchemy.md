+++
title = "Object Relational Mapper in SQLAlchemy"
date = 2025-08-29T19:52:52.549+01:00
draft = false
description = "In this part of the SQLAlchemy tutorial, we cover the SQLAlchemy's Object Relational Mapper."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../exprlang/)

# Object Relational Mapper in SQLAlchemy

last modified July 6, 2020 

In this part of the SQLAlchemy tutorial, we cover
the SQLAlchemy's Object Relational Mapper.

## Object Relational Mapping

Programming with the Python database API gives developers full power of
direct access to the database. This direct access has some disadvantages too.
They are noticeable especially in larger projects. We mix two languages 
together: SQL and Python. The consequence is that it makes SQL statements
harder to test and maintain. In a typical web application, we have HTML,
CSS, JavaScript, in addition to Python and SQL (or any other server side
programming language). The Python and SQL tied together makes the
project even more complex. In programming theory, we try to separate the
business logic from the data access and from the presentation. Therefore, a
solution that separates Python code from the SQL code is desirable.

Another problem is what we call the *object-relational impedance mismatch*. 
It is a set of conceptual and technical difficulties that are often
encountered when a relational database management system is being used
by a program written in an object-oriented programming language or style.
In Python, we work with data that are placed within objects. In database systems
the data is stored in tables. The programmers need to do conversions between the 
two ways of handling data. This is something that is not
related to the core problems of our applications.

One of the solutions is *object-relational mapping*. ORM tools address
the above mentioned issues. There are several ORM tools for the Python
language. The SQLAlchemy is one of the most widely used ones.

## SQLAlchemy ORM

The SQLAlchemy Object Relational Mapper maps (a) user-defined Python classes to database tables, 
(b) table rows to instance objects, and (c) columns to instance attributes. 
The SQLAlchemy ORM is built on the SQLAlchemy Expression Language.

When using ORM, we first configure database tables that we will be using. Then we define classes
that will be mapped to them. Modern SQLAlchemy uses *Declarative* system to do these
tasks. A *declarative base class* is created, which maintains a catalog of classes and tables.
A declarative base class is created with the declarative_base function.

## Session

After we have done the configurations, we create a session. A *Session* is 
the primary interface for persistence operations in the SQLAlchemy ORM.
It establishes and maintains all conversations between our program and the 
database.

## Creating a table

The following program creates a table in memory and then prints
the data to the console.

orm_create_table.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

eng = create_engine('sqlite:///:memory:')

Base = declarative_base()
 
class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)
        
Base.metadata.bind = eng        
Base.metadata.create_all()        
        
Session = sessionmaker(bind=eng)
ses = Session()    

ses.add_all(
   [Car(Id=1, Name='Audi', Price=52642), 
    Car(Id=2, Name='Mercedes', Price=57127),
    Car(Id=3, Name='Skoda', Price=9000),
    Car(Id=4, Name='Volvo', Price=29000),
    Car(Id=5, Name='Bentley', Price=350000),
    Car(Id=6, Name='Citroen', Price=21000),
    Car(Id=7, Name='Hummer', Price=41400),
    Car(Id=8, Name='Volkswagen', Price=21600)])
ses.commit()

rs = ses.query(Car).all()

for car in rs:
    print car.Name, car.Price

Eight cars are created in the Cars table.

Base = declarative_base()

A declarative base class is created with the declarative_base 
function.

class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)

The user-defined Car class is mapped to the Cars table. The class 
inherits from the declarative base class.

Base.metadata.bind = eng

The declarative Base is bound to the database engine.

Base.metadata.create_all() 

The create_all method creates all configured tables; in our case,
there is only one table.

Session = sessionmaker(bind=eng)
ses = Session() 

A session object is created.

ses.add_all(
   [Car(Id=1, Name='Audi', Price=52642), 
    Car(Id=2, Name='Mercedes', Price=57127),
...    

With the add_all method, we add the specified
instances of Car classes to the session.

ses.commit()

The changes are committed to the database with the commit method.

rs = ses.query(Car).all()

We query for all data from the Cars table. The query method
loads all instances of the Car class and its all method returns all 
results represented by the query as a list.

for car in rs:
    print car.Name, car.Price

We iterate through the result set and print two columns
for all returned rows.

$ ./orm_create_table.py 
Audi 52642
Mercedes 57127
Skoda 9000
Volvo 29000
Bentley 350000
Citroen 21000
Hummer 41400
Volkswagen 21600

This is the output of the example.

## Adding a new car

In the next example, we add a single car to the Cars table.

orm_add_car.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

eng = create_engine('sqlite:///test.db')

Base = declarative_base()
 
class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)
        
Session = sessionmaker(bind=eng)
ses = Session()    

c1 = Car(Name='Oldsmobile', Price=23450)
ses.add(c1)
ses.commit()

rs = ses.query(Car).all()

for car in rs:
    print car.Name, car.Price

The script connects to the SQLite database and adds a new
row to the Cars table.

eng = create_engine('sqlite:///test.db')

We connect to the SQLite test.db database.

Base = declarative_base()
 
class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)

The mapping of the user-defined class to the database table is performed.

Session = sessionmaker(bind=eng)
ses = Session()    

The session object, which is ORM's intermediary to the database, is created.

c1 = Car(Name='Oldsmobile', Price=23450)

A new instance of a mapped Car class is created.

ses.add(c1)

The add method adds the new object to the session.

ses.commit()

The changes are committed to the database.

$ ./orm_add_car.py 
Audi 52642
Mercedes 57127
Skoda 9000
Volvo 29000
Bentley 350000
Citroen 21000
Hummer 41400
Volkswagen 21600
Oldsmobile 23450

We verify that the new car was successfully added to the database.

## Filtering data

The session query's filter method is used to apply
a filter criterion on the query object. 

orm_query_like.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

eng = create_engine('sqlite:///test.db')

Base = declarative_base()
Base.metadata.bind = eng

class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)
            
Session = sessionmaker(bind=eng)
ses = Session()    

rs = ses.query(Car).filter(Car.Name.like('%en'))

for car in rs:
    print car.Name, car.Price

The example prints cars whose names end in 'en' string.

rs = ses.query(Car).filter(Car.Name.like('%en'))

The filter method takes a filtering criterion, which is an 
SQL expression object. The criterion is created with the like
method.

$ ./orm_query_like.py 
Citroen 21000
Volkswagen 21600

There are two cars in the table that end in 'en' string.

The in_ method implements the SQL IN operator.

orm_query_in.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker

eng = create_engine('sqlite:///test.db')

Base = declarative_base()
 
class Car(Base):
    __tablename__ = "Cars"
 
    Id = Column(Integer, primary_key=True)
    Name = Column(String)  
    Price = Column(Integer)
    
Session = sessionmaker(bind=eng)
ses = Session()    

rs = ses.query(Car).filter(Car.Id.in_([2, 4, 6, 8]))

for car in rs:
    print car.Id, car.Name, car.Price

The code example selects and prints columns for rows with Ids chosen
by the SQL IN operator.

rs = ses.query(Car).filter(Car.Id.in_([2, 4, 6, 8]))

The filtering criterion is created by the in_ method. 
The method takes a list of Ids.

$ ./orm_query_in.py 
2 Mercedes 57127
4 Volvo 29000
6 Citroen 21000
8 Volkswagen 21600

This is the output of the example.

## Foreign key

In the last example, we deal with a relationship between two tables.
A foreign key is established.

orm_foreign_key.py
  

#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker, relationship

eng = create_engine('sqlite:///test.db')

Base = declarative_base()
 
class Author(Base):
    __tablename__ = "Authors"
 
    AuthorId = Column(Integer, primary_key=True)
    Name = Column(String)  
    Books = relationship("Book")

class Book(Base):
    __tablename__ = "Books"
 
    BookId = Column(Integer, primary_key=True)
    Title = Column(String)      
    AuthorId = Column(Integer, ForeignKey("Authors.AuthorId"))    
                           
    Author = relationship("Author")                           
         
Session = sessionmaker(bind=eng)
ses = Session()   

res = ses.query(Author).filter(Author.Name=="Leo Tolstoy").first()

for book in res.Books:
    print book.Title

res = ses.query(Book).filter(Book.Title=="Emma").first()    
print res.Author.Name

We have Author and Book classes which are mapped to the 
Authors and Books database tables. (The SQL to create the 
tables is listed in the first chapter). A foreign key constraint is 
implemented between the two tables. A foreign key is defined by the ForeignKey 
type and the relationship function.

Books = relationship("Book")

A one to many relationship is built between the two classes. The first argument of the 
relationship function is the name of a class we build the
relationship with. As a result, the author object will have a Books attribute.

AuthorId = Column(Integer, ForeignKey("Authors.AuthorId"))

The AuthorId of the Book class is a foreign key. It is defined by the 
ForeignKey type. It references the AuthorId column in the Authors table.

Author = relationship("Author")

This line creates an Author attribute for the Book class.

res = ses.query(Author).filter(Author.Name=="Leo Tolstoy").first()

In this query, we get all books written by Leo Tolstoy. The filter method
applies a filtering criterion on the query. The first method gets the author
object.

for book in res.Books:
    print book.Title

We go through the result set and print all the retrieved books. The Books 
attribute was created with the relationship function.

res = ses.query(Book).filter(Book.Title=="Emma").first()    
print res.Author.Name

This query returns the author of the Emma title. The query returns the
book object, which has a built-in Author attribute.

$ ./orm_foreign_key.py 
War and Peace
Anna Karenia
Jane Austen

This is the output of the example.

In this part of the SQLAlchemy tutorial, we worked with SQLAlchemy's ORM.

[Contents](..)
[Previous](../exprlang/)