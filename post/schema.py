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
    user_posts = graphene.List(PostType)
    author_posts = graphene.List(PostType, id=graphene.Int(required=True))
    detailed_post = graphene.Field(PostType, id=graphene.Int(required=True))

    def resolve_all_posts(root, info):
        return Post.objects.all()

    def resolve_user_posts(root, info, **kwargs):
        return Post.objects.filter(author=info.context.user)

    def resolve_author_posts(root, info, id):
        return Post.objects.filter(author=id)

    def resolve_detailed_post(root, info, id):
        return Post.objects.get(id=id)


class Mutation(graphene.ObjectType):
    pass