+++
title = "Python Cerberus"
date = 2025-08-29T20:07:47.652+01:00
draft = false
description = "Python Cerberus tutorial shows how to validate data with Cerberus in Python. Cerberus provides powerful yet simple and lightweight data validation functionality for Python language."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Cerberus

last modified January 29, 2024

Python Cerberus tutorial shows how to validate data with Cerberus in Python.

## Cerberus

Cerberus is a Python validation library which provides powerful yet simple and
lightweight data validation functionality. It is designed to be easily
extensible, allowing for custom validation.

Cerberus works by defining a validation schema for data. The schema is
passed to the Validator and validated with validate.
It has a set of rules such as required, min, or max,
which are applied on the data.

Multiple rules can be applied on a data field. If the validation fails, we
can obtain the error messages with the errors attribute.

## Cerberus types

The following is a simple demonstration of Cerberus. With the
type rule, we set the expected data type of a field.

simple.py
  

#!/usr/bin/python

from cerberus import Validator

schema = {'name': {'type': 'string'}}
v = Validator(schema)

document = {'name': 'john doe'}

if v.validate(document):
    print('data is valid')
else:
    print('invalid data')

In the example, we validate a name field; we expect it to
be a string value.

from cerberus import Validator

We import the Validator class.

schema = {'name': {'type': 'string'}}

We define the schema. It is a Python dictionary. We specify
that the name field must be a string.

document = {'name': 'john doe'}

This is our data.

if v.validate(document):
    print('data is valid')
else:
    print('invalid data')

We validate the data with validate.

$ ./simple.py
data is valid

In the second example, we check for string and list types.

types.py
  

#!/usr/bin/python

from cerberus import Validator

v = Validator()
v.schema = {'words': {'type': ['string', 'list']}}

if v.validate({'words': 'falcon'}):
    print('valid data')
else:
    print('invalid data')

if v.validate({'words': ['falcon', 'sky', 'cloud']}):
    print('valid data')
else:
    print('invalid data')

The example validates that the words field is either
a string or a list.

## Cerberus required rule

The required rule makes the field mandatory.

required.py
  

#!/usr/bin/python

from cerberus import Validator

v = Validator()
v.schema = {'name': {'required': True, 'type': 'string'},
            'age': {'type': 'integer'}}

if v.validate({'age': 34}):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

The example has two data fields: name and age.
The name is a required field.

$ ./required.py
invalid data
{'name': ['required field']}

We have omitted the name field; therefore, the validation
fails.

## Cerberus min and max rules

The min and max rules set the minimum and maximum
values allowed for integer, float and number types.

For string types, we can use minlength and maxlength.

min_max.py
  

#!/usr/bin/python

from cerberus import Validator

v = Validator()
v.schema = {'name': { 'type': 'string', 'minlength': 2},
    'age': {'type': 'integer', 'min': 18, 'max': 65}}

if v.validate({'name': 'J', 'age': 4}):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

In the example, we set a minimum length for a string and minimum
and maximum size for an integer.

$ ./min_max.py
invalid data
{'age': ['min value is 18'], 'name': ['min length is 2']}

We have two validation errors.

## Cerberus regex rules

We can define more complex rules with regular expressions.

regex.py
  

#!/usr/bin/python

from cerberus import Validator

v = Validator()
v.schema = {"contact_details": {
    "type": "dict",
    "schema": {
        "phone": {
            "type": "string",
            "minlength": 10,
            "maxlength": 10,
            "regex": "^0[0-9]{9}$"
        },
        "email": {
            "type": "string",
            "minlength": 8,
            "maxlength": 255,
            "required": True,
            "regex": "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"
        }
    }
}}

if v.validate({'contact_details': {'phone': '0901123123',
                                   'email': 'john.doe@example.com'}}):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

In the example, we define validation rules for a phone and
email fields using regular expressions.

## Cerberus value coercion

Value coercion allows us to apply a callable to a value before the data validation.
The return value of the callable replaces the new value in the document.
Coercion can be used to convert values or sanitize data before it is validated.

coercing.py
  

#!/usr/bin/python

from cerberus import Validator
from datetime import datetime

def to_date(s):
    return datetime.strptime(s, '%Y-%m-%d')

v = Validator()
v.schema = {'start_date': {'type': 'datetime', 'coerce': to_date}}

if v.validate({'start_date': '2019-12-11'}):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

if v.validate({'start_date': '2019/12/11'}):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

In the example, we use a custom to_date function to
convert datatime values to a chosen format.

$ ./coercing.py
valid data
invalid data
{'start_date': ["field 'start_date' cannot be coerced: time data '2019/12/11' does not
match format '%Y-%m-%d'", 'must be of datetime type']}

## Working with YAML file

In the next example, we have data in a YAML file.

cities.yaml
  

cities:
  - Bratislava
  - Kosice
  - Trnava
  - Moldava
  - Trencin

The file contains a list of cities.

from_yaml.py
  

#!/usr/bin/python

from cerberus import Validator
import yaml

v = Validator()
v.schema = {'cities': {'type': 'list', 'schema': {'type': 'string'}}}

with open('cities.yaml') as f:

    data = yaml.load(f, Loader=yaml.FullLoader)
    print(data)

    if v.validate({'cities': data['cities']}):
        print('valid data')
    else:
        print('invalid data')
        print(v.errors)

We read data from the YAML file and validate it. The schema
rule sets that the defined rule is validated against all elements of
the list.

v = Validator()
v.schema = {'cities': {'type': 'list', 'schema': {'type': 'string'}}}

The cities field must be a list and all its elements must
be strings.

## Cerberus custom validator

We can create custom validator by extending from the Validator
class.

custom_validator.py
  

#!/usr/bin/python

from cerberus import Validator
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int

class PersonValidator(Validator):

     def validate_person(self, obj):

         return self.validate(obj.__dict__)

schema = {'name': { 'type': 'string', 'minlength': 2},
    'age': {'type': 'integer', 'min': 18, 'max': 65}}

v = PersonValidator(schema)

p = Person('John Doe', 2)

if v.validate_person(p):
    print('valid data')
else:
    print('invalid data')
    print(v.errors)

In the example, we define a custom validator for a Person
object.

In this article we have showed how to validate data in Python with Cerberus.

## Source

[Cerberus documentation](https://docs.python-cerberus.org/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).