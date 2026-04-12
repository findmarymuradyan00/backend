function parsing(content){
    const resObj={}

    content.split("\n").forEach((line)=>{
        line=line.trim()

        const [key, ...value]=line.split("=")
        resObj[key]=value.join("=")
    })
    return resObj
}

module.exports={parsing}