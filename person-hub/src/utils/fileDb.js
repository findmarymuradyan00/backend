const fs = require('node:fs')

const readJson = (filename) => {
    try {
        const data = fs.readFileSync(filename, 'utf-8')
        if (!data.trim()) return []
        return JSON.parse(data)
    } catch (err) {
        if (err.code === 'ENOENT') return []
        throw err
    }
}

const writeJson = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2))
}

module.exports = { readJson, writeJson }
