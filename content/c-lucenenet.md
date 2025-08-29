+++
title = "C# Lucene.Net"
date = 2025-08-29T19:51:04.737+01:00
draft = false
description = "C# Lucene.Net tutorial is an introductory material which introduces the Lucene.Net library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Lucene.Net

last modified July 5, 2023

 

In this article we show how to use the Lucene.Net library. This is an
introductory material covering the basics of Lucene.Net.

## Lucene.Net

Lucene.Net is a .NET port of the Java Lucene search library. Lucene provides
full text indexing and searching capability.

To use Lucene, we first create an index. The index is a data structure which
maps content to its location. The index can be stored in the file system or in
memory. After the index of documents has been created, we build a query and
perform a search on the index. Finally, the results that match the query are
returned.

## Lucene basic definitions

A *term* represents a word from text while a *phrase* is a group
of words. A *query* is the grammar for
matching text in documents. There are multiple query types, including
RegexpQuery, TermQuery,
WildcardQuery, and PrefixQuery.

An *analyzer* builds token streams to analyze text. It thus
represents a policy for extracting index terms from text. An
IndexSearcher provides tools for searching the index.

A *document* is a collection of fields. Each field has a value associated
with it. Fields store the terms we want to index and search.

Search results are sets of best-matching documents. The results are wrapped
in a TopDocs class.

$ dotnet add package Lucene.Net --prerelease
$ dotnet add package Lucene.Net.Analysis.Common --prerelease

These are two basic packages that need to be added to our projects.

## Lucene.Net simple example

The following is a simple Lucene.Net example.

Program.cs
  

using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

const LuceneVersion ver = LuceneVersion.LUCENE_48;
using var ramDir = new RAMDirectory();
using var analyzer = new StandardAnalyzer(ver);

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

var doc = new Document();
doc.Add(new TextField("phrase", "an old dog", Field.Store.YES));
writer.AddDocument(doc);

doc = new Document();
doc.Add(new TextField("phrase", "an old falcon in the sky", Field.Store.YES));
writer.AddDocument(doc);

doc = new Document();
doc.Add(new TextField("phrase", "a stormy night", Field.Store.YES));
writer.AddDocument(doc);

writer.Commit();

using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
var searcher = new IndexSearcher(reader);

var query = new TermQuery(new Term("phrase", "old"));
TopDocs topDocs = searcher.Search(query, n: 3);

int hits = topDocs.TotalHits;
Console.WriteLine($"Matching results: {hits}");

foreach (var sdoc in topDocs.ScoreDocs)
{
    Document mdoc = searcher.Doc(sdoc.Doc);
    Console.WriteLine(mdoc.Get("phrase"));
}

In the example, we define a simple index with three documents. We perform a 
basic query on the index.

using var ramDir = new RAMDirectory();

The index is stored in RAM.

using var analyzer = new StandardAnalyzer(ver);

We create a new StandardAnalyzer to process text. It builds an
analyzer with the default stop words

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

An IndexWriter is created. It creates and maintains an index.

var doc = new Document();
doc.Add(new TextField("phrase", "an old dog", Field.Store.YES));
writer.AddDocument(doc);

doc = new Document();
doc.Add(new TextField("phrase", "an old falcon in the sky", Field.Store.YES));
writer.AddDocument(doc);

doc = new Document();
doc.Add(new TextField("phrase", "a stormy night", Field.Store.YES));
writer.AddDocument(doc);

We create three documents. Each document has one field. 

writer.Commit();

We flush and commit the index data to the directory.

using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
var searcher = new IndexSearcher(reader);

A DirectoryReader and IndexSearcher are created. They 
are used to perform the search.

var query = new TermQuery(new Term("phrase", "old"));

We define a basic TermQuery. It contains a single term.

TopDocs topDocs = searcher.Search(query, n: 3);

We do a search with the given query. We look for top three results if any. The
search returns the TopDocs, which are matches returned by the
searcher.

int hits = topDocs.TotalHits;
Console.WriteLine($"Matching results: {hits}");

We get the number of hits with the TotalHits property.

foreach (var sdoc in topDocs.ScoreDocs)
{
    Document mdoc = searcher.Doc(sdoc.Doc);
    Console.WriteLine(mdoc.Get("phrase"));
}

We go through the results and print the matched phrases.

$ dotnet run
Matching results: 2
an old dog
an old falcon in the sky

## Lucene.Net MultiPhraseQuery

MultiPhraseQuery allows us to add multiple queries.

Program.cs
  

using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

const LuceneVersion ver = LuceneVersion.LUCENE_48;
using var ramDir = new RAMDirectory();
using var analyzer = new StandardAnalyzer(ver);

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

createIndex(writer);
doSearch(writer);

void createIndex(IndexWriter writer)
{
    var doc = new Document();
    doc.Add(new TextField("phrase", "an old dog", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "an old falcon in the sky", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "a stormy night", Field.Store.YES));
    writer.AddDocument(doc);

    writer.Commit();
}

