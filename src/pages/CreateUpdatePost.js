import React, { useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';


const CreateUpdatePost = props => {

    const [post, setPost] = useState({
        title: "",
        description: "",
        content: "",
    });

    useEffect(() => {
        console.log(props.match.params.postId)
        var postDetails;
        if(props.createMode !== "yes"){
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
        <Form
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
    );
};

export default CreateUpdatePost;