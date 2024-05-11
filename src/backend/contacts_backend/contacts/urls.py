from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("parsed-vcf/", views.parsed_vcf, name="parsed-vcf")
]