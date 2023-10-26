import React, { Fragment, useContext } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { SignInWithEmailAndPassword } from "../../services/auth/authService";
import { GetUserInformation } from "../../services/user/userService";
import { GetUserEnterpriseInformation } from "../../services/enterprise/enterpriseService";
import { AppContext } from "../../context/AppContextProvider";

const Index = (props) => {
  const navigate = useNavigate();
  const { SaveEnterpriseValues } = useContext(AppContext);

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      const response = await SignInWithEmailAndPassword(username, password);

      if (response && response.operationType !== "signIn") {
        return;
      }

      if (response.user) {
        let { uid } = response.user;
        const responses = await Promise.all([
          GetUserInformation(uid),
          GetUserEnterpriseInformation(uid),
        ]);

        const userInfo = responses[0];
        const enterpriseInfo = responses[1];

        const userEnterpriseInformation = {
          User: userInfo,
          Enterprise: enterpriseInfo,
        };

        SaveEnterpriseValues(userEnterpriseInformation);

        navigate("/dashboard");
      }
    } catch (err) {
      if (err.code === "auth/invalid-login-credentials") {
        alert("Credenciales no validas");
      } else {
        alert("Error al iniciar sesión");
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="display-flex-jc-c-fd-c height-80vh">
        <h1 className="align-self-c ">System Task Manager</h1>
        <Form
          name="basic"
          layout="vertical"
          className="align-self-c w-450"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="">
            <Button
              type="primary"
              htmlType="submit"
              className="align-self-c"
              block
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};

export default Index;
