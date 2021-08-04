import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from django.http import Http404
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(graphene.ObjectType):

    user_details = graphene.Field(UserType)

    def resolve_user_details(root, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Unauthenticated")
        return User.objects.get(username=user)


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()


class Mutation(AuthMutation, graphene.ObjectType):
    pass