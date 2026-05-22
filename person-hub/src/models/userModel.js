const { readJson, writeJson } = require("../utils/fileDb");
const {USERSPATH} = require('../utils/path')

const getAll = ()=>readJson(USERSPATH)

const saveAll = (data)=> writeJson(USERSPATH, data)

module.exports = {getAll, saveAll }
