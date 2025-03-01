#!/bin/bash

# scrape.sh - Simple script to run web scraping
# Usage: ./scrape.sh "https://example.com"

if [ $# -eq 0 ]; then
  echo "Usage: ./scrape.sh URL [URL2 URL3 ...]"
  echo "Example: ./scrape.sh https://example.com"
  exit 1
fi

# Collect all URLs
URLS=()
for url in "$@"; do
  URLS+=("$url")
done

# Run the scrape script
python web_search_and_scrape.py --scrape "${URLS[@]}" 