+++
title = "Java PDFBox"
date = 2025-08-29T20:00:06.318+01:00
draft = false
description = "Java PDFBox tutorial shows how to create PDF files in Java with PDFBox. Apache PDFBox is used to work with PDF files."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java PDFBox

last modified January 27, 2024

 

Java PDFBox tutorial shows how to create PDF files in Java with PDFBox.

## PDFBox

Apache PDFBox  is an open source Java library that can be used 
to create, render, print, split, merge, alter, verify and extract text 
and meta-data of PDF files.

Another very popular Java library for working with PDF files is called *iText*.

## PDFBox Maven dependency

We need to add the following Maven dependency for our projects.

&lt;dependency&gt;
    &lt;groupId&gt;org.apache.pdfbox&lt;/groupId&gt;
    &lt;artifactId&gt;pdfbox&lt;/artifactId&gt;
    &lt;version&gt;2.0.8&lt;/version&gt;
&lt;/dependency&gt;   

## Java PDFBox write text

In the following example, we create a PDF document and write some text into 
it.

JavaPdfBoxWriteText.java
  

package com.zetcode;

import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

public class JavaPdfBoxWriteText {

    public static void main(String[] args) throws IOException {

        try (PDDocument doc = new PDDocument()) {

            PDPage myPage = new PDPage();
            doc.addPage(myPage);

            try (PDPageContentStream cont = new PDPageContentStream(doc, myPage)) {

                cont.beginText();

                cont.setFont(PDType1Font.TIMES_ROMAN, 12);
                cont.setLeading(14.5f);

                cont.newLineAtOffset(25, 700);
                String line1 = "World War II (often abbreviated to WWII or WW2), "
                        + "also known as the Second World War,";
                cont.showText(line1);

                cont.newLine();

                String line2 = "was a global war that lasted from 1939 to 1945, "
                        + "although related conflicts began earlier.";
                cont.showText(line2);
                cont.newLine();

                String line3 = "It involved the vast majority of the world's "
                        + "countries—including all of the great powers—";
                cont.showText(line3);
                cont.newLine();

                String line4 = "eventually forming two opposing military "
                        + "alliances: the Allies and the Axis.";
                cont.showText(line4);
                cont.newLine();

                cont.endText();
            }

            doc.save("src/main/resources/wwii.pdf");
        }
    }
}

The example writes four lines into a PDF document.

