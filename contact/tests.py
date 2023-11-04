from django.test import TestCase
from contact.models import Contact
from contact.viewsets import ContactViewSet
from django.utils import timezone

from rest_framework.test import APIRequestFactory


class ContactTest(TestCase):
    # models test

    def create_contact(self, title="only a test", body="yes, this is only a test"):
        return Contact.objects.create(name="test", email="test@test.com", phone="test", website="test", company="test")

    def test_contact_creation(self):
        w = self.create_contact()
        self.assertTrue(isinstance(w, Contact))
        self.assertEqual("test", w.name)

    def test_first_name_label(self):
        contact = self.create_contact()
        field_label = contact._meta.get_field("name").verbose_name
        self.assertEqual(field_label, "Name")

    def test_first_name_max_length(self):
        contact = self.create_contact()
        max_length = contact._meta.get_field("name").max_length
        self.assertEqual(max_length, 240)

    # views

    def test_view_set(self):
        request = APIRequestFactory().get("")
        contact_detail = ContactViewSet.as_view({"get": "retrieve"})
        contact = Contact.objects.create(name="bob")
        response = contact_detail(request, pk=contact.pk)
        self.assertEqual(response.status_code, 200)
