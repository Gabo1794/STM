import React, { useState, useEffect, useContext } from "react";
import { Layout, theme, Avatar, Popover } from "antd";
import { AppContext } from "../../context/AppContextProvider";
import { LogOut } from "../../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { CaretDownOutlined } from '@ant-design/icons';
const { Header } = Layout;

const Index = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { enterpriseInfo } = useContext(AppContext);

  const {
    User: { Name, LastName },
  } = enterpriseInfo;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const hide = () => {
    LogOut();
    setOpen(false);
    navigate("/");
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <div className="display-flex-fd-rr header-app align-items-c">
        <Popover
          content={<a onClick={hide}>Cerrar sesión</a>}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
        >
          <div className="cursor-pointer">
            <Avatar className="header-user-avatar cursor-pointer">
              {Name.substring(0, 1)}
              {LastName.substring(0, 1)}
            </Avatar>
            <label className="m-l-20 cursor-pointer">
              <strong>
                {Name} {LastName}
              </strong>
              <CaretDownOutlined />
            </label>
          </div>
        </Popover>
      </div>
    </Header>
  );
};

export default Index;
