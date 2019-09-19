from django.contrib import admin
from django.contrib import admin
from .models import UserData

class UserAdmin(admin.ModelAdmin):
    date_hierarchy = 'date_time'
    ordering = ['-date_time']
    list_display = ('name', 'city', 'number', 'date_time', 'email')
    list_filter = ('name', 'number', 'date_time')

admin.site.register(UserData, UserAdmin)
