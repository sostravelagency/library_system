const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const request = {

    // The `get` function retrieves a list of history records from the database and returns them as JSON data
    get: expressAsyncHandler(async (req, res) => {
        try {
            const [rows] = await connection.execute("SELECT *, history.history_id AS id FROM history INNER JOIN user ON user.user_id = history.user_id INNER JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id INNER JOIN book ON book.book_id = book_in_book.book_id")
            return res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // The `delete` function removes a specific history record from the database based on its `id` field, then returns a success message as JSON data
    delete: expressAsyncHandler(async (req, res) => {
        try {           
            const [rows] = await connection.execute("DELETE FROM history WHERE history_id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),

    // The `action` function updates the status of a specific history record in the database based on its `id` field and other data in the request body. If the new status is 2 (indicating that the book has been returned), it also updates the corresponding `book_in_book` record to set its `checkouting` field to 0. The function then returns a success message as JSON data.
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