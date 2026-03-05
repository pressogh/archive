# < boardapp/urls.py >

from django.urls import path
from . import views

app_name = 'boardapp'

urlpatterns = [
    path('', views.index, name="index"), # views.py의 index함수와 연결
    path('<int:post_id>', views.PostDetailView, name="detail"),   # views.py의 PostDetailView 함수와 연결
    path('post_upload', views.PostUploadView, name="upload"),    # # views.py의 PostUploadView 함수와 연결
    path('<int:post_id>/comment_create', views.CommentUploadView, name='comment_upload'),
    path('<int:post_id>/delete', views.PostDeleteView, name="post_delete"),
    path('<int:post_id>/<int:comment_id>/delete', views.CommentDeleteView, name="comment_delete"),
    path('<int:post_id>/like', views.PostLikeView, name="post_like"),
    path('<int:post_id>/<int:comment_id>/like', views.CommentLikeView, name="comment_like"),
]