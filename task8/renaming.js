function renaming(){
    let count=1
    return function(filename){
        const ext=filename.split(".").pop()
        return `file_${count++}.${ext}`
    }
}

module.exports={renaming}