import os

from django.db import models

# Create your models here.


def get_image_path(instance, filename):
    return os.path.join('pics', instance.student_id, instance.category)


class StudentInfo(models.Model):
    student_name = models.CharField(max_length=30, null=True)
    student_id = models.IntegerField(null=True)


class BoyaInfo(models.Model):
    student_id = models.IntegerField(null=True)
    category = models.CharField(max_length=20, null=True)
    description = models.TextField(null=True)
    incremental = models.IntegerField(null=True)


class BoyaPic(models.Model):
    student_id = models.IntegerField(null=True)
    category = models.CharField(max_length=20, null=True)
    pic = models.ImageField(upload_to=get_image_path, null=True)





