import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Spin } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import Navbar from "./Navbar";
import Looter from "./Looter";
import { Link } from "react-router-dom";

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    const formData = new FormData();
    formData.append("logo", values.logo[0].originFileObj);
    formData.append("companyName", values.companyName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirm);

    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/userReg`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        message.success(
          "Registration successful. Please wait till admin approves you and you will get an email."
        );
        form.resetFields();
      }
    } catch (error) {
      console.error("Registration error:", error.response.data);
      message.error("Registration failed: " + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className=" max-w-7xl m-auto mt-20 p-5 mb-10">
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            className=" shadow-md p-3 rounded-md border "
            onFinish={handleRegister}
          >
            <Form.Item
              name="logo"
              label="Logo"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              rules={[
                { required: true, message: "Please upload your company logo!" },
              ]}
            >
              <Upload.Dragger
                name="files"
                listType="picture"
                beforeUpload={() => false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Upload.Dragger>
            </Form.Item>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[
                { required: true, message: "Please input your company name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="bg-blue-500 text-white"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className='w-full text-end capitalize' >
        <p> do you have an account <Link to={'/companyLogin'} className='text-blue-500' > Login here  </Link> </p>
      </div>
        </Spin>
      </div>
      <Looter />
    </>
  );
}
