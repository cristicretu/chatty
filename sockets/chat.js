export function new_user(io, socket, onlineUsers, channels) {
  socket.on('new user', (username) => {
    onlineUsers[username] = socket.id;
    socket["username"] = username

    console.log(`✋ ${username} has joined the chat! ✋`);
    //Send the username to all clients currently connected
    io.emit("new user", username);
  })

  socket.on('new message', ({ sender, message, channel }) => {
    console.log(`${sender}: ${message}`);
    //Send the message to all clients currently connected
    io.to(channel).emit("new message", { sender, message, channel });
  })

  socket.on('get online users', () => {
    io.emit("get online users", onlineUsers);
  })

  socket.on('disconnect', () => {
    console.log(`👋 ${socket.username} has left the chat! 👋`);
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });

  socket.on('logout', () => {
    console.log(`👋 ${socket.username} has left the chat! 👋`);
    io.emit('logout', socket.username)
    delete onlineUsers[socket.username];
    io.emit('user has left', onlineUsers);
  });

  socket.on('new channel', (newChannel) => {
    channels[newChannel] = [];
   socket.join(newChannel);
    io.emit('new channel', newChannel);

    socket.emit('user changed channel', {
      channel: newChannel,
      messages: channels[newChannel]
    });
   });

   socket.on('user changed channel', (newChannel) => {
    socket.join(newChannel);
    socket.emit('user changed channel', {
      channel : newChannel,
      messages : channels[newChannel]
    });
  });
}
