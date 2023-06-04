import json
from django.core.management.base import BaseCommand
from games.models import Game, Type


class Command(BaseCommand):
    help = 'Imports games from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON payload file')

    def handle(self, *args, **options):
        file_path = options['file_path']

        with open(file_path) as file:
            games = json.load(file)

        for game_data in games:
            type_id = game_data.pop('type')
            game_type = Type.objects.get(pk=type_id)
            game = Game(**game_data, type=game_type)
            game.save()

        self.stdout.write(self.style.SUCCESS('Games imported successfully!'))
