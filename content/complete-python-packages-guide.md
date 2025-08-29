+++
title = "Complete Python Packages Guide"
date = 2025-08-29T20:09:50.972+01:00
draft = false
description = "Complete Python packages tutorial covering package creation, distribution, virtual environments, and modern packaging tools."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Complete Python Packages Guide

last modified May 15, 2024

This comprehensive guide combines best practices from popular Python packaging 
tutorials to help you master Python package creation and distribution.

## 1. Core Package Concepts

### Basic Package Structure

mypackage/__init__.py
  

"""Package initialization file"""
__version__ = "1.0.0"

mypackage/module1.py
  

```
def hello():
    return "Hello from module1"

```

Key points from Python official documentation:

- An __init__.py makes a directory a package

- Can be empty or contain initialization code

- Defines package-level attributes like __version__

## 2. Modern Package Structure (PyPA Recommended)

Project Structure
  

mypackage/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── module1.py
├── tests/
├── pyproject.toml
├── README.md
└── LICENSE

Best practices from Python Packaging Authority (PyPA):

- Use src layout for better isolation

- Include comprehensive tests directory

- Always include license and README

- Use pyproject.toml for modern builds

## 3. Package Distribution

### Modern pyproject.toml

pyproject.toml
  

[build-system]
requires = ["setuptools&gt;=42", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "1.0.0"
authors = [{name="Your Name", email="your@email.com"}]
description = "My awesome package"
readme = "README.md"
requires-python = "&gt;=3.8"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]

Key improvements from Real Python and PyPA guides:

- Simpler configuration than setup.py

- Standardized metadata format

- Better build system isolation

## 4. Virtual Environments

Terminal commands
  

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (Unix/macOS)
source .venv/bin/activate

# Install package in editable mode
pip install -e .

Virtual environment best practices from:

- Python official documentation

- Real Python tutorials

- Flask/Django project templates

## 5. Advanced Package Features

### Namespace Packages

Namespace package structure
  

company_namespace/
└── project1/
    └── code.py  # can be imported as company_namespace.project1

From Google's Python Style Guide:

- No __init__.py needed (Python 3.3+)

- Allows package distribution across multiple directories

- Useful for large organizations

## 6. Package Publishing

Publishing to PyPI
  

# Build package
python -m build

# Upload to TestPyPI
python -m twine upload --repository testpypi dist/*

# Upload to PyPI
python -m twine upload dist/*

From PyPA packaging tutorial:

- Always test on TestPyPI first

- Use API tokens instead of passwords

- Consider using trusted publishing

## 7. Package Maintenance

### Version Management

Version specification
  

# In pyproject.toml
dynamic = ["version"]
[tool.setuptools.dynamic]
version = {attr = "mypackage.__version__"}

From Hypermodern Python guide:

- Single source of truth for version

- Consider using bump2version

- Follow semantic versioning (semver)

## Source References

- [PyPA Packaging Guide](https://packaging.python.org/en/latest/)

- [Real Python](https://realpython.com/python-application-layouts/)

- [Google Python Guide](https://google.github.io/styleguide/pyguide.html)

- [Poetry Documentation](https://python-poetry.org/docs/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).