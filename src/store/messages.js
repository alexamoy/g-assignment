import { addSenderProperty } from './util';

const GET_MESSAGES = 'GET_MESSAGES';

const initialState = {
  texts: []
};

const getMessages = messages => ({
  type: GET_MESSAGES,
  messages
});


export const fetchToMessages = () => async dispatch => {
  try {
    for (let i = 1; i <=4; i++) {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const url = `https://gv-text-api.herokuapp.com/api/texts/to?page=${i}`;
      const data = await fetch(proxyUrl + url);
      const textMessages = await data.text();
      const jsonMessages = await JSON.parse(textMessages);
      const adjustedMessages = addSenderProperty(jsonMessages.texts, true);
      dispatch(getMessages(adjustedMessages));
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchFromMessages = () => async dispatch => {
  try {
    for (let i = 1; i <=3; i++) {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const url = `https://gv-text-api.herokuapp.com/api/texts/from?page=${i}`;
      const data = await fetch(proxyUrl + url);
      const textMessages = await data.text();
      const jsonMessages = await JSON.parse(textMessages);
      const adjustedMessages = addSenderProperty(jsonMessages.texts, false);
      dispatch(getMessages(adjustedMessages));
    }
  } catch (error) {
    console.error(error);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_MESSAGES:
    return { ...state, texts: state.texts.concat(action.messages) };
  default:
    return state;
  }
}
