from django.db import models
from django.core.validators import RegexValidator
from datetime import datetime

class UserData(models.Model):
    phone_regex = RegexValidator(regex=r'^\+\d{1,3} \(\d{3}\) \d{3}-\d\d-\d\d$', message='Номер телефона должен быть в формате +7 (999) 999-99-99, +77 (999) 999-99-99 или +777 (999) 999-99-99')
    number = models.CharField(validators=[phone_regex], max_length=19, verbose_name='Номер телефона', unique=True)
    name = models.CharField(verbose_name='Имя пользователя', max_length=25, default='------')
    email = models.EmailField(verbose_name='Email', blank=True)
    date_time = models.DateTimeField(verbose_name='Дата сохранения пользователя', auto_now_add=True)
    city = models.CharField(verbose_name='Город', max_length=50, blank=True)

    def __str__(self):
        return '{0} {1}'.format(self.name, self.number)

    class Meta:
        verbose_name = 'Информация о пользователе'
        verbose_name_plural = 'Информация о пользователях'