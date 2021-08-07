import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'


export default function newApolloClient() {
    const httpLink = createHttpLink({
        uri: "http://127.0.0.1:8000/graphql/",
        credentials:'include'
    });

    return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
    });
};