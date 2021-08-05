from django.contrib import admin
from .models import Profile
from django.apps import apps

admin.site.register(Profile)

app = apps.get_app_config('graphql_auth')