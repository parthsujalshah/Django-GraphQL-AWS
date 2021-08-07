import React from "react";
import { Menu } from 'antd';
import { rootUrl } from "../api/urls";


const LoggedInMenu = props => {
    return (
        <Menu mode="horizontal" style={{ display: "flex", flex: 1 }}>
            <Menu.Item key="home1">
                <h1 style={{ color: "#1890ff" }}><strong><a href={`${rootUrl}/`}>Blogging Site</a></strong></h1>
            </Menu.Item>
            <Menu.Item key="home2">
                <h3><strong><a href={`${rootUrl}/`}>Home</a></strong></h3>
            </Menu.Item>
            <Menu.Item key="profile">
            <a href={`${rootUrl}/login/`}>Login</a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a href={`${rootUrl}/register/`}>Register</a>
            </Menu.Item>
        </Menu>
    );
};

export default LoggedInMenu;