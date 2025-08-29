+++
title = "C# QuestPDF"
date = 2025-08-29T19:51:15.266+01:00
draft = false
description = "C# QuestPDF tutorial shows how to create PDF documents in C#. PDF is a versatile file format created by Adobe that gives people an easy, reliable way to present and exchange documents."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# QuestPDF

last modified July 5, 2023

 

In this article we show how to create PDF documents using the QuestPDF library.

Portable Document Format (PDF) is a versatile file format created by
Adobe that gives people an easy, reliable way to present and exchange documents.

*QuestPDF* is an open-source .NET library for PDF generation. The library 
uses Skia to do the rendering. QuestPDF uses Fluent API. 

## C# QuestPDF simple example

The following example creates a simple PDF file.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var doc = Document.Create(container =&gt; container.Page(page =&gt;
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);
        page.DefaultTextStyle(x =&gt; x.FontSize(12));

        page.Content()
            .Column(x =&gt; x.Item().Text(Placeholders.Paragraph()));
    }));

doc.GeneratePdf("simple.pdf");

The PDF document contains one paragraph of text.

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

We import the QuestPDF types.

var doc = Document.Create(container =&gt; container.Page(page =&gt;

The document is created with Document.Create. A new page is added 
with Page.

page.Size(PageSizes.A4);
page.Margin(2, Unit.Centimetre);
page.DefaultTextStyle(x =&gt; x.FontSize(12));

We set some basic properties of a page: the page size, margines, and default
font size.

page.Content()
    .Column(x =&gt; x.Item().Text(Placeholders.Paragraph()));

The content is added with Content. It consists of one column of
text. Into the column, we add one text item. The
Placeholders.Paragraph creates a lorem impsum paragraph of text. 

doc.GeneratePdf("simple.pdf");

The PDF is generated with GeneratePdf.

## C# QuestPDF text

In the next example, we work with various text attributes.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var doc = Document.Create(container =&gt; container.Page(page =&gt;
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);

        page.Content()
            .Column(x =&gt;
            {
                x.Item().Text(Placeholders.Sentence());
                x.Spacing(10);
                x.Item().Text(Placeholders.Sentence()).FontSize(15);
                x.Spacing(10);
                x.Item().Text(Placeholders.LoremIpsum());
                x.Spacing(10);
                x.Item().Text(Placeholders.Paragraph()).FontFamily("Georgia");
                x.Spacing(10);
                x.Item().Text(Placeholders.Sentence()).FontColor(Colors.Blue.Darken3);
                x.Spacing(10);
                x.Item().Text(txt =&gt;
                {
                    txt.Span("C# ").Italic();
                    txt.Span("is a modern, object-oriented, and type-safe programming language.");
                });

            });
    }));

doc.GeneratePdf("text.pdf");

In the program, we utilize the Sentence, Paragraph,
LoremIpsum helper methods to generate some filler text.

x.Item().Text(Placeholders.Sentence());
x.Spacing(10);
x.Item().Text(Placeholders.Sentence()).FontSize(15);

We add two sentences. A spacing is added between them with Spacing.
The FontSize sets the size of the font for the sentence.

x.Item().Text(Placeholders.Paragraph()).FontFamily("Georgia");

For this paragraph, we choose the Georgia font.

x.Item().Text(Placeholders.Sentence()).FontColor(Colors.Blue.Darken3);

For this sentence, we choose a dark blue font color.

x.Item().Text(txt =&gt;
{
    txt.Span("C# ").Italic();
    txt.Span("is a modern, object-oriented, and type-safe programming language.");
});

With Span, we can change the attributes of the text item. We set
the italic style for the first text span. 

## C# QuestPDF header &amp; footer

For the next document, we add a header and a footer.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var doc = Document.Create(container =&gt; container.Page(page =&gt;
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);

        page.Header()
            .Text("My header")
            .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

        page.Content()
            .PaddingVertical(1, Unit.Centimetre)
            .Column(x =&gt;
            {

                x.Item().Text(Placeholders.LoremIpsum());
                x.Spacing(20);
                x.Item().Text(Placeholders.LoremIpsum());
            });

        page.Footer()
            .Text(x =&gt;
            {
                x.Span("Page ");
                x.CurrentPageNumber();
            });
    }));

doc.GeneratePdf("headfoot.pdf");

The document has three parts: header, content, and footer.

page.Header()
    .Text("My header")
    .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

A header is added with Header. We change the font weight with
SemiBold, font size with FontSize and font colour 
with FontColor.

