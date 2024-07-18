import React, { useState, useEffect } from 'react';
import { Steps, Button, Form, Input, notification, Upload, DatePicker, TimePicker, Progress, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './Profile.css';  // Import your CSS file

const { Step } = Steps;
const { Option } = Select;

const RegistrationStepper = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [progress, setProgress] = useState(0);
  const [userId, setUserId] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`)
      .then(response => {
        const data = response.data.result;
        form.setFieldsValue({
          ...data,
          founded: data.founded ? moment(data.founded) : null,
          startTime: data.startTime ? moment(data.startTime, 'HH:mm') : null,
          endTime: data.endTime ? moment(data.endTime, 'HH:mm') : null,
        });
        setUserId(data._id);
        setProgress(calculateProgress(data));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [form]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/category`)
      .then(response => {
        setCategories(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const steps = [
    {
      title: 'Company Details',
      content: (
        <>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter your company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="personName"
            label="Person Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="logo"
            label="Logo"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
            rules={[{ required: true, message: 'Please upload your logo' }]}
          >
            <Upload.Dragger name="files" listType="picture" beforeUpload={() => false}>
              <Button className='bg-blue-500 text-white'>Upload Logo</Button>
            </Upload.Dragger>
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Contact Information',
      content: (
        <>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="industry"
            label="Industry"
            rules={[{ required: true, message: 'Please enter your industry' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter your location' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Additional Information',
      content: (
        <>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter a description' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="founded"
            label="Founded"
            rules={[{ required: true, message: 'Please enter the founding date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please enter the start time' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: 'Please enter the end time' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="instagram"
            label="Instagram"
            rules={[{ required: true, message: 'Please enter your Instagram link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="facebook"
            label="Facebook"
            rules={[{ required: true, message: 'Please enter your Facebook link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedin"
            label="LinkedIn"
            rules={[{ required: true, message: 'Please enter your LinkedIn link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="siteLink"
            label="Website"
            rules={[{ required: true, message: 'Please enter your website link' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select your category' }]}
          >
            <Select>
              {categories?.map(category => (
                <Option key={category._id} value={category.category}>
                  {category.category}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
  ];

  const calculateProgress = (data) => {
    let filledFields = 0;
    const totalFields = 17;
    Object.keys(data).forEach(key => {
      if (data[key]) filledFields++;
    });
    return (filledFields / totalFields) * 100;
  };

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      setProgress((current + 1) / steps.length * 100);
      setCurrent(current + 1);
      localStorage.setItem('progress', ((current + 1) / steps.length * 100).toString());

      const formattedValues = {
        ...values,
        founded: values.founded ? values.founded.format('YYYY-MM-DD') : null,
        startTime: values.startTime ? values.startTime.format('HH:mm') : null,
        endTime: values.endTime ? values.endTime.format('HH:mm') : null,
      };

      const response = await axios.put(`${import.meta.env.VITE_API_KEY}/api/v1/userReg/${userId}/partial`, formattedValues);
      setUserId(response.data.result._id);
    } catch (info) {
      console.log('Validate Failed:', info);
    }
  };

  const handlePrev = () => {
    setProgress(current / steps.length * 100);
    setCurrent(current - 1);
    localStorage.setItem('progress', (current / steps.length * 100).toString());
  };

  const handleFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        founded: values.founded ? values.founded.format('YYYY-MM-DD') : null,
        startTime: values.startTime ? values.startTime.format('HH:mm') : null,
        endTime: values.endTime ? values.endTime.format('HH:mm') : null,
      };

      await axios.put(`${import.meta.env.VITE_API_KEY}/api/v1/userReg/${userId}/partial`, formattedValues);
      notification.success({ message: 'Registration successful' });
      localStorage.removeItem('progress');
    } catch (error) {
      notification.error({ message: 'Registration failed' });
    }
  };

  useEffect(() => {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      setProgress(parseInt(savedProgress, 10));
      setCurrent(Math.floor(parseInt(savedProgress, 10) / (100 / steps.length)));
    }
  }, []);

  return (
    <div className="steps-container min-h-screen mt-20">
      <div className="progress-circular-container w-full text-center">
        <Progress type="circle" percent={Math.floor(progress)} />
        <h2 className='mt-5 font-semibold'>Profile Completion</h2>
      </div>
      <Steps current={current} className='mt-10'>
        {steps?.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" className='bg-blue-500 text-white' onClick={handleNext}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
              Submit
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} className='bg-blue-500 text-white' onClick={handlePrev}>
              Previous
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegistrationStepper;
