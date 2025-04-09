import axios from "axios";
import { API_URL } from "./API_URL";

export const addStudent = async ({ name, email }) => {
    try {
        const response = await axios.post(API_URL, { name, email }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data; 
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data?.message
        };
    }
};
