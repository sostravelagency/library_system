const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_list_record= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT history.history_id AS id, history.user_id, history.book_id, history.state, history.is_borrow, user.user_name, book.book_name FROM history INNER JOIN user ON user.user_id = history.user_id INNER JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id INNER JOIN book ON book.book_id = book_in_book.book_id")
        return res.status(200).json(rows)
    }
    catch(e) {
        return res.status(500).json(e)
    }
})

module.exports= get_list_record