const net=require('node:net')
require("./dotenv.js")

const {PORT}=process.env

const clients=new Set()
let id=100

const broadcast=(socket, msg)=>{
    for(let client of clients){
        if(client!==socket){
            client.write(msg)
        }
    }
}

const unicast =(socket, msg, targetId)=>{
    for(let client of clients){
        if(client.id===targetId){
            client.write(msg)
        }
    }
}
const server=net.createServer((socket)=>{
    clients.add(socket)
    socket.id=++id

    socket.write("hello from server")
    broadcast(socket, `socket ${socket.id} connected`)

    socket.on('data', (chunk, targetId)=>{
        const msg=chunk.toString().trim()

        if(msg.startsWith('@')){
            const [target, ...restMessage]=msg.split(' ')
            const targetId=parseInt(target.slice(1))

            const message=restMessage.join(' ')
            unicast(socket, message, targetId)
        }
        else broadcast(socket, msg)
    })

   socket.on('end', () => {
    console.log(`socket ${socket.id} ended`)
})

socket.on('close', () => {
    clients.delete(socket)
    broadcast(socket, `socket ${socket.id} disconnected`)
})

socket.on('error', (err) => {
    console.log(`socket ${socket.id} error:`, err.message)
})

})

server.listen(PORT, '0.0.0.0',()=>{
    console.log(`the server is running on localhost:${PORT}`);
})