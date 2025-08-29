+++
title = "Python Faker"
date = 2025-08-29T20:08:29.540+01:00
draft = false
description = "Python Faker tutorial shows how to generate fake data in Python with Faker module. Fake data is often used for testing or filling databases with some dummy data."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Faker

last modified January 29, 2024

In this article we show how to generate fake data in Python with Faker package.
We use the joke2k/faker library.

## Faker

Faker is a Python library that generates fake data. Fake data is
often used for testing or filling databases with some dummy data. Faker is
heavily inspired by PHP's Faker, Perl's Data::Faker, and by Ruby's Faker.

## Setting up Faker

The package is installed with composer.

$ pip install Faker 

We install the Faker module.

$ pip install Dumper

In addition, we install the Dumper, which provides nicer console 
output when dumping variables.

## Faker generator

The faker.Faker creates and initializes a faker generator, which
can generate data by accessing properties named after the type of data. 

Faker delegates the data generation to providers. The default provider uses the
English locale. Faker supports other locales; they differ in level of
completion. 

## Simple Faker

The following example is a simple demonstration of Faker.

simple.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'name: {faker.name()}')
print(f'address: {faker.address()}')

print(f'text: {faker.text()}')

The example outputs a fake name, address, and text.

$ ./simple.py
name: Arthur Patton
address: 0638 Larsen Way
Tylermouth, CA 48344
text: Save general start bar. Become class both bank Mrs so myself.
Each difficult performance even. Total anyone develop her raise research both.
Laugh sport necessary tree. As during day up fall.

## Faking names

In the second example, we fake data related to user names.

names.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Name: {faker.name()}')
print(f'First name: {faker.first_name()}')
print(f'Last name: {faker.last_name()}')

print('--------------------------')

print(f'Male name: {faker.name_male()}')
print(f'Female name: {faker.name_female()}')

The example creates fake full names, first names, last names of males and 
females.

$ ./names.py
Name: Tara Brown
First name: Stephanie
Last name: Martin
--------------------------
Male name: John Banks
Female name: Lacey Roberts

## Faking jobs

Jobs are generated with job.

jobs.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

for _ in range(6):
    print(faker.job())

The example creates six fake jobs.

$ ./jobs.py
Town planner
Paediatric nurse
Geographical information systems officer
Water quality scientist
Engineer, maintenance
Designer, ceramics/pottery

## Faking locale data

The Faker supports localized data to some extent. 
The locale is passed to the constructor method.
Note that the locales are finished to various levels.

localized.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker('cz_CZ')

for i in range(3):

    name = faker.name()
    address = faker.address()
    phone = faker.phone_number()

    print(f'{name}, {address}, {phone}')

The example generates fake data in Czech language.

$ ./localized.py
Irena Novotná, Nad Šancemi 725
055 80 Bojkovice, 606 136 053
Stanislav Svoboda, Březanova 225
621 17 Bystřice pod Hostýnem, 727 057 251
Klára Moravcová, Neužilova 6/3
134 97 Česká Kamenice, 606 374 469

This is a sample output. Notice that Czech language has accents.

## Faking currencies

The following example creates fake data for currencies.

currencies.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'currency: {faker.currency()}')
print(f'currency name: {faker.currency_name()}')

print(f'currency code: {faker.currency_code()}')

The program generates fake currencies.

$ ./currencies.py
currency: ('ISK', 'Icelandic króna')
currency name: Israeli new shekel
currency code: DJF

## Faking words

Faker allows to create dummy words.

words.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'a word: {faker.word()}')
print(f'six words: {faker.words(6)}')

words = ['forest', 'blue', 'cloud', 'sky', 'wood', 'falcon']

print(f'customized unique words: {faker.words(3, words, True)}')

The example creates dummy words.

print(f'a word: {faker.word()}')

This line generates a fake word.

print(f'six words: {faker.words(6)}')

Here we generate six dummy words.

