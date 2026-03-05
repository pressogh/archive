from django.shortcuts import render

from api.models import Post


def PostListView(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        return render(request, 'main.html', {"posts": posts})


def PostDetailView(request, pk):
    if request.method == 'GET':
        return render(request, 'post_detail.html')
