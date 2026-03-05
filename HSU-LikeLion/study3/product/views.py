from django.shortcuts import render

# Create your views here.


def ProductView1(requests):
    return render(requests, 'product/1.html')


def ProductView2(requests):
    return render(requests, 'product/2.html')