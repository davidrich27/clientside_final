import mysql.connector
import json
import os, sys
import subprocess
from datetime import datetime
import MySQLdb
import stacktrace

''' Establishes connection to DB based on config file. '''
def connect_to_db():
    # connect to database
    dirname = os.path.dirname(os.path.abspath(__file__))
    filename = os.path.join(dirname, '../config/database_config.json')
    db_type = 'development'

    # get mysql db configs
    with open(filename) as f:
        db_config = json.load(f)
        db_config = db_config[db_type]

    # connect to db
    db_conn = mysql.connector.connect(
      host = db_config["host"],
      user = db_config["username"],
      passwd = db_config["password"],
      database = db_config["database"],
      auth_plugin='mysql_native_password'
    )
    mycursor = db_conn.cursor()
    return db_conn, mycursor

''' Adds a single Event and related data to Table '''
def add_event_to_db(mycursor, event):

    try:

        # First, check if event/date combo exists in table
        sql_query = 'SELECT * FROM Events WHERE Name = "{}" AND Date = "{}"'.format(event["Name"], event["DateTime"])
        mycursor.execute(sql_query)
        myresults = mycursor.fetchall()

        now = datetime.now()
        now = now.strftime('%Y-%m-%d %H:%M:%S')

        if len(myresults) != 0:
            eventId = myresults[0][0]
        else:
            # Next, check if venue in table
            sql_query = 'SELECT * FROM Venues WHERE name = "{}"'.format(event["Venue"])
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            # if so, get ID from table, else insert new venue and get ID
            if len(myresults) == 0:
                fields = '{}, {}, {}'.format("name", "createdAt", "updatedAt")
                values = '"{}", "{}", "{}"'.format(event["Venue"], now, now)
                sql_query = 'INSERT INTO Venues ({}) VALUES ({})'.format(fields, values)
                print(sql_query)
                mycursor.execute(sql_query)
            sql_query = 'SELECT * FROM Venues WHERE name = "{}"'.format(event["Venue"])
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            venueId = myresults[0][0]

            # insert event into table
            fields = '{}, {}, {}, {}, {}, {}, {}'.format("name", "description", "VenueId", "date", "time", "createdAt", "updatedAt")
            values = '"{}", "{}", {}, "{}", "{}", "{}", "{}"'.format(event["Name"], event["Description"], venueId, event["DateTime"], event["Time"], now, now)
            sql_query = 'INSERT INTO Events ({}) VALUES ({})'.format(fields, values)
            mycursor.execute(sql_query)
            sql_query = "SELECT LAST_INSERT_ID()"
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            eventId = myresults[0][0]

        # insert event-tags into linking table
        for k in range(len(event["Tags"])):
            tag = event["Tags"][k]

            # Check if tag is in tag table
            sql_query = 'SELECT * FROM Tags WHERE name = "{}"'.format(tag)
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            # if not, insert new tag
            if len(myresults) == 0:
                fields = '{}, {}, {}'.format("name", "createdAt", "updatedAt")
                values = '"{}", "{}", "{}"'.format(tag, now, now)
                sql_query = 'INSERT INTO Venues ({}) VALUES ({})'.format(fields, values)
                mycursor.execute(sql_query)
            # retrieve ID from table
            sql_query = 'SELECT * FROM Venues WHERE name = "{}"'.format(tag)
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            tagId = myresults[0][0]
            print('tagId:',tagId,'eventId:',eventId)

            # Add to linking table
            sql_query = 'SELECT * FROM Event_Tag WHERE tagId = {} AND eventId = {}'.format(tagId, eventId)
            mycursor.execute(sql_query)
            myresults = mycursor.fetchall()
            if myresults == 0:
                fields = '{}, {}, {}, {}'.format("eventId", "tagId", "createdAt", "updatedAt")
                values = '{}, {}, "{}", "{}"'.format(eventId, tagId, now, now)
                sql_query = 'INSERT INTO Event_Tag ({}) VALUES ({})'.format(fields, values)
                mycursor.execute(sql_query)
    except:
        print("***ERROR***")

    return

''' Run all scraping scripts '''
def run_all_scrapers():

    # get all scraper scripts
    dirname = os.path.dirname(os.path.abspath(__file__))
    scrapers = os.listdir(dirname)
    scrapers = list(filter(lambda x: (x.endswith('.py') and x.startswith('scraper_')), scrapers))

    # execute scripts
    for i in range(len(scrapers)):
        scraper = scapers[i]
        cmd = "python {}"
        pipe = subprocess.Popen(cmd, stdout=PIPE)

    return

#################################################################################################################################
################################################      MAIN SCRIPT     ###########################################################
#################################################################################################################################

db_conn, mycursor = connect_to_db()
# run_all_scrapers()

# add all scraper json to database
data_folder = 'data/'
dirname = os.path.dirname(os.path.abspath(__file__))
json_files = os.listdir(os.path.join(dirname, data_folder))
print(json_files)

for filename in json_files:
    with open(data_folder + filename) as f:
        events = json.load(f)
        for event in events:
            add_event_to_db(mycursor, event)
