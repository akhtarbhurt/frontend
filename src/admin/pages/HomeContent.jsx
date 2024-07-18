import React from 'react';
import { Form, Input, Button, Upload, Card, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function HomeContent({ handleTabs }) {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log(values);
    setDataSource([values]);
  };

 

  return (
    <div className="w-full h-full p-5">
      <div className=' w-full text-end ' >
        <button className={`bg-blue-500 text-white border-0 p-2  rounded-md  `  } onClick={()=> handleTabs("homeTable") } > Show Table </button>
      </div>
      <Card className="mb-5 mt-10">
        <h2 className="text-xl font-semibold mb-3">Home Content Form</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Main Heading"
            name="mainHeading"
            rules={[{ required: true, message: 'Please input the main heading!' }]}
          >
            <Input placeholder="Enter main heading" />
          </Form.Item>

          <Form.Item
            label="Main Text"
            name="mainText"
            rules={[{ required: true, message: 'Please input the main text!' }]}
          >
            <Input.TextArea placeholder="Enter main text" />
          </Form.Item>

          <Form.Item
            label="Apna Connection Heading"
            name="apnaConnectionHeading"
            rules={[{ required: true, message: 'Please input the Apna Connection heading!' }]}
          >
            <Input placeholder="Enter Apna Connection heading" />
          </Form.Item>

          <Form.Item
            label="Apna Connection Text"
            name="apnaConnectionText"
            rules={[{ required: true, message: 'Please input the Apna Connection text!' }]}
          >
            <Input.TextArea placeholder="Enter Apna Connection text" />
          </Form.Item>

          <Form.Item
            label="Background Image"
            name="backgroundImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
            rules={[{ required: true, message: 'Please upload a background image!' }]}
          >
            <Upload name="backgroundImage" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Category Heading"
            name="categoryHeading"
            rules={[{ required: true, message: 'Please input the category heading!' }]}
          >
            <Input placeholder="Enter category heading" />
          </Form.Item>

          <Form.Item
            label="Category Button Text"
            name="categoryButtonText"
            rules={[{ required: true, message: 'Please input the category button text!' }]}
          >
            <Input placeholder="Enter category button text" />
          </Form.Item>

          <Form.Item
            label="Section Heading"
            name="sectionHeading"
            rules={[{ required: true, message: 'Please input the section heading!' }]}
          >
            <Input placeholder="Enter section heading" />
          </Form.Item>

          <Form.Item
            label="Section Text"
            name="sectionText"
            rules={[{ required: true, message: 'Please input the section text!' }]}
          >
            <Input.TextArea placeholder="Enter section text" />
          </Form.Item>

          <Form.Item
            label="Section Button Text"
            name="sectionButtonText"
            rules={[{ required: true, message: 'Please input the section button text!' }]}
          >
            <Input placeholder="Enter section button text" />
          </Form.Item>

          <Form.Item
            label="Section Image"
            name="sectionImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
            rules={[{ required: true, message: 'Please upload a section image!' }]}
          >
            <Upload name="sectionImage" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Review Heading"
            name="reviewHeading"
            rules={[{ required: true, message: 'Please input the review heading!' }]}
          >
            <Input placeholder="Enter review heading" />
          </Form.Item>

          <Form.Item
            label="Review Text"
            name="reviewText"
            rules={[{ required: true, message: 'Please input the review text!' }]}
          >
            <Input.TextArea placeholder="Enter review text" />
          </Form.Item>

          <Form.Item
            label="Client Heading"
            name="clientHeading"
            rules={[{ required: true, message: 'Please input the client heading!' }]}
          >
            <Input placeholder="Enter client heading" />
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
