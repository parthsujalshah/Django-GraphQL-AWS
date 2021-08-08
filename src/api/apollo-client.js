import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context';


export default function newApolloClient() {
    const httpLink = createHttpLink({
        uri: "http://127.0.0.1:8000/graphql/",
    });

    const authLink = setContext((_, { headers }) => {
        const token = localStorage.getItem('token');
        const authorizationDirty = token ? `JWT ${token}` : "";
        var authorizationClean = "";
        for (var i in authorizationDirty) {
            if (i !== `${4}` && i !== `${authorizationDirty.length - 1}`) {
                authorizationClean += authorizationDirty[i];
            }
        }
        return {
            headers: {
                ...headers,
                authorization: authorizationClean
            }
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        credentials: 'include'
    });
};