from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'money')
    list_filter = ('id', 'user', 'money')
    search_fields = ('id', 'user', 'money')