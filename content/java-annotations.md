+++
title = "Java annotations"
date = 2025-08-29T19:58:04.374+01:00
draft = false
description = "Java annotation tutorial shows how to work with Java annotations."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java annotations

last modified July 4, 2024

 

In this article we talk about Java annotations.

Annotations are a special kind of code element that provides additional
information about a program. They are attached to classes, methods, fields, and
other program elements using the @ symbol.

Annotations themselves don't directly affect how the code runs, but instead
provide metadata that can be used by various tools:

    
        Compiler: The compiler can use annotations to check for errors or suppress
        warnings during compilation. For instance, the @Override annotation tells
        the compiler to verify that a method is actually overriding a method in a
        superclass.
    
    
        Processing tools: Annotations can be processed by various tools during
        compilation or deployment time. These tools can use the information in the
        annotations to generate code, configuration files, or perform other tasks. For
        example, a framework might use annotations to configure how a class is mapped
        to a database table.
    
    
        Runtime: Some annotations are available for introspection at runtime using
        reflection. This allows programs to examine the annotations on classes and
        methods and act accordingly.
    

Here are some key points about Java annotations:

    
        They are metadata: Annotations provide supplemental information about the
        program, not the core functionality.
    
    
        Custom vs. predefined: You can define your own annotations or use
        predefined annotations that are part of the Java platform or third-party
        libraries.
    
    
        Scope: Annotations can be applied to various program elements like
        classes, methods, fields, etc.
    
    
        Retention: Annotations can have different lifespans. Some are retained
        only during compilation, while others are available at runtime via reflection.
    

## The @Override annotation

The @Override annotation in Java is specifically used for method
overriding in inheritance. It's a marker annotation to improve code clarity and
catch errors during compilation.

Here's what @Override does:

    
        Indicates intent: By placing @Override before a method
        declaration in a subclass, you explicitly tell the compiler that you
        intend to override a method from the superclass.
    
    
        Compiler checks: The compiler verifies if the method with the
        @Override annotation actually overrides a method with the
        same name, parameter list, and return type in the direct superclass. If
        not, it throws a compilation error. This helps prevent mistakes like
        typos in method names or accidental overloads (methods with the same
        name but different parameter lists).
    
    
        Improved readability: Using @Override makes your code
        clearer by highlighting methods that are intended to override
        functionalities from the parent class.
    

@Override is not mandatory for overriding methods. The compiler can
usually figure out if a method is intended to override based on the signature.
However, it's considered good practice to use @Override for better code clarity
and catching potential errors early on.

@Override is not used for implementing methods in interfaces.
Interfaces only declare methods, and subclasses implementing interfaces must
provide their own implementation. The compiler inherently checks for this
relationship.

Main.java
  

class User {

    private final String firstName;
    private final String lastName;
    private final String occupation;

    public User(String firstName, String lastName, String occupation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.occupation = occupation;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getOccupation() {
        return occupation;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

void main() {

    User[] users = {
        new User("John", "Doe", "gardener"),
        new User("Roger", "Roe", "driver"),
        new User("Paul", "Smith", "teacher"),
    };

    for (User user : users) {
        System.out.println(user);
    }

}

In the example, we override the Object's toString
method. The method is annotated with @Override. If the function
does not match the parent's one (for instance we use private
instead of public) we get a warning: 
*Cannot reduce the visibility of the inherited method from Object*.

## @Deprecated annotation

The @Deprecated annotation in Java is used to mark classes,
methods, fields, or constructors that are no longer recommended for use. It
serves as a warning to developers that they should avoid using these elements
and consider alternatives.

Key features of the @Deprecated annotation:

    
        Signaling intent: By annotating a program element with
        @Deprecated, you indicate that it's discouraged from being
        used in new code. There might be better alternatives available or the
        element might be scheduled for removal in future versions.
    
    
        Compiler warnings: When the compiler encounters a code element marked as
        @Deprecated, it generates a warning message. This helps
        developers identify potential issues and encourages them to migrate to
        the suggested alternatives.
    
    
        Refactoring: The @Deprecated annotation is often used
        during the evolution of APIs. As libraries and frameworks mature, some
        functionalities might become outdated or replaced by more efficient
        approaches. Deprecation allows for a gradual transition without breaking
        existing code that relies on the old elements.
    

Additional features of the @Deprecated annotation (Java 9 onwards):

    
        since (optional): Specifies the version in which the element was
        deprecated. This provides context for developers about the history of
        the deprecation.
    
    
        forRemoval (optional): Indicates that the element is planned for removal
        in a future major release. This stronger warning encourages developers
        to find alternatives as soon as possible.
    

Main.java
  

class PassWordGenerator {

    @Deprecated
    public String generatePassword() {
        return "generated password";
    }

    public String generateSecurePassword() {
        return "a secure password";
    }
}

// @SuppressWarnings("deprecation")
void main() {

    var pgen = new PassWordGenerator();
    System.out.println(pgen.generateSecurePassword());
    System.out.println(pgen.generatePassword());
}

In the example, we mark the generatePassword with the
@Deprecated annotation, because it is being replaced with a more 
secure alternative. 

The @Deprecated annotation can be suppressed with 
@SuppressWarnings("deprecation") annotation.

## Custom annotation

We can create our own annotations in Java. Key elements of a custom Java
annotation are summarized in the following table:

    
        
            Element
            Description
        
    
    
        
            @interface
            Declaration for creating a custom annotation.
        
        
            @Target
            Specifies where the annotation can be applied (fields, classes, methods, etc.).
        
        
            @Retention
            Determines how long the annotation information is retained (compile-time or runtime).
        
        
            Elements (methods)
            Define attributes or parameters for the annotation (with data types and default values).
        
        
            Doc comments
            Optional comments to document the annotation and its usage.
        
    

The next example creates a custom annotation.

com/zetcode/ClassDescription.java
  

package com.zetcode;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface ClassDescription {
    String description();
}

We have a ClassDescription that is targeted on classes. 

com/ztetcode/AnnotationProcessor.java
  

package com.zetcode;

import java.util.List;
import java.util.Optional;

public class AnnotationProcessor {

    public void process(List&lt;Object&gt; objects) {
        objects.forEach(obj -&gt; {

            Class&lt;?&gt; clazz = obj.getClass();
            ClassDescription annotation = clazz.getAnnotation(ClassDescription.class);

//            if (annotation != null) {
//                System.out.println(annotation.annotationType().getName());
//                System.out.println(annotation.description());
//            }

            Optional.ofNullable(annotation)
                    .ifPresentOrElse(
                            ann -&gt; {
                                System.out.println(ann.annotationType().getName());
                                System.out.println(ann.description());
                            },
                            () -&gt; System.out.println("No annotation found")
                    );

        });
    }
}

The AnnotationProcessor will process the annotation.

com/zetcode/CustomAnnotation.java
  

package com.zetcode;

import java.util.List;

@ClassDescription(description = "this is a User class")
class User {

}

@ClassDescription(description = "this is a Test class")
class Test {

}

class Hello {

}

public class CustomAnnotation {

    private String field;

    public static void main(String[] args) {

        List&lt;Object&gt; objects = List.of(new User(), new Test(), new Hello());

        var processor = new AnnotationProcessor();
        processor.process(objects);

    }
}

We have two classes that are decorated with @ClassDescription. We 
process the instance objects with AnnotationProcessor that will 
print the description of the decorated class.

## Source

[Java annotations - tutorial](https://docs.oracle.com/javase/tutorial/java/annotations/)

In this article we covered annotations in Java. We have shown how to use
existing annotations and how to create [](http://) custom one.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).