# Yeoman Generator for Wordpress Themes

This repository contains a [Yeoman](http://yeoman.io/) generator for Wordpress sites. To use it you'll first need to install Yeoman: `npm install -g yo`.

## Installation

You can install the generator anywhere on your filesystem. Once you've cloned the repository you'll need to link it so npm can find it. Run the following command from the root of the repository folder:

`npm link`

## Running the Generator

To generate a Wordpress site create a new directory, `cd` into it and run `yo`. You should see `wordpress` as an option in the list of available generators. Select it and follow the prompts. Note that we generally use `wp-` as a prefix for Wordpress sites but this is not strictly required.

The first task the generator runs is installing Wordpress. It assumes you have `composer` installed. If you don't you'll need to run `brew install composer` first.