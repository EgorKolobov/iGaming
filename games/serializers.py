from rest_framework import serializers
from .models import Game, Type


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class NoTypeGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        exclude = ('type',)


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = '__all__'
