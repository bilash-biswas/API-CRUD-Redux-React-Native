import axios from "axios"
import { API_URL } from "./API_URL";

export const fetchStudent = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        // Handle the error more effectively
        if (axios.isAxiosError(error)) {
            // Axios-specific error handling
            console.error("Axios error fetching student:", error.message);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }
        } else {
            // Non-Axios errors (e.g., network errors, syntax errors, etc.)
            console.error("Unexpected error fetching student:", error);
        }
        throw error; // Re-throw the error to let the caller handle it
    }
};


