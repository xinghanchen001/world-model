#!/bin/bash

# Script to set up web search and scraping tools
echo "Setting up web search and scraping tools..."

# Check if venv exists, create if it doesn't
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install or update requirements
echo "Installing dependencies..."
pip install -r requirements.txt

# Install playwright browsers if needed
if [ ! -d "$HOME/.cache/ms-playwright" ]; then
    echo "Installing Playwright browsers..."
    python -m playwright install
fi

echo "Setup complete! Environment is ready for web search and scraping."
echo "You can now use:"
echo "  python tools/search_engine.py \"your search query\""
echo "  python tools/web_scraper.py \"https://example.com\""
echo ""
echo "Environment will remain active for this terminal session." 