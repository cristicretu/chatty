$(document).ready(() => {
  const socket = io.connect();

  $("#create-user-btn").click((e) => {
    e.preventDefault();
    let username = $("#username-input").val();

    if (username.length > 0) {
      socket.emit("new user", username);
      $(".username-form").remove();
    }
  });

  socket.on('new user', (username) => {
    console.log(`✋ ${username} has joined the chat! ✋`);
  })
});
