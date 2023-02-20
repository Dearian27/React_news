import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface stateI {
  isAuth: boolean;
  name: string | null;
  password: string | null;
}

const initialState: stateI = {
  isAuth: false,
  name: window.localStorage.getItem('name') as string || null,
  password: window.localStorage.getItem('password') as string || null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action:PayloadAction<boolean>)  => {
      state.isAuth = action.payload;
    },
    checkToken: (state) => {
      if(state.name) state.isAuth = true;
    },
    removeToken: (state) => {
      state.isAuth = false;
      state.name = null;
      state.password = null; 
    }
  }
})

export const {setAuth, checkToken, removeToken} = userSlice.actions;
export default userSlice.reducer;