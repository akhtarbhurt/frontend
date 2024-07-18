import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Input, Upload, message, Spin } from 'antd';
import { getBlogs, createBlog, updateBlog, deleteBlog } from './api';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BlogsTable = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await getBlogs();
      setBlogs(data.result);
      setFilteredBlogs(data.result);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load blogs');
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setEditingBlog(record);
    form.setFieldsValue({
      ...record,
      blogImage: record.blogImage ? [{
        url: record.blogImage,
        name: 'image',
        status: 'done',
      }] : [],
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs();
      message.success('Blog deleted successfully');
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const handleFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('blogTitle', values.blogTitle);
      formData.append('blogDescription', values.blogDescription);
      if (values.blogImage && values.blogImage[0] && values.blogImage[0].originFileObj) {
        formData.append('blogImage', values.blogImage[0].originFileObj);
      }

      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        message.success('Blog updated successfully');
      } else {
        await createBlog(formData);
        message.success('Blog created successfully');
      }

      fetchBlogs();
      setModalVisible(false);
      form.resetFields();
      setEditingBlog(null);
    } catch (error) {
      message.error('Failed to save blog');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = blogs.filter(blog => 
      blog.blogTitle.toLowerCase().includes(value) || 
      blog.blogDescription.toLowerCase().includes(value)
    );
    setFilteredBlogs(filtered);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'blogTitle',
      key: 'blogTitle', 
      
    },
    {
      title: 'Description',
      dataIndex: 'blogDescription',
      key: 'blogDescription',
      render: (text)=> <div className=' text-[12px] overflow-y-auto ' > {text} </div>
    },
    {
      title: 'Image',
      dataIndex: 'blogImage',
      key: 'blogImage',
      render: (text) => <img src={text} alt="blog" style={{ width: "100%" }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span className='flex flex-col gap-3' >
          <Button  icon={ <EditOutlined/>  } onClick={() => handleEdit(record)}/>
          <Button danger icon={ <DeleteOutlined/> } onClick={() => handleDelete(record._id)}/>
        </span>
      ),
    },
  ];

  return (
    <div className='min-h-screen'>
      <div className="search-bar w-full flex justify-end mb-4 mt-20">
        <Input.Search
          placeholder="Search blogs"
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredBlogs}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          className='  '
        />
      </Spin>
      <Modal
        title={editingBlog ? 'Edit Blog' : 'Add Blog'}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item name="blogTitle" label="Blog Title" rules={[{ required: true, message: 'Please input the blog title!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="blogDescription" label="Blog Description" rules={[{ required: true, message: 'Please input the blog description!' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="blogImage" label="Blog Image" valuePropName="fileList" getValueFromEvent={(e) => e && e.fileList}>
            <Upload name="blogImage" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogsTable;
