import { configureStore } from "@reduxjs/toolkit";
import authorizationSettingSlice from "./authorizationSettingSlice";
import sessionListSlice from "./sessionListSlice";
import toolBarActionSlice from "./toolBarActionSlice";
import compileSlice from "./compileSlice";
import updateUserSlice from "./userInfoUpdateSlice";
import sessionSlice from "./sessionSlice";
import commuSideBarSlice from "./commuSearchSlice";

const store = configureStore({
  reducer: {
    compile: compileSlice.reducer,
    authorizationSetting: authorizationSettingSlice.reducer,
    sessionList: sessionListSlice.reducer,
    toolBarAction: toolBarActionSlice.reducer,
    updateUser: updateUserSlice.reducer,
    session: sessionSlice.reducer,
    boardSearch: commuSideBarSlice.reducer,
  }
})

export default store;