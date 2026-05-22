const { readJson, writeJson } = require("../utils/fileDb");
const {BOOKSPATH} = require('../utils/path')

const getAll =()=>readJson(BOOKSPATH)

const saveAll = (data)=> writeJson(BOOKSPATH, data)

module.exports = {getAll, saveAll }