void doSearch(IndexWriter writer)
{
    using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
    var searcher = new IndexSearcher(reader);

    var mquery = new MultiPhraseQuery
    {
        new Term("phrase", "old"),
        new Term("phrase", "falcon")
    };

    TopDocs topDocs = searcher.Search(mquery, n: 3);

    int hits = topDocs.TotalHits;
    Console.WriteLine($"Matching results: {hits}");

    foreach (var sdoc in topDocs.ScoreDocs)
    {
        Document mdoc = searcher.Doc(sdoc.Doc);
        Console.WriteLine(mdoc.Get("phrase"));
    }
}

In the example, we build a MultiPhraseQuery.

var mquery = new MultiPhraseQuery
{
    new Term("phrase", "old"),
    new Term("phrase", "falcon")
};

The MultiPhraseQuery consists of two terms. The search results 
should contain both terms.

$ dotnet run
Matching results: 1
an old falcon in the sky

## Lucene.Net QueryParser

The QueryParser is used to define queries from a custom query
syntax Lucene grammar.

title:"bacon" AND body:"forest"

This query searches for bacon in the title field and forest in the body field.

$ dotnet add package Lucene.Net.QueryParser --prerelease

We need to add the Lucene.Net.QueryParser package.

Program.cs
  

using Lucene.Net.Analysis.Standard;
using Lucene.Net.QueryParsers.Classic;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

const LuceneVersion ver = LuceneVersion.LUCENE_48;
using var ramDir = new RAMDirectory();
using var analyzer = new StandardAnalyzer(ver);

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

createIndex(writer);
doSearch(writer);

void createIndex(IndexWriter writer)
{
    var doc = new Document();
    doc.Add(new TextField("phrase", "in the sun", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "before midnight", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "a cloud in the sky", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "stormy clouds", Field.Store.YES));
    writer.AddDocument(doc);

    writer.Commit();
}

void doSearch(IndexWriter writer)
{
    using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
    var searcher = new IndexSearcher(reader);

    var parser = new QueryParser(ver, "phrase", analyzer);
    var query = parser.Parse("cloud OR midnight");

    TopDocs topDocs = searcher.Search(query, n: 4);

    int hits = topDocs.TotalHits;
    Console.WriteLine($"Matching results: {hits}");

    foreach (var sdoc in topDocs.ScoreDocs)
    {
        Document mdoc = searcher.Doc(sdoc.Doc);
        Console.WriteLine(mdoc.Get("phrase"));
    }
}

The example searches for two terms with QueryParser.

void createIndex(IndexWriter writer)
{
    var doc = new Document();
    doc.Add(new TextField("phrase", "in the sun", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "before midnight", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "a cloud in the sky", Field.Store.YES));
    writer.AddDocument(doc);

    doc = new Document();
    doc.Add(new TextField("phrase", "stormy clouds", Field.Store.YES));
    writer.AddDocument(doc);

    writer.Commit();
}

We create an index containing four phrases. 

var parser = new QueryParser(ver, "phrase", analyzer);
var query = parser.Parse("cloud OR midnight");

We search for phrases that contain either the term cloud or midnight.

$ dotnet run
Matching results: 2
before midnight
a cloud in the sky

## Lucene.Net WildcardQuery

The WildcardQuery implements the wildcard search query. It supports
the * (matches any character sequence including tempty one) and the
? (matches any single character) wildcards.

doc/users.txt
  

John Doe, gardener
Roger Roe, driver 
Patrick Mark, writer
Lucy Smith, teacher

We have four users in the users.txt file. 

Program.cs
  

using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

const LuceneVersion ver = LuceneVersion.LUCENE_48;
using var ramDir = new RAMDirectory();
using var analyzer = new StandardAnalyzer(ver);

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

List&amp;t;User&gt; users = readUsers();
createIndex(writer, users);
doSearch(writer);

Listlt;User&gt; readUsers()
{
    var data = File.ReadAllLines("doc/users.txt");
    var users = new List&lt;User&gt;();

    foreach (var e in data)
    {
        var u = e.Split(",");
        users.Add(new User(u[0], u[1]));
    }

    return users;
}

void createIndex(IndexWriter writer, List&lt;User&gt; users)
{
    foreach (var user in users)
    {
        var doc = new Document();
        doc.Add(new TextField("name", user.Name, Field.Store.YES));
        doc.Add(new TextField("occupation", user.Occupation, Field.Store.YES));
        writer.AddDocument(doc);
    }

    writer.Commit();
}

void doSearch(IndexWriter writer)
{
    using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
    var searcher = new IndexSearcher(reader);

    var query = new WildcardQuery(new Term("name", "*oe"));
    TopDocs topDocs = searcher.Search(query, n: 3);

    int hits = topDocs.TotalHits;
    Console.WriteLine($"Matching results: {hits}");

    foreach (var sdoc in topDocs.ScoreDocs)
    {
        Document mdoc = searcher.Doc(sdoc.Doc);
        Console.WriteLine($"{mdoc.Get("name")} {mdoc.Get("occupation")}");
    }
}

