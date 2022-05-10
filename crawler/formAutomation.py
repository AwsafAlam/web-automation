from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

colMap = {
  1: 'name',
  2: 'type',
  3: 'address',
  4: 'city',
  5: 'state',
  6: 'zipCode',
  7: 'phone',
  8: 'capacity'
}

def getWebData(city,name,type = 'ALL'):
  try:
    print("Parsing web data")
    time.sleep(1)
    options = webdriver.ChromeOptions()
    prefs = {"download.default_directory" : "/Users/awsaf/Documents/boomershub_test_awsaf/backend-services/crawler/web-parser/downloads"}
    options.add_experimental_option("prefs",prefs)

    # driver = webdriver.Chrome('./chromedriver',chrome_options=options)
    # time.sleep(10)
    driver = webdriver.Remote('http://selenium:4444/wd/hub', desired_capabilities=DesiredCapabilities.CHROME)
      
    driver.implicitly_wait(1)
    driver.get("https://www.floridahealthfinder.gov/facilitylocator/FacilitySearch.aspx")
    print(driver.title)

    # select type
    selectType = Select(driver.find_element(By.ID,'ctl00_mainContentPlaceHolder_FacilityType'))
    selectType.select_by_value(type)
    
    # search Name
    if name is not None:
      inputName = driver.find_element(By.ID,'ctl00_mainContentPlaceHolder_FacilityName')
      inputName.send_keys(name)
    
    # select city
    if city is not None:
      inputCity = driver.find_element(By.ID,'ctl00_mainContentPlaceHolder_City')
      inputCity.send_keys(city)
    
    searchBtn = driver.find_element(By.ID,'ctl00_mainContentPlaceHolder_SearchButton')
    driver.implicitly_wait(1)

    driver.execute_script("arguments[0].scrollIntoView();", searchBtn)
    driver.execute_script("arguments[0].click();", searchBtn)
    
    print("Page title is: ")
    print(driver.title)
    print(driver.current_url)

    # exportBtn = driver.find_element(By.ID,'ctl00_mainContentPlaceHolder_btnExport1')
    # driver.execute_script("arguments[0].scrollIntoView();", exportBtn)
    # driver.execute_script("arguments[0].click();", exportBtn)
    # time.sleep(5)

    # search_bar.clear()
    # search_bar.send_keys(name)
    # search_bar.send_keys(Keys.RETURN)
    
    before_XPath = "//*[@id='ctl00_mainContentPlaceHolder_dgFacilities']/tbody/tr["
    aftertd_XPath = "]/td["
    aftertr_XPath = "]"
    
    
    rows = len (driver.find_elements(By.XPATH, "//*[@id='ctl00_mainContentPlaceHolder_dgFacilities']/tbody/tr"))
    print("Rows in table are " + repr(rows))
    cols = len (driver.find_elements(By.XPATH,"//*[@id='ctl00_mainContentPlaceHolder_dgFacilities']/tbody/tr[2]/td"))
    print("Columns in table are " + repr(cols))
    facilities = []

    for t_row in range(2, (rows + 1)):
      facility = {}
      for t_column in range(1, (cols + 1)):
        FinalXPath = before_XPath + str(t_row) + aftertd_XPath + str(t_column) + aftertr_XPath
        cell_text = driver.find_element(By.XPATH, FinalXPath).text
        if t_column == 1:
          element = driver.find_element(By.XPATH, FinalXPath)
          linkPath = 'ctl00_mainContentPlaceHolder_dgFacilities_ctl'+ str(t_row).zfill(2) +'_lbInpatientFacilityProfile'
          # print(linkPath)
          link = element.find_element(By.ID, linkPath).get_attribute("href")
          facility['url'] = link
          facility['govSiteId'] = link.split('=')[1]
          directionsPath = 'ctl00_mainContentPlaceHolder_dgFacilities_ctl'+ str(t_row).zfill(2) +'_lnkDirections'
          directions = element.find_element(By.ID, directionsPath).get_attribute("href")
          # print(directions)
          facility['directionUrl'] = directions

        facility[colMap[t_column]] = cell_text
        print(cell_text)
      facilities.append(facility)
      print()   


    # resultDict = {
    #     "Type": type,
    #     "City": city,
    #     "Facilities": facilities,
    #     "Total Facilities": rows
    #     # "page": driver.page_source
    # }
    
    driver.quit()
    return facilities
  except Exception as err:
    print('Error fetching web data')
    print(err)
    driver.quit()
    # raise Exception('Error fetching web data',err)
    return 'Error'

# result = getWebData('ALL','NEW ORLEANS','test')
# print('=======================================================')
# print(result)

# California
# https://www.ccld.dss.ca.gov/carefacilitysearch/Search/ElderlyAssistedLiving