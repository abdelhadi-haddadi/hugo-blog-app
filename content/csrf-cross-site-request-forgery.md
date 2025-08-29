+++
title = "CSRF (Cross-Site Request Forgery)"
date = 2025-08-29T20:13:30.383+01:00
draft = false
description = "Learn about CSRF (Cross-Site Request Forgery) attacks in web development: definition, how they work, prevention techniques, and best practices. A comprehensive guide by ZetCode to secure your web applications."
image = ""
imageBig = ""
categories = ["terms-testing"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# CSRF (Cross-Site Request Forgery)

last modified April 4, 2025

## Definition of CSRF

CSRF (Cross-Site Request Forgery) is a web security vulnerability that allows an
attacker to trick users into performing unwanted actions on a web application.
It occurs when a malicious website causes a user's browser to send unauthorized
requests to a target site where the user is authenticated. These forged requests
can perform actions like changing account details, making transactions, or
modifying data without the user's knowledge. CSRF attacks exploit the trust that
a web application has in the user's browser, not the user themselves. This makes
it distinct from other attacks like XSS (Cross-Site Scripting).

The term "forgery" in CSRF refers to the attacker's ability to forge HTTP
requests that appear legitimate to the server. Since browsers automatically
include cookies and session information with each request, the server cannot
distinguish between genuine user actions and forged ones. CSRF has been part of
the OWASP Top 10 list of critical web application security risks for years,
highlighting its persistent threat to web security.

## Broader Context of CSRF

CSRF exists within the broader landscape of web application security threats,
alongside vulnerabilities like SQL injection and XSS. While these other attacks
focus on compromising data or user sessions, CSRF specifically targets state-
changing operations. It's particularly dangerous for applications that perform
sensitive actions through simple GET or POST requests without additional
verification. Modern web frameworks often include built-in CSRF protection, but
developers must understand and properly implement these mechanisms.

The rise of single-page applications (SPAs) and RESTful APIs has changed how
CSRF attacks manifest, but hasn't eliminated the risk. Even with the prevalence
of CORS (Cross-Origin Resource Sharing) policies, CSRF remains a concern because
it doesn't require reading responses - just making requests. Understanding CSRF
is essential for both frontend and backend developers, as prevention requires
coordination between client-side and server-side components.

## Characteristics of CSRF

**Exploits authenticated sessions** - Only works when the user
is logged into the target site.
**Doesn't require code execution** - Unlike XSS, it doesn't need
to inject malicious scripts into pages.
**Targets state-changing requests** - Focuses on actions that
modify data rather than just retrieving information.
**Uses social engineering** - Often relies on tricking users
into visiting malicious pages or clicking links.
**Works across domains** - The attack originates from a
different site than the target application.
**Browser-dependent** - Relies on how browsers handle cookies
and automatic credential inclusion.

## How CSRF Attacks Work

A typical CSRF attack follows a specific sequence that exploits browser behavior
and application trust. First, the attacker identifies a vulnerable action in the
target application, such as an email change or funds transfer endpoint. They
then craft a malicious webpage containing code that automatically submits a
request to this endpoint when visited. If the victim is logged into the target
site, their browser will include session cookies with this forged request.

The server processes the request as legitimate because it comes with valid
authentication credentials. Since the attack happens in the background, the user
might remain unaware until they notice unauthorized changes. Below is a table
outlining the key stages of a CSRF attack, from preparation to execution, to
help visualize the attack flow.

Stage
Description

Target Identification
Attacker finds a vulnerable action in the web application that doesn't have
CSRF protection, typically a state-changing operation.

Malicious Request Crafting
Attacker creates HTML or JavaScript that will automatically send a request
to the vulnerable endpoint when executed in a victim's browser.

Victim Luring
Attacker tricks the victim into visiting the malicious page, often through
phishing emails or compromised websites.

Request Execution
Victim's browser sends the forged request to the target site with the
user's active session cookies attached.

Server Processing
Target server processes the request as legitimate because it comes with
valid authentication credentials.

## Preventing CSRF Attacks

Effective CSRF prevention requires implementing multiple security measures that
work together to verify request legitimacy. The most common approach is using
CSRF tokens - unique, unpredictable values generated by the server and included
in forms or headers. These tokens must match between the client and server for
requests to be processed. Another powerful method is leveraging the SameSite
cookie attribute, which restricts when cookies are sent with cross-site
requests.

Additional defenses include requiring re-authentication for sensitive actions,
checking the Origin or Referer headers, and implementing custom headers for API
requests. Modern web frameworks like Django, Rails, and Spring Security provide
built-in CSRF protection that developers should enable and configure properly.
The key is adopting a defense-in-depth strategy rather than relying on a single
solution, as each layer provides additional security against evolving attack
techniques.

## CSRF Protection Techniques

- **CSRF Tokens** - Unique, secret values validated on the server for each state-changing request.

- **SameSite Cookies** - Cookie attribute that restricts sending cookies with cross-site requests.

- **Double Submit Cookies** - Sending the token both in a cookie and another part of the request.

- **Custom Request Headers** - Requiring specific headers for API requests that can't be set cross-origin.

- **Origin/Referer Checking** - Validating that requests come from expected origins.

- **User Interaction Requirements** - Mandating CAPTCHAs or re-authentication for sensitive actions.

## Source

[OWASP CSRF](https://owasp.org/www-community/attacks/csrf)

In this article, we have covered CSRF (Cross-Site Request Forgery) in depth,
exploring its definition, context, characteristics, attack methods, prevention,
and protection techniques. This comprehensive guide equips readers with the
knowledge to understand and defend against CSRF vulnerabilities in web
applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007,
sharing insights on languages, frameworks, and best practices. To date, I have
authored over 1,400 articles and 8 e-books, covering topics from beginner
tutorials to advanced development techniques. With more than ten years of
experience in teaching programming, I strive to make complex concepts accessible
and practical for learners and professionals alike.

List [all Security terms](/all/#terms-security).