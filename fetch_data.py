import os, requests, json, datetime, logging
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "foodtrucks.settings")

from trucks.models import Truck

api_url = 'https://data.sfgov.org/resource/6a9r-agq8.json?$$exclude_system_fields=false&status=APPROVED'
headers = {'X-App-Token': 'mbB8LuRTwTwODNOcQNYLEKCXJ'}

geocoding_api = "https://maps.googleapis.com/maps/api/geocode/json"
geocoding_key = 'AIzaSyCPlyfyEB3jUWgmlxnSeDkFvm6xPcF8Gsg'

def get_latlong(addr):
    addr += " San Francisco, CA"
    address = "+".join(addr.split())
    r = requests.get(geocoding_api+"?key="+geocoding_key+"&address="+address)
    return r.json()['results'][0]['geometry']['location'].values()

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
            truck.lat, truck.long = get_latlong(item['address'])
        trucks.append(truck)

    Truck.objects.bulk_create(trucks)