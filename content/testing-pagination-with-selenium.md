+++
title = "Testing Pagination with Selenium"
date = 2025-08-29T20:11:43.891+01:00
draft = false
description = "A comprehensive guide to developing a Flask application with pagination using SQLite, including Selenium-based testing."
image = ""
imageBig = ""
categories = ["selenium"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Testing Pagination with Selenium

last modified March 22, 2025

This tutorial provides a detailed walkthrough for constructing a Flask
application featuring pagination, integrated with an SQLite database. It
includes generating 100 sample data rows and employs Selenium for automated
testing of the pagination functionality. The application adheres to Flask's
recommended application factory pattern for modularity and scalability.

## Project Structure

The following describes the structure of the application.

flask_pagination/
├── instance/
│   └── example.db  (SQLite database, created at runtime)
├── flask_pagination/
│   ├── __init__.py  (Application factory)
│   ├── db.py        (Database initialization and utilities)
│   ├── routes.py    (Route definitions)
│   └── templates/
│       └── index.html  (HTML template)
├── tests/
│   └── test_app.py  (Selenium tests)
├── run.py           (Entry point to run the app)
└── requirements.txt

## Set Up the Flask Application

The application uses the factory pattern (create_app) for
modularity and stores an SQLite database in the instance/ directory
for isolation. It implements pagination to display 10 items per page from 100
total rows, and includes CLI commands (init-db and
populate-db) for setting up the database. The database is
initialized with an items table and populated with 100 rows labeled
'Item 1' to 'Item 100.' Selenium tests configure a test app and database,
confirm pagination functionality across various pages, and clean up temporary
files after testing.

### Entry Point

This script serves as the entry point to launch the Flask application,
utilizing the application factory pattern for instantiation.

run.py
  

from flask_pagination import create_app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

The run.py file is the primary executable for starting the Flask
application. It imports the create_app function from the
flask_pagination package and invokes it to instantiate the
application object. The app.run(debug=True)
command launches the development server with debugging enabled, facilitating
real-time error tracking and automatic reloading during development.

### Application Factory

This module establishes the application factory, configuring essential settings
and integrating blueprints and database utilities.

flask_pagination/__init__.py
  

from flask import Flask
import click
import os

def create_app(test_config=None):
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    
    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Load configuration
    if test_config is None:
        app.config.from_mapping(
            DATABASE=os.path.join(app.instance_path, 'example.db'),
        )
    else:
        app.config.from_mapping(test_config)

    # Register database commands
    from . import db
    db.init_app(app)

    # Register routes
    from . import routes
    app.register_blueprint(routes.bp)

    return app

The __init__.py file defines the create_app function,
central to Flask's application factory pattern. It initializes a Flask instance
with a relative instance path for configuration files and ensures the instance
directory exists using os.makedirs. 

Configuration is set dynamically: the default SQLite database path is assigned
unless overridden by a test configuration. The function integrates database
utilities via db.init_app and registers the routes blueprint,
returning a fully configured application instance.

### Database Handling

This module oversees SQLite database connectivity, schema creation, and data
population with custom CLI commands.

flask_pagination/db.py
  

import sqlite3
import click
from flask import current_app, g

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    db.execute('DROP TABLE IF EXISTS items')
    db.execute('CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT)')
    db.commit()

def populate_db():
    db = get_db()
    for i in range(1, 101):
        db.execute('INSERT OR IGNORE INTO items (id, name) VALUES (?, ?)', (i, f'Item {i}'))
    db.commit()

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(populate_db_command)

@click.command('init-db')
def init_db_command():
    """Initialize the database."""
    init_db()
    click.echo('Initialized the database.')

@click.command('populate-db')
def populate_db_command():
    """Populate the database with 100 sample items."""
    populate_db()
    click.echo('Database populated with 100 items.')

The db.py module manages database operations for the Flask application. The
get_db function establishes a connection to the SQLite database,
storing it in Flask's g object for reuse within a request context,
with rows returned as dictionary-like objects. close_db ensures
connections are closed post-request. 

The init_db function creates a fresh items table,
dropping any existing one, while populate_db inserts 100 rows
(e.g., 'Item 1' to 'Item 100'). The init_app function integrates
these with the app, adding CLI commands (init-db and
populate-db) for database management, enhancing usability.

### Routes

This module implements the application's routing and pagination logic using a
Flask Blueprint for modularity.

flask_pagination/routes.py
  

from flask import Blueprint, render_template, request
from .db import get_db
import math

bp = Blueprint('main', __name__)

def get_items(page, per_page=10):
    offset = (page - 1) * per_page
    db = get_db()
    items = db.execute('SELECT * FROM items LIMIT ? OFFSET ?', (per_page, offset)).fetchall()
    total_items = db.execute('SELECT COUNT(*) FROM items').fetchone()[0]
    return items, total_items

@bp.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = 10
    items, total_items = get_items(page, per_page)
    total_pages = math.ceil(total_items / per_page)
    
    return render_template('index.html', 
                         items=items,
                         page=page,
                         total_pages=total_pages,
                         per_page=per_page)

The routes.py module defines the application's routing logic within
a Blueprint named main. The get_items function
retrieves a page of items from the database, calculating an offset based on the
page number and items per page (defaulting to 10). 

It uses SQL LIMIT and OFFSET for pagination and
returns the items alongside the total count. The index route
handles the root URL, extracting the requested page from query parameters,
fetching the corresponding items, and rendering the index.html
template with pagination data, including current page, total pages, and items
per page.

### Template

This template renders a paginated table of items with navigation controls.

flask_pagination/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Pagination Example&lt;/title&gt;
    &lt;style&gt;
        .pagination {
            margin: 20px 0;
        }
        .pagination a {
            padding: 8px 16px;
            text-decoration: none;
            color: black;
        }
        .pagination a.active {
            background-color: #4CAF50;
            color: white;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Items List&lt;/h1&gt;
    &lt;table&gt;
        &lt;tr&gt;
            &lt;th&gt;ID&lt;/th&gt;
            &lt;th&gt;Name&lt;/th&gt;
        &lt;/tr&gt;
        {% for item in items %}
        &lt;tr&gt;
            &lt;td&gt;{{ item['id'] }}&lt;/td&gt;
            &lt;td&gt;{{ item['name'] }}&lt;/td&gt;
        &lt;/tr&gt;
        {% endfor %}
    &lt;/table&gt;

    &lt;div class="pagination"&gt;
        {% if page &gt; 1 %}
            &lt;a href="?page={{ page - 1 }}"&gt;« Previous&lt;/a&gt;
        {% endif %}

        {% for p in range(1, total_pages + 1) %}
            &lt;a href="?page={{ p }}" class="{% if p == page %}active{% endif %}"&gt;{{ p }}&lt;/a&gt;
        {% endfor %}

        {% if page &lt; total_pages %}
            &lt;a href="?page={{ page + 1 }}"&gt;Next »&lt;/a&gt;
        {% endif %}
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.html template presents a table of paginated items and
navigation links. It includes inline CSS to style pagination controls,
highlighting the active page in green. The table displays item IDs and names
dynamically using Jinja2's for loop over the items
list. Pagination links include 'Previous' and 'Next' buttons, conditionally
shown based on the current page, and numbered links for each page, generated via
a range loop. This structure ensures an intuitive user interface
for navigating the dataset.

## Selenium Unit Tests

This module contains Selenium-based unit tests to validate the pagination
functionality of the Flask application.

tests/test_app.py
  

import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import os
from flask_pagination import create_app

class TestPagination(unittest.TestCase):
    def setUp(self):
        # Set up Flask app with test configuration including DATABASE
        self.app = create_app({
            'TESTING': True,
            'DATABASE': os.path.join(os.path.abspath(os.path.dirname(__file__)), '..', 'instance', 'test_example.db')
        })
        self.client = self.app.test_client()
        
        # Initialize and populate database within app context
        with self.app.app_context():
            from flask_pagination.db import init_db, populate_db
            init_db()
            populate_db()
        
        # Start Flask server in a separate thread
        import threading
        self.server_thread = threading.Thread(target=self.app.run, kwargs={'port': 5000})
        self.server_thread.daemon = True
        self.server_thread.start()
        time.sleep(1)  # Give server time to start
        
        # Set up Selenium
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        self.driver.get('http://localhost:5000')
        time.sleep(1)  # Wait for page to load

    def tearDown(self):
        self.driver.quit()
        # Clean up test database
        with self.app.app_context():
            db_path = self.app.config['DATABASE']
            if os.path.exists(db_path):
                os.remove(db_path)

    def test_initial_page_load(self):
        rows = self.driver.find_elements(By.XPATH, '//table//tr[td]')
        self.assertEqual(len(rows), 10)
        first_item = self.driver.find_element(By.XPATH, '//table//tr[td][1]/td[2]').text
        last_item = self.driver.find_element(By.XPATH, '//table//tr[td][10]/td[2]').text
        self.assertEqual(first_item, 'Item 1')
        self.assertEqual(last_item, 'Item 10')

    def test_pagination_next(self):
        next_button = self.driver.find_element(By.LINK_TEXT, 'Next »')
        next_button.click()
        time.sleep(1)
        rows = self.driver.find_elements(By.XPATH, '//table//tr[td]')
        self.assertEqual(len(rows), 10)
        first_item = self.driver.find_element(By.XPATH, '//table//tr[td][1]/td[2]').text
        last_item = self.driver.find_element(By.XPATH, '//table//tr[td][10]/td[2]').text
        self.assertEqual(first_item, 'Item 11')
        self.assertEqual(last_item, 'Item 20')

    def test_pagination_specific_page(self):
        page_5 = self.driver.find_element(By.LINK_TEXT, '5')
        page_5.click()
        time.sleep(1)
        rows = self.driver.find_elements(By.XPATH, '//table//tr[td]')
        self.assertEqual(len(rows), 10)
        first_item = self.driver.find_element(By.XPATH, '//table//tr[td][1]/td[2]').text
        last_item = self.driver.find_element(By.XPATH, '//table//tr[td][10]/td[2]').text
        self.assertEqual(first_item, 'Item 41')
        self.assertEqual(last_item, 'Item 50')

    def test_last_page(self):
        page_10 = self.driver.find_element(By.LINK_TEXT, '10')
        page_10.click()
        time.sleep(1)
        rows = self.driver.find_elements(By.XPATH, '//table//tr[td]')
        self.assertEqual(len(rows), 10)
        first_item = self.driver.find_element(By.XPATH, '//table//tr[td][1]/td[2]').text
        last_item = self.driver.find_element(By.XPATH, '//table//tr[td][10]/td[2]').text
        self.assertEqual(first_item, 'Item 91')
        self.assertEqual(last_item, 'Item 100')

if __name__ == '__main__':
    unittest.main()

The test_app.py module employs Selenium to automate testing of the Flask
application's pagination. The setUp method configures a test-specific Flask
instance with a temporary database, initializes and populates it, and launches
the server in a separate thread. Selenium's Chrome driver is initialized to
access the app. tearDown ensures cleanup by closing the browser and removing
the test database. 

The test_initial_page_load verifies the first page loads 10 rows,
with items 'Item 1' to 'Item 10'. The test_pagination_next confirms
clicking 'Next' shows 'Item 11' to 'Item 20'. The
test_pagination_specific_page checks page 5 displays 'Item 41' to
'Item 50'. The test_last_page ensures page 10 shows 'Item 91' to
'Item 100'.

Each test uses XPath to target table rows and asserts the expected content,
validating pagination accuracy.

## Requirements

Specify the required Python packages in requirements.txt:

requirements.txt
  

flask
sqlite3
selenium
webdriver-manager
click

Install the dependencies using the following command:

pip install -r requirements.txt

## Running the Application

To run the application, set the FLASK_APP environment variable.
Use set FLASK_APP=flask_pagination for Windows (Command Prompt),
export FLASK_APP=flask_pagination for Unix/Linux/macOS, or
$env:FLASK_APP = "flask_pagination" for Windows PowerShell. 

Then, initialize the database with flask init-db, which outputs
Initialized the database. Populate the database using flask
populate-db, and it will confirm Database populated with 100
items. Start the application with python run.py and access
it at http://localhost:5000 to view the paginated table.

Run tests using python -m tests.test_app. The tests generate a
temporary database, perform checks, and clean up afterward.

In this article, we have created a Flask application that uses pagination to
display 10 items per page from 100 total rows. Unittests are written for testing 
this functionality with Selenium library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
experience spanning many years. Since 2007, I have authored over 1400
programming articles and 8 e-books. Additionally, I possess more than eight
years of experience in teaching programming concepts.

List [all Python tutorials](/all/#python).