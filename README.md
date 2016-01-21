# bitcoin-util

[![npm version](https://img.shields.io/npm/v/bitcoin-util.svg)](https://www.npmjs.com/package/bitcoin-util)
[![Build Status](https://travis-ci.org/mappum/bitcoin-util.svg?branch=master)](https://travis-ci.org/mappum/bitcoin-util)
[![Dependency Status](https://david-dm.org/mappum/bitcoin-util.svg)](https://david-dm.org/mappum/bitcoin-util)

**Utility functions for Bitcoin hashes and targets**

## Usage

`npm install bitcoin-util`

### Methods

#### `toHash(hex)`

Takes a hex string that contains a Bitcoin hash as input, and returns a Bitcoin-protocol-friendly Big-endian Buffer. Throws an error if the hex string is not of length 64 (representing a 256-bit hash).

#### `toCompactTarget(n)`

Converts the difficulty target `n` to its compact representation (used in the "bits" field in block headers). `n` can be a `Buffer`, hex string, or `BN` (from the [`bn.js`](https://github.com/indutny/bn.js) package).

## NOTE

`bitcoin-util` uses the [`buffertools`](https://github.com/bnoordhuis/node-buffertools) package as a dependency, which is a compiled native module. When browserifying, the [`browserify-buffertools`](https://github.com/maraoz/browserify-buffertools) package will be used instead (to keep browser compatibility).
