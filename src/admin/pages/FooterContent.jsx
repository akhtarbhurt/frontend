import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Card, Table, Modal, Spin } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FooterContent() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFooters();
  }, []);

  const fetchFooters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/footer`);
      setDataSource(response.data.result);
    } catch (error) {
      console.error("Failed to fetch footers:", error);
      toast.error("Failed to fetch footers");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append('footerText', values.footerText);

    if (fileList.length > 0) {
      formData.append('footerImage', fileList[0].originFileObj);
    }

    try {
      let response;
      if (editingItem) {
        response = await axios.put(
          `${import.meta.env.VITE_API_KEY}/api/v1/footer/${editingItem._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_API_KEY}/api/v1/footer`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      toast.success(editingItem ? "Footer content updated successfully" : "Footer content created successfully");
      fetchFooters();
      form.resetFields();
      setFileList([]);
      setEditingItem(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit footer content:", error);
      toast.error("Failed to submit footer content");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setFileList(
      record.footerImage
        ? [{ uid: '-1', name: 'footerImage.png', status: 'done', url: record.footerImage }]
        : []
    );
    form.setFieldsValue({ footerText: record.footerText });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/footer/${id}`);
      toast.success("Footer content deleted successfully");
      fetchFooters();
    } catch (error) {
      console.error("Failed to delete footer content:", error);
      toast.error("Failed to delete footer content");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Footer Image',
      dataIndex: 'footerImage',
      key: 'footerImage',
      render: (text) => text ? <img src={text} alt="footer" style={{ width: '50px' }} /> : null,
    },
    {
      title: 'Footer Text',
      dataIndex: 'footerText',
      key: 'footerText',
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
        <h2 className="text-xl font-semibold mb-3">Footer Content Form</h2>
        <Button type="primary" className='bg-blue-500 text-white' onClick={() => setIsModalVisible(true)}>Add New Footer Content</Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-3">Footer Content Table</h2>
        <Spin spinning={loading}>
          <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="_id" />
        </Spin>
      </Card>

      <Modal
        title={editingItem ? "Edit Footer Content" : "Add Footer Content"}
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
              label="Footer Image"
              name="footerImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
              rules={[{ required: !editingItem, message: 'Please upload a footer image!' }]}
            >
              <Upload name="footerImage" listType="picture" beforeUpload={() => false} fileList={fileList} onChange={({ fileList }) => setFileList(fileList)}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Footer Text"
              name="footerText"
              rules={[{ required: true, message: 'Please input the footer text!' }]}
            >
              <Input.TextArea placeholder="Enter footer text" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
