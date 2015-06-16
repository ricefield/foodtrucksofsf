from rest_framework.serializers import ModelSerializer, FloatField
from .models import Truck

class TruckSerializer(ModelSerializer):
    distance = FloatField(required=False)

    class Meta:
        model = Truck
