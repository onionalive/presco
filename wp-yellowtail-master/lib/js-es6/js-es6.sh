#!/bin/bash

# check for args
if [ $# -ne 2 ]; then
    echo "No arguments provided"
    echo "Please provide the class name for the new JS file as the second argument and the required class name needed for the module to load"
    echo -e "NPM arg syntax is \033[1;36mnpm run <command> [-- <arg1: JS class name> <arg2: HTML tag class name>]\033[0m"
    exit 1
fi

echo -e "\033[1;32mBingo!"
echo -e "\033[0mCreating the \033[1;31m$1 \033[1;32mES6 JS file" 

#translate to lowercase if uppercase provided

camelCase=$(python -c "input='$1'; output=input[:1].lower() + input[1:]; print output;")
classCapital=$(python -c "input='$1'; output=input[:1].upper() + input[1:]; print output;")
lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# create files and folders

touch ./theme-src/js/modules/$camelCase.js
if [ ! -f ./theme-src/js/modules/$camelCase.js ]; then
    echo -e "\033[1;31m$camelCase.js had an error and was not generated!"
    exit 0
else
	cat ./lib/js-es6/module.txt >> ./theme-src/js/modules/$camelCase.js
	sed -i -e "s/target/$classCapital/g" ./theme-src/js/modules/$camelCase.js
	rm ./theme-src/js/modules/$camelCase.js-e
	echo -e "\033[1;32mGenerated: \033[0m./theme-src/js/modules/$camelCase.js"
fi

if [ ! -f ./theme-src/js/main.js ]; then
    echo -e open ."\033[1;31mCannot modify ./theme-src/js/main.js as I cannot find it!"
    exit 0
else
	sed -i -e "/module-files/r./lib/js-es6/main.txt" ./theme-src/js/main.js
	rm ./theme-src/js/main.js-e
	sed -i -e '/import-files/ a\
	'"import $classCapital from './modules/$camelCase.js';"' \
	' ./theme-src/js/main.js
	rm ./theme-src/js/main.js-e
	sed -i -e "s/instanceTarget/$classCapital/g" ./theme-src/js/main.js
	rm ./theme-src/js/main.js-e
	sed -i -e "s/varTarget/$camelCase/g" ./theme-src/js/main.js
	rm ./theme-src/js/main.js-e
	sed -i -e "s/classTarget/$2/g" ./theme-src/js/main.js
	rm ./theme-src/js/main.js-e
	echo -e "\033[1;36mAltered: \033[0m./theme-src/js/main.js"
fi
