import os; os.environ.setdefault("DJANGO_SETTINGS_MODULE", "foodtrucks.settings")

import requests, json, datetime, logging, geopy
from geopy.geocoders import GoogleV3

from trucks.models import Truck

api_url = 'https://data.sfgov.org/resource/6a9r-agq8.json?$$exclude_system_fields=false&status=APPROVED'
headers = {'X-App-Token': 'mbB8LuRTwTwODNOcQNYLEKCXJ'}
geolocator = GoogleV3(api_key="AIzaSyCPlyfyEB3jUWgmlxnSeDkFvm6xPcF8Gsg")

r = requests.get(api_url, headers=headers)

if r.status_code != 200:
    logging.error("API call failed with status code: " + r.status_code)
else:
    trucks = list()
    last_modified = datetime.datetime.strptime(r.headers['Last-Modified'], "%a, %d %b %Y %H:%M:%S %Z")

    for item in r.json():
        truck = Truck()
        truck.name = item['applicant']
        truck.type = item.get('facilitytype', '')
        truck.address = item['address']
        truck.food = item['fooditems']
        try:
            truck.lat = item['latitude']
            truck.long = item['longitude']
        except KeyError:
            location = geolocator.geocode(item['address']+ " San Francisco, CA")
            truck.lat, truck.long = location.latitude, location.longitude
        trucks.append(truck)

    Truck.objects.bulk_create(trucks)