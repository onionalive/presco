#!/bin/bash

# check for args
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please provide the page name as the second argument. NPM arg syntax is \033[1;36mnpm run <command> [-- <args>]"
    exit 1
fi

echo -e "\033[1;32mBingo!"
echo -e "\033[0mCreating the \033[1;31m$1 \033[1;32mWP-Page" 

#translate to lowercase if uppercase provided

lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# create files and folders

touch ./theme-src/page-$lower.php
if [ ! -f ./theme-src/page-$lower.php ]; then
    echo -e "\033[1;31mpage-$lower.php had an error and was not generated!"
    exit 0
else
	cat ./lib/wp-page-script/wp-page.txt >> ./theme-src/page-$lower.php
	sed -i -e "s/target/$lower/g" ./theme-src/page-$lower.php
	rm ./theme-src/page-$lower.php-e
	echo -e "\033[1;32mGenerated: \033[0mtheme-src/page-$lower.php"
fi


touch ./theme-src/views/$lower.twig
if [ ! -f ./theme-src/views/$lower.twig ]; then
    echo -e open ."\033[1;31m$1.twig had an error and was not generated!"
    exit 0
else
	cat ./lib/wp-page-script/wp-page-twig.txt >> ./theme-src/views/$lower.twig
	sed -i -e "s/target/$lower/g" ./theme-src/views/$lower.twig
	rm ./theme-src/views/$lower.twig-e
	echo -e "\033[1;32mGenerated: \033[0mtheme-src/page-$lower.php"
fi

