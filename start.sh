#!/bin/bash

echo "🌸 ReLaunchHer Quick Start"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

echo "✅ Python found"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found"
    echo "Creating from .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  Please edit .env file with your credentials before running the server"
    echo ""
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check if requirements are installed
echo "Checking dependencies..."
if ! python3 -c "import flask" &> /dev/null; then
    echo "Installing dependencies..."
    pip3 install -r requirements.txt
    echo ""
fi

echo "✅ Dependencies installed"
echo ""

# Test environment
echo "Testing environment variables..."
python3 test_env.py
if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Please fix the missing environment variables"
    exit 1
fi

echo ""
echo "🚀 Starting ReLaunchHer server..."
echo ""
python3 server.py
