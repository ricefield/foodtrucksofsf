from django.db import models

# Create your models here.
class Truck(models.Model):
    """Truck model stores basic info pulled from DataSF API"""

    name = models.CharField(max_length=200)
    type = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    food = models.TextField()
    lat = models.FloatField()
    long = models.FloatField()