page.Content()
    .PaddingVertical(1, Unit.Centimetre)
    .Column(x =&gt;
    {
        x.Item().Text(Placeholders.LoremIpsum());
        x.Spacing(20);
        x.Item().Text(Placeholders.LoremIpsum());
    });

The page content is added with Content. We add two paragraphs and 
a spacing between them.

page.Footer()
    .Text(x =&gt;
    {
        x.Span("Page ");
        x.CurrentPageNumber();
    });

Finally, we add the footer with Footer. It contains the current
page number.

## C# QuestPDF lines

In the next example, we add some horizontal lines to the page.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var doc = Document.Create(container =&gt;
{
    container.Page(page =&gt;
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);

        page.Content()
            .Column(x =&gt;
            {
                x.Item().Text(Placeholders.Paragraph());
                x.Item().PaddingVertical(5).LineHorizontal(1);
                x.Item().Text(Placeholders.Paragraph());
                x.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.LightBlue.Darken3);
                x.Item().Text(Placeholders.Paragraph());
                x.Item().PaddingVertical(5).LineHorizontal(2);
                x.Item().Text(Placeholders.Paragraph());
            });
    });
});

doc.GeneratePdf("lines.pdf");

In the program, we add three lines between the paragraphs.

x.Item().PaddingVertical(5).LineHorizontal(1);

We have a horizontal line of width 1 with some vertical padding.

x.Item().PaddingVertical(5).LineHorizontal(1).LineColor(Colors.LightBlue.Darken3);

We can change the colour of the line with LineColor.

x.Item().PaddingVertical(5).LineHorizontal(2);

Here we make the line thicker.

## C# QuestPDF borders

In the next example, we add some borders.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

Action&lt;IDocumentContainer&gt; container = (container) =&gt; container.Page(page =&gt;
        {
            page.Size(PageSizes.A4);
            page.Margin(2, Unit.Centimetre);

            page.Content()
                .Column(x =&gt;
                {
                    x.Item().Border(1).Padding(5).Text(Placeholders.Paragraph());
                    x.Item().Border(1).Padding(5).Text(Placeholders.Paragraph());
                    x.Item().Border(1).Padding(5).Text(Placeholders.Paragraph());
                });
        });

var doc = Document.Create(container);
doc.GeneratePdf("borders.pdf");

We have three paragraphs of text. We place some borders around these paragraphs.

x.Item().Border(1).Padding(5).Text(Placeholders.Paragraph());

We add a border with Border and some padding with
Padding.

## C# QuestPDF table

The next example generate a table inside the PDF document.

Program.cs
  

using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

var fonts = new[]
{
    Fonts.Calibri,
    Fonts.Georgia,
    Fonts.Arial,
    Fonts.TimesNewRoman,
    Fonts.Consolas,
    Fonts.Tahoma,
    Fonts.Verdana,
    Fonts.Trebuchet,
    Fonts.ComicSans
};

var doc = Document.Create(container =&gt; container.Page(page =&gt;
    {
        page.Size(PageSizes.A4);
        page.Margin(2, Unit.Centimetre);

        page.Content()
            .Column(x =&gt; x.Item().Table(table =&gt;
                {
                    table.ColumnsDefinition(cols =&gt;
                    {
                        cols.ConstantColumn(150);
                        cols.ConstantColumn(150);
                    });

                    table.ExtendLastCellsToTableBottom();

                    foreach (var font in fonts)
                    {
                        table.Cell().MinWidth(120).Border(1).Padding(5).Text(font).FontFamily(font);
                    }
                }));
    }));

doc.GeneratePdf("table.pdf");

The table has two columns and displayes text in various font families.

page.Content()
    .Column(x =&gt; x.Item().Table(table =&gt;
        {

A table is added with Table.

table.ColumnsDefinition(cols =&gt;
{
    cols.ConstantColumn(150);
    cols.ConstantColumn(150);
});

We define two table columns of fixed width.

table.ExtendLastCellsToTableBottom();

The last cell is enlarged to the bottom of the table if the cells are not even.

foreach (var font in fonts)
{
    table.Cell().MinWidth(120).Border(1).Padding(5).Text(font).FontFamily(font);
}

In the foreach loop, we add the items of the fonts array to the
table. A new cell is added with cell. We set its minimum width,
border, padding, content, and font family.

## Source

[QuestPDF documentation](https://www.questpdf.com/quick-start.html)

In this article we have covered the QuestPDF library. We have shown how to
generate simple PDF documents.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).