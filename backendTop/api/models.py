from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bookmarked = models.BooleanField(default=False)
    hearted = models.BooleanField(default=False)


    def __str__(self):
        return self.body


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content