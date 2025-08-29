+++
title = "Testing a Submit Form"
date = 2025-08-29T20:11:45.079+01:00
draft = false
description = "Learn to build a Flask app with a user form, SQLite database, and Selenium tests using Python."
image = ""
imageBig = ""
categories = ["selenium"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Testing a Submit Form

last modified March 23, 2025

This tutorial shows how to build a Flask app with a user form,
store data in SQLite, and test it with Selenium and unittest.

## Introduction

Flask is a lightweight Python web framework. Here, we create a
simple app to collect user data—first name, last name,
occupation, and salary—via a form, save it to a database,
and verify functionality with automated tests.

## Project Structure

user_form_app/
├── requirements.txt    # Dependencies
├── run.py             # App entry point
├── holy_grail_app/
│   ├── config.py      # Configuration
│   ├── db.py         # Database setup
│   ├── forms.py      # Form definition
│   ├── models.py     # Database model
│   ├── routes.py     # Routes
│   ├── __init__.py   # App factory
│   ├── static/
│   │   └── style.css # CSS styling
│   └── templates/
│       └── index.html # Form template
├── instance/
│   └── users.db      # SQLite database
└── tests/
    └── test_app.py   # Selenium tests

The project is structured to keep the application modular and
organized. The root directory contains requirements.txt
for dependencies and run.py to launch the app. Inside
holy_grail_app/, core files like config.py,
db.py, and routes.py handle setup, database,
and routing logic, respectively.

The static/ folder holds style.css for
styling, while templates/ contains index.html
for the form UI. The instance/ folder stores the SQLite
database (users.db), and tests/ includes
test_app.py for automated testing with Selenium.

## Flask Application Setup

holy_grail_app/__init__.py
  

from flask import Flask
import os

def create_app(app_config=None):

    app = Flask(__name__, instance_relative_config=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    if app_config is None:

        env_config = os.getenv("FLASK_ENV", "development")
        if env_config == "testing":
            app.config.from_object("holy_grail_app.config.TestingConfig")
        else:
            app.config.from_object("holy_grail_app.config.DevelopmentConfig")
    elif isinstance(app_config, dict):

        app.config.from_mapping(app_config)
    else:

        app.config.from_object(app_config)

    app.config.from_pyfile("config.py", silent=True)

    from . import db
    db.init_app(app)

    from . import routes
    app.register_blueprint(routes.bp)

    return app

This file defines the application factory function create_app,
which initializes the Flask app. The instance_relative_config=True
parameter tells Flask to look for configuration files in the instance/
folder, where users.db resides. The os.makedirs call
ensures this folder exists, silently skipping if it already does.

Configuration is loaded dynamically: if no app_config is provided,
it checks the FLASK_ENV environment variable (defaulting to
"development") and selects either DevelopmentConfig or
TestingConfig. It can also accept a dictionary or config object.
The database is initialized via db.init_app, and routes are
registered using a Blueprint from routes.py.

## Configuration

holy_grail_app/config.py
  

class Config:
    SECRET_KEY = 'your_default_secret_key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DEBUG = True
    DATABASE = 'users.db'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'

class TestingConfig(Config):
    TESTING = True
    DATABASE = 'test_users.db'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test_users.db'
    WTF_CSRF_ENABLED = False

The Config base class sets a SECRET_KEY for security
(should be unique in production) and disables SQLALCHEMY_TRACK_MODIFICATIONS
to optimize performance. DevelopmentConfig inherits these settings,
enables DEBUG for development features like auto-reloading, and
points to users.db via SQLALCHEMY_DATABASE_URI.

TestingConfig is tailored for testing, setting TESTING
to True, using a separate test_users.db to isolate test
data, and disabling WTF_CSRF_ENABLED to simplify form submission
in tests. These settings are loaded by create_app based on the
environment.

## Database Setup

This module integrates SQLite with Flask-SQLAlchemy. 

holy_grail_app/db.py
  

import sqlite3
import click
from flask import current_app, g
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

db = SQLAlchemy()

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
    db_sql = db.get_engine()
    with db_sql.connect() as conn:
        conn.execute(text('DROP TABLE IF EXISTS users'))
        conn.execute(text(
            'CREATE TABLE users (id INTEGER PRIMARY KEY, first_name TEXT, '
            'last_name TEXT, occupation TEXT, salary INTEGER)'))
        conn.commit()

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    db.init_app(app)

@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Initialized the database.')

The db = SQLAlchemy() line creates an ORM instance used throughout
the app. get_db manages SQLite connections, storing them in
g (Flask's request context) to avoid reopening during a request,
and sets row_factory for dictionary-like row access.
close_db ensures connections close after each request.

init_db drops and recreates the users table with columns
for id, first_name, last_name,
occupation, and salary, matching the app's data model.
init_app ties this setup to the Flask app, adding a teardown function
and a CLI command (flask init-db) via click to initialize
the database manually.

## User Model

The User class defines the database model using Flask-SQLAlchemy,
mapping to the users table created in db.py.

holy_grail_app/models.py
  

from .db import db

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    occupation = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Integer, nullable=False)

The id column is an auto-incrementing integer primary key, while
first_name and last_name are strings limited to 50
characters, occupation to 100 characters, and salary
is an integer—all marked nullable=False to require values.

This model directly corresponds to the form fields and database schema, ensuring
data submitted via the form can be stored and queried consistently. It's used
in routes.py to create and retrieve user records.

## User Form

UserForm leverages Flask-WTF and WTForms to define the user input
form. Each field—first_name, last_name,
occupation, and salary—matches the User
model's columns. StringField handles text inputs, while
IntegerField ensures salary is numeric.
SubmitField creates the submit button.

holy_grail_app/forms.py
  

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class UserForm(FlaskForm):

    first_name = StringField('First Name', validators=[
                             DataRequired(), Length(max=50)])
    last_name = StringField('Last Name', validators=[
                            DataRequired(), Length(max=50)])
    occupation = StringField('Occupation', validators=[
                             DataRequired(), Length(max=100)])
    salary = IntegerField('Salary', validators=[DataRequired()])
    submit = SubmitField('Submit')

Validators like DataRequired() ensure fields aren't empty, and
Length(max=...) enforces the same character limits as the model
(50 for names, 100 for occupation). This form is rendered in index.html
and validated in routes.py before saving data.

## HTML Template

This HTML template renders the UserForm defined in
forms.py.

templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;User Form&lt;/title&gt;
    &lt;link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="form-container"&gt;
        &lt;form method="POST" class="pure-form"&gt;
            &lt;h1&gt;User Form&lt;/h1&gt;
            {{ form.hidden_tag() }}
            &lt;div&gt;
                {{ form.first_name.label }}
                {{ form.first_name(size=20) }}
                {% if form.first_name.errors %}
                &lt;ul class="errors"&gt;
                    {% for error in form.first_name.errors %}
                    &lt;li&gt;{{ error }}&lt;/li&gt;
                    {% endfor %}
                &lt;/ul&gt;
                {% endif %}
            &lt;/div&gt;
            &lt;div&gt;
                {{ form.last_name.label }}
                {{ form.last_name(size=20) }}
                {% if form.last_name.errors %}
                &lt;ul class="errors"&gt;
                    {% for error in form.last_name.errors %}
                    &lt;li&gt;{{ error }}&lt;/li&gt;
                    {% endfor %}
                &lt;/ul&gt;
                {% endif %}
            &lt;/div&gt;
            &lt;div&gt;
                {{ form.occupation.label }}
                {{ form.occupation(size=20) }}
                {% if form.occupation.errors %}
                &lt;ul class="errors"&gt;
                    {% for error in form.occupation.errors %}
                    &lt;li&gt;{{ error }}&lt;/li&gt;
                    {% endfor %}
                &lt;/ul&gt;
                {% endif %}
            &lt;/div&gt;
            &lt;div&gt;
                {{ form.salary.label }}
                {{ form.salary(size=20) }}
                {% if form.salary.errors %}
                &lt;ul class="errors"&gt;
                    {% for error in form.salary.errors %}
                    &lt;li&gt;{{ error }}&lt;/li&gt;
                    {% endfor %}
                &lt;/ul&gt;
                {% endif %}
            &lt;/div&gt;
            {{ form.submit() }}
        &lt;/form&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

The &lt;link&gt; tag uses Flask's url_for to load
style.css from the static/ folder. The form is wrapped
in a &lt;div class="form-container"&gt; for centering, and the
&lt;form&gt; tag uses method="POST" to submit data to
the / route.

Jinja2 syntax integrates the form fields (form.first_name, etc.),
displaying labels and inputs with a size=20 attribute for width.
The hidden_tag() adds a CSRF token for security. Error handling
uses conditionals to show validation errors in a &lt;ul class="errors"&gt;,
styled red by the CSS, ensuring users see feedback on invalid input.

## CSS Styling

    The CSS styles the form for a clean, user-friendly look.

static/style.css
  

.errors {
    color: red;
    list-style-type: none;
    padding: 0;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    margin: 0;
}

.pure-form {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
}

.pure-form label {
    margin: 0 0 5px 0;
    display: block;
    font-weight: bold;
}

.pure-form input {
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.pure-form button {
    padding: 10px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
}

.pure-form button:hover {
    background-color: #45a049;
}

The .errors class formats validation messages in red, removing list
bullets for simplicity. .form-container uses Flexbox to center the
form both horizontally and vertically, filling the viewport (100vh,
100vw) with a light gray background.

.pure-form styles the form itself with a white background, padding,
rounded corners, and a subtle shadow, fixing its width at 300px. Labels are bold
and block-level, inputs span the full width with light borders, and the button
is green with a hover effect, enhancing usability and visual appeal.

## Routes

This module uses a Blueprint named main to define the
app's routes.

holy_grail_app/routes.py
  

from flask import Blueprint, render_template, redirect, url_for
from .models import User
from .forms import UserForm
from .db import db

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET', 'POST'])
def index():

    form = UserForm()

    if form.validate_on_submit():
        user = User(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            occupation=form.occupation.data,
            salary=form.salary.data
        )
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('main.success', user_id=user.id))

    return render_template('index.html', form=form)

@bp.route('/success/&lt;int:user_id&gt;')
def success(user_id):
    user = User.query.get_or_404(user_id)
    return f'User {user.first_name} {user.last_name} added successfully!'

The / route handles both GET (displaying
the form) and POST (submitting it). On GET, it creates
a UserForm instance and renders index.html. On a valid
POST, it constructs a User object from form data, adds
it to the database, and redirects to the success route.

The /success/&lt;int:user_id&gt; route takes a user ID, retrieves
the corresponding User record (or returns 404 if not found), and
displays a simple success message. This logic ties the form, model, and database
together, completing the app's workflow.

## Selenium Tests

This test file uses unittest and Selenium to verify the app's
functionality. 

tests/test_app.py
  

# tests/test_app.py
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import threading
import os
from holy_grail_app.db import db
from holy_grail_app.models import User
from holy_grail_app import create_app
from holy_grail_app.config import TestingConfig

class TestUserForm(unittest.TestCase):
    def setUp(self):

        self.app = create_app(TestingConfig)
        self.client = self.app.test_client()

        # Initialize database
        with self.app.app_context():
            from holy_grail_app.db import init_db
            init_db()

        # Start Flask server in a thread
        self.server_thread = threading.Thread(
            target=self.app.run, kwargs={'port': 5000})
        self.server_thread.daemon = True
        self.server_thread.start()
        time.sleep(1)  # Wait for server to start

        # Set up Selenium
        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()))
        self.driver.get('http://localhost:5000')
        time.sleep(1)  # Wait for page to load

    def tearDown(self):
        self.driver.quit()

        with self.app.app_context():

            # Get the absolute path to the database file
            db_path = os.path.abspath(
                os.path.join(self.app.instance_path,
                             self.app.config['DATABASE'])
            )
            print(f"Absolute database path: {db_path}")  # Debugging output

            try:
                db.engine.dispose()  # Dispose of database connections
                if os.path.exists(db_path):
                    os.remove(db_path)
                    print(f"Database file '{db_path}' removed successfully.")
                else:
                    print(f"Database file '{db_path}' does not exist.")
            except Exception as e:
                print(f"Error during cleanup: {e}")

    def test_index_get(self):
        """Test the index page loads with all form fields."""
        driver = self.driver

        # Wait for form to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pure-form"))
        )

        # Check form elements
        self.assertIn("User Form", driver.page_source)
        self.assertTrue(driver.find_element(By.ID, "first_name"))
        self.assertTrue(driver.find_element(By.ID, "last_name"))
        self.assertTrue(driver.find_element(By.ID, "occupation"))
        self.assertTrue(driver.find_element(By.ID, "salary"))
        self.assertTrue(driver.find_element(By.ID, "submit"))

    def test_user_model(self):
        """Test creating and querying a User in the database."""

        with self.app.app_context():

            user = User(first_name="Alice", last_name="Johnson",
                        occupation="Designer", salary=75000.0)
            db.session.add(user)
            db.session.commit()

            queried_user = User.query.filter_by(first_name="Alice").first()
            self.assertIsNotNone(queried_user)
            self.assertEqual(queried_user.last_name, "Johnson")
            self.assertEqual(queried_user.occupation, "Designer")
            self.assertEqual(queried_user.salary, 75000.0)

    def test_form_submission_valid(self):
            """Test submitting valid form data redirects to success."""
            driver = self.driver
            # driver.get('http://localhost:5001/')
            
            # Wait for form to be interactive
            WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, "submit"))
            )
            
            # Fill form
            driver.find_element(By.ID, "first_name").send_keys("Jane")
            driver.find_element(By.ID, "last_name").send_keys("Smith")
            driver.find_element(By.ID, "occupation").send_keys("Developer")
            driver.find_element(By.ID, "salary").send_keys("60000")
            
            # Submit form
            driver.find_element(By.ID, "submit").click()
            
            # Wait for redirect
            WebDriverWait(driver, 10).until(
                EC.text_to_be_present_in_element((By.TAG_NAME, "body"), "Jane Smith")
            )
            
            # Verify success page
            self.assertIn("User Jane Smith added successfully!", driver.page_source)
            
            # Verify database
            with self.app.app_context():
                user = User.query.filter_by(first_name="Jane").first()
                self.assertIsNotNone(user)
                self.assertEqual(user.last_name, "Smith")
                self.assertEqual(user.occupation, "Developer")
                self.assertEqual(user.salary, 60000.0)            

    def test_form_submission_missing_field(self):
        """Test submitting with a missing field shows validation error."""
        driver = self.driver

        # Wait for form to be interactive
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pure-form"))
        )

        # Remove 'required' attributes to bypass client-side validation
        driver.execute_script("""
            document.querySelectorAll('input[required]').forEach(input =&gt; {
                input.removeAttribute('required');
            });
        """)

        # Fill partial form (missing first_name)
        driver.find_element(By.ID, "last_name").send_keys("Smith")
        driver.find_element(By.ID, "occupation").send_keys("Developer")
        driver.find_element(By.ID, "salary").send_keys("60000")

        # Submit form
        driver.find_element(By.ID, "submit").click()

        # Wait for error message
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//ul[@class='errors']/li"))
        )
        self.assertIn("This field is required", driver.page_source)
        self.assertIn("User Form", driver.page_source)

    def test_form_submission_invalid_salary(self):
        """Test submitting a non-numeric salary shows an error."""
        driver = self.driver

        # Wait for form to be interactive
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pure-form"))
        )

        # Remove 'required' attributes to bypass client-side validation
        driver.execute_script("""
            document.querySelectorAll('input[required]').forEach(input =&gt; {
                input.removeAttribute('required');
            });
        """)

        # Fill form with invalid salary
        driver.find_element(By.ID, "first_name").send_keys("Jane")
        driver.find_element(By.ID, "last_name").send_keys("Smith")
        driver.find_element(By.ID, "occupation").send_keys("Developer")
        driver.find_element(By.ID, "salary").send_keys("invalid")

        # Submit form
        driver.find_element(By.ID, "submit").click()

        # Wait for error message
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//ul[@class='errors']/li"))
        )
        self.assertIn("This field is required.", driver.page_source)
        self.assertIn("User Form", driver.page_source)

    def test_form_submission_length_exceeded(self):
        """Test submitting a too-long field shows an error."""
        driver = self.driver

        # Wait for form to be interactive
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "pure-form"))
        )

        # Remove 'required' attributes to bypass client-side validation
        driver.execute_script("""
            document.querySelectorAll('input[required]').forEach(input =&gt; {
                input.removeAttribute('required');
            });
        """)

        # Fill form with oversized first_name
        driver.execute_script(
            "document.getElementById('first_name').value = 'a'.repeat(51);"
        )
        driver.find_element(By.ID, "last_name").send_keys("Smith")
        driver.find_element(By.ID, "occupation").send_keys("Developer")
        driver.find_element(By.ID, "salary").send_keys("60000")

        # Submit form
        driver.find_element(By.ID, "submit").click()

        # Wait for error message
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, "//ul[@class='errors']/li"))
        )
        self.assertIn("Field cannot be longer than 50 characters",
                      driver.page_source)
        self.assertIn("User Form", driver.page_source)

