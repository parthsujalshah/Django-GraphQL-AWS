import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card } from 'antd';
import { useHistory } from "react-router-dom";
import LoggedInMenu from "../menus/LoggedInMenu";
import LoggedOutMenu from "../menus/LoggedOutMenu";


const CreateUpdatePost = props => {

    const history = useHistory();

    if (!localStorage.getItem('authToken')) {
        history.push('/');
    }

    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
    });

    useEffect(() => {
        var postDetails;
        if (props.createMode !== "yes") {
            console.log(props.match.params.postId)
            postDetails = {
                title: "title",
                description: "description",
                content: "content",
            };
            setPost(postDetails);
        }
    }, []);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {
                localStorage.getItem('authToken') !== undefined && localStorage.getItem('authToken') !== null && localStorage.getItem('authToken') !== ""
                    ?
                    <LoggedInMenu />
                    :
                    <LoggedOutMenu />
            }
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Card style={{ backgroundColor: "#e0e0e0" }}>
                <Form
                    style={{ width: 600 }}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please provide a post title!' }]}
                    >
                        <Input defaultValue={post.title} />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input defaultValue={post.description} />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        name="content"
                        rules={[{ required: true, message: 'Please provide a post content!' }]}
                    >
                        <Input.TextArea defaultValue={post.content} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateUpdatePost;