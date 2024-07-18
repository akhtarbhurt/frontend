import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Row, Col, Select } from "antd";
import Popup from "./Popup";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Looter from "./Looter";

export default function UserRegistration() {
  const [form] = Form.useForm();
  const [isForm, setIsForm] = useState({
    logo: "",
    personName: "",
    companyName: "",
    email: "",
    phone: "",
    address: "",
    industry: "",
    location: "",
    description: "",
    founded: "",
    startTime: "",
    endTime: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    siteLink: "",
    category: ""
  });
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [otherCategory, setOtherCategory] = useState(""); // State for other category input

  const handleSave = async (values) => {
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      if (isForm.logo) {
        formData.append("logo", isForm.logo);
      }
      // If "Other" category is selected, use the value from the otherCategory input
      if (selectedCategory === "other") {
        formData.append("category", otherCategory);
      }

      const response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/userReg`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success("Data has been fetched");
      } else if (response.status === 400) {
        toast.error("Data has not been fetched");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleFileChange = (e) => {
    setIsForm({ ...isForm, logo: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsForm({ ...isForm, [name]: value });
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/category`);
      setCategories(response.data.result);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  return (
    <>
      <Popup />
      <Navbar/>
      <div className=" bg-slate-100 " >
        <div className="max-w-7xl m-auto p-3">
        <div className="general-settings-container mt-10 mb-5">
          <h1 className="text-2xl font-bold mb-5"> Join Us </h1>
          <Card className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Register Yourself</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={isForm}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Logo"
                    name="logo"
                    rules={[{ required: true, message: "Logo is required" }]}
                  >
                    <Input type="file" onChange={handleFileChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: "Company name is required" }]}
                  >
                    <Input type="text" name="companyName" placeholder="Enter a company name" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Person Name"
                    name="personName"
                    rules={[{ required: true, message: "Person name is required" }]}
                  >
                    <Input type="text" name="personName" placeholder="Enter a person name" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Email is required" }]}
                  >
                    <Input type="email" name="email" placeholder="Enter your email" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: "Phone is required" }]}
                  >
                    <Input type="number" name="phone" placeholder="Enter a phone number" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Address is required" }]}
                  >
                    <Input type="text" name="address" placeholder="Enter an address" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Site Link"
                    name="siteLink"
                    rules={[{ required: true, message: "Site Link is required" }]}
                  >
                    <Input type="text" name="siteLink" placeholder="Enter your website url" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: "Category is required" }]}
                  >
                    <Select placeholder="Select a category" onChange={handleCategoryChange}>
                      {categories.map((category) => (
                        <Select.Option key={category._id} value={category.category}>
                          {category.category}
                        </Select.Option>
                      ))}
                      <Select.Option value="other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              {selectedCategory === "other" && (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Other Category"
                      name="otherCategory"
                      rules={[{ required: true, message: "Please specify the category" }]}
                    >
                      <Input placeholder="Enter other category" onChange={(e) => setOtherCategory(e.target.value)} />
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Industry"
                    name="industry"
                    rules={[{ required: true, message: "Industry is required" }]}
                  >
                    <Input type="text" name="industry" placeholder="Enter your industry" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: "Location is required" }]}
                  >
                    <Input type="text" name="location" placeholder="Enter your location" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Description is required" }]}
                  >
                    <Input type="text" name="description" placeholder="Enter a description" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Founded In"
                    name="founded"
                    rules={[{ required: true, message: "Foundation date is required" }]}
                  >
                    <Input type="date" name="founded" placeholder="Enter your founding date" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Start Time"
                    name="startTime"
                    rules={[{ required: true, message: "Start time is required" }]}
                  >
                    <Input type="time" name="startTime" placeholder="Enter your start time" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="End Time"
                    name="endTime"
                    rules={[{ required: true, message: "End time is required" }]}
                  >
                    <Input type="time" name="endTime" placeholder="Enter your end time" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Instagram"
                    name="instagram"
                    rules={[{ required: true, message: "Instagram link is required" }]}
                  >
                    <Input type="text" name="instagram" placeholder="Enter your Instagram link" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Facebook"
                    name="facebook"
                    rules={[{ required: true, message: "Facebook link is required" }]}
                  >
                    <Input type="text" name="facebook" placeholder="Enter your Facebook link" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="LinkedIn"
                    name="linkedin"
                    rules={[{ required: true, message: "LinkedIn link is required" }]}
                  >
                    <Input type="text" name="linkedin" placeholder="Enter your LinkedIn link" onChange={handleInputChange} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="bg-blue-500">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        </div>

      </div>
      <Looter/>
    </>
  );
}
