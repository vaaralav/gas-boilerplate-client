# gas-boilerplate-client

This is an example Node.js client to demonstrate how to use [gas-boilerplate](https://github.com/vaaralav/gas-boilerplate) as an API executable and consume the API with Node.js app.

## Requirements

* yarn
* node.js
* git
* Existing Google Apps Script project bootstrapped with gas-boilerplate and deployed as executable API

## Installation

```shell
git clone https://github.com/vaaralav/gas-boilerplate-client.git
cd gas-boilerplate-client
yarn
cp .env.example .env
```

## Usage

### Get authorization tokens

```shell
yarn auth
```

Follow the instructions and add tokens to [.env](.env).

### Use the executable API

This command calls and executes the function `foo` in the Google Apps Script defined in [.env](.env) with.

```shell
yarn start
```
