from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.core.mail import send_mail
from .models import UserData
from django.contrib.gis.geoip2 import GeoIP2
import json, re

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def index(request):
    ip = get_client_ip(request)
    localhost = ip.find('localhost') >= 0 or ip.find('127.0.0.1') >= 0 or False

    if request.method == 'POST':
        data = json.loads(request.body)
        
        name = data['name'] or '------'
        phone = data['phone']
        info = data['info']

        validate_phone = bool(re.search(r'^\+\d{1,3} \(\d{3}\) \d{3}-\d\d-\d\d$', phone)) or False
        validate_name = type(name) == str and len(name) <= 25

        if validate_phone and validate_name:
            try:
                city = GeoIP2().city(ip)['city'] or ''
            except:
                city = ''

            try:
                new_user = UserData(name=name.strip().title(), number=phone, city=city)
                new_user.save()
            except:
                pass
                
            # send_mail(
            #     'hi',
            #     'body body body',
            #     'bulat.gab2000@gmail.com',
            #     ['pira@click-mail.top'],
            # )

            response = {
                'error': False,
                'name': name,
                'phone': phone,
                'info': info,
            }
        else:
            response = {
                'validate_phone': validate_phone,
                'validate_name': validate_name,
                'error': True,
            }

        return HttpResponse(json.dumps(response))
    
    else:
        return HttpResponseRedirect(reverse('main:index', kwargs={}))

