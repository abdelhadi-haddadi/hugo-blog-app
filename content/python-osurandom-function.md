+++
title = "Python os.urandom Function"
date = 2025-08-29T20:09:45.887+01:00
draft = false
description = "Complete guide to Python's os.urandom function covering secure random number generation, cryptographic uses, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.urandom Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.urandom function,
which generates cryptographically secure random bytes. We'll cover its uses,
security properties, and practical applications in Python programs.

## Basic Definitions

The os.urandom function returns random bytes from an OS-specific
randomness source. These bytes are suitable for cryptographic use.

Key parameter: size (number of random bytes to generate). Returns bytes object
of requested length. On Unix-like systems, uses /dev/urandom.

## Generating Random Bytes

The simplest use of os.urandom generates a fixed number of random
bytes. This example shows basic generation and display of random data.

basic_generation.py
  

import os

# Generate 16 random bytes
random_bytes = os.urandom(16)

print(f"Random bytes: {random_bytes}")
print(f"Hex representation: {random_bytes.hex()}")
print(f"Length: {len(random_bytes)} bytes")

# Generate different amounts
for n in [1, 8, 32, 256]:
    print(f"{n} bytes: {os.urandom(n).hex()}")

This example generates 16 random bytes and displays them in different formats.
It also shows how to generate varying amounts of random data.

The output is raw bytes, which can be converted to hexadecimal for display
or processed further for specific applications.

## Creating Random Strings

os.urandom can generate random strings by encoding the bytes.
This example creates random alphanumeric strings of specified length.

random_strings.py
  

import os
import base64

def random_string(length):
    # Generate enough random bytes
    bytes_needed = (length * 3 + 3) // 4
    random_bytes = os.urandom(bytes_needed)
    
    # Encode to base64 and adjust length
    return base64.urlsafe_b64encode(random_bytes).decode()[:length]

# Generate various random strings
for length in [8, 16, 32, 64]:
    print(f"{length} chars: {random_string(length)}")

# Alternative using hex encoding
print("\nHex encoded strings:")
for _ in range(3):
    print(os.urandom(8).hex())

This shows two approaches: base64 encoding for compact strings and hex encoding
for simpler representation. The base64 method produces URL-safe strings.

Note that the exact character set depends on the encoding method used.

## Generating Random Numbers

While os.urandom produces bytes, we can convert these to random
numbers. This example demonstrates generating integers in various ranges.

random_numbers.py
  

import os

def random_int(max_value):
    # Calculate bytes needed to cover the range
    byte_count = (max_value.bit_length() + 7) // 8
    while True:
        # Generate random bytes and convert to int
        random_bytes = os.urandom(byte_count)
        num = int.from_bytes(random_bytes, 'big')
        
        # Ensure the number is within range
        if num &lt; max_value:
            return num

# Generate random numbers in different ranges
for max_val in [10, 100, 1000, 10000]:
    print(f"Random 0-{max_val-1}: {random_int(max_val)}")

# Generate a random float between 0 and 1
random_bytes = os.urandom(8)
random_float = int.from_bytes(random_bytes, 'big') / (1 &lt;&lt; 64)
print(f"\nRandom float: {random_float}")

This code shows how to generate uniformly distributed integers within a range.
The float example demonstrates converting bytes to a floating-point number.

For cryptographic applications, this method is preferred over random module.

## Creating Secure Tokens

os.urandom is ideal for generating secure tokens like CSRF tokens
or password reset tokens. This example shows token generation.

secure_tokens.py
  

import os
import secrets
import hashlib

def generate_token(length=32):
    """Generate a URL-safe secure token"""
    return secrets.token_urlsafe(length)

def generate_hashed_token(salt=None, length=32):
    """Generate a hashed token with optional salt"""
    if salt is None:
        salt = os.urandom(16)
    token = os.urandom(length)
    hashed = hashlib.sha256(salt + token).hexdigest()
    return f"{salt.hex()}:{hashed}"

# Generate various tokens
print("Simple tokens:")
for _ in range(3):
    print(os.urandom(16).hex())

print("\nURL-safe tokens:")
for _ in range(3):
    print(generate_token())

print("\nHashed tokens:")
for _ in range(3):
    print(generate_hashed_token())

This demonstrates three approaches: raw hex tokens, URL-safe tokens using
secrets (which uses os.urandom internally), and hashed tokens with salt.

For web applications, the secrets module is often the best choice.

## Cryptographic Key Generation

os.urandom is suitable for generating cryptographic keys.
This example shows symmetric and asymmetric key generation.

key_generation.py
  

import os
from cryptography.hazmat.primitives.ciphers import algorithms
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization

# Generate AES key
aes_key = os.urandom(32)  # 256-bit key
print(f"AES-256 key: {aes_key.hex()}")

# Generate HMAC key
hmac_key = os.urandom(64)  # 512-bit key
print(f"HMAC-SHA512 key: {hmac_key.hex()}")

# Generate RSA key using os.urandom as entropy source
def generate_rsa_key():
    def urandom_entropy(num_bytes):
        return os.urandom(num_bytes)
    
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=None,
        entropy=urandom_entropy
    )
    
    pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )
    return pem

rsa_key = generate_rsa_key()
print("\nRSA private key:")
print(rsa_key.decode())

This shows how to generate keys for symmetric encryption (AES), message
authentication (HMAC), and asymmetric encryption (RSA).

For production use, consider higher-level libraries like cryptography.

## Password Hashing

os.urandom is essential for secure password hashing by providing
cryptographic salts. This example demonstrates proper password storage.

password_hashing.py
  

import os
import hashlib
import bcrypt
import argon2

def simple_hash(password):
    """Basic salted hash using SHA-256"""
    salt = os.urandom(32)
    hash_obj = hashlib.sha256(salt + password.encode())
    return f"{salt.hex()}:{hash_obj.hexdigest()}"

def bcrypt_hash(password):
    """Bcrypt password hashing"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt)

def argon2_hash(password):
    """Argon2 password hashing"""
    salt = os.urandom(16)
    hasher = argon2.PasswordHasher(
        time_cost=3, memory_cost=65536, parallelism=4, hash_len=32, salt_len=16
    )
    return hasher.hash(password, salt=salt)

# Example usage
password = "secure_password123"

print("Simple hash:")
print(simple_hash(password))

print("\nBcrypt hash:")
print(bcrypt_hash(password).decode())

print("\nArgon2 hash:")
print(argon2_hash(password))

This shows three password hashing methods with increasing security. All use
os.urandom directly or indirectly for salt generation.

For new applications, Argon2 or bcrypt are recommended over simple hashes.

## Security Considerations

- **Cryptographic security:** Suitable for cryptographic operations

- **Blocking behavior:** May block on some systems if entropy pool is empty

- **Alternatives:** secrets module provides higher-level interface

- **Platform differences:** Behavior varies between Unix and Windows

- **Performance:** Slower than pseudo-random generators

## Best Practices

- **Use for security:** Reserve for cryptographic applications

- **Proper length:** Generate enough bytes for your use case

- **Higher-level modules:** Prefer secrets for tokens

- **Error handling:** Be prepared for potential exceptions

- **Document usage:** Clearly indicate security-sensitive uses

## Source References

- [Python os.urandom Documentation](https://docs.python.org/3/library/os.html#os.urandom)

- [Linux urandom(4) man page](https://man7.org/linux/man-pages/man4/urandom.4.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).