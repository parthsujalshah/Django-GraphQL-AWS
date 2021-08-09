import React from "react";
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useHistory } from "react-router-dom";
import { newApolloClient } from "../api/apollo-client";
import { registrationMutation } from "../api/graphql";
import LoggedOutMenu from "../menus/LoggedOutMenu";

const Register = props => {
    const history = useHistory();
    if (localStorage.getItem('token')) {
        history.push('/');
    }

    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not a valid email!',
    //     }
    // };

    const onFinish = async (values) => {
        console.log('Success:', values);
        const client = newApolloClient();

        const regResponse = await client.mutate({
            mutation: registrationMutation,
            variables: {
                username: values.username,
                email: values.email,
                password1: values.password,
                password2: values.confirm,
            }
        });
        localStorage.setItem('token', JSON.stringify(regResponse.data.register.token));
        history.push('/');
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

                    <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }]}>
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
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
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

export default Register;