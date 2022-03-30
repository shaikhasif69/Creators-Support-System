const multer = require('multer');

// set storage
console.log("middleware")


var storage = multer.diskStorage({
    
    destination : function ( req , file , cb ){
        cb(null, 'uploads')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        console.log("middleware")
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
}

)

module.exports = store = multer({ storage : storage })