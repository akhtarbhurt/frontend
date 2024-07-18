import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ClientFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/client`);
      setFeedbacks(response.data.result);
      setFilteredFeedbacks(response.data.result);
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEditFeedback = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key !== 'reviewImage') {
          formData.append(key, values[key]);
        }
      });

      if (fileList.length > 0) {
        formData.append('reviewImage', fileList[0]?.originFileObj);
      }

      let response;
      if (isEditMode) {
        response = await axios.put(`${import.meta.env.VITE_API_KEY}/api/v1/client/${currentFeedback._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        response = await axios.post(`${import.meta.env.VITE_API_KEY}/api/v1/client`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 200) {
        message.success(`Feedback ${isEditMode ? 'updated' : 'added'} successfully`);
        fetchFeedbacks();
        setIsModalVisible(false);
        form.resetFields();
        setFileList([]);
      } else {
        message.error(`Failed to ${isEditMode ? 'update' : 'add'} feedback`);
      }
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      message.error(`Failed to submit feedback: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/client/${id}`);
      message.success('Feedback deleted successfully');
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
      setFilteredFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      message.error('Failed to delete feedback');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentFeedback(null);
    setIsModalVisible(true);
  };

  const openEditModal = (record) => {
    setIsEditMode(true);
    setCurrentFeedback(record);
    form.setFieldsValue({
      clientHeading: record.clientHeading,
      reviewHeading: record.reviewHeading,
      reviewText: record.reviewText,
    });
    setFileList([]); // Clear file list when editing
    setIsModalVisible(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = feedbacks.filter(feedback => 
      feedback.clientHeading.toLowerCase().includes(value) || 
      feedback.reviewHeading.toLowerCase().includes(value) ||
      feedback.reviewText.toLowerCase().includes(value)
    );
    setFilteredFeedbacks(filtered);
  };

  const columns = [
    { title: 'Client Heading', dataIndex: 'clientHeading', key: 'clientHeading' },
    { title: 'Review Heading', dataIndex: 'reviewHeading', key: 'reviewHeading' },
    { title: 'Review Text', dataIndex: 'reviewText', key: 'reviewText' },
    {
      title: 'Image',
      dataIndex: 'reviewImage',
      key: 'reviewImage',
      render: (text) => text ? <img src={text} alt="background" style={{ width: "100%" }} /> : null,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => openEditModal(record)}>Edit</Button>
          <Button onClick={() => handleDeleteFeedback(record._id)} danger>Delete</Button>
        </>
      )
    }
  ];

  return (
    <div className='w-full p-5 min-h-screen'>
      <div className="search-bar w-full flex justify-between items-center mb-5">
        <Button type="primary" className='bg-blue-500 mb-5' onClick={openAddModal}>Add Feedback</Button>
        <Input.Search
          placeholder="Search feedback"
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={filteredFeedbacks} rowKey="_id" pagination={{ pageSize: 5 }} />
      </Spin>

      <Modal
        title={isEditMode ? 'Edit Feedback' : 'Add Feedback'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEditFeedback}>
          <Form.Item
            label="Client Heading"
            name="clientHeading"
            rules={[{ required: true, message: 'Please input the client heading!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Review Heading"
            name="reviewHeading"
            rules={[{ required: true, message: 'Please input the review heading!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Review Text"
            name="reviewText"
            rules={[{ required: true, message: 'Please input the review text!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Image"
            name="reviewImage"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e && e?.fileList}
          >
            <Upload
              name="reviewImage"
              listType="picture"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClientFeedback;
