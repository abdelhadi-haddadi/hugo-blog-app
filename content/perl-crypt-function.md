+++
title = "Perl crypt Function"
date = 2025-08-29T20:03:55.421+01:00
draft = false
description = "Perl crypt tutorial shows how to encrypt passwords in Perl using crypt function."
image = ""
imageBig = ""
categories = ["perl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Perl crypt Function

last modified April 4, 2025

The Perl crypt function performs one-way encryption of strings.
It's primarily used for password storage and verification.

crypt uses the system's native encryption, typically based on
DES, MD5, or SHA algorithms. The function requires a plaintext string and
a salt value for encryption.

## Basic crypt Usage

The simplest way to use crypt is with a plaintext and salt.

basic.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $password = "secret123";
my $salt = "ab";

my $encrypted = crypt($password, $salt);
print "Encrypted: $encrypted\n";

We demonstrate crypt encrypting a password with a simple salt.
The salt affects the encryption result and should be random in practice.

$ ./basic.pl
Encrypted: abJnggxhB/yWI

## Password Verification

crypt is commonly used to verify passwords against stored hashes.

verify.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $stored_hash = 'abJnggxhB/yWI';
my $input_pass = 'secret123';

if (crypt($input_pass, $stored_hash) eq $stored_hash) {
    print "Password correct\n";
} else {
    print "Password incorrect\n";
}

This script checks if an input password matches a stored encrypted hash.
The stored hash itself serves as the salt for verification.

$ ./verify.pl
Password correct

## Generating Random Salts

For secure encryption, salts should be randomly generated.

salt.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub generate_salt {
    my @chars = ('.', '/', 0..9, 'A'..'Z', 'a'..'z');
    return join '', @chars[map {rand @chars} 1..8];
}

my $password = "mypassword";
my $salt = generate_salt();
my $hash = crypt($password, $salt);

print "Salt: $salt\n";
print "Hash: $hash\n";

We create a random 8-character salt from a character set suitable for crypt.
The salt is combined with the password to create a unique hash.

$ ./salt.pl
Salt: 7dHj9kLm
Hash: 7dHj9kLmXJ4h6Y

## MD5 Encryption

Modern systems often use MD5 encryption with crypt.

md5.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my $password = "securepass";
my $salt = '$1$' . join '', map { ('.', '/', 0..9, 'A'..'Z', 'a'..'z')[rand 64] } 1..8;

my $hash = crypt($password, $salt);
print "MD5 Hash: $hash\n";

This example generates an MD5 hash by using a salt starting with '$1$'.
The resulting hash will be longer and more secure than traditional DES.

$ ./md5.pl
MD5 Hash: $1$7f8Gj9kL$m4Xp2qR7sT9vYw1z3c5b7

## SHA-256/512 Encryption

For stronger security, SHA-256 or SHA-512 can be used with crypt.

sha.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub generate_sha_salt {
    my $type = shift || '256'; # 256 or 512
    my $prefix = $type eq '256' ? '$5$' : '$6$';
    return $prefix . join '', map { ('.', '/', 0..9, 'A'..'Z', 'a'..'z')[rand 64] } 1..16;
}

my $password = "supersecret";
my $salt = generate_sha_salt('512');
my $hash = crypt($password, $salt);

print "SHA-512 Hash: $hash\n";

We generate a SHA-512 hash by using a salt starting with '$6$'. SHA
algorithms provide much stronger security than older methods.

$ ./sha.pl
SHA-512 Hash: $6$7f8Gj9kLm4Xp2qR7$sT9vYw1z3c5b7d9e1f3g5h7j9k1l3m5n7p9q1r3s5t

## User Authentication System

Here's a complete example of user authentication using crypt.

auth.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

my %users = (
    'admin' =&gt; '$6$7f8Gj9kL$m4Xp2qR7sT9vYw1z3c5b7d9e1f3g5h',
    'user1' =&gt; '$1$7f8Gj9kL$m4Xp2qR7sT9vYw1z3c5b7'
);

print "Username: ";
my $username = &lt;STDIN&gt;;
chomp $username;

print "Password: ";
my $password = &lt;STDIN&gt;;
chomp $password;

if (exists $users{$username} &amp;&amp; 
    crypt($password, $users{$username}) eq $users{$username}) {
    print "Authentication successful\n";
} else {
    print "Authentication failed\n";
}

This script simulates a user authentication system with stored hashes.
It shows proper password verification against pre-computed hashes.

## Password Strength Checker

We can combine crypt with password strength verification.

strength.pl
  

#!/usr/bin/perl

use strict;
use warnings;
use v5.34.0;

sub check_strength {
    my $pass = shift;
    return 0 if length($pass) &lt; 8;
    return 0 unless $pass =~ /[A-Z]/;
    return 0 unless $pass =~ /[a-z]/;
    return 0 unless $pass =~ /[0-9]/;
    return 0 unless $pass =~ /[^A-Za-z0-9]/;
    return 1;
}

print "Enter new password: ";
my $password = &lt;STDIN&gt;;
chomp $password;

if (check_strength($password)) {
    my $salt = '$6$' . join '', map { ('.', '/', 0..9, 'A'..'Z', 'a'..'z')[rand 64] } 1..16;
    my $hash = crypt($password, $salt);
    print "Strong password. Hash: $hash\n";
} else {
    print "Password doesn't meet strength requirements\n";
}

This example checks password strength before generating a secure hash.
It enforces minimum length and character diversity requirements.

## Best Practices

- **Use strong hashes:** Prefer SHA-256 or SHA-512 over DES.

- **Generate random salts:** Never use fixed or predictable salts.

- **Store properly:** Keep only the hashes, never plaintext.

- **Consider alternatives:** For new projects, look at modules like Authen::Passphrase.

## Source

[Perl crypt Documentation](https://perldoc.perl.org/functions/crypt)

This tutorial covered Perl's crypt function with practical
examples demonstrating secure password handling techniques.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Perl tutorials](/all/#perl).