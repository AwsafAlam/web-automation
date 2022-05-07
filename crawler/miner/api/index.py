import requests

baseUrl = 'http://localhost:1111'

def get(url, params = {}):
  try:
    r = requests.get(baseUrl+url, params)
    return r.json()
  except requests.exceptions.Timeout:
    # Maybe set up for a retry, or continue in a retry loop
    raise Exception('Server Timeout')
  except requests.exceptions.HTTPError as err:
    # Tell the user their URL was bad and try a different one
    print(err)
    raise Exception('Server Error',err)

def post(url, body):
  try:
      r = requests.post(baseUrl+url, json=body)
      # extracting data in json format
      return r.json()
  except requests.exceptions.Timeout:
    # Maybe set up for a retry, or continue in a retry loop
    raise Exception('Server Timeout')
  except requests.exceptions.HTTPError as err:
    # Tell the user their URL was bad and try a different one
    print(err)
    raise Exception('Server Error',err)


def put(url, body):
  try:
    r = requests.put(baseUrl+url, json=body)
    # extracting data in json format
    return r.json()
  except requests.exceptions.Timeout:
    # Maybe set up for a retry, or continue in a retry loop
    raise Exception('Server Timeout')
  except requests.exceptions.HTTPError as err:
    # Tell the user their URL was bad and try a different one
    print(err)
    raise Exception('Server Error',err)
  