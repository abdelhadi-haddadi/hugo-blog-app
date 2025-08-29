+++
title = "Java ResourceBundle"
date = 2025-08-29T20:00:27.948+01:00
draft = false
description = "Java ResourceBundle tutorial shows how to work with ResourceBundle in Java. We create two console application, a GUI application, and a Spring Boot application."
image = "images/swing_application.png"
imageBig = "images/swing_application.png"
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ResourceBundle

last modified January 27, 2024

 

In Java ResourceBundle tutorial we show how to work with a
ResourceBundle in Java.

Hard-coding locale-specific data is not the way to go. Values such as messages
or labels should be placed in a separate file. This way we can handle multiple
locales without having to write different code for each locale. It is also
convenient for translators because they only work with translatable text and do
not look at the programming code.

## Java ResourceBundle

A resource bundle is a Java properties file that contains
locale-specific data. It is a way of internationalizing Java applications by
making the code locale-independent.

Resouce bundles are organized into families with a common base name. For
instance, if we have a words base name, words_sk
matches the locale for the Slovak language. The default resource bundle is used
if a specific locale is not supported.

Resource bundles also support dialects; for example words_es_AR is
used for Spanish language used in Argentina and words_es_BO in
Bolivia.

ResourceBundle is an abstract class that has two subclasses:
PropertyResourceBundle and ListResourceBundle.
PropertyResourceBundle loads the data from a properties file. A
properties file is a plain-text file that contains translatable text. Properties
files are not part of the Java source code, and they can contain only String
values.
ListResourceBundle manages resources with a convenient list; it
gets the data from a class file. We can store any locale-specific object in a
ListResourceBundle.

To get the appropriate ResourceBundle, we invoke the
ResourceBundle.getBundle method. It is a factory method that looks
for a ListResourceBundle, and if it does not find any, it looks for
a PropertyResourceBundle. A MissingResourceException
is thrown if no resource bundle is found.

## Java PropertyResourceBundle example

In the first application, we create a simple Java application that uses three
resource bundles: default English, German, and Slovak.

We create three properties files and place them into the resources
directory.

resources/words.properties
  

w1 = Earth
w2 = ocean

This is the default properties file; it is typically in English language. We
have two words inside the file.

resources/words_de.properties
  

w1 = Erde
w2 = ozean

The words_de.properties file contains words in German language.

resources/words_sk.properties
  

w1 = Zem
w2 = oceán

The words_sk.properties file contains words in Slovak language.

com/zetcode/ResourceBundleEx.java
  

package com.zetcode;

import java.util.Locale;
import java.util.ResourceBundle;

public class ResourceBundleEx {

    static public void main(String[] args) {

        Locale[] locales = {
            Locale.GERMAN,
            new Locale("sk", "SK"),
            Locale.ENGLISH
        };

        System.out.println("w1:");

        for (Locale locale : locales) {

            getWord(locale, "w1");
        }

        System.out.println("w2:");

        for (Locale locale : locales) {

            getWord(locale, "w2");
        }
    }

    static void getWord(Locale curLoc, String key) {

        ResourceBundle words
                = ResourceBundle.getBundle("resources/words", curLoc);

        String value = words.getString(key);

        System.out.printf("Locale: %s, Value: %s %n", curLoc.toString(), value);

    }
}

In the code example, we print all the words used in three resource bundles.

Locale[] locales = {
    Locale.GERMAN,
    new Locale("sk", "SK"),
    Locale.ENGLISH
};

We have three locales in the example: German, Slovak, and English.

for (Locale locale : locales) {

    getWord(locale, "w1");
}

We go through the locales and print the words marked with the
w1 key.

ResourceBundle words
        = ResourceBundle.getBundle("resources/words", curLoc);

With the ResourceBundle.getBundle method, we get the bundle for the
currently used locale. Since we have not created a
ListResourceBundle, the method uses a
PropertyResourceBundle, whis loads the data from a properties file.

String value = words.getString(key);

System.out.printf("Locale: %s, Value: %s %n", curLoc.toString(), value);

We get the value and print the locale name, the key, and the value.

w1:
Locale: de, Value: Erde
Locale: sk_SK, Value: Zem
Locale: en, Value: Earth
w2:
Locale: de, Value: ozean
Locale: sk_SK, Value: oceán
Locale: en, Value: ocean

## Java ListResourceBundle example

In the following application, we use the ListResourceBundle.

We create locale resources for Slovak and Czech languages.

com/zetcode/myres/MyResources_sk.java
  

package com.zetcode.myres;

import java.util.ListResourceBundle;

public class MyResources_sk extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {

        return resources;
    }

    private final Object[][] resources = {

            { "Capital", "Bratislava" },
            { "Area", 49035 },
            { "Currency", "EUR" },
    };
}

Here we have an implementation of the ListResourceBundle for the
Slovak language. We have to override the getContents method.
The method returns an array of key/value pairs.

com/zetcode/myres/MyResources_cs_CZ.java
  

package com.zetcode.myres;

import java.util.ListResourceBundle;

public class MyResources_cs_CZ extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {

        return resources;
    }

    private final Object[][] resources = {

            { "Capital", "Praha" },
            { "Area", 78866 },
            { "Currency", "CZK" },
    };
}

This is the implementation for the Czech language.

com/zetcode/ResourceBundleEx2.java
  

package com.zetcode;

import java.util.Locale;
import java.util.ResourceBundle;

public class ResourceBundleEx2 {

    public static void main(String[] args) {

        Locale sk_loc = new Locale("sk", "SK");
        ResourceBundle bundle =
            ResourceBundle.getBundle("com.zetcode.myres.MyResources", sk_loc);

        System.out.println("Capital: " + bundle.getObject("Capital"));
        System.out.println("Area: " + bundle.getObject("Area"));
        System.out.println("Currency: " + bundle.getObject("Currency"));

        System.out.println();

        Locale cz_loc = new Locale("cs", "CZ");
        ResourceBundle bundle2 =
            ResourceBundle.getBundle("com.zetcode.myres.MyResources", cz_loc);

        System.out.println("Capital: " + bundle2.getObject("Capital"));
        System.out.println("Area: " + bundle2.getObject("Area"));
        System.out.println("Currency: " + bundle2.getObject("Currency"));
    }
}

The example prints some geographical data for Slovakia and Czech Republic.

Locale sk_loc = new Locale("sk", "SK");
ResourceBundle bundle =
    ResourceBundle.getBundle("com.zetcode.myres.MyResources", sk_loc);

With the ResourceBundle.getBundle method, we create a resource
bundle from a com.zetcode.myres.MyResources_sk.class.

Capital: Bratislava
Area: 49035
Currency: EUR
Capital: Praha
Area: 78866
Currency: CZK

## Swing application

In the third example, we create a simple GUI application using Java Swing.
The example enables to dynamically change the language of the UI. The example
uses the ListResourceBundle class.

The source code and the images are available at the author's
[Github repository](https://github.com/janbodnar/Java-ResourceBundle).

com/zetcode/myres/MyResources_sk.java
  

package com.zetcode.myres;

import java.util.ListResourceBundle;
import javax.swing.ImageIcon;

public class MyResources_sk extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {

        return resources;
    }

    private final Object[][] resources = {

        {"name", "Slovensko"},
        {"lang_menu", "Jazyk"},
        {"lang_sk", "Slovenčina"},
        {"lang_hu", "Maďarčina"},
        {"flag", new ImageIcon("src/resources/slovakia.png")},
        {"description", "Slovensko je vnútrozemský štát v strednej Európe."}
    };
}

These are resources for the Slovak language. We have five strings and an
ImageIcon.

com/zetcode/myres/MyResources_hu.java
  

package com.zetcode.myres;

import java.util.ListResourceBundle;
import javax.swing.ImageIcon;

public class MyResources_hu extends ListResourceBundle {

    @Override
    protected Object[][] getContents() {

        return resources;
    }

    private final Object[][] resources = {

        {"name", "Magyarország"},
        {"lang_menu", "Nyelv"},
        {"lang_sk", "Szlovák"},
        {"lang_hu", "Magyar"},
        {"flag", new ImageIcon("src/resources/hungary.png")},
        {"description", "Magyarország közép-európai ország "
            + "a Kárpát-medencében."}
    };
}

These are resources for the Hungarian language.

com/zetcode/ResourceBundleEx3.java
  

package com.zetcode;

import java.awt.Container;
import java.awt.EventQueue;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.util.Locale;
import java.util.ResourceBundle;
import javax.swing.ButtonGroup;
import javax.swing.GroupLayout;
import javax.swing.Icon;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.LayoutStyle;

/*
 * Java ResourceBundle tutorial
 *
 * This program uses a ResourceBundle in a
 * Java Swing application.
 *
 * Author: Jan Bodnar
 * Website: zetcode.com
 * Last modified: October 2022
 */
public class ResourceBundleEx3 extends JFrame {

    private ResourceBundle bundle;
    private JLabel flag;
    private JLabel lbl;
    private JMenu langMenu;
    private JRadioButtonMenuItem skMenuItem;
    private JRadioButtonMenuItem huMenuItem;

    public ResourceBundleEx3() {

        initUI();
    }

    private void initUI() {

        createMenuBar();

        flag = new JLabel();
        lbl = new JLabel();

        updateLanguage(new Locale("sk", "SK"));

        createLayout(lbl, flag);
        pack();

        setTitle(bundle.getString("name"));
        setLocationRelativeTo(null);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
    }

    private void updateLanguage(Locale locale) {

        bundle = ResourceBundle.getBundle("com.zetcode.myres.MyResources", locale);
        langMenu.setText(bundle.getString("lang_menu"));
        skMenuItem.setText(bundle.getString("lang_sk"));
        huMenuItem.setText(bundle.getString("lang_hu"));
        flag.setIcon((Icon) bundle.getObject("flag"));
        lbl.setText(bundle.getString("description"));
        setTitle(bundle.getString("name"));
        pack();
    }