if __name__ == '__main__':
    unittest.main()

The setUp method initializes the test environment by creating
the Flask application with the testing configuration, initializing the database,
starting the Flask server in a separate thread, and launching a Chrome WebDriver
instance to interact with the application. This ensures a fresh and functional
environment for each test.

The tearDown method is responsible for cleaning up the test
environment after each test. It quits the WebDriver, closes active database
connections, disposes of the database engine, and attempts to delete the test
database file to maintain isolation between tests and avoid lingering
resources.

The test_index_get method verifies that the index page loads
correctly and contains all the necessary form fields. It checks for the presence
of the form and ensures all expected elements, such as input fields and the
submit button, are available and accessible in the page source.

The test_user_model method tests the functionality of the
User model by adding a user to the database and then querying it.
It confirms that the user is successfully added and that all the attributes
match the expected values, validating the model's behavior.

The test_form_submission_valid method tests the complete
workflow of submitting a valid form. It fills in all the required fields with
valid data, submits the form, and verifies that the user is redirected to a
success page. It also ensures the submitted data is correctly stored in the
database.

The test_form_submission_missing_field method evaluates the
form's validation mechanism when a required field is missing. It submits a form
without filling out the first_name field and verifies that an
appropriate validation error message is displayed on the page.

The test_form_submission_invalid_salary method checks how the
form handles invalid data in the salary field. It submits the form with a
non-numeric salary value and validates that the application displays an
appropriate error message to guide the user.

The test_form_submission_length_exceeded method ensures the form
properly validates field lengths. It submits a form with an excessively long
value for the first_name field and verifies that the error message
indicating the maximum length constraint is correctly displayed.

## Running the App and Tests

$ pip install -r requirements.txt
$ flask init-db
$ python run.py

To run tests:

$ python -m unittest tests/test_app.py -v

First, install dependencies listed in requirements.txt using pip.
Then, run flask init-db to set up the users.db database.
Finally, launch the app with python run.py to start the development
server. For testing, use unittest with the -v flag for
verbose output, ensuring Selenium tests run against the app.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
experience spanning many years. Since 2007, I have authored over 1400
programming articles and 8 e-books. Additionally, I possess more than eight
years of experience in teaching programming concepts.

List [all Python tutorials](/all/#python).