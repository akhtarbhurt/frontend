import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./components/Home";
import Looter from "./components/Looter";
import UserDashboard from "./components/UserDashboard";
import UserSetting from "./components/UserSetting";
import About from "./components/About";
import Error from "./components/Error";
import Login from "./components/Login";
import Reviewdone from "./components/Reviewdone";
import Register from "./components/Register";
import Help from "./components/Help";
import Mission from "./components/Mission";
import Contact from "./components/Contact";
import ApnaNews from "./components/ApnaNews";
import SearchResultPage from "./components/SearchResultPage";
import BusinessHomePAge from "./components/BusinessHomePAge";
import PublicReviewPage from "./components/PublicReviewPage";
import Faq from "./components/Faq";
import Reviews from "./components/Reviews";
import Main from "./admin/Main";
import UserRegistration from "./components/UserRegistration";
import { ThemeProvider } from "./utils/useContext";
import Forgetpassword from "./components/Forgetpassword";
import Logout from "./components/Logout";
import SeeAll from "./admin/pages/SeeAll";
import MainPage from "./companyPanel/MainPage";
import CompanyLogin from "./components/CompanyLogin";
import CompanyRegisterr from "./components/CompanyRegister";
import CompanyProfile from "./companyPanel/pages/CompanyProfile";
import VerifyEmail from "../src/components/verifyEmail";
import AddCompany from "./admin/pages/AddCompany";
import ProtectedRoute from "./components/ProtectedRoute";
import AllCategories from "./components/AllCategories";
import UserProfile from "./components/UserProfile";
import CompanyResetPassword from "./companyPanel/pages/CompanyResetPassword";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
function App() {
  const [count, setCount] = useState(0);

  const [profile, setprofile] = useState(
    localStorage.getItem("apnaconnectionprofile") || false
  );
  const [profilesrc, setprofilesrc] = useState(
    localStorage.getItem("tokenapnaconnection") || ""
  );
  const [showLogin, setShowLogin] = useState(false);
  const [dashboard, setDashboard] = useState(
    localStorage.getItem("apnaconnectionadmin") || false
  );
  const [name, setName] = useState("riyyan");
  return (
    <div>
      <ThemeProvider
        value={{
          profile,
          setprofile,
          profilesrc,
          dashboard,
          setDashboard,
          setprofilesrc,
          showLogin,
          setShowLogin,
          name,
          setName,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/businesshomepage" element={<BusinessHomePAge />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/searchresultpage/:id"
              element={<SearchResultPage />}
            />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<Error />} />
            <Route path="/reviewdone" element={<Reviewdone />} />
            <Route path="/review/:companyID" element={<Reviews />} />
            <Route path="/help" element={<Help />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/apnanews" element={<ApnaNews />} />

            <Route
              path="/publicreviewpage/:id"
              element={<PublicReviewPage />}
            />
            <Route path="/usersetting" element={<UserSetting />} />
            <Route path="/footer" element={<Looter />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/userRegistration" element={<UserRegistration />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/companyRegister" element={<CompanyRegisterr />} />
            <Route path="/companyLogin" element={<CompanyLogin />} />
            <Route path="/companyProfile" element={<CompanyProfile />} />
            <Route path="/verify-email/:id" element={<VerifyEmail />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/allcategories" element={<AllCategories />} />

            <Route path="/admin/*" element={<Main />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/home" replace />}
              />
            </Route>
            {/* this is company panel  */}
            <Route element={<ProtectedRoute />}>
              <Route path="/companyPanel/*" element={<MainPage />} />
            </Route>
            <Route
              path="/companyPanel"
              element={<Navigate to={"/companyPanel/home"} />}
            />
            <Route
              path="/reset-password/:token"
              element={<CompanyResetPassword />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
