from rest_framework import serializers
from account.models import User
from . import models

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = (
            "id",
            "contents",
            "author"
        )


class FeedAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "profile_photo",
        )


class PostSerializer(serializers.ModelSerializer):
    comment_post = CommentSerializer(many=True)
    author = FeedAuthorSerializer()

    class Meta:
        model = models.Post
        fields = (
            "id",
            "image",
            "caption",
            "comment_post",
            "author",
        )