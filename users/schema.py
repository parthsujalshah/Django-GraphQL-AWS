import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from django.contrib.auth.models import User
from graphene_django import DjangoObjectType
from django.http import Http404
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from .models import Profile
from graphene_file_upload.scalars import Upload


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


class ProfilePicUploadMutation(graphene.Mutation):
    """
    Graphiql does not have file support. However, file can be uploaded from postman:
    1. Go to form data
    2. Add "operations" key with value: { "query": "mutation ($<file field name>: Upload!) { <file upload mutation name>(<file field name>: $<file field name>){profile{firstname}} }", "variables": { "<file field name>": null } }
        Sample Query: { "query": "mutation ($image: Upload!) { profilePicUpload(image: $image){profile{firstname}} }", "variables": { "image": null } }
    3. Add "map" key with value: {"0": ["variables.image"]}
    4. Add "0" key. The key type is "file" and in the value field choose the file of your choice
    5. Make sure that you are authenticated (if required)
    6. Make the request
    """

    class Arguments:
        image = Upload(required=True)
        # image = graphene.String()

    profile = graphene.Field(ProfileType)

    @classmethod
    @login_required
    def mutate(cls, self, info, image, **kwargs):
        print('here')
        print(info.context.user)
        profile = info.context.user.profile
        profile.image = image
        profile.save()
        return ProfilePicUploadMutation(profile=profile)


class Mutation(AuthMutation, graphene.ObjectType):
    update_profile = UpdateProfileMutation.Field()
    profile_pic_upload = ProfilePicUploadMutation.Field()