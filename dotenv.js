const path=require('node:path')
const fs=require('node:fs')

const EVN_PATH='./.env'
 const readEnv=()=>{
       const fileExists=fs.existsSync(EVN_PATH)
       if(!fileExists) return

       const data=fs.readFileSync(EVN_PATH, 'utf8')

       const dataModified=data.split("\n")

       for(const elm of dataModified){
              const [key, value]=elm.split('=')

              process.env[key]=value
       }
 }

 readEnv()