    private void createMenuBar() {

        JMenuBar menubar = new JMenuBar();

        langMenu = new JMenu();
        langMenu.setMnemonic(KeyEvent.VK_F);

        ButtonGroup btnGroup = new ButtonGroup();

        skMenuItem = new JRadioButtonMenuItem("Slovak", true);
        btnGroup.add(skMenuItem);

        skMenuItem.addActionListener((ActionEvent e) -&gt; {
            updateLanguage(new Locale("sk", "SK"));
        });

        langMenu.add(skMenuItem);

        huMenuItem = new JRadioButtonMenuItem("Hungarian");
        btnGroup.add(huMenuItem);

        huMenuItem.addActionListener((ActionEvent e) -&gt; {
            updateLanguage(new Locale("hu", "HU"));
        });

        langMenu.add(huMenuItem);

        menubar.add(langMenu);

        setJMenuBar(menubar);
    }

    private void createLayout(JComponent... arg) {

        Container pane = getContentPane();
        GroupLayout gl = new GroupLayout(pane);
        pane.setLayout(gl);

        gl.setAutoCreateContainerGaps(true);

        gl.setHorizontalGroup(gl.createParallelGroup()
                .addComponent(arg[0])
                .addComponent(arg[1])
        );

        gl.setVerticalGroup(gl.createSequentialGroup()
                .addComponent(arg[0])
                .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(arg[1])
        );
    }

    public static void main(String[] args) {

        EventQueue.invokeLater(() -&gt; {
            ResourceBundleEx3 ex = new ResourceBundleEx3();
            ex.setVisible(true);
        });
    }
}

We have a menubar with a menu that contains two radio button menu items.
Selecting a radio button menu item changes the language of the application's
user interface.

private void updateLanguage(Locale locale) {

    bundle = ResourceBundle.getBundle("com.zetcode.myres.MyResources", locale);
    langMenu.setText(bundle.getString("lang_menu"));
    skMenuItem.setText(bundle.getString("lang_sk"));
    huMenuItem.setText(bundle.getString("lang_hu"));
    flag.setIcon((Icon) bundle.getObject("flag"));
    lbl.setText(bundle.getString("description"));
    setTitle(bundle.getString("name"));
    pack();
}

When we select a radio button menu item, the updateLanguage method
is called. It creates a new ResourceBundle based on the given locale
and updates the menu, radio menu items, image icon, description, and frame title.

skMenuItem.addActionListener((ActionEvent e) -&gt; {
    updateLanguage(new Locale("sk", "SK"));
});

Selecting a Slovak radio button menu item, we call the updateLanguage
method and pass a Slovak locale as a parameter.

![swing_application.png](images/swing_application.png)

Figure: Swing application

## Spring Boot application

In the next example, we use resource bundles in a Spring Boot application.
Spring is a popular Java application framework. Spring Boot is a new solution
to create stand-alone, production-grade Spring based applications with minimal effort.

Again, we create three properties files and place them into the
src/main/resources/messages directory.

resources/messages/words.properties
  

w1 = Earth
w2 = ocean

This is the default properties file.

resources/messages/words_de.properties
  

w1 = Erde
w2 = ozean

The words_de.properties file contains words in German language.

resources/messages/words_sk.properties
  

w1 = Zem
w2 = oceán

The words_sk.properties file contains words in Slovak language.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '2.6.7'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;

@SpringBootApplication
public class Application {

    @Bean
    public ResourceBundleMessageSource messageSource() {

        ResourceBundleMessageSource source = new ResourceBundleMessageSource();
        source.setBasenames("messages/words");
        source.setUseCodeAsDefaultMessage(true);

        return source;
    }

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}

Application is the main application class. We set up the Spring Boot program.

@Bean
public ResourceBundleMessageSource messageSource() {

    ResourceBundleMessageSource source = new ResourceBundleMessageSource();
    source.setBasenames("messages/words");
    source.setUseCodeAsDefaultMessage(true);

    return source;
}

With the @Bean annotation, we produce a ResourceBundleMessageSource bean,
which is managed by the Spring container. 
ResourceBundleMessageSource is a MessageSource
implementation that accesses resource bundles using specified basenames. This
class relies on the underlying JDK's
ResourceBundle implementation.

com/zetcode/MyRunner.java
  

package com.zetcode;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class MyRunner implements CommandLineRunner {

    private MessageSource messageSource;

    public MyRunner(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(messageSource.getMessage("w1",
                null, Locale.GERMAN));
        System.out.println(messageSource.getMessage("w1",
                null, Locale.ENGLISH));
        System.out.println(messageSource.getMessage("w2",
                null, new Locale("sk", "SK")));
    }
}

MyRunner is a command line runner for the Spring Boot application.

private MessageSource messageSource;

public MyRunner(MessageSource messageSource) {
    this.messageSource = messageSource;
}

We inject the MessageSource into the field.

System.out.println(messageSource.getMessage("w1",
        null, Locale.GERMAN));

We get the word w1 in the German locale with the getMessage method.

...
Erde
Earth
oceán
...

## Source

[Java ResourceBundle - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ResourceBundle.html)

In this article we have covered the Java ResourceBundle. We
created two Java console applications, one Swing application, and one Spring
Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).