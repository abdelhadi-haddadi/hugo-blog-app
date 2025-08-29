+++
title = "PHP syslog Function"
date = 2025-08-29T20:06:22.745+01:00
draft = false
description = "PHP syslog function tutorial shows how to log messages to system logger in PHP. Learn syslog with practical examples for different logging scenarios."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP syslog Function

last modified April 4, 2025

The PHP syslog function sends log messages to the system logger.
It's useful for centralized logging in applications and services.

## Basic Definition

syslog generates a system log message that gets handled by the
system logger daemon. It follows the standard syslog protocol.

Syntax: syslog(int $priority, string $message): bool.
Returns true on success, false on failure. Requires proper system permissions.

## Basic Logging Example

This example demonstrates the simplest way to log a message using syslog.

basic_logging.php
  

&lt;?php

declare(strict_types=1);

// Open connection to system logger
openlog("myapp", LOG_PID | LOG_PERROR, LOG_LOCAL0);

// Send a log message
syslog(LOG_INFO, "Application started successfully");

// Close connection
closelog();

This code opens a connection to the system logger, sends an INFO level message,
then closes the connection. The message appears in system logs.

## Different Priority Levels

This example shows how to use different priority levels for logging.

priority_levels.php
  

&lt;?php

declare(strict_types=1);

openlog("myapp", LOG_PID, LOG_USER);

syslog(LOG_EMERG, "System is unusable");
syslog(LOG_ALERT, "Immediate action required");
syslog(LOG_CRIT, "Critical conditions");
syslog(LOG_ERR, "Error conditions");
syslog(LOG_WARNING, "Warning conditions");
syslog(LOG_NOTICE, "Normal but significant");
syslog(LOG_INFO, "Informational message");
syslog(LOG_DEBUG, "Debug-level message");

closelog();

Each priority level indicates message severity. System administrators can
filter logs based on these priorities for better monitoring.

## Logging with Custom Facility

This example demonstrates using a custom logging facility for categorization.

custom_facility.php
  

&lt;?php

declare(strict_types=1);

// Using local7 facility typically reserved for local use
openlog("customapp", LOG_PID | LOG_ODELAY, LOG_LOCAL7);

syslog(LOG_NOTICE, "Custom application initialized");
syslog(LOG_WARNING, "Configuration file missing");

closelog();

Facilities help categorize logs by their source. Different facilities can
have different log file destinations and handling rules.

## Error Handling with syslog

This example shows how to log PHP errors to the system logger.

error_handling.php
  

&lt;?php

declare(strict_types=1);

function logError($errno, $errstr, $errfile, $errline) {
    openlog("phperrors", LOG_PID, LOG_LOCAL0);
    $priority = match($errno) {
        E_ERROR, E_USER_ERROR =&gt; LOG_ERR,
        E_WARNING, E_USER_WARNING =&gt; LOG_WARNING,
        E_NOTICE, E_USER_NOTICE =&gt; LOG_NOTICE,
        default =&gt; LOG_INFO
    };
    syslog($priority, "[$errno] $errstr in $errfile on line $errline");
    closelog();
}

set_error_handler("logError");

// Trigger different error types
trigger_error("Test warning", E_USER_WARNING);
trigger_error("Test notice", E_USER_NOTICE);

This sets up a custom error handler that logs PHP errors to syslog. Errors
are categorized by severity and include detailed context information.

## Structured Logging

This example demonstrates structured logging with additional metadata.

structured_logging.php
  

&lt;?php

declare(strict_types=1);

function logEvent($message, $context = [], $priority = LOG_INFO) {
    openlog("structuredapp", LOG_PID, LOG_LOCAL0);
    
    $structured = [
        'message' =&gt; $message,
        'timestamp' =&gt; date('c'),
        'context' =&gt; $context
    ];
    
    syslog($priority, json_encode($structured));
    closelog();
}

logEvent("User logged in", [
    'user_id' =&gt; 42,
    'ip' =&gt; '192.168.1.1',
    'user_agent' =&gt; $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
]);

Structured logging formats messages as JSON with additional context. This makes
logs more machine-readable and enables better log analysis tools.

## Best Practices

- **Facility Selection:** Choose appropriate facility for your application

- **Message Format:** Maintain consistent message format

- **Connection Handling:** Open/close connections efficiently

- **Security:** Sanitize log messages to prevent log injection

- **Performance:** Consider impact on high-volume applications

## Source

[PHP syslog Documentation](https://www.php.net/manual/en/function.syslog.php)

This tutorial covered the PHP syslog function with practical
examples for system logging in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP Network Functions](/php/#php-network).