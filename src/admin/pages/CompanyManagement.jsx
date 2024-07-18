import React, { useEffect, useState } from "react";
import AddCompany from "./AddCompany";
import CompanySection from "./CompanySection";
import axios from "axios";
import { message } from "antd";

export default function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCompanies(currentPage, pageSize, "");
  }, [currentPage, pageSize]);

  const fetchCompanies = async (page, size, searchTerm) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/userReg`, {
        params: {
          page,
          size,
          search: searchTerm,
        },
      });
      setCompanies(response.data.result);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      message.error("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = (newCompany) => {
    setCompanies((prevCompanies) => [newCompany, ...prevCompanies]);
    fetchCompanies(currentPage, pageSize, "");
  };

  return (
    <div>
      <AddCompany onAddCompany={handleAddCompany} />
      <CompanySection
        companies={companies}
        fetchCompanies={fetchCompanies}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
        loading={loading}
      />
    </div>
  );
}
