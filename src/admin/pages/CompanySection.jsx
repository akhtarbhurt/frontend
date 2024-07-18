import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Pagination,
  Upload,
  Spin,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const { Search } = Input;
const { Option } = Select;

export default function CompanySection() {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [logoFileList, setLogoFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCompanies(currentPage, pageSize, "");
  }, [currentPage, pageSize]);

  const fetchCompanies = async (page, size, searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/api/v1/userReg`, {
          params: {
            page,
            size,
            search: searchTerm,
          },
        }
      );
      const fetchedCompanies = response.data.result;

      // Sort companies to move matching items to the top
      const sortedCompanies = searchTerm
        ? fetchedCompanies.sort((a, b) => {
            if (a.companyName.toLowerCase().includes(searchTerm.toLowerCase())) return -1;
            if (b.companyName.toLowerCase().includes(searchTerm.toLowerCase())) return 1;
            return 0;
          })
        : fetchedCompanies;

      setCompanies(sortedCompanies);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      toast.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setCurrentPage(1);
    fetchCompanies(1, pageSize, value);
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setLogoFileList(
      company.logo
        ? [{ uid: "-1", name: "logo.png", status: "done", url: company.logo }]
        : []
    );
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_KEY}/api/v1/userReg/${id}`);
      fetchCompanies(currentPage, pageSize, "");
      toast.success("Company deleted successfully");
    } catch (error) {
      console.error("Failed to delete company:", error);
      toast.error("Failed to delete company");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key !== "logo") {
          formData.append(key, values[key]);
        }
      });

      if (logoFileList.length > 0 && logoFileList[0].originFileObj) {
        formData.append("logo", logoFileList[0].originFileObj);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_KEY}/api/v1/userReg/${editingCompany._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedCompany = response.data.result;

      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === updatedCompany._id ? updatedCompany : company
        )
      );

      setIsModalVisible(false);
      setEditingCompany(null);
      setLogoFileList([]);
      toast.success("Company updated successfully");
    } catch (error) {
      console.error("Failed to update company:", error);
      toast.error("Failed to update company");
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
      responsive: ["md"],
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text) => (
        <img src={text} alt="Logo" style={{ width: "100%", height: 50 }} />
      ),
      responsive: ["sm"],
    },
    {
      title: "Service Title",
      key: "companyName",
      dataIndex: "companyName",
      render: (text, record) => (
        <>
          <div>{record.serviceTitle}</div>
          <div style={{ fontSize: "12px", color: "#999" }}>
            {record.companyName}
          </div>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div className=" overflow-auto " style={{ overflowY: "auto", fontSize: "12px" }}>
          {" "}
          {text}
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Site Link",
      dataIndex: "siteLink",
      key: "siteLink",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex flex-col items-center justify-center gap-2">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="company-section min-h-screen p-5 mt-10">
      <div className="search-bar w-full flex justify-end">
        <Search
          placeholder="Search companies"
          onSearch={handleSearch}
          style={{ width: 300, marginBottom: 16 }}
        />
      </div>
      <div className="table-responsive md:overflow-x-auto">
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={companies}
            pagination={true}
            rowKey="_id"
            bordered
            className="bg-white shadow-lg rounded-md overflow-auto "
          
          />
        </Spin>
      </div>
      
      <Modal
        title="Edit Company"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setLogoFileList([]);
        }}
        footer={null}
      >
        <Spin spinning={submitting}>
          <Form
            initialValues={editingCompany}
            onFinish={handleSave}
            layout="vertical"
          >
            <Form.Item
              name="companyName"
              label="Service Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
              </Select>
            </Form.Item>
            <Form.Item name="logo" label="Logo">
              <Upload
                listType="picture"
                fileList={logoFileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setLogoFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Upload Logo</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="bg-blue-500 text-white" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}
