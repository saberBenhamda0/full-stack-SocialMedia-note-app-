
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('home/', views.home),
    path('signup/', views.register_user),
    path('allNotes/', views.getAllNotes),
    path('notes/', views.getNotes),
    path("addNote/", views.addNote),
    path('note/<str:pk>/', views.getNote),
    path('bookmark/note/<str:pk>/', views.bookmarkNote),
    path('bookmark/notes', views.bookmarkedNotes),
    path('heart/note/<str:pk>/', views.heartedNote),
    path('heart/notes', views.heartedNotes),
    path('update/note/<str:pk>/', views.updateNote),
    path('updateUser/', views.updateNote),
    path('users/', views.user),
    path('messages/', views.messages),
    path('addMessages/', views.addMessage),


    
]
