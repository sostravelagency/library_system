import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

// 非同期関数 'get_list_book_by_category' を定義し、'category_id' パラメータを受け取るようにします
const get_list_book_by_category= async (category_id)=> {
     // 'category_id' パラメータをクエリパラメータとして渡して、API_URL + '/api/v1/category/list/book' エンドポイントに HTTP GET リクエストを送信します
    const res= await axios({
        url: API_URL+ "/api/v1/category/list/book",
        method: "get",
        params: {
            category_id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken") // リクエストの 'authorization' ヘッダーを 'accessToken' クッキーの値に設定します
        }
    })
    const result= await res.data
    return result
}

export default get_list_book_by_category
