import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_KEY}/api/v1/`; // Replace with your backend URL

export const getBlogs = () => axios.get(`${API_URL}/blog`);
export const createBlog = (data) => axios.post(`${API_URL}/blog`, data);
export const updateBlog = (id, data) => axios.put(`${API_URL}/blog/${id}`, data);
export const deleteBlog = (id) => axios.delete(`${API_URL}/blog/${id}`);
