# Generated by Django 2.2.4 on 2019-09-02 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20190902_0947'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='Email'),
        ),
    ]