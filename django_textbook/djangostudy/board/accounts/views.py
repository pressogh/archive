# < accounts/views.py >

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import RegisterForm


def RegisterView(request):
    if request.method == "GET":
        form = RegisterForm()

    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')

            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('boardapp:index')

    return render(request, 'accounts/register.html', {'form': form})