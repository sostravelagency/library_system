const expressAsyncHandler = require("express-async-handler");
const connection = require("../../database/connect");

const get_dashboard= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM user WHERE role= 1 ORDER BY time_created LIMIT 5")

        // Get the history of book transactions
        const [rows2]= await connection.execute("SELECT * FROM history INNER JOIN user ON history.user_id = user.user_id INNER JOIN book_in_book ON book_in_book.book_in_book_id = history.book_id INNER JOIN book ON book.book_id = book_in_book.book_id WHERE (state = 1 AND is_borrow= 1) OR state= 3 OR state= 4")
        
        const [rows3]= await connection.execute("SELECT COUNT(*) AS countU FROM user WHERE role = 1;")
        const [rows4]= await connection.execute("SELECT COUNT(*) AS countB FROM book")
        const [rows5]= await connection.execute("SELECT COUNT(*) AS countO FROM history WHERE is_borrow= 1")
        const [rows6]= await connection.execute("SELECT COUNT(*) AS countN FROM blogs")

         // Extract the count values from the above queries
        const numUser = rows3[0].countU;
        const numBook = rows4[0].countB;
        const numOrder = rows5[0].countO;
        const numNews = rows6[0].countN;

        // Return a JSON response with the necessary data
        return res.status(200).json({newUser: rows, newHistory: rows2, numUser, numBook, numOrder, numNews})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)        
    }

})

module.exports= get_dashboard