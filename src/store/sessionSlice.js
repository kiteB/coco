import { createSlice } from "@reduxjs/toolkit";

// non-serializable object는 스토에에 직접 저장할 수 없으므로 Map을 사용하여 특정 id와 매핑한다
// 스토어에는 이 id값을 저장
// 세션에서 만들어진 웹소켓을 스토어에 매핑
export const websocketInstances = new Map();
// 참여자 목록을 스토어에 매핑
export const participantsInstances = new Map();


const initialState = {
  newMessage: {},
  sendMessage: "",
  userName: "",
  roomName: "",
  websocketId: null,
  participantsId: null,
  updated: false,
  isCompilePossible: true,
  isDrawPossible: true,
  isMicPossible: true,
  imageData: null
};



const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sendChat(state, action) {
      // console.log(action.payload)
      state.sendMessage = action.payload;
    },
    receiveChat(state, action) {
      state.newMessage = action.payload;
    },
    setSocketInfo(state, action) {
      // console.log(action.payload.userName)
      state.userName = action.payload.userName;
      state.roomName = action.payload.roomName;
      // console.log(state.userName)
    },
    setWebsocketId(state, action) {
      state.websocketId = action.payload;
    },
    setParticipantsId(state, action) {
      state.participantsId = action.payload;
    },
    setIsCompilePossible(state, action) {
      state.isCompilePossible = !state.isCompilePossible;
    },
    setIsDrawPossible(state, action) {
      state.isDrawPossible = !state.isDrawPossible;
    },
    setIsMicPossible(state, action) {
      state.isMicPossible = !state.isMicPossible;
    },
    receiveImageData(state, action) {
      state.imageData = action.payload;
    },
    setUpdated(state, action) {
      state.updated = action.payload;
    }
  }
});

export const { 
  receiveChat, 
  setSocketInfo, 
  setWebsocketId, 
  setParticipantsId, 
  receiveImageData, 
  setUpdated,
  setIsCompilePossible,
  setIsDrawPossible,
  setIsMicPossible } = sessionSlice.actions;

export default sessionSlice;