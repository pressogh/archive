from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'account'

urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new_post, name='new_post')
]