from django.db import models

class User(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    phone = models.CharField("Phone", max_length=40)
    website = models.CharField("Website", max_length=80)
    company = models.CharField("Company", max_length=80)

    def __str__(self):
        return self.name