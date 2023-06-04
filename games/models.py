from django.db import models
from PIL import Image


class Game(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(default='')
    image = models.ImageField(default='default.jpg', upload_to='game_pics')
    url = models.URLField(null=False, blank=False)
    type = models.ForeignKey('Type', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


class Type(models.Model):
    name = models.CharField(max_length=255, db_index=True, unique=True, null=False, blank=False)
    info = models.URLField(default='')

    def __str__(self):
        return self.name
