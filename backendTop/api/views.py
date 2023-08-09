from django.shortcuts import render
from django.urls import include, path
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from .serializers import NoteSerializer, UserSerializer, MessageSerializer
from .models import Note, Message





# Create your views here.

""" def loginUser () :
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    is user is not None : 
        login(request, user)


    user = aithe """

@login_required
@permission_required(IsAuthenticated)
def home () :
    content = {'message' : 'hello you are authenticated congrats saber '}
    return Response(content)

@api_view(['POST'])
@csrf_exempt
def register_user(request) : 
    if request.method == 'POST':

        username = request.data.get("username")
        password = request.data.get("password")
        password2 = request.data.get("password2")
        if password == password2:
            user = User.objects.create_user(username=username, password=password)
            user.save()

        

        content = {'message' : 'hello you are  signup  congrats saber '}
        return Response(content)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all().order_by('-created_at')
    serializers = NoteSerializer(notes, many=True)

    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllNotes(request):
    notes = Note.objects.all().order_by('-created_at')
    serializers = NoteSerializer(notes, many=True)
    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookmarkNote(request, pk):
    user = request.user
    note = Note.objects.get(id=pk)
    note.bookmarked = not note.bookmarked
    note.save()
    serializers = NoteSerializer(note)

    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNote(request, pk):
    user = request.user
    note = Note.objects.get(id=pk)
    serializers = NoteSerializer(note)


    return Response(serializers.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateNote(request, pk):
    user = request.user
    note = Note.objects.get(id=pk)
    note.body = request.data.get('body')
    note.save()
    serializers = NoteSerializer(note)
    return Response(serializers.data)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def heartedNote(request, pk):
    user = request.user
    note = Note.objects.get(id=pk)
    note.hearted = not note.hearted
    note.save()
    serializers = NoteSerializer(note)

    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def heartedNotes(request):
    user = request.user
    heartednotes = Note.objects.filter(hearted = True)
    serializers = NoteSerializer(heartednotes, many=True)

    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def bookmarkedNotes(request):
    user = request.user
    bookmarkednotes = Note.objects.filter(bookmarked = True)
    serializers = NoteSerializer(bookmarkednotes, many=True)

    return Response(serializers.data)


@api_view(['PUT'])
def updateNote(request):
    user = request.user
    username = request.data.get('username')
    password = request.data.get('password')
    password2 = request.data.get('password2')
    userid = request.data.get('userId')
    if password == password2:
        user = User.objects.get(id=userid)
        user.username = username
        user.set_password(password)
        user.save()
    serializers = UserSerializer(user, many=False)
    return Response(serializers.data)

@api_view(['GET'])
def user(request):
    users = User.objects.all()
    serializers = UserSerializer(users, many=True)
    return Response(serializers.data) #this is not working we dont need it 

@api_view(['GET'])
def messages(request):
    messages = Message.objects.all().order_by('-timestamp')
    serializers = MessageSerializer(messages, many=True)
    return Response(serializers.data)

@api_view(['POST'])
def addMessage(request):
    user = User.objects.get(username='admin')
    message = request.data.get("message")
    addedmessage = Message.objects.create(content=message, user=user)
    addedmessage.save()

    return Response('it been created')

@api_view(['POST'])
def addNote(request):
    user = request.user
    body = request.data.get("body")
    addedNote = Note.objects.create()
    addedNote.body = body
    addedNote.save()
    return Response('note is created')

