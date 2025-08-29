+++
title = "VBScript Win32_Product Class"
date = 2025-08-29T20:15:45.509+01:00
draft = false
description = "Learn about VBScript Win32_Product class, including software inventory, installation details, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_Product Class

last modified April 9, 2025

The Win32_Product class in VBScript is part of Windows Management
Instrumentation (WMI). It represents installed software products on a Windows
system. This class provides detailed information about each installed
application. It's commonly used for software inventory and management tasks.

Win32_Product includes properties like name, version, vendor, and
installation date. It can also perform operations like installation and
uninstallation. This tutorial covers Win32_Product with practical
examples to demonstrate its usage.

## Win32_Product Class Overview

The Win32_Product class is a WMI provider that queries installed
MSI packages. It inherits from CIM_Product and provides additional
Windows-specific properties. Each instance represents one installed product.

Key properties include Name, Version, and
Vendor. Methods like Install and Uninstall
allow package management. Understanding this class helps create robust software
management scripts.

## Listing All Installed Products

This example demonstrates how to query all installed products using
Win32_Product. It shows basic WMI connection setup and property
access. The script outputs product names, versions, and vendors.

list_products.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProducts = objWMIService.ExecQuery("SELECT * FROM Win32_Product")

For Each objProduct in colProducts
    WScript.Echo "Name: " &amp; objProduct.Name
    WScript.Echo "Version: " &amp; objProduct.Version
    WScript.Echo "Vendor: " &amp; objProduct.Vendor
    WScript.Echo "--------------------------------"
Next

The script connects to WMI and queries all Win32_Product instances.
It iterates through the collection and displays key properties. Note that this
query might take several seconds to complete on systems with many products.

## Finding Specific Product Information

This example shows how to filter Win32_Product queries to find
specific applications. It demonstrates WQL (WMI Query Language) filtering. The
script searches for products matching a partial name.

find_product.vbs
  

productName = "Microsoft Office"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
query = "SELECT * FROM Win32_Product WHERE Name LIKE '%" &amp; productName &amp; "%'"
Set colProducts = objWMIService.ExecQuery(query)

If colProducts.Count = 0 Then
    WScript.Echo "No products found matching: " &amp; productName
Else
    For Each objProduct in colProducts
        WScript.Echo "Found: " &amp; objProduct.Name &amp; " (" &amp; objProduct.Version &amp; ")"
    Next
End If

The script uses a WQL LIKE operator to find products containing "Microsoft
Office". It handles cases where no matches are found. This approach is useful
for verifying software installations in scripts.

## Checking Product Installation Date

This example demonstrates accessing the installation date property of products.
The InstallDate property returns a string in UTC format. The script
converts this to a more readable format.

installation_date.vbs
  

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set colProducts = objWMIService.ExecQuery("SELECT Name, InstallDate FROM Win32_Product")

For Each objProduct in colProducts
    If Not IsNull(objProduct.InstallDate) Then
        installDate = Mid(objProduct.InstallDate, 7, 2) &amp; "/" &amp; _
                     Mid(objProduct.InstallDate, 5, 2) &amp; "/" &amp; _
                     Left(objProduct.InstallDate, 4)
        WScript.Echo objProduct.Name &amp; " was installed on " &amp; installDate
    End If
Next

The script extracts year, month, and day from the UTC formatted string. It
reformats this into a more familiar date display. Note that some products might
not have installation date information available.

## Uninstalling a Product

This example shows how to uninstall a product using the Uninstall
method. It demonstrates error handling for the uninstallation process. The script
attempts to uninstall a specified product.

uninstall_product.vbs
  

productName = "Example Application"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
query = "SELECT * FROM Win32_Product WHERE Name = '" &amp; productName &amp; "'"
Set colProducts = objWMIService.ExecQuery(query)

For Each objProduct in colProducts
    WScript.Echo "Attempting to uninstall: " &amp; objProduct.Name
    result = objProduct.Uninstall()
    
    If result = 0 Then
        WScript.Echo "Uninstallation succeeded"
    Else
        WScript.Echo "Uninstallation failed with error: " &amp; result
    End If
Next

The script locates the product by exact name match and calls its
Uninstall method. Return value 0 indicates success. Other values
represent various error conditions. Administrator privileges are typically
required for uninstallation.

## Installing a Product

This example demonstrates installing a product using the Install
method. It shows how to specify an MSI package path and installation options.
The script provides basic error handling.

install_product.vbs
  

msiPath = "C:\Install\ExampleApp.msi"
options = "REBOOT=ReallySuppress /quiet"

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")
Set objProduct = objWMIService.Get("Win32_Product")

result = objProduct.Install(msiPath, options, True)

If result = 0 Then
    WScript.Echo "Installation succeeded"
Else
    WScript.Echo "Installation failed with error: " &amp; result
End If

The script uses the Install method with path and options
parameters. The third parameter enables installation logging. Administrator
privileges are required. The options string follows standard MSI installer
command-line syntax.

## Source

[Win32_Product Class Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-product)

In this article, we have explored the Win32_Product class in
VBScript, covering its usage and practical applications. From software
inventory to installation management, these examples demonstrate powerful
software management capabilities. With this knowledge, you can enhance your
system administration scripts with robust software management features.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).