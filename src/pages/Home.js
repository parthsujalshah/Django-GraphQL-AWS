import React, { useState, useEffect } from "react";
import { Card, Avatar, Row, Col } from 'antd';
import { toUpper } from "lodash";

const Home = props => {
    const [posts, setPosts] = useState([
        {
            author: {
                id: 1,
                authorProfile: {
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

    useEffect(() => {
        const postList = [
            {
                author: {
                    id: 1,
                    authorProfile: {
                        firstname: "Parth",
                        lastname: "Shah",
                        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    },
                },
                title: "title",
                description: "description",
                datePosted: "12-03-2020"
            },
            {
                author: {
                    id: 1,
                    authorProfile: {
                        firstname: "Parth",
                        lastname: "Shah",
                        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    },
                },
                title: "title",
                description: "description",
                datePosted: "12-03-2020"
            },
            {
                author: {
                    id: 1,
                    authorProfile: {
                        firstname: "Parth",
                        lastname: "Shah",
                        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                    },
                },
                title: "title",
                description: "description",
                datePosted: "12-03-2020"
            },
        ];
        setPosts(postList);
    }, []);

    return (
        <div>
            <Row>
                {posts.map((post, index) => (
                    <Col span={10}>
                        <Card
                            title={toUpper(post.title)}
                            extra={
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Avatar size="small" src={post.author.authorProfile.image} />
                                        <div style={{ width: 10 }} />
                                        <a href="#">{post.author.authorProfile.firstname} {post.author.authorProfile.lastname}</a>
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