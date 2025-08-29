+++
title = "PowerShell CSV"
date = 2025-08-29T20:07:10.895+01:00
draft = false
description = "PowerShell CSV tutorial shows how to use PowerShell to read and write CSV files."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell CSV

last modified February 15, 2025

In this article, we show how to use PowerShell to read and write CSV files.

In this article, we show how to use PowerShell to read and write CSV files.
Working with CSV files is a common task for IT professionals and system
administrators, as CSV files are widely used for data exchange and storage.
PowerShell provides a straightforward and efficient way to handle CSV files,
allowing you to easily import, manipulate, and export data.

The Import-Csv cmdlet converts the contents of a CSV file into
PowerShell objects, making it easy to work with the data in your scripts. You
can filter, sort, and modify the data as needed, and then export the results to
a new CSV file or perform other actions.

The Export-Csv cmdlet takes PowerShell objects and converts them
into CSV format, which can be saved to a file. This is useful for generating
reports, exporting data from scripts, and sharing information with other systems
or applications.

## Reading CSV files

PowerShell can read CSV files using the Import-Csv cmdlet.

fruits.csv
  

name
apple
banana
cherry

We have this test data in fruits.csv.

read_csv.ps1
  

$fruits = Import-Csv -Path "fruits.csv"
Write-Output "The first fruit is $($fruits[0].name)"

In this program, we read a CSV file named fruits.csv. We then use
the Write-Output cmdlet to print the name of the first fruit in the
CSV file.

$fruits = Import-Csv -Path "fruits.csv"

We read the CSV file using the Import-Csv cmdlet.

Write-Output "The first fruit is $($fruits[0].name)"

We use the Write-Output cmdlet to print the name of the first
fruit. We use the indexing operator [] to access the first element
in the array and the dot notation to access the name property of
the fruit object.

PS C:\&gt; .\read_csv.ps1
The first fruit is apple

We run the script and see the output.

## Writing CSV files

PowerShell can write CSV files using the Export-Csv cmdlet.

write_csv.ps1
  

$fruits = @("apple", "banana", "cherry")
$fruits |
    ForEach-Object {
        [PSCustomObject]@{
            name = $_
        }
    } |
    Export-Csv -Path "fruits.csv" -NoTypeInformation

In this program, we create an array of fruits and write it to a CSV file named
fruits.csv.

$fruits = @("apple", "banana", "cherry")

We create an array of fruits.

$fruits |
    ForEach-Object {
        [PSCustomObject]@{
            name = $_
        }
    } |
    Export-Csv -Path "fruits.csv" -NoTypeInformation

We use the pipeline operator | to send the $fruits
array to the ForEach-Object cmdlet. We use the
ForEach-Object cmdlet to iterate over the array and create a custom
object for each fruit. We then use the Export-Csv cmdlet to write
the custom objects to a CSV file.

PS C:\&gt; Import-Csv -Path "fruits.csv"

name
----
apple
banana
cherry

We run the script and see the output.

## CSV file manipulation

We can manipulate CSV files using PowerShell's rich set of cmdlets.

manipulate_csv.ps1
  

$fruits = Import-Csv -Path "fruits.csv"

$newFruit = [PSCustomObject]@{
    name = "orange"
}

$fruits += $newFruit
$fruits |
    Sort-Object name |
    Select-Object name -First 3 |
    Export-Csv -Path "fruits.csv" -NoTypeInformation

In this program, we read a CSV file, add a new fruit, sort the fruits by name,
and write the first three fruits to the CSV file.

$fruits = Import-Csv -Path "fruits.csv"

We read the CSV file using the Import-Csv cmdlet.

$newFruit = [PSCustomObject]@{
    name = "orange"
}

$fruits += $newFruit

We create a new fruit object using the PSCustomObject cmdlet. We
then add the new fruit object to the $fruits array.

$fruits |
    Sort-Object name |
    Select-Object name -First 3 |
    Export-Csv -Path "fruits.csv" -NoTypeInformation

We use the pipeline operator | to send the $fruits array to the Sort-Object cmdlet. We sort the array by the name property. We then use the Select-Object cmdlet to select the first three fruits and write them to the CSV file using the Export-Csv cmdlet.

PS C:\&gt; Import-Csv -Path "fruits.csv"

name
----
apple
banana
cherry
orange

We run the script and see the output.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have worked with reading and writing CSV files in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).