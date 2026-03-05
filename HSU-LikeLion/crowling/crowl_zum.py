from bs4 import BeautifulSoup
import requests
from datetime import datetime

url = "https://m.zum.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
rank = 1

# results = soup.select('div[class="wrap-list"] > ol > li > a')
results = soup.select('#app > div > main > div.issue-keyword > div.keyword-list > div.wrap-list > ol > li > a')

print(datetime.today().strftime("%Y년 %m월 %d일의 실시간 검색어 순위입니다.\n"))

for result in results:
    if rank >= 10:
        print(rank,"위 : ",result.get_text()[2:])
    else:
        print(rank,"위 : ",result.get_text()[1:])

    rank += 1