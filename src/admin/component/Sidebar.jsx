import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { BsActivity } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { MdFactory } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { Tooltip, Dropdown, Menu } from "antd";
import { RxCross1 } from "react-icons/rx";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
  isResponsive,
  handleOpenSidebar,
 
  activeTab,
}) {
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const handleCompanyClick = () => {
    setCompanyDropdownOpen(!isCompanyDropdownOpen);
  };

  const companyMenu = (
    <Menu>
      <Menu.Item key="addCompany" >
        <Link to={"/admin/addCompany"}>Add Company</Link>
      </Menu.Item>
      <Menu.Item key="companyList" >
        <Link to={"/admin/companyList"}>Company List</Link>
      </Menu.Item>
    </Menu>
  );

  const contentManagement = (
    <Menu>
      <Menu.Item key="addCompany">
        <Link to={"/admin/headings"}>Headings</Link>
      </Menu.Item>
      <Menu.Item key="category" >
        <Link to={"/admin/category"}>Category</Link>
      </Menu.Item>
      <Menu.Item key="section" >
        <Link to={"/admin/section"}>Section</Link>
      </Menu.Item>
      <Menu.Item
        key="clientManagement"
        
      >
        <Link to={"/admin/clientManagement"}>Client Management</Link>
      </Menu.Item>
      <Menu.Item key="companyList" >
        <Link to={"/admin/footerContent"}>Footer Content</Link>
      </Menu.Item>
    </Menu>
  );

  const blogManagement = (
    <Menu>
      <Menu.Item key="addCompany" >
        <Link to={"/admin/addBlog"}>Add Blog</Link>
      </Menu.Item>
      <Menu.Item key="companyList" >
        <Link to={"/admin/blogTable"}>Blog Table</Link>
      </Menu.Item>
    </Menu>
  );

  const clientManagement = (
    <Menu>
      <Menu.Item
        key="clientManagement"
        
      >
        Client Management
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div
        className={`h-full bg-blue-600 hidden sm:hidden md:hidden lg:flex lg:flex-col lg:items-center  transition-all duration-300 relative ${
          isSidebarOpen ? "w-[250px]" : "w-[100px]"
        } `}
      >
        <div className="mt-2">
          <h3
            className={`text-white text-start mt-10 ${
              isSidebarOpen ? "text-md" : "text-[10px]"
            }`}
          >
            Admin Dashboard
          </h3>
        </div>
        <nav className="flex justify-center flex-grow">
          <ul className="text-white flex flex-col mt-10 gap-10 text-lg">
            <Tooltip placement="right" title={isSidebarOpen ? "" : "Dashboard"}>
              <Link to={'/admin/home'} >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex gap-3 items-center ${
                  activeTab === "home" ? "bg-white text-black" : "text-white"
                }`}
              
              >
                <IoIosHome />
                <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  Dashboard
                </p>
              </li>
              </Link>
            </Tooltip>

            <Dropdown
              overlay={companyMenu}
              trigger={["hover"]}
              placement="rightTop"
            >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex flex-col gap-3 items-start ${
                  activeTab === "company" ? "bg-white text-black" : "text-white"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <MdFactory />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Company Section
                  </p>
                </div>
              </li>
            </Dropdown>
            <Dropdown
              overlay={contentManagement}
              trigger={["hover"]}
              placement="rightTop"
            >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex flex-col gap-3 items-start ${
                  activeTab === "contentManagement"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <MdFactory />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Content Management
                  </p>
                </div>
              </li>
            </Dropdown>
            <Dropdown
              overlay={blogManagement}
              trigger={["hover"]}
              placement="rightTop"
            >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex flex-col gap-3 items-start ${
                  activeTab === "blogManagement"
                    ? "bg-white text-black"
                    : "text-white"
                }`}
              >
                <div className="flex gap-3 items-center">
                  <MdFactory />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Blog Management
                  </p>
                </div>
              </li>
            </Dropdown>

            <Tooltip placement="right" title={isSidebarOpen ? "" : "Setting"}>
              <Link to={'/admin/setting'} >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex gap-3 items-center ${
                  activeTab === "setting" ? "bg-white text-black" : "text-white"
                }`}
                
              >
                <CiSettings />
                <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  Setting
                </p>
              </li>
              </Link>
            </Tooltip>
            <Tooltip placement="right" title={isSidebarOpen ? "" : "Setting"}>
              <Link to={'/admin/report'} >
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex gap-3 items-center ${
                  activeTab === "setting" ? "bg-white text-black" : "text-white"
                }`}
               
              >
                <CiSettings />
                <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  Report
                </p>
              </li>
              </Link>
            </Tooltip>
          </ul>
        </nav>
        {/* Fixed and centered toggle button */}
        <div className="flex justify-center mt-auto">
          <button
            onClick={toggleSidebar}
            className="text-white fixed bottom-10 bg-black p-2 rounded-full"
          >
            {isSidebarOpen ? <FaAnglesRight /> : <FaAnglesLeft />}
          </button>
        </div>
      </div>

      {/* Responsive sidebar */}
      {isResponsive && (
        <div
          className={`h-full bg-blue-600 flex flex-col lg:items-center justify-between transition-all duration-300 fixed w-[250px] top-0 z-10`}
        >
          <div onClick={handleOpenSidebar}>
            <span className="absolute right-5 top-5 text-white font-semibold">
              <RxCross1 />
            </span>
          </div>
          <div className="mt-2">
            <h3
              className={`text-white text-center mt-10 ${
                isSidebarOpen ? "text-md" : "text-[10px]"
              }`}
            >
              Admin Dashboard
            </h3>
          </div>
          <nav className="flex justify-center flex-grow">
            <ul className="text-white flex flex-col mt-10 gap-10 text-lg">
              <Tooltip
                placement="right"
                title={isSidebarOpen ? "" : "Dashboard"}
              >
                <Link to={'/admin/home'} >
                <li
                  className="cursor-pointer bg-white text-black rounded-md p-1 px-5 flex gap-3 items-center"
                 
                >
                  <IoIosHome />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Dashboard
                  </p>
                </li>
                </Link>
              </Tooltip>

              <Dropdown
                overlay={companyMenu}
                trigger={["hover"]}
                placement="rightTop"
              >
                <li className="cursor-pointer p-1 px-5 flex gap-3 items-center">
                  <BsActivity />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Company Section
                  </p>
                </li>
              </Dropdown>
              <Dropdown
                overlay={contentManagement}
                trigger={["hover"]}
                placement="rightTop"
              >
                <li className="cursor-pointer p-1 px-5 flex gap-3 items-center">
                  <BsActivity />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Content Management
                  </p>
                </li>
              </Dropdown>
              <Dropdown
                overlay={blogManagement}
                trigger={["hover"]}
                placement="rightTop"
              >
                <li className="cursor-pointer p-1 px-5 flex gap-3 items-center">
                  <BsActivity />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Blog Management
                  </p>
                </li>
              </Dropdown>

              <Tooltip placement="right" title={isSidebarOpen ? "" : "Setting"}>
                <Link to={"/admin/setting"}>
                  <li className="cursor-pointer p-1 px-5 flex gap-3 items-center">
                    <CiSettings />
                    <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                      Setting
                    </p>
                  </li>
                </Link>
              </Tooltip>
              <Tooltip placement="right" title={isSidebarOpen ? "" : "Report"}>
                <li className="cursor-pointer p-1 px-5 flex gap-3 items-center">
                  <CiSettings />
                  <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                    Report
                  </p>
                </li>
              </Tooltip>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
