+++
title = "Python implement SSL/TLS certificate"
date = 2025-08-29T20:08:42.040+01:00
draft = false
description = "In this article we show how to implement an SSL/TLS certificate in Python. An SSL certificate is a digital certificate that proves a website's identity and enables an encrypted connection."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python implement SSL/TLS certificate

last modified January 29, 2024

In this article we show how to implement an SSL/TLS certificate in Python. An
SSL certificate is a digital certificate that proves a website's identity and
enables an encrypted connection.

## Introduction

Our lives are now intricately mixed into an interconnected digital world, where
online engagement has seamlessly integrated into our daily routines. This
heightened connectivity has brought cybersecurity to the forefront of our
concerns. In these interactions, each click, tap, or transaction inadvertently
leaves traces of confidential data vulnerable to malicious exploitation. This is
where the SSL certificate steps into the equation.

## SSL definition

SSL (Secure Socket Layer) and its evolution, TLS (Transport Layer Security),
function as precisely designed cryptographic protocols. Their primary purpose is
to forge secure connections between web servers and users' browsers. These
protocols shield us from cyber threats such as data breaches, phishing attempts,
and unauthorized access.

In the subsequent section, we describe the process of integrating SSL
certificates in Python. Proficiency in TLS/SSL certificates is nowadays an
essential skill for developers, security enthusiasts or any individual trying
to improve their security.

## Acquiring an SSL certificate

The initial procedure toward bolstering our website's security is acquiring an
SSL certificate. To do so, we need to issue a Certificate Signing Request
(CSR) to a reputable Certificate Authority (CA). Imprinted with organizational
and server details, the CSR undergoes thorough scrutiny by the CA before the
certificate is issued.

For developling purposes, we can create a self-signed certificate. For
production, it is important to exclusively buy SSL
certificates from trustworthy SSL providers.

The next step is its installation on our web server. The installation process
creates a secure linkage between our users and the server, showcased by the
reassuring padlock icon in the browser's address bar. The installation process
may vary depending on our server's unique configuration.

## SSL types

The following list describes various SSL certificate types:

    Domain Validated (DV) SSL Certificate: DV certificates are the simplest
    and quickest to acquire. They validate only the domain's ownership, making
    them suitable for personal websites and small blogs. We should go with
    reputed SSL providers or CAs who can offer us budget price or cheap SSL at
    lowest price. These are a great option for those on a budget.
    Organization Validated (OV) SSL Certificate: OV certificates offer a
    higher level of trust, as the CA verifies both domain ownership and certain
    details about the organization. They are ideal for businesses and e-commerce
    sites.
     Extended Validation (EV) SSL Certificate: EV certificates provide the
    highest level of validation. They require a thorough vetting process of the
    organization, offering users the highest level of confidence through the
    address bar in browsers. These certificates are recommended for online
    businesses and financial institutions.
    Wildcard SSL Certificate: For those managing numerous first level of
    subdomains within a single domain, a wildcard SSL certificate presents a
    streamlined solution, consolidating security efforts by encompassing them
    all under one certificate, thus diminishing administrative complexity.
    Multi-Domain SSL Certificate (SAN): Subject Alternative Name
    certificates, more commonly referred to as SAN certificates, offer a
    versatile security approach by enabling the protection of multiple domains
    and their associated subdomains using a single certificate. This approach
    simplifies the management of diverse online assets while maintaining robust
    security standards.

We select the right certificate based on our requirements and budget.

## Generating a CA-Signed SSL certificate

The following steps are needed to generate a CA-Signed SSL certificate:

### Choose a Trusted Certificate Authority (CA)

The first step is selecting a reliable CA to issue our SSL/TLS certificate. CAs
are responsible for validating our domain and organization details before
granting a certificate.

### Generate a Private Key and CSR

SSL certificates use asymmetric encryption, employing a pair of keys - a private
one and a public one. To commence this procedure, it becomes necessary to
generate a Certificate Signing Request (CSR) and craft a private key. OpenSSL
can be harnessed for this purpose. Below is the code snippet for reference:

$ openssl req -new -newkey rsa:2048 -nodes -keyout example.com.key -out example.com.csr -subj "/CN=example.com"

The command generates a private key (example.com.key) and a CSR
(example.com.csr) for our domain. Make sure to replace *example.com* with
your domain.

### Store the CSR file

We create a local directory for the certificate files. This directory should
contain the CSR file. We send this CSR, along with our private key, to the
CA for verification.

### Python SSL Certificate installation

Once we have obtained the SSL certificate from the CA, we rename it from
certificate.crt to certificate.pem. Then we create an
SSL context in Python using the following code:

#!/usr/bin/python

import ssl

context = ssl.create_default_context()

context.load_cert_chain(certfile='/path/to/our/certificate.pem',
    keyfile='/path/to/our/private.key')

### Verify the installation

To ensure the certificate is correctly installed and used, we can examine the
SSL certificate chain provided by the server using Python's SSL module:

#!/usr/bin/python

import ssl
import socket

hostname = 'example.com'  # Replace with your domain name

context = ssl.create_default_context()

with socket.create_connection((hostname, 443)) as sock:

    with context.wrap_socket(sock, server_hostname=hostname) as ssock:

        chain = ssock.getpeercert(chain=True)
        print(chain)

The code example establishes a connection with our domain over port 443,
acquires the server's certificate chain, and then displays it. It verifies the
proper utilization of our SSL certificate.

## Source

[Python SSL documentation](https://docs.python.org/3/library/ssl.html)

In this article we described SSL certificates and showed how to implement a
CA-Signed SSL certificate in Python language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).