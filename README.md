## Overview

Provide some API:

- [Auth](https://github.com/lethaitongg/nestjsDemo/blob/main/src/%40core/auth/auth.controller.ts).
- [User](https://github.com/lethaitongg/nestjsDemo/blob/main/src/%40core/user/user.controller.ts)

## Installation

```bash
$ npm install
```

## Configuration

Add your application configuration to your `.local.env` file in the root of your project:

```shell
DB_TYPE=YOUR_DATABASE_TYPE
DB_HOST=YOUR_DATABASE_HOST
DB_PORT=YOUR_DATABASE_HOST_PORT
DB_USERNAME=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_DATABASE=YOUR_DATABASE_NAME
JWT_SECRET_KEY:YOUR_SECRET_KEY_GOES_HERE
```

See the [API Docs](https://orkhan.gitbook.io/typeorm/docs/data-source-options) for more.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
