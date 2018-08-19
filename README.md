# Practice using GraphQL with NodeJS

In this repository I will serve my project that I will be creating during learning [GraphQL with NodeJS course](https://www.howtographql.com/graphql-js/0-introduction/). 

## Installing

First of all run `yarn install` to install dependencies. Then you can run these commands:

```shell
yarn start # start the GraphQL local server
yarn playground # open playground with Database and Application layer
yarn prisma HERE_IS_PRISMA_COMMAND # prisma commands
```

> Note: whenever I use `yarn` you can use alternative version in `npm`

> Note: `yarn playground` runs `graphql playground` so you need `graphql-cli` installed globally, or add it as a dev dependency

### Prisma configuration

To be able to run this, you also need a Demo Server from Prisma.io. When you run `yarn prisma deploy` you will be asked to provide one or create it. Just follow those steps.

## Known issues

### Chapter 8 - Realtime GraphQL Subscriptions

By the time of writing this README, the version of `prisma-binding: "2.1.4"` has a known issue([here](https://github.com/howtographql/howtographql/issues/758)) with `Subscriptions`. So if it was not fixed in the latest version you better install the version `2.1.3`. If you have already installed it, run this:

```shell
rm -rf node_modules && unlink yarn.lock && yarn add prisma-binding@2.1.3 && yarn
```

## Links

- Awesome(in my opinion) Getting started tutorial for GraphQL: https://howtographql.com
- NodeJS GraphQL(inside howtographql): https://www.howtographql.com/graphql-js/0-introduction/

## Licensing

The code in this project is licensed under [MIT license](https://github.com/aibolik/practice--graphql-js/blob/master/LICENSE).
