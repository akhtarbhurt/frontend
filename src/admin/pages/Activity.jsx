import React, { useEffect, useState } from "react";
import { Input, Pagination, Menu, Button, Table, Dropdown } from "antd";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";

const { Search } = Input;

export default function Activity() {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCompanies(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchCompanies = async (page, size) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/userReg?page=${page}&size=${size}`);
      setCompanies(response.data.result);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      toast.error("Failed to fetch companies");
    }
  };

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/userReg?search=${value}`);
      setCompanies(response.data.result);
      setTotal(response.data.total);
      setCurrentPage(1); // Reset to first page
    } catch (error) {
      console.error("Failed to search companies:", error);
      toast.error("Failed to search companies");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>Remove</span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>Block</span>
      </Menu.Item>
      <Menu.Item key="3">
        <span>Unblock</span>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "#",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Owner",
      dataIndex: "personName",
      key: "personName",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span className={text === "Approved" ? "text-green-500" : text === "Blocked" ? "text-red-500" : "text-yellow-500"}>
          {text}
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button icon={<HiOutlineDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="h-screen w-full mt-10">
        <div className="text-end">
          <Search
            placeholder="Search companies"
            allowClear
            onSearch={handleSearch}
            style={{ width: 200, marginBottom: 5 }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 w-full">
              <div className="overflow-hidden">
                <Table
                  columns={columns}
                  dataSource={companies}
                  pagination={false}
                  rowKey="_id"
                  bordered
                  className="bg-white shadow-lg rounded-md  "
                />
                <div className="p-3 text-end">
                  <Pagination
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger
                    onShowSizeChange={(current, size) => setPageSize(size)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
