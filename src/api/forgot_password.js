import axios from "axios"
import { API_URL } from "../config"

// Define a function called "forgot_password" that accepts an email address as an argument
const forgot_password= async (email)=> {
    const res= await axios({
        url: API_URL+ "/forgot-password",
        method: "post",
        data: {
            email
        }
    })
    const result= await res.data
    return result
}

export default forgot_password