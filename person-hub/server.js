process.on('uncaughtException', (err) => {
    console.log('REAL ERROR:', err.message)
    console.log('FILE:', err.stack)
})

require("dotenv").config({quiet:true})  
const app = require("./app")

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})