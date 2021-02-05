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

printf "\033[0;33m Welcome to the React Native code generator!\n"

while [  -z "$exit" ]; do

	command="nil"
	while [  $command == "nil" ]; do
		printf "\n\033[0;35m-- Commands\033[0m\n\n\033[0;33mclass\t\t- create a React module set up\ncommon\t\t- create a new common module\ntest\t\t- create a React test file\ntable\t\t- create a React TableView module\nhelper\t\t- create a JS helper file\nexit\t\t- exit the program\033[0m\n\n"
		printf "What would you like to generate? "
		read input
		case "$input" in
		        class)
		            command="class"
		            ;;

		        common)
		            command="common"
		            ;;
		         
		        test)
		            command="test"
		            ;;

		        table)
					command="table"
					;;

				helper)
					command="helper"
					;;

		        exit)
		            printf "\nWoooopppaaaa! If you're here, the code generation must have been a success!\n"
		            exit 0
		            ;;
		         
		        *)
		            printf "\n\033[1;31mERROR: Please insert one of the following commands!\033[0m\n"
		            ;;
		esac
	done

	if [ $command == "class" ]; then
		printf "\033[1;35mWhat is the class name?\033[0m "
		read jsclass

		reducer="Reducer"
		view="View"
		classReducer=$jsclass$reducer
		classView=$jsclass$view
		tempData="Data"
		classData=$jsclass$tempData

		echo -e "\033[1;32mBingo!"
		echo -e "\033[0mCreating the \033[1;31m$jsclass \033[1;32mReact Module" 

		lower=$(echo "$jsclass" | tr '[:upper:]' '[:lower:]')
		# create files and folders
		mkdir ./src/components/$lower
		if [ ! -d ./src/components/$lower ]; then
		  echo -e "\033[0mError: Failed to create ./src/components/$lower"
		else 
		  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower"
		fi

		# Generate the Container

		touch ./src/components/$lower/$jsclass.js
		if [ ! -f ./src/components/$lower/$jsclass.js ]; then
		  echo -e "\033[0mError: Failed to create ./src/components/$lower/$jsclass.js" 
		else   
		  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$jsclass.js"
		  cat ./lib/react-module/container.txt >> ./src/components/$lower/$jsclass.js
		  sed  -i -e "s/target/$classView/g" ./src/components/$lower/$jsclass.js
	      sed  -i -e "s/tableData/$classData/g" ./src/components/$lower/$jsclass.js
          sed  -i -e "s/state.stateTarget/state.$classData/g" ./src/components/$lower/$jsclass.js
		  rm ./src/components/$lower/$jsclass.js-e
		fi

		# Generate the Reducer

		touch ./src/components/$lower/$classReducer.js
		if [ ! -f ./src/components/$lower/$classReducer.js ]; then
		  echo -e "\033[0mError: Failed to create ./src/components/$lower/$classReducer.js" 
		else
		  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$classReducer.js"
		  cat ./lib/react-module/reducer.txt >> ./src/components/$lower/$classReducer.js
		  sed  -i -e "s/target/$classReducer/g" ./src/components/$lower/$classReducer.js
		  rm ./src/components/$lower/$classReducer.js-e
		fi

		# Generate the View

		touch ./src/components/$lower/$classView.js
		if [ ! -f ./src/components/$lower/$classView.js ]; then
		  echo -e "\033[0mError: Failed to create ./src/components/$lower/$classView.js" 
		else
		  echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$classView.js"
		  cat ./lib/react-module/view.txt >> ./src/components/$lower/$classView.js
		  sed  -i -e "s/target/$classView/g" ./src/components/$lower/$classView.js
		  rm ./src/components/$lower/$classView.js-e
		fi

		# Generate the Test
		printf "\033[1;35mDo you need to create a test file? (y for yes, otherwise it will not be generated)?\033[0m "
		read dummyReply
		if [ $dummyReply == "y" ]; then
			dummyName="Dummy"
			classDummy=$jsclass$dummyName
			tempTest="_test"
			classTest=$lower$tempTest
			touch ./test/$classTest.js
			if [ ! -f ./test/$classTest.js ]; then
			  echo -e "\033[0mError: Failed to create ./test/$classTest.js" 
			else
			  echo -e "\033[1;32mGenerated: \033[0m./test/$classTest.js"
			  cat ./lib/test-template/test.txt >> ./test/$classTest.js
			  sed  -i -e "s/target/$classView/g" ./test/$classTest.js
			  sed  -i -e "s/lower/$lower/g" ./test/$classTest.js
			  rm ./test/$classTest.js-e
			fi
		fi

		# Generate the dummy data

		printf "\033[1;35mDo you need dummy JSON (y for yes, otherwise it will not be generated)?\033[0m "
		read dummyReply
		if [ $dummyReply == "y" ]; then
			dummyName="Dummy"
			classDummy=$jsclass$dummyName
			touch ./src/components/$lower/$classDummy.json
			if [ ! -f ./src/components/$lower/$classDummy.json ]; then
			  echo -e "\033[0mError: Failed to create ./src/components/$lower/$classDummy.json" 
			else
				cat ./lib/react-module/dummy.txt >> ./src/components/$lower/$classDummy.json
				echo -e "\033[1;32mGenerated: \033[0m./src/components/$lower/$classDummy.json"
			fi
		fi

		# Import to reducers.js

		printf "\033[1;35mDo you need to create a state reducer and import this into reducers.js (y for yes, otherwise it will not be generated)?\033[0m "
		read dummyReply
		if [ $dummyReply == "y" ]; then
			sed -i -e '/reducer-import/ a\
			'"import { $classReducer } from './components/$lower/$classReducer';"' \
			' ./src/reducers.js
			sed -i -e '/reducer-name/ a\
			'"$classData: $classReducer,"' \
			' ./src/reducers.js
			rm ./src/reducers.js-e
		fi

		# Import the scene

		printf "\033[1;35mShould we import this file to the router.js file (y for yes, otherwise it will not be generated)?\033[0m "
		read sceneReply
		if [ $sceneReply == "y" ]; then
			sed -i -e '/scene-target/ a\
			'"import $jsclass from './components/$lower/$jsclass';"' \
			' ./src/router.js
			rm ./src/router.js-e
			sed -i -e '/sceneStyle/ a\
			'"<Scene key=\"$lower\" component={$jsclass} title=\"$jsclass\" />"' \
			' ./src/router.js
			rm ./src/router.js-e
			echo -e "\033[1;32mImported: \033[0mimport $jsclass from './components/$lower/$jsclass';"
			echo -e "Make sure you head to the router.js file to move the scene to the correct spot!"
		fi
	fi

	if [ $command == "helper" ]; then
		printf "\033[1;35mWhat is the helper class name?\033[0m "
		read helperclass
		helperlower=$(echo "$helperclass" | tr '[:upper:]' '[:lower:]')
		echo -e "\033[1;32mBingo!"
		echo -e "\033[0mCreating the \033[1;31m$helperclass \033[1;32mJS helper!"

		lower=$(echo "$helperclass" | tr '[:upper:]' '[:lower:]')

		touch ./src/helpers/$helperclass.js  
		if [ ! -f ./src/helpers/$helperclass.js  ]; then
		  echo -e "\033[0mError: Failed to create ./src/helpers/$helperclass.js" 
		else   
		  echo -e "\033[1;32mGenerated: \033[0m./src/helpers/$helperclass.js"
		  #cat ./lib/react-module/basic.txt >> ./src/components/common/$commonclass.js
		  #sed  -i -e "s/target/$commonclass/g" ./src/components/common/$commonclass.js
		  #rm ./src/components/common/$commonclass.js-e
		fi
	fi

	if [ $command == "common" ]; then
		printf "\033[1;35mWhat is the common class name?\033[0m "
		read commonclass
		commonlower=$(echo "$commonclass" | tr '[:upper:]' '[:lower:]')
		echo -e "\033[1;32mBingo!"
		echo -e "\033[0mCreating the \033[1;31m$commonclass \033[1;32mReact Module" 

		lower=$(echo "$commonclass" | tr '[:upper:]' '[:lower:]')

		# Generate the Container

		touch ./src/components/common/$commonclass.js
		if [ ! -f ./src/components/common/$commonclass.js ]; then
		  echo -e "\033[0mError: Failed to create ./src/components/common/$commonclass.js" 
		else   
		  echo -e "\033[1;32mGenerated: \033[0m./src/components/common/$commonclass.js"
		  cat ./lib/react-module/basic.txt >> ./src/components/common/$commonclass.js
		  sed  -i -e "s/target/$commonclass/g" ./src/components/common/$commonclass.js
		  rm ./src/components/common/$commonclass.js-e
		fi

		touch ./test/$commonclass.js
		if [ ! -f ./test/$commonclass.js ]; then
		  echo -e "\033[0mError: Failed to create ./test/$commonclass.js" 
		else
		  echo -e "\033[1;32mGenerated: \033[0m./test/$commonclass.js"
		  cat ./lib/test-template/test.txt >> ./test/$commonclass.js
		  sed  -i -e "s/target/$commonclass/g" ./test/$commonclass.js
		  sed  -i -e "s/lower/$commonlower/g" ./test/$commonclass.js
		  rm ./test/$commonclass.js-e
		fi
	fi

	if [ $command == "test" ]; then
		# this section needs an update
		printf "\033[1;35mWhat is the test class name?\033[0m "
		read testclass
		testlower=$(echo "$testclass" | tr '[:upper:]' '[:lower:]')
		testStr="_test"
		testFilename=$testlower$testStr
		touch ./test/$testclass.js
		if [ ! -f ./test/$testclass.js ]; then
		  echo -e "\033[0mError: Failed to create ./test/$testFilename.js" 
		else
		  echo -e "\033[1;32mGenerated: \033[0m./test/$testFilename.js"
		  cat ./lib/test-template/test.txt >> ./test/$testFilename.js
		  sed  -i -e "s/target/$testclass/g" ./test/$testFilename.js
		  sed  -i -e "s/lower/$testlower/g" ./test/$testFilename.js
		  rm ./test/$testFilename.js-e
		fi
	fi

	if [ $command == "table" ]; then
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

		tempTableTest="_test"
		tableTest=$tableLower$tempTableTest

		touch ./test/$tableTest.js
		if [ ! -f ./test/$tableTest.js ]; then
		  echo -e "\033[0mError: Failed to create ./test/$tableTest.js" 
		else
		  echo -e "\033[1;32mGenerated: \033[0m./test/$tableTest.js"
		  cat ./lib/test-template/table-test.txt >> ./test/$tableTest.js
		  sed  -i -e "s/target/$tableClassView/g" ./test/$tableTest.js
		  sed  -i -e "s/lower/$tableLower/g" ./test/$tableTest.js
		  rm ./test/$tableTest.js-e
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
	fi

done