from django.shortcuts import get_object_or_404, redirect, render
from account.models import User
from . import serializers
from .models import Post
from .forms import NewPostForm
from django.db.models import Q

# Create your views here.
def index(request) :
  if request.method == "GET":
    if request.user.is_authenticated:
      user = get_object_or_404(User, pk=request.user.id)
      following_users = user.following.all()
      # 생략
      posts = Post.objects.filter(
        Q(author__in=following_users) | Q(author=user)
      )

      serializer = serializers.PostSerializer(posts, many=True)
      print(serializer.data)

      return render(request, 'post/main.html', {"posts": serializer.data})
  return render(request, 'post/main.html')

def new_post(request) :
  if request.method == 'GET' :
    form = NewPostForm()
    return render(request, 'post/new_post.html', {'form': form})

  elif request.method == 'POST' :
    if request.user.is_authenticated :
      user = get_object_or_404(User, pk=request.user.id)
      form = NewPostForm(request.POST, request.FILES)

      if form.is_valid():
        post = form.save(commit=False)
        post.author = user
        post.save()

      else:
        print(form.errors)

      return render(request, 'post/main.html')
    
    else :
      return redirect('account:login')