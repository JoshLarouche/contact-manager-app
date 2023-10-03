from rest_framework import routers
from contact.viewsets import ContactViewSet

router = routers.SimpleRouter()
router.register(r"contact", ContactViewSet, basename="contact")
