# Web Search and Scraping Tools

This directory contains tools for web searching and scraping that can be used to gather information from the internet.

## Setup

Before using these tools, you need to set up the environment:

```bash
# Navigate to the directory containing the tools
cd tools/devin.cursorrules-master

# Run the setup script
./setup_web_tools.sh
```

This script will:

1. Check if a virtual environment exists, create one if needed
2. Activate the virtual environment
3. Install all required dependencies
4. Install Playwright browsers if needed

## Available Tools

### 1. Search Engine

The `search_engine.py` script allows you to search the web using DuckDuckGo:

```bash
python tools/search_engine.py "your search query"
```

### 2. Web Scraper

The `web_scraper.py` script allows you to scrape content from web pages:

```bash
python tools/web_scraper.py --max-concurrent 3 URL1 URL2 URL3
```

### 3. Combined Tool

The `web_search_and_scrape.py` script combines both search and scrape functionality:

```bash
# Search only
python web_search_and_scrape.py --search "your search query"

# Search and automatically scrape the top N results
python web_search_and_scrape.py --search "your search query" --scrape-top 3

# Scrape specific URLs
python web_search_and_scrape.py --scrape "https://example.com" "https://another-site.com"
```

### 4. Simplified Shell Scripts

For even easier usage, shell scripts are available:

```bash
# Search with the search.sh script
./search.sh "your search query"

# Search and scrape the top result
./search.sh "your search query" -s 1

# Scrape one or more URLs with the scrape.sh script
./scrape.sh https://example.com https://another-site.com
```

## Examples

### Example 1: Search for information about Python asyncio

```bash
./search.sh "Python asyncio tutorial"
```

### Example 2: Search for information and scrape the top 2 results

```bash
./search.sh "Python data visualization libraries" -s 2
```

### Example 3: Scrape specific documentation pages

```bash
./scrape.sh https://docs.python.org/3/library/asyncio.html https://realpython.com/python-async-features/
```

## Troubleshooting

- If you encounter rate limiting with the search engine, try reducing the frequency of your searches or use the scrape functionality directly with known URLs.
- If web scraping fails for certain sites, they may be using anti-scraping techniques. Try using a different URL or adjust the scraping approach.
- For any other issues, check the error messages in the output for guidance on what went wrong.
