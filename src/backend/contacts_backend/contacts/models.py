from django.db import models

# Create your models here.

class Contact(models.Model):
    prefix = models.CharField(max_length=5)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=150)
    company = models.CharField(max_length=150)
    photo_url = models.CharField(max_length=2000)
    phone_no = models.CharField(max_length=14)
    home_no = models.CharField(max_length=14)
    mobile_no = models.CharField(max_length=14)
    email = models.CharField(max_length=300)
    website_url = models.CharField(max_length=2000)
    