# Generated by Django 3.2.4 on 2021-07-23 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(error_messages={'Error': 'Username already Exist!'}, max_length=150, unique=True),
        ),
    ]
