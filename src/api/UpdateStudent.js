import axios from "axios"
import { API_URL } from "./API_URL"

export const updateStudent = async ({id, name, email}) => {
    try {
        const response = await axios.put(API_URL, {
            id : id,
            name : name,
            email : email
        });
        return response.data.message;
    } catch (error) {
        return error.message;
    }
}