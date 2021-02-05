#!/bin/bash

# check for args
if [ $# -eq 0 ]; then
    echo "No arguments provided. -h for help."
    exit 1
fi

echo -e "\033[1;32mBingo!"
echo -e "\033[0mCreating the \033[1;31m$1 \033[1;32mReact Module" 

lower=$(echo "$1" | tr '[:upper:]' '[:lower:]')
# create files and folders
mkdir ./src/components/$lower
if [ ! -f ./src/components/$lower ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$lower"
else 
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower"
fi

# Generate the Container

touch ./src/components/$lower/$1.js
if [ ! -f ./src/components/$lower/$1.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$lower/$1.js" 
else   
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$1.js"
  cat ./lib/react-module/container.txt >> ./src/components/$lower/$1.js
  sed  -i -e "s/target/$1View/g" ./src/components/$lower/$1.js
  rm ./src/components/$lower/$1.js-e
fi

# Generate the Reducer

touch ./src/components/$lower/$1Reducer.js
if [ ! -f ./src/components/$lower/$1Reducer.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$lower/$1Reducer.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$1Reducer.js"
  cat ./lib/react-module/reducer.txt >> ./src/components/$lower/$1Reducer.js
  sed  -i -e "s/target/$1Reducer/g" ./src/components/$lower/$1Reducer.js
  rm ./src/components/$lower/$1Reducer.js-e
fi

# Generate the View

touch ./src/components/$lower/$1View.js
if [ ! -f ./src/components/$lower/$1View.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$lower/$1View.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$1View.js"
  cat ./lib/react-module/view.txt >> ./src/components/$lower/$1View.js
  sed  -i -e "s/target/$1View/g" ./src/components/$lower/$1View.js
  sed  -i -e "s/sass/$lower/g" ./src/components/$lower/$1View.js
  rm ./src/components/$lower/$1View.js-e
fi

# Generate the Test

touch ./test/$1.js
if [ ! -f ./test/$1.js ]; then
  echo -e "\033[0mError: Failed to create ./test/$1.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./test/$1.js"
  cat ./lib/test-template/test.txt >> ./test/$1.js
  sed  -i -e "s/target/$1/g" ./test/$1.js
  sed  -i -e "s/lower/$lower/g" ./test/$1.js
  rm ./test/$1.js-e
fi

# import to reducer.js
# echo -e "\033[1;36mAltered: \033[0m./src/reducers/reducer.js"

# sed -i -e '/user/ a\
# '"    import { $1Reducer } from '../components/$lower/$1Reducer.js';
# "'' ./src/reducers/reducer.js
# rm ./src/reducers/reducer.js-e

# sed -i -e '/target/ a\
# '"    initState: $1Reducer,
# "'' ./src/reducers/reducer.js
# rm ./src/reducers/reducer.js-e
