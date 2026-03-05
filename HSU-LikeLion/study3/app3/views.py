from django.shortcuts import render


def HomeView(requests):
    return render(requests, 'app3/home.html')
