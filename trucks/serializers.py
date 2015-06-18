from rest_framework.serializers import ModelSerializer, FloatField
from .models import Truck

class TruckSerializer(ModelSerializer):
    distance = FloatField(required=False)  # optional field for "nearby" API call

    class Meta:
        model = Truck
