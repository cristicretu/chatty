export function new_user(io, socket, onlineUsers) {
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket["username"] = username

    console.log(`✋ ${username} has joined the chat! ✋`);
    //Send the username to all clients currently connected
    io.emit("new user", username);
  })

  socket.on('new message', ({ sender, message }) => {
    console.log(`${sender}: ${message}`);
    //Send the message to all clients currently connected
    io.emit("new message", { sender, message });
  })

  socket.on('get online users', () => {
    io.emit("get online users", onlineUsers);
  })

  socket.on('disconnect', () => {
    console.log(`👋 ${socket.username} has left the chat! 👋`);
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });
}
