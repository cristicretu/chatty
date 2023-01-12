$(document).ready(() => {
  const socket = io.connect();

  let currentUser

  $('#create-user-btn').click((e)=>{
    e.preventDefault();
    if($('#username-input').val().length > 0){
      socket.emit('new user', $('#username-input').val());
      currentUser = $('#username-input').val();
      $('.username-form').remove();
      // Have the main page visible
      $('.main-container').css('display', 'flex');
    }
  });

  $('#send-chat-btn').click((e)=>{
    e.preventDefault()
    let msg = $('#chat-input').val()
    if(msg.length > 0){
      socket.emit('new message', {
        sender: currentUser,
        message: msg
      });
      $('#chat-input').val('');
    }
  });

  socket.on('new user', (username) => {
    console.log("new user connected 🙋" + username);
    $(".users-online").append(`<div class="user-online">${username}</div>`);
  })

  socket.on('new message', (data) => {
    $('.message-container').append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
    `);
  })
});
