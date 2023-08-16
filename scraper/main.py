import requests
from bs4 import BeautifulSoup

url = 'https://www.goodreads.com/author/quotes/1938.Friedrich_Nietzsche'
response = requests.get(url=url)

html_body = response.text
soup = BeautifulSoup(html_body, 'html.parser')

quote_elems = soup.select(".quoteText")

for quote_elem in quote_elems:
    full_quote_text = quote_elem.get_text()
    quote = full_quote_text.split("\n")[1].strip()[1:-1]
    print(quote)
