import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Card, Table, Modal, Spin } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Section() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/section`);
      setDataSource(response.data.result);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
      toast.error("Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('sectionHeading', values.sectionHeading);
    formData.append('sectionText', values.sectionText);
    formData.append('sectionButtonText', values.sectionButtonText);

    if (fileList.length > 0) {
      formData.append('sectionImage', fileList[0].originFileObj);
    }

    try {
      let response;
      if (editingItem) {
        response = await axios.put(
          `${import.meta.env.VITE_API_KEY}/api/v1/section/${editingItem._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/api/v1/section`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      toast.success(editingItem ? "Section content updated successfully" : "Section content created successfully");
      fetchSections();
      form.resetFields();
      setFileList([]);
      setEditingItem(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit section content:", error);
      toast.error("Failed to submit section content");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setFileList(
      record.sectionImage
        ? [{ uid: '-1', name: 'sectionImage.png', status: 'done', url: record.sectionImage }]
        : []
    );
    form.setFieldsValue({
      sectionHeading: record.sectionHeading,
      sectionText: record.sectionText,
      sectionButtonText: record.sectionButtonText,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/section/${id}`);
      toast.success("Section content deleted successfully");
      fetchSections();
    } catch (error) {
      console.error("Failed to delete section content:", error);
      toast.error("Failed to delete section content");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Section Image',
      dataIndex: 'sectionImage',
      key: 'sectionImage',
      render: (text) => text ? <img src={text} alt="section" style={{ width: '50px' }} /> : null,
    },
    {
      title: 'Section Heading',
      dataIndex: 'sectionHeading',
      key: 'sectionHeading',
    },
    {
      title: 'Section Text',
      dataIndex: 'sectionText',
      key: 'sectionText',
    },
    {
      title: 'Section Button Text',
      dataIndex: 'sectionButtonText',
      key: 'sectionButtonText',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div className="flex gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </div>
      ),
    },
  ];

  return (
    <div className='w-full h-screen'>
      <Card className="mb-5 mt-10">
        <h2 className="text-xl font-semibold mb-3">Section Content Form</h2>
        <Button type="primary"  className='bg-blue-500 text-white' onClick={() => setIsModalVisible(true)}>Add New Section Content</Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-3">Section Content Table</h2>
        <Spin spinning={loading}>
          <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="_id" />
        </Spin>
      </Card>

      <Modal
        title={editingItem ? "Edit Section Content" : "Add Section Content"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setFileList([]);
          setEditingItem(null);
        }}
        footer={null}
      >
        <Spin spinning={submitting}>
          <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
              rules={[{ required: !editingItem, message: 'Please upload a section image!' }]}
            >
              <Upload name="sectionImage" listType="picture" beforeUpload={() => false} fileList={fileList} onChange={({ fileList }) => setFileList(fileList)}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-blue-500">Save</Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
