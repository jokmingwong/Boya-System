from django.db import models

# Create your models here.


class student(models.Model):
    name = models.CharField(max_length=30)
    student_id = models.IntegerField(max_length=8)
    catalog = models.CharField()
    photo = models.ImageField()

    xszc_need
    xszc



