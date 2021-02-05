# React/Preact Starter

This project began as a bootstrap to `create-react-app`.

Importantly, this repo has been designed such that it uses both `esdoc` and `storybook` for documentation/interaction, `enzyme/mocha` for testing and `gulp` as a task runner so we can use both `sass` and image minification during our dev workflow and potentially use a deploy script for AWS.

## Getting started

### Theme

Set the theme in the gulpfile for the `theme` constant.

### tl;dr

```
> npm i
> npm i -g esdoc 			# if you don't have it
> esdoc 					# generate docs
> npm run docs 				# script to open up the docs
> npm i -g @storybook/cli	# install storybook CLI
> npm run storybook 		# script to run the storybook on port 6006
> npm start 				# start the dev env for the website - runs `gulp watch` + `start-js`
> npm run build				# build out a production version of the app
> npm i -g serve			# install zeit serve to test production builds
> serve -s build			# serve the production build on port 5000
```

### Documentation

We use esdoc for documentation.

For documentaiton, install `esdoc` globally using `npm i -g esdoc` and then run `esdoc` on the command line. There is a npm package script `npm run docs` that will open up the docs in the browser.

Please use the documentation to write notes on testing and for the files.

### Testing

We are using Mocha + Chai + Enzyme mainly but also have the option to use Jest. There is a `setup.js` file that helps us in the Enzyme testing for rendering components with the Redux store + using mocks. Refer to `src/components/home/Home.test.js` for an example test file.

More documentation on the tests should be found at `esdoc` over the projects lifetime.

### Storybook

Storybook is an incredible way to interact and develop single components. Ensure you download the cli and then run `npm run storybook` in order to run the storybook site on port 6006. It currently uses the Webpack config from the `config/` folder.

You can also build a production version of the storybook using `npm run build-storybook` - but that may be unnecessary.

## Building production

You can run `npm run build` to run a production build version of the app. You can test serve it using `serve -s build` or use the companion Express file `app.js` by running `node app.js`.

The Express file is used to help serve on a staging portal (and potentially production). It is also very useful when working in conjuction with the `Dockerfile` to deploy to servers that build out a Dockerfile.

## Preact

If you are building a smaller project, it is advisable to use `Preact` to reduce the final size. Preact requires that you install `preact` and `preact-compat`.

To enable Preact, head to the `config/webpack.config.*.js` files and uncomment the aliases for `preact-compat` found at `module.exports.resolve.alias` for both files. You'll know it is working correctly if you run `npm run build` and find a large file size saved.

Warning - if you want to use Preact, ensure all behaviour is working correctly. I've found issues before when using `Redux` - ideally only use it when you are not using Redux as a store.
