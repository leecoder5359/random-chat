const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const headerElement = getElementById('header');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

const helloUser = () => {
  const userName = prompt('사용할 닉네임을 적어주세요.');
};

const init = () => {
  helloUser();
};

init();
