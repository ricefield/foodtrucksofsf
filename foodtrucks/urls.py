from django.conf.urls import include, url
from django.contrib import admin

from rest_framework import routers

from trucks.views import TruckViewSet

urlpatterns = [
    url(r'^$', 'foodtrucks.views.index', name='index'),
    url(r'^admin/', include(admin.site.urls)),
]

router = routers.DefaultRouter()
router.register(r'trucks', TruckViewSet)

urlpatterns.append(url(r'^api/', include(router.urls)),)