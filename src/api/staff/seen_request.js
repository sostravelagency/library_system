import axios from "axios"
import { API_URL } from "../../config"

const seen_request= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v2/read/notification", 
        method: "post",
    })
    const result= await res.data
    return result
}

export default seen_request