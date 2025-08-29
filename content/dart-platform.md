+++
title = "Dart Platform"
date = 2025-08-29T19:52:11.445+01:00
draft = false
description = "Dart Platform tutorial shows how to detect the current platform and environment in Dart using the Platform class."
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart Platform

last modified April 4, 2025

The Platform class in Dart provides information about the current
platform and environment. It's useful for writing cross-platform applications.

Platform can detect operating system, executable path, environment variables,
and more. It's part of Dart's dart:io library for server-side apps.

## Basic Definition

Platform is a static class that exposes platform-specific properties.
It helps write code that adapts to different operating systems and environments.

Key features include OS detection, path resolution, and environment variable
access. Note it only works in Dart command-line applications, not in browsers.

## Detecting the Operating System

This example shows how to detect the current operating system.

main.dart
  

import 'dart:io';

void main() {
  print('Operating system: ${Platform.operatingSystem}');
  print('OS version: ${Platform.operatingSystemVersion}');
  
  if (Platform.isWindows) {
    print('Running on Windows');
  } else if (Platform.isLinux) {
    print('Running on Linux');
  } else if (Platform.isMacOS) {
    print('Running on macOS');
  }
}

We use Platform properties to detect the OS. The isWindows, isLinux, and isMacOS
getters provide convenient boolean checks for common platforms.

$ dart main.dart
Operating system: linux
OS version: 5.15.0-76-generic
Running on Linux

## Accessing Environment Variables

This example demonstrates accessing system environment variables.

main.dart
  

import 'dart:io';

void main() {
  final envVars = Platform.environment;
  
  print('PATH: ${envVars['PATH']}');
  print('HOME: ${envVars['HOME']}');
  print('USER: ${envVars['USER']}');
  
  if (envVars.containsKey('FLUTTER_ROOT')) {
    print('Flutter SDK: ${envVars['FLUTTER_ROOT']}');
  }
}

Platform.environment provides a map of all environment variables. We can access
specific variables or check for their existence before accessing them.

$ dart main.dart
PATH: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
HOME: /home/user
USER: user

## Getting Executable Information

This example shows how to get information about the running executable.

main.dart
  

import 'dart:io';

void main() {
  print('Executable: ${Platform.executable}');
  print('Executable arguments: ${Platform.executableArguments}');
  print('Script path: ${Platform.script.path}');
  print('Resolved script path: ${Platform.resolvedExecutable}');
  
  print('Dart version: ${Platform.version}');
}

These properties help identify the Dart runtime and script location. Useful for
logging, debugging, or when paths need to be resolved relative to the executable.

$ dart main.dart
Executable: /usr/bin/dart
Executable arguments: []
Script path: /home/user/main.dart
Resolved script path: /usr/bin/dart
Dart version: 2.19.0 (stable)

## Checking Platform Locale

This example demonstrates checking the platform's locale settings.

main.dart
  

import 'dart:io';

void main() {
  final locale = Platform.localeName;
  print('System locale: $locale');
  
  final locales = Platform.localeName.split('_');
  final language = locales[0];
  final country = locales.length &gt; 1 ? locales[1] : 'Unknown';
  
  print('Language: $language');
  print('Country: $country');
}

Platform.localeName returns the system locale in language_COUNTRY format. We
split it to get separate language and country components for localization.

$ dart main.dart
System locale: en_US
Language: en
Country: US

## Platform-Specific Code Execution

This example shows how to execute platform-specific code paths.

main.dart
  

import 'dart:io';

String getPlatformSpecificMessage() {
  if (Platform.isWindows) {
    return 'Hello Windows user!';
  } else if (Platform.isMacOS) {
    return 'Hello macOS user!';
  } else if (Platform.isLinux) {
    return 'Hello Linux user!';
  } else if (Platform.isAndroid) {
    return 'Hello Android user!';
  } else if (Platform.isIOS) {
    return 'Hello iOS user!';
  }
  return 'Hello unknown platform user!';
}

void main() {
  print(getPlatformSpecificMessage());
  print('Number of processors: ${Platform.numberOfProcessors}');
}

We use Platform checks to customize behavior per platform. Also shown is
numberOfProcessors which helps with parallel task distribution.

$ dart main.dart
Hello Linux user!
Number of processors: 8

## Best Practices

- **Feature detection:** Prefer feature detection over OS checks when possible

- **Null safety:** Check environment variables exist before accessing

- **Web compatibility:** Remember Platform doesn't work in browsers

- **Testing:** Test platform-specific code paths thoroughly

## Source

[Dart Platform Documentation](https://api.dart.dev/stable/dart-io/Platform-class.html)

This tutorial covered Dart's Platform class with practical examples showing
platform detection, environment access, and platform-specific code execution.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).