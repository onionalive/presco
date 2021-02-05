#!/bin/bash

# ad \x for symbols
# tick symbol echo -e "e29c93"
# cross e29d8c

# # Reset

# Color_Off='\033[0m'       # Text Reset

# # Regular Colors

# Black='\033[0;30m'        # Black
# Red='\033[0;31m'          # Red
# Green='\033[0;32m'        # Green
# Yellow='\033[0;33m'       # Yellow
# Blue='\033[0;34m'         # Blue
# Purple='\033[0;35m'       # Purple
# Cyan='\033[0;36m'         # Cyan
# White='\033[0;37m'        # White

printf "\033[1;35mWhat is the class name?\033[0m "
read tableclass

tableReducer="TableReducer"
tableView="TableView"
tableCell="Cell"
tableData="Data"
tableClassReducer=$tableclass$tableReducer
tableClassView=$tableclass$tableView
tableClassCell=$tableclass$tableCell
tableClassDataUpper=$tableclass$tableData
tableDummyName="TableDummy"
tableClassDummy=$tableclass$tableDummyName
echo -e "\033[1;32mBingo!"
echo -e "\033[0mCreating the \033[1;31m$tableclass \033[1;32mReact Module" 

tableLower=$(echo "$tableclass" | tr '[:upper:]' '[:lower:]')
tableClassData=$tableLower$tableData

# create files and folders
mkdir ./src/components/$tableLower
if [ ! -d ./src/components/$tableLower ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$tableLower"
else 
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$tableLower"
fi

# Generate the Container

touch ./src/components/$tableLower/$tableclass.js
if [ ! -f ./src/components/$tableLower/$tableclass.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$tableLower/$tableclass.js" 
else   
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$tableLower/$tableclass.js"
  cat ./lib/react-table/container.txt >> ./src/components/$tableLower/$tableclass.js
  sed  -i -e "s/target/$tableClassView/g" ./src/components/$tableLower/$tableclass.js
  sed  -i -e "s/tableData/$tableClassData/g" ./src/components/$tableLower/$tableclass.js
  sed  -i -e "s/state.tableTarget/state.$tableClassData/g" ./src/components/$tableLower/$tableclass.js
  rm ./src/components/$tableLower/$tableclass.js-e
fi

# Generate the Reducer

touch ./src/components/$tableLower/$tableClassReducer.js
if [ ! -f ./src/components/$tableLower/$tableClassReducer.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$tableLower/$tableClassReducer.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$tableLower/$tableClassReducer.js"
  cat ./lib/react-table/reducer.txt >> ./src/components/$tableLower/$tableClassReducer.js
  sed  -i -e "s/target/$tableClassReducer/g" ./src/components/$tableLower/$tableClassReducer.js
  sed  -i -e "s/TableData/$tableClassDataUpper/g" ./src/components/$tableLower/$tableClassReducer.js
  sed  -i -e "s/Stub/$tableClassDummy/g" ./src/components/$tableLower/$tableClassReducer.js
  sed  -i -e "s/TableReducer/$tableClassReducer/g" ./src/components/$tableLower/$tableClassReducer.js
  rm ./src/components/$tableLower/$tableClassReducer.js-e
fi

# Generate the View

touch ./src/components/$tableLower/$tableClassView.js
if [ ! -f ./src/components/$tableLower/$tableClassView.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$tableLower/$tableClassView.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./src/components/$tableLower/$tableClassView.js"
  cat ./lib/react-table/view.txt >> ./src/components/$tableLower/$tableClassView.js
  sed  -i -e "s/target/$tableClassView/g" ./src/components/$tableLower/$tableClassView.js
  sed  -i -e "s/tableData/$tableClassData/g" ./src/components/$tableLower/$tableClassView.js
  sed  -i -e "s/state.tableTarget/state.$tableClassData/g" ./src/components/$tableLower/$tableClassView.js
  sed  -i -e "s/cellTarget/$tableClassCell/g" ./src/components/$tableLower/$tableClassView.js
  sed  -i -e "s/ListItem/$tableClassCell/g" ./src/components/$tableLower/$tableClassView.js
  rm ./src/components/$tableLower/$tableClassView.js-e
fi

# Generate the Cell

touch ./src/components/cell/$tableClassCell.js
if [ ! -f ./src/components/cell/$tableClassCell.js ]; then
  echo -e "\033[0mError: Failed to create ./src/components/cell/$tableClassCell.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./src/components/cell/$tableClassCell.js"
  cat ./lib/react-table/cell.txt >> ./src/components/cell/$tableClassCell.js
  sed  -i -e "s/target/$tableClassCell/g" ./src/components/cell/$tableClassCell.js
  sed  -i -e "s/tableTarget/$tableClassData/g" ./src/components/cell/$tableClassCell.js
  sed  -i -e "s/classTable/$tableLower/g" ./src/components/cell/$tableClassCell.js
  sed  -i -e "s/TableReducer/$tableClassReducer/g" ./src/components/cell/$tableClassCell.js
  rm ./src/components/cell/$tableClassCell.js-e
fi

# Generate the Test

touch ./test/$tableClassView.js
if [ ! -f ./test/$tableClassView.js ]; then
  echo -e "\033[0mError: Failed to create ./test/$tableClassView.js" 
else
  echo -e "\033[1;32mGenerated: \033[0m./test/$tableClassView.js"
  cat ./lib/test-template/table-test.txt >> ./test/$tableClassView.js
  sed  -i -e "s/target/$tableClassView/g" ./test/$tableClassView.js
  sed  -i -e "s/lower/$tableLower/g" ./test/$tableClassView.js
  rm ./test/$tableClassView.js-e
fi

# Generate the dummy tableData

touch ./src/components/$tableLower/$tableClassDummy.json
if [ ! -f ./src/components/$tableLower/$tableClassDummy.json ]; then
  echo -e "\033[0mError: Failed to create ./src/components/$tableLower/$tableClassDummy.json" 
else
	cat ./lib/react-table/dummy.txt >> ./src/components/$tableLower/$tableClassDummy.json
	echo -e "\033[1;32mGenerated: \033[0m./src/components/$tableLower/$tableClassDummy.json"
fi

# Import to reducers.js

sed -i -e '/reducer-import/ a\
'"import { $tableClassReducer } from './components/$tableLower/$tableClassReducer';"' \
' ./src/reducers.js
sed -i -e '/reducer-name/ a\
'"$tableClassData: $tableClassReducer,"' \
' ./src/reducers.js
rm ./src/reducers.js-e

# Import the scene

printf "\033[1;35mShould we import this file to the router.js file (y for yes, otherwise it will not be generated)?\033[0m "
read sceneReply
if [ $sceneReply == "y" ]; then
	sed -i -e '/scene-target/ a\
	'"import $tableclass from './components/$tableLower/$tableclass';"' \
	' ./src/router.js
	rm ./src/router.js-e
	sed -i -e '/sceneStyle/ a\
	'"<Scene key=\"$tableLower\" component={$tableclass} title=\"Test\" />"' \
	' ./src/router.js
	rm ./src/router.js-e
	echo -e "\033[1;32mImported: \033[0mimport $tableclass from './components/$tableLower/$tableclass';"
	echo -e "Make sure you head to the router.js file to move the scene to the correct spot!"
fi