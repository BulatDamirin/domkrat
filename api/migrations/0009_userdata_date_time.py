# Generated by Django 2.2.4 on 2019-09-02 14:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20190902_1626'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='date_time',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='Дата сохранения пользователя'),
        ),
    ]
