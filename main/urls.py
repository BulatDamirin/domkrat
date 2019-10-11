from django.urls import path
from .views import confidentiality_view, ru_view, kz_view, uz_view, index

app_name = 'main'

urlpatterns = [
    path('confidentiality/', confidentiality_view, name='confidentiality'),
    path('ru/', ru_view, name='ru'),
    path('kz/', kz_view, name='kz'),
    path('uz/', uz_view, name='uz'),
    path('', index, name='index'),
]