@ECHO OFF

IF /I "%~1"=="/?" GOTO help
IF /I "%~1"=="--help" GOTO help

IF /I "%~1"=="clean" GOTO clean
IF /I "%~1"=="test" GOTO test
IF /I "%~1"=="e2e" GOTO e2e
IF /I "%~1"=="app" GOTO app
IF /I "%~1"=="coverage" GOTO coverage
IF /I "%~1"=="mutation" GOTO mutation

:help
ECHO.
ECHO Runs the application.
ECHO.
ECHO Usage:
ECHO %~0 [clean] [test] [run] [coverage] [mutation]
ECHO.
ECHO Parameter List:
ECHO     clean      Clears the node_modules directory and other generated files.
ECHO.
ECHO     test       Test the project.
ECHO.
ECHO     e2e        Run the end-to-end tests.
ECHO.
ECHO     app        Runs the application.
ECHO.
ECHO     coverage   Test the project and generate a coverage report.
ECHO.
ECHO     mutation   Run mutation testing.
ECHO.
ECHO.    /?         Displays this help message.

GOTO end

:clean
ECHO.
ECHO Removing node_modules...
IF EXIST node_modules RD node_modules /s /q
IF EXIST .nyc_output RD .nyc_output /s /q
IF EXIST .scannerwork RD .scannerwork /s /q
IF EXIST .stryker-tmp RD .stryker-tmp /s /q
IF EXIST coverage RD coverage /s /q
IF EXIST reports RD reports /s /q
IF EXIST package-lock.json DEL package-lock.json

IF /I "%~2"=="test" GOTO test
IF /I "%~2"=="e2e" GOTO e2e
IF /I "%~2"=="coverage" GOTO coverage
IF /I "%~2"=="mutation" GOTO mutation

GOTO end

:test
ECHO.
ECHO Resolving dependencies...
CALL yarn
CALL yarn audit --groups dependencies

ECHO.
ECHO Running test...
CALL yarn test

GOTO end

:e2e
ECHO.
ECHO Resolving dependencies...
CALL yarn
CALL yarn audit --groups dependencies

ECHO.
ECHO Running test...
CALL yarn run test:e2e

GOTO end

:app
ECHO.
ECHO Resolving dependencies...
CALL yarn
CALL yarn audit --groups dependencies

ECHO.
ECHO Start browsing...
START http://localhost:3000/health-check/live

ECHO.
ECHO Running the server...
CALL yarn run start:dev

GOTO end

:coverage
ECHO.
ECHO Resolving dependencies...
CALL yarn
CALL yarn audit --groups dependencies

ECHO.
ECHO Running test...
CALL yarn test:cov

ECHO.
ECHO Opening code coverage...
CALL START coverage\lcov-report\index.html

GOTO end

:mutation
ECHO.
ECHO Resolving dependencies...
CALL yarn
CALL yarn audit --groups dependencies

ECHO.
ECHO Running Mutation test...
CALL yarn test:mutation

GOTO end

:end
