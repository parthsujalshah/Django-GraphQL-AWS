import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Avatar, Card, Affix } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { toUpper } from "lodash";
import { useHistory } from "react-router-dom";
import LoggedInMenu from "../menus/LoggedInMenu";
import LoggedOutMenu from "../menus/LoggedOutMenu";
import { authorPostsQuery, authorProfileQuery, authorIdQuery, updateProfileMutation } from "../api/graphql";
import newApolloClient from "../api/apollo-client";


const Profile = props => {
    const history = useHistory();
    if (!localStorage.getItem('token')) {
        history.push('/login');
    }

    const [editableProfile, setEditableProfile] = useState(false);
    const [authorPosts, setAuthorPosts] = useState([{
        title: "title",
        description: "description",
        datePosted: "12-03-2020"
    }
    ]);
    const [authorProfile, setAuthorProfile] = useState({
        firstname: "Parth",
        lastname: "Shah",
        image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        user: {
            username: ""
        }
    });

    useEffect(async () => {
        const client = newApolloClient();
        const authorIdQueryResponse = await client.query({
            query: authorIdQuery
        });
        setEditableProfile(parseInt(authorIdQueryResponse.data.authorId) === parseInt(props.match.params.profileId));
        const authorPostsQueryResponse = await client.mutate({
            mutation: authorPostsQuery,
            variables: {
                id: props.match.params.profileId,
            }
        });
        const authorProfileQueryResponse = await client.mutate({
            mutation: authorProfileQuery,
            variables: {
                id: props.match.params.profileId
            }
        });
        setAuthorProfile(authorProfileQueryResponse.data.authorProfile);
        setAuthorPosts(authorPostsQueryResponse.data.authorPosts);
    }, []);

    const onFinish = async (values) => {
        console.log('Success:', values);
        const client = newApolloClient();
        // console.log(values.firstname, values.lastname);
        const updatedProfile = await client.mutate({
            mutation: updateProfileMutation,
            variables: {
                firstname: values.firstname ? values.firstname : "",
                lastname: values.lastname ? values.lastname : ""
            }
        });
        setAuthorProfile({
            firstname: updatedProfile.data.updateProfile.profile.firstname,
            lastname: updatedProfile.data.updateProfile.profile.lastname,
            image: authorProfile.image,
            user: authorProfile.user
        });
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
        <div style={{ width: "100%" }}>
            {
                localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== ""
                    ?
                    <LoggedInMenu />
                    :
                    <LoggedOutMenu />
            }
            <div style={{ display: "flex", flexDirection: "row", paddingLeft: 200, marginTop: 50 }}>
                <div styles={{ display: "flex", flexDirection: "column" }}>
                    {authorPosts.map((post, index) => (
                        <Card
                            style={{ marginTop: 40 }}
                            headStyle={{ backgroundColor: "#b5f5ec" }}
                            title={toUpper(post.title)}
                            extra={
                                <div>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <Avatar size="small" src={authorProfile.image} />
                                        <div style={{ width: 10 }} />
                                        <a href="#">{authorProfile.firstname} {authorProfile.lastname}</a>
                                    </div>
                                </div>
                            }
                            style={{ width: 400, marginTop: 20 }}
                        >
                            <p style={{ color: "#e0e0e0", fontSize: 11 }}>Posted On: {post.datePosted}</p>
                            <p>{post.description}</p>
                            <br />
                            <br />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Button type="dashed" size="small" onClick={() => { history.push('/update-post/1') }}>Update</Button>
                                <div style={{ marginRight: 10 }} />
                                <Button type="dashed" size="small" danger>Delete</Button>
                            </div>
                            <Button onClick={() => {
                                history.push(`/read-post/${post.id}`);
                            }}>Read full Article</Button>
                        </Card>
                    ))}
                </div>
                <div style={{ marginRight: 400 }} />
                <div>
                    <Affix>
                        <Card style={{ width: 400, backgroundColor: "#f5f5f5", marginTop: 20 }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Avatar size={60} src={authorProfile.image} />
                                <div style={{ marginRight: 20 }} />
                                <div>
                                    <h1>{authorProfile.user.username}</h1>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <h3>{authorProfile.firstname}</h3>
                                        <div style={{ marginRight: 20 }} />
                                        <h3>{authorProfile.lastname}</h3>
                                    </div>
                                </div>
                            </div>
                            {
                                editableProfile ?
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
                                    :
                                    <div style={{ marginBottom: 10 }} />
                            }

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
                                    {
                                        editableProfile
                                            ?
                                            <Input placeholder="change" />
                                            :
                                            <div />
                                    }
                                </Form.Item>

                                <Form.Item
                                    label="Last Name"
                                    name="lastname"
                                >
                                    {
                                        editableProfile
                                            ?
                                            <Input placeholder="change" />
                                            :
                                            <div />
                                    }
                                </Form.Item>

                                {
                                    editableProfile
                                        ?
                                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                            <Button type="primary" htmlType="submit">
                                                Update
                                            </Button>
                                        </Form.Item>
                                        :
                                        <div />
                                }

                            </Form>
                        </Card>
                    </Affix>
                </div>
            </div>
        </div>
    );
};

export default Profile;