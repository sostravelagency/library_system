const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const category2= {

    getListBookByCategory: expressAsyncHandler(async (req, res)=> {
        try {
            // Execute a SQL query using the connection object to select all columns from the category_book, book, and category tables where the category_id column in category_book table matches the value of the category_id parameter in the request query string
            const [rows]= await connection.execute("SELECT * FROM category_book INNER JOIN book ON book.book_id = category_book.book_id LEFT JOIN category ON category_book.category_id = category.category_id WHERE category_book.category_id = ?", [req.query?.category_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= category2