+++
title = "ExcelJS tutorial"
date = 2025-08-29T20:01:15.685+01:00
draft = false
description = "Learn how to read and write Excel files in JavaScript using the ExcelJS library, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ExcelJS tutorial

last modified last modified October 18, 2023

 

In this article we show how to work with Excel files in JavaScript with ExcelJS
library.

## ExcelJS

ExcelJS is a JavaScript library for reading, manipulating and writing
spreadsheet data in XLSX format.

$ npm i exceljs

We install ExcelJS with npm i exceljs command.

## Excel xlsx

In this article we work with xlsx files. The xlsx is a file extension for an
open XML spreadsheet file format used by Microsoft Excel. The xlsm files support
macros. The xltm  are macro-enabled template files. The xls format is a
proprietary binary format while xlsx is based on Office Open XML format.

## ExcelJS cells

In the first example, we work with cells. We get the reference to a cell with 
the getCell function.

app.js
  

const Excel = require('exceljs');

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

ws.addRows([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]]
);

const v0 = ws.getCell('A1').value;
console.log(v0);

const v1 = ws.getCell(1, 1).value;
console.log(v1);

const v2 = ws.getRow(2).getCell(2).value;
console.log(v2);

In the example, we add data to a worksheet and later read them.

const Excel = require('exceljs');

The ExcelJS library is imported.

const wb = new Excel.Workbook();

A new workbook is generated.

const ws = wb.addWorksheet('My Sheet');

The addWorksheet adds a new worksheet to the workbook.

ws.addRows([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]]
);

The addRows function adds rows of data to the worksheet.

const v0 = ws.getCell('A1').value;
console.log(v0);

We refer to the top-left cell via the 'A1' address; the typical Excel notation.
We get the value of the cell with the value property.

const v1 = ws.getCell(1, 1).value;
console.log(v1);

Another way is to pass a row and a column number to the getCell
function.

const v2 = ws.getRow(2).getCell(2).value;
console.log(v2);

The third way is to chain the getRow and getCell 
calls.

$ node app.js 
1
1
7

## ExcelJS write to file

We write the data to a file with writeFile method.

app.js
  

const Excel = require('exceljs');

const fileName = 'simple.xlsx';

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

ws.getCell('A1').value = 'John Doe';
ws.getCell('B1').value = 'gardener';
ws.getCell('C1').value = new Date().toLocaleString();

const r3 = ws.getRow(3);
r3.values = [1, 2, 3, 4, 5, 6];

wb.xlsx
  .writeFile(fileName)
  .then(() =&gt; {
    console.log('file created');
  })
  .catch(err =&gt; {
    console.log(err.message);
  });

The example adds some data to a worksheet and writes it into the
simple.xslx file.

ws.getCell('A1').value = 'John Doe';
ws.getCell('B1').value = 'gardener';
ws.getCell('C1').value = new Date().toLocaleString();

We write data to three cells.

const r3 = ws.getRow(3);
r3.values = [1, 2, 3, 4, 5, 6];

In adddition, we add an array of values to the third row.

wb.xlsx
    .writeFile(fileName)
    .then(() =&gt; {
      console.log('file created');
    })
    .catch(err =&gt; {
      console.log(err.message);
    });

The worksheet is written to the file with writeFile function.

## ExcelJS read file

In the following example, we read from an existing xlsx file. We assume some 
data in the first two columns.

app.js
  

const ExcelJS = require('exceljs');

const wb = new ExcelJS.Workbook();

const fileName = 'items.xlsx';

wb.xlsx.readFile(fileName).then(() =&gt; {
    
    const ws = wb.getWorksheet('Sheet1');

    const c1 = ws.getColumn(1);
    
    c1.eachCell(c =&gt; {

        console.log(c.value);
    });

    const c2 = ws.getColumn(2);
    
    c2.eachCell(c =&gt; {

        console.log(c.value);
    });
}).catch(err =&gt; {
    console.log(err.message);
});

The example reads data from two columns of the sheet.

