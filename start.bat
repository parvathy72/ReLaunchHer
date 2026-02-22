@echo off
echo 🌸 ReLaunchHer Quick Start
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

echo ✅ Python found
echo.

REM Check if .env exists
if not exist .env (
    echo ⚠️  .env file not found
    echo Creating from .env.example...
    copy .env.example .env
    echo.
    echo ⚠️  Please edit .env file with your credentials before running the server
    echo.
    pause
    exit /b 1
)

echo ✅ .env file found
echo.

REM Check if requirements are installed
echo Checking dependencies...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo Installing dependencies...
    pip install -r requirements.txt
    echo.
)

echo ✅ Dependencies installed
echo.

REM Test environment
echo Testing environment variables...
python test_env.py
if errorlevel 1 (
    echo.
    echo ⚠️  Please fix the missing environment variables
    pause
    exit /b 1
)

echo.
echo 🚀 Starting ReLaunchHer server...
echo.
python server.py
