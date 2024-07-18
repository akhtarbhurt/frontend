import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import { MdFactory } from "react-icons/md";
import { Tooltip, Button } from "antd";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CompanySidebar({
  isSidebarOpen,
  toggleSidebar,
  handleTabs,
  activeTab,
}) {
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const handleCompanyClick = () => {
    setCompanyDropdownOpen(!isCompanyDropdownOpen);
  };

  return (
    <div
      className={`min-h-screen  bg-blue-600 hidden sm:hidden md:hidden lg:flex lg:flex-col lg:items-center transition-all duration-300 relative ${
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
        <ul className="text-white flex flex-col mt-10 gap-10 text-[15px]">
          <Tooltip placement="right" title={isSidebarOpen ? "" : "Dashboard"}>
            <Link to={"/companyPanel/home"}>
              <li
                className={`cursor-pointer rounded-md p-1 px-5 flex gap-3 items-center ${
                  activeTab === "home" ? "bg-white text-black" : "text-white"
                }`}
                onClick={() => handleTabs("home")}
              >
                <IoIosHome />
                <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                  Dashboard
                </p>
              </li>
            </Link>
          </Tooltip>
          <Link to={'/companyPanel/reviewManagement'} >
          <li
            className={`cursor-pointer rounded-md p-1 px-5 flex flex-col gap-3 items-start ${
              activeTab === "reviewManagement"
                ? "bg-white text-black"
                : "text-white"
            }`}
            onClick={() => handleTabs("reviewManagement")}
          >
            <div className="flex gap-3 items-center">
              <MdFactory />
              <p className={`${isSidebarOpen ? "block" : "hidden"}`}>
                Review Management
              </p>
            </div>
          </li>
          </Link>
        </ul>
      </nav>
      {/* Fixed and centered toggle button */}
      <div className="flex justify-center mt-auto">
        <Button
          onClick={toggleSidebar}
          className="text-white fixed bottom-10 bg-black p-2 rounded-full"
        >
          {isSidebarOpen ? <FaAnglesRight /> : <FaAnglesLeft />}
        </Button>
      </div>
    </div>
  );
}
