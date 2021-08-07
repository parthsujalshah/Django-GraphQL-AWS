import { gql } from "@apollo/client";


export const registrationMutation = gql`
mutation{
    register($email: String! $username: String! $password1: String! $password2: String!) {
        token
        refreshToken
        success
        errors
    }
}
`;

export const loginMutation = gql`
mutation{
    tokenAuth($username: String! $password: String!){
        token
        success
        errors
        refreshToken
    }
}
`;

export const allPostsQuery = gql`
query{
    allPosts{
        id
        title
        description
        datePosted
        author{
            id
            profile{
                firstname
                lastname
            }
        }
    }
}
`;

export const authorPostsQuery = gql`
query{
    authorPosts($id: Int!){
        id
        title
        description
        datePosted
    }
}
`;

export const detailedPostQuery = gql`
query{
    detailedPost($id: Int!){
        id
        title
        content
        author{
            firstName
            lastName
        }
    }
}
`;

export const authorProfileQuery = gql`
query{
    authorProfile($id: Int!){
        firstname
        lastname
        image
    }
}
`;

export const authorPostsQuery = gql`
query{
    authorPosts($id: Int!){
        id
        title
        description
        datePosted
    }
}
`;