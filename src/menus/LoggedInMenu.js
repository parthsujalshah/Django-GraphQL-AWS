import { useHistory } from "react-router-dom";
import React from "react";
import { Menu } from 'antd';
import { rootUrl } from "../api/urls";
import { authorIdQuery } from "../api/graphql";
import { newApolloClient } from "../api/apollo-client";

const { SubMenu } = Menu;

const LoggedInMenu = props => {
    const history = useHistory();
    return (
        <Menu mode="horizontal" style={{ display: "flex", flex: 1 }}>
            <Menu.Item key="home1">
                <h1 style={{ color: "#1890ff" }}><strong><a href={`${rootUrl}/`}>Blogging Site</a></strong></h1>
            </Menu.Item>
            <Menu.Item key="home2">
                <h3><strong><a href={`${rootUrl}/`}>Home</a></strong></h3>
            </Menu.Item>
            <Menu.Item key="newpost">
                <h3><strong><a href={`${rootUrl}/create-post`}>New Post</a></strong></h3>
            </Menu.Item>
            <Menu.Item key="profile" onClick={async () => {
                const client = newApolloClient();
                try {
                    const authorIdQueryResponse = await client.query({
                        query: authorIdQuery
                    });
                    history.push(`/profile/${authorIdQueryResponse.data.authorId}`);
                } catch {
                    history.push('/profile');
                }
            }}>
                Profile
            </Menu.Item>
            <Menu.Item onClick={() => {
                localStorage.removeItem('token');
                history.push('/');
            }} key="logout">
                Logout
            </Menu.Item>
        </Menu>
    );
};

export default LoggedInMenu;