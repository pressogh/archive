from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import SignupForm
from django.contrib.auth import authenticate, login

# Create your views here.
def signup(request) :
  if request.method == 'GET' :
    form = SignupForm()

  elif request.method == 'POST' :
    form = SignupForm(request.POST)
    if form.is_valid() :
      form.save()
      username = form.cleaned_data.get('username')
      password = form.cleaned_data.get('password1')
      user = authenticate(username=username, password=password)
      login(request, user) 

      return redirect('post:index')
  
  return render(request, 'account/signup.html', {'form':form})
