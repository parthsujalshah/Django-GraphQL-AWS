import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card } from 'antd';
import LoggedOutMenu from "../menus/LoggedOutMenu";
import { loginMutation } from "../api/graphql";
import { newApolloClient } from "../api/apollo-client";

const Login = props => {
    const history = useHistory();

    if (localStorage.getItem('token')) {
        history.push('/');
    }

    const onFinish = async (values) => {
        console.log('Success:', values);
        const client = newApolloClient();

        try {
            const loginResponse = await client.mutate({
                mutation: loginMutation,
                variables: {
                    username: values.username,
                    password: values.password,
                }
            });
            localStorage.setItem('token', JSON.stringify(loginResponse.data.tokenAuth.token));
            history.push('/');
        } catch {
            history.push('/login');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ width: window.innerWidth }}>
            <LoggedOutMenu />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Card style={{ backgroundColor: "#e0e0e0" }}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;