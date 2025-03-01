#!/usr/bin/env python3
"""
Web Search and Scrape Tool

This script combines the functionality of search_engine.py and web_scraper.py
to make it easy to search for information and scrape content in one operation.

Usage:
    python web_search_and_scrape.py --search "your search query" [--scrape-top N]
    python web_search_and_scrape.py --scrape "https://example.com"

Examples:
    # Only search:
    python web_search_and_scrape.py --search "python tutorials"
    
    # Search and scrape the top 3 results:
    python web_search_and_scrape.py --search "python tutorials" --scrape-top 3
    
    # Only scrape a specific URL:
    python web_search_and_scrape.py --scrape "https://docs.python.org/3/tutorial/"
"""

import argparse
import sys
import os
import importlib.util
import asyncio
from pathlib import Path

# Import search_engine and web_scraper modules
def import_module_from_file(module_name, file_path):
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

# Get the directory of the current script
current_dir = Path(__file__).parent

# Import the modules
search_engine = import_module_from_file("search_engine", current_dir / "tools" / "search_engine.py")
web_scraper = import_module_from_file("web_scraper", current_dir / "tools" / "web_scraper.py")

async def scrape_url(url, max_concurrent=3):
    """Scrape a single URL using the web_scraper module."""
    try:
        from playwright.async_api import async_playwright
        
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            context = await browser.new_context()
            
            try:
                # Fetch the page
                print(f"Fetching {url}")
                page = await context.new_page()
                await page.goto(url)
                await page.wait_for_load_state('networkidle')
                content = await page.content()
                await page.close()
                print(f"Successfully fetched {url}")
                
                # Parse the HTML
                parsed_content = web_scraper.parse_html(content)
                return parsed_content
            finally:
                await context.close()
                await browser.close()
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return f"Failed to scrape {url}: {str(e)}"

async def main():
    parser = argparse.ArgumentParser(description="Web Search and Scrape Tool")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--search", help="Search query")
    group.add_argument("--scrape", help="URL to scrape")
    parser.add_argument("--scrape-top", type=int, help="Scrape top N search results", default=0)
    parser.add_argument("--max-results", type=int, default=10, help="Maximum search results to display")
    
    args = parser.parse_args()
    
    urls_to_scrape = []
    
    # Search process
    if args.search:
        print(f"Searching for: {args.search}")
        try:
            # Use the search_with_retry function from search_engine.py
            search_results = search_engine.search_with_retry(args.search, max_results=args.max_results)
            
            # Print search results
            for i, result in enumerate(search_results, 1):
                print(f"\n=== Result {i} ===")
                print(f"URL: {result.get('href', 'N/A')}")
                print(f"Title: {result.get('title', 'N/A')}")
                print(f"Snippet: {result.get('body', 'N/A')}")
                
                # Add top N results to scraping list if requested
                if args.scrape_top > 0 and i <= args.scrape_top and 'href' in result:
                    urls_to_scrape.append(result['href'])
        except Exception as e:
            print(f"Error during search: {str(e)}")
            if args.scrape:
                print("Continuing with scraping...")
            else:
                return
    
    # Scrape process for a single URL
    if args.scrape:
        urls_to_scrape = [args.scrape]
    
    # Scrape URLs
    if urls_to_scrape:
        print(f"\nScraping {len(urls_to_scrape)} URLs:")
        for url in urls_to_scrape:
            print(f"- {url}")
        
        for url in urls_to_scrape:
            content = await scrape_url(url)
            print(f"\n=== Content from {url} ===")
            print("=" * 80)
            print(content)
            print("=" * 80)

if __name__ == "__main__":
    asyncio.run(main()) 