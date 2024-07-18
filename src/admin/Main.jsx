import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./component/AdminNavbar";
import Sidebar from "./component/Sidebar";
import HomePage from "./pages/HomePage";
import Setting from "./pages/Setting";
import CompanySection from "./pages/CompanySection";
import AddCompany from "./pages/AddCompany";
import HomeContent from "./pages/HomeContent";
import FooterContent from "./pages/FooterContent";
import AddBlog from "./pages/AddBlog";
import BlogTable from "./pages/BlogTable";
import HomeTable from "./pages/HomeTable";
import Heading from "./pages/Heading";
import Categories from "./pages/Categories";
import Section from "./pages/Section";
import ClientFeedback from "./pages/ClientFeedback";
import Report from "./pages/Report";
import { CiMenuBurger } from "react-icons/ci";
import SeeAll from "./pages/SeeAll";

export default function Main() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isResponsive, setIsResponsive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenSidebar = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className="flex">
     <div>
     <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isResponsive={isResponsive}
        handleOpenSidebar={handleOpenSidebar}
      />
     </div>
      <div className={`w-full h-full bg-slate-100 flex flex-col relative`}>
        <div className="bg-white">
          <div
            className="absolute left-3 top-5 cursor-pointer block sm:block md:block lg:hidden"
            onClick={handleOpenSidebar}
          >
            <CiMenuBurger />
          </div>
          <div className="max-w-5xl m-auto">
            <AdminNavbar />
           
          </div>
        </div>
        <div className="w-full max-w-5xl m-auto">
         
          <Routes>
            <Route path="home" element={ <HomePage/> } />
            <Route path="setting" element={<Setting />} />
            <Route path="companyList" element={<CompanySection />} />
            <Route path="addCompany" element={<AddCompany />} />
            <Route path="layout" element={<Heading />} />
            <Route path="footerContent" element={<FooterContent />} />
            <Route path="category" element={<Categories />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="blogTable" element={<BlogTable />} />
            <Route path="homeTable" element={<HomeTable />} />
            <Route path="section" element={<Section />} />
            <Route path="clientManagement" element={<ClientFeedback />} />
            <Route path="report" element={<Report />} />
            <Route path="headings" element={ <Heading/> } />
            <Route path="section" element={<Section/>} />
            <Route path="seeAll" element={ <SeeAll/> } />
          </Routes>
        </div>
      </div>
    </div>
  );
}
