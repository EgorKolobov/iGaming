import json
from django.core.management.base import BaseCommand
from games.models import Type


class Command(BaseCommand):
    help = 'Imports types from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the JSON payload file')

    def handle(self, *args, **options):
        file_path = options['file_path']

        with open(file_path) as file:
            types = json.load(file)

        for type_data in types:
            game_type = Type(**type_data)
            game_type.save()

        self.stdout.write(self.style.SUCCESS('Types imported successfully!'))
