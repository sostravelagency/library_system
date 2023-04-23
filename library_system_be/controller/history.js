const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

// このエンドポイントは、ユーザーの活動履歴、読んだ本、評価などを取得するためのものです。
const get_history= expressAsyncHandler(async (req, res)=> {
    try {
        // データベースからユーザーの活動を取得し、LEFT JOINとINNER JOINを使用して関連するテーブルと結合します。
        const [rows]= await connection.execute("SELECT *, history.history_id AS id, book.book_id AS book_id FROM history INNER JOIN user ON user.user_id = history.user_id LEFT JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id LEFT JOIN book ON book.book_id = book_in_book.book_id LEFT JOIN rating ON rating.book_id = book.book_id WHERE history.user_id= ? GROUP BY history.history_id", [req.query.user_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports= get_history
