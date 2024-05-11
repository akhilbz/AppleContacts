from django.db import models

# Create your models here.

class Contact(models.Model):
    full_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    photo_path = models.TextField()
    phone_no = models.JSONField()
    email = models.JSONField()
    