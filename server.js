const net = require("node:net");
const PORT = 3000;
let ID=1;

const broadcast = (socket, message) => {
  for (const client of clients) {
    if (socket !== client) {
      client.write(message);
    }
  }
};

const unicast = (message, targetId) => {
  for (const client of clients) {
    if (client.id === targetId) {
      client.write(message);
    }
  }
};

const clients = new Set();

const server = net.createServer((socket) => {
  socket.write("hello from server \n");

  clients.add(socket);
  socket.id = ID++;

  broadcast(socket, `client ${socket.id} connected`);

  socket.on("data", (data) => {
    const msg = data.toString().trim();

    const [clientID, ...message] = msg.split(" ");
    if (clientID.startsWith("@")) {
      const targetId = clientID.slice(1);
      unicast(message.join(" "), targetId);
    } else {
      broadcast(socket, msg);
    }
  });

  socket.on("end", () => {
    console.log(`socket ${socket.id} ended`);
  });

  socket.on("close", () => {
    clients.delete(socket);
    broadcast(socket, `socket ${socket.id} disconnected`);
  });

  socket.on(`error`, (err) => {
    console.error(`socket ${socket.id} error:`, err);
  } 
)
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`the server is running on localhost:${PORT}`);
});


