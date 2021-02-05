# PC Front-End Playbook

**Notice: v1.0 is deprecated**

This guide will attempt to cover all the syntax and structure conventions the Present Company front-end development team uses on a project, in addition to looking at the tools that are commonly used across projects.

As it's unreasonable to expect each developer to strictly adhere to the conventions laid out in this document, this documents aims to initially serve as a guide to steer us towards a more streamlined, focused development process, and force us to think about how we can write tidier, DRY-er, semantic...er code.

## Table of Contents

1. [Text Editors](#1-text-editors)
1. [Utilities](#2-utilities)
1. [Project Structure](#3-project-structure)
1. [HTML](#4-html)
1. [CSS](#5-css)
1. [JavaScript](#6-javascript)
1. [Useful Links](#7-useful-links)

## [1.](#1-text-editors) Text Editors

#### Sections
1. [Section](#)

Choice of text editor is largely up to personal preference, although most of the development team uses either <a href="http://www.sublimetext.com/3" target="_blank">Sublime Text</a> or <a href="https://atom.io/" target="_blank">Atom</a> for writing code.

Consequently, there is only one convetion to follow with regards to text editors, which is that all code should be written using **only tabs** for indentation, **not spaces**.

To set this as a default in **Sublime Text 3**, go to *Sublime Text > Preferences > Settings – User* and add the option `"translate_tabs_to_spaces": false`.

To set this as a default in **Atom**, go to *Atom > Preferences...* and set **Tab Type** to **Hard**.

### [1.1](#11--sublime-text-packages) – Sublime Text Packages

Sublime Text is highly customisable and can be modified to include a package manager called [Package Control](https://packagecontrol.io/), which can then be used to install and manage a wide range of extremely useful packages that can dramatically improve your workflow. Installation is very simple, and can be done by following the instructions <a href="https://packagecontrol.io/" target="_blank">here</a>.

New packages can be installed by pressing `⌘+⇧+P` and typing `install` – the results filter should offer `Package Control: Install Package` as the first result. Hit `Return` and then start typing the name of the package to refine your results.

Here is a list of useful Sublime Text packages:
* <a href="https://packagecontrol.io/packages/SCSS" target="_blank">SCSS</a> - Syntax highlighting for SASS/SCSS files.
* <a href="https://packagecontrol.io/packages/Emmet" target="_blank">Emmet</a> - The essential toolkit for web-developers. (<a href="http://docs.emmet.io/" target="_blank">Docs</a>)
* <a href="https://packagecontrol.io/packages/BracketHighlighter" target="_blank">BracketHighlighter</a> - A better bracket and tag highlighter for Sublime Text.
* <a href="https://packagecontrol.io/packages/SideBarEnhancements" target="_blank">SideBarEnhancements</a> - Enhancements to Sublime Text sidebar. Files and folders.
* <a href="https://packagecontrol.io/packages/Color%20Highlighter" target="_blank">Color Highlighter</a> -  Underlines selected hexadecimal color codes with their real color.
* <a href="https://packagecontrol.io/packages/Modific" target="_blank">Modific</a> - Highlight lines changed since the last commit.
* <a href="https://packagecontrol.io/packages/Package%20Syncing" target="_blank">Package Syncing</a> - Keep your Sublime Text installations synchronised across multiple machines.

## [2.](#2-utilities) Utilities

#### Sections
1. [Node & NPM](#21--node--npm)
1. [Gulp](#22--gulp)
1. [Bower](#23--bower)

<!-- Project Structure Links -->
[Node]:https://nodejs.org/en/
[NPM]:https://www.npmjs.com/

### [2.1](#21--node--npm) – Node & NPM

<a href="https://nodejs.org/en/" target="_blank">Node.js</a> is a JavaScript runtime environment for developing server-side web applications.

To install Node, visit the <a href="https://nodejs.org/en/" target="_blank">project website</a> and download the latest LTS release.

<a href="https://www.npmjs.com/" target="_blank">NPM</a> is a package manager for Node, and allows the installation and management of project dependancies. NPM comes bundled with Node, so no additional installation is required.

### [2.2](#22--gulp) – Gulp

<a href="http://gulpjs.com/" target="_blank">Gulp</a> is an automated, highly configurable streaming build system that is used to compile front-end source files into files readable by the browser. Gulp will:

- compile HTML partials,
- compile SASS into CSS,
- autoprefix any CSS properties that require vendor prefixes,
- concatenate and run JSHint on Javascript files,
- copy static files such as images and fonts,
- create a local server for live browser previewing,
- deploy projects to S3,
- and do pretty much whatever else you want it to do with <a href="https://www.npmjs.com/search?q=gulp-" target="_blank">the right Gulp package</a>.

As Gulp is built on Node, it is ready to go once `npm install` has successfully been run from the project directory.

- [2.2.1](#2.2.1) <a name='2.2.1'></a> – **Gulp Tasks**

Our boilerplate Gulp setup uses a variety of tasks to take care of the tricky transition from `/src` to `/dist`, letting you just focus on writing code. Run these tasks from your project directory with `gulp <taskname>`

- `build`: sets production environment and compiles to `/dist`, minifying HTML/CSS and uglifying JS

- `watch`: compiles to `/dist`, and will watch `/src` for any file changes, used in conjection with your own local server

- `serve`: identical to `watch`, but will also create a local server for live previewing within the browser

- `clean`: deletes `/dist`

- `cacheclear`: clears gulp's cache

- `deploy`: will run `build` and then publish to your specified S3 bucket

*(Note: sometimes the `watch` task will not copy renamed static files such as images to `/dist` - running `clean`, then `cacheclear` and then `build` or `watch` will fix this)*

### [2.3](#23--bower) – Bower

<a href="http://bower.io/" target="_blank">Bower</a> is a package manager for web projects which allows you to utilise the most up-to-date versions of a large variety of frameworks, libraries, assets and utilities.

To install Bower globally, run `npm install -g bower` from any Terminal window.

- [2.3.1](#2.3.1) <a name='2.3.1'></a> – **Installing Packages**

Bower package dependancies are stored in `bower.json` in the project root.

When setting up a project for development, you must first install all required Bower packages by running `bower install` from the project directory.

To install additional dependancies, run `bower install <packagename> --save`. This will install the package, as well as adding it to the dependancies in `bower.json`. If you'd like to install a Bower package without adding it as a project dependancy, just omit the `--save` flag when running the `install` command.

To search for packages, either use the command `bower search <packagename>` or search on <a href="http://bower.io/search/" target="_blank">Bower.io</a>.

- [2.3.2](#2.3.2) <a name='2.3.2'></a> – **SASS/JS Imports**

Since the majority of Bower packages used in our projects require either stylesheets and/or javascript, it is important to understand how to correctly import them when the project is being compiled.

#### SASS

In order to import the SASS/CSS files from a Bower package, first an `@import` rule must be added to `main.scss` (see section [5.2.2](#5.2.2) for more information).

Next, you need to tell Gulp where to find the stylesheet (as it is not in the `css` folder). To do this, open `gulpfile.js` and find the **Stylesheets** task:

```js
// Stylesheets
gulp.task("stylesheets", function() {
	var paths = [
		'bower_components/normalize-scss/',
		'bower_components/bourbon/app/assets/stylesheets',
		'bower_components/neat/app/assets/stylesheets'
	];

	...
```

To add an additional Bower package stylesheet, just add the path to the stylesheet's folder to the `paths` array:

```js
// Stylesheets
gulp.task("stylesheets", function() {
	var paths = [
		'bower_components/normalize-scss/',
		'bower_components/bourbon/app/assets/stylesheets',
		'bower_components/neat/app/assets/stylesheets',
		'bower_components/path/to/component'
	];

	...
```

- **NOTE**: A recent change in `libsass` means that the import will fail if there are multiple SASS/CSS files in the specified Bower component folder. To fix this, just use the full file name when adding the `@import` rule to `main.scss` (i.e. instead of `@import "neat";`, use `@import "neat.scss";`.

#### JS

To import the JS files from a Bower package, open `gulpfile.js` and find the **Concatenate JS** task:

```js
// Concatenate JS
gulp.task("jsconcat", function() {
	return gulp.src([
			"bower_components/jquery/dist/jquery.min.js",
			"src/js/vendor/*.js"
		]).pipe( $.concat("vendor.min.js"))
		.pipe( gulp.dest("dist/js"));
});
```

To add an additional Bower package stylesheet, just add the path to the minified JS file to the `src` array:

```js
// Concatenate JS
gulp.task("jsconcat", function() {
	return gulp.src([
			"bower_components/jquery/dist/jquery.min.js",
			"bower_components/path/to/file.min.js",
			"src/js/vendor/*.js"
		]).pipe( $.concat("vendor.min.js"))
		.pipe( gulp.dest("dist/js"));
});
```

- **NOTE**: `src/js/vendor/*.js` should always be the last item being imported.

## [3.](#3-project-structure) Project Structure

#### Sections
1. [Section](#)

The default file structure used for projects is show below:

<pre>
<b>src</b>
├── <a href="#5-css"><b>css</b></a>
│   ├── <b>base</b>
│   │   ├── <a href="#5.2.4">_colours.scss</a>
│   │   ├── <a href="#5.2.3">_page.scss</a>
│   │   └── <a href="#5.2.5">_typography.scss</a>
│   ├── <a href="#5.2.6"><b>components</b></a>
│   │   └── _component.scss
│   ├── <a href="#5.2.7"><b>sections</b></a>
│   │   └── _section.scss
│   ├── <a href="#5.1.4">_mixins.scss</a>
│   └── <a href="#5.2.2">main.scss</a>
├── <b>fonts</b>
├── <b>img</b>
│   ├── backgrounds
│   ├── icons
│   └── favicon.ico
├── <a href="#6-javascript"><b>js</b></a>
│   ├── main.js
│   └── plugins
│       └── plugin.js
├── <b>partials</b>
│   └── _partial.html
└── <a href="#4-html"><b>index.html</b></a>
</pre>



## [4.](#4-html) HTML

#### Sections
1. [Conventions](#41--conventions)

### [4.1](#41--conventions) – Conventions

- [4.1.1](#4.1.1) <a name='4.1.1'></a> – **File & Folder Structure**

<pre>
<b>src</b>
├── <b>partials</b>
│   └── _partial.html
└── <b>index.html</b>
</pre>

- [4.1.2](#4.1.2) <a name='4.1.2'></a> – **Pages**

- [4.1.3](#4.1.3) <a name='4.1.3'></a> – **Partials**

## [5.](#5-css) CSS

#### Sections
1. [SASS](#51--sass)
1. [Conventions](#52--conventions)
1. [The Grid](#53--the-grid)
1. [Media Queries](#54--media-queries)

- <a href="http://sass-lang.com/" target="_blank">SASS</a> - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.
- <a href="http://rscss.io/" target="_blank">RSCSS</a> - Styling CSS without losing your sanity.
- <a href="http://bourbon.io/" target="_blank">Bourbon</a> - A simple and lightweight mixin library for Sass.
- <a href="http://neat.bourbon.io/" target="_blank">Neat</a> - A lightweight semantic grid framework for Sass and Bourbon.
- <a href="https://github.com/necolas/normalize.css/" target="_blank">Normalize</a> - A modern, HTML5-ready alternative to CSS resets.

### [5.1](#51--sass) – SASS

This section will give a brief rundown of some of the features and functionality of <a href="http://sass-lang.com/" target="_blank">SASS</a>. More in-depth documentation can be found <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html)" target="_blank">here</a>.

- [5.1.1](#5.1.1) <a name='5.1.1'></a> – **Variables**

SASS variables can be defined as follows:
```scss
$width: 10px;
```

- At their most basic, SASS variables can be numbers (e.g. 1.2, 13, 10px), strings of text (e.g. "foo", 'bar', baz) or colours (e.g. blue, #04a3f9, rgba(255, 0, 0, 0.5)).
- SASS variables can also be booleans, lists of values and maps, which are handy when creating your own SASS functions.

Using a variable is as simple as referring to its name:
```scss
.element {
	width: $width;
}
```

--------------------

- [5.1.2](#5.1.2) <a name='5.1.2'></a> – **Nesting**

SASS allows for CSS rules to be nested, making your job of writing good, clean code much simpler. For example:

```scss
// SCSS

.sample-component {
	// Sample Component Styles

	.element {
		// Element Styles
	}
}
```

This will be compiled to:
```css
/* CSS */

.sample-component {
	/* Sample Component Styles */
}

.sample-component .element {
	/* Element Styles */
}
```

You can also use the incredibly useful `&` character to reference the parent selector, like so:
```scss
// SCSS

.sample-component {
	// Sample Component Styles

	.element {
		// Element Styles

		.hide & {
			display: none;
		}
	}

	&.-variant {
		// Variant Styles
	}
}
```

This will be compiled to:
```css
/* CSS */

.sample-component {
	/* Sample Component Styles */
}

.sample-component .element {
	/* Element Styles */
}

.hide .sample-component .element {
	display: none;
}

.sample-component.-variant {
	/* Variant Styles */
}
```

--------------------

- [5.1.3](#5.1.3) <a name='5.1.3'></a> – **Operators**

Basic math operations can also be performed using SASS. Here are some examples:
```scss
// SCSS

$width: 100px;
$multiplier: 0.5;
$fontSize: 12px;


.element {
	width: $width;
	height: $width * $multiplier;
	margin-left: $width - ($fontSize/2);
	margin-right: $width * 0.25;

	font-size: $fontSize;
	line-height: $fontSize + 10px;
}
```

This will be compiled to:
```css
/* CSS */

.element {
	width: 100px;
	height: 50px;
	margin-left: 94px;
	margin-right: 25px;

	font-size: 12px;
	line-height: 22px;
}
```

--------------------

- [5.1.4](#5.1.4) <a name='5.1.4'></a> – **Mixins**

SASS mixins allow you to easily define a chunk of SASS that can easily be reused throughout your project. A mixin can be defined and used as follows:

```scss
// SCSS

$c-blue: #0000ff;

@mixin blue-text {
	color: $c-blue;
}

p {
	@include blue-text
}
```

This will be compiled to:
```css
/* CSS */

p {
	color: #0000ff;
}
```

For a more practical application:
```scss
// SCSS

@mixin vertical-center {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}

.parent {
	position: relative;

	.child {
		// Child Styles

		@include vertical-center;
	}
}
```

This will be compiled to:
```css
/* CSS */

.parent {
	position: relative;
}

.parent .child {
	/* Child Styles */

	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
```

- SASS mixins can also be written to accept arguments; more detailed information can be found <a href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins" target=_blank>here</a>.

### [5.2](#52--conventions) – Conventions

This section will define the style and syntax conventions that are to be used when writing SASS for a project.

- [5.2.1](#5.2.1) <a name='5.2.1'></a> – **File & Folder Structure**

Below is an example of the basic file/folder structure for a project's CSS.

<pre>
<b>css</b>
├── <b>base</b>
│   ├── _colours.scss
│   ├── _page.scss
│   └── _typography.scss
├── <b>components</b>
│   └── _component.scss
├── <b>sections</b>
│   └── _section.scss
├── _mixins.scss
└── <b>main.scss</b>
</pre>

- All files that are being imported into `main.scss` should have their filenames prefixed with `_`; this allows to easily be identified as imports.
- Additional folders can be added as needed, but make sure to also add a new import rule to `main.scss` (see section [5.2.2](#5.2.2) for more information).

--------------------

- [5.2.2](#5.2.2) <a name='5.2.2'></a> – **main.scss**

The `main.scss` file is used to import all other SASS project files.

```scss
// Bower
@import "normalize";
@import "bourbon";
@import "neat";

// Mixins
@import "mixins";

// Layout
@import "base/*";

// Sections
@import "sections/*";

// Components
@import "components/*";
```

- The standard syntax for a SASS import is `@import "path/to/file";` (*note that the filename doesn't need to include the leading `_` character or the `.scss` file extension; the compiler is smart enough to figure out what you mean*).
- Our Gulp setup is configured to use globbing, so the `*` wildcard can be used to import all SASS files within a specified folder.
- The **Bower**, **Mixins** and **Layout** sections must be kept at the top of the file in the order they appear above.
- Importing additional **Bower** components requires further setup, see section [2.3.2](#2.3.2) for more information.

--------------------

- [5.2.3](#5.2.3) <a name='5.2.3'></a> – **page.scss**

The `page.scss` file is used to define global SASS variables and set basic, sitewide page styles.

```scss
// - Page Layout - //
$max-width: 1200px;
$gutter: 2.35765%;

// - Breakpoints - //
$mobile: new-breakpoint(max-width 667px);
$tablet: min-width 768px max-width 1024px;

html {
	background: $c-white;
}

body {
	width: 100%;
	min-height: 100%;
}
```

- See section [5.1.1](#5.1.1) for more information about SASS variables.

--------------------

- [5.2.4](#5.2.4) <a name='5.2.4'></a> – **colours.scss**

The `colours.scss` file is used to define global colour variables.

```scss
// - Shades - //
$c-black: #000000;
$c-dark-grey: #1a1a1a;
$c-light-grey: #eeeeee;
$c-white: #ffffff;
$c-modal: rgba(0,0,0,0.9);

// - Brand Colours - //
$c-blue: #79cdcd;
$c-red: #ed1846;
```

- The naming convention for global colour variables is `$c-<name>`.
- See section [5.1.1](#5.1.1) for more information about SASS variables.
- See section [5.2.6](#5.2.6) for more information about component-specific colour variables.

--------------------

- [5.2.5](#5.2.5) <a name='5.2.5'></a> – **typography.scss**

The `typography.scss` file is used to:
- import webfonts using `@font-face`
- define SASS mixins for fonts
- set global font styles

The convention for defining a font mixin is:
```scss
@mixin font-helvetica-bold {
	font: {
		family: Helvetica, Arial, sans-serif;
		weight: 700;
		style: normal;
	}
}
```

To use a defined font mixin:
```scss
// SCSS

.text {
	@include font-helvetica-bold;
}
```

This will be compiled to:
```css
/* CSS */

.text {
	font-family: Helvetica, Arial, sans-serif;
	font-weight: 700;
	font-style: normal;
}
```

- See section [5.1.1](#5.1.1) for more information about SASS mixins.

All font styles should be defined within `typography.scss`. Here is an example:
```scss
.class {
	@include font-helvetica;
	font-size: 2rem;
	line-height: 1.5em;
	letter-spacing: 1px;
	text-transform: uppercase;
	text-decoration: none;
	color: $c-black;

	margin-top: 0;
	margin-bottom: 1.1em;
}
```

- Component specific font styles should be set in their respective stylesheets
- `font-size` should always use `rem` units. By default the `font-size` for the `body` element will be set to `62.5%`, which allows `1rem` to equal `10px`. For more information about `rem` units, read this <a href="http://snook.ca/archives/html_and_css/font-size-with-rem" target="_blank">blog post</a>.
- `line-height`, `margin-top` and `margin-bottom` should use `em` units; this allows their size to be set based on the element's `font-size` (where `1em` will be equal to the `font-size`).

--------------------

- [5.2.6](#5.2.6) <a name='5.2.6'></a> – **Components**

The `Components` folder will contain multiple SASS files, each corresponding to a single component used in the project.

For a given component:
```html
<div class="sample-component -variant">
	<div class="element"></div>
</div>
```

Styles are defined following these conventions:
```scss
// - Sample Component - //

.sample-component {
	// Component Styles

	> .element {
		// Element Styles
	}

	&.-variant {
		// Variant Styles
	}
}
```

Component-specific variables (e.g. colours or measurements) can be included at the top of the component's SASS file:
```scss
// - Sample Component - //
$sampleComponentWidth: 200px;
$c-sampleComponentBg: $c-black;

.sample-component {
	width: $sampleComponentWidth;
	height: $sampleComponentWidth * 0.75;

	background-color: $c-sampleComponentBg;
}
```

- Visit <a href="http://rscss.io/" target="_blank">RSCSS</a> for more information on how components/elements/variants should be named, and how their SASS rules should be written.
- See section [5.1.1](#5.1.1) for more information about SASS variables.

--------------------


- [5.2.7](#5.2.7) <a name='5.2.7'></a> – **Sections**

### [5.3](#53--the-grid) – The Grid

Our grids are made using <a href="http://neat.bourbon.io/" target="_blank">Neat</a>. This section will cover the basic Neat mixins used to create a grid structure, but more in-depth documentation can be found <a href="http://thoughtbot.github.io/neat-docs/latest/" target="_blank">here</a>.

- [5.3.1](#5.3.1) <a name='5.3.1'></a> – **Containers**

HTML elements that are required to contain [Grid Items](#5.3.2) must be made into containers using Neat's `outer-container` mixin.

```scss
// SCSS
$max-width = 1200px;

.container {
	@include outer-container($max-width);
}
```

This will be compiled to:
```css
/* CSS */

.container {
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
}

.container:before,
.container:after {
	content: "";
	display: table;
}

.container:after {
	clear: both;
}
```

- A percentage `width` should also be set when an element is required to take up a percentage of its parent's width; this allows the element to behave responsively, but also not extend beyond the design's maximum width.

--------------------

- [5.3.2](#5.3.2) <a name='5.3.2'></a> – **Grid Items**

Grid items may only be placed within an element that has been made into a [Container](#5.3.1) using the `outer-container` mixin.

#### span-columns

You can specify how many columns a grid item takes up using the `span-columns` mixin:
```scss
// SCSS

.grid-item {
	@include span-columns(6);
}
```

This will be compiled to:
```css
/* CSS */

.grid-item {
	float: left;
	display: block;
	margin-right: 2.35765%;
	width: 48.82117%;
}

.grid-item:last-child {
	margin-right: 0;
}
```

The result is an element that takes up 6 columns of a 12 column grid.

- By default, the number of total columns in the layout is **12**, although `span-columns` can accept custom grid layouts (e.g. `@include span-columns(49 of 100)` or `@include span-columns(3.5 of 10)`).

#### shift

To shift a column along the grid layout, use the `shift` mixin:
```scss
// SCSS

.grid-item {
	@include span-columns(6);
	@include shift(3);
}
```

This will be compiled to:
```css
/* CSS */

.grid-item {
	float: left;
	display: block;
	margin-right: 2.35765%;
	width: 48.82117%;
	margin-left: 25.58941%;
}

.grid-item:last-child {
	margin-right: 0;
}
```

The result is an element that takes up 6 columns of a 12 column grid that has been shifted along from the left by 3 columns.

- Much like the `span-columns` mixin, `shift` can accept custom grid layouts (e.g. `@include shift(14 of 55)` or `@include shift(2.25 of 7)`)

#### omega

The `omega` mixin is used to remove the gutter margin (or `margin-right`) of every nth element within a grid. For example, given a 12 column grid with 3 grid items per row, the grid item would be defined as:
```scss
// SCSS

.grid-item {
	@include span-columns(3);
	@include omega(3n);
}
```

This will be compiled to:
```css
/* CSS */

.grid-item {
	float: left;
	display: block;
	margin-right: 2.35765%;
	width: 23.23176%;
}

.grid-item:last-child {
	margin-right: 0;
}

.grid-item:nth-child(3n) {
	margin-right: 0;
}

.grid-item:nth-child(3n+1) {
	clear: left;
}
```

### [5.4](#54--media-queries) – Media Queries

Media queries are also handled by Neat, using the `media` mixin.

Firstly, media query breakpoints should be defined in `page.scss` using SASS variables as follows:
```scss
// - Breakpoints - //
$mobile: max-width 667px;
$tablet: min-width 768px max-width 1024px;
```

- The syntax to follow when definine a breakpoint variable is `$<device>: <media-feature> <size> ...`.
- Any number of media features and corresponding sizes can be defined.

Now, whenever you want to create a media query for a given device, just use the `media` mixin:
```scss
// SCSS

.element {
	// Desktop Styles

	@include media($tablet) {
		// Tablet Styles
	}
}
```

This will be compiled to:
```css
/* CSS */

.element {
	/* Desktop Styles */
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
	.element {
		/* Tablet Styles */
	}
}
```

## [6.](#6-javascript) JavaScript

#### Sections
1. [Overview](#js-overview)
1. [Folder Structure](#js-folder-structure)
1. [File Structure](#js-file-structure)
1. [Linters](#js-linter)
1. [ES6](#js-es6)

### [6.1](#js-overview) – Overview

Javascript is a forever evolving language with forever increasing levels of commplexity. At the time of writing we are migrating from `es5` to `es6`. For the scope of this document, `es6` is a version of javascript. [Click here](https://www.wikiwand.com/en/ECMAScript) if you want to learn more about ECMAScript. As a rule of thumb we generally develop our code into modular, reusable code that we can import/export when/where required.

###[6.2](#js-folder-structure) – Folder Structure

The default Javascript structure used for projects is show below:

<pre>
<b>js</b>
├── <b>modules</b>
│   ├── header.js
│   ├── randomFile.js
│   ├──<b>utils</b>
│       └── search.js
└── main.js
</pre>

`main.js` is the entry point for all our js files. Javascript files are imported either via `require()` or ES6's `import` statement.

### [6.3](#js-file-structure) – File Structure

A default `main.js` file in `es5` is below:

```
$(document).ready(function () {
	require('./modules/header.js').init();

	if ($('.home').length) {
		require('./modules/home.js').init();
	}

	if ($('.fully-sick-page').length) {
		require('./modules/fullySickPage.js').init();
	}
});
```

A default `main.js` file in `es6` is below:
```
// import-files
import Header from './modules/header';
import Home from './modules/home';
import FullySickPage from './modules/fullySickPage';

$(document).ready(() => {
	const header = new Header();

	if ($('.home').length) {
		const home = new Home();
	}

	if ($('.fully-sick-page').length) {
		const fullySick = new FullySickPage();
	}

});
```

A default `home.js` file in `es5` is below:

```
var base = {
	$button: $('.home-button'),

	init: function () {
		base.setupDOM();
		base.someOtherThing();
	},

	setupDOM: function () {
		base.$button.on('click', function() {
			alert('so you like, clicked a button, sweet :)');
		}
	},

	someOtherThing: function() {
		console.log('some other function to run on this page');
	}
};

module.exports = {
	init: base.init,
};
```

A default `home.js` file in `es6` is below:

```
class Home {
	constructor() {
		this.$button = $('.home-button'),

		this.setupDOM();
		this.someOtherThing();
	}

	setupDOM() {
		this.$button.on('click', () => {
			alert('so you like, clicked a button, sweet :)');
		}
	}

	someOtherThing() {
		console.log('some other function to run on this page');
	}
}

export default Home;

```

### [6.4](#js-linters) – Linters

`Linters` are utilies that run in the terminal which monitor the code you type.

Generally speaking, we use two main js linters, [JSHint](http://jshint.com/) and [JSCS](http://jscs.info/) for `es5` or [ESLINT](http://eslint.org/) for `es6`.

#### JSHint

`JSHint` is generally used to catch bugs and unused variables in the code.

#### JSCS/ESLINT

`JSCS/ESLINT` is used generally used as a style checker. This means it will check that you are using the correct format. Generally speaking this creates visually cleaner code.

Of course, there is a bit of overlap between `JSHint` and `JSCS/ESLINT`

### [6.5](#js-es6) – ES6/ECMAScript6/ES2015

- [Introduction - What/Why](ECMAScript6/introduction.md)
- [Classes](ECMAScript6/classes.md)
- [Import/Export](ECMAScript6/import-export.md)
- [Arrow Fn/Lexical This](ECMAScript6/arrow-fn.md)
- [Enhanced Object Literals](ECMAScript6/enhanced-object-literals.md)
- [Template Literals](ECMAScript6/template-literals.md)
- [Variable Declarations - Let & Const](ECMAScript6/variable-declarations.md)
- [Default, Rest and Spread](ECMAScript6/default-rest-spread.md)
- [Promises](ECMAScript6/promises.md)
