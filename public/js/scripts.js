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
  console.log(`${userName}이 접속했습니다.`);
});

const helloUserEvent = () => {
  socket.on('hello_user', (data) => {
    console.log(data);
  });
};

const setUserInfo = (userName) => {
  headerElement.innerText = `${userName}의 랜덤 채팅`;
};

const helloUser = () => {
  const userName = prompt('사용할 닉네임을 적어주세요.');
  newUserEmit(userName);
  setUserInfo(userName);
  helloUserEvent();
};

const init = () => {
  helloUser();
};

init();
