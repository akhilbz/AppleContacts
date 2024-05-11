from django.urls import path
from . import views
from .views import ContactList

urlpatterns = [
    path("", views.home, name="home"),
    path("parsed-vcf/", views.parsed_vcf, name="parsed-vcf"),
    path('contacts/', ContactList.as_view(), name='contact-list'),
]