words = ['forest', 'blue', 'cloud', 'sky', 'wood', 'falcon']

print(f'customized unique words: {faker.words(3, words, True)}')

We can also create fake words from a predefined list of words.

$ ./words.py
a word: show
six words: ['value', 'its', 'those', 'wish', 'enter', 'hold']
customized unique words: ['forest', 'blue', 'sky']

## Faking profiles

Faker can create simple dummy profiles with simple_profile and 
extended profiles with profile.

profiles.py
  

#!/usr/bin/python

from faker import Faker
import dumper

faker = Faker()

profile1 = faker.simple_profile()
dumper.dump(profile1)

print('--------------------------')

profile2 = faker.simple_profile('M')
dumper.dump(profile2)

print('--------------------------')

profile3 = faker.profile(sex='F')
dumper.dump(profile3)

The example creates dummy profiles for both males and females.

$ ./profiles.py
&lt;dict at 0x20d590a7678&gt;:
  username: 'gmorgan'
  name: 'Jessica Clark'
  sex: 'F'
  address: '694 Joseph Valleys\nJohnfort, ME 81780'
  mail: 'bettybuckley@yahoo.com'
  birthdate: &lt;str at 0x20d5bcbd7b0&gt;: 'datetime.date(1938, 9, 18)'
--------------------------
&lt;dict at 0x20d5b0065e8&gt;:
  username: 'mrios'
  name: 'Harold Wagner'
  sex: 'M'
  address: '26439 Robinson Radial\nWest Meghanmouth, PA 85463'
  mail: 'josechoi@gmail.com'
  birthdate: &lt;str at 0x20d5bcbd7b0&gt;: 'datetime.date(1986, 8, 18)'
--------------------------
&lt;dict at 0x20d5bd24990&gt;:
  job: 'Engineer, communications'
  company: 'Jackson-Willis'
  ssn: '430-41-6118'
  residence: 'USNS Odom\nFPO AP 47095'
  current_location: &lt;tuple at 0x20d5bca9a88&gt;
    0: &lt;str at 0x20d5bd248a0&gt;: "Decimal('74.1885785')"
    1: &lt;str at 0x20d5bd248a0&gt;: "Decimal('119.951995')"
  blood_group: 'O-'
  website: ['http://roberson.com/']
  username: 'ygutierrez'
  name: 'Lindsay Walker'
  sex: 'F'
  address: '22968 Beverly Road Suite 918\nTimothyborough, SD 10494'
  mail: 'aliciamccall@yahoo.com'
  birthdate: &lt;str at 0x20d5bcbd7b0&gt;: 'datetime.date(1979, 1, 4)'

## Faking numbers

The Faker allows to generate random digits and integers.

fake_numbers.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Random int: {faker.random_int()}')
print(f'Random int: {faker.random_int(0, 100)}')
print(f'Random digit: {faker.random_digit()}')

The example generates random digits and integers.

print(f'Random int: {faker.random_int(0, 100)}')

We can specify the bounds in the random_int method.

$ ./fake_numbers.py
Random int: 5181
Random int: 91
Random digit: 9

## Faking hashes and uuids

Faker support for dummy hashes and uuids.  

hash_uuid.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'md5: {faker.md5()}')
print(f'sha1: {faker.sha1()}')
print(f'sha256: {faker.sha256()}')
print(f'uuid4: {faker.uuid4()}')

The example generates three fake hash and one uuid values.

$ ./hash_uuid.py
md5: aace57d56794686acec9eb190d401d46
sha1: 9f8f6af3089e7b5ed571591701afcfd9c2bb7a0e
sha256: 8b117b58599809f50735c701f598312b0f64203a8ffacde09af23db69cfd62d5
uuid4: 38092dcd-0e49-4ac0-b39b-7edf6db62290

## Faking internet related data

Faker has several accessors for faking internet related data. 

internet.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Email: {faker.email()}')
print(f'Safe email: {faker.safe_email()}')
print(f'Free email: {faker.free_email()}')
print(f'Company email: {faker.company_email()}')

