import axios from "axios"
import { API_URL } from "../config"

// This function takes an email as input and verifies it through an API endpoint
const verify_signup= async (email)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/verify_email",
        method: "post",
        data: {
            email
        }
    })
    const result= await res.data
    return result
}

export default verify_signup