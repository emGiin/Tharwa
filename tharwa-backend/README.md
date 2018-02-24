# Tharwa server application

## Requirements
Install the following :
 - [Node v7.6+](https://nodejs.org/en/download/current/) or [Docker](https://www.docker.com/)
 - [Yarn](https://yarnpkg.com/en/docs/install)
 - [MongoDB](https://www.mongodb.com/download-center#community)
 - [Visual Studio Code](https://code.visualstudio.com/download)

## Steps for Getting Started

Clone the repo and make it yours:

```bash
git clone https://github.com/emGiin/tharwa-backend
cd tharwa-backend
```

Install dependencies:

```bash
yarn
# or use npm
npm install
```

Set environment variables:

```bash
cp .env.example .env
```

## Running Locally [development mode]

```bash
# checkout to develop branch
git checkout develop
# start mongoDB service
mongod
# start dev server
yarn dev
```

## Running in Production

```bash
yarn start
```

## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Test

```bash
# run all tests with Mocha
yarn test

# run unit tests
yarn test:unit

# run integration tests
yarn test:integration

# run all tests and watch for changes
yarn test:watch
```

## Validate

```bash
# run lint and tests
yarn validate
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Docker

```bash
# run container locally
yarn docker:dev
# or
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run container in production
yarn docker:prod
# or
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run tests
yarn docker:test
# or
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

## Deploy

Set your server ip:

```bash
DEPLOY_SERVER=127.0.0.1
```

Run deploy script:

```bash
yarn deploy
# or
sh ./deploy.sh
```