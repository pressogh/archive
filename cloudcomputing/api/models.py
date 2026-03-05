from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=100)
    desc = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    thumbnail = models.ImageField(blank=True)
    link = models.URLField(blank=True)
    color = models.CharField(max_length=7, blank=True)

    def __str__(self):
        return self.title
