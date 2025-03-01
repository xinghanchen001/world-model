#!/bin/bash

# search.sh - Simple script to run web search
# Usage: ./search.sh "your search query"

if [ $# -eq 0 ]; then
  echo "Usage: ./search.sh \"your search query\""
  echo "Options:"
  echo "  -s, --scrape-top N    Scrape the top N results (default: 0)"
  exit 1
fi

# Default values
SCRAPE_TOP=0

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -s|--scrape-top)
      SCRAPE_TOP="$2"
      shift 2
      ;;
    *)
      QUERY="$1"
      shift
      ;;
  esac
done

if [ -z "$QUERY" ]; then
  echo "Error: No search query provided"
  exit 1
fi

# Run the search script
if [ "$SCRAPE_TOP" -gt 0 ]; then
  python web_search_and_scrape.py --search "$QUERY" --scrape-top "$SCRAPE_TOP"
else
  python web_search_and_scrape.py --search "$QUERY"
fi 