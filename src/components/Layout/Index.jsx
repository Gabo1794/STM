import React, { useState, useContext } from "react";
import {
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import AppHeader from '../Header/Index';
import { AppContext } from '../../context/AppContextProvider';
import { sectionsMenu } from "../../constants/sections";
import { useNavigate } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const Index = (props) => {
  const navigate = useNavigate();
  const { sectionSelected, setSectionSelected } = useContext(AppContext);
  const [year] = useState(new Date().getFullYear());
  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();


const ChangeLocation = (section) => {
  const sectionSelected = sectionsMenu[section];
  if(sectionSelected) {
    navigate(sectionSelected);
    setSectionSelected(section)
  }
}

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem("Citas", "sub1", <CalendarOutlined />, [
      getItem("Dashboard", "1"),
      getItem("Agendadas", "2")
    ]),
    getItem("Propietarios", "3", <UserOutlined />)
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="header-image-container" />
        <Menu
          theme="dark"
          defaultSelectedKeys={sectionSelected}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
          onClick={(e) => ChangeLocation(e.key)}
        />
      </Sider>
      <Layout>
        <AppHeader />
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          VS ©{year} Created by Gabriel Montaño
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Index;