print('------------------------------------')

print(f'Host name: {faker.hostname()}')
print(f'Domain name: {faker.domain_name()}')
print(f'Domain word: {faker.domain_word()}')
print(f'TLD: {faker.tld()}')

print('------------------------------------')

print(f'IPv4: {faker.ipv4()}')
print(f'IPv6: {faker.ipv6()}')
print(f'MAC address: {faker.mac_address()}')

print('------------------------------------')

print(f'Slug: {faker.slug()}')
print(f'Image URL: {faker.image_url()}')

The example shows various internet related data, including emails, domain 
names, slugs, IP addresses and URLs.

$ ./internet.py
Email: hescobar@acevedo.info
Safe email: jonesgregory@example.net
Free email: zchambers@yahoo.com
Company email: paulbailey@gordon-woods.com
------------------------------------
Host name: desktop-12.rodriguez-underwood.com
Domain name: henry.com
Domain word: davis
TLD: com
------------------------------------
IPv4: 192.31.48.26
IPv6: 75cd:2c43:37f5:774c:dd:5a2f:ae5d:bfc9
MAC address: 3d:b1:39:ec:c6:53
------------------------------------
Slug: of-street-fight
Image URL: https://placeimg.com/311/871/any

## Faking date and time

Faker has plenty of methods for faking date and time values.

date_time.py
  

#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Date of birth: {faker.date_of_birth()}')
print(f'Century: {faker.century()}')
print(f'Year: {faker.year()}')
print(f'Month: {faker.month()}')
print(f'Month name: {faker.month_name()}')
print(f'Day of week: {faker.day_of_week()}')
print(f'Day of month: {faker.day_of_month()}')
print(f'Time zone: {faker.timezone()}')
print(f'AM/PM: {faker.am_pm()}')

The first example shows fake methods for date of birth, datetime parts, 
timezone, and AM/PM.

$ ./date_time.py
Date of birth: 2008-08-07
Century: IV
Year: 1981
Month: 05
Month name: January
Day of week: Saturday
Day of month: 26
Time zone: Asia/Oral
AM/PM: AM

datetime2.py
  

```
#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Datetime this century: {faker.date_time_this_century()}')
print(f'Datetime this decade: {faker.date_time_this_decade()}')
print(f'Datetime this year: {faker.date_time_this_year()}')
print(f'Datetime this month: {faker.date_time_this_month()}')

print('-------------------------')

print(f'Date this century: {faker.date_this_century()}')
print(f'Date this decade: {faker.date_this_decade()}')
print(f'Date this year: {faker.date_this_year()}')
print(f'Date this month: {faker.date_this_month()}')

print('-------------------------')

TOTAL_SECONDS = 60*60*24*2 # two days

series = faker.time_series(start_date='-12d', end_date='now', precision=TOTAL_SECONDS)

for val in series:
    print(val[0])

```

The second example shows methods for generating datetime values in 
the current century, decade, year, or month. It also includes the generation 
of time series values.

$ ./date_time2.py
Datetime this century: 2008-11-26 15:47:01
Datetime this decade: 2022-11-12 07:15:20
Datetime this year: 2023-05-05 09:35:05
Datetime this month: 2023-08-05 15:37:58
-------------------------
Date this century: 2006-12-17
Date this decade: 2021-07-23
Date this year: 2023-02-03
Date this month: 2023-08-03
-------------------------
2023-07-27 15:59:46
2023-07-29 15:59:46
2023-07-31 15:59:46
2023-08-02 15:59:46
2023-08-04 15:59:46
2023-08-06 15:59:46

datetime3.py
  

