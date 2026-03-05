from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView, name="home"),
    path('detail/<int:pk>', views.DetailView, name="detail"),

]
