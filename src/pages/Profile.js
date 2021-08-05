import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Avatar, Card, Affix } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { toUpper } from "lodash";


const Profile = props => {
    const [profile, setProfile] = useState({
        id: 1,
        username: "username",
        profile: {
            firstname: "first name",
            lastname: "last name",
        }
    });
    const [profilePic, setProfilePic] = useState({
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    })
    const [profileCustom, setProfileCustom] = useState(false);
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
        const profileInfo = {
            id: 1,
            username: "temp",
            profile: {
                firstname: "Parth",
                lastname: "Shah",
            }
        };
        const profilImage = {
            image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        }
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
        setProfile(profileInfo);
        setProfilePic(profilImage);
        setPosts(postList);
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishImage = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div styles={{ display: "flex", flexDirection: "column" }}>
                {posts.map((post, index) => (
                    <Card
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
                        <p>{post.description}</p>
                    </Card>
                ))}
            </div>
            <div style={{ marginRight: 100 }} />
            <div>
                <Affix>
                    <Card style={{ width: 400, backgroundColor: "#f5f5f5", marginTop: 20 }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Avatar size={60} src={profilePic.image} />
                            <div style={{ marginRight: 20 }} />
                            <h1>{profile.username}</h1>
                        </div>
                        <Form
                            name="image"
                            onFinish={onFinishImage}
                            initialValues={{}}
                        >
                            <Form.Item
                                name="changeProfilePic"
                                label="Change Profile Pcture"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="First Name"
                                name="firstname"
                            >
                                <Input defaultValue={profile.profile.firstname} />
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="lastname"
                            >
                                <Input defaultValue={profile.profile.lastname} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Affix>
            </div>
        </div>
    );
};

export default Profile;