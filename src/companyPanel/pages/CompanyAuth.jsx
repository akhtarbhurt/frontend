import React, { useState } from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const CompanyAuth = () => {
  const onFinishChangePassword = async (values) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/changePassword`, {
        currentPassword: values.current_password,
        newPassword: values.new_password,
        confirmPassword: values.confirm_password,
      });
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to change password');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container mx-auto mt-8 min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <Form
          name="change_password_form"
          initialValues={{ remember: true }}
          onFinish={onFinishChangePassword}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          {/* Current Password */}
          <Form.Item
            name="current_password"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
          </Form.Item>

          {/* New Password */}
          <Form.Item
            name="new_password"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 8, message: 'Password must be at least 8 characters long' },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirm_password"
            label="Confirm Password"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CompanyAuth;
