import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [heading, setHeading] = useState([]); // this is heading api
  const [categorys, setCategory] = useState([]); // this is for explore category hook
  const [sections, setSection] = useState([]);
  const [addCompany, setAddCompany] = useState([]);
  const [profile, setProfile] = useState([]);
  const [companyReview, setReview] = useState([]);
  const [client, setClient] = useState([]);
  const [likes, setLikes] = useState({
    likeBy: "",
    like: false,
    userID: "",
  });
  const [userProfile, setUserProfile] = useState();
  const [getLike, setGetLike] = useState([]);
  const [companyLogin, setCompanyLogin] = useState([])
  const [replies, setReplies] = useState([])
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  useEffect(() => {
    const fetchHeadingApi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/heading`
        );
        setHeading(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };

    fetchHeadingApi(); // fetch heading api here
  }, []);

  useEffect(() => {
    const fetchCategoryApi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/category`
        );
        setCategory(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchCategoryApi();
  }, []);

  useEffect(() => {
    const fetchSectionApi = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/section`
        );
        setSection(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchSectionApi();
  }, []);

  useEffect(() => {
    const fetchUserReg = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/userReg`
        );
        setAddCompany(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchUserReg();
  }, []);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/login`);
        setProfile(response.data.result);
        // console.log("profile is", profile);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/api/v1/reviews`
        );
        setReview(response.data.payload);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchReview();
  }, []);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/client`);
        setClient(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchClient();
  }, []);

  
  useEffect(() => {
    const fetchGetLikes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/like`);
        setGetLike(response.data.result);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchGetLikes();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/`); 
        setUserProfile(response.data);
      } catch (err) {
        // console.log("Error", err);
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    const fetchComanyLoogin = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/companyLogin`); 
        setCompanyLogin(response.data)
      } catch (err) {
        // console.log("Error", err);
      }
    };
    fetchComanyLoogin()
  }, []);

  useEffect(()=>{
    const fetchCompaniesReplies = async ()=>{
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/api/v1/replies`)
        setReplies(response.data.payload)
      } catch (error) {
        // console.log(error)
      }
    }

    fetchCompaniesReplies()
  },[])

  return (
    <AppContext.Provider
      value={{
        heading,
        categorys,
        sections,
        addCompany,
        profile,
        companyReview,
        client,
        likes,
        setLikes,
        userProfile,
        getLike,
        companyLogin,
        replies,
        setIsWarningVisible,
        isWarningVisible

      }}
    >
      {" "}
      {children}{" "}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
