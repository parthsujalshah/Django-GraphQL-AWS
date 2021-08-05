import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from django.http import Http404
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from .models import Profile


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile
        fields = '__all__'


class Query(graphene.ObjectType):

    user_details = graphene.Field(UserType)
    user_profile = graphene.Field(ProfileType)

    all_users = graphene.List(UserType) #temp

    @login_required
    def resolve_user_details(root, info, **kwargs):
        user = info.context.user
        return User.objects.get(username=user)

    @login_required
    def resolve_user_profile(root, info):
        user = info.context.user
        return user.profile

    # temp route
    def resolve_all_users(root, info):
        return User.objects.all()


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()


class UpdateProfileMutation(graphene.Mutation):
    class Arguments:
        # image
        firstname = graphene.String()
        lastname = graphene.String()

    profile = graphene.Field(ProfileType)

    @classmethod
    @login_required
    def mutate(cls, root, info, firstname, lastname):
        profile = info.context.user.profile
        profile.firstname = firstname
        profile.lastname = lastname
        profile.save()
        return UpdateProfileMutation(profile=profile)


class Mutation(AuthMutation, graphene.ObjectType):
    update_profile = UpdateProfileMutation.Field()