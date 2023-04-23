import axios from "axios"
import { API_URL } from "../../config"

// この関数は、ユーザーと司書に関する会話リストを取得するものです
const get_list_conversation= async ()=> {
    const res= await axios({
        url: API_URL+ "/conversation/list",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_list_conversation
