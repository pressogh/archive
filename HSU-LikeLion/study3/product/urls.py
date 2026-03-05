from django.urls import path

from . import views

urlpatterns = [
    path('1', views.ProductView1, name="product1"),
    path('2', views.ProductView2, name="product2")
]