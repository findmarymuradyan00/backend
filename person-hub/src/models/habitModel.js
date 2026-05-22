const { readJson, writeJson } = require("../utils/fileDb");
const {HABITSPATH} = require('../utils/path')

const getAll =()=> readJson(HABITSPATH)

const saveAll = (data)=> writeJson(HABITSPATH, data)

module.exports = {getAll, saveAll }
