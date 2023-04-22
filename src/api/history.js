import axios from "axios"
import Cookies from "js-cookie"
const { API_URL } = require("../config")

const get_history= async ()=> {
    // send a GET request to the API endpoint for user's borrow history
    const res= await axios({
        url: API_URL+ "/api/history",
        method: "get",
        params: {
            user_id: Cookies.get("uid") // include the user ID as a query parameter
        }
    })
    const result= await res.data
    return result
}

export default get_history