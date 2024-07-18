import React from "react";
import { Form, Input, Button, Card, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Popup from "../../components/Popup";
import { toast } from "react-toastify";

export default function Setting() {
  const [categoryForm] = Form.useForm();
  const [siteConfigForm] = Form.useForm();
  const [contactForm] = Form.useForm();
  const [seoForm] = Form.useForm();
  const [analyticsForm] = Form.useForm();

  const handleCategorySave = async (values) => {
    console.log("Category values:", values);
    const formData = new FormData();
    formData.append("category", values.category);
    
    if (values.uploadImage && values.uploadImage[0]) {
      formData.append("uploadImage", values.uploadImage[0].originFileObj);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API Response:", response.data);
      if (response.status === 200) {
        toast.success("Category has been added");
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };

  const handleContactSave = async (values) => {
    console.log("Contact values:", values);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/contact`, values);
      console.log("API Response:", response.data);
      if (response.status === 200) {
        toast.success("Contact information has been saved");
      }
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Popup />
      <div className="general-settings-container mt-10 mb-5  ">
        <h1 className="text-2xl font-bold mb-5">Settings</h1>

        <Card className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Site Configuration</h2>
          <Form
            form={siteConfigForm}
            layout="vertical"
            onFinish={(values) => console.log("Saved values:", values)}
            initialValues={{
              siteName: "My Review Site",
              siteLogo: "",
              favicon: "",
            }}
          >
            <Form.Item
              label="Site Name"
              name="siteName"
              rules={[{ required: true, message: "Please input the site name!" }]}
            >
              <Input placeholder="Enter site name" />
            </Form.Item>

            <Form.Item
              label="Site Logo"
              name="siteLogo"
              rules={[{ required: true, message: "Please upload the site logo!" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevents automatic upload
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Favicon"
              name="favicon"
              rules={[{ required: true, message: "Please upload the favicon!" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevents automatic upload
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Add Categories</h2>
          <Form form={categoryForm} layout="vertical" onFinish={handleCategorySave}>
            <Form.Item
              label="Add Category"
              name="category"
              rules={[{ required: true, message: "Please input the category name!" }]}
            >
              <Input placeholder="Enter Category" />
            </Form.Item>

            <Form.Item
              label="Upload Image"
              name="uploadImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
              rules={[{ required: true, message: "Please upload the image" }]}
            >
              <Upload
                listType="picture"
                beforeUpload={() => false} // Prevents automatic upload
                maxCount={1} // Ensures only one file can be uploaded
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Contact Information Form */}
        <Card className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
          <Form
            form={contactForm}
            layout="vertical"
            onFinish={handleContactSave}
            initialValues={{
              contactEmail: "admin@reviewsite.com",
              contactPhone: "123-456-7890",
              contactAddress: "123 Main Street, Anytown, USA",
            }}
          >
            <Form.Item
              label="Contact Email"
              name="contactEmail"
              rules={[{ required: true, message: "Please input the contact email!" }]}
            >
              <Input placeholder="Enter contact email" />
            </Form.Item>

            <Form.Item
              label="Contact Phone"
              name="contactPhone"
              rules={[{ required: true, message: "Please input the contact phone!" }]}
            >
              <Input placeholder="Enter contact phone" />
            </Form.Item>

            <Form.Item
              label="Contact Address"
              name="contactAddress"
              rules={[{ required: true, message: "Please input the contact address!" }]}
            >
              <Input placeholder="Enter contact address" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="mb-5">
          <h2 className="text-xl font-semibold mb-3">SEO Settings</h2>
          <Form
            form={seoForm}
            layout="vertical"
            onFinish={(values) => console.log("Saved values:", values)}
            initialValues={{
              metaTitle: "Best Customer Reviews",
              metaDescription:
                "Find the best customer reviews for various products and services.",
              metaKeywords: "reviews, customer reviews, product reviews",
            }}
          >
            <Form.Item
              label="Meta Title"
              name="metaTitle"
              rules={[{ required: true, message: "Please input the meta title!" }]}
            >
              <Input placeholder="Enter meta title" />
            </Form.Item>

            <Form.Item
              label="Meta Description"
              name="metaDescription"
              rules={[{ required: true, message: "Please input the meta description!" }]}
            >
              <Input placeholder="Enter meta description" />
            </Form.Item>

            <Form.Item
              label="Meta Keywords"
              name="metaKeywords"
              rules={[{ required: true, message: "Please input the meta keywords!" }]}
            >
              <Input placeholder="Enter meta keywords" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-3">Analytics Integration</h2>
          <Form
            form={analyticsForm}
            layout="vertical"
            onFinish={(values) => console.log("Saved values:", values)}
            initialValues={{
              googleAnalytics: "UA-XXXXX-Y",
              facebookPixel: "1234567890",
            }}
          >
            <Form.Item
              label="Google Analytics ID"
              name="googleAnalytics"
              rules={[{ required: true, message: "Please input the Google Analytics ID!" }]}
            >
              <Input placeholder="Enter Google Analytics ID" />
            </Form.Item>

            <Form.Item
              label="Facebook Pixel ID"
              name="facebookPixel"
              rules={[{ required: true, message: "Please input the Facebook Pixel ID!" }]}
            >
              <Input placeholder="Enter Facebook Pixel ID" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
