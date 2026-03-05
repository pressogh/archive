from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser) :
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('C', "Custom")
    ]

    name = models.CharField(max_length=255, blank=True)
    user_name = models.CharField(max_length=255, blank=True)
    profile_photo = models.ImageField(blank=True)
    website = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    email = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=255, blank=True)
    followers = models.ManyToManyField("self")
    following = models.ManyToManyField("self")
