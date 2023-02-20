import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface stateI {
  isAuth: boolean;
  name: string;
  password: string;
}

const initialState: stateI = {
  isAuth: false,
  name: window.localStorage.getItem('name') as string,
  password: window.localStorage.getItem('password') as string,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action:PayloadAction<boolean>)  => {
      state.isAuth = action.payload;
    }
  }
})

export default userSlice.reducer;