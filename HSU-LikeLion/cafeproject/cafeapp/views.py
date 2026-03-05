from django.shortcuts import render


def HomeView(requests):
    return render(requests, 'cafeapp/index.html')


def DetailView(requests, pk):
    return render(requests, 'cafeapp/portfolio-details' + str(pk) + '.html')