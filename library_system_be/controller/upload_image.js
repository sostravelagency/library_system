const expressAsyncHandler = require("express-async-handler");
const mime= require("mime")
const { v4 } = require("uuid")
const fs= require("fs")

// This function decodes a base64 image string and returns an object with the image type and data
function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    // Check if the input string is valid
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
}

// This function handles uploading an image from a base64 string
const uploadImage= expressAsyncHandler(async (req, res)=> {
    const {image }= req.body

    try {
        // Decode the base64 image string
        const decodedImg = decodeBase64Image(image);
        // Get the image data and type from the decoded object
        const imageBuffer = decodedImg.data;
        const type = decodedImg.type;
        // Get the file extension from the image type
        const extension = mime.getExtension(type);
        // Generate a random filename using UUID v4
        const fileName= v4()
        try{
            // Write the image data to a file in the assets/i directory with the generated filename and extension
            fs.writeFileSync("./assets/i/" + fileName + "."+ extension , imageBuffer, 'utf8');
            // Return the URL of the uploaded image
            return res.status(200).json({img: "http://localhost:4000/i/" + fileName + "."+ extension})
        }
        catch(err){
            console.error(err)
            return res.status(200).json({img: false})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({img: false})
    }
})

module.exports= uploadImage