from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'main/index.html', {})

def ru_view(request):
    return HttpResponse('<h1>ru</h1> страница')

def kz_view(request):
    return HttpResponse('<h1>kz</h1> страница')

def uz_view(request):
    return HttpResponse('<h1>uz</h1> страница')

