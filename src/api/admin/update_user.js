import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// This function updates a user's information by sending a POST request to the API with the new information and user ID
const update_user= async (userName, phoneNumber, address, email, id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/update", // API endpoint for updating a user
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // Authorization token for accessing the API
        },
        data: {
            userName, phoneNumber, address,email, user_id: id //New username, phone number, address, email, ID of the user to be updated
        }
    })
    const result= await res.data
    return result
}

export default update_user