```
#!/usr/bin/python

from faker import Faker

faker = Faker()

print(f'Unix time: {faker.unix_time()}')
print(f'Datetime: {faker.date_time()}')
print(f'iso8601: {faker.iso8601()}')
print(f'Date: {faker.date()}')
print(f'Time: {faker.time()}')

print('-------------------------')

print(f"Datetime between: {faker.date_time_between(start_date='-15y', end_date='now')}")
print(f"Date between: {faker.date_between()}")

print('-------------------------')

print(f"Future datetime: {faker.future_datetime()}")
print(f"Future date: {faker.future_date()}")
print(f"Past datetime: {faker.past_datetime()}")
print(f"Past date: {faker.past_date()}")

```

The third example shows methods for various datetime formats, for getting 
datetime values for a chosen range, and for generating future or past values.

$ ./date_time3.py
Unix time: 1309385098
Datetime: 1974-06-28 07:08:47
iso8601: 2003-06-13T07:08:07
Date: 1981-08-31
Time: 08:41:29
-------------------------
Datetime between: 2023-02-23 17:32:58
Date between: 1998-03-21
-------------------------
Future datetime: 2023-08-13 15:22:10
Future date: 2023-09-05
Past datetime: 2023-07-29 05:54:17
Past date: 2023-07-28

## Generate CSV fake data

Together with the csv module, we create a new CSV file with fake 
data.

fake_csv.py
  

#!/usr/bin/python

from faker import Faker
import csv

faker = Faker()

with open('users.csv', 'w', newline='') as f:

    fieldnames = ['id', 'first_name', 'last_name', 'occupation']
    writer = csv.DictWriter(f, fieldnames=fieldnames)

    writer.writeheader()

    for i in range(1, 101, 1):
        _id = i
        fname = faker.first_name()
        lname = faker.last_name()
        occupation = faker.job()

        writer.writerow({'id': _id, 'first_name': fname, 
            'last_name': lname, 'occupation': occupation})

The data contains id, first name, last name, and job title. The data is written 
to the users.csv file.

fieldnames = ['id', 'first_name', 'last_name', 'occupation']
writer = csv.DictWriter(f, fieldnames=fieldnames)

We use the dictionary writer with the given field names. 

writer.writeheader()

We write the header line.

for i in range(1, 101, 1):
    _id = i
    fname = faker.first_name()
    lname = faker.last_name()
    occupation = faker.job()

    writer.writerow({'id': _id, 'first_name': fname, 
        'last_name': lname, 'occupation': occupation})

We generate 100 users. Each user is written to the file with
writerow method.

## Generating XML data with Faker

In the following example, we generate XML data with Faker and Jinja2 
template. The XML file will contain users.

$ pip install jinja2

We install the Jinja2 template engine.

fake_xml.py
  

#!/usr/bin/python

from jinja2 import Environment, FileSystemLoader
from faker import Faker

class User:

    def __init__(self, first_name, last_name, occupation):

        self.first_name = first_name
        self.last_name = last_name
        self.occupation = occupation

faker = Faker()
users = []

for _ in range(10):

    first_name = faker.first_name()
    last_name = faker.last_name()
    occupation = faker.job()

    user = User(first_name, last_name, occupation)

    users.append(user)

file_loader = FileSystemLoader('templates')
env = Environment(loader=file_loader)

template = env.get_template('users.xml.j2')
output = template.render(users=users)

print(output, file=open('users.xml', 'w'))

The program generates a list of ten users. The list is passed to the 
Jinja2 template to be processed. The template is located in the templates
directory. The generated content is written to the users.xml file.

templates/users.xml.j2
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
    {% for user in users %}
    &lt;user id="{{ loop.index }}"&gt;
        &lt;firstname&gt;{{ user.first_name }}&lt;/firstname&gt;
        &lt;lastname&gt;{{ user.last_name }}&lt;/lastname&gt;
        &lt;occupation&gt;{{ user.occupation }}&lt;/occupation&gt;
    &lt;/user&gt;
    {% endfor %}
&lt;/users&gt;

In the template, we use the for directive to process the list 
of users. 

## Source

[Python Faker documentation](https://faker.readthedocs.io/en/master/)

In this article we have used Python Faker to generate fake data in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).