const bcrypt = require('bcrypt')

const hashPassword = async(plain) =>{
    return await bcrypt.hash(plain, 10)
}

const verifyPassword = async(plain, hash) =>{
    return await bcrypt.compare(plain, hash)
}

module.exports ={hashPassword, verifyPassword}