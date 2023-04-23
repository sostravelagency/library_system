const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const confirm_borrow_book= expressAsyncHandler(async (req, res)=> {
    try {
        // この本とユーザーの履歴テーブルにレコードがあるかどうか、状態が1でis_borrowが0かどうかを確認します
        const [rows]= await connection.execute("SELECT * FROM history WHERE book_id= ? AND user_id= ? AND state= 1 AND is_borrow= 0", [req.body.book_id, req.body.user_id])
        if(rows.length > 0) {
            // レコードが存在する場合、is_borrowを1に更新し、time_borrowを現在の日付と時刻に設定します
            const [rows1]= await connection.execute("UPDATE history SET is_borrow= 1, time_borrow= ? WHERE book_id= ? AND user_id= ? AND state= 1", [new Date(), req.body.book_id, req.body.user_id])
            return res.status(200).json({borrow: true, timeup: false})
        }
        else {
            // レコードが存在しない場合、borrowをfalse、timeupをtrueで返します
            return res.status(200).json({borrow: false, timeup: true})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= confirm_borrow_book
