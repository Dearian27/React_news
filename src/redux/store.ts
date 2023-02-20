import userSlice from "./slices/userSlice"
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    user: userSlice
  }
})

export type RootState = ReturnType<typeof store.getState>

export default store;