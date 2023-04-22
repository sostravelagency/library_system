import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const update_password= async (oldPassword, newPassword)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/update-password",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            oldPassword, newPassword
        }
    })
    const result= await res.data
    return result
}

export default update_password