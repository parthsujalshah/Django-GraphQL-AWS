import { useHistory } from "react-router-dom";
import React from "react";
import { Menu } from 'antd';

const { SubMenu } = Menu;

const LoggedInMenu = props => {
    const history = useHistory();
    return (
        <Menu mode="horizontal" style={{ display: "flex", flex: 1 }}>
            <Menu.Item onClick={() => {history.push('/profile')}} key="home1">
                <h1 style={{ color: "#1890ff" }}><strong>Blogging Site</strong></h1>
            </Menu.Item>
            <Menu.Item key="home2">
                <h3><strong>Home</strong></h3>
            </Menu.Item>
            <Menu.Item key="newpost">
                <h3><strong>New Post</strong></h3>
            </Menu.Item>
            <Menu.Item onClick={() => {history.push('/profile')}} style={{ marginLeft: 900 }} key="profile">
                Profile
            </Menu.Item>
            <Menu.Item onClick={() => {
                // localStorage.removeItem('authToken');
                history.push('/');
            }} key="logout">
                Logout
            </Menu.Item>
        </Menu>
    );
};

export default LoggedInMenu;