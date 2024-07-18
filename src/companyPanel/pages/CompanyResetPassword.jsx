import React from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const CompanyResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (values.new_password !== values.confirm_password) {
      message.error('The two passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/reset-password/${token}`, {
        newPassword: values.new_password,
        confirmPassword: values.confirm_password,
      });
      message.success(response.data.message);
      navigate('/companyLogin');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="container mx-auto mt-8 min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
        <Form
          name="reset_password_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
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
            <Button type="primary" htmlType="submit">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CompanyResetPassword;
