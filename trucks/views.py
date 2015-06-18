import math, geopy
from rest_framework import viewsets, generics
from geopy.distance import distance
from geopy.geocoders import GoogleV3

from .models import Truck
from .serializers import TruckSerializer


class TruckViewSet(viewsets.ModelViewSet):
    """DRF default viewset provides basic read/write access to Truck model."""
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer


class NearbyTrucks(generics.ListAPIView):
    """Returns list of trucks within the radius of a given location."""
    serializer_class = TruckSerializer
    model = Truck

    def get_queryset(self):

        # get center location
        if self.request.query_params.get('address', False):
            # this allows searching for a location, rather than passing in coordinates
            # unfortnately, interface hasn't been built yet
            geolocator = GoogleV3()
            loc = geolocator.geocode(self.request.query_params['address']+ " San Francisco, CA")
            center = loc.latitude, loc.longitude
        elif self.request.query_params.get('lat', False) and self.request.query_params.get('long', False):
            # get lat/long from query args
            center = float(self.request.query_params['lat']), float(self.request.query_params['lon'])
        else:
            center = (37.7577, -122.4376)  # set default center (center of SF)

        # get radius
        if self.request.query_params.get('radius', False):
            radius = float(self.request.query_params['radius'])
        else:
            radius = 1.0  # set a default radius of 1 mile

        # calculate a bounding box using radius to retrieve trucks within approx. distance
        lat_offset = geopy.units.degrees(arcminutes=geopy.units.nautical(miles=radius))
        lon_offset = geopy.units.degrees(arcminutes=geopy.units.nautical(miles=radius/math.cos(int(center[0]))))
        
        north = center[0]+lat_offset
        south = center[0]-lat_offset
        east = center[1]-lon_offset
        west = center[1]+lon_offset

        # convert queryset to list so we can add a distance field
        trucks = list(Truck.objects.filter(lat__range=(south, north)).filter(long__range=(east, west)))

        # annotate queryset with distance from center and remove trucks that are too far
        for truck in list(trucks):
            dist = distance((truck.lat, truck.long), center).miles
            if dist > radius:
                trucks.remove(truck) 
            else:
                truck.distance = dist

        return trucks