from django.urls import path, include
from .views import *

urlpatterns = [
    path('class', ClassAPI.as_view()),
]
