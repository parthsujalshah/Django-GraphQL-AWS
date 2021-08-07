import React, { useState, useEffect } from "react";
import { Card, Avatar, Row, Col } from 'antd';
import { toUpper } from "lodash";
import { useHistory } from "react-router-dom";
import LoggedInMenu from "../menus/LoggedInMenu";
import LoggedOutMenu from "../menus/LoggedOutMenu";
import { allPostsQuery } from "../api/graphql";
import newApolloClient from "../api/apollo-client";
import { rootUrl, urls } from "../api/urls";


const Home = props => {
    const [posts, setPosts] = useState([
        {
            author: {
                id: 1,
                profile: {
                    firstname: "parth",
                    lastname: "shah",
                    image: "#",
                },
            },
            title: "title",
            description: "description",
            datePosted: "12-03-2020"
        }
    ]);

    useEffect(async () => {
        // const postList = [
        //     {
        //         author: {
        //             id: 1,
        //             profile: {
        //                 firstname: "Parth",
        //                 lastname: "Shah",
        //                 image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        //             },
        //         },
        //         title: "title",
        //         description: "description",
        //         datePosted: "12-03-2020"
        //     },
        //     {
        //         author: {
        //             id: 1,
        //             profile: {
        //                 firstname: "Parth",
        //                 lastname: "Shah",
        //                 image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        //             },
        //         },
        //         title: "title",
        //         description: "description",
        //         datePosted: "12-03-2020"
        //     },
        //     {
        //         author: {
        //             id: 1,
        //             profile: {
        //                 firstname: "Parth",
        //                 lastname: "Shah",
        //                 image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        //             },
        //         },
        //         title: "title",
        //         description: "description",
        //         datePosted: "12-03-2020"
        //     },
        // ];
        const client = newApolloClient();
        const postList = await client.query({
            query: allPostsQuery
        });
        setPosts(postList.data.allPosts);
    }, []);

    return (
        <div style={{ width: window.innerWidth }}>
            {
                localStorage.getItem('authToken') !== undefined && localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== ""
                    ?
                    <LoggedInMenu />
                    :
                    <LoggedOutMenu />
            }
            <Row style={{ marginLeft: 200, marginTop: 50 }}>
                {posts.map((post, index) => (
                    <Col span={10}>
                        <Card
                            headStyle={{ backgroundColor: "#b5f5ec" }}
                            title={toUpper(post.title)}
                            extra={
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Avatar size="medium" src={post.author.profile.image} />
                                        <div style={{ width: 10 }} />
                                        <a href={`${rootUrl}/profile/${post.author.id}`}>{post.author.profile.firstname} {post.author.profile.lastname}</a>
                                    </div>
                                </div>
                            }
                            style={{ width: 400, marginTop: 20 }}
                        >
                            <p style={{ color: "#e0e0e0", fontSize: 11 }}>Posted On: {post.datePosted}</p>
                            <p>{post.description}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;