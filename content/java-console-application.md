+++
title = "Java console application"
date = 2025-08-29T19:58:30.481+01:00
draft = false
description = "Java console application tutorial shows how to create a Java console application. The application computes some statistics."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java console application

last modified January 27, 2024

 

Java console application tutorial shows how to create a Java console 
application. The application computes some statistics.

## Java console example

The following example creates a Java console application which reads
data from a CSV file and computes some basic statistics.

The example uses Apache Commons libraries to parse command line arguments,
do math, and transform data. The OpenCSV library is used to read CSV
data. 

src/resources/data.csv
  

2.3, 3.5, 5, 6.7, 3.2, 1.2, 6.7, 7.8
4.5, 2.1, 6.6, 8.7, 3.2, 1.0, 1.2, 3

This is the data file. The file name will be a console 
parameter to our program.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               JavaStatsEx.java
│   │               MyStatsApp.java
│   └───resources
│           data.txt
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;javastatsex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;12&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;12&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;commons-cli&lt;/groupId&gt;
            &lt;artifactId&gt;commons-cli&lt;/artifactId&gt;
            &lt;version&gt;1.4&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.opencsv&lt;/groupId&gt;
            &lt;artifactId&gt;opencsv&lt;/artifactId&gt;
            &lt;version&gt;4.6&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
            &lt;artifactId&gt;commons-math3&lt;/artifactId&gt;
            &lt;version&gt;3.6.1&lt;/version&gt;
        &lt;/dependency&gt;
       
    &lt;/dependencies&gt;

&lt;/project&gt;

In the pom.xml file, we define the dependencies of 
the application. The commons-cli artifact is for parsing
command line arguments, opencsv for reading CSV data, 
commons-math for statistical calculations, 
and commons-lang3 for transforming list into an array.

The exec-maven-plugin executes Java programs from Maven.
In the arguments tag, we give the application the option 
and the filename.

com/zetcode/JavaStatsEx.java
  

package com.zetcode;

/**
 * Starter class for MyStats application.
 *
 * @author janbodnar
 */

public class JavaStatsEx {

    /**
     * Application entry point.
     *
     * @param args application command line arguments
     */
    public static void main(String[] args) {

        var app = new MyStatsApp();
        app.run(args);
    }
}

JavaStatsEx is the application entry point. It creates
the instance of MyStatsApp and passes it the application 
arguments.

com/zetcode/MyStatsApp.java
  

package com.zetcode;

import com.opencsv.CSVReaderBuilder;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Options;
import org.apache.commons.cli.ParseException;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.math3.stat.StatUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

/**
 * MyStatsApp is a simple console application which computes
 * basic statistics of a series of data values. The application takes
 * a file of data as its single argument.
 *
 * @author janbodnar
 */
public class MyStatsApp {

    /**
     * Runs the application
     *
     * @param args an array of String arguments to be parsed
     */
    public void run(String[] args) {

        CommandLine line = parseArguments(args);

        if (line.hasOption("filename")) {

            System.out.println(line.getOptionValue("filename"));
            String fileName = line.getOptionValue("filename");

            double[] data = readData(fileName);
            calculateAndPrintStats(data);

        } else {
            printAppHelp();
        }
    }

    /**
     * Parses application arguments
     *
     * @param args application arguments
     * @return &lt;code&gt;CommandLine&lt;/code&gt; which represents a list of application
     * arguments.
     */
    private CommandLine parseArguments(String[] args) {

        Options options = getOptions();
        CommandLine line = null;

        CommandLineParser parser = new DefaultParser();

        try {
            line = parser.parse(options, args);

        } catch (ParseException ex) {

            System.err.println("Failed to parse command line arguments");
            System.err.println(ex.toString());
            printAppHelp();

            System.exit(1);
        }

        return line;
    }

    /**
     * Reads application data from a file
     *
     * @param fileName file of application data
     * @return array of double values
     */
    private double[] readData(String fileName) {

        var data = new ArrayList&lt;Double&gt;();
        double[] mydata = null;

        try (var reader = Files.newBufferedReader(Paths.get(fileName));
             var csvReader = new CSVReaderBuilder(reader).build()) {

            String[] nextLine;

            while ((nextLine = csvReader.readNext()) != null) {

                for (String e : nextLine) {

                    data.add(Double.parseDouble(e));
                }
            }

            mydata = ArrayUtils.toPrimitive(data.toArray(new Double[0]));

        } catch (IOException ex) {

            System.err.println("Failed to read file");
            System.err.println(ex.toString());
            System.exit(1);
        }

        return mydata;
    }

