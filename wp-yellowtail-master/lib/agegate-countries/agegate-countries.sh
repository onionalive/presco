#!/bin/bash
if [ -f ./lib/agegate-countries/yt-scraped-countries.html ]; then
    rm ./lib/agegate-countries/yt-scraped-countries.html
fi
echo $(php ./lib/agegate-countries/yt-scrape-country-list.php) >> ./lib/agegate-countries/yt-scraped-countries.html
if [ -f ./theme-src/views/partials/agegate-countries.twig ]; then
    rm ./theme-src/views/partials/agegate-countries.twig
fi
echo $(python ./lib/agegate-countries/yt-parse-html.py) >> ./theme-src/views/partials/agegate-countries.twig
rm ./lib/agegate-countries/yt-scraped-countries.html