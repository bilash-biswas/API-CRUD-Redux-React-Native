import axios from "axios";
import { API_URL } from "./API_URL";

export const deleteStudent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}?id=${id}`);
        return response.data.message;
    } catch (error) {
        return error.response?.data?.message || error.message;
    }
};
