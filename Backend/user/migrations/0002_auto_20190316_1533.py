# Generated by Django 2.1.7 on 2019-03-16 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='boyainfo',
            name='student_info',
        ),
        migrations.RemoveField(
            model_name='boyapic',
            name='student_info',
        ),
        migrations.AddField(
            model_name='boyainfo',
            name='student_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='boyapic',
            name='pic',
            field=models.ImageField(null=True, upload_to='pics\\<django.db.models.fields.IntegerField>\\<django.db.models.fields.CharField>'),
        ),
        migrations.AddField(
            model_name='boyapic',
            name='student_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='boyainfo',
            name='category',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='boyainfo',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='boyainfo',
            name='incremental',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='boyapic',
            name='category',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='studentinfo',
            name='student_id',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentinfo',
            name='student_name',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
