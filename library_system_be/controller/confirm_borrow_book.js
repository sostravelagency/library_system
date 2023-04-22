const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const confirm_borrow_book= expressAsyncHandler(async (req, res)=> {
    try {
        // Check if there is a record in the history table for the book and user, and if the state is 1 and is_borrow is 0
        const [rows]= await connection.execute("SELECT * FROM history WHERE book_id= ? AND user_id= ? AND state= 1 AND is_borrow= 0", [req.body.book_id, req.body.user_id])
        if(rows.length > 0) {
            // If the record exists, update is_borrow to 1 and set the time_borrow to the current date and time
            const [rows1]= await connection.execute("UPDATE history SET is_borrow= 1, time_borrow= ? WHERE book_id= ? AND user_id= ? AND state= 1", [new Date(), req.body.book_id, req.body.user_id])
            return res.status(200).json({borrow: true, timeup: false})
        }
        else {
            // If the record doesn't exist, return borrow as false and timeup as true
            return res.status(200).json({borrow: false, timeup: true})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= confirm_borrow_book