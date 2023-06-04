from django.urls import path
from . import views

urlpatterns = [
    path('types/', views.TypeList.as_view(), name='type-list'),
    path('types/<int:pk>/', views.TypeDetail.as_view(), name='type-detail'),
    path('games/', views.GameList.as_view(), name='game-list'),
    path('games/<int:pk>/', views.GameDetail.as_view(), name='game-detail'),
    path('games/<int:pk>/url/', views.GameURLView.as_view(), name='game-url'),
    path('games/<str:type_name>/', views.GameListByType.as_view(), name='game-type'),
    path('types-games/', views.TypeGameView.as_view(), name='types-games'),
]
