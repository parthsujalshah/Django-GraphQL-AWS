import { gql } from "@apollo/client";

export const registrationMutation = gql`
mutation($email: String! $username: String! $password1: String! $password2: String!){
    register(email: $email username: $username password1: $password1 password2: $password2) {
        token
        refreshToken
        success
        errors
    }
}
`;

export const loginMutation = gql`
mutation($username: String! $password: String!){
    tokenAuth(username: $username password: $password){
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
                image
            }
        }
    }
}
`;

export const authorPostsQuery = gql`
query($id: Int!){
    authorPosts(id: $id){
        id
        title
        description
        datePosted
    }
}
`;

export const detailedPostQuery = gql`
query($id: Int!){
    detailedPost(id: $id){
        id
        title
        description
        content
        datePosted
        author{
            profile{
                image
                firstname
                lastname
            }
        }
    }
}
`;

export const authorProfileQuery = gql`
query($id: Int!){
    authorProfile(id: $id){
        firstname
        lastname
        image
        user {
            username
        }
    }
}
`;