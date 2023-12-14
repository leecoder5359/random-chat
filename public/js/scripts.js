const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const headerElement = getElementById('header');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const newUserEmit = (userName) => {
  socket.emit('new_user', userName);
};

//global socket handler
socket.on('user_connected', (userName) => {
  setNewChat(`${userName}이 접속했습니다.`, 'user_connected');
});

socket.on('new_chat', (data) => {
  const { message, userName } = data;
  setNewChat(`${message}`, 'new_chat', userName);
});

socket.on('disconnect_user', (userName) => {
  setNewChat(`${userName}님이 퇴장하셨습니다.`, 'disconnect_user');
});

//event callback function
const handleSubmit = (event) => {
  event.preventDefault();
  const inputMessage = event.target.elements[0].value;

  if (inputMessage) {
    socket.emit('submit_chat', inputMessage);

    setNewChat(`${inputMessage}`, 'submit_chat');
    event.target.elements[0].value = '';
  }
};

const helloUserEvent = () => {
  socket.on('hello_user', (data) => {
    console.log(data);
  });
};

const setUserInfo = (userName) => {
  headerElement.innerText = `${userName}의 랜덤 채팅`;
};

const setNewChat = (messageText, messageType, userName) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = messageText;

  switch (messageType) {
    case 'user_connected':
      messageElement.className = 'user-connected';
      break;
    case 'new_chat':
      messageElement.className = 'chat-message other new-chat';
      break;
    case 'disconnect_user':
      messageElement.className = 'disconnect-user';
      break;
    case 'submit_chat':
      messageElement.className = 'chat-message self new-chat';
      break;
  }

  if (userName) {
    const userNameElement = document.createElement('span');
    userNameElement.textContent = userName;
    userNameElement.className = 'user-name';
    messageElement.prepend(userNameElement);
  }

  chattingBoxElement.appendChild(messageElement);
};

const helloUser = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('nickname');

  newUserEmit(userName);
  setUserInfo(userName);
  helloUserEvent();
};

const init = () => {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
};

init();
