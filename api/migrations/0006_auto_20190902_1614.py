# Generated by Django 2.2.4 on 2019-09-02 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20190902_1412'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='name',
            field=models.CharField(default='noname', max_length=25, unique=True, verbose_name='Имя пользователя'),
        ),
    ]
