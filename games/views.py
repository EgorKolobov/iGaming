from rest_framework import generics, status
from rest_framework.views import APIView
from .models import Game, Type
from .serializers import GameSerializer, TypeSerializer, NoTypeGameSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from drf_yasg.utils import swagger_auto_schema


class TypeGameView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=["Game"])
    def get(self, request):
        types = Type.objects.all()
        data = []
        for type_obj in types:
            games = Game.objects.filter(type=type_obj)
            games_data = NoTypeGameSerializer(games, many=True).data
            type_data = {
                'type': TypeSerializer(type_obj).data['name'],
                'games': games_data
            }
            data.append(type_data)
        return Response(data)


class TypeList(generics.ListCreateAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(tags=["Type"])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Type"], operation_description='Adds new game types.'
                                                              ' It is also possible to add a multiple new types '
                                                              'at a time.')
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class TypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Type.objects.all()
    serializer_class = TypeSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.request.method in ('POST', 'PUT', 'DELETE'):
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(tags=["Type"])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Type"])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Type"])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Type"])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.request.method == 'POST':
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(tags=["Game"], operation_description='Returns a list of all available games')
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Game"], operation_description='Adds new games.'
                                                              ' It is also possible to add a multiple new games'
                                                              ' at a time.')
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GameDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.request.method in ('POST', 'PUT', 'DELETE'):
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @swagger_auto_schema(tags=["Game"])
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Game"])
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Game"])
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)

    @swagger_auto_schema(tags=["Game"])
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)


class GameURLView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=["Game"], operation_description='Returns game\'s URL')
    def get(self, request, pk):
        try:
            game = Game.objects.get(id=pk)
        except Game.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = GameSerializer(game)
        return Response(serializer.data['url'])


class GameListByType(generics.ListAPIView):
    serializer_class = GameSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        type_name = self.kwargs['type_name']
        game_type = get_object_or_404(Type, name=type_name)
        queryset = Game.objects.filter(type=game_type)
        return queryset

    @swagger_auto_schema(tags=["Game"], operation_description='Returns all games with the same Type')
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
