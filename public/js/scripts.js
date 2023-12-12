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
  setNewChat(`${userName}이 접속했습니다.`);
});

socket.on('new_chat', (data) => {
  const { message, userName } = data;
  setNewChat(`${userName}: ${message}`);
});

//event callback function
const handleSubmit = (event) => {
  event.preventDefault();
  const inputMessage = event.target.elements[0].value;

  if (inputMessage) {
    socket.emit('submit_chat', inputMessage);

    setNewChat(`me: ${inputMessage}`);
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

const setNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `<div>${message}</div>`;
  wrapperChatBox.innerHTML = chatBox;
  console.log(wrapperChatBox);
  chattingBoxElement.append(wrapperChatBox);
};

const helloUser = () => {
  const userName = prompt('사용할 닉네임을 적어주세요.');
  newUserEmit(userName);
  setUserInfo(userName);
  helloUserEvent();
};

const init = () => {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
};

init();
