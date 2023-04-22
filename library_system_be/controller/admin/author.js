const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const {v4 }= require("uuid")

const author= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT * FROM author")
        return res.status(200).json(rows)
    }),

    getById: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT * FROM author WHERE author.author_id = '"+req.query.id+"';")
        return res.status(200).json(rows[0])
    }),

    add: expressAsyncHandler(async(req, res)=> {
        try {    
                   
            // Use the connection object to execute a MySQL query to insert a new author record
            await connection.execute("INSERT INTO author VALUES(?, ?)", 
            [
                v4(), // Use the v4 function from the uuid library to generate a unique ID for the new author
                req.body.author_name, // Get the author's name from the request body
            ]);

            // If the insert operation is successful, return a success response with status 200 and a JSON object with a single property 'add' set to true
            return res.status(200).json({add: true})

        } catch (error) {

            // If there is an error, return a server error response with status 500 and the error message
           return res.status(500).send(error) 
        }
    }),

    update: expressAsyncHandler(async(req, res)=> {
        try {
            await connection.execute("UPDATE author SET author_name= ? WHERE author.author_id =?", 
            [
                req.body.author_name,
                req.body.author_id
            ]);

            return res.status(200).json({update: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            await connection.execute("DELETE FROM author WHERE author_id= ?", [req.query.id]);

            return res.status(200).json({delete: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
}

module.exports= author