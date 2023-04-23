import axios from "axios"
import { API_URL } from "../../config"

// この関数は注文を削除するためのものです
const delete_request= async (id)=> {
    const res= await axios({
        url: API_URL+ "/staff/request/delete",
        method: "post",
        data: {
            id
        }
    })
    const result= await res.data
    return result
}

export default delete_request
