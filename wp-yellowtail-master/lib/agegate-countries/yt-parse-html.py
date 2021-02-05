from bs4 import BeautifulSoup, SoupStrainer
import urllib

r = open("./lib/agegate-countries/yt-scraped-countries.html",'r').read()
soup = BeautifulSoup(r, "html.parser")

soup.prettify()

res = soup.find_all('option')

slices = []

for option in res:
    slices.append('<li data-value="{}"><a href="#">{}</a></li>'.format(option['value'].lower(), option.decode_contents(formatter="html")))

for item in slices[1:]:
	print item