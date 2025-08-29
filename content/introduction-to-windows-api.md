+++
title = "Introduction to Windows API"
date = 2025-08-29T19:57:39.662+01:00
draft = false
description = "This is an introductory chapter to the Windows API tutorial."
image = ""
imageBig = ""
categories = ["gui"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../main/)

# Introduction to Windows API

last modified October 18, 2023

This is Windows API tutorial. This tutorial will teach you the basics and
more advanced topics of programming in Windows API with the C programming 
language. It does not cover MFC. (Microsoft Foundation Classes is a widely used 
C++ library for developing C++ applications on Windows.) This tutorial has been 
created and tested on Windows 7. The examples have been built using Pelles C 
compiler. If you plan to read this tutorial, you are advised to download and 
install this compiler. (It is a freeware.) If you want to use some other 
compiler make sure that is supports the C99 standard. 

## Windows API

The Windows API is the application programming interface that is used to create Windows 
applications. In order to create Windows applications, we must download the 
*Windows SDK*. (Formerly known as Platform SDK.) The SDK (Software 
Development Kit) contains header files, libraries, samples, documentation and 
tools that use the Windows API to develop applications. The Windows API is 
created for C and C++ programming languages. It is the most direct way to create 
Windows applications. (If we install Pelles C, the Windows SDK is already 
included.)

The Windows API can be divided into several areas:

- Base services

- Security

- Graphics

- User interface

- Multimedia

- Windows shell

- Networking

The *Base services* provide access to the fundamental resources on Windows. 
These include file systems, devices, processes, threads, registry or error 
handling. The *Security* area provides functions, interfaces, objects and
other programming elements for authentication, authorisation, cryptography and
other security related tasks. 
The *Graphics* subsystem provides functionality for outputting graphical content 
to monitors, printers and other output devices. The *User interface* provides functionality to 
create windows and controls. The *Multimedia* component provides tools for
working with video, sound and input devices. The functions of the *Windows shell* 
interface allow applications to access the functionality provided by the 
operating system shell. The *Network services* provide access to the 
network capabilities of the Windows OS.

Windows API is an abstract specification of the programming interface to
the Windows operating system. It consists of declarations of functions, unions,
structures, data types, macros, constants and other programming elements. 
Windows API is described mainly by the MSDN (Microsoft Developer Network)
and resides in the Windows C headers. The official implementation of the 
Windows API functions is located in dynamic libraries (DLLs). For example 
kernel32.dll, user32.dll, gdi32.dll, or 
shell32.dll in the Windows system directory. There are third-party 
implementations of Windows API: most notably the Wine project and the ReactOS project.  

Windows API is a dynamic entity. The number of functions continuously grows
with every new version of Windows OS and new service packs. There are also some
important differences between the server versions and desktop versions of the
operating system. Some functions are not officially documented. 

## Pelles C

Pelles C is an excellent C compiler and integrated development environment (IDE)
for the C programming language. It supports both 32-bit Windows (x86) and
64-bit Windows (x64). It implements both C99 and C11 standards. Pelles C has
an integrated resource editor, bitmap, icon and cursor editor, and a hex-dump
editor. It is developed by a Swedish developer Pelle Orinius. It comes with
Windows SDK, so we can immediately start creating Windows applications without
further installations.

Pelles C is a freeware. We can download Pelles C from the following link: 
[Pelles C download](http://www.smorgasbordet.com/pellesc/).  

## No target architecture error

In order to create Windows API programs, we have to enable Microsoft extensions. 
They are not enabled by default; therefore, the compiler produces the following 
error message: fatal error #1014: #error: "No target architecture".
To enable Microsoft extensions, we go to the project options and select the
Compiler tab. In this tab we check the Enable Microsoft Extensions box.

## MSDN

The MSDN (Microsoft Developer Network) is a central portal for Windows 
development. It is a huge collection of material related to development of
Windows applications using Microsoft tools. (Third party software like Qt4 or 
Java Swing is not covered.) It is the most complete reference for the 
Windows API. The following two links are good entry points for the Windows API
reference: the 

Desktop App Development Documentation and the 

Windows API list. 

This chapter was an introduction to Windows API. 

[Contents](..)
[Next](../main/)