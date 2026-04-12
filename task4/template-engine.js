function parsing(data, varObj) {
  return data.replace(/{{(.*?)}}/g, (match, key) => {
    return varObj[key] ?? match
  });
}

module.exports ={parsing};