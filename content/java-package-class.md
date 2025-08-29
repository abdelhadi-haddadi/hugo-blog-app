+++
title = "Java Package Class"
date = 2025-08-29T19:59:52.643+01:00
draft = false
description = "Complete Java Package class tutorial covering all methods with examples. Learn about package metadata, versioning, and other Package class methods."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Package Class

Last modified: April 13, 2025

 

The java.lang.Package class represents metadata about a Java package.
It contains version information about the implementation and specification of a
package. This information is typically obtained from the manifest of the JAR file.

Package objects contain version information about the implementation and
specification of a Java package. This version information is retrieved and made
available by the ClassLoader instance that loaded the classes.

## Package Class Methods

The Package class provides several methods to access package information. These
include methods to get package name, implementation version, specification
version, and annotations. The class also provides methods to get all packages.

public class Package implements java.lang.reflect.AnnotatedElement {
    public String getName() {...}
    public String getSpecificationTitle() {...}
    public String getSpecificationVersion() {...}
    public String getSpecificationVendor() {...}
    public String getImplementationTitle() {...}
    public String getImplementationVersion() {...}
    public String getImplementationVendor() {...}
    public boolean isSealed() {...}
    public static Package getPackage(String name) {...}
    public static Package[] getPackages() {...}
}

The code above shows the main methods provided by the Package class. These methods
allow access to package metadata that can be useful for version checking and
package management.

## Getting Package Information

The most basic use of the Package class is to get information about a package.
This example shows how to get package name, implementation, and specification
details.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Package pkg = Package.getPackage("java.lang");
        
        System.out.println("Package name: " + pkg.getName());
        System.out.println("Specification Title: " + 
                         pkg.getSpecificationTitle());
        System.out.println("Specification Version: " + 
                         pkg.getSpecificationVersion());
        System.out.println("Implementation Title: " + 
                         pkg.getImplementationTitle());
        System.out.println("Implementation Version: " + 
                         pkg.getImplementationVersion());
    }
}

This example retrieves package information for the java.lang package. The output
shows various metadata including version numbers. Note that some values may be
null if not specified in the manifest.

## Getting All Packages

The Package class provides a method to get all packages currently known to the
calling JVM. This can be useful for inspecting the loaded packages in a runtime.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Package[] packages = Package.getPackages();
        
        System.out.println("Number of packages: " + packages.length);
        System.out.println("\nFirst 5 packages:");
        
        for (int i = 0; i &lt; Math.min(5, packages.length); i++) {
            System.out.println(packages[i].getName());
        }
    }
}

This example lists all packages currently loaded in the JVM. For brevity, we only
show the first 5 packages. The actual output will vary depending on what classes
have been loaded.

## Checking Package Sealing

A sealed package is one where all classes must come from the same JAR file. The
Package class provides a method to check if a package is sealed.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Package pkg = Main.class.getPackage();
        
        System.out.println("Package name: " + pkg.getName());
        System.out.println("Is sealed: " + pkg.isSealed());
        
        Package langPkg = Package.getPackage("java.lang");
        System.out.println("\njava.lang package is sealed: " + 
                         langPkg.isSealed());
    }
}

This example checks if the current package (containing Main class) and the
java.lang package are sealed. Sealing prevents classes from being added to the
package from other sources after definition.

## Package Version Comparison

The Package class allows comparison of specification versions using the
isCompatibleWith method. This checks if the current specification version is
compatible with the requested version.

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        try {
            Package pkg = Package.getPackage("java.lang");
            
            String requiredVersion = "1.8";
            boolean compatible = pkg.isCompatibleWith(requiredVersion);
            
            System.out.println("Package: " + pkg.getName());
            System.out.println("Specification Version: " + 
                             pkg.getSpecificationVersion());
            System.out.println("Is compatible with " + requiredVersion + 
                             ": " + compatible);
        } catch (NumberFormatException e) {
            System.out.println("Invalid version format");
        }
    }
}

This example checks if the java.lang package's specification version is
compatible with version 1.8. The method throws NumberFormatException if the
version string format is invalid.

## Getting Package Annotations

Since Package implements AnnotatedElement, we can retrieve annotations declared
on a package. This example shows how to access package-level annotations.

Main.java
  

package com.zetcode;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.PACKAGE)
@interface PackageInfo {
    String author();
    String version() default "1.0";
}

@PackageInfo(author = "John Doe", version = "2.0")
package com.example;

public class Main {

    public static void main(String[] args) {
        Package pkg = Main.class.getPackage();
        PackageInfo info = pkg.getAnnotation(PackageInfo.class);
        
        System.out.println("Package: " + pkg.getName());
        System.out.println("Author: " + info.author());
        System.out.println("Version: " + info.version());
    }
}

This example defines a custom annotation for packages and applies it to the
com.example package. We then retrieve and display the annotation values. Note
that package-info.java should be used in real projects.

## Getting Package for a Class

We can get the Package object for a specific class using the getPackage method
of Class. This is often more reliable than using Package.getPackage().

Main.java
  

package com.zetcode;

public class Main {

    public static void main(String[] args) {
        Package pkg1 = Main.class.getPackage();
        Package pkg2 = String.class.getPackage();
        
        System.out.println("Main class package: " + 
                         (pkg1 != null ? pkg1.getName() : "null"));
        System.out.println("String class package: " + pkg2.getName());
        
        // Alternative way using Package.getPackage()
        Package pkg3 = Package.getPackage("java.lang");
        System.out.println("\nPackage.getPackage() result: " + 
                         (pkg3 != null ? pkg3.getName() : "null"));
    }
}

This example shows two ways to get Package objects. The Class.getPackage()
method is generally preferred as Package.getPackage() may return null if the
package hasn't been loaded yet.

## Source

[Java Package Class Documentation](https://docs.oracle.com/javase/8/docs/api/java/lang/Package.html)

In this article, we've covered all major methods of the Java Package class with
practical examples. Understanding package metadata is important for version
management and package organization in larger applications.

## Author

My name is Jan Bodnar, and I am a dedicated programmer with many years of
experience in the field. I began writing programming articles in 2007 and have
since authored over 1,400 articles and eight e-books. With more than eight years
of teaching experience, I am committed to sharing my knowledge and helping
others master programming concepts.

List [all Java tutorials](/java/).