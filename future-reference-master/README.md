# future-reference

Future Reference Static Site

## Installing / Getting started

Clone this repo.

Create a .env file in the site root and add the dato api `Read-only` token.

```
# Dato CMS
DATO_API_TOKEN=TOKEN_HERE
```

Replace `TOKEN_HERE` with the actual token. This can be found in 1pass.


Run these commands to download and set up the site dependencies

```shell
yarn install
npm run dump
gulp serve
```

`yarn install` will install all the dependencies required.

`npm run dump` or `yarn dump` grabs all the data from dato.cms and dumps the data into unique .json files in `src/html/data/`.

`gulp serve` compiles and output all the Javascipt and SCSS files and watchs for changes to them. It also starts a server for the site at `localhost:3000`

`yarn deploy-staging` deploys to staging
