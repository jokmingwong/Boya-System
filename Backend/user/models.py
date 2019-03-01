import os

from django.db import models

# Create your models here.


def get_image_path(student_id, category):
    return os.path.join('pics',str(student_id), category)


class StudentInfo(models.Model):
    student_name = models.CharField(max_length=30)
    student_id = models.IntegerField()


class BoyaInfo(models.Model):
    student_id = models.IntegerField()
    category = models.CharField(max_length=20)
    description = models.TextField()
    incremental = models.IntegerField()


class BoyaPic(models.Model):
    student_id = models.IntegerField()
    category = models.CharField(max_length=20)
    pic = models.ImageField(upload_to=get_image_path(student_id, category))





