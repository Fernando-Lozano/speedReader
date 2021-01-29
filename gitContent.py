#! python3
# Usage: retrieves short stories from https://www.cs.cmu.edu/~spok/grimmtmp/

import requests
from bs4 import BeautifulSoup

# get request to main page
website = requests.get("https://www.cs.cmu.edu/~spok/grimmtmp/")
website.raise_for_status()

soup = BeautifulSoup(website.content, "lxml")
links = soup.select("li > a")
# iterate over all links
for i, link in enumerate(links):
    filename = str(i).rjust(3, "0")
    with open(f"./GrimmFairyTales/{filename}.txt", "wb") as f:
        print(f"Getting story {i} of {len(links)}")
        subPage = requests.get("https://www.cs.cmu.edu/~spok/grimmtmp/" + link["href"])
        subPage.raise_for_status()

        title = link.get_text() + "\n\n"
        f.write(title.encode())
        for chunk in subPage.iter_content(100000):
            f.write(chunk)
print("Done!")