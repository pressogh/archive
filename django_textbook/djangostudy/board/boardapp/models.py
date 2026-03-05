# < boardapp/models.py >

from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author_post")
    title = models.CharField(max_length=100)
    content = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)

    likes_user = models.ManyToManyField(User, related_name="likes_user")

    def __str__(self):
        return self.title


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author_comment")
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    create_time = models.DateTimeField(auto_now_add=True)
    
    likes_user = models.ManyToManyField(User, related_name="comment_likes_user")