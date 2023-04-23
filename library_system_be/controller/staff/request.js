const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const request = {

    // `get`関数はデータベースから履歴レコードのリストを取得し、JSONデータとして返します
    get: expressAsyncHandler(async (req, res) => {
        try {
            const [rows] = await connection.execute("SELECT *, history.history_id AS id FROM history INNER JOIN user ON user.user_id = history.user_id INNER JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id INNER JOIN book ON book.book_id = book_in_book.book_id")
            return res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // `delete`関数は、`id`フィールドに基づいてデータベースから特定の履歴レコードを削除し、成功メッセージをJSONデータとして返します
    delete: expressAsyncHandler(async (req, res) => {
        try {           
            const [rows] = await connection.execute("DELETE FROM history WHERE history_id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // `action`関数は、`id`フィールドとリクエストボディ内の他のデータに基づいて、データベース内の特定の履歴レコードのステータスを更新します。新しいステータスが2（書籍が返却されたことを示す）の場合、対応する`book_in_book`レコードを更新して、その`checkouting`フィールドを0に設定します。その後、関数は成功メッセージをJSONデータとして返します。
    action: expressAsyncHandler(async(req, res)=> {
        try {
            const [rows] = await connection.execute("UPDATE history SET state= ?, time_approve= ?, is_borrow= ?, borrow_time= ? WHERE history_id= ?", [req.body.status, new Date(), req.body?.is_borrow || 0, parseInt(req.body?.day_borrow) || 0, req.body.id])
            if(parseInt(req.body.status)=== 2) {
                const [rows]= await connection.execute("SELECT book_in_book.book_in_book_id FROM book_in_book INNER JOIN history ON history.book_id = book_in_book.book_in_book_id WHERE history.history_id= ?", [req.body.id])
                const [rows1]= await connection.execute("UPDATE book_in_book SET checkouting= 0 WHERE book_in_book_id= ?", [req.body.book_id])
            }
            return res.status(200).json({update: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports = request
