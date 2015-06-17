import json
from django.test import TestCase, Client
from geopy.distance import distance

from .models import Truck


class Tests(TestCase):

    def setUp(self):
        evas = Truck.objects.create(name="Eva's Catering", type="Truck", address="1650 20TH AVE", food="Cold Truck, Burrito, Corn Dog, Salads, Sandwiches, Quesadilla, Tacos, Fried Rice, Cow Mein, Chinese Rice, Noodle Plates, Soup, Bacon, Eggs, Ham, Avacado, Sausages, Beverages", lat=37.757984190528637, long=-122.433465780407)
        lindas = Truck.objects.create(name="Linda's Catering", type="Truck", address="1219 07TH AVE", food="Hot Dogs, Hamburgers, Nachos, Steaks, Pastas, Asian Dishes, Tri-Tip Sandwiches, Sodas & Water", lat=37.765496987619237, long=-122.464597619571)

    def test_truck_fields(self):
        allowed_error = 0.0000001
        evas = Truck.objects.get(name="Eva's Catering")
        self.assertEqual(evas.name, "Eva's Catering")
        self.assertEqual(evas.address, "1650 20TH AVE")
        self.assertTrue(abs(evas.lat - 37.757984190528637) <= allowed_error)
        self.assertTrue(abs(evas.long - (-122.433465780407)) <= allowed_error)

    def test_distance(self):
        center = (37.7577, -122.4376)
        evas = Truck.objects.get(name="Eva's Catering")
        lindas = Truck.objects.get(name="Linda's Catering")
        self.assertTrue(distance(center, (evas.lat, evas.long)).miles < 0.25)
        self.assertTrue(distance(center, (lindas.lat, lindas.long)).miles > 1.0)

    def test_index(self):
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('<div id="app">' in response.content)

    def test_api_root(self):
        client = Client()
        response = client.get('/api/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue("trucks" in json.loads(response.content))

    def test_api_trucks(self):
        client = Client()
        response = client.get('/api/trucks/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue("Eva's Catering" in response.content)
        self.assertTrue("1219 07TH AVE" in response.content)

    def test_api_nearby(self):
        client = Client()
        response = client.get('/api/nearby?lat=37.7577&lon=-122.4376&radius=0.25')
        self.assertEqual(len(json.loads(response.content)), 1)
        self.assertTrue("Eva's Catering" in response.content)
        response = client.get('/api/nearby?lat=37.7577&lon=-122.4376&radius=2')
        self.assertEqual(len(json.loads(response.content)), 2)
        self.assertTrue("Eva's Catering" in response.content)
        self.assertTrue("Linda's Catering" in response.content)
