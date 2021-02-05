#!/bin/bash

# check for args
if [ $# -eq 0 ]; then
    echo "No arguments provided. -h for help."
    exit 1
fi

echo -e "\033[1;32mBingo!"
echo -e "\033[0mCreating the \033[1;31m$1 \033[1;32mReact Module" 

lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')

# Generate the Container

touch ./src/components/common/$1.js
if [ ! -f ./src/components/common/$1.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/common/$1.js" 
else   
  echo -e "\033[1;32mGenerated: \033[0m./src/components/common/$1.js"
  cat ./lib/react-module/basic.txt >> ./src/components/common/$1.js
  sed  -i -e "s/target/$1/g" ./src/components/common/$1.js
  rm ./src/components/common/$1.js-e
fi
