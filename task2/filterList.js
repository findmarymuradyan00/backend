function filterList(arr, ext) {
  return arr.filter(word => word.endsWith(ext))
}

module.exports={filterList}
