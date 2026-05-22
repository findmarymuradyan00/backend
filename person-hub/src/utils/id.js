
const generateId = (prefix) =>{
      return `${prefix}_${Math.random().toString(36).slice(2, 6)}`;
  
}

module.exports = {generateId}