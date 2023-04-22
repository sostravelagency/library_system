const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

// This is an endpoint that retrieves the history of a user's activities, including books they have read, rated,...
const get_history= expressAsyncHandler(async (req, res)=> {
    try {
        // Retrieves user's activities from the database and joins them with the relevant tables using LEFT JOIN and INNER JOIN
        const [rows]= await connection.execute("SELECT *, history.history_id AS id, book.book_id AS book_id FROM history INNER JOIN user ON user.user_id = history.user_id LEFT JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id LEFT JOIN book ON book.book_id = book_in_book.book_id LEFT JOIN rating ON rating.book_id = book.book_id WHERE history.user_id= ? GROUP BY history.history_id", [req.query.user_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports= get_history