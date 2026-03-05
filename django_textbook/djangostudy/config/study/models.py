from django.db import models

# Create your models here.


class Student(models.Model):
    name = models.CharField(max_length=20)      # 이름
    age = models.IntegerField()                 # 나이
    phone = models.CharField(max_length=20)     # 전화번호
    school = models.CharField(max_length=20)    # 학교
    grade = models.CharField(max_length=20)     # 학년