import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
export const fetchAllCourses = async () => { 
    const response = await axios.get(`${API_BASE}/api/courses`);
    return response.data;
};