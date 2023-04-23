import axios from "axios"
import { API_URL } from "../../config"

// この関数は指定された時間範囲内の統計データを取得します
// 関数は2つの引数を取ります：開始時間と終了時間
const get_stats_range= async (time_start, time_end)=> {
    // 指定されたURL、メソッド、およびパラメータを使用してサーバーにaxiosリクエストが行われます
    const res= await axios({
        url: API_URL+ "/api/v2/stats",
        method: "get",
        params: {
            time_range: true, // 時間範囲を使用するようにクエリを指定します
            time_start, // 範囲の開始時間
            time_end // 範囲の終了時間
        }

    })
    const result= await res.data
    return result
}

export default get_stats_range
