function logger(message) {
    const timestamp = new Date().toISOString()
    return `${timestamp} ${message}\n`
}

module.exports={logger}