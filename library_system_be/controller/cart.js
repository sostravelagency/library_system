const connection = require("../database/connect")
const expressAsyncHandler= require("express-async-handler")
// const { v4 } = require("uuid")

const cart= {

    // 'add' function that adds a book to the user's cart
    add: expressAsyncHandler(async (req, res)=> {
        try {           
            // check if the book is already in the cart
            const [rows1]= await connection.execute("SELECT cart.* FROM cart INNER JOIN book_in_book ON book_in_book.book_in_book_id = cart.book_in_book_id WHERE cart.book_id= ? AND cart.user_id= ?", [req.body.book_id, req.body.user_id])
            if(rows1.length > 0) {
                // return 'add: false' and 'exist: true' if the book already exists in the cart
                return res.status(200).json({add: false, exist: true})
            }
            // check if the book is available for checkout
            const [rows0]= await connection.execute("SELECT *, book_in_book.* FROM book_in_book INNER JOIN book ON book.book_id = book_in_book.book_id WHERE book.book_id = ? AND book_in_book.checkouting= 0 LIMIT 1", [req.body.book_id])
            const [rows]= await connection.execute("INSERT INTO cart(book_id, book_in_book_id, amount, user_id) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE amount= amount+ ?", [req.body.book_id || "", rows0[0]?.book_in_book_id || "", req.body.amount, req.body.user_id, req.body.amount])
            //eslint-disable-next-line
            // const [rows2]= await connection.execute("INSERT INTO history(history_id, user_id, book_id, time_book, time_approve, state) VALUES (?, ?, ?, ?, ?, ?)", [v4(), req.body.user_id, rows0[0]?.book_in_book_id, new Date(), "0", 0])
            //eslint-disable-next-line
            const [rows3]= await connection.execute("UPDATE book_in_book SET checkouting= 1 WHERE book_in_book_id = ?", [rows0[0]?.book_in_book_id])
            return res.status(200).json({add: true, book_in_book_id: rows0[0]?.book_in_book_id})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    // 'delete' function that deletes a book from the user's cart
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            
            const [rows]= await connection.execute("DELETE FROM cart WHERE user_id= ? AND book_id= ?", [req.body.user_id, req.body.book_id])
            
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    // 'get' function that gets all the books in the user's cart
    get: expressAsyncHandler(async (req, res)=> {
        try {
            // get all the books in the user's cart
            const [rows]= await connection.execute("SELECT * FROM cart INNER JOIN user ON cart.user_id = user.user_id INNER JOIN book ON book.book_id = cart.book_id WHERE cart.user_id= ?", [req.query.user_id || ""])
            if(rows.length > 0) {
                return res.status(200).json(rows)
            }
            else {
                return res.status(200).json([])
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= cart

