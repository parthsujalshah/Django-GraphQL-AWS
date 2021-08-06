import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
import { toUpper } from "lodash";


const ReadPost = props => {
    const [post, setPost] = useState(
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
            content: "content",
            datePosted: "12-03-2020"
        }
    );

    useEffect(() => {
        const indPost = {
            author: {
                id: 1,
                authorProfile: {
                    firstname: "Parth",
                    lastname: "Shah",
                    image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
                },
            },
            title: "title",
            content: "contentkregjerkgnero;gheo;ero;gne rjge gjer ;gkj iethj 4pjh[0 rtjitpjh 4jirth b[ortj hptjoh[ 5jtopji ",
            datePosted: "12-03-2020"
        }
        setPost(indPost);
    }, []);

    return (
        <Card
            style={{ width: 1000 }}
            headStyle={{ backgroundColor: "#b5f5ec" }}
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
            <p>{post.content}</p>
        </Card>
    );
};

export default ReadPost;