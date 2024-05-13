from django.urls import path
from . import views
from .views import ContactList
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.home, name="home"),
    path("parse-vcf/", views.parsed_vcf, name="parse-vcf"),
    path('contacts/', ContactList.as_view(), name='contact-list'),
] 
