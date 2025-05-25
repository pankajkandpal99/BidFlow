import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import userReducer from "./features/user/user.slice";
import bidReducer from "./features/bid/bidSlice";
import contractReducer from "./features/contract/contractSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    bid: bidReducer,
    contract: contractReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
