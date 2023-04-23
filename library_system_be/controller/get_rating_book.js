const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_rating_book= expressAsyncHandler(async (req, res)=> {
    try {
        // SQL文を実行して、リクエストクエリのbook_idパラメータに一致するratingテーブルのすべての行を選択するためにconnection.execute()を使用します
        const [rows]= await connection.execute("SELECT * FROM rating WHERE book_id =? ", [req.query?.book_id])
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= get_rating_book
