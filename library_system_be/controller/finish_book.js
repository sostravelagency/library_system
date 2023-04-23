const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const finish_book= expressAsyncHandler(async (req, res)=> {
    try {
        // MySQLクエリを使用して、`history_id`がリクエストボディで渡された`history_id`に一致し、`user_id`が`req.user`に格納された認証済みユーザーIDに一致する場合に、`history`テーブルを更新します。
        const [rows]= await connection.execute("UPDATE history SET state= 5 WHERE history_id= ? AND user_id= ?", [req.body.history_id, req.user])
        return res.status(200).json({finish: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= finish_book
