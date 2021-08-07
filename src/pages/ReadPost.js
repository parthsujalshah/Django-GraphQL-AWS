import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import { toUpper } from "lodash";
import LoggedInMenu from "../menus/LoggedInMenu";
import LoggedOutMenu from "../menus/LoggedOutMenu";
import { detailedPostQuery } from "../api/graphql";
import newApolloClient from "../api/apollo-client";


const ReadPost = props => {
    const [post, setPost] = useState(
        {
            id: 1,
            author: {
                profile: {
                    firstname: "parth",
                    lastname: "shah",
                    image: "#",
                }
            },
            title: "title",
            content: "content",
            datePosted: "12-03-2020"
        },
    );

    useEffect(async () => {
        const client = newApolloClient();
        const detailedPostQueryResponse = await client.query({
            query: detailedPostQuery,
            variables: {
                id: props.match.params.postId,
            }
        });
        console.log(detailedPostQueryResponse.data.detailedPost);
        setPost(detailedPostQueryResponse.data.detailedPost);
    }, []);

    return (
        <div style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
            {
                localStorage.getItem('authToken') !== undefined && localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== ""
                    ?
                    <LoggedInMenu />
                    :
                    <LoggedOutMenu />
            }
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: 50}}>
                <Card
                    style={{ width: 1000 }}
                    headStyle={{ backgroundColor: "#b5f5ec" }}
                    title={toUpper(post.title)}
                    extra={
                        <div>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Avatar size="small" src={post.author.profile.image} />
                                <div style={{ width: 10 }} />
                                <a href="#">{post.author.profile.firstname} {post.author.profile.lastname}</a>
                            </div>
                        </div>
                    }
                    style={{ width: 400, marginTop: 20 }}
                >
                    <p style={{ color: "#e0e0e0", fontSize: 11 }}>Posted On: {post.datePosted}</p>
                    <p>{post.content}</p>
                </Card>
            </div>
        </div>
    );
};

export default ReadPost;