try (PDDocument doc = new PDDocument()) {

A new PDDocument is created. By default, the document 
has an A4 format.

PDPage myPage = new PDPage();
doc.addPage(myPage);

A new page is created and added to the document.

try (PDPageContentStream cont = new PDPageContentStream(doc, myPage)) {

To write to a PDF page, we have to create a PDPageContentStream object.

cont.beginText();

...

cont.endText();

Text is written betweeen beginText and endText methods.

cont.setFont(PDType1Font.TIMES_ROMAN, 12);
cont.setLeading(14.5f);

We set the font and text leading.

cont.newLineAtOffset(25, 700);

We start a new line of text with newLineAtOffset method.
The origin of a page is at the bottom-left corner.

String line1 = "World War II (often abbreviated to WWII or WW2), "
        + "also known as the Second World War,";
cont.showText(line1);

The text is written with showText method.

cont.newLine();

With the newLine method, we move to the start of the next line of text.

## Java PDFBox read text

The next example reads text from a PDF file.

JavaPdfBoxReadText.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

public class JavaPdfBoxReadText {

    public static void main(String[] args) throws IOException {

        File myFile = new File("src/main/resources/wwii.pdf");

        try (PDDocument doc = PDDocument.load(myFile)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);

            System.out.println("Text size: " + text.length() + " characters:");
            System.out.println(text);
        }
    }
}

The example prints the text and its size of a PDF document.

File myFile = new File("src/main/resources/wwii.pdf");

try (PDDocument doc = PDDocument.load(myFile)) {

We load a PDF document from the src/main/resources directory.

PDFTextStripper stripper = new PDFTextStripper();
String text = stripper.getText(doc);

PDFTextStripper is used to extract text from the PDF file.

## Java PDFBox create image

The next example creates an image in a PDF document.

JavaPdfBoxCreateImage.java
  

package com.zetcode;

import java.io.IOException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

public class JavaPdfBoxCreateImage {

    public static void main(String[] args) throws IOException {
        
        try (PDDocument doc = new PDDocument()) {

            PDPage myPage = new PDPage();
            doc.addPage(myPage);

            String imgFileName = "src/main/resources/sid2.jpg";
            PDImageXObject pdImage = PDImageXObject.createFromFile(imgFileName, doc);
            
            int iw = pdImage.getWidth();
            int ih = pdImage.getHeight();
            
            float offset = 20f; 

            try (PDPageContentStream cont = new PDPageContentStream(doc, myPage)) {
                
                cont.drawImage(pdImage, offset, offset, iw, ih);
            }
            
            doc.save("src/main/resources/mydoc.pdf");
        }
    }
}

The example loads an image from a directory, creates a new PDF document, and 
adds the image into the page.

String imgFileName = "src/main/resources/sid2.jpg";
PDImageXObject pdImage = PDImageXObject.createFromFile(imgFileName, doc);

PDImageXObject is used to work with images in PDFBox.

int iw = pdImage.getWidth();
int ih = pdImage.getHeight();

We get the width and height of the image.

try (PDPageContentStream cont = new PDPageContentStream(doc, myPage)) {
    
    cont.drawImage(pdImage, offset, offset, iw, ih);
}

PDPageContentStream's drawImage draws the 
image into the page.

## Java PDFBox document information

PDF documents can contain information describing the document itself or certain objects 
within the document such as the author of the document or it's creation date. 
Basic information can be set and retrieved using the PDDocumentInformation object.

JavaPdfBoxDocumentInformation.java
  

package com.zetcode;

import java.io.IOException;
import java.util.Calendar;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;

public class JavaPdfBoxDocumentInformation {

    public static void main(String[] args) throws IOException {

        try (PDDocument doc = new PDDocument()) {

            PDPage myPage = new PDPage();
            doc.addPage(myPage);

            PDDocumentInformation pdi = doc.getDocumentInformation();
            
            pdi.setAuthor("Jan Bodnar");
            pdi.setTitle("World war II");
            pdi.setCreator("Java code");
            
            Calendar date = Calendar.getInstance();
            pdi.setCreationDate(date);
            pdi.setModificationDate(date);

            pdi.setKeywords("World war II, conflict, Allies, Axis powers");

            doc.save("src/main/resources/mydoc.pdf");
        }
    }
}

The example creates some document information metadata. The information can be seen
in the properties of the PDF document in a PDF viewer.

PDDocumentInformation pdi = doc.getDocumentInformation();

We get the PDDocumentInformation object. 

pdi.setAuthor("Jan Bodnar");
pdi.setTitle("World war II");
pdi.setCreator("Java code");

We set some metadata information.

## Java PDFBox writing metadata

Extensible Metadata Platform (XMP) is an ISO standard for the creation, 
processing and interchange of standardized and custom metadata for digital 
documents and data sets. PDF files use XMP for storing additional metadata 
information.

metadata.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;x:xmpmeta xmlns:x="adobe:ns:meta/"&gt;
    &lt;rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"  
             xmlns:foaf="http://xmlns.com/foaf/0.1/" 
             xmlns:dc="http://purl.org/dc/elements/1.1/"&gt;
             
        &lt;rdf:Description rdf:about=""&gt;
            &lt;dc:title&gt;World war II&lt;/dc:title&gt;
            &lt;dc:date&gt;2018-01-25&lt;/dc:date&gt;
            &lt;dc:author&gt;Jan Bodnar&lt;/dc:author&gt;
        &lt;/rdf:Description&gt;
    &lt;/rdf:RDF&gt;
&lt;/x:xmpmeta&gt;

This is an XML document having some basic metadata about a PDF document.

JavaPdfBoxMetadataWrite.java
  

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDMetadata;

public class JavaPdfBoxMetadataWrite {

       public static void main(String[] args) throws IOException {

        try (PDDocument doc = new PDDocument()) {

            PDPage myPage = new PDPage();

            File myFile = new File("src/main/resources/metadata.xml");
            
            try (InputStream is = Files.newInputStream(myFile.toPath())) {
                
                PDMetadata meta = new PDMetadata(doc, is);
                
                PDDocumentCatalog catalog = doc.getDocumentCatalog();
                catalog.setMetadata(meta);
                
                doc.addPage(myPage);
            }
            
            doc.save("src/main/resources/mydoc.pdf");
        }
    }
}

The example reads metadata from an XML file and stores it in the generated binary 
document. 

PDMetadata meta = new PDMetadata(doc, is);

PDMetadata is used to work with metadata. 

PDDocumentCatalog catalog = doc.getDocumentCatalog();
catalog.setMetadata(meta);

We set the metadata to the document's catalog.

## Java PDFBox reading metadata

In the next example, we read metadata from a PDF document.

JavaPdfBoxMetadataRead.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.common.PDMetadata;

public class JavaPdfBoxMetadataRead {

    public static void main(String[] args) throws IOException {

        File myFile = new File("src/main/resources/sinatra.pdf");

        try (PDDocument doc = PDDocument.load(myFile)) {
            
            PDDocumentCatalog catalog = doc.getDocumentCatalog();
            PDMetadata metadata = catalog.getMetadata();
            
            if (metadata == null) {
                
                System.err.println("No metadata in document");
                System.exit(1);
            }

            try (InputStream is = metadata.createInputStream();
                    InputStreamReader isr = new InputStreamReader(is);
                    BufferedReader br = new BufferedReader(isr)) {
                
                br.lines().forEach(System.out::println);
            }
        }
    }
}

The example reads metadata from a PDF document and prints it to the console.

PDDocumentCatalog catalog = doc.getDocumentCatalog();
PDMetadata metadata = catalog.getMetadata();

We retrieve PDMetadata from the PDDocumentCatalog.

if (metadata == null) {
    
    System.err.println("No metadata in document");
    System.exit(1);
}

The document may not contain metadata; therefore, we do some simple checking.

try (InputStream is = metadata.createInputStream();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr)) {
    
    br.lines().forEach(System.out::println);
}

The createInputStream creates an input stream to the document's
metadata. We read the data from this stream and print it to the terminal.

## Source

[Java PdfBox documentation](https://pdfbox.apache.org/)

In this article we have shown how to work with PDF files in Java using PDFBox library. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).