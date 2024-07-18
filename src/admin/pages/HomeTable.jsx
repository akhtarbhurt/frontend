import React, { useState } from "react";
import { Form, Input, Button, Upload, Card, Table } from "antd";

export default function HomeTable({handleTabs}) {
    const [dataSource, setDataSource] = useState()
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
    },
    {
      title: "Background Image",
      dataIndex: "backgroundImage",
      key: "backgroundImage",
      render: (fileList) =>
        fileList && fileList.length > 0 ? (
          <img
            src={URL.createObjectURL(fileList[0].originFileObj)}
            alt="background"
            style={{ width: "50px" }}
          />
        ) : null,
    },
    {
      title: "Category Heading",
      dataIndex: "categoryHeading",
      key: "categoryHeading",
    },
    {
      title: "Category Button Text",
      dataIndex: "categoryButtonText",
      key: "categoryButtonText",
    },
    {
      title: "Section Heading",
      dataIndex: "sectionHeading",
      key: "sectionHeading",
    },
    {
      title: "Section Text",
      dataIndex: "sectionText",
      key: "sectionText",
    },
    {
      title: "Section Button Text",
      dataIndex: "sectionButtonText",
      key: "sectionButtonText",
    },
    {
      title: "Section Image",
      dataIndex: "sectionImage",
      key: "sectionImage",
      render: (fileList) =>
        fileList && fileList.length > 0 ? (
          <img
            src={URL.createObjectURL(fileList[0].originFileObj)}
            alt="section"
            style={{ width: "50px" }}
          />
        ) : null,
    },
    {
      title: "Review Heading",
      dataIndex: "reviewHeading",
      key: "reviewHeading",
    },
    {
      title: "Review Text",
      dataIndex: "reviewText",
      key: "reviewText",
    },
    {
      title: "Client Heading",
      dataIndex: "clientHeading",
      key: "clientHeading",
    },
  ];
  return (
    <>
      <div className=" w-full h-screen  " >
        <div className=" w-full text-end mt-10 " >
            <button className="bg-blue-500 text-white p-2 rounded-md border-0" onClick={()=> handleTabs("homeContent") } > Back </button>
        </div>
        <Card className="mt-10" >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={true}
            scroll={{ x: true }}
          />
        </Card>
      </div>
    </>
  );
}
