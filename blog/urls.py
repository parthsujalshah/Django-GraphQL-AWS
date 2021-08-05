from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from django.conf import settings
from graphene_file_upload.django import FileUploadGraphQLView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path('graphql/file-upload/', csrf_exempt(FileUploadGraphQLView.as_view(graphiql=True)))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)