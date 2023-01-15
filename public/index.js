$(document).ready(() => {
  const socket = io.connect();

  let currentUser;

  socket.emit("get online users");

  $("#create-user-btn").click((e) => {
    e.preventDefault();
    if ($("#username-input").val().length > 0) {
      socket.emit("new user", $("#username-input").val());
      currentUser = $("#username-input").val();
      $(".username-form").remove();
      // Have the main page visible
      $(".main-container").css("display", "flex");
    }
  });

  $("#send-chat-btn").click((e) => {
    e.preventDefault();
    let channel = $('.channel-current').text();
    let msg = $("#chat-input").val();
    if (msg.length > 0) {
      socket.emit("new message", {
        sender: currentUser,
        message: msg,
        channel: channel
      });
      $("#chat-input").val("");
    }
  });

  $("#logout-btn").click((e) => {
    e.preventDefault();
    socket.emit("logout");
  });

  $("#new-channel-btn").click(() => {
    let newChannel = $("#new-channel-input").val();

    if (newChannel.length > 0) {
      // Emit the new channel to the server
      socket.emit("new channel", newChannel);
      $("#new-channel-input").val("");
    }
  });

  socket.on("logout", (username) => {
    // reload the page
    if (currentUser === username) {
      window.location.reload();
    }
  });

  socket.on("new user", (username) => {
    console.log("new user connected 🙋" + username);
    $(".users-online").append(`<div class="user-online">${username}</div>`);
  });

  socket.on('new message', (data) => {
    let currentChannel = $('.channel-current').text();
    if(currentChannel == data.channel) {
      $('.message-container').append(`
        <div class="message">
          <p class="message-user">${data.sender}: </p>
          <p class="message-text">${data.message}</p>
        </div>
      `);
    }
  });

  socket.on("get online users", (onlineUsers) => {
    for (username in onlineUsers) {
      $(".users-online").append(`<div class="user-online">${username}</div>`);
    }
  });

  socket.on("user has left", (onlineUsers) => {
    $(".users-online").empty();
    for (username in onlineUsers) {
      $(".users-online").append(`<div class="user-online">${username}</div>`);
    }
  });

  socket.on("new channel", (newChannel) => {
    $(".channels").append(`<div class="channel">${newChannel}</div>`);
  });

  socket.on("user changed channel", (data) => {
    $(".channel-current").text(data.channel);
    $(".message").remove();
    data.messages.forEach((message) => {
      $(".message-container").append(`
        <div class="message">
          <p class="message-user">${message.sender}: </p>
          <p class="message-text">${message.message}</p>
        </div>
      `);
    });
  });
});
