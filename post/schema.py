import graphene
import graphql_jwt
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from .models import Post
from graphql_jwt.decorators import login_required


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



class CreatePostMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)

    post = graphene.Field(PostType)

    @classmethod
    @login_required
    def mutate(cls, root, info, title, content):
        post = Post(title=title, content=content, author=info.context.user)
        post.save()
        return CreatePostMutation(post=post)


class UpdatePostMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        title = graphene.String(required=True)
        content = graphene.String(required=True)

    post = graphene.Field(PostType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id, title, content):
        user_posts = Post.objects.filter(author=info.context.user)
        try:
            post = user_posts.get(id=id)
            post.title = title
            post.content = content
            post.save()
            return CreatePostMutation(post=post)
        except Post.DoesNotExist:
            raise Exception("You should be the owner of the post")


class DeletePostMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    post = graphene.Field(PostType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id):
        user_posts = Post.objects.filter(author=info.context.user)
        try:
            post = user_posts.get(id=id)
            post.delete()
            return
        except Post.DoesNotExist:
            raise Exception("You should be the owner of the post")


class Mutation(graphene.ObjectType):
    create_post = CreatePostMutation.Field()
    update_post = UpdatePostMutation.Field()
    delete_post = DeletePostMutation.Field()