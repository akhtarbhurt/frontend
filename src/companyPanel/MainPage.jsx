import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import CompanyNavbar from "./component/CompanyNavbar";
import Home from "./pages/Home";
import CompanySidebar from "./component/CompanySidebar";
import CompanyProfile from "./pages/CompanyProfile";
import ReviewManagement from "./pages/ReviewManagement";
import { Route, Routes } from "react-router-dom";
import CompanyNotificationSeeAll from "./pages/CompanyNotificationSeeAll";
import CompanyAuth from "./pages/CompanyAuth";
import ResetPassword from "./pages/CompanyResetPassword";
import CompanyResetPassword from "./pages/CompanyResetPassword";

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isResponsive, setIsResponsive] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenSidebar = () => {
    setIsResponsive(!isResponsive);
  };

  const handleTabs = (tab) => {
    setActiveTab(tab);
    if (isResponsive) {
      setIsResponsive(false);
    }
  };

  return (
    <div className="flex">
      <CompanySidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleTabs={handleTabs}
        activeTab={activeTab}
      />
      <div className={`w-full h-full bg-slate-100 flex flex-col relative`}>
        <div className="bg-white">
          <div
            className="absolute left-3 top-5 cursor-pointer block sm:block md:block lg:hidden"
            onClick={handleOpenSidebar}
          >
            <CiMenuBurger />
          </div>
          <div className="max-w-5xl m-auto">
            <CompanyNavbar handleTabs={handleTabs} />
          </div>
        </div>
        <div className="w-full max-w-5xl m-auto">
         <Routes>
          <Route  path="home" element={ <Home/> } />
          <Route  path="companyProfile" element={ <CompanyProfile/> } />
          <Route  path="companyNotification" element={ <CompanyNotificationSeeAll/> } />
          <Route  path="reviewManagement" element={ <ReviewManagement/> } />
          <Route path="profile" element={ <CompanyAuth/> } />
          
         </Routes>
        </div>
      </div>
    </div>
  );
}