wb.xlsx.readFile(fileName).then(() =&gt; {

To read the worksheet data, we use the readFile function.

const ws = wb.getWorksheet('Sheet1');

We get the worksheet with the getWorksheet function.

const c1 = ws.getColumn(1);

We get the first column with getColumn.

c1.eachCell(c =&gt; {

    console.log(c.value);
});

We iterate over the current cells using the eachCell function.

## ExcelJS columns

In the next example, we work with columns.

app.js
  

const Excel = require('exceljs');

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

const headers = [
    { header: 'First name', key: 'fn', width: 15 },
    { header: 'Last name', key: 'ln', width: 15 },
    { header: 'Occupation', key: 'occ', width: 15 },
    { header: 'Salary', key: 'sl', width: 15 },
]

ws.columns = headers;

ws.addRow(['John', 'Doe', 'gardener', 1230]);
ws.addRow(['Roger', 'Roe', 'driver', 980]);
ws.addRow(['Lucy', 'Mallory', 'teacher', 780]);
ws.addRow(['Peter', 'Smith', 'programmer', 2300]);

ws.getColumn('fn').eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

console.log('--------------');

ws.getColumn('B').eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

console.log('--------------');

ws.getColumn(3).eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

console.log('--------------');

console.log(`There are ${ws.actualColumnCount} columns`);

We define column headers and iterate over column cells.

const headers = [
    { header: 'First name', key: 'fn', width: 15 },
    { header: 'Last name', key: 'ln', width: 15 },
    { header: 'Occupation', key: 'occ', width: 15 },
    { header: 'Salary', key: 'sl', width: 15 },
]

ws.columns = headers;

Via the columns property, we add column headers and define column
keys and widths.

ws.addRow(['John', 'Doe', 'gardener', 1230]);
ws.addRow(['Roger', 'Roe', 'driver', 980]);
...

We add some row data with addRow.

ws.getColumn('fn').eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

We refer to the first column via the key name. The eachCell is used 
to iterate over data.

ws.getColumn('B').eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

Here, we get the column by the assigned letter.

ws.getColumn(3).eachCell((cell, rn) =&gt; {

    console.log(cell.value);
});

Finally, we refer to the third column via the index value.

console.log(`There are ${ws.actualColumnCount} columns`);

We get the number of columns with data with the actualColumnCount
property.

$ node app.js 
First name
John
Roger
Lucy
Peter
--------------
Last name
Doe
Roe
Mallory
Smith
--------------
Occupation
gardener
driver
teacher
programmer
--------------
There are 4 columns

## ExcelJS rows

In the first example, we work with rows.

app.js
  

const Excel = require('exceljs');

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

const headers = [
    { header: 'First name', key: 'fn', width: 15 },
    { header: 'Last name', key: 'ln', width: 15 },
    { header: 'Occupation', key: 'occ', width: 15 },
    { header: 'Salary', key: 'sl', width: 15 },
]

ws.columns = headers;

ws.addRow(['John', 'Doe', 'gardener', 1230]);
ws.addRow({ 'fn': 'Roger', 'ln': 'Roe', 'occ': 'driver', 'sl': 980 });
ws.addRows(
    ['Lucy', 'Mallory', 'teacher', 780],
    ['Peter', 'Smith', 'programmer', 2300]);

console.log(`There are ${ws.actualRowCount} rows`);

let rows = ws.getRows(1, 4).values();

for (let row of rows) {

    row.eachCell((cell, cn) =&gt; {
        console.log(cell.value);
    });
}

We add data with addRow and addRows functions and
retrieve the rows of data with getRows.

ws.addRow(['John', 'Doe', 'gardener', 1230]);

We add an array of values with addRow.

ws.addRow({ 'fn': 'Roger', 'ln': 'Roe', 'occ': 'driver', 'sl': 980 });

Here, we add the data using key/value pairs, where each key is the column key
name.

ws.addRows(
    ['Lucy', 'Mallory', 'teacher', 780],
    ['Peter', 'Smith', 'programmer', 2300]);

Multiple rows can be added with addRows.

console.log(`There are ${ws.actualRowCount} rows`);

The actualRowCount property returns the  number of rows that have
values.

let rows = ws.getRows(1, 4).values();

We get values from rows 1..4. 

for (let row of rows) {

    row.eachCell((cell, cn) =&gt; {
        console.log(cell.value);
    });
}

We iterate over the rows and their cells.

$ node app.js 
There are 3 rows
First name
Last name
Occupation
Salary
John
Doe
gardener
1230
Roger
Roe
driver
980

## ExcelJS load CSV

ExcelJS allows to read data from a CSV file.

cars.csv
  

id,name,price
1,Audi,52642
2,Mercedes,57127
3,Skoda,9000
4,Volvo,29000
5,Bentley,350000
6,Citroen,21000
7,Hummer,41400
8,Volkswagen,21600
9,Toyota,26700

We have some simple CSV data.

app.js
  

const Excel = require('exceljs');

const fileName = 'cars.xlsx'
const data = 'cars.csv';

const wb = new Excel.Workbook();

wb.csv.readFile(data).then((ws) =&gt; {

    console.log(
        `Sheet ${ws.id} - ${ws.name}, Dims=${JSON.stringify(
            ws.dimensions
        )}`);

    for (let i = 1; i &lt;= ws.actualRowCount; i++) {
        for (let j = 1; j &lt;= ws.actualColumnCount; j++) {
            const val = ws.getRow(i).getCell(j);
            process.stdout.write(`${val} `);
        }
        console.log();
    }
}).then(() =&gt; {
    writeData();
});

function writeData() {

    wb.xlsx
        .writeFile(fileName)
        .then(() =&gt; {
            console.log('Done.');
        })
        .catch(err =&gt; {
            console.log(err.message);
        });
}

In the example, we read data from the cars.csv file, print it to
the console and write it to the xlsx file.

wb.csv.readFile(data).then((ws) =&gt; {

We read the CSV data with the readFile function of the
csv property.

for (let i = 1; i &lt;= ws.actualRowCount; i++) {
    for (let j = 1; j &lt;= ws.actualColumnCount; j++) {
        const val = ws.getRow(i).getCell(j);
        process.stdout.write(`${val} `);
    }
    console.log();
}

We iterate over the data with two for loops.

}).then(() =&gt; {
    writeData();
});

When the reading is finished, we call the writeData function.

function writeData() {

    wb.xlsx
        .writeFile(fileName)
        .then(() =&gt; {
            console.log('Done.');
        })
        .catch(err =&gt; {
            console.log(err.message);
        });
}

Inside the writeData function, we write the worksheet data into 
a xlsx file.

## ExcelJS cell alignment

In the next example, we show how to align data in cells. We can align content 
horizontally and vertically.

app.js
  

const Excel = require('exceljs');

const fileName = 'align.xlsx';

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

const headers = [
    { header: 'First name', key: 'fn', width: 15 },
    { header: 'Last name', key: 'ln', width: 15 },
    { header: 'Occupation', key: 'occ', width: 15 },
    { header: 'Salary', key: 'sl', width: 15 },
]

ws.columns = headers;

ws.addRow(['John', 'Doe', 'gardener', 1230]);
ws.addRow(['Roger', 'Roe', 'driver', 980]);
ws.addRow(['Lucy', 'Mallory', 'teacher', 780]);
ws.addRow(['Peter', 'Smith', 'programmer', 2300]);

ws.getColumn('A').style.alignment = { vertical: 'middle', horizontal: 'left' };
ws.getColumn('B').style.alignment = { vertical: 'middle', horizontal: 'left' };
ws.getColumn('C').style.alignment = { vertical: 'middle', horizontal: 'left' };
ws.getColumn('D').style.alignment = { vertical: 'middle', horizontal: 'right' };

ws.getRow(1).style.alignment = {vertical: 'middle', horizontal: 'center'};

wb.xlsx
    .writeFile(fileName)
    .then(() =&gt; {
        console.log('file created');
    })
    .catch(err =&gt; {
        console.log(err.message);
    });

To align content, we utilize the style and alignment
properties.

## ExcelJS hyperlink

In the next example, we create a hyperlink.

app.js
  

const Excel = require('exceljs');

const fileName = 'hyperlink.xlsx';

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

ws.getCell('A1').value = {
    hyperlink: 'http://webcode.me',
    text: 'WebCode',
    tooltip: 'http://webcode.me',
};

ws.getCell('A1').font = { underline: true, color: 'blue' };

wb.xlsx
    .writeFile(fileName)
    .then(() =&gt; {
        console.log('Done.');
    })
    .catch(err =&gt; {
        console.log(err.message);
    });

To create a hyperlink, we use the hyperlink property of the cell 
value property. We make the text underlined with the font property.

## ExcelJS merge cells

We can use the mergeCells function to merge cells.

app.js
  

const Excel = require('exceljs');

const fileName = 'merged.xlsx';

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

ws.getCell('A1').value = 'old falcon';
ws.getCell('A1').style.alignment = { horizontal: 'center', vertical: 'middle' };

ws.mergeCells('A1:C4');

wb.xlsx
    .writeFile(fileName)
    .then(() =&gt; {
        console.log('file created');
    })
    .catch(err =&gt; {
        console.log(err.message);
    });

The example merges cells A1 through C4.

## ExcelJS formula

To add formulas to cells, we can use the formula property.

app.js
  

const Excel = require('exceljs');

const fileName = 'formula.xlsx';

const wb = new Excel.Workbook();
const ws = wb.addWorksheet('My Sheet');

ws.getCell('A1').value = 1;
ws.getCell('A2').value = 2;
ws.getCell('A3').value = 3;
ws.getCell('A4').value = 4;
ws.getCell('A5').value = 5;
ws.getCell('A6').value = 6;

let a7 = ws.getCell('A7');
a7.value = { formula: 'SUM(A1:A6)' };
a7.style.font = { bold: true };

writeFile(wb);

async function writeFile(wb) {
    await wb.xlsx.writeFile(fileName);
}

The example inserts the SUM formula into the A7 cell.

## Source

[Excel.js Github page](https://github.com/exceljs/exceljs)

In this article we have worked with Excel files using the ExcelJS library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)