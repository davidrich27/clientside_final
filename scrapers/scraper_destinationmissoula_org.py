# import libraries
import os, sys, subprocess, time, json, traceback
from urllib.request import urlopen
from bs4 import BeautifulSoup
from datetime import datetime

# event = ["Name", "Venue", "Description", "Date", "Time", "Category/Tags", "Source"]
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

event_page = "http://destinationmissoula.org/events"
html = urlopen(event_page)
soup = BeautifulSoup(html, "html.parser")

events = []

# get all event categories
cat_dict = {}
cat_select = soup.find("select", attrs={"name": "category"})
cat_options = cat_select.find_all("option")
for i in range(len(cat_options)):
    try:
        option = cat_options[i]
        category = option.text
        value = option['value']
        if (value != ""):
            cat_dict[category] = value
    except:
        print("*** ERROR ***")
        traceback.print_exc()
        sys.exit()

# open page results for each category
for category in cat_dict.keys():
    print('Getting events for "{}" from "destinationmissoula.org"...'.format(category))
    value = cat_dict[category]
    event_page = "http://destinationmissoula.org/events?start=&end=&search=&category={}&advanced=1".format(value)
    html = urlopen(event_page)
    soup = BeautifulSoup(html, "html.parser")

    # get all events on page
    event_divs = soup.find_all("div", attrs={"class": "event-list"})

    # go through all events
    for j in range(len(event_divs)):
        try:
            event_div = event_divs[j]
            event = {}
            event["Source"] = event_page
            event["Name"] = event_div.find("h3", attrs={"itemprop": "name"}).text
            event["Description"] = ""
            event_date  = event_div.find("span", attrs={"itemprop": "startDate"}).text.split(" ")
            event_day = int(event_date[4])
            event_month = int(month[event_date[3].lower()])
            event_year = int(event_date[5])
            event_datetime = datetime(event_year, event_month, event_day)
            event["DateTime"] = event_datetime.strftime('%Y-%m-%d %H:%M:%S')
            event["Time"] = event_date[0] + event_date[1]
            event_venue = event_div.find("span", attrs={"itemprop": "location"})
            event_venue.a.decompose()
            event["Venue"] = event_venue.text
            event["Tags"] = [category]
            event_data.append(event)
        except:
            print("*** ERROR ***")
            traceback.print_exc()
            sys.exit()
    time.sleep(3)


# write json to file
json_data = json.dumps(event_data, indent=2, sort_keys=True)

filename = "data/destinationmissoula_org.json"
with open(filename, "w") as f:
    f.write(json_data)

print(json_data)
print('{} event records added to "{}".'.format(len(event_data), filename))
sys.exit()
