import React, { useState, useEffect } from 'react';
import { Input, Button, Table, Form, Upload, Modal, notification } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [currentPage, pageSize, searchTerm]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/category`, {
        params: {
          page: currentPage,
          size: pageSize,
          search: searchTerm,
        },
      });
      let fetchedCategories = response.data.result;

      if (searchTerm) {
        fetchedCategories = fetchedCategories.sort((a, b) => {
          if (a.category.toLowerCase().includes(searchTerm.toLowerCase())) return -1;
          if (b.category.toLowerCase().includes(searchTerm.toLowerCase())) return 1;
          return 0;
        });
      }

      setCategories(fetchedCategories);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      notification.error({ message: "Failed to fetch categories" });
    }
    setLoading(false);
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    formData.append('category', values.category);

    if (fileList.length > 0) {
      formData.append('catImage', fileList[0].originFileObj);
    }

    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:3000/api/v1/category/${editingCategory._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        notification.success({ message: "Category updated successfully" });
      } else {
        await axios.post(
          'http://localhost:3000/api/v1/category',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        notification.success({ message: "Category created successfully" });
      }
      fetchCategories();
      form.resetFields();
      setFileList([]);
      setEditingCategory(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to submit category:", error);
      notification.error({ message: "Failed to submit category" });
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setFileList(
      record.catImage
        ? [{ uid: '-1', name: 'catImage.png', status: 'done', url: record.catImage }]
        : []
    );
    form.setFieldsValue({ category: record.category });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/category/${id}`);
      notification.success({ message: "Category deleted successfully" });
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
      notification.error({ message: "Failed to delete category" });
    }
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Image',
      dataIndex: 'catImage',
      key: 'catImage',
      render: (text) => text ? <img src={text} alt="category" style={{ width: '50px' }} /> : null,
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
    <div className={`w-full p-5 min-h-screen `}>
      <div className="flex justify-between mb-5 mt-12">
        <Button type="primary" className='bg-blue-500 text-white' onClick={() => {
          form.resetFields();
          setFileList([]);
          setEditingCategory(null);
          setIsModalVisible(true);
        }}>
          Add New Category
        </Button>
        <Input.Search
          placeholder="Search categories"
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          style={{ width: 300 }}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        loading={loading}
      />

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setFileList([]);
          setEditingCategory(null);
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input the category!' }]}
          >
            <Input placeholder="Category" />
          </Form.Item>

          <Form.Item
            label="Category Image"
            name="catImage"
            valuePropName="fileList"
            getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}
          >
            <Upload
              name="catImage"
              listType="picture"
              fileList={fileList}
              beforeUpload={() => false}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" className='bg-blue-500 text-white' htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
