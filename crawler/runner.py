from api.index import get, put, post
from formAutomation import getSearchData, getProfileData
# import json 
import time

# Container startup time
time.sleep(5)

sleepTimer=1
while True:
    time.sleep(sleepTimer)
    # get the data and call the crawler
    request = get('/requests/uncrawled')
    print(request)
    if (request is None) or ("id" not in request):
        # increase the sleep timer
        sleepTimer += 1
        if sleepTimer > 20:
            sleepTimer = 1
        print("No valid request. Going to sleep for:",sleepTimer)
        continue
    
    try:
        # put({"_id": entry["_id"]}, {"$set": {"try_count": entry['try_count']+1}})
        update = put('/requests/'+ str(request['id']), {"tryCount": request['tryCount']+1})
        # print(update)
        # print(request['city'], request['name'])
        resultData = []
        # Check the url and send to that specific crawler
        if request['url'].split('=')[0] == 'https://www.floridahealthfinder.gov/facilitylocator/FacilityProfilePage.aspx?id':
            resultData = getProfileData(request['url'])
            if resultData == 'Error':
                sleepTimer=5
                if request['tryCount'] > 9:
                    # No need to retry
                    update = put('/requests/'+ str(request['id']), {"crawled": True})
                continue

            # write data to db
            listing = put('/listings/'+resultData['govSiteId'], resultData)
            print(listing)
        else:
            resultData = getSearchData(request['city'], request['name'], request['type'])
            if resultData == 'Error':
                sleepTimer=5
                if request['tryCount'] > 9:
                    # No need to retry
                    update = put('/requests/'+ str(request['id']), {"crawled": True})
                continue

            # write data to db
            listing = post('/listings/multiple', resultData)
            print(listing)
        
        update = put('/requests/'+ str(request['id']), {"crawled": True})

        sleepTimer=1
        continue
    except Exception as err:
        sleepTimer=1
        print('Error in crawler')
        print(err)
        continue
