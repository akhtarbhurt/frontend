import React from 'react';
import { Form, Input, Button, Upload, Card, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function AddBlog() {
  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append('blogTitle', values.blogTitle);
    formData.append('blogDescription', values.blogDescription);
    if (values.blogImage && values.blogImage.length > 0) {
      formData.append('blogImage', values.blogImage[0].originFileObj);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: 'Blog added successfully',
        });
        form.resetFields();
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to add blog',
        });
      }
    } catch (error) {
      console.error('Error adding blog:', error);
      notification.error({
        message: 'Error',
        description: 'Error adding blog',
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <Card className="mb-5 mt-10">
        <h2 className="text-xl font-semibold mb-3">Add Blog</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Blog Title"
            name="blogTitle"
            rules={[{ required: true, message: 'Please input the blog title!' }]}
          >
            <Input placeholder="Enter blog title" />
          </Form.Item>

          <Form.Item
            label="Blog Description"
            name="blogDescription"
            rules={[{ required: true, message: 'Please input the blog description!' }]}
          >
            <Input.TextArea placeholder="Enter blog description" />
          </Form.Item>

          <Form.Item
            label="Blog Image"
            name="blogImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
            rules={[{ required: true, message: 'Please upload a blog image!' }]}
          >
            <Upload name="blogImage" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}  >Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
