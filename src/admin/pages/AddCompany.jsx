import React from "react";
import { Form, Input, Upload, Button, message, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

export default function AddCompany() {
  const [form] = Form.useForm();

  const handleAddCompany = async (values) => {
    const formData = new FormData();
    formData.append("logo", values.logo[0].originFileObj);
    formData.append("companyName", values.companyName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("status", values.status);

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
        message.success("Company added successfully.");
        form.resetFields();

        // Send email notification
        const emailResponse = await axios.post(
          `${import.meta.env.VITE_API_KEY}/api/v1/sendEmail`,
          {
            email: values.email,
            password: values.password,
            subject: "Congratulations, you have been added to Apna Connection",
            text: `Congratulations, you have been added to Apna Connection. Please click this link and complete your profile. Your email is ${values.email} and password is ${values.password}.`,
          }
        );

        if (emailResponse.status === 200) {
          message.success("Email sent successfully.");
        } else {
          message.error("Failed to send email.");
        }

        // In handleAddCompany
        console.log("Form Values:", values);
        console.log("Email Response:", emailResponse);
      }
    } catch (error) {
      console.error("Error adding company:", error.response.data);
      message.error("Failed to add company: " + error.response.data.message);
    }
  };

  return (
    <div className="add-company-section">
      <Form form={form} layout="vertical" onFinish={handleAddCompany}>
        <Form.Item
          name="logo"
          label="Logo"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          rules={[
            { required: true, message: "Please upload the company logo!" },
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
            { required: true, message: "Please input the company name!" },
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
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            { required: true, message: "Please select the company status!" },
          ]}
        >
          <Select>
            <Option value="active">Active</Option>
            <Option value="pending">Pending</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-500 text-white"
            htmlType="submit"
          >
            Add Company
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
