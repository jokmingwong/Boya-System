from django.db import models

# Create your models here.


class StudentInfo(models.Model):
    student_name = models.CharField(max_length=30)
    student_id = models.IntegerField()


class BoyaInfo(models.Model):
    category = models.CharField(max_length=20)
    description = models.TextField()
    incremental = models.IntegerField()
    pic = models.ImageField(upload_to="pic_folder")



