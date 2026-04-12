
function toCamel(mod){
    const splitted=mod.split("_");
    const res=splitted.map((word, idx)=>{
        if(idx==0) return word
        return word[0]+word.slice(1);
    })
    return res.join("")
}

function transform(obj){
    if(Array.isArray(obj)){
        return obj.map(transform)
    }

    if(obj!=null && typeof obj=="object"){
        const transformedObj={}

        for(let key in obj){
            const newKey=toCamel(key)
            transformedObj[newKey]=transform(obj[key])
        }
        return transformedObj
    }
    return obj
}

module.exports={transform}