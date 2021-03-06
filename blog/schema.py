import users.schema
import post.schema
import graphene

class Query(users.schema.Query, post.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, post.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)