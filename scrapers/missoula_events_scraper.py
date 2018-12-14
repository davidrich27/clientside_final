# import libraries
from urllib.request import urlopen
from bs4 import BeautifulSoup
import json

# event = ["Name", "Venue", "Description", "Date", "Time", "Category/Tags"]
event_data = []
current_year = 2018

# Month dictionary
month = {}
month["jan"] = 1
month["feb"] = 2
month["mar"] = 3
month["apr"] = 4
month["may"] = 5
month["jun"] = 6
month["jul"] = 7
month["aug"] = 8
month["sep"] = 9
month["oct"] = 10
month["nov"] = 11
month["dec"] = 12

event_page = "https://www.missoulaevents.net/"
html = urlopen(event_page)
soup = BeautifulSoup(html, "html.parser")

# Get the event <div>
event_divs = soup.find_all("div", attrs={"class": "event-row parent-container"})

for i in range(len(event_divs)):
    try:
        event_div = event_divs[i]
        event = {}
        event["Name"] = event_div.find("div", attrs={"class": "event-title"}).text
        event["Date"] = {}
        event["Date"]["Day"] =  event_div.find("div", attrs={"class": "day-val"}).text
        event_month = event_div.find("div", attrs={"class": "month-val"}).text
        event["Date"]["Month"] = month[event_month.lower()]
        event["Date"]["Year"] = current_year
        event["Date"]["DayOfWeek"] = event_div.find("div", attrs={"class": "day-of-week-val"}).text
        time_and_place = event_div.find("div", attrs={"class": "event-description-short"}).text.replace("\n","").replace("\r","").split("\xa0")
        event["Time"] = time_and_place[0] + " " + time_and_place[1].split()[0]
        if len(time_and_place) > 2:
            event["Venue"] = time_and_place[2].strip()
        else:
            place = event_div.find("div", attrs={"class": "venue-container"})
            if place != None:
                event["Venue"] = place.a.text
        event["Tags"] = set(event_div.find("div", attrs={"class": "event-category"}).text.replace("\r","").replace("\n","").replace(" ","").replace("::",",").split(","))
        event["Tags"] = list(event["Tags"])
        event_data.append(event)
    except:
        print("ERROR: Unknown error occurred.")

json_data = json.dumps(event_data, indent=2, sort_keys=True)

filename = "./missoula_events_data.json"
with open(filename, "w") as f:
    f.write(json_data)

print(json_data)
print('{} event records added to "{}".'.format(len(event_data), filename))
