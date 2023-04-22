const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_detail_book= expressAsyncHandler(async(req, res)=> {
    try {
        // Execute a MySQL query to select all columns from the 'book' table, 
        // the 'category_id' and 'category_name' columns from the 'category' table, and concatenate the resulting rows into a JSON array
        const [rows]= await connection.execute("SELECT *, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('category_id', category.category_id, 'category_name', category.category_name)),']') AS categories FROM book INNER JOIN author ON author.author_id = book.author_id LEFT JOIN category_book ON book.book_id = category_book.book_id LEFT JOIN category ON category.category_id = category_book.category_id WHERE book.book_id= ? GROUP BY book.book_id", [req.query.book_id])
        
        // If there is at least one row in the result, return the first row as a JSON response with a 200 status code
        if(rows.length >0 ) {
            return res.status(200).json(rows[0])
        }
        else {
            // If there are no rows in the result, return an empty object as a JSON response with a 200 status code
            return res.status(200).json({})
        }
    } catch (error) {
        // If there is an error executing the query, log the error and return an empty object as a JSON response with a 500 status code
        console.log(error)
        return res.status(200).json({})
    }
    
})

module.exports= get_detail_book