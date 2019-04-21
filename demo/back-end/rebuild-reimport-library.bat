cd ..\..\library
call gradlew clean
call gradlew jar
cd ..\demo\back-end
copy ..\..\library\build\libs\rule-library-1.0-SNAPSHOT.jar src\main\resources /Y