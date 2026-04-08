// MUST BE AT THE VERY TOP
const { DOMMatrix } = require('canvas');
global.DOMMatrix = DOMMatrix;

require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


connectToDB()


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})