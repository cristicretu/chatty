export function new_user(io, socket) {
  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the chat! ✋`);
    //Send the username to all clients currently connected
    io.emit("new user", username);
  })

  socket.on('new message', ({ sender, message }) => {
    console.log(`${sender}: ${message}`);
    //Send the message to all clients currently connected
    io.emit("new message", { sender, message });
  })
}
