import users.schema
import graphene

class Query(users.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)