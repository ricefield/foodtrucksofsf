import math, geopy
from rest_framework import viewsets, generics
from geopy.distance import distance
from geopy.geocoders import GoogleV3

from .models import Truck
from .serializers import TruckSerializer


class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class NearbyTrucks(generics.ListAPIView):
    serializer_class = TruckSerializer
    model = Truck

    def get_queryset(self):
        if self.request.query_params.get('address', False):
            geolocator = GoogleV3()
            loc = geolocator.geocode(self.request.query_params['address']+ " San Francisco, CA")
            center = loc.latitude, loc.longitude
        elif self.request.query_params.get('lat', False):
            center = float(self.request.query_params['lat']), float(self.request.query_params['lon'])

        if self.request.query_params.get('radius', False):
            radius = float(self.request.query_params['radius'])
        else:
            radius = 1.0

        lat_offset = geopy.units.degrees(arcminutes=geopy.units.nautical(miles=radius))
        lon_offset = geopy.units.degrees(arcminutes=geopy.units.nautical(miles=radius/math.cos(int(center[0]))))
        
        north = center[0]+lat_offset
        south = center[0]-lat_offset
        east = center[1]-lon_offset
        west = center[1]+lon_offset

        trucks = list(Truck.objects.filter(lat__range=(south, north)).filter(long__range=(east, west)))

        for truck in list(trucks):
            dist = distance((truck.lat, truck.long), center).miles
            if dist > radius:
                trucks.remove(truck)
            else:
                truck.distance = dist

        return trucks