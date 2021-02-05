# wp-craveable-brands

## Installation

* Copy `.env.example` to `.env` and place our ACF Pro Key in `.env`
	* You can get this value from 1 Password
* Run `composer install` from the root of the project
* Run `npm install` from the root of the project
* Run `bower install` from the root of the project  

## Configure Wordpress

Wordpress will be served from a subfolder in this project (`wp`). You’ll need to configure Wordpress to allow this. This process is summarised below but full instructions can be found [here](https://codex.wordpress.org/Giving_WordPress_Its_Own_Directory)

* Log in to the CMS
	* You’ll need to include the `wp/` subdiretory in the URL

* Navigate to the ‘Settings > General’ pane
* Change `Site Address (URL)` so it does not include the `wp` subdirectory
* Copy `wp/.htaccess` to `.htaccess` (your root project directory)
* Update your `wp/wp-config.php` file so it includes the following:
	* `define( 'WP_CONTENT_DIR', dirname(dirname(__FILE__)) . '/wp-content' );`  
	* `define( 'WP_CONTENT_URL', 'http://localhost/wp-craveable-brands/wp-content' );` (where `http://localhost/wp-craveable-brands/` is the URL of the root of your project)
	* If you’re local make sure `WP_DEBUG` is true to assist in testing

Once you’ve followed these steps you should be able to log in to the CMS and enable the Craveable Brands theme.

## Deploy To Staging

* Create a file called `.ftppass`in the root project folder
* Copy the following code into it:
`{
  "staging": {
    "user": "craveable-staging-theme",
    "pass": ""
  }
}`
* Find the password in 1 Password
* To deploy to staging `gulp deploy`

## Deploy To Production

* Make sure your changes have been deployed to staging
* Go to oxygen.com.au/wp-admin
* Details in 1password under `Oxygen - wp-admin`
* Click `WP Engine` in the top left corner
* Click the `Staging` tab
* Click `Deploy site from STAGING to LIVE`
* Ensure `Database Mode` shows `Move No Tables`
* `Email to Notify` is optional - use this if you'd like to know when the deploy is done
* Click `Deploy to Production`

## Language

This is a React project, using a Wordpress API. The language is primarily JSX, with jQuery also used.

## Database

MySQL - Details found in 1 Password
