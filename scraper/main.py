import requests
from bs4 import BeautifulSoup
import sys


def main():
    if len(sys.argv) < 3:
        print('Enter author code (e.g. 1938.Friedrich_Nietzsche) as first argument and number of pages as second argument')
        sys.exit()
    

    author_code = sys.argv[1]
    try: 
        num_pages = int(sys.argv[2])
    except ValueError:
        print('Invalid page number')
        sys.exit()

    author_name = author_code.split('.')[1]

    for page_num in range(num_pages):
        url = f'https://www.goodreads.com/author/quotes/{author_code}?page={page_num + 1}'
        try:
            response = requests.get(url=url)
        except Exception as err:
            print('Error getting page:', err)
            sys.exit()

        html_body = response.text
        soup = BeautifulSoup(html_body, 'html.parser')

        quote_elems = soup.select(".quoteText")

        for quote_elem in quote_elems:
            full_quote_text = quote_elem.get_text()
            quote = full_quote_text.split("\n")[1].strip()[1:-1]
            quote_data = {"content": quote, "authorName": author_name}
            try:
                requests.post("http://localhost:3000/quotes", json=quote_data)
                print(quote)
            except Exception as err:
                print('Error sending quote to server:', err)


if __name__ == '__main__':
    main()