    /**
     * Generates application command line options
     *
     * @return application &lt;code&gt;Options&lt;/code&gt;
     */
    private Options getOptions() {

        var options = new Options();

        options.addOption("f", "filename", true, "file name to load data from");
        return options;
    }

    /**
     * Prints application help
     */
    private void printAppHelp() {

        Options options = getOptions();

        var formatter = new HelpFormatter();
        formatter.printHelp("JavaStatsEx", options, true);
    }

    /**
     * Calculates and prints data statistics
     *
     * @param data input data
     */
    private void calculateAndPrintStats(double[] data) {

        System.out.format("Geometric mean: %f%n", StatUtils.geometricMean(data));
        System.out.format("Arithmetic mean: %f%n", StatUtils.mean(data));
        System.out.format("Max: %f%n", StatUtils.max(data));
        System.out.format("Min: %f%n", StatUtils.min(data));
        System.out.format("Sum: %f%n", StatUtils.sum(data));
        System.out.format("Variance: %f%n", StatUtils.variance(data));
    }
}

This is MyStatsApp.

CommandLine line = parseArguments(args);

The parseArguments method parses the command line arguments.
It returns CommandLine, which represents a list of 
arguments parsed against a Options descriptor.

if (line.hasOption("filename")) {

    System.out.println(line.getOptionValue("filename"));
    String fileName = line.getOptionValue("filename");

    double[] data = readData(fileName);
    calculateAndPrintStats(data);

} else {
    printAppHelp();
}

The application has a mandatory filename option, which points to the 
file to be read and compute statistics from. If it is not present, 
we provide the application help message.

Options options = getOptions();

The getOptions method returns the options of the application.

try {
    line = parser.parse(options, args);

} catch (ParseException ex) {

    System.err.println("Failed to parse command line arguments");
    System.err.println(ex.toString());
    printAppHelp();

    System.exit(1);
}

return line;

CommandLineParser parses the command line arguments. 
The application exits if there is a ParseException.
The parser returns parsed arguments in CommandLine object.

try (var reader = Files.newBufferedReader(Paths.get(fileName));
    var csvReader = new CSVReaderBuilder(reader).build()) {

CSVReader is used to read CSV data. 

String[] nextLine;

while ((nextLine = csvReader.readNext()) != null) {

    for (String e : nextLine) {

        data.add(Double.parseDouble(e));
    }
}

In this while loop, we read the CSV file line by line and parse the data
into a list of Double values.

mydata = ArrayUtils.toPrimitive(data.toArray(new Double[0]));

We need primitive data types to calculate the statistics; therefore, 
we transform the list into an array of primitive double values.
ArrayUtils comes from the Apache Commons Lang library.

private Options getOptions() {

    var options = new Options();

    options.addOption("f", "filename", true, "file name to load data from");
    return options;
}

The getOptions provides the application options.

private void printAppHelp() {

    Options options = getOptions();

    var formatter = new HelpFormatter();
    formatter.printHelp("JavaStatsEx", options, true);
}

The printAppHelp prints the help of the application. 
It uses HelpFormatter to do the job.

private void calculateAndPrintStats(double[] data) {

    System.out.format("Geometric mean: %f%n", StatUtils.geometricMean(data));
    System.out.format("Arithmetic mean: %f%n", StatUtils.mean(data));
    System.out.format("Max: %f%n", StatUtils.max(data));
    System.out.format("Min: %f%n", StatUtils.min(data));
    System.out.format("Sum: %f%n", StatUtils.sum(data));
    System.out.format("Variance: %f%n", StatUtils.variance(data));
}

With StatUtils, we compute some statistics. 
The StatUtils takes a Java array as a parameter. 

src/main/resources/data.txt
Geometric mean: 3.412562
Arithmetic mean: 4.168750
Max: 8.700000
Min: 1.000000
Sum: 66.700000
Variance: 6.158292

## Source

[Java language reference](https://docs.oracle.com/en/java/javase/21/docs/api/index.html)

In this article we have created a simple Java console application, which
computes basic statistics from a CSV file.

    

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).