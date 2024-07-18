import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Card, Table, Modal, Spin } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

export default function Heading() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logoFileList, setLogoFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchHeadings();
  }, []);

  const fetchHeadings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/heading`);
      setDataSource(response.data.result);
    } catch (error) {
      console.error("Failed to fetch headings:", error);
      toast.error("Failed to fetch headings");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "backgroundImage") {
        formData.append(key, values[key]);
      }
    });

    if (logoFileList.length > 0) {
      formData.append("bgImage", logoFileList[0].originFileObj);
    }

    try {
      let response;
      if (editingItem) {
        response = await axios.put(
          `${import.meta.env.VITE_API_KEY}/api/v1/heading/${editingItem._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/api/v1/heading`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success(editingItem ? "Heading updated successfully" : "Heading created successfully");
      fetchHeadings();
      form.resetFields();
      setLogoFileList([]);
      setEditingItem(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit heading:", error);
      toast.error("Failed to submit heading");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setLogoFileList(
      record.bgImage
        ? [{ uid: '-1', name: 'bgImage.png', status: 'done', url: record.bgImage }]
        : []
    );
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/heading/${id}`);
      toast.success("Heading deleted successfully");
      fetchHeadings();
    } catch (error) {
      console.error("Failed to delete heading:", error);
      toast.error("Failed to delete heading");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Main Heading",
      dataIndex: "mainHeading",
      key: "mainHeading",
    },
    {
      title: "Main Text",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Apna Connection Heading",
      dataIndex: "apnaConnectionHeading",
      key: "apnaConnectionHeading",
    },
    {
      title: "Apna Connection Text",
      dataIndex: "apnaConnectionText",
      key: "apnaConnectionText",
      render: (text) => <div style={{ overflowY: "auto", maxHeight: 200 }}>{text}</div>,
    },
    {
      title: "Background Image",
      dataIndex: "bgImage",
      key: "bgImage",
      render: (text) => text ? <img src={text} alt="background" style={{ width: "100px" }} /> : null,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex flex-col gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-screen p-5">
      <Card className="mb-5 mt-10">
        <h2 className="text-xl font-semibold mb-3">Create texts for layouts</h2>
        <Button type="primary" className="bg-blue-500 text-white hover:bg-white hover:border-blue-200 hover:text-black" onClick={() => setIsModalVisible(true)}>
          Add New Heading
        </Button>
      </Card>
      <Card className="mt-10">
        <Spin spinning={loading}>
          <Table
            className="w-full overflow-auto"
            dataSource={dataSource}
            columns={columns}
            pagination={true}
            rowKey="_id"
          />
        </Spin>
      </Card>
      <Modal
        title={editingItem ? "Edit Heading" : "Add Heading"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setLogoFileList([]);
          setEditingItem(null);
        }}
        footer={null}
      >
        <Spin spinning={submitting}>
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item
              label="Main Heading"
              name="mainHeading"
              rules={[
                { required: true, message: "Please input the main heading!" },
              ]}
            >
              <Input placeholder="Enter main heading" />
            </Form.Item>
            <Form.Item
              label="Main Text"
              name="mainText"
              rules={[
                { required: true, message: "Please input the main text!" },
              ]}
            >
              <Input placeholder="Enter main text" />
            </Form.Item>

            <Form.Item
              label="Apna Connection Heading"
              name="apnaConnectionHeading"
              rules={[
                {
                  required: true,
                  message: "Please input the Apna Connection heading!",
                },
              ]}
            >
              <Input placeholder="Enter Apna Connection heading" />
            </Form.Item>

            <Form.Item
              label="Apna Connection Text"
              name="apnaConnectionText"
              rules={[
                {
                  required: true,
                  message: "Please input the Apna Connection text!",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter Apna Connection text" />
            </Form.Item>

            <Form.Item
              label="Background Image"
              name="backgroundImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
              rules={[
                { required: !editingItem, message: "Please upload a background image!" },
              ]}
            >
              <Upload
                name="backgroundImage"
                listType="picture"
                fileList={logoFileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setLogoFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="bg-blue-500 text-white hover:bg-white hover:border-blue-200 hover:text-black" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
