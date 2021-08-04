import graphene
import graphql_jwt
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from .models import Post
# from graphql_jwt.decorators import login_required


class PostType(DjangoObjectType):
    class Meta:
        model = Post
        fields = '__all__'


class Query(graphene.ObjectType):

    all_posts = graphene.List(PostType)

    def resolve_all_posts(root, info):
        return Post.objects.all()