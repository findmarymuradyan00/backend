const logger = (req, res, next) =>{
    console.log(`method: ${req.method} 
                path:${req.url}
                status:${res.statusCode}
        `)

        next()
}


module.exports = logger