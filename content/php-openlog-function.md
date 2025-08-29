+++
title = "PHP openlog Function"
date = 2025-08-29T20:06:19.441+01:00
draft = false
description = "PHP openlog function tutorial shows how to configure system logging in PHP. Learn openlog with practical examples for different logging scenarios."
image = ""
imageBig = ""
categories = ["php-network"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP openlog Function

last modified April 4, 2025

The PHP openlog function initializes a connection to the system
logger. It's used with syslog and closelog for system
logging.

## Basic Definition

openlog prepares PHP to send messages to the system logger. It
configures the logging identity and options before sending messages.

Syntax: openlog(string $prefix, int $options, int $facility): bool.
Returns true on success, false on failure. Works with Unix-like systems.

## Basic System Logging

This example demonstrates the most basic usage of openlog.

basic_logging.php
  

&lt;?php

declare(strict_types=1);

openlog("MyPHPApp", LOG_PID | LOG_PERROR, LOG_USER);
syslog(LOG_INFO, "This is a test message");
closelog();

This opens a connection to the system logger with the identifier "MyPHPApp".
The message will appear in system logs with the process ID (LOG_PID) and also
print to stderr (LOG_PERROR).

## Different Log Facilities

This shows how to use different logging facilities for various purposes.

facility_logging.php
  

&lt;?php

declare(strict_types=1);

// Mail system logging
openlog("MailProcessor", LOG_PID, LOG_MAIL);
syslog(LOG_WARNING, "Failed to deliver email");
closelog();

// Security logging
openlog("AuthSystem", LOG_PID, LOG_AUTH);
syslog(LOG_ALERT, "Unauthorized access attempt");
closelog();

Different facilities categorize logs for different system components. LOG_MAIL
is for mail system messages, while LOG_AUTH is for security/authorization.

## Logging with Different Options

This example demonstrates various logging options available with openlog.

options_logging.php
  

&lt;?php

declare(strict_types=1);

// Log to console immediately (LOG_CONS)
openlog("ConsoleApp", LOG_CONS, LOG_USER);
syslog(LOG_ERR, "Critical error occurred");
closelog();

// Delay opening until first message (LOG_NDELAY)
openlog("BackgroundApp", LOG_NDELAY, LOG_DAEMON);
syslog(LOG_INFO, "Background process started");
closelog();

LOG_CONS writes directly to system console if syslog fails. LOG_NDELAY opens
the connection immediately rather than waiting for the first message.

## Error Handling with Logging

This shows how to implement error handling with system logging.

error_logging.php
  

&lt;?php

declare(strict_types=1);

function logError(string $message, int $severity = LOG_ERR): bool {
    if (!openlog("ErrorTracker", LOG_PID, LOG_LOCAL0)) {
        return false;
    }
    
    $result = syslog($severity, $message);
    closelog();
    return $result;
}

logError("Database connection failed", LOG_CRIT);

This wraps logging in a function with error checking. It returns false if
openlog fails. The severity level can be customized when calling the function.

## Custom Logging Class

This example demonstrates a simple logging class using openlog.

logger_class.php
  

&lt;?php

declare(strict_types=1);

class SystemLogger {
    private string $ident;
    private int $options;
    private int $facility;
    
    public function __construct(string $ident, int $options, int $facility) {
        $this-&gt;ident = $ident;
        $this-&gt;options = $options;
        $this-&gt;facility = $facility;
    }
    
    public function log(string $message, int $priority): bool {
        if (!openlog($this-&gt;ident, $this-&gt;options, $this-&gt;facility)) {
            return false;
        }
        $result = syslog($priority, $message);
        closelog();
        return $result;
    }
}

$logger = new SystemLogger("MyApp", LOG_PID, LOG_USER);
$logger-&gt;log("Application initialized", LOG_INFO);

This class encapsulates the logging functionality for reuse. The constructor
sets up the logging configuration, and the log method handles message sending.

## Best Practices

- **Identifiers:** Use meaningful identifiers for your application

- **Severity Levels:** Choose appropriate severity levels

- **Error Handling:** Always check if openlog succeeds

- **Cleanup:** Close logging connection when done

- **Performance:** Reuse connections for multiple messages

## Source

[PHP openlog Documentation](https://www.php.net/manual/en/function.openlog.php)

This tutorial covered the PHP openlog function with practical
examples for system logging in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).