# Design System

## Setup

### Main repo

`yarn install` or `npm install`.

### Storybook

`npm install -g storybook`.

Usage: `yarn run storybook` to set it up on port 6006.

To build out the start storybook website, run `yarn run build:storybook`.

### Docs

`yarn run docs` will generate the esdoc file and set the output to the `doc` folder.

Use `open ./doc/index.html` to view the local docset.

### NPM Scripts

Command 					| Usage
---							| ---
yarn run start				| Start the React server
yarn run build     			| Build the React app
yarn run storybook 			| Start Storybook server
yarn run build:storybook	| Build the static Storybook out
yarn run docs 				| Build out the ESDocs set
gulp watch 					| Watch the scss files and rebuild
gulp styles 				| Rebuild the main.css file

## Working with the repo

The repo uses `esdoc` to generate a manual and `storybook` to create an interactive React component library. This style guide attempts to steer clear of being too opinionated on any frameworks and instead aims to be flexible where possible.

## Storybook

The Storybook itself can be ran on the server using `yarn run storybook` - this will start the server on port 6006. If you are generating files on the storybook and sass changes are happening straight away, maybe run `gulp styles` on another terminal.

### Adding to the Storybook

Stories are added in the `/stories/index.js` file. Refer to their docs to see more, but basically this repo still uses Redux so ensure you have the initial `addDecorator` there. Basically copy and paste what you see.

Build out the main compoenent + a documentation one for it so that we can add the docs to the storybook itself. The current setup is a bit scattered but will all become uniform soon.

### Building Components

If possible, use the esdoc syntax to update docs on the components and anything required. Most of the reducer files aren't actually used, just how my `node-fs-react` program generates things for me.

Just follow the convention from `/src/components` to get everything across.

### Hacking styles that relate only to the Storybook

Use the `/stories/storybook.css` file and write the CSS - don't be a pansy. Using scss in this repo is painful enough at times.

## ESDocs

This style guide aims to break everything down into the following:

1. Principles
2. Style
3. Motion
4. Components
5. Patterns
6. Communications
7. Resources

The sections still need to be updated and are a combination of important concepts.

Build out the docs and open to view the current set.

### Adding to the Docs

If you need to add another "manual" topic, you need to add that to the `.esdoc.json` file.

Simple write in the .md files to update documentation.

The current style (which maybe should be updated) is to create one component that is the component itself we wish to model, and then another component which is the documentation partner to it which imports both the component and the documentation components and is used to display the docs for the component in the storybook itself.

## TODO

Basically everything.

### Components

The full list of components should eventually be migrated over to the `components.md` file.

If any of the names come off as misleading or you are not sure what they are, websites like `http://carbondesignsystem.com/` should have a pretty significant list.

**Component Status**

Compoents 					| Status 			| Version
---							| --- 				| ---
Accordion					| Low priority  	| -
Breadcrumbs 				| Done 				| 0.1.0
Button 						| Done 				| 0.1.0
Card/Item					| Done 				| 0.1.0
List/Grid					| Done 				| 0.1.0
Interior left nav 			| Low priority 		| -
Dropdown					| Done 				| 0.1.0
Simple date picker			| Low priority 		| -
Table 						| Done 				| 0.1.0
Loading (SVG spinner) 		| Done 				| 0.1.0
Modal 						| Done 				| 0.1.0
Notification				| To do 			| -
Overflow					| Low priority 		| -
Pagination					| To do 			| -
Progress indicator			| Done 			 	| 0.1.0
Radio button   				| Done 				| 0.1.0
Slider						| To do 			| -
Tabs						| To do 			| -
Tags						| To do 			| -
Text input 					| Done 				| 0.1.0
Tooltip						| Low priority 		| -
