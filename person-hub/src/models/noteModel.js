const { readJson, writeJson } = require("../utils/fileDb");
const {NOTESPATH} = require('../utils/path')

const getAll = ()=> readJson(NOTESPATH)

const saveAll = (data)=> writeJson(NOTESPATH, data)

module.exports = {getAll, saveAll }