record User(string Name, string Occupation);

The example builds an index of users from a text file. It then performs a
wildcard query on the index.

Listlt;User&gt; readUsers()
{
    var data = File.ReadAllLines("doc/users.txt");
    var users = new List&lt;User&gt;();

    foreach (var e in data)
    {
        var u = e.Split(",");
        users.Add(new User(u[0], u[1]));
    }

    return users;
}

We read the data from the doc/users.txt file and create a list of 
User objects.

void createIndex(IndexWriter writer, List&lt;User&gt; users)
{
    foreach (var user in users)
    {
        var doc = new Document();
        doc.Add(new TextField("name", user.Name, Field.Store.YES));
        doc.Add(new TextField("occupation", user.Occupation, Field.Store.YES));
        writer.AddDocument(doc);
    }

    writer.Commit();
}

An index is created. Each document has name and occupation fields.

var query = new WildcardQuery(new Term("name", "*oe"));
TopDocs topDocs = searcher.Search(query, n: 3);

The WildcardQuery looks for name fields. We look for names 
that have oe suffixes.

$ dotnet run
Matching results: 2
John Doe  gardener
Roger Roe  driver

## Lucene.Net RegexpQuery

The RegexpQuery allows us to create Lucene queries utilizing
regular expressions.

doc/words.txt
  

sky
blue
rock
war

This is words.txt file.

doc/words2.txt
  

forest
cup
cloud
pen
wrong

This is words2.txt file.

doc/words3.txt
  

new
balloon
book
wood
page

This is words3.txt file.

These three text files are used to build our search index.

Program.cs
  

using Lucene.Net.Analysis.Standard;
using Lucene.Net.Documents;
using Lucene.Net.Index;
using Lucene.Net.Search;
using Lucene.Net.Store;
using Lucene.Net.Util;

const LuceneVersion ver = LuceneVersion.LUCENE_48;
using var ramDir = new RAMDirectory();
using var analyzer = new StandardAnalyzer(ver);

var idxCfg = new IndexWriterConfig(ver, analyzer);
idxCfg.OpenMode = OpenMode.CREATE;
using var writer = new IndexWriter(ramDir, idxCfg);

var words = new List&lt;string&gt;();
readWords(words);

createIndex(writer, words);
doSearch(writer);

// read words from files

void readWords(List&lt;string&gt; words)
{
    string[] files = System.IO.Directory.GetFileSystemEntries("doc", "*.txt");

    foreach (var fname in files)
    {
        string[] lines = File.ReadAllLines(fname);
        words.AddRange(lines);
    }
}

// create index from words

void createIndex(IndexWriter writer, List&lt;string&gt; words)
{
    foreach (var word in words)
    {
        var doc = new Document();
        doc.Add(new TextField("word", word, Field.Store.YES));
        writer.AddDocument(doc);
    }

    writer.Commit();
}

// do regex search

void doSearch(IndexWriter writer)
{
    using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
    var searcher = new IndexSearcher(reader);

    var rx = "[wc].*";
    var query = new RegexpQuery(new Term("word", rx));
    TopDocs topDocs = searcher.Search(query, n: 10);

    int hits = topDocs.TotalHits;
    Console.WriteLine($"Matching results: {hits}");

    foreach (var sdoc in topDocs.ScoreDocs)
    {
        Document mdoc = searcher.Doc(sdoc.Doc);
        Console.WriteLine(mdoc.Get("word"));
    }
}

In the program, we build an index from the words in the text files. We apply 
a regex query search on the index.

void readWords(List&lt;string&gt; words)
{
    string[] files = System.IO.Directory.GetFileSystemEntries("doc", "*.txt");

    foreach (var fname in files)
    {
        string[] lines = File.ReadAllLines(fname);
        words.AddRange(lines);
    }
}

We read data from the text files and store the words in the words
list.

void createIndex(IndexWriter writer, List&lt;string&gt; words)
{
    foreach (var word in words)
    {
        var doc = new Document();
        doc.Add(new TextField("word", word, Field.Store.YES));
        writer.AddDocument(doc);
    }

    writer.Commit();
}

We build our index from the words.

void doSearch(IndexWriter writer)
{
    using DirectoryReader reader = writer.GetReader(applyAllDeletes: true);
    var searcher = new IndexSearcher(reader);
    ...
}

We perform a search in the doSearch function.

var rx = "[wc].*";
var query = new RegexpQuery(new Term("word", rx));
TopDocs topDocs = searcher.Search(query, n: 10);

Our query is a RegexpQuery. The regular expression matches all words 
that begin with either character w or c.

$ dotnet run
Matching results: 5
war
cup
cloud
wrong
wood

## Source

[Lucene.Net Github page](https://github.com/apache/lucenenet)

In this article we have worked with the Lucene.Net library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).