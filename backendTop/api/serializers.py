from .models import Note, Message
from rest_framework import serializers
from django.contrib.auth.models import User


class NoteSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Note
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Message
        fields = '__all__'